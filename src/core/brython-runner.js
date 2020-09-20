import brythonRunnerWorkerSrc from '!!raw-loader!./brython-runner.worker.js'
import brythonModule from '!!raw-loader!brython/brython.js'
import brythonStdlibModule from '!!raw-loader!brython/brython_stdlib.js'
import stdioSrc from '!!raw-loader!../scripts/stdio.py'
import sleepSrc from '!!raw-loader!../scripts/sleep.py'
import fileioSrc from '!!raw-loader!../scripts/fileio.py'

const DEFAULT_PARAMS = {
    codeName: 'main.py',
    codeCwd: '.',
    staticUrl: null, //'/static',
    hangerUrl: null, //'/hanger',
    paths: [],
    postInitModules: [],
    postInitScripts: [],
    files: {},
    debug: 0,
    stdout: {
        write(content) {
            console.log(content)
        },
        flush() { },
    },
    stderr: {
        write(content) {
            console.error(content)
        },
        flush() { },
    },
    stdin: {
        async readline() {
            return prompt();
        },
    },
    onInit() {
        console.log('Brython runner is ready.')
    },
    onFileUpdate(filename, data) {
        console.log('Brython runner has an updated file:', filename, data)
    },
    onMsg(type, value) {
        console.log('Brython runner got a message:', type, value)
    },
}

export default class BrythonRunner {
    constructor(params) {
        this.setParamValues(params)
        this.initWorker()   
    }

    setParamValues(params) {
        const values = {
            ...DEFAULT_PARAMS,
            ...params,
        }
        for (const key of Object.keys(values)) {
            this[key] = values[key]
        }
    }

    initWorker() {
        this.worker = this.createWorker()
        this.worker.postMessage({
            type: 'init',
            debug: this.debug,
            codeName: this.codeName,
            codeCwd: this.codeCwd,
            staticUrl: this.staticUrl,
            hangerUrl: this.hangerUrl,
            paths: this.paths,
            initModules: [
                brythonModule,
                brythonStdlibModule,
            ],
            postInitModules: this.postInitModules,
            initScripts: [
                stdioSrc,
                sleepSrc,
                fileioSrc,
            ],
            postInitScripts: this.postInitScripts,
            files: this.files,
        })
        this.worker.onmessage = msg => this.handleMessage(msg)
    }

    createWorker() {
        window.URL = window.URL || window.webkitURL
        let blob;
        try {
            blob = new Blob([brythonRunnerWorkerSrc], { type: 'application/javascript' })
        } catch (e) {
            window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder
            blob = new BlobBuilder()
            blob.append(brythonRunnerWorkerSrc)
            blob = blob.getBlob()
        }
        return new Worker(URL.createObjectURL(blob))
    }

    async handleMessage(msg) {
        switch (msg.data.type) {
            case 'brython.init':
                this.onInit()
                break

            case 'done':
                this.done(msg.data.exit)
                this.restartWorker()
                break

            case 'stdout.write':
                this.stdout.write(msg.data.value)
                break

            case 'stdout.flush':
                this.stdout.flush()
                break

            case 'stderr.write':
                this.stderr.write(msg.data.value)
                break

            case 'stderr.flush':
                this.stderr.flush()
                break

            case 'stdin.readline':
                this.hangerKey = msg.data.value
                const data = await this.stdin.readline()
                this.writeInputData(this.hangerKey, data)
                this.hangerKey = null
                break

            case 'file.update':
                this.files[msg.data.value.filename] = msg.data.value.data
                this.onFileUpdate(msg.data.value.filename, msg.data.value.data)
                break

            default:
                this.onMsg(msg.data.type, msg.data.value)
                break
        }
    }

    writeInputData(key, data) {
        var xhr = new XMLHttpRequest()
        xhr.open('POST', `${this.hangerUrl}/${key}/write/`, true)
        xhr.onload = e => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // Done.
                } else {
                    console.error('Failed to send input data via server tunnel.', xhr.statusText)
                }
            }
        }
        xhr.onerror = e => {
            console.error('Failed to send input data via server tunnel.', xhr.statusText)
        }
        xhr.send(data) 
    }

    runCode(code) {
        return new Promise(resolve => {
            this.done = exit => resolve(exit)
            this.worker.postMessage({
                type: 'run.code',
                code,
            })
        })
    }

    runCodeWithFiles(code, files) {
        return new Promise(resolve => {
            this.done = exit => resolve(exit)
            this.worker.postMessage({
                type: 'run.code-with-files',
                code,
                files,
            })
        })
    }

    runUrl(url) {
        return new Promise(resolve => {
            this.done = exit => resolve(exit)
            this.worker.postMessage({
                type: 'run.url',
                url,
            })
        })
    }

    sendMsg(type, value) {
        this.worker.postMessage({
            type,
            value,
        })
    }

    stopRunning() {
        if (this.hangerKey) {
            this.writeInputData(this.hangerKey, '')
        }
        this.restartWorker()
    }

    restartWorker() {
        this.worker.terminate()
        this.initWorker()
    }
}
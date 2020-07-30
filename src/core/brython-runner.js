import stdioSrc from '!!raw-loader!../scripts/stdio.py'
import sleepSrc from '!!raw-loader!../scripts/sleep.py'
import fileioSrc from '!!raw-loader!../scripts/fileio.py'

export default class BrythonRunner {
    constructor(params) {
        this.setParamValues(params)
        this.initWorker()   
    }

    setParamValues(params) {
        const values = {
            codeName: 'main.py',
            codeCwd: '.',
            staticUrl: '/static',
            paths: [],
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
                console.log('File got updated:', filename, data)
            },
            onMsg(type, value) {
                console.log('Got a message:', type, value)
            },
            ...params
        }
        for (const key of Object.keys(values)) {
            this[key] = values[key]
        }
    }

    initWorker() {
        this.worker = new Worker(`${this.staticUrl}/brython-runner.worker.js`);
        this.worker.postMessage({
            type: 'init',
            debug: this.debug,
            codeName: this.codeName,
            codeCwd: this.codeCwd,
            staticUrl: this.staticUrl,
            paths: this.paths,
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

    async handleMessage(msg) {
        // console.log('brython message', msg)
        switch (msg.data.type) {
            case 'brython.init':
                this.onInit()
                break

            case 'done':
                this.done(msg.data.exit)
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
        xhr.open('POST', `/hanger/${key}/write/`, true)
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
        this.worker.terminate()
        this.initWorker()
    }
}
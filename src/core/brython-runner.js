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
            codeName: this.codeName,
            codeCwd: this.codeCwd,
            staticUrl: this.staticUrl,
            paths: this.paths,
        })
        this.worker.onmessage = msg => this.handleMessage(msg)
    }

    handleMessage(msg) {
        // console.log('brython message', msg)
        switch (msg.data.type) {
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
                
            default:
                break
        }
    }

    runCode(code) {
        return new Promise(resolve => {
            this.done = exit => resolve(exit)
            this.worker.postMessage({
                type: 'run-code',
                code,
            })
        })
    }

    runUrl(url) {
        return new Promise(resolve => {
            this.done = exit => resolve(exit)
            this.worker.postMessage({
                type: 'run-url',
                url,
            })
        })
    }
}
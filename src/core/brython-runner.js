export default class BrythonRunner {
    constructor(params) {
        this.setParamValues(params)
        this.initWorker()   
    }

    setParamValues(params) {
        const values = {
            staticUrl: '/static',
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
            staticUrl: this.staticUrl,
            cwdUrl: this.cwdUrl,
        })
        this.worker.onmessage = msg => this.handleMessage(msg)
    }

    handleMessage(msg) {
        console.log('brython message', msg)
        switch (msg.data.type) {
            case 'done':
                this.done(msg.data.exit)
                break;

            default:
                break;
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
        // this.stdout.write('Running with runCode() now...\n')
    }
}
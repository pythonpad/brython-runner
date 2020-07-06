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
            codeName: this.codeName,
            codeCwd: this.codeCwd,
            staticUrl: this.staticUrl,
            paths: this.paths,
            postInitScripts: this.postInitScripts,
        })
        this.worker.onmessage = msg => this.handleMessage(msg)
    }

    async handleMessage(msg) {
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

            case 'stdin.readline':
                const data = await this.stdin.readline()
                var xhr = new XMLHttpRequest();
                xhr.open('POST', `/hanger/${msg.data.value}/write/`, true);
                xhr.onload = e => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            // Done.
                        } else {
                            console.error('Failed to send input data via server tunnel.', xhr.statusText);
                        }
                    }
                };
                xhr.onerror = e => {
                    console.error('Failed to send input data via server tunnel.', xhr.statusText);
                };
                xhr.send(data); 
                break

            default:
                this.onMsg(msg.data.type, msg.data.value)
                break
        }
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

    sendRawInput(value) {

    }
}
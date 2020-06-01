export default class BrythonRunner {
    constructor(params) {
        const values = {
            brythonUrl: '/brython',
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

    runCode(code) {
        this.stdout.write('Running with runCode() now...\n')
    }
}
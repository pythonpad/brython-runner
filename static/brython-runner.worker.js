function init(data) {
    self.window = self
    self.staticUrl = data.staticUrl
    self.print = function(msg) {
        postMessage({
            type: 'stdout',
            value: msg,
        })
    }
    self.printErr = function(msg) {
        postMessage({
            type: 'stderr',
            value: msg,
        })
    }
    self.sendMsg = function(type, msg) {
        postMessage({
            type,
            value: msg
        })
    }
    importScripts(
        self.staticUrl + '/brython/brython.js',
        self.staticUrl + '/brython/brython_stdlib.js',
        // self.staticUrl + 'brython/brython_modules.js',
    )
    const paths = []
    if (data.cwdUrl) {
        paths.push(data.cwdUrl)
    }
    self.__BRYTHON__.brython({
        pythonpath: paths + [
            self.staticUrl + '/brython',
            self.staticUrl + '/brython/site-packages',
        ],
        debug: 1, // 10
    })
    // self.__BRYTHON__._run_script({
    //     name: '__main__',
    //     src: 'import cocode.stdio',
    // })
}

function run(data) {
    console.log(self.__BRYTHON__)
    const code = self.__BRYTHON__._run_script({
        name: data.name || '__main__',
        src: data.src,
    })
    postMessage({
        type: 'done',
        value: code,
    })
}

function runCode(code) {
    const exitCode = self.__BRYTHON__._run_script({
        name: '__main__',
        src: code,
    })
    postMessage({
        type: 'done',
        exit: exitCode,
    })
}

onmessage = ({ data }) => {
    switch (data.type) {
        case 'init':
            init(data)
            break
        case 'run-code':
            runCode(data.code)
            break
        default:
            break
    }
}
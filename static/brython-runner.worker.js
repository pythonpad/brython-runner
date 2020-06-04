function init(data) {
    self.window = self
    self.code = ''
    self.document = {
        getElementsByTagName: function(tagName) { 
            if (tagName === 'script') {
                return [{
                    type: 'text/python',
                    innerHTML: self.code,
                }]
            }
        },
    }
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
        self.staticUrl + '/brython/brython_modules.js',
    )
    var paths = []
    if (data.cwdUrl) {
        paths.push(data.cwdUrl)
    }
    paths.push(self.staticUrl + '/brython')
    paths.push(self.staticUrl + '/brython/site-packages')
    self.__BRYTHON__.brython({
        pythonpath: paths,
        debug: 10, // 1
    })
    run('import runner.stdio')
}

function run(src) {
    self.code = src
    self.__BRYTHON__.parser._run_scripts({})
}

// function run(data) {
//     console.log(self.__BRYTHON__)
//     var code = self.__BRYTHON__.run_script({
//         name: data.name || '__main__',
//         src: data.src,
//     })
//     postMessage({
//         type: 'done',
//         value: code,
//     })
// }

function runCode(code) {
    run(code)
    postMessage({
        type: 'done',
        exit: 0,
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
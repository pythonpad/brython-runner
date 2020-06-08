function init(data) {
    self.window = self
    self.runType = 'code'
    self.code = ''
    self.url = ''
    self.id = data.codeName 
    self.codeCwd = data.codeCwd
    self.document = {
        getElementsByTagName: getElementsByTagName,
    }
    self.staticUrl = data.staticUrl
    initMsgSenders()
    importScripts(
        self.staticUrl + '/brython/brython.js',
        self.staticUrl + '/brython/brython_stdlib.js',
        self.staticUrl + '/brython/brython_modules.js',
    )
    var paths = [
        self.staticUrl + '/brython',
        self.staticUrl + '/brython/site-packages',
    ]
    self.__BRYTHON__.brython({
        pythonpath: paths + data.paths,
        debug: 1, // 10
    })
    if (data.filePath) {
        self.__BRYTHON__.script_path = data.filePath
    }
    run('import runner.stdio')
}

function getElementsByTagName(tagName) {
    if (tagName === 'script') {
        if (self.runType === 'code') {
            return [{
                type: 'text/python',
                id: self.id,
                innerHTML: self.code,
            }]
        } else if (self.runType === 'url') {
            return [{
                type: 'text/python',
                id: getFilename(self.url),
                src: self.url,
            }]
        }
    }
    return []
}

function initMsgSenders() {
    self.print = function (msg) {
        postMessage({
            type: 'stdout',
            value: msg,
        })
    }
    self.printErr = function (msg) {
        postMessage({
            type: 'stderr',
            value: msg,
        })
    }
    self.sendMsg = function (type, msg) {
        postMessage({
            type,
            value: msg
        })
    }
}

function getFilename(url) {
    var splitUrl = url.split('/')
    return splitUrl[splitUrl.length - 1]
}

function getParentUrl(url) {
    var splitUrl = url.split('/')
    if (splitUrl.length === 1) {
        return './'
    } else {
        return splitUrl.slice(0, splitUrl.length - 1).join('/')
    }
}

function run(src) {
    self.runType = 'code'
    self.code = src
    var pathBackup = self.__BRYTHON__.script_path
    self.__BRYTHON__.script_path = self.codeCwd
    self.__BRYTHON__.parser._run_scripts({})
    self.__BRYTHON__.script_path = pathBackup
}

function runUrl(url) {
    self.runType = 'url'
    self.url = url
    var pathBackup = self.__BRYTHON__.script_path
    self.__BRYTHON__.script_path = getParentUrl(url)
    self.__BRYTHON__.parser._run_scripts({})
    self.__BRYTHON__.script_path = pathBackup
}

function done() {
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
            run(data.code)
            done()
            break
        case 'run-url':
            runUrl(data.url)
            done()
            break
        default:
            break
    }
}
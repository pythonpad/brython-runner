function _brInitRunner(data) {
    _brSetValues(data);
    _brOverwrite();
    _brInitMsgSenders();
    _brInitMsgListeners();
    _brRunModuleScripts(data);
    _brInitBrython(data);
    _brRunInitPythonScripts(data);
    _brOverrideOpen();
    _brRunPostInitPythonScripts(data);
    _brInitRunnerCallback();
}

function _brSetValues(data) {
    self._brLocalPathPrefix = '/__pythonpad_local__';
    self._brRunType = 'code';
    self._brId = data.codeName;
    self._brCodeCwd = data.codeCwd;
    self._brCode = '';
    self._brHangerUrl = data.hangerUrl;
    self._brImportLocalFile = _brImportLocalFile;
    self._brFilesUpdated = _brFilesUpdated;
    self._brHangSleep = _brHangSleep;
    self._brPrevErrOut = null;
}

function _brOverwrite() {
    self.window = self;
    self.prompt = _brGetInput;
    self.document = _brCreateMockDocument();
}

function _brCreateMockDocument() {
    return {
        getElementsByTagName: _brGetElementsByTagName,
    };
}

function _brRunModuleScripts(data) {
    for (const rawModule of data.initModules) {
        eval.call(null, rawModule);
    }
    for (const rawModule of data.postInitModules) {
        eval.call(null, rawModule);
    }
}

function _brInitBrython(data) {
    self.XMLHttpRequest = _brXHR;
    self.__BRYTHON__.brython({
        pythonpath: [self._brLocalPathPrefix].concat(data.paths),
        debug: data.debug || 0,
    });
}

function _brRunInitPythonScripts(data) {
    _brRun(data.initScripts.join('\n'));
}

function _brOverrideOpen() {
    self.__BRYTHON__.builtins.open = self._brOpenFile;
}

function _brRunPostInitPythonScripts(data) {
    for (var i = 0; i < data.postInitScripts.length; i++) {
        _brRun(data.postInitScripts[i]);
    }
}

function _brInitRunnerCallback() {
    self.postMessage({
        type: 'brython.init',
        value: '',
    });
}

function _brImportLocalFile(filename) {
    if (self._brFilesObj[filename] && self._brFilesObj[filename].type === 'text') {
        return self._brFilesObj[filename].body;
    } else {
        return null;
    }
}

function _brSetFiles(files) {
    self._brFilesObj = files;
    self._brSetFilesFromObj();
}

function _brFilesUpdated(filename, type, body) {
    if (!type && !body) {
        delete self._brFilesObj[filename];
        self.postMessage({
            type: 'file.delete',
            value: filename,
        });
    } else {
        self._brFilesObj[filename] = {
            type: type,
            body: body,
        };
        self.postMessage({
            type: 'file.update',
            value: {
                filename: filename,
                data: {
                    type: type,
                    body: body,
                }
            },
        });
    }
}

function _brGetInput(message) {
    if (self.hangerUrl === null) {
        self._brRaiseInputError();
        return '';
    }
    if (message) {
        self._brStdoutWrite(message + '');
        self._brStdoutFlush();
    }
    var req = new XMLHttpRequest();
    req.open('POST', self.hangerUrl + '/open/', false);
    req.send('');

    if (req.status !== 200) {
        console.error('Failed to tunnel through the server to get input.');
        return '';
    }

    var key = req.responseText;

    self.postMessage({
        type: 'stdin.readline',
        value: key,
    });

    req = new XMLHttpRequest();
    req.open('POST', self.hangerUrl + '/' + key + '/read/', false);
    req.send('');

    if (req.status !== 200) {
        console.error('Failed to tunnel through the server to get input.');
        return '';
    }

    return req.responseText;
}

function _brHangSleep(duration) {
    var req = new XMLHttpRequest();
    req.open('GET', self._brHangerUrl + '/sleep/?duration=' + duration, false);
    req.send(null);
}

function _brGetElementsByTagName(tagName) {
    if (tagName === 'script') {
        if (self._brRunType === 'code') {
            return [{
                type: 'text/python',
                id: self._brId,
                innerHTML: self._brCode,
            }];
        } else if (self._brRunType === 'url') {
            return [{
                type: 'text/python',
                id: getFilename(self._brUrl),
                src: self._brUrl,
            }];
        }
    }
    return [];
}

function _brInitMsgSenders() {
    self._brStdoutWrite = function (data) {
        self._brPrevErrOut = null
        self.postMessage({
            type: 'stdout.write',
            value: data,
        });
    };
    self._brStdoutFlush = function () {
        self.postMessage({
            type: 'stdout.flush',
        });
    };
    self._brStderrWrite = function (data) {
        if ((data + '').startsWith('Traceback (most recent call last):') && (data === self._brPrevErrOut)) {
            return; // Skip duplicated error message.
        }
        self._brPrevErrOut = data;
        self.postMessage({
            type: 'stderr.write',
            value: data,
        });
    };
    self._brStderrFlush = function () {
        self.postMessage({
            type: 'stderr.flush',
        });
    };
    self._brSendMsg = function (type, value) {
        self.postMessage({
            type: type,
            value: value,
        });
    };
}

function _brInitMsgListeners() {
    self._brMsgListeners = {};
    self._brAddMsgListener = function (type, callback) {
        if (!(type in self._brMsgListeners)) {
            self._brMsgListeners[type] = [callback];
        } else {
            self._brMsgListeners[type].push(callback);
        }
    }
    self._brRemoveMsgListener = function (type, callback) {
        if (type in self._brMsgListeners) {
            var newMsgListeners = [];
            for (var i = 0; i < self._brMsgListeners[type].length; i++) {
                if (self._brMsgListeners[type][i] !== callback) {
                    newMsgListeners.push(self._brMsgListeners[type][i]);
                }
            }
            self._brMsgListeners[type] = newMsgListeners;
        }
    }
    self.receiveMsg = function (type) {
        return new Promise(function (resolve, reject) {
            var callback = function callback(msg) {
                resolve(msg.value);
                self._brRemoveMsgListener(type, callback);
            }
            self._brAddMsgListener(type, callback);
        })
    }
}

function getFilename(url) {
    var splitUrl = url.split('/');
    return splitUrl[splitUrl.length - 1];
}

function getParentUrl(url) {
    var splitUrl = url.split('/');
    if (splitUrl.length === 1) {
        return './';
    } else {
        return splitUrl.slice(0, splitUrl.length - 1).join('/');
    }
}

function _brRun(src) {
    self._brPrevErrOut = null;
    self._brRunType = 'code';
    self._brCode = src;
    var pathBackup = self.__BRYTHON__.script_path;
    self.__BRYTHON__.script_path = self._brCodeCwd;
    try {
        self.__BRYTHON__.parser._run_scripts({});
    } catch (err) {} finally {
        self.__BRYTHON__.script_path = pathBackup;
    }
}

function _brRunUrl(url) {
    self._brPrevErrOut = null;
    self._brRunType = 'url';
    self._brUrl = url;
    var pathBackup = self.__BRYTHON__.script_path;
    self.__BRYTHON__.script_path = getParentUrl(url);
    try {
        self.__BRYTHON__.parser._run_scripts({});
    } catch (err) { } finally {
        self.__BRYTHON__.script_path = pathBackup;
    }
}

function _brRunCallback(exit) {
    self.postMessage({
        type: 'done',
        exit,
    });
}

class _brXHR extends XMLHttpRequest {
    constructor() {
        super();
        this.localPrefix = self._brLocalPathPrefix + '/';
        this.localRequestOpened = false;
        this.localRequestSent = false;
        this.localResponseText = null;
    }

    open(...params) {
        if (params.length > 1) {
            const url = params[1];
            if (url.startsWith(this.localPrefix)) {
                const localPath = url.slice(this.localPrefix.length, url.indexOf('?'));
                this.localResponseText = _brImportLocalFile(localPath);
                this.localRequestOpened = true;
                // TODO: Call onreadystatechange.
                return;
            }
        }
        return super.open(...params);
    }

    send(...params) {
        if (this.localRequestOpened) {
            this.localRequestSent = true;
        } else {
            return super.send(...params);
        }
    }

    get status() {
        if (this.localRequestOpened) {
            if (this.localResponseText === null) {
                return 404;
            } else {
                return 200;
            }
        } else {
            return super.status;
        }
    }

    get readyState() {
        if (this.localRequestOpened) {
            if (this.localRequestSent) {
                return 4;
            } else {
                return 1;
            }
        } else {
            return super.readyState;
        }
    }

    get responseText() {
        if (this.localRequestOpened) {
            return this.localResponseText;
        } else {
            return super.responseText;
        }
    }
}

self.onmessage = function (message) {
    var data = message.data;
    switch (data.type) {
        case 'init':
            _brInitRunner(data);
            break;
        case 'run.code':
            try {
                _brRun(data.code);
                _brRunCallback(0);
            } catch (err) {
                _brRunCallback(1);
            }
            break;
        case 'run.code-with-files':
            try {
                _brSetFiles(data.files);
                _brRun(data.code);
                _brRunCallback(0);
            } catch (err) {
                _brRunCallback(1);
            }
            break;
        case 'run.url':
            try {
                _brRunUrl(data.url);
                _brRunCallback(0);
            } catch (err) {
                _brRunCallback(1);
            }
            break;
        default:
            break;
    }
    if (data.type in self._brMsgListeners) {
        for (var i = 0; i < self._brMsgListeners[data.type].length; i++) {
            self._brMsgListeners[data.type][i](data);
        }
    }
}
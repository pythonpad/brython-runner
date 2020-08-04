/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/brython-runner.worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/brython-runner.worker.js":
/*!**********************************************!*\
  !*** ./src/scripts/brython-runner.worker.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("async function init(data) {\n    self.window = self\n    self.runType = 'code'\n    self.code = ''\n    self.url = ''\n    self.id = data.codeName\n    self.codeCwd = data.codeCwd\n    self.document = {\n        getElementsByTagName: getElementsByTagName,\n    }\n    self.staticUrl = data.staticUrl\n    self.filesObj = data.files\n    self.importLocalFile = importLocalFile\n    self.filesUpdated = filesUpdated\n    self.prompt = getInput\n    self.hangSleep = hangSleep\n    self.prevErrOut = null\n    initMsgSenders()\n    initMsgListeners()\n    for (const rawModule of data.initModules) {\n        eval.call(null, rawModule)\n    }\n    for (const rawModule of data.postInitModules) {\n        eval.call(null, rawModule)\n    }\n    var paths = [\n        self.staticUrl + '/brython/lib',\n        self.staticUrl + '/brython',\n    ]\n    self.__BRYTHON__.brython({\n        pythonpath: ['/__pythonpad_local__'].concat(data.paths).concat(paths),\n        debug: data.debug || 0,\n    })\n    if (data.filePath) {\n        self.__BRYTHON__.script_path = data.filePath\n    }\n    run(data.initScripts.join('\\n'))\n    self.__BRYTHON__.builtins.open = self.openFile\n    for (var i = 0; i < data.postInitScripts.length; i++) {\n        run(data.postInitScripts[i])\n    }\n    this.postMessage({\n        type: 'brython.init',\n        value: '',\n    })\n}\n\nfunction importLocalFile(filename) {\n    if (self.filesObj[filename] && self.filesObj[filename].type === 'text') {\n        return self.filesObj[filename].body\n    } else {\n        return null\n    }\n}\n\nfunction setFiles(files) {\n    self.filesObj = files\n    self.setFilesFromObj()\n}\n\nfunction filesUpdated(filename, type, body) {\n    if (!type && !body) {\n        delete self.filesObj[filename]\n        this.postMessage({\n            type: 'file.delete',\n            value: filename,\n        })\n    } else {\n        self.filesObj[filename] = {\n            type: type,\n            body: body,\n        }\n        this.postMessage({\n            type: 'file.update',\n            value: {\n                filename: filename,\n                data: {\n                    type: type,\n                    body: body,\n                }\n            },\n        })\n    }\n}\n\nfunction getInput(message) {\n    if (message) {\n        self.stdoutWrite(message + '')\n        self.stdoutFlush()\n    }\n    var req = new XMLHttpRequest()\n    req.open('POST', '/hanger/open/', false)\n    req.send('')\n\n    if (req.status !== 200) {\n        console.error('Failed to tunnel through the server to get input.')\n        return ''\n    }\n\n    var key = req.responseText\n\n    this.postMessage({\n        type: 'stdin.readline',\n        value: key,\n    })\n\n    req = new XMLHttpRequest()\n    req.open('POST', '/hanger/' + key + '/read/', false)\n    req.send('')\n\n    if (req.status !== 200) {\n        console.error('Failed to tunnel through the server to get input.')\n        return ''\n    }\n\n    return req.responseText\n}\n\nfunction hangSleep(duration) {\n    var req = new XMLHttpRequest()\n    req.open('GET', '/hanger/sleep/?duration=' + duration, false)\n    req.send(null)\n}\n\nfunction getElementsByTagName(tagName) {\n    if (tagName === 'script') {\n        if (self.runType === 'code') {\n            return [{\n                type: 'text/python',\n                id: self.id,\n                innerHTML: self.code,\n            }]\n        } else if (self.runType === 'url') {\n            return [{\n                type: 'text/python',\n                id: getFilename(self.url),\n                src: self.url,\n            }]\n        }\n    }\n    return []\n}\n\nfunction initMsgSenders() {\n    self.stdoutWrite = function (data) {\n        self.prevErrOut = null\n        this.postMessage({\n            type: 'stdout.write',\n            value: data,\n        })\n    }\n    self.stdoutFlush = function () {\n        this.postMessage({\n            type: 'stdout.flush',\n        })\n    }\n    self.stderrWrite = function (data) {\n        if ((data + '').startsWith('Traceback (most recent call last):') && (data === self.prevErrOut)) {\n            return // Skip duplicated error message.\n        }\n        self.prevErrOut = data\n        this.postMessage({\n            type: 'stderr.write',\n            value: data,\n        })\n    }\n    self.stderrFlush = function () {\n        this.postMessage({\n            type: 'stderr.flush',\n        })\n    }\n    self.sendMsg = function (type, value) {\n        postMessage({\n            type: type,\n            value: value,\n        })\n    }\n}\n\nfunction initMsgListeners() {\n    self.msgListeners = {}\n    self.addMsgListener = function (type, callback) {\n        if (!(type in self.msgListeners)) {\n            self.msgListeners[type] = [callback]\n        } else {\n            self.msgListeners[type].push(callback)\n        }\n    }\n    self.removeMsgListener = function (type, callback) {\n        if (type in self.msgListeners) {\n            var newMsgListeners = []\n            for (var i = 0; i < self.msgListeners[type].length; i++) {\n                if (self.msgListeners[type][i] !== callback) {\n                    newMsgListeners.push(self.msgListeners[type][i])\n                }\n            }\n            self.msgListeners[type] = newMsgListeners\n        }\n    }\n    self.receiveMsg = function (type) {\n        return new Promise(function (resolve, reject) {\n            var callback = function callback(msg) {\n                resolve(msg.value)\n                self.removeMsgListener(type, callback)\n            }\n            self.addMsgListener(type, callback)\n        })\n    }\n}\n\nfunction getFilename(url) {\n    var splitUrl = url.split('/')\n    return splitUrl[splitUrl.length - 1]\n}\n\nfunction getParentUrl(url) {\n    var splitUrl = url.split('/')\n    if (splitUrl.length === 1) {\n        return './'\n    } else {\n        return splitUrl.slice(0, splitUrl.length - 1).join('/')\n    }\n}\n\nfunction run(src) {\n    self.prevErrOut = null\n    self.runType = 'code'\n    self.code = src\n    var pathBackup = self.__BRYTHON__.script_path\n    self.__BRYTHON__.script_path = self.codeCwd\n    try {\n        self.__BRYTHON__.parser._run_scripts({})\n    } catch (err) { } finally {\n        self.__BRYTHON__.script_path = pathBackup\n    }\n}\n\nfunction runUrl(url) {\n    self.prevErrOut = null\n    self.runType = 'url'\n    self.url = url\n    var pathBackup = self.__BRYTHON__.script_path\n    self.__BRYTHON__.script_path = getParentUrl(url)\n    try {\n        self.__BRYTHON__.parser._run_scripts({})\n    } catch (err) { } finally {\n        self.__BRYTHON__.script_path = pathBackup\n    }\n}\n\nfunction done(exit) {\n    postMessage({\n        type: 'done',\n        exit,\n    })\n}\n\nonmessage = function (message) {\n    data = message.data\n    switch (data.type) {\n        case 'init':\n            init(data)\n            break\n        case 'run.code':\n            try {\n                run(data.code)\n                done(0)\n            } catch (err) {\n                done(1)\n            }\n            break\n        case 'run.code-with-files':\n            try {\n                setFiles(data.files)\n                run(data.code)\n                done(0)\n            } catch (err) {\n                done(1)\n            }\n            break\n        case 'run.url':\n            try {\n                runUrl(data.url)\n                done(0)\n            } catch (err) {\n                done(1)\n            }\n            break\n        default:\n            break\n    }\n    if (data.type in self.msgListeners) {\n        for (var i = 0; i < self.msgListeners[data.type].length; i++) {\n            self.msgListeners[data.type][i](data)\n        }\n    }\n}\n\n//# sourceURL=webpack:///./src/scripts/brython-runner.worker.js?");

/***/ })

/******/ });
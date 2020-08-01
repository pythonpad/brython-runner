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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/scripts/fileio.py":
/*!*********************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/scripts/fileio.py ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"import base64\\nimport browser\\nimport io\\nimport os\\n\\n\\ndef set_files_from_obj():\\n    browser.self.files = browser.self.filesObj.to_dict()\\nset_files_from_obj()\\nbrowser.self.setFilesFromObj = set_files_from_obj\\n\\nclass PythonpadTextIOWrapper(io.IOBase):\\n    def __init__(self, filename, target_file, mode, newline=None):\\n        self.stream = io.StringIO(newline=newline)\\n        self.stream.write(target_file['body'])\\n        self.filename = filename\\n        self.target_file = target_file\\n        self.mode = mode\\n        if 'a' not in mode:\\n            self.stream.seek(0)\\n\\n    def __str__(self):\\n        return '<PythonpadTextIOWrapper name=\\\\'%s\\\\' mode=\\\\'%s\\\\' encoding=\\\\'UTF-8\\\\'>' % (self.filename, self.mode)\\n\\n    def __repr__(self):\\n        return self.__str__()\\n\\n    def __del__(self):\\n        return self.stream.__del__()\\n\\n    def __iter__(self):\\n        return self.stream.__iter__()\\n\\n    def __next__(self):\\n        return self.stream.__next__()\\n\\n    def __dict__(self):\\n        return self.stream.__dict__()\\n\\n    def __eq__(self, other):\\n        return self.stream.__eq__(other.stream)\\n\\n    def __exit__(self):\\n        return self.stream.__exit__()\\n\\n    def __format__(self, format_spec):\\n        return self.stream.__format__(format_spec)\\n\\n    def __ge__(self, other):\\n        return self.stream.__ge__(other.stream)\\n\\n    def __gt__(self, other):\\n        return self.stream.__gt__(other.stream)\\n\\n    def __le__(self, other):\\n        return self.stream.__le__(other.stream)\\n\\n    def __lt__(self, other):\\n        return self.stream.__lt__(other.stream)\\n\\n    def __ne__(self, other):\\n        return self.stream.__ne__(other.stream)\\n\\n    def __sizeof__(self):\\n        return self.stream.__sizeof__()\\n\\n    def detach(self):\\n        raise NotImplementedError('not available in Pythonpad')\\n\\n    def readable(self):\\n        return 'r' in self.mode or '+' in self.mode\\n\\n    def read(self, size=-1):\\n        if 'r' not in self.mode and '+' not in self.mode:\\n            raise io.UnsupportedOperation('not readable')\\n        return self.stream.read(size)\\n\\n    def readline(self, size=-1):\\n        if 'r' not in self.mode and '+' not in self.mode:\\n            raise io.UnsupportedOperation('not readable')\\n        return self.stream.readline(size)\\n\\n    def readlines(self, hint=-1):\\n        if 'r' not in self.mode and '+' not in self.mode:\\n            raise io.UnsupportedOperation('not readable')\\n        return self.stream.readlines(hint)\\n\\n    def writable(self):\\n        return 'r' not in self.mode or '+' in self.mode\\n\\n    def write(self, s):\\n        if 'r' in self.mode and '+' not in self.mode:\\n            raise io.UnsupportedOperation('not writable')\\n        return self.stream.write(s)\\n\\n    def writelines(self, lines):\\n        if 'r' in self.mode and '+' not in self.mode:\\n            raise io.UnsupportedOperation('not writable')\\n        return self.stream.writelines(s)\\n\\n    def fileno(self):\\n        raise OSError('no file descriptor is available in simulated in-memory file system')\\n\\n    def tell(self):\\n        return self.stream.tell()\\n\\n    def seekable(self):\\n        return True\\n\\n    def seek(self, offset):\\n        return self.stream.seek(offset)\\n\\n    def isatty(self):\\n        return False\\n\\n    def truncate(self, size=None):\\n        return self.stream.truncate(size=size)\\n\\n    def flush(self):\\n        if 'r' in self.mode or '+' in self.mode:\\n            return\\n        cursor = self.stream.tell()\\n        self.stream.seek(0) # Seek to the beginning of the stream.\\n        self.target_file['body'] = self.stream.read()\\n        files_updated(self.filename, )\\n        self.stream.seek(cursor)\\n\\n    def close(self):\\n        if 'r' not in self.mode or '+' in self.mode:\\n            self.stream.seek(0) # Seek to the beginning of the stream.\\n            self.target_file['body'] = self.stream.read()\\n            files_updated(self.filename)\\n        self.stream.close()\\n\\n    @property\\n    def name(self):\\n        return self.filename\\n    \\n    @property\\n    def closed(self):\\n        return self.stream.closed\\n\\nclass PythonpadBytesIOWrapper(io.BufferedIOBase):\\n    def __init__(self, filename, target_file, mode):\\n        self.stream = io.BytesIO()\\n        self.stream.write(base64.b64decode(target_file['body']))\\n        self.filename = filename\\n        self.target_file = target_file\\n        self.mode = mode\\n        if 'a' not in mode:\\n            self.stream.seek(0)\\n\\n    def __str__(self):\\n        return '<PythonpadBytesIOWrapper name=\\\\'%s\\\\' mode=\\\\'%s\\\\'>' % (self.filename, self.mode)\\n\\n    def __repr__(self):\\n        return self.__str__()\\n\\n    def __del__(self):\\n        return self.stream.__del__()\\n\\n    def __dict__(self):\\n        return self.stream.__dict__()\\n\\n    def __dir__(self):\\n        return self.stream.__dir__()\\n\\n    def __eq__(self, other):\\n        return self.stream.__eq__(other.stream)\\n\\n    def __exit__(self):\\n        return self.stream.__exit__()\\n\\n    def __format__(self, format_spec):\\n        return self.stream.__format__(format_spec)\\n\\n    def __ge__(self, other):\\n        return self.stream.__ge__(other.stream)\\n\\n    def __gt__(self, other):\\n        return self.stream.__gt__(other.stream)\\n\\n    def __iter__(self):\\n        return self.stream.__iter__()\\n\\n    def __le__(self, other):\\n        return self.stream.__le__(other.stream)\\n\\n    def __lt__(self, other):\\n        return self.stream.__lt__(other.stream)\\n\\n    def __ne__(self, other):\\n        return self.stream.__ne__(other.stream)\\n\\n    def __next__(self):\\n        return self.stream.__next__()\\n\\n    def __sizeof__(self):\\n        return self.stream.__sizeof__()\\n\\n    def detach(self):\\n        raise NotImplementedError('not available in Pythonpad')\\n\\n    def readable(self):\\n        return 'r' in self.mode or '+' in self.mode\\n\\n    def read(self, *args, **kwargs):\\n        if 'r' not in self.mode and '+' not in self.mode:\\n            raise io.UnsupportedOperation('not readable')\\n        return self.stream.read(*args, **kwargs)\\n\\n    def readline(self, *args, **kwargs):\\n        if 'r' not in self.mode and '+' not in self.mode:\\n            raise io.UnsupportedOperation('not readable')\\n        return self.stream.readline(*args, **kwargs)\\n\\n    def readlines(self, *args, **kwargs):\\n        if 'r' not in self.mode and '+' not in self.mode:\\n            raise io.UnsupportedOperation('not readable')\\n        return self.stream.readlines(*args, **kwargs)\\n\\n    def read1(self, *args, **kwargs):\\n        if 'r' not in self.mode and '+' not in self.mode:\\n            raise io.UnsupportedOperation('not readable')\\n        return self.stream.read1(*args, **kwargs)\\n\\n    def readinto(self, *args, **kwargs):\\n        if 'r' not in self.mode and '+' not in self.mode:\\n            raise io.UnsupportedOperation('not readable')\\n        return self.stream.readinto(*args, **kwargs)\\n\\n    def readinto1(self, *args, **kwargs):\\n        if 'r' not in self.mode and '+' not in self.mode:\\n            raise io.UnsupportedOperation('not readable')\\n        return self.stream.readinto1(*args, **kwargs)\\n\\n    def writable(self):\\n        return 'r' not in self.mode or '+' in self.mode\\n\\n    def write(self, s):\\n        if 'r' in self.mode and '+' not in self.mode:\\n            raise io.UnsupportedOperation('not writable')\\n        return self.stream.write(s)\\n\\n    def writelines(self, lines):\\n        if 'r' in self.mode and '+' not in self.mode:\\n            raise io.UnsupportedOperation('not writable')\\n        return self.stream.writelines(s)\\n\\n    def fileno(self):\\n        raise OSError('no file descriptor is available in simulated in-memory file system')\\n\\n    def tell(self):\\n        return self.stream.tell()\\n\\n    def peek(self, *args, **kwargs):\\n        return self.stream.peek(*args, **kwargs)\\n\\n    def raw(self, *args, **kwargs):\\n        return self.stream.raw(*args, **kwargs)\\n\\n    def seekable(self):\\n        return True\\n\\n    def seek(self, offset):\\n        return self.stream.seek(offset)\\n\\n    def isatty(self):\\n        return False\\n\\n    def truncate(self, size=None):\\n        return self.stream.truncate(size=size)\\n\\n    def flush(self):\\n        if 'r' in self.mode or '+' in self.mode:\\n            return\\n        cursor = self.stream.tell()\\n        self.stream.seek(0) # Seek to the beginning of the stream.\\n        self.target_file['body'] = base64.b64encode(self.stream.read()).decode('utf-8')\\n        files_updated(self.filename)\\n        self.stream.seek(cursor)\\n\\n    def close(self):\\n        if 'r' not in self.mode or '+' in self.mode:\\n            self.stream.seek(0) # Seek to the beginning of the stream.\\n            self.target_file['body'] = base64.b64encode(self.stream.read()).decode('utf-8')\\n            files_updated(self.filename)\\n        self.stream.close()\\n\\n    @property\\n    def name(self):\\n        return self.filename\\n\\n    @property\\n    def closed(self):\\n        return self.stream.closed()\\n\\ndef files_updated(path):\\n    if path in browser.self.files:\\n        browser.self.filesUpdated(path, browser.self.files[path]['type'], browser.self.files[path]['body'])\\n    else:\\n        browser.self.filesUpdated(path, None, None)\\n\\ndef normalize_path(path):\\n    normalized_path = os.path.normpath(path)\\n    if '/' in normalized_path:\\n        raise NotImplementedError('directory structure is not supported in Pythonpad')\\n    return normalized_path\\n\\ndef exists(path):\\n    return normalize_path(path) in browser.self.files\\n\\ndef get_file(path):\\n    return browser.self.files[normalize_path(path)]\\n\\ndef create_file(path, file_type=None, body=None):\\n    file = {\\n        'type': 'text' if file_type is None else file_type,\\n        'body': '' if body is None else body,\\n    }\\n    browser.self.files[normalize_path(path)] = file\\n    files_updated(normalize_path(path))\\n    return file\\n\\ndef open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None):\\n    count = 0\\n    for m in 'rwxa':\\n        if m in mode:\\n            count += 1\\n    if count != 1:\\n        raise ValueError('must have exactly one of create/read/write/append mode')\\n\\n    if 'b' in mode:\\n        if 'r' in mode:\\n            if not exists(file):\\n                raise FileNotFoundError('No such file or directory: \\\\'%s\\\\'' % file)\\n            target_file = get_file(file)\\n        elif 'w' in mode:\\n            target_file = create_file(file, file_type='base64')\\n        elif 'x' in mode:\\n            if exists(file):\\n                raise FileExistsError('File exists: \\\\'%s\\\\'' % file)\\n            target_file = create_file(file, file_type='base64')\\n        elif 'a' in mode:\\n            if exists(file):\\n                target_file = get_file(file)\\n            else:\\n                target_file = create_file(file, file_type='base64')\\n        if target_file['type'] != 'base64':\\n            raise NotImplementedError('opening text file in bytes mode is not implemented in Pythonpad')\\n        return PythonpadBytesIOWrapper(file, target_file, mode)\\n    else:\\n        if 'r' in mode:\\n            if not exists(file):\\n                raise FileNotFoundError('No such file or directory: \\\\'%s\\\\'' % file)\\n            target_file = get_file(file)\\n        elif 'w' in mode:\\n            target_file = create_file(file)\\n        elif 'x' in mode:\\n            if exists(file):\\n                raise FileExistsError('File exists: \\\\'%s\\\\'' % file)\\n            target_file = create_file(file)\\n        elif 'a' in mode:\\n            if exists(file):\\n                target_file = get_file(file)\\n            else:\\n                target_file = create_file(file)\\n        if target_file['type'] != 'text':\\n            raise NotImplementedError('opening byte file in text mode is not implemented in Pythonpad')\\n        return PythonpadTextIOWrapper(file, target_file, mode, newline=newline)\\n\\nbrowser.self.openFile = open\\nbrowser.self.isFileExist = exists\\nbrowser.self.getFileDict = get_file\");\n\n//# sourceURL=webpack:///./src/scripts/fileio.py?./node_modules/raw-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/scripts/sleep.py":
/*!********************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/scripts/sleep.py ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"import browser\\nimport time\\n\\ndef __sleep__(duration):\\n    # Busy wait with server-aided wait.\\n    target_ts = time.time() + duration\\n    if duration > 2:\\n        # Server-aided wait.\\n        browser.self.hangSleep(duration - 1)\\n    # Busy wait\\n    while time.time() < target_ts:\\n        pass\\n    \\ntime.sleep = __sleep__\");\n\n//# sourceURL=webpack:///./src/scripts/sleep.py?./node_modules/raw-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/scripts/stdio.py":
/*!********************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/scripts/stdio.py ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"import browser\\nimport sys\\n\\nclass StdOutStream:\\n    def write(self, data=''):\\n        browser.self.stdoutWrite(str(data))\\n\\n    def flush(self):\\n        browser.self.stdoutFlush()\\n\\n\\nclass StdErrStream:\\n    def write(self, data=''):\\n        browser.self.stderrWrite(str(data))\\n\\n    def flush(self):\\n        browser.self.stderrFlush()\\n\\n\\nsys.stdout = StdOutStream()\\nsys.stderr = StdErrStream()\\n\");\n\n//# sourceURL=webpack:///./src/scripts/stdio.py?./node_modules/raw-loader/dist/cjs.js");

/***/ }),

/***/ "./src/browser.js":
/*!************************!*\
  !*** ./src/browser.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_brython_runner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/brython-runner */ \"./src/core/brython-runner.js\");\n\nvar globalRef = typeof undefined !== \"undefined\" ? undefined : window;\n\nif (false) {}\n\nglobalRef.BrythonRunner = _core_brython_runner__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n\n//# sourceURL=webpack:///./src/browser.js?");

/***/ }),

/***/ "./src/core/brython-runner.js":
/*!************************************!*\
  !*** ./src/core/brython-runner.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return BrythonRunner; });\n/* harmony import */ var _raw_loader_scripts_stdio_py__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!../scripts/stdio.py */ \"./node_modules/raw-loader/dist/cjs.js!./src/scripts/stdio.py\");\n/* harmony import */ var _raw_loader_scripts_sleep_py__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !raw-loader!../scripts/sleep.py */ \"./node_modules/raw-loader/dist/cjs.js!./src/scripts/sleep.py\");\n/* harmony import */ var _raw_loader_scripts_fileio_py__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !raw-loader!../scripts/fileio.py */ \"./node_modules/raw-loader/dist/cjs.js!./src/scripts/fileio.py\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\n\nvar BrythonRunner = /*#__PURE__*/function () {\n  function BrythonRunner(params) {\n    _classCallCheck(this, BrythonRunner);\n\n    this.setParamValues(params);\n    this.initWorker();\n  }\n\n  _createClass(BrythonRunner, [{\n    key: \"setParamValues\",\n    value: function setParamValues(params) {\n      var values = _objectSpread({\n        codeName: 'main.py',\n        codeCwd: '.',\n        staticUrl: '/static',\n        paths: [],\n        postInitScripts: [],\n        files: {},\n        debug: 0,\n        stdout: {\n          write: function write(content) {\n            console.log(content);\n          },\n          flush: function flush() {}\n        },\n        stderr: {\n          write: function write(content) {\n            console.error(content);\n          },\n          flush: function flush() {}\n        },\n        stdin: {\n          readline: function readline() {\n            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n              return regeneratorRuntime.wrap(function _callee$(_context) {\n                while (1) {\n                  switch (_context.prev = _context.next) {\n                    case 0:\n                      return _context.abrupt(\"return\", prompt());\n\n                    case 1:\n                    case \"end\":\n                      return _context.stop();\n                  }\n                }\n              }, _callee);\n            }))();\n          }\n        },\n        onInit: function onInit() {\n          console.log('Brython runner is ready.');\n        },\n        onFileUpdate: function onFileUpdate(filename, data) {\n          console.log('File got updated:', filename, data);\n        },\n        onMsg: function onMsg(type, value) {\n          console.log('Got a message:', type, value);\n        }\n      }, params);\n\n      for (var _i = 0, _Object$keys = Object.keys(values); _i < _Object$keys.length; _i++) {\n        var key = _Object$keys[_i];\n        this[key] = values[key];\n      }\n    }\n  }, {\n    key: \"initWorker\",\n    value: function initWorker() {\n      var _this = this;\n\n      this.worker = new Worker(\"\".concat(this.staticUrl, \"/brython-runner.worker.js\"));\n      this.worker.postMessage({\n        type: 'init',\n        debug: this.debug,\n        codeName: this.codeName,\n        codeCwd: this.codeCwd,\n        staticUrl: this.staticUrl,\n        paths: this.paths,\n        initScripts: [_raw_loader_scripts_stdio_py__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _raw_loader_scripts_sleep_py__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _raw_loader_scripts_fileio_py__WEBPACK_IMPORTED_MODULE_2__[\"default\"]],\n        postInitScripts: this.postInitScripts,\n        files: this.files\n      });\n\n      this.worker.onmessage = function (msg) {\n        return _this.handleMessage(msg);\n      };\n    }\n  }, {\n    key: \"handleMessage\",\n    value: function () {\n      var _handleMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(msg) {\n        var data;\n        return regeneratorRuntime.wrap(function _callee2$(_context2) {\n          while (1) {\n            switch (_context2.prev = _context2.next) {\n              case 0:\n                _context2.t0 = msg.data.type;\n                _context2.next = _context2.t0 === 'brython.init' ? 3 : _context2.t0 === 'done' ? 5 : _context2.t0 === 'stdout.write' ? 9 : _context2.t0 === 'stdout.flush' ? 11 : _context2.t0 === 'stderr.write' ? 13 : _context2.t0 === 'stderr.flush' ? 15 : _context2.t0 === 'stdin.readline' ? 17 : _context2.t0 === 'file.update' ? 24 : 27;\n                break;\n\n              case 3:\n                this.onInit();\n                return _context2.abrupt(\"break\", 29);\n\n              case 5:\n                this.done(msg.data.exit); // Restart runner worker.\n\n                this.worker.terminate();\n                this.initWorker();\n                return _context2.abrupt(\"break\", 29);\n\n              case 9:\n                this.stdout.write(msg.data.value);\n                return _context2.abrupt(\"break\", 29);\n\n              case 11:\n                this.stdout.flush();\n                return _context2.abrupt(\"break\", 29);\n\n              case 13:\n                this.stderr.write(msg.data.value);\n                return _context2.abrupt(\"break\", 29);\n\n              case 15:\n                this.stderr.flush();\n                return _context2.abrupt(\"break\", 29);\n\n              case 17:\n                this.hangerKey = msg.data.value;\n                _context2.next = 20;\n                return this.stdin.readline();\n\n              case 20:\n                data = _context2.sent;\n                this.writeInputData(this.hangerKey, data);\n                this.hangerKey = null;\n                return _context2.abrupt(\"break\", 29);\n\n              case 24:\n                this.files[msg.data.value.filename] = msg.data.value.data;\n                this.onFileUpdate(msg.data.value.filename, msg.data.value.data);\n                return _context2.abrupt(\"break\", 29);\n\n              case 27:\n                this.onMsg(msg.data.type, msg.data.value);\n                return _context2.abrupt(\"break\", 29);\n\n              case 29:\n              case \"end\":\n                return _context2.stop();\n            }\n          }\n        }, _callee2, this);\n      }));\n\n      function handleMessage(_x) {\n        return _handleMessage.apply(this, arguments);\n      }\n\n      return handleMessage;\n    }()\n  }, {\n    key: \"writeInputData\",\n    value: function writeInputData(key, data) {\n      var xhr = new XMLHttpRequest();\n      xhr.open('POST', \"/hanger/\".concat(key, \"/write/\"), true);\n\n      xhr.onload = function (e) {\n        if (xhr.readyState === 4) {\n          if (xhr.status === 200) {// Done.\n          } else {\n            console.error('Failed to send input data via server tunnel.', xhr.statusText);\n          }\n        }\n      };\n\n      xhr.onerror = function (e) {\n        console.error('Failed to send input data via server tunnel.', xhr.statusText);\n      };\n\n      xhr.send(data);\n    }\n  }, {\n    key: \"runCode\",\n    value: function runCode(code) {\n      var _this2 = this;\n\n      return new Promise(function (resolve) {\n        _this2.done = function (exit) {\n          return resolve(exit);\n        };\n\n        _this2.worker.postMessage({\n          type: 'run.code',\n          code: code\n        });\n      });\n    }\n  }, {\n    key: \"runCodeWithFiles\",\n    value: function runCodeWithFiles(code, files) {\n      var _this3 = this;\n\n      return new Promise(function (resolve) {\n        _this3.done = function (exit) {\n          return resolve(exit);\n        };\n\n        _this3.worker.postMessage({\n          type: 'run.code-with-files',\n          code: code,\n          files: files\n        });\n      });\n    }\n  }, {\n    key: \"runUrl\",\n    value: function runUrl(url) {\n      var _this4 = this;\n\n      return new Promise(function (resolve) {\n        _this4.done = function (exit) {\n          return resolve(exit);\n        };\n\n        _this4.worker.postMessage({\n          type: 'run.url',\n          url: url\n        });\n      });\n    }\n  }, {\n    key: \"sendMsg\",\n    value: function sendMsg(type, value) {\n      this.worker.postMessage({\n        type: type,\n        value: value\n      });\n    }\n  }, {\n    key: \"stopRunning\",\n    value: function stopRunning() {\n      if (this.hangerKey) {\n        this.writeInputData(this.hangerKey, '');\n      }\n\n      this.worker.terminate();\n      this.initWorker();\n    }\n  }]);\n\n  return BrythonRunner;\n}();\n\n\n\n//# sourceURL=webpack:///./src/core/brython-runner.js?");

/***/ }),

/***/ 0:
/*!******************************!*\
  !*** multi ./src/browser.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/browser.js */\"./src/browser.js\");\n\n\n//# sourceURL=webpack:///multi_./src/browser.js?");

/***/ })

/******/ });
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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return BrythonRunner; });\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar BrythonRunner = /*#__PURE__*/function () {\n  function BrythonRunner(params) {\n    _classCallCheck(this, BrythonRunner);\n\n    this.setParamValues(params);\n    this.initWorker();\n  }\n\n  _createClass(BrythonRunner, [{\n    key: \"setParamValues\",\n    value: function setParamValues(params) {\n      var values = _objectSpread({\n        codeName: 'main.py',\n        codeCwd: '.',\n        staticUrl: '/static',\n        paths: [],\n        postInitScripts: [],\n        stdout: {\n          write: function write(content) {\n            console.log(content);\n          },\n          flush: function flush() {}\n        },\n        stderr: {\n          write: function write(content) {\n            console.error(content);\n          },\n          flush: function flush() {}\n        },\n        stdin: {\n          readline: function readline() {\n            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n              return regeneratorRuntime.wrap(function _callee$(_context) {\n                while (1) {\n                  switch (_context.prev = _context.next) {\n                    case 0:\n                      return _context.abrupt(\"return\", prompt());\n\n                    case 1:\n                    case \"end\":\n                      return _context.stop();\n                  }\n                }\n              }, _callee);\n            }))();\n          }\n        },\n        onMsg: function onMsg(type, value) {\n          console.log('Got a message:', type, value);\n        }\n      }, params);\n\n      for (var _i = 0, _Object$keys = Object.keys(values); _i < _Object$keys.length; _i++) {\n        var key = _Object$keys[_i];\n        this[key] = values[key];\n      }\n    }\n  }, {\n    key: \"initWorker\",\n    value: function initWorker() {\n      var _this = this;\n\n      this.worker = new Worker(\"\".concat(this.staticUrl, \"/brython-runner.worker.js\"));\n      this.worker.postMessage({\n        type: 'init',\n        codeName: this.codeName,\n        codeCwd: this.codeCwd,\n        staticUrl: this.staticUrl,\n        paths: this.paths,\n        postInitScripts: this.postInitScripts\n      });\n\n      this.worker.onmessage = function (msg) {\n        return _this.handleMessage(msg);\n      };\n    }\n  }, {\n    key: \"handleMessage\",\n    value: function () {\n      var _handleMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(msg) {\n        var data;\n        return regeneratorRuntime.wrap(function _callee2$(_context2) {\n          while (1) {\n            switch (_context2.prev = _context2.next) {\n              case 0:\n                _context2.t0 = msg.data.type;\n                _context2.next = _context2.t0 === 'done' ? 3 : _context2.t0 === 'stdout.write' ? 5 : _context2.t0 === 'stdout.flush' ? 7 : _context2.t0 === 'stderr.write' ? 9 : _context2.t0 === 'stderr.flush' ? 11 : _context2.t0 === 'stdin.readline' ? 13 : 20;\n                break;\n\n              case 3:\n                this.done(msg.data.exit);\n                return _context2.abrupt(\"break\", 22);\n\n              case 5:\n                this.stdout.write(msg.data.value);\n                return _context2.abrupt(\"break\", 22);\n\n              case 7:\n                this.stdout.flush();\n                return _context2.abrupt(\"break\", 22);\n\n              case 9:\n                this.stderr.write(msg.data.value);\n                return _context2.abrupt(\"break\", 22);\n\n              case 11:\n                this.stderr.flush();\n                return _context2.abrupt(\"break\", 22);\n\n              case 13:\n                this.hangerKey = msg.data.value;\n                _context2.next = 16;\n                return this.stdin.readline();\n\n              case 16:\n                data = _context2.sent;\n                this.writeInputData(this.hangerKey, data);\n                this.hangerKey = null;\n                return _context2.abrupt(\"break\", 22);\n\n              case 20:\n                this.onMsg(msg.data.type, msg.data.value);\n                return _context2.abrupt(\"break\", 22);\n\n              case 22:\n              case \"end\":\n                return _context2.stop();\n            }\n          }\n        }, _callee2, this);\n      }));\n\n      function handleMessage(_x) {\n        return _handleMessage.apply(this, arguments);\n      }\n\n      return handleMessage;\n    }()\n  }, {\n    key: \"writeInputData\",\n    value: function writeInputData(key, data) {\n      var xhr = new XMLHttpRequest();\n      xhr.open('POST', \"/hanger/\".concat(key, \"/write/\"), true);\n\n      xhr.onload = function (e) {\n        if (xhr.readyState === 4) {\n          if (xhr.status === 200) {// Done.\n          } else {\n            console.error('Failed to send input data via server tunnel.', xhr.statusText);\n          }\n        }\n      };\n\n      xhr.onerror = function (e) {\n        console.error('Failed to send input data via server tunnel.', xhr.statusText);\n      };\n\n      xhr.send(data);\n    }\n  }, {\n    key: \"runCode\",\n    value: function runCode(code) {\n      var _this2 = this;\n\n      return new Promise(function (resolve) {\n        _this2.done = function (exit) {\n          return resolve(exit);\n        };\n\n        _this2.worker.postMessage({\n          type: 'run.code',\n          code: code\n        });\n      });\n    }\n  }, {\n    key: \"runUrl\",\n    value: function runUrl(url) {\n      var _this3 = this;\n\n      return new Promise(function (resolve) {\n        _this3.done = function (exit) {\n          return resolve(exit);\n        };\n\n        _this3.worker.postMessage({\n          type: 'run.url',\n          url: url\n        });\n      });\n    }\n  }, {\n    key: \"sendMsg\",\n    value: function sendMsg(type, value) {\n      this.worker.postMessage({\n        type: type,\n        value: value\n      });\n    }\n  }, {\n    key: \"stopRunning\",\n    value: function stopRunning() {\n      if (this.hangerKey) {\n        this.writeInputData(this.hangerKey, '');\n      }\n\n      this.worker.terminate();\n      this.initWorker();\n    }\n  }]);\n\n  return BrythonRunner;\n}();\n\n\n\n//# sourceURL=webpack:///./src/core/brython-runner.js?");

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
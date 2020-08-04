"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _brython = _interopRequireDefault(require("!!raw-loader!../../static/brython/brython.js"));

var _brython_stdlib = _interopRequireDefault(require("!!raw-loader!../../static/brython/brython_stdlib.js"));

var _stdio = _interopRequireDefault(require("!!raw-loader!../scripts/stdio.py"));

var _sleep = _interopRequireDefault(require("!!raw-loader!../scripts/sleep.py"));

var _fileio = _interopRequireDefault(require("!!raw-loader!../scripts/fileio.py"));

var _brythonRunnerWorker = _interopRequireDefault(require("!!worker-loader!../scripts/brython-runner.worker.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BrythonRunner = /*#__PURE__*/function () {
  function BrythonRunner(params) {
    _classCallCheck(this, BrythonRunner);

    this.setParamValues(params);
    this.initWorker();
  }

  _createClass(BrythonRunner, [{
    key: "setParamValues",
    value: function setParamValues(params) {
      var values = _objectSpread({
        codeName: 'main.py',
        codeCwd: '.',
        staticUrl: '/static',
        paths: [],
        postInitScripts: [],
        files: {},
        debug: 0,
        stdout: {
          write: function write(content) {
            console.log(content);
          },
          flush: function flush() {}
        },
        stderr: {
          write: function write(content) {
            console.error(content);
          },
          flush: function flush() {}
        },
        stdin: {
          readline: function readline() {
            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      return _context.abrupt("return", prompt());

                    case 1:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }))();
          }
        },
        onInit: function onInit() {
          console.log('Brython runner is ready.');
        },
        onFileUpdate: function onFileUpdate(filename, data) {
          console.log('File got updated:', filename, data);
        },
        onMsg: function onMsg(type, value) {
          console.log('Got a message:', type, value);
        }
      }, params);

      for (var _i = 0, _Object$keys = Object.keys(values); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        this[key] = values[key];
      }
    }
  }, {
    key: "initWorker",
    value: function initWorker() {
      var _this = this;

      this.worker = new _brythonRunnerWorker["default"]();
      this.worker.postMessage({
        type: 'init',
        debug: this.debug,
        codeName: this.codeName,
        codeCwd: this.codeCwd,
        staticUrl: this.staticUrl,
        paths: this.paths,
        initModules: [_brython["default"], _brython_stdlib["default"]],
        initScripts: [_stdio["default"], _sleep["default"], _fileio["default"]],
        postInitScripts: this.postInitScripts,
        files: this.files
      });

      this.worker.onmessage = function (msg) {
        return _this.handleMessage(msg);
      };
    }
  }, {
    key: "handleMessage",
    value: function () {
      var _handleMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(msg) {
        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = msg.data.type;
                _context2.next = _context2.t0 === 'brython.init' ? 3 : _context2.t0 === 'done' ? 5 : _context2.t0 === 'stdout.write' ? 9 : _context2.t0 === 'stdout.flush' ? 11 : _context2.t0 === 'stderr.write' ? 13 : _context2.t0 === 'stderr.flush' ? 15 : _context2.t0 === 'stdin.readline' ? 17 : _context2.t0 === 'file.update' ? 24 : 27;
                break;

              case 3:
                this.onInit();
                return _context2.abrupt("break", 29);

              case 5:
                this.done(msg.data.exit); // Restart runner worker.

                this.worker.terminate();
                this.initWorker();
                return _context2.abrupt("break", 29);

              case 9:
                this.stdout.write(msg.data.value);
                return _context2.abrupt("break", 29);

              case 11:
                this.stdout.flush();
                return _context2.abrupt("break", 29);

              case 13:
                this.stderr.write(msg.data.value);
                return _context2.abrupt("break", 29);

              case 15:
                this.stderr.flush();
                return _context2.abrupt("break", 29);

              case 17:
                this.hangerKey = msg.data.value;
                _context2.next = 20;
                return this.stdin.readline();

              case 20:
                data = _context2.sent;
                this.writeInputData(this.hangerKey, data);
                this.hangerKey = null;
                return _context2.abrupt("break", 29);

              case 24:
                this.files[msg.data.value.filename] = msg.data.value.data;
                this.onFileUpdate(msg.data.value.filename, msg.data.value.data);
                return _context2.abrupt("break", 29);

              case 27:
                this.onMsg(msg.data.type, msg.data.value);
                return _context2.abrupt("break", 29);

              case 29:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handleMessage(_x) {
        return _handleMessage.apply(this, arguments);
      }

      return handleMessage;
    }()
  }, {
    key: "writeInputData",
    value: function writeInputData(key, data) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', "/hanger/".concat(key, "/write/"), true);

      xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {// Done.
          } else {
            console.error('Failed to send input data via server tunnel.', xhr.statusText);
          }
        }
      };

      xhr.onerror = function (e) {
        console.error('Failed to send input data via server tunnel.', xhr.statusText);
      };

      xhr.send(data);
    }
  }, {
    key: "runCode",
    value: function runCode(code) {
      var _this2 = this;

      console.log('run');
      return new Promise(function (resolve) {
        _this2.done = function (exit) {
          return resolve(exit);
        };

        _this2.worker.postMessage({
          type: 'run.code',
          code: code
        });
      });
    }
  }, {
    key: "runCodeWithFiles",
    value: function runCodeWithFiles(code, files) {
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3.done = function (exit) {
          return resolve(exit);
        };

        _this3.worker.postMessage({
          type: 'run.code-with-files',
          code: code,
          files: files
        });
      });
    }
  }, {
    key: "runUrl",
    value: function runUrl(url) {
      var _this4 = this;

      return new Promise(function (resolve) {
        _this4.done = function (exit) {
          return resolve(exit);
        };

        _this4.worker.postMessage({
          type: 'run.url',
          url: url
        });
      });
    }
  }, {
    key: "sendMsg",
    value: function sendMsg(type, value) {
      this.worker.postMessage({
        type: type,
        value: value
      });
    }
  }, {
    key: "stopRunning",
    value: function stopRunning() {
      if (this.hangerKey) {
        this.writeInputData(this.hangerKey, '');
      }

      this.worker.terminate();
      this.initWorker();
    }
  }]);

  return BrythonRunner;
}();

exports["default"] = BrythonRunner;
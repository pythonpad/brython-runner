"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

      this.worker = new Worker("".concat(this.staticUrl, "/brython-runner.worker.js"));
      this.worker.postMessage({
        type: 'init',
        debug: this.debug,
        codeName: this.codeName,
        codeCwd: this.codeCwd,
        staticUrl: this.staticUrl,
        paths: this.paths,
        postInitScripts: this.postInitScripts
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
                _context2.next = _context2.t0 === 'done' ? 3 : _context2.t0 === 'stdout.write' ? 5 : _context2.t0 === 'stdout.flush' ? 7 : _context2.t0 === 'stderr.write' ? 9 : _context2.t0 === 'stderr.flush' ? 11 : _context2.t0 === 'stdin.readline' ? 13 : 20;
                break;

              case 3:
                this.done(msg.data.exit);
                return _context2.abrupt("break", 22);

              case 5:
                this.stdout.write(msg.data.value);
                return _context2.abrupt("break", 22);

              case 7:
                this.stdout.flush();
                return _context2.abrupt("break", 22);

              case 9:
                this.stderr.write(msg.data.value);
                return _context2.abrupt("break", 22);

              case 11:
                this.stderr.flush();
                return _context2.abrupt("break", 22);

              case 13:
                this.hangerKey = msg.data.value;
                _context2.next = 16;
                return this.stdin.readline();

              case 16:
                data = _context2.sent;
                this.writeInputData(this.hangerKey, data);
                this.hangerKey = null;
                return _context2.abrupt("break", 22);

              case 20:
                this.onMsg(msg.data.type, msg.data.value);
                return _context2.abrupt("break", 22);

              case 22:
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
    key: "runUrl",
    value: function runUrl(url) {
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3.done = function (exit) {
          return resolve(exit);
        };

        _this3.worker.postMessage({
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
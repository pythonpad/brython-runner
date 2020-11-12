"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _brythonRunnerWorker = _interopRequireDefault(require("!!raw-loader!./brython-runner.worker.js"));

var _brython = _interopRequireDefault(require("!!raw-loader!brython/brython.js"));

var _brython_stdlib = _interopRequireDefault(require("!!raw-loader!brython/brython_stdlib.js"));

var _stdio = _interopRequireDefault(require("!!raw-loader!../scripts/stdio.py"));

var _sleep = _interopRequireDefault(require("!!raw-loader!../scripts/sleep.py"));

var _fileio = _interopRequireDefault(require("!!raw-loader!../scripts/fileio.py"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var DEFAULT_PARAMS = {
  codeName: 'main.py',
  codeCwd: '.',
  staticUrl: null,
  hangerUrl: 'https://www.pythonpad.co/hanger',
  paths: [],
  postInitModules: [],
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
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
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
    console.log('Brython runner has an updated file:', filename, data);
  },
  onMsg: function onMsg(type, value) {
    console.log('Brython runner got a message:', type, value);
  }
};

var BrythonRunner = /*#__PURE__*/function () {
  function BrythonRunner(params) {
    (0, _classCallCheck2["default"])(this, BrythonRunner);
    this.setParamValues(params);
    this.initWorker();
  }

  (0, _createClass2["default"])(BrythonRunner, [{
    key: "setParamValues",
    value: function setParamValues(params) {
      var values = _objectSpread(_objectSpread({}, DEFAULT_PARAMS), params);

      for (var _i = 0, _Object$keys = Object.keys(values); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        this[key] = values[key];
      }
    }
  }, {
    key: "initWorker",
    value: function initWorker() {
      var _this = this;

      this.worker = this.createWorker();
      this.worker.postMessage({
        type: 'init',
        debug: this.debug,
        codeName: this.codeName,
        codeCwd: this.codeCwd,
        staticUrl: this.staticUrl,
        hangerUrl: this.hangerUrl,
        paths: this.paths,
        initModules: [_brython["default"], _brython_stdlib["default"]],
        postInitModules: this.postInitModules,
        initScripts: [_stdio["default"], _sleep["default"], _fileio["default"]],
        postInitScripts: this.postInitScripts
      });

      this.worker.onmessage = function (msg) {
        return _this.handleMessage(msg);
      };
    }
  }, {
    key: "createWorker",
    value: function createWorker() {
      window.URL = window.URL || window.webkitURL;
      var blob;

      try {
        blob = new Blob([_brythonRunnerWorker["default"]], {
          type: 'application/javascript'
        });
      } catch (e) {
        window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
        blob = new BlobBuilder();
        blob.append(_brythonRunnerWorker["default"]);
        blob = blob.getBlob();
      }

      return new Worker(URL.createObjectURL(blob));
    }
  }, {
    key: "handleMessage",
    value: function () {
      var _handleMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(msg) {
        var data;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = msg.data.type;
                _context2.next = _context2.t0 === 'brython.init' ? 3 : _context2.t0 === 'done' ? 5 : _context2.t0 === 'stdout.write' ? 8 : _context2.t0 === 'stdout.flush' ? 10 : _context2.t0 === 'stderr.write' ? 12 : _context2.t0 === 'stderr.flush' ? 14 : _context2.t0 === 'stdin.readline' ? 16 : _context2.t0 === 'file.update' ? 23 : 26;
                break;

              case 3:
                this.onInit();
                return _context2.abrupt("break", 28);

              case 5:
                this.done(msg.data.exit);
                this.restartWorker();
                return _context2.abrupt("break", 28);

              case 8:
                this.stdout.write(msg.data.value);
                return _context2.abrupt("break", 28);

              case 10:
                this.stdout.flush();
                return _context2.abrupt("break", 28);

              case 12:
                this.stderr.write(msg.data.value);
                return _context2.abrupt("break", 28);

              case 14:
                this.stderr.flush();
                return _context2.abrupt("break", 28);

              case 16:
                this.hangerKey = msg.data.value;
                _context2.next = 19;
                return this.stdin.readline();

              case 19:
                data = _context2.sent;
                this.writeInputData(this.hangerKey, data);
                this.hangerKey = null;
                return _context2.abrupt("break", 28);

              case 23:
                this.files[msg.data.value.filename] = msg.data.value.data;
                this.onFileUpdate(msg.data.value.filename, msg.data.value.data);
                return _context2.abrupt("break", 28);

              case 26:
                this.onMsg(msg.data.type, msg.data.value);
                return _context2.abrupt("break", 28);

              case 28:
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
      xhr.open('POST', "".concat(this.hangerUrl, "/").concat(key, "/write/"), true);

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

      this.restartWorker();
    }
  }, {
    key: "restartWorker",
    value: function restartWorker() {
      this.worker.terminate();
      this.initWorker();
    }
  }]);
  return BrythonRunner;
}();

exports["default"] = BrythonRunner;
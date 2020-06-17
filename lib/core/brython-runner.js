"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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
        codeName: this.codeName,
        codeCwd: this.codeCwd,
        staticUrl: this.staticUrl,
        paths: this.paths
      });

      this.worker.onmessage = function (msg) {
        return _this.handleMessage(msg);
      };
    }
  }, {
    key: "handleMessage",
    value: function handleMessage(msg) {
      // console.log('brython message', msg)
      switch (msg.data.type) {
        case 'done':
          this.done(msg.data.exit);
          break;

        case 'stdout.write':
          this.stdout.write(msg.data.value);
          break;

        case 'stdout.flush':
          this.stdout.flush();
          break;

        case 'stderr.write':
          this.stderr.write(msg.data.value);
          break;

        case 'stderr.flush':
          this.stderr.flush();
          break;

        default:
          this.onMsg(msg.data.type, msg.data.value);
          break;
      }
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
  }]);

  return BrythonRunner;
}();

exports["default"] = BrythonRunner;
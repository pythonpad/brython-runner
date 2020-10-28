"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get4 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
  self._brFilesObj = data.files;
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
    getElementsByTagName: _brGetElementsByTagName
  };
}

function _brRunModuleScripts(data) {
  var _iterator = _createForOfIteratorHelper(data.initModules),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var rawModule = _step.value;
      eval.call(null, rawModule);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var _iterator2 = _createForOfIteratorHelper(data.postInitModules),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _rawModule = _step2.value;
      eval.call(null, _rawModule);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

function _brInitBrython(data) {
  self.XMLHttpRequest = _brXHR;

  self.__BRYTHON__.brython({
    pythonpath: [self._brLocalPathPrefix].concat(data.paths),
    debug: data.debug || 0
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
    value: ''
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
      value: filename
    });
  } else {
    self._brFilesObj[filename] = {
      type: type,
      body: body
    };
    self.postMessage({
      type: 'file.update',
      value: {
        filename: filename,
        data: {
          type: type,
          body: body
        }
      }
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
    value: key
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
        innerHTML: self._brCode
      }];
    } else if (self._brRunType === 'url') {
      return [{
        type: 'text/python',
        id: getFilename(self._brUrl),
        src: self._brUrl
      }];
    }
  }

  return [];
}

function _brInitMsgSenders() {
  self._brStdoutWrite = function (data) {
    self._brPrevErrOut = null;
    self.postMessage({
      type: 'stdout.write',
      value: data
    });
  };

  self._brStdoutFlush = function () {
    self.postMessage({
      type: 'stdout.flush'
    });
  };

  self._brStderrWrite = function (data) {
    if ((data + '').startsWith('Traceback (most recent call last):') && data === self._brPrevErrOut) {
      return; // Skip duplicated error message.
    }

    self._brPrevErrOut = data;
    self.postMessage({
      type: 'stderr.write',
      value: data
    });
  };

  self._brStderrFlush = function () {
    self.postMessage({
      type: 'stderr.flush'
    });
  };

  self._brSendMsg = function (type, value) {
    self.postMessage({
      type: type,
      value: value
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
  };

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
  };

  self.receiveMsg = function (type) {
    return new Promise(function (resolve, reject) {
      var callback = function callback(msg) {
        resolve(msg.value);

        self._brRemoveMsgListener(type, callback);
      };

      self._brAddMsgListener(type, callback);
    });
  };
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
  } catch (err) {} finally {
    self.__BRYTHON__.script_path = pathBackup;
  }
}

function _brRunCallback(exit) {
  self.postMessage({
    type: 'done',
    exit: exit
  });
}

var _brXHR = /*#__PURE__*/function (_XMLHttpRequest) {
  (0, _inherits2["default"])(_brXHR, _XMLHttpRequest);

  var _super = _createSuper(_brXHR);

  function _brXHR() {
    var _this;

    (0, _classCallCheck2["default"])(this, _brXHR);
    _this = _super.call(this);
    _this.localPrefix = self._brLocalPathPrefix + '/';
    _this.localRequestOpened = false;
    _this.localRequestSent = false;
    _this.localResponseText = null;
    return _this;
  }

  (0, _createClass2["default"])(_brXHR, [{
    key: "open",
    value: function open() {
      var _get2;

      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      if (params.length > 1) {
        var url = params[1];

        if (url.startsWith(this.localPrefix)) {
          var localPath = url.slice(this.localPrefix.length, url.indexOf('?'));
          this.localResponseText = _brImportLocalFile(localPath);
          this.localRequestOpened = true; // TODO: Call onreadystatechange.

          return;
        }
      }

      return (_get2 = (0, _get4["default"])((0, _getPrototypeOf2["default"])(_brXHR.prototype), "open", this)).call.apply(_get2, [this].concat(params));
    }
  }, {
    key: "send",
    value: function send() {
      if (this.localRequestOpened) {
        this.localRequestSent = true;
      } else {
        var _get3;

        for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          params[_key2] = arguments[_key2];
        }

        return (_get3 = (0, _get4["default"])((0, _getPrototypeOf2["default"])(_brXHR.prototype), "send", this)).call.apply(_get3, [this].concat(params));
      }
    }
  }, {
    key: "status",
    get: function get() {
      if (this.localRequestOpened) {
        if (this.localResponseText === null) {
          return 404;
        } else {
          return 200;
        }
      } else {
        return (0, _get4["default"])((0, _getPrototypeOf2["default"])(_brXHR.prototype), "status", this);
      }
    }
  }, {
    key: "readyState",
    get: function get() {
      if (this.localRequestOpened) {
        if (this.localRequestSent) {
          return 4;
        } else {
          return 1;
        }
      } else {
        return (0, _get4["default"])((0, _getPrototypeOf2["default"])(_brXHR.prototype), "readyState", this);
      }
    }
  }, {
    key: "responseText",
    get: function get() {
      if (this.localRequestOpened) {
        return this.localResponseText;
      } else {
        return (0, _get4["default"])((0, _getPrototypeOf2["default"])(_brXHR.prototype), "responseText", this);
      }
    }
  }]);
  return _brXHR;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(XMLHttpRequest));

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
};
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function init(_x) {
  return _init.apply(this, arguments);
}

function _init() {
  _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
    var _iterator, _step, rawModule, _iterator2, _step2, _rawModule, paths, i;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            self.window = self;
            self.runType = 'code';
            self.code = '';
            self.url = '';
            self.id = data.codeName;
            self.codeCwd = data.codeCwd;
            self.document = {
              getElementsByTagName: getElementsByTagName
            };
            self.staticUrl = data.staticUrl;
            self.filesObj = data.files;
            self.importLocalFile = importLocalFile;
            self.filesUpdated = filesUpdated;
            self.prompt = getInput;
            self.hangSleep = hangSleep;
            self.prevErrOut = null;
            initMsgSenders();
            initMsgListeners();
            _iterator = _createForOfIteratorHelper(data.initModules);

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                rawModule = _step.value;
                eval.call(null, rawModule);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            _iterator2 = _createForOfIteratorHelper(data.postInitModules);

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                _rawModule = _step2.value;
                eval.call(null, _rawModule);
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            paths = [self.staticUrl + '/brython/lib', self.staticUrl + '/brython'];

            self.__BRYTHON__.brython({
              pythonpath: ['/__pythonpad_local__'].concat(data.paths).concat(paths),
              debug: data.debug || 0
            });

            if (data.filePath) {
              self.__BRYTHON__.script_path = data.filePath;
            }

            run(data.initScripts.join('\n'));
            self.__BRYTHON__.builtins.open = self.openFile;

            for (i = 0; i < data.postInitScripts.length; i++) {
              run(data.postInitScripts[i]);
            }

            this.postMessage({
              type: 'brython.init',
              value: ''
            });

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _init.apply(this, arguments);
}

function importLocalFile(filename) {
  if (self.filesObj[filename] && self.filesObj[filename].type === 'text') {
    return self.filesObj[filename].body;
  } else {
    return null;
  }
}

function setFiles(files) {
  self.filesObj = files;
  self.setFilesFromObj();
}

function filesUpdated(filename, type, body) {
  if (!type && !body) {
    delete self.filesObj[filename];
    this.postMessage({
      type: 'file.delete',
      value: filename
    });
  } else {
    self.filesObj[filename] = {
      type: type,
      body: body
    };
    this.postMessage({
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

function getInput(message) {
  if (message) {
    self.stdoutWrite(message + '');
    self.stdoutFlush();
  }

  var req = new XMLHttpRequest();
  req.open('POST', '/hanger/open/', false);
  req.send('');

  if (req.status !== 200) {
    console.error('Failed to tunnel through the server to get input.');
    return '';
  }

  var key = req.responseText;
  this.postMessage({
    type: 'stdin.readline',
    value: key
  });
  req = new XMLHttpRequest();
  req.open('POST', '/hanger/' + key + '/read/', false);
  req.send('');

  if (req.status !== 200) {
    console.error('Failed to tunnel through the server to get input.');
    return '';
  }

  return req.responseText;
}

function hangSleep(duration) {
  var req = new XMLHttpRequest();
  req.open('GET', '/hanger/sleep/?duration=' + duration, false);
  req.send(null);
}

function getElementsByTagName(tagName) {
  if (tagName === 'script') {
    if (self.runType === 'code') {
      return [{
        type: 'text/python',
        id: self.id,
        innerHTML: self.code
      }];
    } else if (self.runType === 'url') {
      return [{
        type: 'text/python',
        id: getFilename(self.url),
        src: self.url
      }];
    }
  }

  return [];
}

function initMsgSenders() {
  self.stdoutWrite = function (data) {
    self.prevErrOut = null;
    this.postMessage({
      type: 'stdout.write',
      value: data
    });
  };

  self.stdoutFlush = function () {
    this.postMessage({
      type: 'stdout.flush'
    });
  };

  self.stderrWrite = function (data) {
    if ((data + '').startsWith('Traceback (most recent call last):') && data === self.prevErrOut) {
      return; // Skip duplicated error message.
    }

    self.prevErrOut = data;
    this.postMessage({
      type: 'stderr.write',
      value: data
    });
  };

  self.stderrFlush = function () {
    this.postMessage({
      type: 'stderr.flush'
    });
  };

  self.sendMsg = function (type, value) {
    postMessage({
      type: type,
      value: value
    });
  };
}

function initMsgListeners() {
  self.msgListeners = {};

  self.addMsgListener = function (type, callback) {
    if (!(type in self.msgListeners)) {
      self.msgListeners[type] = [callback];
    } else {
      self.msgListeners[type].push(callback);
    }
  };

  self.removeMsgListener = function (type, callback) {
    if (type in self.msgListeners) {
      var newMsgListeners = [];

      for (var i = 0; i < self.msgListeners[type].length; i++) {
        if (self.msgListeners[type][i] !== callback) {
          newMsgListeners.push(self.msgListeners[type][i]);
        }
      }

      self.msgListeners[type] = newMsgListeners;
    }
  };

  self.receiveMsg = function (type) {
    return new Promise(function (resolve, reject) {
      var callback = function callback(msg) {
        resolve(msg.value);
        self.removeMsgListener(type, callback);
      };

      self.addMsgListener(type, callback);
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

function run(src) {
  self.prevErrOut = null;
  self.runType = 'code';
  self.code = src;
  var pathBackup = self.__BRYTHON__.script_path;
  self.__BRYTHON__.script_path = self.codeCwd;

  try {
    self.__BRYTHON__.parser._run_scripts({});
  } catch (err) {} finally {
    self.__BRYTHON__.script_path = pathBackup;
  }
}

function runUrl(url) {
  self.prevErrOut = null;
  self.runType = 'url';
  self.url = url;
  var pathBackup = self.__BRYTHON__.script_path;
  self.__BRYTHON__.script_path = getParentUrl(url);

  try {
    self.__BRYTHON__.parser._run_scripts({});
  } catch (err) {} finally {
    self.__BRYTHON__.script_path = pathBackup;
  }
}

function done(exit) {
  postMessage({
    type: 'done',
    exit: exit
  });
}

onmessage = function onmessage(message) {
  data = message.data;

  switch (data.type) {
    case 'init':
      init(data);
      break;

    case 'run.code':
      try {
        run(data.code);
        done(0);
      } catch (err) {
        done(1);
      }

      break;

    case 'run.code-with-files':
      try {
        setFiles(data.files);
        run(data.code);
        done(0);
      } catch (err) {
        done(1);
      }

      break;

    case 'run.url':
      try {
        runUrl(data.url);
        done(0);
      } catch (err) {
        done(1);
      }

      break;

    default:
      break;
  }

  if (data.type in self.msgListeners) {
    for (var i = 0; i < self.msgListeners[data.type].length; i++) {
      self.msgListeners[data.type][i](data);
    }
  }
};
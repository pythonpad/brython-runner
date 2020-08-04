"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function init(data) {
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

  var paths = [self.staticUrl + '/brython/lib', self.staticUrl + '/brython'];

  self.__BRYTHON__.brython({
    pythonpath: ['/__pythonpad_local__'].concat(data.paths).concat(paths),
    debug: data.debug || 0
  });

  if (data.filePath) {
    self.__BRYTHON__.script_path = data.filePath;
  }

  run(data.initScripts.join('\n'));
  self.__BRYTHON__.builtins.open = self.openFile;

  for (var i = 0; i < data.postInitScripts.length; i++) {
    run(data.postInitScripts[i]);
  }

  self.postMessage({
    type: 'brython.init',
    value: ''
  });
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
    self.postMessage({
      type: 'file.delete',
      value: filename
    });
  } else {
    self.filesObj[filename] = {
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
  self.postMessage({
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
    self.postMessage({
      type: 'stdout.write',
      value: data
    });
  };

  self.stdoutFlush = function () {
    self.postMessage({
      type: 'stdout.flush'
    });
  };

  self.stderrWrite = function (data) {
    if ((data + '').startsWith('Traceback (most recent call last):') && data === self.prevErrOut) {
      return; // Skip duplicated error message.
    }

    self.prevErrOut = data;
    self.postMessage({
      type: 'stderr.write',
      value: data
    });
  };

  self.stderrFlush = function () {
    self.postMessage({
      type: 'stderr.flush'
    });
  };

  self.sendMsg = function (type, value) {
    self.postMessage({
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
  var data = message.data;

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
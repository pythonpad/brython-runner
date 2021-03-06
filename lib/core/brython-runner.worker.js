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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _assertThisInitialized(self) {\n  if (self === void 0) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n\n  return self;\n}\n\nmodule.exports = _assertThisInitialized;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/assertThisInitialized.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nmodule.exports = _classCallCheck;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/construct.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ \"./node_modules/@babel/runtime/helpers/setPrototypeOf.js\");\n\nvar isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ \"./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js\");\n\nfunction _construct(Parent, args, Class) {\n  if (isNativeReflectConstruct()) {\n    module.exports = _construct = Reflect.construct;\n    module.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n  } else {\n    module.exports = _construct = function _construct(Parent, args, Class) {\n      var a = [null];\n      a.push.apply(a, args);\n      var Constructor = Function.bind.apply(Parent, a);\n      var instance = new Constructor();\n      if (Class) setPrototypeOf(instance, Class.prototype);\n      return instance;\n    };\n\n    module.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n  }\n\n  return _construct.apply(null, arguments);\n}\n\nmodule.exports = _construct;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/construct.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\nmodule.exports = _createClass;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/createClass.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/get.js":
/*!****************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/get.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var superPropBase = __webpack_require__(/*! ./superPropBase.js */ \"./node_modules/@babel/runtime/helpers/superPropBase.js\");\n\nfunction _get(target, property, receiver) {\n  if (typeof Reflect !== \"undefined\" && Reflect.get) {\n    module.exports = _get = Reflect.get;\n    module.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n  } else {\n    module.exports = _get = function _get(target, property, receiver) {\n      var base = superPropBase(target, property);\n      if (!base) return;\n      var desc = Object.getOwnPropertyDescriptor(base, property);\n\n      if (desc.get) {\n        return desc.get.call(receiver);\n      }\n\n      return desc.value;\n    };\n\n    module.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n  }\n\n  return _get(target, property, receiver || target);\n}\n\nmodule.exports = _get;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/get.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _getPrototypeOf(o) {\n  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n    return o.__proto__ || Object.getPrototypeOf(o);\n  };\n  module.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n  return _getPrototypeOf(o);\n}\n\nmodule.exports = _getPrototypeOf;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/getPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ \"./node_modules/@babel/runtime/helpers/setPrototypeOf.js\");\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function\");\n  }\n\n  subClass.prototype = Object.create(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      writable: true,\n      configurable: true\n    }\n  });\n  if (superClass) setPrototypeOf(subClass, superClass);\n}\n\nmodule.exports = _inherits;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/inherits.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/isNativeFunction.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeFunction.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _isNativeFunction(fn) {\n  return Function.toString.call(fn).indexOf(\"[native code]\") !== -1;\n}\n\nmodule.exports = _isNativeFunction;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/isNativeFunction.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _isNativeReflectConstruct() {\n  if (typeof Reflect === \"undefined\" || !Reflect.construct) return false;\n  if (Reflect.construct.sham) return false;\n  if (typeof Proxy === \"function\") return true;\n\n  try {\n    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));\n    return true;\n  } catch (e) {\n    return false;\n  }\n}\n\nmodule.exports = _isNativeReflectConstruct;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ \"./node_modules/@babel/runtime/helpers/typeof.js\")[\"default\"];\n\nvar assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized.js */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n\nfunction _possibleConstructorReturn(self, call) {\n  if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n    return call;\n  }\n\n  return assertThisInitialized(self);\n}\n\nmodule.exports = _possibleConstructorReturn;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _setPrototypeOf(o, p) {\n  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n    o.__proto__ = p;\n    return o;\n  };\n\n  module.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n  return _setPrototypeOf(o, p);\n}\n\nmodule.exports = _setPrototypeOf;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/setPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/superPropBase.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/superPropBase.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf.js */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n\nfunction _superPropBase(object, property) {\n  while (!Object.prototype.hasOwnProperty.call(object, property)) {\n    object = getPrototypeOf(object);\n    if (object === null) break;\n  }\n\n  return object;\n}\n\nmodule.exports = _superPropBase;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/superPropBase.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _typeof(obj) {\n  \"@babel/helpers - typeof\";\n\n  if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") {\n    module.exports = _typeof = function _typeof(obj) {\n      return typeof obj;\n    };\n\n    module.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n  } else {\n    module.exports = _typeof = function _typeof(obj) {\n      return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj;\n    };\n\n    module.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n  }\n\n  return _typeof(obj);\n}\n\nmodule.exports = _typeof;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/typeof.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/wrapNativeSuper.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/wrapNativeSuper.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf.js */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n\nvar setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ \"./node_modules/@babel/runtime/helpers/setPrototypeOf.js\");\n\nvar isNativeFunction = __webpack_require__(/*! ./isNativeFunction.js */ \"./node_modules/@babel/runtime/helpers/isNativeFunction.js\");\n\nvar construct = __webpack_require__(/*! ./construct.js */ \"./node_modules/@babel/runtime/helpers/construct.js\");\n\nfunction _wrapNativeSuper(Class) {\n  var _cache = typeof Map === \"function\" ? new Map() : undefined;\n\n  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {\n    if (Class === null || !isNativeFunction(Class)) return Class;\n\n    if (typeof Class !== \"function\") {\n      throw new TypeError(\"Super expression must either be null or a function\");\n    }\n\n    if (typeof _cache !== \"undefined\") {\n      if (_cache.has(Class)) return _cache.get(Class);\n\n      _cache.set(Class, Wrapper);\n    }\n\n    function Wrapper() {\n      return construct(Class, arguments, getPrototypeOf(this).constructor);\n    }\n\n    Wrapper.prototype = Object.create(Class.prototype, {\n      constructor: {\n        value: Wrapper,\n        enumerable: false,\n        writable: true,\n        configurable: true\n      }\n    });\n    return setPrototypeOf(Wrapper, Class);\n  };\n\n  module.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n  return _wrapNativeSuper(Class);\n}\n\nmodule.exports = _wrapNativeSuper;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/wrapNativeSuper.js?");

/***/ }),

/***/ "./src/core/brython-runner.worker.js":
/*!*******************************************!*\
  !*** ./src/core/brython-runner.worker.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/get */ \"./node_modules/@babel/runtime/helpers/get.js\");\n/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ \"./node_modules/@babel/runtime/helpers/wrapNativeSuper.js\");\n/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _brInitRunner(data) {\n  _brSetValues(data);\n\n  _brOverwrite();\n\n  _brInitMsgSenders();\n\n  _brInitMsgListeners();\n\n  _brRunModuleScripts(data);\n\n  _brInitBrython(data);\n\n  _brRunInitPythonScripts(data);\n\n  _brOverrideOpen();\n\n  _brRunPostInitPythonScripts(data);\n\n  _brInitRunnerCallback();\n}\n\nfunction _brSetValues(data) {\n  self._brLocalPathPrefix = '/__pythonpad_local__';\n  self._brRunType = 'code';\n  self._brId = data.codeName;\n  self._brCodeCwd = data.codeCwd;\n  self._brCode = '';\n  self._brHangerUrl = data.hangerUrl;\n  self._brImportLocalFile = _brImportLocalFile;\n  self._brFilesUpdated = _brFilesUpdated;\n  self._brHangSleep = _brHangSleep;\n  self._brPrevErrOut = null;\n}\n\nfunction _brOverwrite() {\n  self.window = self;\n  self.prompt = _brGetInput;\n  self.document = _brCreateMockDocument();\n}\n\nfunction _brCreateMockDocument() {\n  return {\n    getElementsByTagName: _brGetElementsByTagName\n  };\n}\n\nfunction _brRunModuleScripts(data) {\n  var _iterator = _createForOfIteratorHelper(data.initModules),\n      _step;\n\n  try {\n    for (_iterator.s(); !(_step = _iterator.n()).done;) {\n      var rawModule = _step.value;\n      eval.call(null, rawModule);\n    }\n  } catch (err) {\n    _iterator.e(err);\n  } finally {\n    _iterator.f();\n  }\n\n  var _iterator2 = _createForOfIteratorHelper(data.postInitModules),\n      _step2;\n\n  try {\n    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n      var _rawModule = _step2.value;\n      eval.call(null, _rawModule);\n    }\n  } catch (err) {\n    _iterator2.e(err);\n  } finally {\n    _iterator2.f();\n  }\n}\n\nfunction _brInitBrython(data) {\n  self.RealXMLHttpRequest = self.XMLHttpRequest;\n  self.XMLHttpRequest = _brXHR;\n\n  self.__BRYTHON__.brython({\n    pythonpath: [self._brLocalPathPrefix].concat(data.paths),\n    debug: data.debug || 0\n  });\n}\n\nfunction _brRunInitPythonScripts(data) {\n  _brRun(data.initScripts.join('\\n'));\n}\n\nfunction _brOverrideOpen() {\n  self.__BRYTHON__.builtins.open = self._brOpenFile;\n}\n\nfunction _brRunPostInitPythonScripts(data) {\n  for (var i = 0; i < data.postInitScripts.length; i++) {\n    _brRun(data.postInitScripts[i]);\n  }\n}\n\nfunction _brInitRunnerCallback() {\n  self.postMessage({\n    type: 'brython.init',\n    value: ''\n  });\n}\n\nfunction _brImportLocalFile(filename) {\n  if (self._brFilesObj[filename] && self._brFilesObj[filename].type === 'text') {\n    return self._brFilesObj[filename].body;\n  } else {\n    return null;\n  }\n}\n\nfunction _brSetFiles(files) {\n  self._brFilesObj = files;\n\n  self._brSetFilesFromObj();\n}\n\nfunction _brFilesUpdated(filename, type, body) {\n  if (!type && !body) {\n    delete self._brFilesObj[filename];\n    self.postMessage({\n      type: 'file.delete',\n      value: filename\n    });\n  } else {\n    self._brFilesObj[filename] = {\n      type: type,\n      body: body\n    };\n    self.postMessage({\n      type: 'file.update',\n      value: {\n        filename: filename,\n        data: {\n          type: type,\n          body: body\n        }\n      }\n    });\n  }\n}\n\nfunction _brGetInput(message) {\n  if (self._brHangerUrl === null) {\n    self._brRaiseInputError();\n\n    return '';\n  }\n\n  if (message) {\n    self._brStdoutWrite(message + '');\n\n    self._brStdoutFlush();\n  }\n\n  var req = new RealXMLHttpRequest();\n  console.log('URL', self._brHangerUrl + '/open/');\n  req.open('POST', self._brHangerUrl + '/open/', false);\n  req.send('');\n\n  if (req.status !== 200) {\n    console.error('Failed to tunnel through the server to get input.');\n    return '';\n  }\n\n  var key = req.responseText;\n  self.postMessage({\n    type: 'stdin.readline',\n    value: key\n  });\n  req = new RealXMLHttpRequest();\n  req.open('POST', self._brHangerUrl + '/' + key + '/read/', false);\n  req.send('');\n\n  if (req.status !== 200) {\n    console.error('Failed to tunnel through the server to get input.');\n    return '';\n  }\n\n  return req.responseText;\n}\n\nfunction _brHangSleep(duration) {\n  var req = new RealXMLHttpRequest();\n  req.open('GET', self._brHangerUrl + '/sleep/?duration=' + duration, false);\n  req.send(null);\n}\n\nfunction _brGetElementsByTagName(tagName) {\n  if (tagName === 'script') {\n    if (self._brRunType === 'code') {\n      return [{\n        type: 'text/python',\n        id: self._brId,\n        innerHTML: self._brCode\n      }];\n    } else if (self._brRunType === 'url') {\n      return [{\n        type: 'text/python',\n        id: getFilename(self._brUrl),\n        src: self._brUrl\n      }];\n    }\n  }\n\n  return [];\n}\n\nfunction _brInitMsgSenders() {\n  self._brStdoutWrite = function (data) {\n    self._brPrevErrOut = null;\n    self.postMessage({\n      type: 'stdout.write',\n      value: data\n    });\n  };\n\n  self._brStdoutFlush = function () {\n    self.postMessage({\n      type: 'stdout.flush'\n    });\n  };\n\n  self._brStderrWrite = function (data) {\n    if ((data + '').startsWith('Traceback (most recent call last):') && data === self._brPrevErrOut) {\n      return; // Skip duplicated error message.\n    }\n\n    self._brPrevErrOut = data;\n    self.postMessage({\n      type: 'stderr.write',\n      value: data\n    });\n  };\n\n  self._brStderrFlush = function () {\n    self.postMessage({\n      type: 'stderr.flush'\n    });\n  };\n\n  self._brSendMsg = function (type, value) {\n    self.postMessage({\n      type: type,\n      value: value\n    });\n  };\n}\n\nfunction _brInitMsgListeners() {\n  self._brMsgListeners = {};\n\n  self._brAddMsgListener = function (type, callback) {\n    if (!(type in self._brMsgListeners)) {\n      self._brMsgListeners[type] = [callback];\n    } else {\n      self._brMsgListeners[type].push(callback);\n    }\n  };\n\n  self._brRemoveMsgListener = function (type, callback) {\n    if (type in self._brMsgListeners) {\n      var newMsgListeners = [];\n\n      for (var i = 0; i < self._brMsgListeners[type].length; i++) {\n        if (self._brMsgListeners[type][i] !== callback) {\n          newMsgListeners.push(self._brMsgListeners[type][i]);\n        }\n      }\n\n      self._brMsgListeners[type] = newMsgListeners;\n    }\n  };\n\n  self.receiveMsg = function (type) {\n    return new Promise(function (resolve, reject) {\n      var callback = function callback(msg) {\n        resolve(msg.value);\n\n        self._brRemoveMsgListener(type, callback);\n      };\n\n      self._brAddMsgListener(type, callback);\n    });\n  };\n}\n\nfunction getFilename(url) {\n  var splitUrl = url.split('/');\n  return splitUrl[splitUrl.length - 1];\n}\n\nfunction getParentUrl(url) {\n  var splitUrl = url.split('/');\n\n  if (splitUrl.length === 1) {\n    return './';\n  } else {\n    return splitUrl.slice(0, splitUrl.length - 1).join('/');\n  }\n}\n\nfunction _brRun(src) {\n  self._brPrevErrOut = null;\n  self._brRunType = 'code';\n  self._brCode = src;\n  var pathBackup = self.__BRYTHON__.script_path;\n  self.__BRYTHON__.script_path = self._brCodeCwd;\n\n  try {\n    self.__BRYTHON__.parser._run_scripts({});\n  } catch (err) {} finally {\n    self.__BRYTHON__.script_path = pathBackup;\n  }\n}\n\nfunction _brRunUrl(url) {\n  self._brPrevErrOut = null;\n  self._brRunType = 'url';\n  self._brUrl = url;\n  var pathBackup = self.__BRYTHON__.script_path;\n  self.__BRYTHON__.script_path = getParentUrl(url);\n\n  try {\n    self.__BRYTHON__.parser._run_scripts({});\n  } catch (err) {} finally {\n    self.__BRYTHON__.script_path = pathBackup;\n  }\n}\n\nfunction _brRunCallback(exit) {\n  self.postMessage({\n    type: 'done',\n    exit: exit\n  });\n}\n\nvar _brXHR = /*#__PURE__*/function (_XMLHttpRequest) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(_brXHR, _XMLHttpRequest);\n\n  var _super = _createSuper(_brXHR);\n\n  function _brXHR() {\n    var _this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, _brXHR);\n\n    _this = _super.call(this);\n    _this.localPrefix = self._brLocalPathPrefix + '/';\n    _this.localRequestOpened = false;\n    _this.localRequestSent = false;\n    _this.localResponseText = null;\n    return _this;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(_brXHR, [{\n    key: \"open\",\n    value: function open() {\n      var _get2;\n\n      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {\n        params[_key] = arguments[_key];\n      }\n\n      if (params.length > 1) {\n        var url = params[1];\n\n        if (url.startsWith(this.localPrefix)) {\n          var localPath = url.slice(this.localPrefix.length, url.indexOf('?'));\n          this.localResponseText = _brImportLocalFile(localPath);\n          this.localRequestOpened = true; // TODO: Call onreadystatechange.\n\n          return;\n        }\n      }\n\n      return (_get2 = _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(_brXHR.prototype), \"open\", this)).call.apply(_get2, [this].concat(params));\n    }\n  }, {\n    key: \"send\",\n    value: function send() {\n      if (this.localRequestOpened) {\n        this.localRequestSent = true;\n      } else {\n        var _get3;\n\n        for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n          params[_key2] = arguments[_key2];\n        }\n\n        return (_get3 = _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(_brXHR.prototype), \"send\", this)).call.apply(_get3, [this].concat(params));\n      }\n    }\n  }, {\n    key: \"status\",\n    get: function get() {\n      if (this.localRequestOpened) {\n        if (this.localResponseText === null) {\n          return 404;\n        } else {\n          return 200;\n        }\n      } else {\n        return _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(_brXHR.prototype), \"status\", this);\n      }\n    }\n  }, {\n    key: \"readyState\",\n    get: function get() {\n      if (this.localRequestOpened) {\n        if (this.localRequestSent) {\n          return 4;\n        } else {\n          return 1;\n        }\n      } else {\n        return _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(_brXHR.prototype), \"readyState\", this);\n      }\n    }\n  }, {\n    key: \"responseText\",\n    get: function get() {\n      if (this.localRequestOpened) {\n        return this.localResponseText;\n      } else {\n        return _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(_brXHR.prototype), \"responseText\", this);\n      }\n    }\n  }]);\n\n  return _brXHR;\n}( /*#__PURE__*/_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_6___default()(XMLHttpRequest));\n\nself.onmessage = function (message) {\n  var data = message.data;\n\n  switch (data.type) {\n    case 'init':\n      _brInitRunner(data);\n\n      break;\n\n    case 'run.code':\n      try {\n        _brRun(data.code);\n\n        _brRunCallback(0);\n      } catch (err) {\n        _brRunCallback(1);\n      }\n\n      break;\n\n    case 'run.code-with-files':\n      try {\n        _brSetFiles(data.files);\n\n        _brRun(data.code);\n\n        _brRunCallback(0);\n      } catch (err) {\n        _brRunCallback(1);\n      }\n\n      break;\n\n    case 'run.url':\n      try {\n        _brRunUrl(data.url);\n\n        _brRunCallback(0);\n      } catch (err) {\n        _brRunCallback(1);\n      }\n\n      break;\n\n    default:\n      break;\n  }\n\n  if (data.type in self._brMsgListeners) {\n    for (var i = 0; i < self._brMsgListeners[data.type].length; i++) {\n      self._brMsgListeners[data.type][i](data);\n    }\n  }\n};\n\n//# sourceURL=webpack:///./src/core/brython-runner.worker.js?");

/***/ }),

/***/ 1:
/*!*************************************************!*\
  !*** multi ./src/core/brython-runner.worker.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/core/brython-runner.worker.js */\"./src/core/brython-runner.worker.js\");\n\n\n//# sourceURL=webpack:///multi_./src/core/brython-runner.worker.js?");

/***/ })

/******/ });
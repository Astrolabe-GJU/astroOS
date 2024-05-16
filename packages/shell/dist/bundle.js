/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar R = typeof Reflect === 'object' ? Reflect : null\nvar ReflectApply = R && typeof R.apply === 'function'\n  ? R.apply\n  : function ReflectApply(target, receiver, args) {\n    return Function.prototype.apply.call(target, receiver, args);\n  }\n\nvar ReflectOwnKeys\nif (R && typeof R.ownKeys === 'function') {\n  ReflectOwnKeys = R.ownKeys\n} else if (Object.getOwnPropertySymbols) {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target)\n      .concat(Object.getOwnPropertySymbols(target));\n  };\n} else {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target);\n  };\n}\n\nfunction ProcessEmitWarning(warning) {\n  if (console && console.warn) console.warn(warning);\n}\n\nvar NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {\n  return value !== value;\n}\n\nfunction EventEmitter() {\n  EventEmitter.init.call(this);\n}\nmodule.exports = EventEmitter;\nmodule.exports.once = once;\n\n// Backwards-compat with node 0.10.x\nEventEmitter.EventEmitter = EventEmitter;\n\nEventEmitter.prototype._events = undefined;\nEventEmitter.prototype._eventsCount = 0;\nEventEmitter.prototype._maxListeners = undefined;\n\n// By default EventEmitters will print a warning if more than 10 listeners are\n// added to it. This is a useful default which helps finding memory leaks.\nvar defaultMaxListeners = 10;\n\nfunction checkListener(listener) {\n  if (typeof listener !== 'function') {\n    throw new TypeError('The \"listener\" argument must be of type Function. Received type ' + typeof listener);\n  }\n}\n\nObject.defineProperty(EventEmitter, 'defaultMaxListeners', {\n  enumerable: true,\n  get: function() {\n    return defaultMaxListeners;\n  },\n  set: function(arg) {\n    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {\n      throw new RangeError('The value of \"defaultMaxListeners\" is out of range. It must be a non-negative number. Received ' + arg + '.');\n    }\n    defaultMaxListeners = arg;\n  }\n});\n\nEventEmitter.init = function() {\n\n  if (this._events === undefined ||\n      this._events === Object.getPrototypeOf(this)._events) {\n    this._events = Object.create(null);\n    this._eventsCount = 0;\n  }\n\n  this._maxListeners = this._maxListeners || undefined;\n};\n\n// Obviously not all Emitters should be limited to 10. This function allows\n// that to be increased. Set to zero for unlimited.\nEventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {\n  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {\n    throw new RangeError('The value of \"n\" is out of range. It must be a non-negative number. Received ' + n + '.');\n  }\n  this._maxListeners = n;\n  return this;\n};\n\nfunction _getMaxListeners(that) {\n  if (that._maxListeners === undefined)\n    return EventEmitter.defaultMaxListeners;\n  return that._maxListeners;\n}\n\nEventEmitter.prototype.getMaxListeners = function getMaxListeners() {\n  return _getMaxListeners(this);\n};\n\nEventEmitter.prototype.emit = function emit(type) {\n  var args = [];\n  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);\n  var doError = (type === 'error');\n\n  var events = this._events;\n  if (events !== undefined)\n    doError = (doError && events.error === undefined);\n  else if (!doError)\n    return false;\n\n  // If there is no 'error' event listener then throw.\n  if (doError) {\n    var er;\n    if (args.length > 0)\n      er = args[0];\n    if (er instanceof Error) {\n      // Note: The comments on the `throw` lines are intentional, they show\n      // up in Node's output if this results in an unhandled exception.\n      throw er; // Unhandled 'error' event\n    }\n    // At least give some kind of context to the user\n    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));\n    err.context = er;\n    throw err; // Unhandled 'error' event\n  }\n\n  var handler = events[type];\n\n  if (handler === undefined)\n    return false;\n\n  if (typeof handler === 'function') {\n    ReflectApply(handler, this, args);\n  } else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n    for (var i = 0; i < len; ++i)\n      ReflectApply(listeners[i], this, args);\n  }\n\n  return true;\n};\n\nfunction _addListener(target, type, listener, prepend) {\n  var m;\n  var events;\n  var existing;\n\n  checkListener(listener);\n\n  events = target._events;\n  if (events === undefined) {\n    events = target._events = Object.create(null);\n    target._eventsCount = 0;\n  } else {\n    // To avoid recursion in the case that type === \"newListener\"! Before\n    // adding it to the listeners, first emit \"newListener\".\n    if (events.newListener !== undefined) {\n      target.emit('newListener', type,\n                  listener.listener ? listener.listener : listener);\n\n      // Re-assign `events` because a newListener handler could have caused the\n      // this._events to be assigned to a new object\n      events = target._events;\n    }\n    existing = events[type];\n  }\n\n  if (existing === undefined) {\n    // Optimize the case of one listener. Don't need the extra array object.\n    existing = events[type] = listener;\n    ++target._eventsCount;\n  } else {\n    if (typeof existing === 'function') {\n      // Adding the second element, need to change to array.\n      existing = events[type] =\n        prepend ? [listener, existing] : [existing, listener];\n      // If we've already got an array, just append.\n    } else if (prepend) {\n      existing.unshift(listener);\n    } else {\n      existing.push(listener);\n    }\n\n    // Check for listener leak\n    m = _getMaxListeners(target);\n    if (m > 0 && existing.length > m && !existing.warned) {\n      existing.warned = true;\n      // No error code for this since it is a Warning\n      // eslint-disable-next-line no-restricted-syntax\n      var w = new Error('Possible EventEmitter memory leak detected. ' +\n                          existing.length + ' ' + String(type) + ' listeners ' +\n                          'added. Use emitter.setMaxListeners() to ' +\n                          'increase limit');\n      w.name = 'MaxListenersExceededWarning';\n      w.emitter = target;\n      w.type = type;\n      w.count = existing.length;\n      ProcessEmitWarning(w);\n    }\n  }\n\n  return target;\n}\n\nEventEmitter.prototype.addListener = function addListener(type, listener) {\n  return _addListener(this, type, listener, false);\n};\n\nEventEmitter.prototype.on = EventEmitter.prototype.addListener;\n\nEventEmitter.prototype.prependListener =\n    function prependListener(type, listener) {\n      return _addListener(this, type, listener, true);\n    };\n\nfunction onceWrapper() {\n  if (!this.fired) {\n    this.target.removeListener(this.type, this.wrapFn);\n    this.fired = true;\n    if (arguments.length === 0)\n      return this.listener.call(this.target);\n    return this.listener.apply(this.target, arguments);\n  }\n}\n\nfunction _onceWrap(target, type, listener) {\n  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };\n  var wrapped = onceWrapper.bind(state);\n  wrapped.listener = listener;\n  state.wrapFn = wrapped;\n  return wrapped;\n}\n\nEventEmitter.prototype.once = function once(type, listener) {\n  checkListener(listener);\n  this.on(type, _onceWrap(this, type, listener));\n  return this;\n};\n\nEventEmitter.prototype.prependOnceListener =\n    function prependOnceListener(type, listener) {\n      checkListener(listener);\n      this.prependListener(type, _onceWrap(this, type, listener));\n      return this;\n    };\n\n// Emits a 'removeListener' event if and only if the listener was removed.\nEventEmitter.prototype.removeListener =\n    function removeListener(type, listener) {\n      var list, events, position, i, originalListener;\n\n      checkListener(listener);\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      list = events[type];\n      if (list === undefined)\n        return this;\n\n      if (list === listener || list.listener === listener) {\n        if (--this._eventsCount === 0)\n          this._events = Object.create(null);\n        else {\n          delete events[type];\n          if (events.removeListener)\n            this.emit('removeListener', type, list.listener || listener);\n        }\n      } else if (typeof list !== 'function') {\n        position = -1;\n\n        for (i = list.length - 1; i >= 0; i--) {\n          if (list[i] === listener || list[i].listener === listener) {\n            originalListener = list[i].listener;\n            position = i;\n            break;\n          }\n        }\n\n        if (position < 0)\n          return this;\n\n        if (position === 0)\n          list.shift();\n        else {\n          spliceOne(list, position);\n        }\n\n        if (list.length === 1)\n          events[type] = list[0];\n\n        if (events.removeListener !== undefined)\n          this.emit('removeListener', type, originalListener || listener);\n      }\n\n      return this;\n    };\n\nEventEmitter.prototype.off = EventEmitter.prototype.removeListener;\n\nEventEmitter.prototype.removeAllListeners =\n    function removeAllListeners(type) {\n      var listeners, events, i;\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      // not listening for removeListener, no need to emit\n      if (events.removeListener === undefined) {\n        if (arguments.length === 0) {\n          this._events = Object.create(null);\n          this._eventsCount = 0;\n        } else if (events[type] !== undefined) {\n          if (--this._eventsCount === 0)\n            this._events = Object.create(null);\n          else\n            delete events[type];\n        }\n        return this;\n      }\n\n      // emit removeListener for all listeners on all events\n      if (arguments.length === 0) {\n        var keys = Object.keys(events);\n        var key;\n        for (i = 0; i < keys.length; ++i) {\n          key = keys[i];\n          if (key === 'removeListener') continue;\n          this.removeAllListeners(key);\n        }\n        this.removeAllListeners('removeListener');\n        this._events = Object.create(null);\n        this._eventsCount = 0;\n        return this;\n      }\n\n      listeners = events[type];\n\n      if (typeof listeners === 'function') {\n        this.removeListener(type, listeners);\n      } else if (listeners !== undefined) {\n        // LIFO order\n        for (i = listeners.length - 1; i >= 0; i--) {\n          this.removeListener(type, listeners[i]);\n        }\n      }\n\n      return this;\n    };\n\nfunction _listeners(target, type, unwrap) {\n  var events = target._events;\n\n  if (events === undefined)\n    return [];\n\n  var evlistener = events[type];\n  if (evlistener === undefined)\n    return [];\n\n  if (typeof evlistener === 'function')\n    return unwrap ? [evlistener.listener || evlistener] : [evlistener];\n\n  return unwrap ?\n    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);\n}\n\nEventEmitter.prototype.listeners = function listeners(type) {\n  return _listeners(this, type, true);\n};\n\nEventEmitter.prototype.rawListeners = function rawListeners(type) {\n  return _listeners(this, type, false);\n};\n\nEventEmitter.listenerCount = function(emitter, type) {\n  if (typeof emitter.listenerCount === 'function') {\n    return emitter.listenerCount(type);\n  } else {\n    return listenerCount.call(emitter, type);\n  }\n};\n\nEventEmitter.prototype.listenerCount = listenerCount;\nfunction listenerCount(type) {\n  var events = this._events;\n\n  if (events !== undefined) {\n    var evlistener = events[type];\n\n    if (typeof evlistener === 'function') {\n      return 1;\n    } else if (evlistener !== undefined) {\n      return evlistener.length;\n    }\n  }\n\n  return 0;\n}\n\nEventEmitter.prototype.eventNames = function eventNames() {\n  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];\n};\n\nfunction arrayClone(arr, n) {\n  var copy = new Array(n);\n  for (var i = 0; i < n; ++i)\n    copy[i] = arr[i];\n  return copy;\n}\n\nfunction spliceOne(list, index) {\n  for (; index + 1 < list.length; index++)\n    list[index] = list[index + 1];\n  list.pop();\n}\n\nfunction unwrapListeners(arr) {\n  var ret = new Array(arr.length);\n  for (var i = 0; i < ret.length; ++i) {\n    ret[i] = arr[i].listener || arr[i];\n  }\n  return ret;\n}\n\nfunction once(emitter, name) {\n  return new Promise(function (resolve, reject) {\n    function errorListener(err) {\n      emitter.removeListener(name, resolver);\n      reject(err);\n    }\n\n    function resolver() {\n      if (typeof emitter.removeListener === 'function') {\n        emitter.removeListener('error', errorListener);\n      }\n      resolve([].slice.call(arguments));\n    };\n\n    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });\n    if (name !== 'error') {\n      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });\n    }\n  });\n}\n\nfunction addErrorHandlerIfEventEmitter(emitter, handler, flags) {\n  if (typeof emitter.on === 'function') {\n    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);\n  }\n}\n\nfunction eventTargetAgnosticAddListener(emitter, name, listener, flags) {\n  if (typeof emitter.on === 'function') {\n    if (flags.once) {\n      emitter.once(name, listener);\n    } else {\n      emitter.on(name, listener);\n    }\n  } else if (typeof emitter.addEventListener === 'function') {\n    // EventTarget does not have `error` event semantics like Node\n    // EventEmitters, we do not listen for `error` events here.\n    emitter.addEventListener(name, function wrapListener(arg) {\n      // IE does not have builtin `{ once: true }` support so we\n      // have to do it manually.\n      if (flags.once) {\n        emitter.removeEventListener(name, wrapListener);\n      }\n      listener(arg);\n    });\n  } else {\n    throw new TypeError('The \"emitter\" argument must be of type EventEmitter. Received type ' + typeof emitter);\n  }\n}\n\n\n//# sourceURL=webpack://shell/./node_modules/events/events.js?");

/***/ }),

/***/ "./src/cli_controller.js":
/*!*******************************!*\
  !*** ./src/cli_controller.js ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   displayOutput: () => (/* binding */ displayOutput),\n/* harmony export */   parseAndExecuteCommand: () => (/* binding */ parseAndExecuteCommand)\n/* harmony export */ });\n/* harmony import */ var _repo_shell_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./repo/shell_api */ \"./src/repo/shell_api.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_repo_shell_api__WEBPACK_IMPORTED_MODULE_0__]);\n_repo_shell_api__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\r\nfunction parseAndExecuteCommand(command, upperDoc, shell) {\r\n  \r\n\r\n  let tokens = command.toLowerCase().split(\" \");\r\n  let exe = tokens[0];\r\n  let args = tokens.slice(1);\r\n  let currentDirectory = shell.dirStack.peek();\r\n  let output = '';\r\n\r\n  switch (exe) {\r\n    case \"help\":\r\n      break;\r\n    case \"cd\":\r\n      break;\r\n    case \"md\":\r\n      break;\r\n    case \"mkdir\":\r\n       output = (0,_repo_shell_api__WEBPACK_IMPORTED_MODULE_0__.makeDirectory)(args, currentDirectory);\r\n    //   if (res2 != null) {\r\n    //     let d2 = document.createElement(\"div\");\r\n    //     d2.innerHTML = spanText(theme.red, res2);\r\n    //     appendHistory(upperDoc, d2);\r\n    //   }\r\n\r\n      break;\r\n    }\r\n    output != \"\" ? displayOutput(output, upperDoc) : null;\r\n}\r\nfunction displayOutput(output) {}\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://shell/./src/cli_controller.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cli_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cli_controller */ \"./src/cli_controller.js\");\n/* harmony import */ var _models_shell_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/shell_model */ \"./src/models/shell_model.js\");\n/* harmony import */ var _init_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./init_data */ \"./src/init_data.js\");\n/* harmony import */ var _models_directory_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/directory_model */ \"./src/models/directory_model.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_cli_controller__WEBPACK_IMPORTED_MODULE_0__, _models_shell_model__WEBPACK_IMPORTED_MODULE_1__, _init_data__WEBPACK_IMPORTED_MODULE_2__, _models_directory_model__WEBPACK_IMPORTED_MODULE_3__]);\n([_cli_controller__WEBPACK_IMPORTED_MODULE_0__, _models_shell_model__WEBPACK_IMPORTED_MODULE_1__, _init_data__WEBPACK_IMPORTED_MODULE_2__, _models_directory_model__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\r\n\r\n\r\n// init Data()\r\n//initDb()\r\n///\r\n\r\n\r\nawait (0,_init_data__WEBPACK_IMPORTED_MODULE_2__.initData)();\r\n\r\nlet shell = new _models_shell_model__WEBPACK_IMPORTED_MODULE_1__.Shell();\r\n\r\nlet dirLabel = document.getElementById(\"dir-label\");\r\nlet upperDoc = document.querySelector(\".terminal-upper\");\r\nshell.dirStack.on(\"valueChanged\", (newValue) => {\r\n  // Update the <div> with the new value\r\n  dirLabel.textContent = shell.dirStack.address;\r\n});\r\n\r\ndirLabel.textContent = shell.dirStack.address;\r\nlet terminal = document\r\n  .getElementById(\"terminal-id\")\r\n  .addEventListener(\"keydown\", function (event) {\r\n    if (event.key === \"Enter\") {\r\n      event.preventDefault();\r\n      const textNode = document.createTextNode(\"\\n\");\r\n      shell.pushHistory(this.value);\r\n      (0,_cli_controller__WEBPACK_IMPORTED_MODULE_0__.parseAndExecuteCommand)(this.value, upperDoc, shell);\r\n      this.value = \"\";\r\n    } else if (event.key == \"ArrowUp\") {\r\n      event.preventDefault();\r\n      this.value = shell.getPreviousCommand();\r\n    } else if (event.key == \"ArrowDown\") {\r\n      event.preventDefault();\r\n      this.value = shell.getNextCommand();\r\n    }\r\n  });\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://shell/./src/index.js?");

/***/ }),

/***/ "./src/init_data.js":
/*!**************************!*\
  !*** ./src/init_data.js ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initData: () => (/* binding */ initData)\n/* harmony export */ });\n/* harmony import */ var _models_directory_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/directory_model */ \"./src/models/directory_model.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_models_directory_model__WEBPACK_IMPORTED_MODULE_0__]);\n_models_directory_model__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\r\n\r\n// Get ROOT Directory --> pushTOIndexedDB\r\nasync function initData() {\r\n    const request = indexedDB.open(\"astroOS\");\r\n\r\n    request.onupgradeneeded = function (event) {\r\n      const db = event.target.result;\r\n\r\n      const transaction = db.transaction([\"directories\"], \"readwrite\");\r\n      const objectStore = transaction.objectStore(\"directories\");\r\n      const requestAdd = objectStore.add({\r\n        id: _models_directory_model__WEBPACK_IMPORTED_MODULE_0__.rootDirectory.id,\r\n        path: _models_directory_model__WEBPACK_IMPORTED_MODULE_0__.rootDirectory.path,\r\n        name: _models_directory_model__WEBPACK_IMPORTED_MODULE_0__.rootDirectory.name,\r\n        directories: _models_directory_model__WEBPACK_IMPORTED_MODULE_0__.rootDirectory.directories,\r\n        files: _models_directory_model__WEBPACK_IMPORTED_MODULE_0__.rootDirectory.files,\r\n        size: _models_directory_model__WEBPACK_IMPORTED_MODULE_0__.rootDirectory.size,\r\n        dateCreated: _models_directory_model__WEBPACK_IMPORTED_MODULE_0__.rootDirectory.dateCreated,\r\n        dateModified: _models_directory_model__WEBPACK_IMPORTED_MODULE_0__.rootDirectory.dateModified,\r\n      });\r\n      // Event listener for the add request\r\n      requestAdd.onsuccess = function (event) {\r\n        console.log(\"Directory data added to IndexedDB\");\r\n      };\r\n      transaction.oncomplete = function (event) {\r\n        console.log(\"Transaction completed: Directory data saved to IndexedDB\");\r\n      };\r\n      transaction.onerror = function (event) {\r\n        console.error(\"Transaction error:\", event.target.error);\r\n      };\r\n    };\r\n\r\n    // Event listener for any errors that occur when opening the database\r\n    request.onerror = function (event) {\r\n      console.error(\"Database error:\", event.target.error);\r\n      // TODO: @return fail object\r\n    };\r\n    \r\n\r\n    console.log(\"@initData sucess✨ \");\r\n}\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://shell/./src/init_data.js?");

/***/ }),

/***/ "./src/memory/directory_stack.js":
/*!***************************************!*\
  !*** ./src/memory/directory_stack.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DirectoryStack: () => (/* binding */ DirectoryStack)\n/* harmony export */ });\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ \"./node_modules/events/events.js\");\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);\n\r\n// IsEmpty operation: Checks if the stack is empty\r\nclass DirectoryStack extends (events__WEBPACK_IMPORTED_MODULE_0___default()) {\r\n  constructor(_ROOT_) {\r\n    super();\r\n    \r\n    this._ROOT = _ROOT_; // Root directory symbol\r\n    this.directories = [_ROOT_]; // Array to hold directories\r\n    this.address = this._ROOT.name; // Current address\r\n   \r\n  }\r\n\r\n  // Method to push a directory onto the stack\r\n  push(directory) {\r\n    this.directories.push(directory);\r\n    this.updateAddress();\r\n    this.emit('valueChanged', directory);\r\n  }\r\n\r\n  // Method to pop a directory from the stack\r\n  pop() {\r\n    const poppedDirectory = this.directories.pop();\r\n    this.updateAddress();\r\n    this.emit('valueChanged', poppedDirectory);\r\n    return poppedDirectory;\r\n  }\r\n\r\n  // Method to peek at the current directory\r\n  peek() {\r\n    return this.isEmpty()\r\n      ? this._ROOT\r\n      : this.directories[this.directories.length - 1];\r\n\r\n  }\r\n\r\n  // Method to get the number of directories in the stack\r\n  size() {\r\n    return this.directories.length;\r\n  }\r\n\r\n  // Method to check if the Stack is empty\r\n  isEmpty() {\r\n    return this.directories.length == 1 ? true : false;\r\n  }\r\n\r\n  // Method to clear the stack (remove all directories)\r\n  clear() {\r\n    this.directories = [];\r\n    this.address = this._ROOT.name;\r\n  }\r\n\r\n  // Method to update the address based on the current stack\r\n  updateAddress() {\r\n    const directoryNames = this.directories.map((directory) => directory.name);\r\n    this.address = directoryNames.join(\"/\");\r\n    return this.address\r\n  }\r\n\r\n  // Method to print the address and all elements in the stack\r\n  print() {\r\n    console.log(\"Address:\", this.address);\r\n    console.log(\"Stack:\");\r\n    this.directories.forEach((directory) => console.log(directory));\r\n  }\r\n  \r\n}\r\n\n\n//# sourceURL=webpack://shell/./src/memory/directory_stack.js?");

/***/ }),

/***/ "./src/models/directory_model.js":
/*!***************************************!*\
  !*** ./src/models/directory_model.js ***!
  \***************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Directory: () => (/* binding */ Directory),\n/* harmony export */   rootDirectory: () => (/* binding */ rootDirectory)\n/* harmony export */ });\n/* harmony import */ var _utils_date_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/date_service */ \"./src/utils/date_service.js\");\n/* harmony import */ var _mockdata_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../mockdata.json */ \"./src/mockdata.json\");\n/* harmony import */ var _utils_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/user */ \"./src/utils/user.js\");\n\r\n\r\n\r\n//import { user } from \"../init_data\";\r\n\r\n// @TODO: complete dis\r\n\r\nclass Directory {\r\n  constructor({\r\n    id,\r\n    name,\r\n    path,\r\n    directories = [],\r\n    files = [],\r\n    dateCreated,\r\n    dateModified,\r\n    type = \"File Folder\",\r\n    size = 0,\r\n  }) {\r\n    //TODO: Test whether Id is better if private\r\n    this._id = id; // ID of the Directory / Abs. Path with dir name\r\n    this.name = name; // Name of the directory\r\n    this._path = path; // Parent Path of the directory\r\n    this.directories = directories; // Array to store directories IDs\r\n    this.files = files; // Array to store files refs\r\n    this.dateCreated = dateCreated; // Date when the directory was created\r\n    this.dateModified = dateModified; // Date when the directory was last modified\r\n    this.size = size;\r\n    this.type = type;\r\n  }\r\n  addDirectory(directory) {\r\n    this.directories.push(directory);\r\n  }\r\n  get id() {\r\n    return this._id;\r\n  }\r\n  get path() {\r\n    return this._path;\r\n  }\r\n\r\n  set path(newPath) {\r\n    this._path = newPath;\r\n    // Optionally update the ID if needed\r\n    this._id = this._path + \"/\" + this._name;\r\n  }\r\n  removeDirectory(directory) {\r\n    // TODO: Implement all Cases.\r\n    this.directories.pop(directory);\r\n  }\r\n  addFile(files) {\r\n    this.files.push(files);\r\n  }\r\n  removeFile(files) {\r\n    // TODO: Implement all Cases.\r\n    this.files.pop(files);\r\n  }\r\n  getNumOfItems() {\r\n    return this.directories.length + this.files.length;\r\n  }\r\n  listItems(address) {\r\n    const directoryContents = [\r\n      {\r\n        mode: \"______\",\r\n        lastWriteTime: \"_____________\",\r\n        length: \"______\",\r\n        name: \"_________\",\r\n      },\r\n    ];\r\n    let div = document.createElement(\"div\");\r\n    const table = document.createElement(\"table\");\r\n    div.innerHTML =\r\n      '<br><br><span style=\"font-weigth: 600 ; color: #c3e88d;\" >' +\r\n      address +\r\n      \"</span><br><br>\";\r\n    table.innerHTML =\r\n      '<table id=\"directoryTable\"><thead><tr><th>Mode</th><th>LastWriteTime</th><th>Length</th><th>Name</th></tr></thead></table>';\r\n    const directoryBody = document.createElement(\"tbody\");\r\n    // Loop through each item in the directory contents\r\n    const rw_body = directoryBody.insertRow();\r\n    rw_body.insertCell().textContent = directoryContents[0].mode;\r\n    rw_body.insertCell().textContent = directoryContents[0].lastWriteTime;\r\n    rw_body.insertCell().textContent = directoryContents[0].length;\r\n    rw_body.insertCell().textContent = directoryContents[0].name;\r\n    table.appendChild(rw_body);\r\n    this.directories.forEach((dir) => {\r\n      const row = directoryBody.insertRow();\r\n      row.insertCell().textContent = \"d_____\";\r\n      row.insertCell().textContent = dir.dateModified;\r\n      row.insertCell().textContent = dir.size;\r\n      row.insertCell().textContent = dir.name;\r\n      table.appendChild(row);\r\n    });\r\n    this.files.forEach((file) => {\r\n      const row = directoryBody.insertRow();\r\n      row.insertCell().textContent = file.type;\r\n      row.insertCell().textContent = file.dateModified;\r\n      row.insertCell().textContent = file.size;\r\n      row.insertCell().textContent = file.name;\r\n      table.appendChild(row);\r\n    });\r\n    div.appendChild(table);\r\n    return div;\r\n    // Call the function to display directory contents\r\n\r\n    throw Error(\"UnImplemented Error | Directory.listItems()\");\r\n  }\r\n}\r\n// const _R = new Directory({\r\n//   name: \"~\",\r\n//   path: \"~\",\r\n//   directories: [],\r\n//   files: [],\r\n//   dateCreated: Date(),\r\n//   dateModified: Date(),\r\n// });\r\n// export default _R;\r\n\r\n// export const _ROOT_ = new Directory({\r\n//   id: mockData.id,\r\n//   path: \"\",\r\n//   name: mockData.name,\r\n//   directories: [],\r\n//   files: [],\r\n//   dateCreated: getCurrentTime(),\r\n//   dateModified: getCurrentTime(),\r\n// });\r\n\r\nconst user = await (0,_utils_user__WEBPACK_IMPORTED_MODULE_2__.getUsername)()\r\nconst rootDirectory = new Directory({\r\n  id: user,\r\n  name: user,\r\n  path: \"\",\r\n  directories: [],\r\n  files: [],\r\n  dateCreated: (0,_utils_date_service__WEBPACK_IMPORTED_MODULE_0__.getCurrentTime)(),\r\n  dateModified: (0,_utils_date_service__WEBPACK_IMPORTED_MODULE_0__.getCurrentTime)(),\r\n  size: 0,\r\n});\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://shell/./src/models/directory_model.js?");

/***/ }),

/***/ "./src/models/shell_model.js":
/*!***********************************!*\
  !*** ./src/models/shell_model.js ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Shell: () => (/* binding */ Shell)\n/* harmony export */ });\n/* harmony import */ var _init_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../init_data */ \"./src/init_data.js\");\n/* harmony import */ var _memory_directory_stack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../memory/directory_stack */ \"./src/memory/directory_stack.js\");\n/* harmony import */ var _repo_shell_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../repo/shell_api */ \"./src/repo/shell_api.js\");\n/* harmony import */ var _utils_date_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/date_service */ \"./src/utils/date_service.js\");\n/* harmony import */ var _utils_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/user */ \"./src/utils/user.js\");\n/* harmony import */ var _directory_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./directory_model */ \"./src/models/directory_model.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_init_data__WEBPACK_IMPORTED_MODULE_0__, _repo_shell_api__WEBPACK_IMPORTED_MODULE_2__, _directory_model__WEBPACK_IMPORTED_MODULE_5__]);\n([_init_data__WEBPACK_IMPORTED_MODULE_0__, _repo_shell_api__WEBPACK_IMPORTED_MODULE_2__, _directory_model__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass Shell {\r\n  // Shell stack initilaized @ROOT ---> // currentDirectory\r\n\r\n  // access to Shell API\r\n  //  Auth\r\n  constructor() {\r\n    \r\n   \r\n    this.dirStack = new _memory_directory_stack__WEBPACK_IMPORTED_MODULE_1__.DirectoryStack(_directory_model__WEBPACK_IMPORTED_MODULE_5__.rootDirectory);\r\n    this.commandHistory = [];\r\n    this.currentHistoryIndex = -1;\r\n    this.account = _directory_model__WEBPACK_IMPORTED_MODULE_5__.rootDirectory.name;\r\n  }\r\n  \r\n  pushHistory(command) {\r\n    const addedCommand = this.commandHistory.push(command);\r\n    console.log(\"@push history: \", command);\r\n    this.currentHistoryIndex = this.commandHistory.length = 1;\r\n    return addedCommand;\r\n  }\r\n  getPreviousCommand() {\r\n    if (this.currentHistoryIndex > 0) {\r\n      this.currentHistoryIndex--;\r\n      return this.commandHistory[this.currentHistoryIndex];\r\n    } else {\r\n      return null; // No previous command\r\n    }\r\n  }\r\n\r\n  \r\n  getNextCommand() {\r\n    if (this.currentHistoryIndex < this.commandHistory.length - 1) {\r\n      this.currentHistoryIndex++;\r\n      return this.commandHistory[this.currentHistoryIndex];\r\n    } else {\r\n      return null; // No next command\r\n    }\r\n  }\r\n\r\n  isEmpty() {\r\n    return this.commandHistory.length == 0 ? true : false;\r\n  }\r\n  executeCommand() {}\r\n}\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://shell/./src/models/shell_model.js?");

/***/ }),

/***/ "./src/repo/directories_api.js":
/*!*************************************!*\
  !*** ./src/repo/directories_api.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createDirectoryDb: () => (/* binding */ createDirectoryDb)\n/* harmony export */ });\n/* harmony import */ var _utils_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/response */ \"./src/utils/response.js\");\n\r\n\r\nfunction createDirectoryDb(directory, pid) {\r\n    const response = new _utils_response__WEBPACK_IMPORTED_MODULE_0__.Response(200, \"\")\r\n    const request = indexedDB.open(\"astroOS\");\r\n\r\n    request.onsuccess = function (event) {\r\n      const db = event.target.result;\r\n\r\n      const transaction = db.transaction([\"directories\"], \"readwrite\");\r\n      const objectStore = transaction.objectStore(\"directories\");\r\n      const requestAdd = objectStore.add({\r\n        id: directory.id,\r\n        path: directory.path,\r\n        name: directory.name,\r\n        directories: directory.directories,\r\n        files: directory.files,\r\n        size: directory.size,\r\n        dateCreated: directory.dateCreated,\r\n        dateModified: directory.dateModified,\r\n      });\r\n      // @might-break\r\n      if (pid != \"\"){\r\n        console.log(\"@pid\", pid);\r\n        const requestGet = objectStore.get(pid)\r\n        requestGet.onsuccess = function (event) {\r\n          const existingFile = event.target.result;\r\n          console.log(\"@updateDirectoryDb() - existingFile: \", existingFile);\r\n          if (existingFile) {\r\n           ///////\r\n            let records = existingFile.directories;\r\n            records.push(directory)\r\n            console.log(records);\r\n            existingFile.directories = records\r\n            /////////\r\n            existingFile.dateModified = new Date().toISOString()\r\n            \r\n            \r\n            \r\n            const putRequest = objectStore.put(existingFile);\r\n            \r\n            console.log(\"@updateDirectoryDb() - putFile: \", existingFile);\r\n            putRequest.onsuccess = function (event) {\r\n              console.log(\"Parent Data updated in IndexedDB\");\r\n            };\r\n            putRequest.onerror = function (event) {\r\n              console.error(\"Put request error:\", event.target.error);\r\n            };\r\n          } else {\r\n            console.error(\"Document not found:\", directory.path);\r\n          }\r\n        }\r\n      }\r\n\r\n      // Event listener for the add request\r\n      requestAdd.onsuccess = function (event) {\r\n        console.log(\"Directory data added to IndexedDB\");\r\n      };\r\n      transaction.oncomplete = function (event) {\r\n        console.log(\"Transaction completed: Directory data saved to IndexedDB\");\r\n      };\r\n      transaction.onerror = function (event) {\r\n        console.error(\"Transaction error:\", event.target.error);\r\n      };\r\n    };\r\n\r\n    // Event listener for any errors that occur when opening the database\r\n    request.onerror = function (event) {\r\n      console.error(\"Database error:\", event.target.error);\r\n      // TODO: @return fail object\r\n      response.status(400)\r\n      response.payload(\"Database Error\")\r\n    };\r\n    \r\n    //TODO: @return success value\r\n    return response\r\n}\n\n//# sourceURL=webpack://shell/./src/repo/directories_api.js?");

/***/ }),

/***/ "./src/repo/shell_api.js":
/*!*******************************!*\
  !*** ./src/repo/shell_api.js ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   makeDirectory: () => (/* binding */ makeDirectory)\n/* harmony export */ });\n/* harmony import */ var _directories_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./directories_api */ \"./src/repo/directories_api.js\");\n/* harmony import */ var _utils_response__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../utils/response */ \"./src/utils/response.js\");\n/* harmony import */ var _models_directory_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../models/directory_model */ \"./src/models/directory_model.js\");\n/* harmony import */ var _utils_date_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../utils/date_service */ \"./src/utils/date_service.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_models_directory_model__WEBPACK_IMPORTED_MODULE_2__]);\n_models_directory_model__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n/*\r\nSHELL API:\r\n1. acts as a layer between the ui-related controller & other APIs.\r\n2. Instruction Logic that doesn't relate to UI\r\n*/\r\n\r\n\r\n\r\n\r\nfunction makeDirectory(args, currentDirectory) {\r\n\r\n  // mkdir test\r\n  if (args.isEmpty || args[0] == undefined || args[0] == \"\") {\r\n    const res= new _utils_response__WEBPACK_IMPORTED_MODULE_1__.Response(400, \"Please specify Directory Name\");\r\n    return res;\r\n  }\r\n  if (!(args[1] == \"\" || args[1] == undefined)) {\r\n    const res= new _utils_response__WEBPACK_IMPORTED_MODULE_1__.Response(\r\n      400,\r\n      \"Please fix the Naming, Only 1 argument is allowed\\nDid you mean: `mkdir \" +\r\n        args[0] +\r\n        \"/\" +\r\n        args[1] +\r\n        \"`\"\r\n      );\r\n      return res;\r\n  }\r\n\r\n  // TestCASE: 2 Dir with same name & address\r\n  let notUnique = () => {\r\n    for (const directory of currentDirectory.directories) {\r\n      // If the name matches the target, return the directory object\r\n      if (directory.name === args[0]) {\r\n        return true;\r\n      }\r\n    }\r\n    return false;\r\n  };\r\n  if (notUnique()) {\r\n    const res= new _utils_response__WEBPACK_IMPORTED_MODULE_1__.Response(400, \"A Directory with matching Name already Exists\");\r\n    return res;\r\n  }\r\n\r\n  try {\r\n    // create directory\r\n    let newDirectory = new _models_directory_model__WEBPACK_IMPORTED_MODULE_2__.Directory({\r\n      id: currentDirectory.id + '/' + args[0],\r\n      name: args[0],\r\n      path: currentDirectory.id,\r\n      directories: [],\r\n      files: [],\r\n      dateCreated: (0,_utils_date_service__WEBPACK_IMPORTED_MODULE_3__.getCurrentTime)(),\r\n      dateModified: (0,_utils_date_service__WEBPACK_IMPORTED_MODULE_3__.getCurrentTime)(),\r\n    });\r\n\r\n    \r\n    // update parent\r\n    \r\n    // Save to IndexedDB\r\n    (0,_directories_api__WEBPACK_IMPORTED_MODULE_0__.createDirectoryDb)(newDirectory, currentDirectory.id);\r\n    \r\n    // add to parent children\r\n    currentDirectory.addDirectory(newDirectory, currentDirectory);\r\n    \r\n    // Edit data.json, this will serve as a changes pointer\r\n\r\n    const res= new _utils_response__WEBPACK_IMPORTED_MODULE_1__.Response(200, \"\");\r\n    return res;\r\n  } catch (error) {\r\n    console.log(\"Error Creating Directory: \", error);\r\n  }\r\n  const res= new _utils_response__WEBPACK_IMPORTED_MODULE_1__.Response(400, \"Error Creating Directory\");\r\n  return res;\r\n}\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://shell/./src/repo/shell_api.js?");

/***/ }),

/***/ "./src/utils/date_service.js":
/*!***********************************!*\
  !*** ./src/utils/date_service.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getCurrentTime: () => (/* binding */ getCurrentTime),\n/* harmony export */   getRedeableDate: () => (/* binding */ getRedeableDate)\n/* harmony export */ });\nfunction getCurrentTime() {\r\n    return new Date().toISOString()\r\n}\r\nfunction getRedeableDate(isoString) {\r\n    const date = new Date(isoString)\r\n\r\n    const readableDate = date.toLocaleDateString('en-US',{\r\n        year: 'numeric',\r\n        month: 'long',\r\n        day: 'numeric',\r\n        hour: '2-digit',\r\n        minute: '2-digit',\r\n    })\r\n    return readableDate\r\n}\n\n//# sourceURL=webpack://shell/./src/utils/date_service.js?");

/***/ }),

/***/ "./src/utils/response.js":
/*!*******************************!*\
  !*** ./src/utils/response.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Response: () => (/* binding */ Response)\n/* harmony export */ });\nclass Response {\r\n  constructor(status, payload) {\r\n    this._status = status;\r\n    this._payload = payload;\r\n  }\r\n\r\n  get status() {\r\n    return this._status;\r\n  }\r\n  set status(value) {\r\n    this._status = value;\r\n  }\r\n  get payload() {\r\n    return this._payload;\r\n  }\r\n  set payload(payload) {\r\n    this._payload = payload;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://shell/./src/utils/response.js?");

/***/ }),

/***/ "./src/utils/user.js":
/*!***************************!*\
  !*** ./src/utils/user.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getUsername: () => (/* binding */ getUsername)\n/* harmony export */ });\nasync function getUsername() {\r\n  let username = \"\";\r\n await getUsersFromDb()\r\n    .then((records) => {\r\n        if (records.length == 1 ) {\r\n            // emit guest\r\n            username = records[0]\r\n            \r\n        }else{\r\n            // @TODO\r\n            // emit username using a proper logic\r\n            username = records[0]\r\n            \r\n        }\r\n    })\r\n    .catch((error) => {\r\n        console.error(\"ERROR: \", error)\r\n    });\r\n    \r\n    return username\r\n}\r\n\r\nfunction getUsersFromDb() {\r\n  return new Promise((resolve, reject) => {\r\n    // Open the IndexedDB database\r\n    const request = indexedDB.open(\"astroOS\", 1);\r\n\r\n    request.onerror = function (event) {\r\n      reject(\"Database error: \" + event.target.errorCode);\r\n    };\r\n\r\n    request.onsuccess = function (event) {\r\n      const db = event.target.result;\r\n      // Start a new transaction to read from the object store\r\n      const transaction = db.transaction([\"users\"], \"readonly\");\r\n      const store = transaction.objectStore(\"users\");\r\n      // Open a cursor to iterate over all records\r\n      const cursorRequest = store.openCursor();\r\n\r\n      const records = [];\r\n\r\n      cursorRequest.onsuccess = function (event) {\r\n        const cursor = event.target.result;\r\n        if (cursor) {\r\n          // Push record into array\r\n          records.push(cursor.value.username);\r\n          // Move to next record\r\n          cursor.continue();\r\n        } else {\r\n          // Resolve promise with all records\r\n          resolve(records);\r\n        }\r\n      };\r\n\r\n      cursorRequest.onerror = function (event) {\r\n        reject(\"Error fetching records: \" + event.target.errorCode);\r\n      };\r\n    };\r\n  });\r\n}\r\n\n\n//# sourceURL=webpack://shell/./src/utils/user.js?");

/***/ }),

/***/ "./src/mockdata.json":
/*!***************************!*\
  !*** ./src/mockdata.json ***!
  \***************************/
/***/ ((module) => {

eval("module.exports = /*#__PURE__*/JSON.parse('{\"id\":\"ahmadmtr\",\"name\":\"ahmadmtr\",\"path\":\"\",\"directories\":[],\"files\":[],\"dateCreated\":\"\",\"dateModified\":\"\",\"size\":0}');\n\n//# sourceURL=webpack://shell/./src/mockdata.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _init_os__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./init_os */ \"./src/init_os.js\");\n\r\n\r\nawait (0,_init_os__WEBPACK_IMPORTED_MODULE_0__.initOS)();\r\n\r\n function saveUserAccount(username, password) {\r\n    // Open or create IndexedDB database\r\n    const request = indexedDB.open('astroOS', 1);\r\n\r\n    request.onerror = function(event) {\r\n        console.error(\"Database error: \" + event.target.errorCode);\r\n    };\r\n\r\n    request.onsuccess = function(event) {\r\n        const db = event.target.result;\r\n        // Create transaction and object store\r\n        const transaction = db.transaction([\"users\"], \"readwrite\");\r\n        const store = transaction.objectStore(\"users\");\r\n        // Add user account data\r\n        const account = { username: username, password: password };\r\n        const addRequest = store.add(account);\r\n\r\n        addRequest.onsuccess = function(event) {\r\n            console.log(\"User account added successfully\");\r\n        };\r\n\r\n        addRequest.onerror = function(event) {\r\n            console.error(\"Error adding user account: \" + event.target.errorCode);\r\n        };\r\n    };\r\n\r\n    request.onupgradeneeded = function(event) {\r\n        const db = event.target.result;\r\n        // Create object store for user accounts\r\n        const objectStore = db.createObjectStore(\"users\", { keyPath: \"username\" });\r\n    };\r\n}\r\n\r\n// Event listener for form submission\r\ndocument.getElementById('loginForm').addEventListener('submit', function(event) {\r\n    event.preventDefault(); // Prevent form submission\r\n    const username = document.getElementById('username').value;\r\n    const password = document.getElementById('password').value;\r\n    // Save user account\r\n    saveUserAccount(username, password);\r\n    // You can also add authentication logic here\r\n});\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://astroos/./src/index.js?");

/***/ }),

/***/ "./src/init_os.js":
/*!************************!*\
  !*** ./src/init_os.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initOS: () => (/* binding */ initOS)\n/* harmony export */ });\nfunction initDb() {\r\n  const request = indexedDB.open(\"astroOS\", 1);\r\n  request.onerror = function (event) {\r\n    // Handle errors\r\n    console.log(\"Database open ERROR\");\r\n  };\r\n\r\n  request.onsuccess = function (event) {\r\n    // Database connection opened successfully\r\n    const db = event.target.result;\r\n    //    initializeDataDb(_ROOT_);\r\n    console.log(\"Database opened successfully\");\r\n  };\r\n\r\n  request.onupgradeneeded = function (event) {\r\n    const db = event.target.result;\r\n    const directoriesObjectStore = db.createObjectStore(\"directories\", {\r\n      keyPath: \"id\",\r\n    });\r\n    const fileObjectStore = db.createObjectStore(\"files\", {\r\n      keyPath: \"id\",\r\n    });\r\n    const usersObjectStore = db.createObjectStore(\"users\", {\r\n      keyPath: \"username\",\r\n    });\r\n\r\n    //fetchDataDB();\r\n    console.log(\"Database created successfully\");\r\n  };\r\n}\r\nasync function initOS() {\r\n  // create database\r\n  initDb();\r\n  \r\n  // add User\r\n\r\n\r\n  // @TODO\r\n  //return username\r\n  \r\n  console.log(\"AstroOS has been launched! ✨\");\r\n}\r\n\n\n//# sourceURL=webpack://astroos/./src/init_os.js?");

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
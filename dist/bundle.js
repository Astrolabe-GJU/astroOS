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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _user_user_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user/user_api */ \"./src/user/user_api.js\");\n//import { initOS } from \"./init_os\";\r\n\r\n\r\n//await initOS();\r\n\r\n\r\n// @toBeDeleted later\r\ndocument.getElementById('loginForm').addEventListener('submit', function(event) {\r\n    event.preventDefault(); // Prevent form submission\r\n    const username = document.getElementById('username').value;\r\n    const password = document.getElementById('password').value;\r\n  \r\n    // # From User API\r\n    (0,_user_user_api__WEBPACK_IMPORTED_MODULE_0__.saveUserAccount)(username, password);\r\n    \r\n});\n\n//# sourceURL=webpack://astroos/./src/index.js?");

/***/ }),

/***/ "./src/user/user_api.js":
/*!******************************!*\
  !*** ./src/user/user_api.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createIfGuestUser: () => (/* binding */ createIfGuestUser),\n/* harmony export */   getUsername: () => (/* binding */ getUsername),\n/* harmony export */   saveUserAccount: () => (/* binding */ saveUserAccount)\n/* harmony export */ });\nasync function createIfGuestUser() {\r\n  return new Promise((resolve, reject) => {\r\n    const request = indexedDB.open(\"astroOS\", 1);\r\n\r\n    request.onerror = function (event) {\r\n      reject(\"Database error: \" + event.target.errorCode);\r\n    };\r\n\r\n    request.onsuccess = function (event) {\r\n      const db = event.target.result;\r\n      // Create transaction and object store\r\n      const transaction = db.transaction([\"users\"], \"readwrite\");\r\n      const store = transaction.objectStore(\"users\");\r\n\r\n      const getRequest = store.get(\"user\");\r\n\r\n      getRequest.onsuccess = function (event) {\r\n        const guest = event.target.result;\r\n        if (guest) {\r\n          // Meaning there's a guest\r\n\r\n          resolve(guest.username);\r\n        } else {\r\n          saveUserAccount(\"user\", \"password\");\r\n          resolve(\"none\");\r\n        }\r\n      };\r\n\r\n      getRequest.onerror = function (event) {\r\n        reject(\r\n          \"@createGuestUser() :: user_api.js Error: \" + event.target.errorCode\r\n        );\r\n      };\r\n    };\r\n  });\r\n}\r\n\r\nfunction saveUserAccount(username, password) {\r\n  // Open or create IndexedDB database\r\n  const request = indexedDB.open(\"astroOS\", 1);\r\n\r\n  request.onerror = function (event) {\r\n    console.error(\"Database error: \" + event.target.errorCode);\r\n  };\r\n\r\n  request.onsuccess = function (event) {\r\n    const db = event.target.result;\r\n    // Create transaction and object store\r\n    const transaction = db.transaction([\"users\"], \"readwrite\");\r\n    const store = transaction.objectStore(\"users\");\r\n    // Add user account data\r\n    const account = { username: username, password: password };\r\n    const addRequest = store.add(account);\r\n\r\n    addRequest.onsuccess = function (event) {\r\n      console.log(\"User account added successfully\");\r\n    };\r\n\r\n    addRequest.onerror = function (event) {\r\n      console.error(\"Error adding user account: \" + event.target.errorCode);\r\n    };\r\n  };\r\n}\r\nasync function getUsername() {\r\n  let username = \"\";\r\n  await getUsersFromDb()\r\n    .then((records) => {\r\n      if (records.length == 1) {\r\n        // emit guest\r\n        username = records[0];\r\n      } else {\r\n        // @TODO\r\n        // emit username using a proper logic\r\n        username = records[0] != \"user\" ? records[0] : records[1];\r\n      }\r\n    })\r\n    .catch((error) => {\r\n      console.error(\"ERROR: \", error);\r\n    });\r\n\r\n  return username;\r\n}\r\n\r\nfunction getUsersFromDb() {\r\n  return new Promise((resolve, reject) => {\r\n    // Open the IndexedDB database\r\n    const request = indexedDB.open(\"astroOS\", 1);\r\n\r\n    request.onerror = function (event) {\r\n      reject(\"Database error: \" + event.target.errorCode);\r\n    };\r\n\r\n    request.onsuccess = function (event) {\r\n      const db = event.target.result;\r\n      // Start a new transaction to read from the object store\r\n      const transaction = db.transaction([\"users\"], \"readonly\");\r\n      const store = transaction.objectStore(\"users\");\r\n      // Open a cursor to iterate over all records\r\n      const cursorRequest = store.openCursor();\r\n\r\n      const records = [];\r\n\r\n      cursorRequest.onsuccess = function (event) {\r\n        const cursor = event.target.result;\r\n        if (cursor) {\r\n          // Push record into array\r\n          records.push(cursor.value.username);\r\n          // Move to next record\r\n          cursor.continue();\r\n        } else {\r\n          // Resolve promise with all records\r\n          resolve(records);\r\n        }\r\n      };\r\n\r\n      cursorRequest.onerror = function (event) {\r\n        reject(\"Error fetching records: \" + event.target.errorCode);\r\n      };\r\n    };\r\n  });\r\n}\r\n\n\n//# sourceURL=webpack://astroos/./src/user/user_api.js?");

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
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

const funcs = [];

function $l(selector) {

  if (typeof selector === 'function') {
    if (document.readyState === 'complete') {
      selector();
    } else {
      funcs.push(selector);
    }
  } else {
    const nodeMatches = document.querySelectorAll(selector);
    const arrayMatches = [];

    for (let i = 0; i < nodeMatches.length; i++) {
      arrayMatches.push(nodeMatches[i]);
    }

    if (nodeMatches[0] instanceof HTMLElement) {
      return new DOMNodeCollection(arrayMatches);
    } else {
      return arrayMatches;
    }
  }
}

document.addEventListener('DOMContentLoaded', (e) => {
  funcs.forEach(el => el());
});


$l.extend = function (...args) {
  const result = args[0];

  args.slice(1).forEach((arg) => {
    Object.keys(arg).forEach((k) => {
      result[k] = arg[k];
    });
  });
  return result;
};


$l.ajax = function (options) {
  const defaults = {
    method: 'GET',
    url: 'http://www.google.com/',
    success: function (result) {
      console.log(`${result}`);
    },
    error: function (result) {
      console.log(`${result}`);
    },
    data: {default: 'mydata'},
    dataType: 'json',
    contentType: "application/x-www-form-urlencoded"
  };

  let realOptions;

  if (options) {
    realOptions = $l.extend(defaults, options);
  } else {
    realOptions = defaults;
  }


  const xhr = new XMLHttpRequest();
  xhr.open(realOptions.method, realOptions.url);
  xhr.onload = function () {
    if (xhr.status === 200) {
      return realOptions.success(JSON.parse(xhr.response));
    } else {
      return realOptions.error(JSON.parse(xhr.response));
    }
  };

  xhr.send(realOptions.data);

};

window.$l = $l;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlArr) {
    this.htmlArr = htmlArr;
  }

  html(string) {
    if (string) {
      this.htmlArr.forEach(el => el.innerHTML = string);
    } else {
      return this.htmlArr[0].innerHTML;
    }
  }

  empty() {
    this.htmlArr.html("");
  }

  append(inputChildElement) {
    if (this.htmlArr.length === 0) return;

    if (typeof inputChildElement === "string") {
      this.htmlArr.forEach((nodeElem) => {
        nodeElem.innerHTML += inputChildElement;
      });
    } else if (inputChildElement instanceof DOMNodeCollection) {
      this.htmlArr.forEach((nodeElem) => {
        inputChildElement.forEach((childNode) => {
          nodeElem.appendChild(childNode.cloneNode(true));
        });
    });
  }
  }

  attr(attrName, attrValue) {
    const firstNode = this.htmlArr[0];
    let elemAttrs = firstNode.attributes;

    if (!attrValue) {
      return elemAttrs[attrName];
    } else {
      firstNode.setAttribute(attrName, attrValue);
      return firstNode;
    }
  }

  addClass(className) {
    for (let i = 0; i < this.htmlArr.length; i++) {
      this.htmlArr[i].classList.add(className);
    }
  }

  removeClass(className) {
    for (let i = 0; i < this.htmlArr.length; i++) {
      this.htmlArr[i].classList.remove(className);
    }
    return this;
  }

  children() {
    const allChildren = [];

    this.htmlArr.forEach((node) => {
      allChildren.push(node.children);
    });

    return new DOMNodeCollection(allChildren);
  }

  parent() {
    const allParents = [];

    this.htmlArr.forEach((node) => {
      parents.push(node.parentNode);
    });

    return new DOMNodeCollection(parents);
  }

  find(selector) {
    const descendants = [];
    const found = [];

    this.htmlArr.forEach((node) => {
      descendants.push(node.querySelectorAll(selector));
    })

    descendants.forEach((desc) => {
      if (selector.outerHTML === desc.outerHTML) {
        found.push(desc);
      }
    });

    return new DOMNodeCollection(found);
  }

  remove() {
    this.htmlArr.forEach((node) => {
      node.outerHTML = "";
    })

    while (this.htmlArr.length > 0) {
      this.htmlArr.shift();
    }
    return this;
  }

  on(type, callback) {

    this.htmlArr.forEach((node) => {
      node.events = node.events || {};
      node.addEventListener(type, callback);

      if (node.events[type]) {
        node.events[type].push(callback);
      } else {
        node.events[type] = [callback];
      }
    });

    return this.htmlArr;
  }

  off(type, callback) {

    this.htmlArr.forEach((node) => {
      node.events = node.events || {};

      if (!callback) {
        node.events[type].forEach((elem) => {
          node.removeEventListener(type, elem);
        });
      } else {
        let eventToRemove = node.events[type].indexOf(callback);
        node.events[type].splice(eventToRemove, 1);
        node.removeEventListener(type, callback);
      }
    });

    return this.htmlArr;
  }
}



module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
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
  funcs.forEach(el => {
    el();
  });
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

$l( () => console.log('hello')  );

// const objA = {a: 'a', b: 'a', c: 'a'};
// const objB = {b: 'b', c: 'b'};
// const objC = {c: 'c'};
// console.log($l.prototype.extend(objA, objB, objC))
// $l( () => console.log($l('div')));

/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlArr) {
    this.htmlArr = htmlArr;
  }
  
  html(string) {
    if (string) {
      this.htmlArr.forEach(el => {
        el.innerHTML = string;
      });
    } else {
      return this.htmlArr[0].innerHTML;
    }
  }
  
  empty() {
    for (let i = 0; i < this.htmlArr.length; i++) {
      this.htmlArr[i].html("");
    }
  }
  
  append(...someElements) {
    for (let i = 0; i < someElements.length; i++) {
      for (let j = 0; j < this.htmlArr.length; j++) {
        someElements[i].outerHTML = this.htmlArr[j].innerHTML;
        this.htmlArr[j].innerHTML = someElements[i];
      }
    }
    return this.htmlArr;
  }
  
  attr(attrName, attrValue) {
    //or setAttribute?
    let elemAttrs = this.htmlArr[0].attributes;
    
    if (!attrValue) {
      return elemAttrs[attrName];
    } else {
      this.htmlArr[0].setAttribute(attrName, attrValue);
      return this.htmlArr[0];
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
    const kiddos = [];
    for (let i = 0; i < this.htmlArr.length; i++) {
      kiddos.push(this.htmlArr[i].children);
    }
    return new DOMNodeCollection(kiddos);
  }
  
  parent() {
    const parents = [];
    for (let i = 0; i < this.htmlArr.length; i++) {
      parents.push(this.htmlArr[i].parentNode);
    }
    
    return new DOMNodeCollection(parents);
  }
  
  find(selector) {
    const descendants = [];
    const found = [];
  
    for (let i = 0; i < this.htmlArr.length; i++) {
      descendants.push(this.htmlArr[i].querySelectorAll(selector));
    }
  
    for (let i = 0; i < descendants.length; i++){
      if (selector.outerHTML === descendants[i].outerHTML) {
        found.push(descendants[i]);
      }
    }
    
    return new DOMNodeCollection(found);
  }
  
  remove() {

    for (let i = 0; i < this.htmlArr.length; i++) {
      this.htmlArr[i].outerHTML = "";
    }
    
    while (this.htmlArr.length > 0) {
      this.htmlArr.shift();  
    }
    return this;
  }
  
  on(type, callback) {
  
    for (let i = 0; i < this.htmlArr.length; i++) {
      this.htmlArr[i].events = this.htmlArr[i].events || {};
      this.htmlArr[i].addEventListener(type, callback);
      if (this.htmlArr[i].events[type]){
        this.htmlArr[i].events[type].push(callback);
      } else {
        this.htmlArr[i].events[type] = [callback];
      }
    }
    return this.htmlArr;
  }
  
  off(type, callback) {
    
    for (let i = 0; i < this.htmlArr.length; i++) {
      this.htmlArr[i].events = this.htmlArr[i].events || {};
      
      if (!callback) {
        this.htmlArr[i].events[type].forEach((el) => {
          this.htmlArr[i].removeEventListener(type, el);  
        });
      } else {
        let thingToRemove = this.htmlArr[i].events[type].indexOf(callback);
        this.htmlArr[i].events[type].splice(thingToRemove, 1);
        this.htmlArr[i].removeEventListener(type, callback);
      }
    }
    return this.htmlArr;
  }
}



module.exports = DOMNodeCollection;

/***/ })
/******/ ]);
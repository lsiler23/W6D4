const DOMNodeCollection = require('./dom_node_collection.js');

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
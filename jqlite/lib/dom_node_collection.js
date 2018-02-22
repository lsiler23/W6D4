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
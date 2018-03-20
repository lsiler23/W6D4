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

class DOMNodeCollection {
  constructor(htmlArr) {
    this.nodeList = nodeList;
  }

  html(string) {
    if (string) {
      this.nodeList.forEach(el => el.innerHTML = string);
    } else {
      return this.nodeList[0].innerHTML;
    }
  }

  empty() {
    this.nodeList.html("");
  }

  append(inputChildElement) {
    if (this.nodeList.length === 0) return;

    if (typeof inputChildElement === "string") {
      this.nodeList.forEach((nodeElem) => {
        nodeElem.innerHTML += inputChildElement;
      });
    } else if (inputChildElement instanceof DOMNodeCollection) {
      this.nodeList.forEach((nodeElem) => {
        inputChildElement.forEach((childNode) => {
          nodeElem.appendChild(childNode.cloneNode(true));
        });
      });
    }
  }

  attr(attrName, attrValue) {
    const firstNode = this.nodeList[0];
    let elemAttrs = firstNode.attributes;

    if (!attrValue) {
      return elemAttrs[attrName];
    } else {
      firstNode.setAttribute(attrName, attrValue);
      return firstNode;
    }
  }

  addClass(className) {
    for (let i = 0; i < this.nodeList.length; i++) {
      this.nodeList[i].classList.add(className);
    }
  }

  removeClass(className) {
    for (let i = 0; i < this.nodeList.length; i++) {
      this.nodeList[i].classList.remove(className);
    }
    return this;
  }

  children() {
    const allChildren = [];

    this.nodeList.forEach((node) => {
      allChildren.push(node.children);
    });

    return new DOMNodeCollection(allChildren);
  }

  parent() {
    const allParents = [];

    this.nodeList.forEach((node) => {
      allParents.push(node.parentNode);
    });

    return new DOMNodeCollection(allParents);
  }

  find(selector) {
    const descendants = [];
    const found = [];

    this.nodeList.forEach((node) => {
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
    this.nodeList.forEach((node) => {
      node.outerHTML = "";
    })

    while (this.nodeList.length > 0) {
      this.nodeList.shift();
    }
    return this;
  }

  on(type, callback) {

    this.nodeList.forEach((node) => {
      node.events = node.events || {};
      node.addEventListener(type, callback);

      if (node.events[type]) {
        node.events[type].push(callback);
      } else {
        node.events[type] = [callback];
      }
    });

    return this.nodeList;
  }

  off(type, callback) {

    this.nodeList.forEach((node) => {
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

    return this.nodeList;
  }
}



module.exports = DOMNodeCollection;

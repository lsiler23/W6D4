# strawberryDOM

strawberryDOM is a JavaScript DOM manipulation library. Check out a live demo [here](https://github.com/lsiler23/strawberryDOMDemo).

Users can create or remove HTML elements from the DOM, toggle classes, access the parents or children of a given element, create or remove event listeners, and send off ajax requests.

## Usage

To include strawberryDOM in your project, simply download the library and include the source in a script tag in the head of your entry html file.

For a testing space, I've provided a sandbox index.html file in this repo!

## API

### Core function
#### $l
$l.() is the cornerstone function of strawberryDOM.
When passed a string argument, $l.() will grab any instance of that element from your html and coerce those elements into a manageable list of nodes.
When passed a function, $l.() will queue up that function for use once the DOM has fully loaded.

### DOM manipulation
#### html
The html function allows for updating the innerHTML of a given element, or, if an argument is omitted, will show you the innerHTML of the first selected instance of your $l query.
#### empty
If you'd like to reset the innerHTML of each selected element, call the ```empty()``` method without an argument.
#### append
To add a child to an element, use append! You can pass in either a string or a node collection that you might have already created.

```javascript
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
```
#### attr
Check or create an element attribute with the ```attr(name, value)``` method. To check the value of an attribute you already set, use the name of the attribute as the only argument. To set a new attribute, include a name and your desired value as the second argument.
#### addClass & removeClass
When passed an argument, these methods will add or remove a class to the element's class list, respectively.
#### remove
Remove does exactly that - calling ```remove()``` on an element will empty the outerHTML of each element instance in your html and will remove each node from your node collection.

### DOM node traversal
#### children
The ```children()``` method will provide a node collection of all the children of the nodes in your parent collection.
#### parent
Though singular, if you have multiple nodes in your collection, calling ```parent()``` will provide a node collection of the parent for each element in your original query.
#### find
The ```find(selector)``` method will grab only the direct descendants of your query that match the selector argument.

### Event listeners
#### on
Pass an event type and callback function to ```on(eventType, callback)``` to add specific listeners to your nodes. More than one event can be stored on the same node! Additionally, more than one callback can be associated with the same event type.
```javascript
this.nodeList.forEach((node) => {
  node.events = node.events || {};
  node.addEventListener(type, callback);

  if (node.events[type]) {
    node.events[type].push(callback);
  } else {
    node.events[type] = [callback];
  }
});
```
#### off
To turn an event listener off for a given element, call the ```off(eventType, callback)``` method with one or two arguments. If only the event type is provided, the off method will remove all callbacks associated with that event. However, if you'd only like to turn one specific listener off, pass in the name of the function associated as the second argument and your other events won't be affected.

### $l.ajax

The ```$l.ajax()``` method takes a single object as an argument. Suggested keys include:

* url
* method
  * The default is set up for "GET" requests, so feel free to only include a method key-value pair for create, update, or delete requests
* data
* success and/or error callbacks
* dataType

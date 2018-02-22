function Router(node) {
  this.node = node;
}

Router.prototype.start = function () {
  this.render();
  window.addEventListener('hashchange', this.render.bind(this));
};

Router.prototype.activeRoute = function () {
  let hashFrag = window.location.hash;
  let newHash = hashFrag.slice(1);
  return newHash;
};

Router.prototype.render = function () {
  this.node.innerHTML = "";
  let currentRoute = this.activeRoute();
  let newNode = document.createElement("p");
  newNode.innerHTML = currentRoute;
  this.node.appendChild(newNode);
};

module.exports = Router;
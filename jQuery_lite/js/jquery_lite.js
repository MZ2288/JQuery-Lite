(function () {
  function DOMNodeCollection (nodeArray) {
    this.nodeArray = nodeArray;
  }

  DOMNodeCollection.prototype.html = function () {
    
  };

  DOMNodeCollection.prototype.empty = function () {

  };

  DOMNodeCollection.prototype.append = function () {

  };

  window.$l = function (arg) {
    var nodeArray;
    if (typeof arg === "string") {
      var nodeList = document.querySelectorAll(arg);
      nodeArray = [].slice.call(nodeList);
    } else if (arg instanceof HTMLElement) {
      nodeArray = [arg];
    }
    return new DOMNodeCollection(nodeArray);
  };

})();

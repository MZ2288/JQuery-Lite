(function () {
  function DOMNodeCollection (nodeArray) {
    this.nodeArray = nodeArray;
  }

  Array.prototype.remove = function(set) {
    return this.filter(function(e) {
      return set.indexOf(e) < 0;
    });
  };

  Array.prototype.include = function(set) {
    return this.filter(function(e) {
      return set.indexOf(e) >= 0;
    });
  };

  DOMNodeCollection.prototype.html = function (string) {
    if (typeof string === "undefined") {
      return this.nodeArray[0].innerHTML;
    }

    for (var i = 0; i < this.nodeArray.length; i++) {
      this.nodeArray[i].innerHTML = string;
    }
  };

  DOMNodeCollection.prototype.empty = function () {
    for (var i = 0; i < this.nodeArray.length; i++) {
      this.nodeArray[i].html = "";
    }
  };

  DOMNodeCollection.prototype.append = function (content) {
    this.nodeArray.concat(content);
  };

  DOMNodeCollection.prototype.attr = function () {
    return this.nodeArray[0].attributes;
  };

  DOMNodeCollection.prototype.addClass = function (className) {
    for (var i = 0; i < this.nodeArray.length; i++) {
      if (this.nodeArray[i].className.length === 0) {
        this.nodeArray[i].className.concat(className);
      } else {
        this.nodeArray[i].className.concat(" " + className);
      }
    }
  };

  DOMNodeCollection.prototype.removeClass = function (content) {
    var removeClasses = content.split(" ");
    for (var j = 0; j < this.nodeArray.length; j++) {
      var nodeClasses = this.nodeArray[j].className.split(" ");
      var newClasses = nodeClasses.remove(removeClasses);
      this.nodeArray[j].className = newClasses.join(" ");
    }
  };

  DOMNodeCollection.prototype.children = function () {
    var childNodes = [];
    for (var i = 0; i < this.nodeArray.length; i++) {
      childNodes.concat(this.nodeArray[i].children);
    }
    return new DOMNodeCollection(childNodes);
  };

  DOMNodeCollection.prototype.parent = function () {
    var parentNodes = [];
    for (var i = 0; i < this.nodeArray.length; i++) {
      if (this.nodeArray[i].parentElement) {
        parentNodes.concat(this.nodeArray[i].parentElement);
      }
    }
    return new DOMNodeCollection(parentNodes);
  };

  DOMNodeCollection.prototype.find = function (selector) {
    var selectedNodes = document.querySelectorAll(selector);
    var matchedNodes = [];
    for (var i = 0; i < this.nodeArray.length; i++) {
      var matchedChildren = this.nodeArray[i].children.include(selectedNodes);
      matchedNodes.concat(matchedChildren);
    }
    return new DOMNodeCollection(matchedNodes);
  };

  DOMNodeCollection.prototype.remove = function () {
    for (var i = 0; i < this.nodeArray.length; i++) {
      this.nodeArray[i].parent.removeChild(this.nodeArray[i]);
    }
    this.nodeArray = [];
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

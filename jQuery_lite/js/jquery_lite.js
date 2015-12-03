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
      this.nodeArray[i].innerHTML = "";
    }
  };
  // htmlString, element, array, jQuery_lite
  DOMNodeCollection.prototype.append = function (content) {
    if (typeof content === "string") {
      var newNode = document.createTextNode(content);
      for (var i = 0; i < this.nodeArray.length; i++) {
        this.nodeArray[i].appendChild(newNode);
      }
    } else if (content instanceof Array) {
      for (i = 0; i < this.nodeArray.length; i++) {
        for (var j = 0; j < content.length; j++) {
          this.nodeArray[i].appendChild(content[j].cloneNode());
        }
      }
    } else if (content.constructor.name === "DOMNodeCollection") {
      for (i = 0; i < this.nodeArray.length; i++) {
        for (j = 0; j < content.nodeArray.length; j++) {
          this.nodeArray[i].appendChild(content.nodeArray[j].cloneNode());
        }
      }
    } else if (content instanceof HTMLElement) {
      for (i = 0; i < this.nodeArray.length; i++) {
        this.nodeArray[i].appendChild(content.cloneNode());
      }
    }
  };

  DOMNodeCollection.prototype.attr = function (attrName) {
    return this.nodeArray[0].attributes[attrName].value;
  };

  DOMNodeCollection.prototype.addClass = function (className) {
    for (var i = 0; i < this.nodeArray.length; i++) {
      if (this.nodeArray[i].className.length === 0) {
        this.nodeArray[i].className = className;
      } else {
        var oldClass = this.nodeArray[i].className;
        this.nodeArray[i].className = oldClass + " " + className;
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
    var nodeArray = [];
    for (var i = 0; i < this.nodeArray.length; i++) {
      var childList = this.nodeArray[i].children;
      var childNodes = [].slice.call(childList);
      nodeArray = nodeArray.concat(childNodes);
    }
    return new DOMNodeCollection(nodeArray);
  };

  DOMNodeCollection.prototype.parent = function () {
    var parentNodes = [];
    for (var i = 0; i < this.nodeArray.length; i++) {
      if (this.nodeArray[i].parentElement) {
        parentNodes = parentNodes.concat(this.nodeArray[i].parentElement);
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
      this.nodeArray[i].parentNode.removeChild(this.nodeArray[i]);
    }
    this.nodeArray = [];
  };


  window.$l = function (arg) {
    var nodeArray;
    if (arg instanceof HTMLElement) {
      nodeArray = [arg];
    }
    else if (typeof arg === "string") {
      var nodeList = document.querySelectorAll(arg);
      nodeArray = [].slice.call(nodeList);
    }
    return new DOMNodeCollection(nodeArray);
  };
})();

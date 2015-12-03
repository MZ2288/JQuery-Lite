(function () {
  function DOMNodeCollection (nodeArray) {
    this.nodeArray = nodeArray;
  }

  Array.prototype.remove = function(set) {
    return this.filter(function(e) {
      return set.indexOf(e) < 0;
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

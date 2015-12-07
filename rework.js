(function () {
  if (typeof $l === "undefined") {
    window.$l = {};
    $l.readyCallbacks = [];
    document.onreadystatechange = function () {
      if (document.readyState == "complete") {
        $l.readyCallbacks.forEach(function (cb) {
          cb();
        });
        $l.readyCallbacks = [];
      }
    };
  }

  function DOMNodeCollection(arr) {
    this.nodesArray = arr;
  }

  function $l(arg) {
    if (typeof arg === "string") {
      var nodes = document.querySelectorAll(arg);
      var nodesArray = [].slice.call(nodes);
      return new DOMNodeCollection(nodesArray);
    } else if (arg instanceof HTMLElement) {
      return new DOMNodeCollection([arg]);
    } else if (typeof arg === "function") {
      this.readyCallbacks.push(arg);
    }
  };

  $l.extend = function () {
    var newObj = {};
    var objs = [].slice.call(arguments);
    objs.forEach(function (obj) {
      for (var key in obj) {
        newObj[key] = obj[key];
      }
    });
    return newObj;
  };

  $l.ajax = function (opts) {
    var defaults = {
      type: "GET",
      success: function () {},
      error: function () {},
      async: true
    };
    var options = $l.extend(defaults, opts)
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.onreadystatechange = function () {
      if (xmlHTTP.readyState === XMLHttpRequest.DONE) {
        if (xmlHTTP.status === 200) {
          options.success(xmlHTTP.response);
        } else {
          options.error(xmlHTTP.response);
        }
      }
    };
    xmlHTTP.open(options[type], options[url], options[], options[async]);
    xmlHTTP.send();
  }


  DOMNodeCollection.prototype.empty = function () {
    this.html("");
  };

  DOMNodeCollection.prototype.append = function (arg) {
    if (typeof arg === "string") {
      var child = document.createElement(arg);
      this.nodesArray[0].appendChild(child);
    } else if (arg instanceof HTMLElement) {
      this.nodesArray[0].appendChild(arg);
    } else if (arg instanceof DOMNodeCollection) {
      DOMNodeCollection.nodesArray.forEach(function (node) {
        this.nodesArray[0].appendChild(node);
      });
    } else {
      throw "error";
    }

    return this;
  };

  DOMNodeCollection.prototype.remove = function (arg) {
    if (typeof arg === "string") {
      this.find(arg).remove();
    } else {
      this.nodesArray.forEach(function (node) {
        node.parentNode.removeChild(node);
      });
    }
  };

  // DOMNodeCollection.prototype.attr = function () {
  // };
  //
  // DOMNodeCollection.prototype.addClass = function () {
  // };
  //
  // DOMNodeCollection.prototype.removeClass = function () {
  // };

  DOMNodeCollection.prototype.html = function (str) {
    if (str) {
      this.nodesArray.forEach(function (el) {
        el.innerHTML = str;
      });
    } else {
      if (this.nodesArray.length > 0) {
        return this.nodesArray[0].innerHTML;
      }
    }
  };

  DOMNodeCollection.prototype.find = function (str) {
    var arr = [];
    nodes = this.nodesArray.forEach(function (el) {
      arr.concat([].slice.call(el.querySelectorAll(str)));
    });
    return new DOMNodeCollection(arr);
  };

  // DOMNodeCollection.prototype.children = function () {
  //
  // };
  //
  // DOMNodeCollection.prototype.parent = function () {
  //
  // };

  DOMNodeCollection.prototype.on = function (str, func) {
    this.nodesArray[0].addEventListener(str, func);
  };



}());

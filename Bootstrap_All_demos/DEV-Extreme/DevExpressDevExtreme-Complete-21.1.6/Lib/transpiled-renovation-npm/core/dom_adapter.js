"use strict";

exports.default = void 0;

var _dependency_injector = _interopRequireDefault(require("./utils/dependency_injector"));

var _common = require("./utils/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var DOCUMENT_NODE = 9;
var nativeDOMAdapterStrategy = {
  querySelectorAll: function querySelectorAll(element, selector) {
    return element.querySelectorAll(selector);
  },
  elementMatches: function elementMatches(element, selector) {
    var _this = this;

    var matches = element.matches || element.matchesSelector || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector || element.webkitMatchesSelector || function (selector) {
      var doc = element.document || element.ownerDocument;

      if (!doc) {
        return false;
      }

      var items = _this.querySelectorAll(doc, selector);

      for (var i = 0; i < items.length; i++) {
        if (items[i] === element) {
          return true;
        }
      }
    };

    return matches.call(element, selector);
  },
  createElement: function createElement(tagName, context) {
    context = context || this._document;
    return context.createElement(tagName);
  },
  createElementNS: function createElementNS(ns, tagName, context) {
    context = context || this._document;
    return context.createElementNS(ns, tagName);
  },
  createTextNode: function createTextNode(text, context) {
    context = context || this._document;
    return context.createTextNode(text);
  },
  isNode: function isNode(element) {
    return element && _typeof(element) === 'object' && 'nodeType' in element && 'nodeName' in element;
  },
  isElementNode: function isElementNode(element) {
    return element && element.nodeType === ELEMENT_NODE;
  },
  isTextNode: function isTextNode(element) {
    return element && element.nodeType === TEXT_NODE;
  },
  isDocument: function isDocument(element) {
    return element && element.nodeType === DOCUMENT_NODE;
  },
  removeElement: function removeElement(element) {
    var parentNode = element && element.parentNode;

    if (parentNode) {
      parentNode.removeChild(element);
    }
  },
  insertElement: function insertElement(parentElement, newElement, nextSiblingElement) {
    if (parentElement && newElement && parentElement !== newElement) {
      if (nextSiblingElement) {
        parentElement.insertBefore(newElement, nextSiblingElement);
      } else {
        parentElement.appendChild(newElement);
      }
    }
  },
  getAttribute: function getAttribute(element, name) {
    return element.getAttribute(name);
  },
  setAttribute: function setAttribute(element, name, value) {
    element.setAttribute(name, value);
  },
  removeAttribute: function removeAttribute(element, name) {
    element.removeAttribute(name);
  },
  setProperty: function setProperty(element, name, value) {
    element[name] = value;
  },
  setText: function setText(element, text) {
    if (element) {
      element.textContent = text;
    }
  },
  setClass: function setClass(element, className, isAdd) {
    if (element.nodeType === 1 && className) {
      if (element.classList) {
        if (isAdd) {
          element.classList.add(className);
        } else {
          element.classList.remove(className);
        }
      } else {
        // IE9
        var classNameSupported = typeof element.className === 'string';
        var elementClass = classNameSupported ? element.className : this.getAttribute(element, 'class') || '';
        var classNames = elementClass.split(' ');
        var classIndex = classNames.indexOf(className);
        var resultClassName;

        if (isAdd && classIndex < 0) {
          resultClassName = elementClass ? elementClass + ' ' + className : className;
        }

        if (!isAdd && classIndex >= 0) {
          classNames.splice(classIndex, 1);
          resultClassName = classNames.join(' ');
        }

        if (resultClassName !== undefined) {
          if (classNameSupported) {
            element.className = resultClassName;
          } else {
            this.setAttribute(element, 'class', resultClassName);
          }
        }
      }
    }
  },
  setStyle: function setStyle(element, name, value) {
    element.style[name] = value || '';
  },
  _document: typeof document === 'undefined' ? undefined : document,
  getDocument: function getDocument() {
    return this._document;
  },
  getActiveElement: function getActiveElement() {
    return this._document.activeElement;
  },
  getBody: function getBody() {
    return this._document.body;
  },
  createDocumentFragment: function createDocumentFragment() {
    return this._document.createDocumentFragment();
  },
  getDocumentElement: function getDocumentElement() {
    return this._document.documentElement;
  },
  getLocation: function getLocation() {
    return this._document.location;
  },
  getSelection: function getSelection() {
    return this._document.selection;
  },
  getReadyState: function getReadyState() {
    return this._document.readyState;
  },
  getHead: function getHead() {
    return this._document.head;
  },
  hasDocumentProperty: function hasDocumentProperty(property) {
    return property in this._document;
  },
  listen: function listen(element, event, callback, options) {
    if (!element || !('addEventListener' in element)) {
      return _common.noop;
    }

    element.addEventListener(event, callback, options);
    return function () {
      element.removeEventListener(event, callback);
    };
  }
};

var _default = (0, _dependency_injector.default)(nativeDOMAdapterStrategy);

exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
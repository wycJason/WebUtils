"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.subscribeToEvent = subscribeToEvent;
exports.subscribeToScrollEvent = exports.subscribeToClickEvent = void 0;

var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));

var clickEvent = _interopRequireWildcard(require("../../events/click"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function subscribeToEvent(eventName) {
  return function (element, handler) {
    if (handler && element) {
      _events_engine.default.on(element, eventName, handler);

      return function () {
        return _events_engine.default.off(element, eventName, handler);
      };
    }

    return undefined;
  };
}

var subscribeToClickEvent = subscribeToEvent(clickEvent.name);
exports.subscribeToClickEvent = subscribeToClickEvent;
var subscribeToScrollEvent = subscribeToEvent("scroll");
exports.subscribeToScrollEvent = subscribeToScrollEvent;
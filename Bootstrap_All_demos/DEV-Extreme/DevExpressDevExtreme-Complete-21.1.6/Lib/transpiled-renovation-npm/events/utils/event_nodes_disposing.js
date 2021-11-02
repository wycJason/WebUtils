"use strict";

exports.unsubscribeNodesDisposing = exports.subscribeNodesDisposing = void 0;

var _events_engine = _interopRequireDefault(require("../core/events_engine"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REMOVE_EVENT_NAME = 'dxremove';

function nodesByEvent(event) {
  return event && [event.target, event.delegateTarget, event.relatedTarget, event.currentTarget].filter(function (node) {
    return !!node;
  });
}

var subscribeNodesDisposing = function subscribeNodesDisposing(event, callback) {
  _events_engine.default.one(nodesByEvent(event), REMOVE_EVENT_NAME, callback);
};

exports.subscribeNodesDisposing = subscribeNodesDisposing;

var unsubscribeNodesDisposing = function unsubscribeNodesDisposing(event, callback) {
  _events_engine.default.off(nodesByEvent(event), REMOVE_EVENT_NAME, callback);
};

exports.unsubscribeNodesDisposing = unsubscribeNodesDisposing;
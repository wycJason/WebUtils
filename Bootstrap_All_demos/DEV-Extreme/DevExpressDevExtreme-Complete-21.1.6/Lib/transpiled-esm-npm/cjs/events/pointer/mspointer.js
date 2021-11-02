"use strict";

exports.default = void 0;

var _base = _interopRequireDefault(require("./base"));

var _observer = _interopRequireDefault(require("./observer"));

var _extend = require("../../core/utils/extend");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventMap = {
  'dxpointerdown': 'pointerdown',
  'dxpointermove': 'pointermove',
  'dxpointerup': 'pointerup',
  'dxpointercancel': 'pointercancel',
  'dxpointerover': 'pointerover',
  'dxpointerout': 'pointerout',
  'dxpointerenter': 'pointerenter',
  'dxpointerleave': 'pointerleave'
};
var observer;
var activated = false;

var activateStrategy = function activateStrategy() {
  if (activated) {
    return;
  }

  observer = new _observer.default(eventMap, function (a, b) {
    return a.pointerId === b.pointerId;
  }, function (e) {
    if (e.isPrimary) observer.reset();
  });
  activated = true;
};

var MsPointerStrategy = _base.default.inherit({
  ctor: function ctor() {
    this.callBase.apply(this, arguments);
    activateStrategy();
  },
  _fireEvent: function _fireEvent(args) {
    return this.callBase((0, _extend.extend)({
      pointers: observer.pointers(),
      pointerId: args.originalEvent.pointerId
    }, args));
  }
});

MsPointerStrategy.map = eventMap;

MsPointerStrategy.resetObserver = function () {
  observer.reset();
};

var _default = MsPointerStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
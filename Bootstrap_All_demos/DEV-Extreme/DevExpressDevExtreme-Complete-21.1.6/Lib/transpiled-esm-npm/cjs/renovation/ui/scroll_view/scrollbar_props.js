"use strict";

exports.ScrollbarProps = void 0;

var _noop = _interopRequireDefault(require("../../utils/noop"));

var _consts = require("./common/consts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScrollbarProps = {
  activeStateEnabled: false,
  containerSize: 0,
  contentSize: 0,
  topPocketSize: 0,
  bottomPocketSize: 0,
  scrollableOffset: 0,
  isScrollableHovered: false,
  forceVisibility: false,
  forceUpdateScrollbarLocation: false,
  scrollLocation: 0,
  onAnimatorCancel: _noop.default,
  onPullDown: _noop.default,
  onReachBottom: _noop.default,
  onRelease: _noop.default,
  defaultPocketState: _consts.TopPocketState.STATE_RELEASED
};
exports.ScrollbarProps = ScrollbarProps;
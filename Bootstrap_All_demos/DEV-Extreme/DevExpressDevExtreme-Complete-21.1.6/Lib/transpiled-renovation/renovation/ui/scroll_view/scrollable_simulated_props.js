"use strict";

exports.ScrollableSimulatedPropsType = exports.ScrollableSimulatedProps = void 0;

var _scrollable_props = require("./scrollable_props");

var _base_props = require("../common/base_props");

var _widget = require("../common/widget");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ScrollableSimulatedProps = _extends({}, _scrollable_props.ScrollableProps, {
  inertiaEnabled: true,
  useKeyboard: true
});

exports.ScrollableSimulatedProps = ScrollableSimulatedProps;
var ScrollableSimulatedPropsType = {
  inertiaEnabled: ScrollableSimulatedProps.inertiaEnabled,
  useKeyboard: ScrollableSimulatedProps.useKeyboard,
  useNative: ScrollableSimulatedProps.useNative,
  direction: ScrollableSimulatedProps.direction,
  showScrollbar: ScrollableSimulatedProps.showScrollbar,
  bounceEnabled: ScrollableSimulatedProps.bounceEnabled,
  scrollByContent: ScrollableSimulatedProps.scrollByContent,
  scrollByThumb: ScrollableSimulatedProps.scrollByThumb,
  updateManually: ScrollableSimulatedProps.updateManually,
  pullDownEnabled: ScrollableSimulatedProps.pullDownEnabled,
  reachBottomEnabled: ScrollableSimulatedProps.reachBottomEnabled,
  forceGeneratePockets: ScrollableSimulatedProps.forceGeneratePockets,
  needScrollViewContentWrapper: ScrollableSimulatedProps.needScrollViewContentWrapper,
  needScrollViewLoadPanel: ScrollableSimulatedProps.needScrollViewLoadPanel,
  aria: _widget.WidgetProps.aria,
  disabled: _base_props.BaseWidgetProps.disabled,
  visible: _base_props.BaseWidgetProps.visible
};
exports.ScrollableSimulatedPropsType = ScrollableSimulatedPropsType;
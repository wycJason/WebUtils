"use strict";

exports.getScrollSign = getScrollSign;
exports.normalizeOffsetLeft = normalizeOffsetLeft;
exports.getLocation = getLocation;
exports.updateAllowedDirection = updateAllowedDirection;

var _scroll_rtl_behavior = _interopRequireDefault(require("../../../core/utils/scroll_rtl_behavior"));

var _inflector = require("../../../core/utils/inflector");

var _consts = require("./common/consts");

var _scroll_direction = require("./utils/scroll_direction");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isScrollInverted(rtlEnabled) {
  var _getScrollRtlBehavior = (0, _scroll_rtl_behavior.default)(),
      decreasing = _getScrollRtlBehavior.decreasing,
      positive = _getScrollRtlBehavior.positive;

  return rtlEnabled && !!(decreasing ^ positive);
}

function getScrollSign(rtlEnabled) {
  return isScrollInverted(rtlEnabled) && (0, _scroll_rtl_behavior.default)().positive ? -1 : 1;
}

function getElementLocationInternal(element, offset, direction, containerElement) {
  var prop = direction === _consts.DIRECTION_VERTICAL ? "top" : "left";
  var dimension = direction === _consts.DIRECTION_VERTICAL ? "Height" : "Width";
  var relativeLocation = containerElement["scroll".concat((0, _inflector.titleize)(prop))] + element.getBoundingClientRect()[prop] - containerElement.getBoundingClientRect()[prop];
  var containerLocation = containerElement["scroll".concat((0, _inflector.titleize)(prop))];
  var scrollBarSize = containerElement["offset".concat(dimension)] - containerElement["client".concat(dimension)];
  var containerSize = containerElement["offset".concat(dimension)];
  var elementOffset = element["offset".concat(dimension)];
  var offsetStart = offset[prop];
  var offsetEnd = offset[direction === _consts.DIRECTION_VERTICAL ? "bottom" : "right"] || 0;

  if (relativeLocation < containerLocation + offsetStart) {
    if (elementOffset < containerSize - offsetStart - offsetEnd) {
      return relativeLocation - offsetStart;
    }

    return relativeLocation + elementOffset - containerSize + offsetEnd + scrollBarSize;
  }

  if (relativeLocation + elementOffset >= containerLocation + containerSize - offsetEnd - scrollBarSize) {
    if (elementOffset < containerSize - offsetStart - offsetEnd) {
      return relativeLocation + elementOffset + scrollBarSize - containerSize + offsetEnd;
    }

    return relativeLocation - offsetStart;
  }

  return containerLocation;
}

function normalizeOffsetLeft(scrollLeft, maxLeftOffset, rtlEnabled) {
  if (isScrollInverted(rtlEnabled)) {
    if ((0, _scroll_rtl_behavior.default)().positive) {
      return maxLeftOffset - scrollLeft;
    }

    return maxLeftOffset + scrollLeft;
  }

  return scrollLeft;
}

function getLocation(element, offset, direction, containerElement) {
  var location = getElementLocationInternal(element, offset, direction, containerElement);
  return location;
}

function updateAllowedDirection(allowedDirections, direction) {
  var _ScrollDirection = new _scroll_direction.ScrollDirection(direction),
      isBoth = _ScrollDirection.isBoth,
      isHorizontal = _ScrollDirection.isHorizontal,
      isVertical = _ScrollDirection.isVertical;

  if (isBoth && allowedDirections.vertical && allowedDirections.horizontal) {
    return _consts.DIRECTION_BOTH;
  }

  if (isHorizontal && allowedDirections.horizontal) {
    return _consts.DIRECTION_HORIZONTAL;
  }

  if (isVertical && allowedDirections.vertical) {
    return _consts.DIRECTION_VERTICAL;
  }

  return undefined;
}
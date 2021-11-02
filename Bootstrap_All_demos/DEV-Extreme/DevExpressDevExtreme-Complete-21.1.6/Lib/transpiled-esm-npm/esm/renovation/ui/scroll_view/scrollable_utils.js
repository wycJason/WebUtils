import getScrollRtlBehavior from "../../../core/utils/scroll_rtl_behavior";
import { titleize } from "../../../core/utils/inflector";
import { DIRECTION_VERTICAL, DIRECTION_HORIZONTAL, DIRECTION_BOTH } from "./common/consts";
import { ScrollDirection } from "./utils/scroll_direction";

function isScrollInverted(rtlEnabled) {
  var {
    decreasing,
    positive
  } = getScrollRtlBehavior();
  return rtlEnabled && !!(decreasing ^ positive);
}

export function getScrollSign(rtlEnabled) {
  return isScrollInverted(rtlEnabled) && getScrollRtlBehavior().positive ? -1 : 1;
}

function getElementLocationInternal(element, offset, direction, containerElement) {
  var prop = direction === DIRECTION_VERTICAL ? "top" : "left";
  var dimension = direction === DIRECTION_VERTICAL ? "Height" : "Width";
  var relativeLocation = containerElement["scroll".concat(titleize(prop))] + element.getBoundingClientRect()[prop] - containerElement.getBoundingClientRect()[prop];
  var containerLocation = containerElement["scroll".concat(titleize(prop))];
  var scrollBarSize = containerElement["offset".concat(dimension)] - containerElement["client".concat(dimension)];
  var containerSize = containerElement["offset".concat(dimension)];
  var elementOffset = element["offset".concat(dimension)];
  var offsetStart = offset[prop];
  var offsetEnd = offset[direction === DIRECTION_VERTICAL ? "bottom" : "right"] || 0;

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

export function normalizeOffsetLeft(scrollLeft, maxLeftOffset, rtlEnabled) {
  if (isScrollInverted(rtlEnabled)) {
    if (getScrollRtlBehavior().positive) {
      return maxLeftOffset - scrollLeft;
    }

    return maxLeftOffset + scrollLeft;
  }

  return scrollLeft;
}
export function getLocation(element, offset, direction, containerElement) {
  var location = getElementLocationInternal(element, offset, direction, containerElement);
  return location;
}
export function updateAllowedDirection(allowedDirections, direction) {
  var {
    isBoth,
    isHorizontal,
    isVertical
  } = new ScrollDirection(direction);

  if (isBoth && allowedDirections.vertical && allowedDirections.horizontal) {
    return DIRECTION_BOTH;
  }

  if (isHorizontal && allowedDirections.horizontal) {
    return DIRECTION_HORIZONTAL;
  }

  if (isVertical && allowedDirections.vertical) {
    return DIRECTION_VERTICAL;
  }

  return undefined;
}
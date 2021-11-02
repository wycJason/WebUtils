"use strict";

exports.getRelativeOffset = getRelativeOffset;

function getRelativeOffset(targetElement, sourceElement) {
  var offset = {
    left: 0,
    top: 0
  };
  var currentElement = sourceElement;

  while (currentElement && currentElement !== targetElement) {
    var parentOffsetElement = currentElement.offsetParent;
    var currentElementRect = currentElement.getBoundingClientRect();
    var parentOffsetElementRect = parentOffsetElement.getBoundingClientRect();
    offset.left += currentElementRect.left - parentOffsetElementRect.left;
    offset.top += currentElementRect.top - parentOffsetElementRect.top;
    currentElement = currentElement.offsetParent;
  }

  return offset;
}
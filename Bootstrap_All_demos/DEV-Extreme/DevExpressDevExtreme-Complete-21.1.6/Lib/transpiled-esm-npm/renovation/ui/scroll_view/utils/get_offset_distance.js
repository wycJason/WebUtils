"use strict";

exports.getOffsetDistance = getOffsetDistance;

var _common = require("../../../../core/utils/common");

var _restore_location = require("./restore_location");

function getOffsetDistance(targetLocation, direction, scrollOffset) {
  var location = (0, _restore_location.restoreLocation)(targetLocation, direction);
  var top = -scrollOffset.top - (0, _common.ensureDefined)(location.top, -scrollOffset.top);
  var left = -scrollOffset.left - (0, _common.ensureDefined)(location.left, -scrollOffset.left);
  return {
    top: top,
    left: left
  };
}
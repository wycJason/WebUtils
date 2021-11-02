"use strict";

exports.isHorizontalGroupOrientation = exports.isVerticalGroupOrientation = exports.getIsGroupedAllDayPanel = exports.getGroupCellClasses = exports.addWidthToStyle = exports.addHeightToStyle = exports.getKeyByGroup = exports.getKeyByDateAndGroup = void 0;

var _combine_classes = require("../../../utils/combine_classes");

var _consts = require("../consts");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var getKeyByDateAndGroup = function getKeyByDateAndGroup(date, groupIndex) {
  var key = date.getTime();

  if (!groupIndex) {
    return key.toString();
  }

  return (key + groupIndex).toString();
};

exports.getKeyByDateAndGroup = getKeyByDateAndGroup;

var getKeyByGroup = function getKeyByGroup(groupIndex, groupOrientation) {
  if (groupOrientation === _consts.VERTICAL_GROUP_ORIENTATION) {
    return groupIndex.toString();
  }

  return "0";
};

exports.getKeyByGroup = getKeyByGroup;

var addToStyle = function addToStyle(attr, value, style) {
  var nextStyle = style || {};

  var result = _extends({}, nextStyle);

  result[attr] = value || nextStyle[attr];
  return result;
};

var addHeightToStyle = function addHeightToStyle(value, style) {
  var height = value ? "".concat(value, "px") : "";
  return addToStyle("height", height, style);
};

exports.addHeightToStyle = addHeightToStyle;

var addWidthToStyle = function addWidthToStyle(value, style) {
  var width = value ? "".concat(value, "px") : "";
  return addToStyle("width", width, style);
};

exports.addWidthToStyle = addWidthToStyle;

var getGroupCellClasses = function getGroupCellClasses() {
  var isFirstGroupCell = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var isLastGroupCell = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  return (0, _combine_classes.combineClasses)(_defineProperty({
    "dx-scheduler-first-group-cell": isFirstGroupCell,
    "dx-scheduler-last-group-cell": isLastGroupCell
  }, className, true));
};

exports.getGroupCellClasses = getGroupCellClasses;

var getIsGroupedAllDayPanel = function getIsGroupedAllDayPanel(viewData, index) {
  var groupedData = viewData.groupedData;
  var groupData = groupedData[index];
  var isAllDayPanel = !!(groupData !== null && groupData !== void 0 && groupData.allDayPanel);
  var isGroupedAllDayPanel = !!(groupData !== null && groupData !== void 0 && groupData.isGroupedAllDayPanel);
  return isAllDayPanel && isGroupedAllDayPanel;
};

exports.getIsGroupedAllDayPanel = getIsGroupedAllDayPanel;

var isVerticalGroupOrientation = function isVerticalGroupOrientation(groupOrientation) {
  return groupOrientation === _consts.VERTICAL_GROUP_ORIENTATION;
};

exports.isVerticalGroupOrientation = isVerticalGroupOrientation;

var isHorizontalGroupOrientation = function isHorizontalGroupOrientation(groups, groupOrientation) {
  return groupOrientation === _consts.HORIZONTAL_GROUP_ORIENTATION && !!groups.length;
};

exports.isHorizontalGroupOrientation = isHorizontalGroupOrientation;
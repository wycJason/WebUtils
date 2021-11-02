import _extends from "@babel/runtime/helpers/esm/extends";
import { combineClasses } from "../../../utils/combine_classes";
import { HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION } from "../consts";
export var getKeyByDateAndGroup = (date, groupIndex) => {
  var key = date.getTime();

  if (!groupIndex) {
    return key.toString();
  }

  return (key + groupIndex).toString();
};
export var getKeyByGroup = (groupIndex, groupOrientation) => {
  if (groupOrientation === VERTICAL_GROUP_ORIENTATION) {
    return groupIndex.toString();
  }

  return "0";
};

var addToStyle = (attr, value, style) => {
  var nextStyle = style || {};

  var result = _extends({}, nextStyle);

  result[attr] = value || nextStyle[attr];
  return result;
};

export var addHeightToStyle = (value, style) => {
  var height = value ? "".concat(value, "px") : "";
  return addToStyle("height", height, style);
};
export var addWidthToStyle = (value, style) => {
  var width = value ? "".concat(value, "px") : "";
  return addToStyle("width", width, style);
};
export var getGroupCellClasses = function getGroupCellClasses() {
  var isFirstGroupCell = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var isLastGroupCell = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  return combineClasses({
    "dx-scheduler-first-group-cell": isFirstGroupCell,
    "dx-scheduler-last-group-cell": isLastGroupCell,
    [className]: true
  });
};
export var getIsGroupedAllDayPanel = (viewData, index) => {
  var {
    groupedData
  } = viewData;
  var groupData = groupedData[index];
  var isAllDayPanel = !!(groupData !== null && groupData !== void 0 && groupData.allDayPanel);
  var isGroupedAllDayPanel = !!(groupData !== null && groupData !== void 0 && groupData.isGroupedAllDayPanel);
  return isAllDayPanel && isGroupedAllDayPanel;
};
export var isVerticalGroupOrientation = groupOrientation => groupOrientation === VERTICAL_GROUP_ORIENTATION;
export var isHorizontalGroupOrientation = (groups, groupOrientation) => groupOrientation === HORIZONTAL_GROUP_ORIENTATION && !!groups.length;
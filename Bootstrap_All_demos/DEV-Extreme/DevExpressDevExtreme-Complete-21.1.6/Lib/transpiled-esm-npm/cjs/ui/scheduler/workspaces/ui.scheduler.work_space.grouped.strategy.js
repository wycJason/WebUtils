"use strict";

exports.default = void 0;
var LAST_GROUP_CELL_CLASS = 'dx-scheduler-last-group-cell';
var FIRST_GROUP_CELL_CLASS = 'dx-scheduler-first-group-cell';

var GroupedStrategy = /*#__PURE__*/function () {
  function GroupedStrategy(workSpace) {
    this._workSpace = workSpace;
  }

  var _proto = GroupedStrategy.prototype;

  _proto.getLastGroupCellClass = function getLastGroupCellClass() {
    return LAST_GROUP_CELL_CLASS;
  };

  _proto.getFirstGroupCellClass = function getFirstGroupCellClass() {
    return FIRST_GROUP_CELL_CLASS;
  };

  _proto._getOffsetByAllDayPanel = function _getOffsetByAllDayPanel() {
    return 0;
  };

  _proto._getGroupTop = function _getGroupTop() {
    return 0;
  };

  return GroupedStrategy;
}();

var _default = GroupedStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
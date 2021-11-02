"use strict";

exports.default = void 0;

var _position = require("../../../core/utils/position");

var _uiSchedulerWork_spaceGrouped = _interopRequireDefault(require("./ui.scheduler.work_space.grouped.strategy"));

var _cache = require("./cache");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var VERTICAL_GROUPED_ATTR = 'dx-group-column-count';
var DATE_HEADER_OFFSET = 10;
var WORK_SPACE_BORDER = 1;

var VerticalGroupedStrategy = /*#__PURE__*/function (_GroupedStrategy) {
  _inheritsLoose(VerticalGroupedStrategy, _GroupedStrategy);

  function VerticalGroupedStrategy(workSpace) {
    var _this;

    _this = _GroupedStrategy.call(this, workSpace) || this;
    _this.cache = new _cache.Cache();
    return _this;
  }

  var _proto = VerticalGroupedStrategy.prototype;

  _proto.prepareCellIndexes = function prepareCellIndexes(cellCoordinates, groupIndex, inAllDayRow) {
    var rowIndex = cellCoordinates.rowIndex + groupIndex * this._workSpace._getRowCount();

    if (this._workSpace.supportAllDayRow() && this._workSpace.option('showAllDayPanel')) {
      rowIndex += groupIndex;

      if (!inAllDayRow) {
        rowIndex += 1;
      }
    }

    return {
      rowIndex: rowIndex,
      cellIndex: cellCoordinates.cellIndex
    };
  };

  _proto.calculateCellIndex = function calculateCellIndex(rowIndex, cellIndex) {
    rowIndex = rowIndex % this._workSpace._getRowCount();
    return this._workSpace._getRowCount() * cellIndex + rowIndex;
  };

  _proto.getGroupIndex = function getGroupIndex(rowIndex) {
    return Math.floor(rowIndex / this._workSpace._getRowCount());
  };

  _proto.calculateHeaderCellRepeatCount = function calculateHeaderCellRepeatCount() {
    return 1;
  };

  _proto.insertAllDayRowsIntoDateTable = function insertAllDayRowsIntoDateTable() {
    return this._workSpace.option('showAllDayPanel');
  };

  _proto.getTotalCellCount = function getTotalCellCount() {
    return this._workSpace._getCellCount();
  };

  _proto.getTotalRowCount = function getTotalRowCount() {
    return this._workSpace._getRowCount() * this._workSpace._getGroupCount();
  };

  _proto.addAdditionalGroupCellClasses = function addAdditionalGroupCellClasses(cellClass, index, i, j) {
    cellClass = this._addLastGroupCellClass(cellClass, i + 1);
    return this._addFirstGroupCellClass(cellClass, i + 1);
  };

  _proto._addLastGroupCellClass = function _addLastGroupCellClass(cellClass, index) {
    if (index % this._workSpace._getRowCount() === 0) {
      return cellClass + ' ' + this.getLastGroupCellClass();
    }

    return cellClass;
  };

  _proto._addFirstGroupCellClass = function _addFirstGroupCellClass(cellClass, index) {
    if ((index - 1) % this._workSpace._getRowCount() === 0) {
      return cellClass + ' ' + this.getFirstGroupCellClass();
    }

    return cellClass;
  };

  _proto.getHorizontalMax = function getHorizontalMax(groupIndex) {
    if (this._workSpace.isRenovatedRender()) {
      return this._workSpace.getMaxAllowedPosition(groupIndex);
    }

    return this._workSpace.getMaxAllowedPosition(0);
  };

  _proto.getVerticalMax = function getVerticalMax(groupIndex) {
    var maxAllowedPosition = this._workSpace.getMaxAllowedVerticalPosition(groupIndex);

    maxAllowedPosition += this._getOffsetByAllDayPanel(groupIndex);
    return maxAllowedPosition;
  };

  _proto._getOffsetByAllDayPanel = function _getOffsetByAllDayPanel(groupIndex) {
    var result = 0;

    if (this._workSpace.supportAllDayRow() && this._workSpace.option('showAllDayPanel')) {
      result = this._workSpace.getAllDayHeight() * (groupIndex + 1);
    }

    return result;
  };

  _proto._getGroupTop = function _getGroupTop(groupIndex) {
    var workspace = this._workSpace;
    var rowCount = workspace.isVirtualScrolling() ? workspace.viewDataProvider.getRowCountInGroup(groupIndex) : workspace._getRowCount();
    return workspace.getMaxAllowedVerticalPosition(groupIndex) - workspace.getCellHeight() * rowCount;
  };

  _proto.calculateTimeCellRepeatCount = function calculateTimeCellRepeatCount() {
    return this._workSpace._getGroupCount() || 1;
  };

  _proto.getWorkSpaceMinWidth = function getWorkSpaceMinWidth() {
    var minWidth = this._workSpace._getWorkSpaceWidth();

    var workspaceContainerWidth = (0, _position.getBoundingRect)(this._workSpace.$element().get(0)).width - this._workSpace.getTimePanelWidth() - this._workSpace.getGroupTableWidth() - 2 * WORK_SPACE_BORDER;

    if (minWidth < workspaceContainerWidth) {
      minWidth = workspaceContainerWidth;
    }

    return minWidth;
  };

  _proto.getAllDayOffset = function getAllDayOffset() {
    return 0;
  };

  _proto.getAllDayTableHeight = function getAllDayTableHeight() {
    return 0;
  };

  _proto.getGroupCountAttr = function getGroupCountAttr(groups) {
    return {
      attr: VERTICAL_GROUPED_ATTR,
      count: groups === null || groups === void 0 ? void 0 : groups.length
    };
  };

  _proto.getLeftOffset = function getLeftOffset() {
    return this._workSpace.getTimePanelWidth() + this._workSpace.getGroupTableWidth();
  };

  _proto.getGroupBoundsOffset = function getGroupBoundsOffset(cellCount, $cells, cellWidth, coordinates) {
    var _this2 = this;

    var groupIndex = coordinates.groupIndex;
    return this.cache.get("groupBoundsOffset".concat(groupIndex), function () {
      var startOffset = $cells.eq(0).offset().left;
      var endOffset = $cells.eq(cellCount - 1).offset().left + cellWidth;

      var dayHeight = _this2._workSpace._calculateDayDuration() / _this2._workSpace.option('hoursInterval') * _this2._workSpace.getCellHeight();

      var scrollTop = _this2.getScrollableScrollTop();

      var topOffset = groupIndex * dayHeight + (0, _position.getBoundingRect)(_this2._workSpace._$thead.get(0)).height + _this2._workSpace.invoke('getHeaderHeight') + DATE_HEADER_OFFSET - scrollTop;

      if (_this2._workSpace.option('showAllDayPanel') && _this2._workSpace.supportAllDayRow()) {
        topOffset += _this2._workSpace.getCellHeight() * (groupIndex + 1);
      }

      var bottomOffset = topOffset + dayHeight;
      return _this2._groupBoundsOffset = {
        left: startOffset,
        right: endOffset,
        top: topOffset,
        bottom: bottomOffset
      };
    });
  };

  _proto.getVirtualScrollingGroupBoundsOffset = function getVirtualScrollingGroupBoundsOffset(cellCount, $cells, cellWidth, coordinates) {
    return this.getGroupBoundsOffset(cellCount, $cells, cellWidth, coordinates);
  };

  _proto.shiftIndicator = function shiftIndicator($indicator, height, rtlOffset, i) {
    var offset = this._workSpace.getIndicatorOffset(0);

    var tableOffset = this._workSpace.option('crossScrollingEnabled') ? 0 : this._workSpace.getGroupTableWidth();
    var horizontalOffset = rtlOffset ? rtlOffset - offset : offset;
    var verticalOffset = this._workSpace._getRowCount() * this._workSpace.getCellHeight() * i;

    if (this._workSpace.supportAllDayRow() && this._workSpace.option('showAllDayPanel')) {
      verticalOffset += this._workSpace.getAllDayHeight() * (i + 1);
    }

    $indicator.css('left', horizontalOffset + tableOffset);
    $indicator.css('top', height + verticalOffset);
  };

  _proto.getShaderOffset = function getShaderOffset(i, width) {
    var offset = this._workSpace.option('crossScrollingEnabled') ? 0 : this._workSpace.getGroupTableWidth();
    return this._workSpace.option('rtlEnabled') ? (0, _position.getBoundingRect)(this._$container.get(0)).width - offset - this._workSpace.getWorkSpaceLeftOffset() - width : offset;
  };

  _proto.getShaderTopOffset = function getShaderTopOffset(i) {
    return 0;
  };

  _proto.getShaderHeight = function getShaderHeight() {
    var height = this._workSpace.getIndicationHeight();

    if (this._workSpace.supportAllDayRow() && this._workSpace.option('showAllDayPanel')) {
      height += this._workSpace.getCellHeight();
    }

    return height;
  };

  _proto.getShaderMaxHeight = function getShaderMaxHeight() {
    var height = this._workSpace._getRowCount() * this._workSpace.getCellHeight();

    if (this._workSpace.supportAllDayRow() && this._workSpace.option('showAllDayPanel')) {
      height += this._workSpace.getCellHeight();
    }

    return height;
  };

  _proto.getShaderWidth = function getShaderWidth() {
    return this._workSpace.getIndicationWidth(0);
  };

  _proto.getScrollableScrollTop = function getScrollableScrollTop() {
    return this._workSpace.getScrollable().scrollTop();
  };

  _proto.getGroupIndexByCell = function getGroupIndexByCell($cell) {
    var rowIndex = $cell.parent().index();

    var rowCount = this._workSpace._getRowCountWithAllDayRows();

    return Math.ceil((rowIndex + 1) / rowCount);
  };

  return VerticalGroupedStrategy;
}(_uiSchedulerWork_spaceGrouped.default);

var _default = VerticalGroupedStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
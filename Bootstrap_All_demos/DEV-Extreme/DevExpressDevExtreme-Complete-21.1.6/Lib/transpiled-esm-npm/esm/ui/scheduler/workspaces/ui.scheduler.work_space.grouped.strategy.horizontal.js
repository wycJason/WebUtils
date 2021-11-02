import { getBoundingRect } from '../../../core/utils/position';
import GroupedStrategy from './ui.scheduler.work_space.grouped.strategy';
var HORIZONTAL_GROUPED_ATTR = 'dx-group-row-count';

class HorizontalGroupedStrategy extends GroupedStrategy {
  prepareCellIndexes(cellCoordinates, groupIndex, inAllDay) {
    var groupByDay = this._workSpace.isGroupedByDate();

    if (!groupByDay) {
      return {
        rowIndex: cellCoordinates.rowIndex,
        cellIndex: cellCoordinates.cellIndex + groupIndex * this._workSpace._getCellCount()
      };
    } else {
      return {
        rowIndex: cellCoordinates.rowIndex,
        cellIndex: cellCoordinates.cellIndex * this._workSpace._getGroupCount() + groupIndex
      };
    }
  }

  calculateCellIndex(rowIndex, cellIndex) {
    cellIndex = cellIndex % this._workSpace._getCellCount();
    return this._workSpace._getRowCount() * cellIndex + rowIndex;
  }

  getGroupIndex(rowIndex, cellIndex) {
    var groupByDay = this._workSpace.isGroupedByDate();

    var groupCount = this._workSpace._getGroupCount();

    if (groupByDay) {
      return cellIndex % groupCount;
    } else {
      return Math.floor(cellIndex / this._workSpace._getCellCount());
    }
  }

  calculateHeaderCellRepeatCount() {
    return this._workSpace._getGroupCount() || 1;
  }

  insertAllDayRowsIntoDateTable() {
    return false;
  }

  getTotalCellCount(groupCount) {
    groupCount = groupCount || 1;
    return this._workSpace._getCellCount() * groupCount;
  }

  getTotalRowCount() {
    return this._workSpace._getRowCount();
  }

  addAdditionalGroupCellClasses(cellClass, index, i, j) {
    var applyUnconditionally = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    cellClass = this._addLastGroupCellClass(cellClass, index, applyUnconditionally);
    return this._addFirstGroupCellClass(cellClass, index, applyUnconditionally);
  }

  _addLastGroupCellClass(cellClass, index, applyUnconditionally) {
    if (applyUnconditionally) {
      return "".concat(cellClass, " ").concat(this.getLastGroupCellClass());
    }

    var groupByDate = this._workSpace.isGroupedByDate();

    if (groupByDate) {
      if (index % this._workSpace._getGroupCount() === 0) {
        return "".concat(cellClass, " ").concat(this.getLastGroupCellClass());
      }
    } else {
      if (index % this._workSpace._getCellCount() === 0) {
        return "".concat(cellClass, " ").concat(this.getLastGroupCellClass());
      }
    }

    return cellClass;
  }

  _addFirstGroupCellClass(cellClass, index, applyUnconditionally) {
    if (applyUnconditionally) {
      return "".concat(cellClass, " ").concat(this.getFirstGroupCellClass());
    }

    var groupByDate = this._workSpace.isGroupedByDate();

    if (groupByDate) {
      if ((index - 1) % this._workSpace._getGroupCount() === 0) {
        return "".concat(cellClass, " ").concat(this.getFirstGroupCellClass());
      }
    } else {
      if ((index - 1) % this._workSpace._getCellCount() === 0) {
        return "".concat(cellClass, " ").concat(this.getFirstGroupCellClass());
      }
    }

    return cellClass;
  }

  getHorizontalMax(groupIndex) {
    return this._workSpace.getMaxAllowedPosition(groupIndex);
  }

  getVerticalMax(groupIndex) {
    var isVirtualScrolling = this._workSpace.isVirtualScrolling();

    var correctedGroupIndex = isVirtualScrolling ? groupIndex : 0;
    return this._workSpace.getMaxAllowedVerticalPosition(correctedGroupIndex);
  }

  calculateTimeCellRepeatCount() {
    return 1;
  }

  getWorkSpaceMinWidth() {
    return getBoundingRect(this._workSpace.$element().get(0)).width - this._workSpace.getTimePanelWidth();
  }

  getAllDayOffset() {
    return this._workSpace.getAllDayHeight();
  }

  getAllDayTableHeight() {
    return getBoundingRect(this._workSpace._$allDayTable.get(0)).height || 0;
  }

  getGroupCountAttr(groups) {
    return {
      attr: HORIZONTAL_GROUPED_ATTR,
      count: groups === null || groups === void 0 ? void 0 : groups.length
    };
  }

  getLeftOffset() {
    return this._workSpace.getTimePanelWidth();
  }

  _createGroupBoundOffset(startCell, endCell, cellWidth) {
    var extraOffset = cellWidth / 2;
    var startOffset = startCell ? startCell.offset().left - extraOffset : 0;
    var endOffset = endCell ? endCell.offset().left + cellWidth + extraOffset : 0;
    return {
      left: startOffset,
      right: endOffset,
      top: 0,
      bottom: 0
    };
  }

  _getGroupedByDateBoundOffset($cells, cellWidth) {
    var firstCellIndex = 0;
    var lastCellIndex = $cells.length - 1;
    var startCell = $cells.eq(firstCellIndex);
    var endCell = $cells.eq(lastCellIndex);
    return this._createGroupBoundOffset(startCell, endCell, cellWidth);
  }

  getGroupBoundsOffset(cellCount, $cells, cellWidth, coordinates) {
    if (this._workSpace.isGroupedByDate()) {
      return this._getGroupedByDateBoundOffset($cells, cellWidth);
    }

    var cellIndex = this._workSpace.getCellIndexByCoordinates(coordinates);

    var groupIndex = coordinates.groupIndex || Math.floor(cellIndex / cellCount);
    var startCellIndex = groupIndex * cellCount;
    var startCell = $cells.eq(startCellIndex);
    var endCell = $cells.eq(startCellIndex + cellCount - 1);
    return this._createGroupBoundOffset(startCell, endCell, cellWidth);
  }

  getVirtualScrollingGroupBoundsOffset(cellCount, $cells, cellWidth, coordinates, groupedDataMap) {
    if (this._workSpace.isGroupedByDate()) {
      return this._getGroupedByDateBoundOffset($cells, cellWidth);
    }

    var startCell;
    var endCell;

    var cellIndex = this._workSpace.getCellIndexByCoordinates(coordinates);

    var groupIndex = coordinates.groupIndex || Math.floor(cellIndex / cellCount);
    var currentCellGroup = groupedDataMap.dateTableGroupedMap[groupIndex];

    if (currentCellGroup) {
      var groupRowLength = currentCellGroup[0].length;
      var groupStartPosition = currentCellGroup[0][0].position;
      var groupEndPosition = currentCellGroup[0][groupRowLength - 1].position;
      startCell = $cells.eq(groupStartPosition.cellIndex);
      endCell = $cells.eq(groupEndPosition.cellIndex);
    }

    return this._createGroupBoundOffset(startCell, endCell, cellWidth);
  }

  shiftIndicator($indicator, height, rtlOffset, groupIndex) {
    var offset = this._getIndicatorOffset(groupIndex);

    var horizontalOffset = rtlOffset ? rtlOffset - offset : offset;
    $indicator.css('left', horizontalOffset);
    $indicator.css('top', height);
  }

  _getIndicatorOffset(groupIndex) {
    var groupByDay = this._workSpace.isGroupedByDate();

    return groupByDay ? this._calculateGroupByDateOffset(groupIndex) : this._calculateOffset(groupIndex);
  }

  _calculateOffset(groupIndex) {
    return this._workSpace._getCellCount() * this._workSpace.getRoundedCellWidth(groupIndex - 1, 0) * groupIndex + this._workSpace.getIndicatorOffset(groupIndex) + groupIndex;
  }

  _calculateGroupByDateOffset(groupIndex) {
    return this._workSpace.getIndicatorOffset(0) * this._workSpace._getGroupCount() + this._workSpace.getRoundedCellWidth(groupIndex - 1, 0) * groupIndex;
  }

  getShaderOffset(i, width) {
    var offset = this._workSpace._getCellCount() * this._workSpace.getRoundedCellWidth(i - 1) * i;
    return this._workSpace.option('rtlEnabled') ? getBoundingRect(this._workSpace._dateTableScrollable.$content().get(0)).width - offset - this._workSpace.getTimePanelWidth() - width : offset;
  }

  getShaderTopOffset(i) {
    return -this.getShaderMaxHeight() * (i > 0 ? 1 : 0);
  }

  getShaderHeight() {
    var height = this._workSpace.getIndicationHeight();

    return height;
  }

  getShaderMaxHeight() {
    return getBoundingRect(this._workSpace._dateTableScrollable.$content().get(0)).height;
  }

  getShaderWidth(i) {
    return this._workSpace.getIndicationWidth(i);
  }

  getScrollableScrollTop(allDay) {
    return !allDay ? this._workSpace.getScrollable().scrollTop() : 0;
  }

  getGroupIndexByCell($cell) {
    var rowIndex = $cell.parent().index();
    var cellIndex = $cell.index();
    return this.getGroupIndex(rowIndex, cellIndex);
  }

}

export default HorizontalGroupedStrategy;
import $ from '../../../core/renderer';
import { each } from '../../../core/utils/iterator';
import SchedulerWorkSpaceIndicator from './ui.scheduler.work_space.indicator';
import dateLocalization from '../../../localization/date';
import timeZoneUtils from '../utils.timeZone';

class SchedulerWorkspaceVertical extends SchedulerWorkSpaceIndicator {
  _getCellsBetween($first, $last) {
    if (this._hasAllDayClass($last)) {
      return super._getCellsBetween($first, $last);
    }

    var $cells = this._getCells();

    var firstColumn = $first.index();
    var firstRow = $first.parent().index();
    var lastColumn = $last.index();
    var lastRow = $last.parent().index();

    var groupCount = this._getGroupCount();

    var cellCount = groupCount > 0 ? this._getTotalCellCount(groupCount) : this._getCellCount();

    var rowCount = this._getTotalRowCount(groupCount);

    var result = [];

    for (var i = 0; i < cellCount; i++) {
      for (var j = 0; j < rowCount; j++) {
        var cell = $cells.get(cellCount * j + i);
        result.push(cell);
      }
    }

    var lastCellGroup = this.getCellData($last).groups;
    var indexesDifference = this.option('showAllDayPanel') && this._isVerticalGroupedWorkSpace() ? this._getGroupIndexByResourceId(lastCellGroup) + 1 : 0;
    var newFirstIndex = rowCount * firstColumn + firstRow - indexesDifference;
    var newLastIndex = rowCount * lastColumn + lastRow - indexesDifference;

    if (newFirstIndex > newLastIndex) {
      var buffer = newFirstIndex;
      newFirstIndex = newLastIndex;
      newLastIndex = buffer;
    }

    $cells = $(result).slice(newFirstIndex, newLastIndex + 1);

    if (this._getGroupCount()) {
      var arr = [];

      var focusedGroupIndex = this._getGroupIndexByCell($first);

      each($cells, function (_, cell) {
        var groupIndex = this._getGroupIndexByCell($(cell));

        if (focusedGroupIndex === groupIndex) {
          arr.push(cell);
        }
      }.bind(this));
      $cells = $(arr);
    }

    return $cells;
  }

  _getCellFromNextColumn(direction, isMultiSelection) {
    var $nextCell = super._getCellFromNextColumn(direction, isMultiSelection);

    var $focusedCell = this._$focusedCell;

    if ($focusedCell.parent().index() !== $nextCell.parent().index() && isMultiSelection) {
      $nextCell = $focusedCell;
    }

    return $nextCell;
  }

  _getFormat() {
    return this._formatWeekdayAndDay;
  }

  renovatedRenderSupported() {
    return true;
  }

  generateRenderOptions() {
    var startViewDate = timeZoneUtils.getDateWithoutTimezoneChange(this.getStartViewDate());

    var _getTimeText = (row, column) => {
      // T410490: incorrectly displaying time slots on Linux
      var index = row % this._getRowCount();

      if (index % 2 === 0 && column === 0) {
        return dateLocalization.format(this._getTimeCellDateCore(startViewDate, row), 'shorttime');
      }

      return '';
    };

    var options = super.generateRenderOptions();
    options.cellDataGetters.push((_, rowIndex, cellIndex) => {
      return {
        value: {
          text: _getTimeText(rowIndex, cellIndex)
        }
      };
    });
    return options;
  }

}

export default SchedulerWorkspaceVertical;
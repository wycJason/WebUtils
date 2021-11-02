import _extends from "@babel/runtime/helpers/esm/extends";
import $ from '../../../core/renderer';
import { noop } from '../../../core/utils/common';
import { extend } from '../../../core/utils/extend';
import { getBoundingRect } from '../../../core/utils/position';
import registerComponent from '../../../core/component_registrator';
import SchedulerWorkSpace from './ui.scheduler.work_space.indicator';
import dateUtils from '../../../core/utils/date';
import tableCreatorModule from '../table_creator';
var {
  tableCreator
} = tableCreatorModule;
import HorizontalShader from '../shaders/ui.scheduler.current_time_shader.horizontal';
import { HEADER_CURRENT_TIME_CELL_CLASS } from '../constants';
import timeZoneUtils from '../utils.timeZone';
import dxrTimelineDateHeader from '../../../renovation/ui/scheduler/workspaces/timeline/header_panel/layout.j';
var TIMELINE_CLASS = 'dx-scheduler-timeline';
var GROUP_TABLE_CLASS = 'dx-scheduler-group-table';
var HORIZONTAL_GROUPED_WORKSPACE_CLASS = 'dx-scheduler-work-space-horizontal-grouped';
var HEADER_PANEL_CELL_CLASS = 'dx-scheduler-header-panel-cell';
var HEADER_PANEL_WEEK_CELL_CLASS = 'dx-scheduler-header-panel-week-cell';
var HEADER_ROW_CLASS = 'dx-scheduler-header-row';
var HORIZONTAL = 'horizontal';
var DATE_TABLE_CELL_BORDER = 1;
var DATE_TABLE_HEADER_MARGIN = 10;
var toMs = dateUtils.dateToMilliseconds;

class SchedulerTimeline extends SchedulerWorkSpace {
  get verticalGroupTableClass() {
    return GROUP_TABLE_CLASS;
  }

  get viewDirection() {
    return 'horizontal';
  }

  get renovatedHeaderPanelComponent() {
    return dxrTimelineDateHeader;
  }

  _init() {
    super._init();

    this.$element().addClass(TIMELINE_CLASS);
    this._$sidebarTable = $('<div>').addClass(GROUP_TABLE_CLASS);
  }

  _getCellFromNextRow(direction, isMultiSelection) {
    if (!isMultiSelection) {
      return super._getCellFromNextRow(direction, isMultiSelection);
    }

    return this._$focusedCell;
  }

  _getDefaultGroupStrategy() {
    return 'vertical';
  }

  _toggleGroupingDirectionClass() {
    this.$element().toggleClass(HORIZONTAL_GROUPED_WORKSPACE_CLASS, this._isHorizontalGroupedWorkSpace());
  }

  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      groupOrientation: 'vertical'
    });
  }

  _getRowCount() {
    return 1;
  }

  _getCellCount() {
    return this._getCellCountInDay() * this.option('intervalCount');
  }

  getGroupTableWidth() {
    return this._$sidebarTable ? this._$sidebarTable.outerWidth() : 0;
  }

  _getTotalRowCount(groupCount) {
    if (this._isHorizontalGroupedWorkSpace()) {
      return this._getRowCount();
    } else {
      groupCount = groupCount || 1;
      return this._getRowCount() * groupCount;
    }
  }

  _getDateForHeaderText(index) {
    var firstViewDate = this._getValidFirstViewDateWithoutDST();

    return this._getDateByIndexCore(firstViewDate, index);
  }

  _getDateByIndexCore(date, index) {
    var result = new Date(date);
    var dayIndex = Math.floor(index / this._getCellCountInDay());
    result.setTime(date.getTime() + this._calculateCellIndex(0, index) * this._getInterval() + dayIndex * this._getHiddenInterval());
    return result;
  }

  _getDateByIndex(index) {
    var firstViewDate = this._getValidFirstViewDateWithoutDST();

    var result = this._getDateByIndexCore(firstViewDate, index);

    if (timeZoneUtils.isTimezoneChangeInDate(this._firstViewDate)) {
      result.setDate(result.getDate() - 1);
    }

    return result;
  }

  _getValidFirstViewDateWithoutDST() {
    var newFirstViewDate = timeZoneUtils.getDateWithoutTimezoneChange(this._firstViewDate);
    newFirstViewDate.setHours(this.option('startDayHour'));
    return newFirstViewDate;
  }

  _getFormat() {
    return 'shorttime';
  }

  _needApplyLastGroupCellClass() {
    return true;
  }

  _calculateHiddenInterval(rowIndex, cellIndex) {
    var dayIndex = Math.floor(cellIndex / this._getCellCountInDay());
    return dayIndex * this._getHiddenInterval();
  }

  _getMillisecondsOffset(rowIndex, cellIndex) {
    cellIndex = this._calculateCellIndex(rowIndex, cellIndex);
    return this._getInterval() * cellIndex + this._calculateHiddenInterval(rowIndex, cellIndex);
  }

  _createWorkSpaceElements() {
    this._createWorkSpaceScrollableElements();
  }

  _getWorkSpaceHeight() {
    if (this.option('crossScrollingEnabled')) {
      return getBoundingRect(this._$dateTable.get(0)).height;
    }

    return getBoundingRect(this.$element().get(0)).height;
  }

  _dateTableScrollableConfig() {
    var config = super._dateTableScrollableConfig();

    var timelineConfig = {
      direction: HORIZONTAL
    };
    return this.option('crossScrollingEnabled') ? config : extend(config, timelineConfig);
  }

  _needCreateCrossScrolling() {
    return true;
  }

  _headerScrollableConfig() {
    var config = super._headerScrollableConfig();

    return extend(config, {
      scrollByContent: true
    });
  }

  _renderTimePanel() {
    return noop();
  }

  _renderAllDayPanel() {
    return noop();
  }

  _getTableAllDay() {
    return false;
  }

  _getDateHeaderTemplate() {
    return this.option('timeCellTemplate');
  }

  _toggleAllDayVisibility() {
    return noop();
  }

  _changeAllDayVisibility() {
    return noop();
  }

  supportAllDayRow() {
    return false;
  }

  _getGroupHeaderContainer() {
    if (this._isHorizontalGroupedWorkSpace()) {
      return this._$thead;
    }

    return this._$sidebarTable;
  }

  _insertAllDayRowsIntoDateTable() {
    return false;
  }

  _createAllDayPanelElements() {
    return noop();
  }

  _renderDateHeader() {
    var $headerRow = super._renderDateHeader();

    if (this._needRenderWeekHeader()) {
      var firstViewDate = new Date(this._firstViewDate);
      var currentDate = new Date(firstViewDate);
      var $cells = [];

      var groupCount = this._getGroupCount();

      var cellCountInDay = this._getCellCountInDay();

      var colSpan = this.isGroupedByDate() ? cellCountInDay * groupCount : cellCountInDay;
      var cellTemplate = this.option('dateCellTemplate');
      var horizontalGroupCount = this._isHorizontalGroupedWorkSpace() && !this.isGroupedByDate() ? groupCount : 1;
      var cellsInGroup = this._getWeekDuration() * this.option('intervalCount');
      var cellsCount = cellsInGroup * horizontalGroupCount;

      for (var templateIndex = 0; templateIndex < cellsCount; templateIndex++) {
        var $th = $('<th>');

        var text = this._formatWeekdayAndDay(currentDate);

        if (cellTemplate) {
          var templateOptions = {
            model: _extends({
              text,
              date: new Date(currentDate)
            }, this._getGroupsForDateHeaderTemplate(templateIndex, colSpan)),
            container: $th,
            index: templateIndex
          };
          cellTemplate.render(templateOptions);
        } else {
          $th.text(text);
        }

        $th.addClass(HEADER_PANEL_CELL_CLASS).addClass(HEADER_PANEL_WEEK_CELL_CLASS).attr('colSpan', colSpan);
        $cells.push($th);

        if (templateIndex % cellsInGroup === cellsInGroup - 1) {
          currentDate = new Date(firstViewDate);
        } else {
          this._incrementDate(currentDate);
        }
      }

      var $row = $('<tr>').addClass(HEADER_ROW_CLASS).append($cells);
      $headerRow.before($row);
    }
  }

  _needRenderWeekHeader() {
    return false;
  }

  _incrementDate(date) {
    date.setDate(date.getDate() + 1);
  }

  _getWeekDuration() {
    return 1;
  }

  _renderView() {
    this._setFirstViewDate();

    var groupCellTemplates;

    if (!this.isRenovatedRender()) {
      groupCellTemplates = this._renderGroupHeader();
    }

    if (this.isRenovatedRender()) {
      this.renderRWorkspace();
    } else {
      this._renderDateHeader();

      this._renderTimePanel();

      this._renderDateTable();

      this._renderAllDayPanel();
    }

    this._shader = new HorizontalShader(this);

    this._$sidebarTable.appendTo(this._sidebarScrollable.$content());

    if (this.isRenovatedRender() && this._isVerticalGroupedWorkSpace()) {
      this.renderRGroupPanel();
    }

    this._applyCellTemplates(groupCellTemplates);
  }

  _setHorizontalGroupHeaderCellsHeight() {
    return noop();
  }

  getIndicationCellCount() {
    var timeDiff = this._getTimeDiff();

    return this._calculateDurationInCells(timeDiff);
  }

  _getTimeDiff() {
    var today = this._getToday();

    var date = this._getIndicationFirstViewDate();

    return today.getTime() - date.getTime();
  }

  _calculateDurationInCells(timeDiff) {
    var today = this._getToday();

    var differenceInDays = Math.floor(timeDiff / toMs('day'));
    var duration = (timeDiff - differenceInDays * toMs('day') - this.option('startDayHour') * toMs('hour')) / this.getCellDuration();

    if (today.getHours() > this.option('endDayHour')) {
      duration = this._getCellCountInDay();
    }

    if (duration < 0) {
      duration = 0;
    }

    return differenceInDays * this._getCellCountInDay() + duration;
  }

  getIndicationWidth() {
    if (this.isGroupedByDate()) {
      var cellCount = this.getIndicationCellCount();
      var integerPart = Math.floor(cellCount);
      var fractionPart = cellCount - integerPart;
      return this.getCellWidth() * (integerPart * this._getGroupCount() + fractionPart);
    } else {
      return this.getIndicationCellCount() * this.getCellWidth();
    }
  }

  _renderIndicator(height, rtlOffset, $container, groupCount) {
    var $indicator;
    var width = this.getIndicationWidth();

    if (this.option('groupOrientation') === 'vertical') {
      $indicator = this._createIndicator($container);
      $indicator.height(getBoundingRect($container.get(0)).height);
      $indicator.css('left', rtlOffset ? rtlOffset - width : width);
    } else {
      for (var i = 0; i < groupCount; i++) {
        var offset = this.isGroupedByDate() ? i * this.getCellWidth() : this._getCellCount() * this.getCellWidth() * i;
        $indicator = this._createIndicator($container);
        $indicator.height(getBoundingRect($container.get(0)).height);
        $indicator.css('left', rtlOffset ? rtlOffset - width - offset : width + offset);
      }
    }
  }

  _isVerticalShader() {
    return false;
  }

  _isCurrentTimeHeaderCell() {
    return false;
  }

  _visibilityChanged(visible) {
    super._visibilityChanged(visible);
  }

  _setTableSizes() {
    var _this$virtualScrollin;

    var cellHeight = this.getCellHeight();

    var minHeight = this._getWorkSpaceMinHeight();

    var verticalGroupCount = this._isVerticalGroupedWorkSpace() ? this._getGroupCount() : 1; // WA for IE: virtual scrolling does not work correctly if we do not set this height

    var height = cellHeight * verticalGroupCount;

    if (height < minHeight) {
      height = minHeight;
    }

    this._$sidebarTable.height(height);

    this._$dateTable.height(height);

    super._setTableSizes();

    (_this$virtualScrollin = this.virtualScrollingDispatcher) === null || _this$virtualScrollin === void 0 ? void 0 : _this$virtualScrollin.updateDimensions();
  }

  _getWorkSpaceMinHeight() {
    var minHeight = this._getWorkSpaceHeight();

    var workspaceContainerHeight = this.$element().outerHeight(true) - this.getHeaderPanelHeight() - 2 * DATE_TABLE_CELL_BORDER - DATE_TABLE_HEADER_MARGIN;

    if (minHeight < workspaceContainerHeight) {
      minHeight = workspaceContainerHeight;
    }

    return minHeight;
  }

  _makeGroupRows(groups, groupByDate) {
    var tableCreatorStrategy = this.option('groupOrientation') === 'vertical' ? tableCreator.VERTICAL : tableCreator.HORIZONTAL;
    return tableCreator.makeGroupedTable(tableCreatorStrategy, groups, {
      groupRowClass: this._getGroupRowClass(),
      groupHeaderRowClass: this._getGroupRowClass(),
      groupHeaderClass: this._getGroupHeaderClass.bind(this),
      groupHeaderContentClass: this._getGroupHeaderContentClass()
    }, this._getCellCount() || 1, this.option('resourceCellTemplate'), this._getTotalRowCount(this._getGroupCount()), groupByDate);
  }

  _ensureGroupHeaderCellsHeight(cellHeight) {
    var minCellHeight = this._calculateMinCellHeight();

    if (cellHeight < minCellHeight) {
      return minCellHeight;
    }

    return cellHeight;
  }

  _calculateMinCellHeight() {
    var dateTable = this._getDateTable();

    var dateTableRowSelector = '.' + this._getDateTableRowClass();

    return getBoundingRect(dateTable).height / dateTable.find(dateTableRowSelector).length - DATE_TABLE_CELL_BORDER * 2;
  }

  _getCellCoordinatesByIndex(index) {
    return {
      cellIndex: index % this._getCellCount(),
      rowIndex: 0
    };
  }

  _getCellByCoordinates(cellCoordinates, groupIndex) {
    var indexes = this._groupedStrategy.prepareCellIndexes(cellCoordinates, groupIndex);

    return this._$dateTable.find('tr').eq(indexes.rowIndex).find('td').eq(indexes.cellIndex);
  }

  _getWorkSpaceWidth() {
    return this._$dateTable.outerWidth(true);
  }

  _getIndicationFirstViewDate() {
    return dateUtils.trimTime(new Date(this._firstViewDate));
  }

  _getIntervalBetween(currentDate, allDay) {
    var startDayHour = this.option('startDayHour');
    var endDayHour = this.option('endDayHour');
    var firstViewDate = this.getStartViewDate();
    var firstViewDateTime = firstViewDate.getTime();
    var hiddenInterval = (24 - endDayHour + startDayHour) * toMs('hour');
    var timeZoneOffset = dateUtils.getTimezonesDifference(firstViewDate, currentDate);
    var apptStart = currentDate.getTime();
    var fullInterval = apptStart - firstViewDateTime - timeZoneOffset;
    var fullDays = Math.floor(fullInterval / toMs('day'));
    var tailDuration = fullInterval - fullDays * toMs('day');
    var tailDelta = 0;

    var cellCount = this._getCellCountInDay() * (fullDays - this._getWeekendsCount(fullDays));

    var gapBeforeAppt = apptStart - dateUtils.trimTime(new Date(currentDate)).getTime();
    var result = cellCount * this.option('hoursInterval') * toMs('hour');

    if (!allDay) {
      if (currentDate.getHours() < startDayHour) {
        tailDelta = tailDuration - hiddenInterval + gapBeforeAppt;
      } else if (currentDate.getHours() >= startDayHour && currentDate.getHours() < endDayHour) {
        tailDelta = tailDuration;
      } else if (currentDate.getHours() >= startDayHour && currentDate.getHours() >= endDayHour) {
        tailDelta = tailDuration - (gapBeforeAppt - endDayHour * toMs('hour'));
      } else if (!fullDays) {
        result = fullInterval;
      }

      result += tailDelta;
    }

    return result;
  }

  _getWeekendsCount() {
    return 0;
  }

  getAllDayContainer() {
    return null;
  }

  getTimePanelWidth() {
    return 0;
  }

  getPositionShift(timeShift) {
    var positionShift = super.getPositionShift(timeShift);
    var left = this.getCellWidth() * timeShift;

    if (this.option('rtlEnabled')) {
      left *= -1;
    }

    left += positionShift.left;
    return {
      top: 0,
      left: left,
      cellPosition: left
    };
  }

  getVisibleBounds() {
    var isRtl = this.option('rtlEnabled');
    var result = {};
    var $scrollable = this.getScrollable().$element();
    var cellWidth = this.getCellWidth();
    var scrollableOffset = isRtl ? this.getScrollableOuterWidth() - this.getScrollableScrollLeft() : this.getScrollableScrollLeft();
    var scrolledCellCount = scrollableOffset / cellWidth;
    var visibleCellCount = $scrollable.width() / cellWidth;
    var totalCellCount = isRtl ? scrolledCellCount - visibleCellCount : scrolledCellCount + visibleCellCount;

    var leftDate = this._getDateByIndex(scrolledCellCount);

    var rightDate = this._getDateByIndex(totalCellCount);

    if (isRtl) {
      leftDate = this._getDateByIndex(totalCellCount);
      rightDate = this._getDateByIndex(scrolledCellCount);
    }

    result.left = {
      hours: leftDate.getHours(),
      minutes: leftDate.getMinutes() >= 30 ? 30 : 0,
      date: dateUtils.trimTime(leftDate)
    };
    result.right = {
      hours: rightDate.getHours(),
      minutes: rightDate.getMinutes() >= 30 ? 30 : 0,
      date: dateUtils.trimTime(rightDate)
    };
    return result;
  }

  getIntervalDuration(allDay) {
    return this.getCellDuration();
  }

  _supportCompactDropDownAppointments() {
    return false;
  }

  getCellMinWidth() {
    return 0;
  }

  getWorkSpaceLeftOffset() {
    return 0;
  }

  scrollToTime(hours, minutes, date) {
    var coordinates = this._getScrollCoordinates(hours, minutes, date);

    var scrollable = this.getScrollable();
    var offset = this.option('rtlEnabled') ? getBoundingRect(this.getScrollableContainer().get(0)).width : 0;

    if (this.option('templatesRenderAsynchronously')) {
      setTimeout(function () {
        scrollable.scrollBy({
          left: coordinates.left - scrollable.scrollLeft() - offset,
          top: 0
        });
      });
    } else {
      scrollable.scrollBy({
        left: coordinates.left - scrollable.scrollLeft() - offset,
        top: 0
      });
    }
  }

  _getRowCountWithAllDayRows() {
    return this._getRowCount();
  }

  _setCurrentTimeCells() {
    var timePanelCells = this._getTimePanelCells();

    var currentTimeCellIndices = this._getCurrentTimePanelCellIndices();

    currentTimeCellIndices.forEach(timePanelCellIndex => {
      timePanelCells.eq(timePanelCellIndex).addClass(HEADER_CURRENT_TIME_CELL_CLASS);
    });
  }

  _cleanCurrentTimeCells() {
    this.$element().find(".".concat(HEADER_CURRENT_TIME_CELL_CLASS)).removeClass(HEADER_CURRENT_TIME_CELL_CLASS);
  }

  _getTimePanelCells() {
    return this.$element().find(".".concat(HEADER_PANEL_CELL_CLASS, ":not(.").concat(HEADER_PANEL_WEEK_CELL_CLASS, ")"));
  }

  _getCurrentTimePanelCellIndices() {
    var columnCountPerGroup = this._getCellCount();

    var today = this._getToday();

    var index = this.getCellIndexByDate(today);

    var {
      cellIndex: currentTimeCellIndex
    } = this._getCellCoordinatesByIndex(index);

    if (currentTimeCellIndex === undefined) {
      return [];
    }

    var horizontalGroupCount = this._isHorizontalGroupedWorkSpace() && !this.isGroupedByDate() ? this._getGroupCount() : 1;
    return [...new Array(horizontalGroupCount)].map((_, groupIndex) => columnCountPerGroup * groupIndex + currentTimeCellIndex);
  }

  renovatedRenderSupported() {
    return true;
  }

  renderRAllDayPanel() {}

  renderRTimeTable() {}

  generateRenderOptions() {
    var options = super.generateRenderOptions(true);

    var groupCount = this._getGroupCount();

    var horizontalGroupCount = this._isHorizontalGroupedWorkSpace() && !this.isGroupedByDate() ? groupCount : 1;
    var cellsInGroup = this._getWeekDuration() * this.option('intervalCount');
    var daysInView = cellsInGroup * horizontalGroupCount;
    return _extends({}, options, {
      isGenerateWeekDaysHeaderData: this._needRenderWeekHeader(),
      getWeekDaysHeaderText: this._formatWeekdayAndDay.bind(this),
      daysInView,
      cellCountInDay: this._getCellCountInDay()
    });
  }

}

registerComponent('dxSchedulerTimeline', SchedulerTimeline);
export default SchedulerTimeline;
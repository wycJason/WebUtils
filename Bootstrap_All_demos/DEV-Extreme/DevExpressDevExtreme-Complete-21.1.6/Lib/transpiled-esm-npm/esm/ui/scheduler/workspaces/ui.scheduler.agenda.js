import $ from '../../../core/renderer';
import domAdapter from '../../../core/dom_adapter';
import { noop } from '../../../core/utils/common';
import { each } from '../../../core/utils/iterator';
import { getPublicElement } from '../../../core/element';
import registerComponent from '../../../core/component_registrator';
import WorkSpace from './ui.scheduler.work_space';
import { extend } from '../../../core/utils/extend';
import dateLocalization from '../../../localization/date';
import tableCreatorModule from '../table_creator';
var {
  tableCreator
} = tableCreatorModule;
var AGENDA_CLASS = 'dx-scheduler-agenda';
var AGENDA_DATE_CLASS = 'dx-scheduler-agenda-date';
var GROUP_TABLE_CLASS = 'dx-scheduler-group-table';
var AGENDA_GROUPED_ATTR = 'dx-group-column-count';
var TIME_PANEL_ROW_CLASS = 'dx-scheduler-time-panel-row';
var TIME_PANEL_CELL_CLASS = 'dx-scheduler-time-panel-cell';
var NODATA_CONTAINER_CLASS = 'dx-scheduler-agenda-nodata';
var LAST_ROW_CLASS = 'dx-scheduler-date-table-last-row';
var INNER_CELL_MARGIN = 5;
var OUTER_CELL_MARGIN = 20;

class SchedulerAgenda extends WorkSpace {
  get renderingStrategy() {
    return this.invoke('getLayoutManager').getRenderingStrategyInstance();
  }

  _init() {
    super._init();

    this._activeStateUnit = undefined;
  }

  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      // Number | "month"
      agendaDuration: 7,
      rowHeight: 60,
      noDataText: ''
    });
  }

  _optionChanged(args) {
    var name = args.name;
    var value = args.value;

    switch (name) {
      case 'agendaDuration':
        break;

      case 'noDataText':
      case 'rowHeight':
        this._recalculateAgenda(this._rows);

        break;

      case 'groups':
        if (!value || !value.length) {
          if (this._$groupTable) {
            this._$groupTable.remove();

            this._$groupTable = null;

            this._detachGroupCountAttr();
          }
        } else {
          if (!this._$groupTable) {
            this._initGroupTable();

            this._dateTableScrollable.$content().prepend(this._$groupTable);
          }
        }

        super._optionChanged(args);

        break;

      default:
        super._optionChanged(args);

    }
  }

  _renderFocusState() {
    return noop();
  }

  _renderFocusTarget() {
    return noop();
  }

  _cleanFocusState() {
    return noop();
  }

  supportAllDayRow() {
    return false;
  }

  _isVerticalGroupedWorkSpace() {
    return false;
  }

  _getElementClass() {
    return AGENDA_CLASS;
  }

  _setFirstViewDate() {
    this._firstViewDate = new Date(this.option('currentDate'));

    this._setStartDayHour(this._firstViewDate);
  }

  _getRowCount() {
    return this.option('agendaDuration');
  }

  _getCellCount() {
    return 1;
  }

  _getTimePanelRowCount() {
    return this.option('agendaDuration');
  }

  _getDateByIndex() {
    return noop();
  }

  _getFormat() {
    return 'd ddd';
  }

  _renderAllDayPanel() {
    return noop();
  }

  _toggleAllDayVisibility() {
    return noop();
  }

  _initWorkSpaceUnits() {
    this._initGroupTable();

    this._$timePanel = $('<table>').addClass(this._getTimePanelClass());
    this._$dateTable = $('<table>').addClass(this._getDateTableClass());
  }

  _initGroupTable() {
    var groups = this.option('groups');

    if (groups && groups.length) {
      this._$groupTable = $('<table>').addClass(GROUP_TABLE_CLASS);
    }
  }

  _renderView() {
    this._setFirstViewDate();

    this._rows = [];
  }

  _recalculateAgenda(rows) {
    var cellTemplates = [];

    this._cleanView();

    if (this._rowsIsEmpty(rows)) {
      this._renderNoData();

      return;
    }

    this._rows = rows;

    if (this._$groupTable) {
      cellTemplates = this._renderGroupHeader();

      this._setGroupHeaderCellsHeight();
    }

    this._renderTimePanel();

    this._renderDateTable();

    this.invoke('onAgendaReady', rows);

    this._applyCellTemplates(cellTemplates);

    this._dateTableScrollable.update();
  }

  _renderNoData() {
    this._$noDataContainer = $('<div>').addClass(NODATA_CONTAINER_CLASS).html(this.option('noDataText'));

    this._dateTableScrollable.$content().append(this._$noDataContainer);
  }

  _setTableSizes() {
    return noop();
  }

  _toggleHorizontalScrollClass() {
    return noop();
  }

  _createCrossScrollingConfig() {
    return noop();
  }

  _setGroupHeaderCellsHeight() {
    var $cells = this._getGroupHeaderCells().filter(function (_, element) {
      return !element.getAttribute('rowSpan');
    });

    var rows = this._removeEmptyRows(this._rows);

    if (!rows.length) {
      return;
    }

    for (var i = 0; i < $cells.length; i++) {
      var $cellContent = $cells.eq(i).find('.dx-scheduler-group-header-content');
      $cellContent.outerHeight(this._getGroupRowHeight(rows[i]));
    }
  }

  _rowsIsEmpty(rows) {
    var result = true;

    for (var i = 0; i < rows.length; i++) {
      var groupRow = rows[i];

      for (var j = 0; j < groupRow.length; j++) {
        if (groupRow[j]) {
          result = false;
          break;
        }
      }
    }

    return result;
  }

  _detachGroupCountAttr() {
    this.$element().removeAttr(AGENDA_GROUPED_ATTR);
  }

  _attachGroupCountAttr() {
    this.$element().attr(AGENDA_GROUPED_ATTR, this.option('groups').length);
  }

  _removeEmptyRows(rows) {
    var result = [];

    var isEmpty = function isEmpty(data) {
      return !data.some(function (value) {
        return value > 0;
      });
    };

    for (var i = 0; i < rows.length; i++) {
      if (rows[i].length && !isEmpty(rows[i])) {
        result.push(rows[i]);
      }
    }

    return result;
  }

  _getGroupHeaderContainer() {
    return this._$groupTable;
  }

  _makeGroupRows() {
    var tree = this.invoke('createReducedResourcesTree');
    var cellTemplate = this.option('resourceCellTemplate');

    var getGroupHeaderContentClass = this._getGroupHeaderContentClass();

    var cellTemplates = [];
    var table = tableCreator.makeGroupedTableFromJSON(tableCreator.VERTICAL, tree, {
      cellTag: 'th',
      groupTableClass: GROUP_TABLE_CLASS,
      groupRowClass: this._getGroupRowClass(),
      groupCellClass: this._getGroupHeaderClass(),

      groupCellCustomContent(cell, cellText, index, data) {
        var container = domAdapter.createElement('div');
        var contentWrapper = domAdapter.createElement('div');
        container.className = getGroupHeaderContentClass;
        contentWrapper.appendChild(cellText);
        container.appendChild(contentWrapper);
        container.className = getGroupHeaderContentClass;

        if (cellTemplate && cellTemplate.render) {
          cellTemplates.push(cellTemplate.render.bind(cellTemplate, {
            model: {
              data: data.data,
              id: data.value,
              color: data.color,
              text: cellText.textContent
            },
            container: getPublicElement($(container)),
            index: index
          }));
        } else {
          contentWrapper.appendChild(cellText);
          container.appendChild(contentWrapper);
        }

        cell.appendChild(container);
      },

      cellTemplate: cellTemplate
    });
    return {
      elements: $(table).find('.' + this._getGroupRowClass()),
      cellTemplates: cellTemplates
    };
  }

  _cleanView() {
    this._$dateTable.empty();

    this._$timePanel.empty();

    if (this._$groupTable) {
      this._$groupTable.empty();
    }

    if (this._$noDataContainer) {
      this._$noDataContainer.empty();

      this._$noDataContainer.remove();

      delete this._$noDataContainer;
    }
  }

  _createWorkSpaceElements() {
    this._createWorkSpaceStaticElements();
  }

  _createWorkSpaceStaticElements() {
    if (this._$groupTable) {
      this._dateTableScrollable.$content().prepend(this._$groupTable);
    }

    this._dateTableScrollable.$content().append(this._$timePanel, this._$dateTable);

    this.$element().append(this._dateTableScrollable.$element());
  }

  _renderDateTable() {
    this._renderTableBody({
      container: getPublicElement(this._$dateTable),
      rowClass: this._getDateTableRowClass(),
      cellClass: this._getDateTableCellClass()
    });
  }

  _attachTablesEvents() {
    return noop();
  }

  _attachEvents() {
    return noop();
  }

  _cleanCellDataCache() {
    return noop();
  }

  isIndicationAvailable() {
    return false;
  }

  _prepareCellTemplateOptions(text, date, rowIndex, $cell) {
    var groupsOpt = this.option('groups');
    var groups = {};
    var isGroupedView = !!groupsOpt.length;
    var path = isGroupedView && this._getPathToLeaf(rowIndex) || [];
    path.forEach(function (resourceValue, resourceIndex) {
      var resourceName = groupsOpt[resourceIndex].name;
      groups[resourceName] = resourceValue;
    });
    var groupIndex = isGroupedView ? this._getGroupIndexByResourceId(groups) : undefined;
    return {
      model: {
        text,
        date,
        groups,
        groupIndex
      },
      container: getPublicElement($cell),
      index: rowIndex
    };
  }

  _renderTableBody(options) {
    var cellTemplates = [];
    var cellTemplateOpt = options.cellTemplate;
    this._$rows = [];
    var i;

    var fillTableBody = function (rowIndex, rowSize) {
      if (rowSize) {
        var date;
        var cellDateNumber;
        var cellDayName;
        var $row = $('<tr>');
        var $td = $('<td>').height(this._getRowHeight(rowSize));

        if (options.getStartDate) {
          date = options.getStartDate && options.getStartDate(rowIndex);
          cellDateNumber = dateLocalization.format(date, 'd');
          cellDayName = dateLocalization.format(date, this._formatWeekday);
        }

        if (cellTemplateOpt && cellTemplateOpt.render) {
          var templateOptions = this._prepareCellTemplateOptions(cellDateNumber + ' ' + cellDayName, date, i, $td);

          cellTemplates.push(cellTemplateOpt.render.bind(cellTemplateOpt, templateOptions));
        } else {
          if (cellDateNumber && cellDayName) {
            $td.addClass(AGENDA_DATE_CLASS).text(cellDateNumber + ' ' + cellDayName);
          }
        }

        if (options.rowClass) {
          $row.addClass(options.rowClass);
        }

        if (options.cellClass) {
          $td.addClass(options.cellClass);
        }

        $row.append($td);

        this._$rows.push($row);
      }
    }.bind(this);

    for (i = 0; i < this._rows.length; i++) {
      each(this._rows[i], fillTableBody);

      this._setLastRowClass();
    }

    $(options.container).append($('<tbody>').append(this._$rows));

    this._applyCellTemplates(cellTemplates);
  }

  _setLastRowClass() {
    if (this._rows.length > 1 && this._$rows.length) {
      var $lastRow = this._$rows[this._$rows.length - 1];
      $lastRow.addClass(LAST_ROW_CLASS);
    }
  }

  _renderTimePanel() {
    this._renderTableBody({
      container: getPublicElement(this._$timePanel),
      rowCount: this._getTimePanelRowCount(),
      cellCount: 1,
      rowClass: TIME_PANEL_ROW_CLASS,
      cellClass: TIME_PANEL_CELL_CLASS,
      cellTemplate: this.option('dateCellTemplate'),
      getStartDate: this._getTimePanelStartDate.bind(this)
    });
  }

  _getTimePanelStartDate(rowIndex) {
    var current = new Date(this.option('currentDate'));
    var cellDate = new Date(current.setDate(current.getDate() + rowIndex));
    return cellDate;
  }

  _getRowHeight(rowSize) {
    var baseHeight = this.option('rowHeight');
    var innerOffset = (rowSize - 1) * INNER_CELL_MARGIN;
    return rowSize ? baseHeight * rowSize + innerOffset + OUTER_CELL_MARGIN : 0;
  }

  _getGroupRowHeight(groupRows) {
    // TODO: hotfix
    if (!groupRows) {
      return;
    }

    var result = 0;

    for (var i = 0; i < groupRows.length; i++) {
      result += this._getRowHeight(groupRows[i]);
    }

    return result;
  }

  _calculateRows(appointments) {
    return this.renderingStrategy.calculateRows(appointments, this.option('agendaDuration'), this.option('currentDate'));
  }

  preRenderAppointments(options) {
    super.preRenderAppointments(options);

    this._calculateRows(options.appointments);
  }

  onDataSourceChanged(appointments) {
    super.onDataSourceChanged();

    this._renderView();

    var rows = this._calculateRows(appointments);

    this._recalculateAgenda(rows);
  }

  getAgendaVerticalStepHeight() {
    return this.option('rowHeight');
  }

  getEndViewDate() {
    var currentDate = new Date(this.option('currentDate'));
    var agendaDuration = this.option('agendaDuration');
    currentDate.setHours(this.option('endDayHour'));
    var result = currentDate.setDate(currentDate.getDate() + agendaDuration - 1) - 60000;
    return new Date(result);
  }

  getEndViewDateByEndDayHour() {
    return this.getEndViewDate();
  }

  getCoordinatesByDate() {
    return {
      top: 0,
      left: 0,
      max: 0,
      groupIndex: 0
    };
  }

  getCellDataByCoordinates() {
    return {
      startDate: null,
      endDate: null
    };
  }

  updateScrollPosition(date) {
    var scheduler = this.option('observer');
    var newDate = scheduler.timeZoneCalculator.createDate(date, {
      path: 'toGrid'
    });
    var bounds = this.getVisibleBounds();
    var startDateHour = newDate.getHours();
    var startDateMinutes = newDate.getMinutes();

    if (this.needUpdateScrollPosition(startDateHour, startDateMinutes, bounds, newDate)) {
      this.scrollToTime(startDateHour, startDateMinutes, newDate);
    }
  }

  needUpdateScrollPosition(hours, minutes, bounds) {
    var isUpdateNeeded = false;

    if (hours < bounds.top.hours || hours > bounds.bottom.hours) {
      isUpdateNeeded = true;
    }

    if (hours === bounds.top.hours && minutes < bounds.top.minutes) {
      isUpdateNeeded = true;
    }

    if (hours === bounds.bottom.hours && minutes > bounds.top.minutes) {
      isUpdateNeeded = true;
    }

    return isUpdateNeeded;
  }

}

registerComponent('dxSchedulerAgenda', SchedulerAgenda);
export default SchedulerAgenda;
"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));

var _common = require("../../../core/utils/common");

var _iterator = require("../../../core/utils/iterator");

var _element = require("../../../core/element");

var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));

var _uiScheduler = _interopRequireDefault(require("./ui.scheduler.work_space"));

var _extend = require("../../../core/utils/extend");

var _date = _interopRequireDefault(require("../../../localization/date"));

var _table_creator = _interopRequireDefault(require("../table_creator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var tableCreator = _table_creator.default.tableCreator;
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

var SchedulerAgenda = /*#__PURE__*/function (_WorkSpace) {
  _inheritsLoose(SchedulerAgenda, _WorkSpace);

  function SchedulerAgenda() {
    return _WorkSpace.apply(this, arguments) || this;
  }

  var _proto = SchedulerAgenda.prototype;

  _proto._init = function _init() {
    _WorkSpace.prototype._init.call(this);

    this._activeStateUnit = undefined;
  };

  _proto._getDefaultOptions = function _getDefaultOptions() {
    return (0, _extend.extend)(_WorkSpace.prototype._getDefaultOptions.call(this), {
      // Number | "month"
      agendaDuration: 7,
      rowHeight: 60,
      noDataText: ''
    });
  };

  _proto._optionChanged = function _optionChanged(args) {
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

        _WorkSpace.prototype._optionChanged.call(this, args);

        break;

      default:
        _WorkSpace.prototype._optionChanged.call(this, args);

    }
  };

  _proto._renderFocusState = function _renderFocusState() {
    return (0, _common.noop)();
  };

  _proto._renderFocusTarget = function _renderFocusTarget() {
    return (0, _common.noop)();
  };

  _proto._cleanFocusState = function _cleanFocusState() {
    return (0, _common.noop)();
  };

  _proto.supportAllDayRow = function supportAllDayRow() {
    return false;
  };

  _proto._isVerticalGroupedWorkSpace = function _isVerticalGroupedWorkSpace() {
    return false;
  };

  _proto._getElementClass = function _getElementClass() {
    return AGENDA_CLASS;
  };

  _proto._setFirstViewDate = function _setFirstViewDate() {
    this._firstViewDate = new Date(this.option('currentDate'));

    this._setStartDayHour(this._firstViewDate);
  };

  _proto._getRowCount = function _getRowCount() {
    return this.option('agendaDuration');
  };

  _proto._getCellCount = function _getCellCount() {
    return 1;
  };

  _proto._getTimePanelRowCount = function _getTimePanelRowCount() {
    return this.option('agendaDuration');
  };

  _proto._getDateByIndex = function _getDateByIndex() {
    return (0, _common.noop)();
  };

  _proto._getFormat = function _getFormat() {
    return 'd ddd';
  };

  _proto._renderAllDayPanel = function _renderAllDayPanel() {
    return (0, _common.noop)();
  };

  _proto._toggleAllDayVisibility = function _toggleAllDayVisibility() {
    return (0, _common.noop)();
  };

  _proto._initWorkSpaceUnits = function _initWorkSpaceUnits() {
    this._initGroupTable();

    this._$timePanel = (0, _renderer.default)('<table>').addClass(this._getTimePanelClass());
    this._$dateTable = (0, _renderer.default)('<table>').addClass(this._getDateTableClass());
  };

  _proto._initGroupTable = function _initGroupTable() {
    var groups = this.option('groups');

    if (groups && groups.length) {
      this._$groupTable = (0, _renderer.default)('<table>').addClass(GROUP_TABLE_CLASS);
    }
  };

  _proto._renderView = function _renderView() {
    this._setFirstViewDate();

    this._rows = [];
  };

  _proto._recalculateAgenda = function _recalculateAgenda(rows) {
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
  };

  _proto._renderNoData = function _renderNoData() {
    this._$noDataContainer = (0, _renderer.default)('<div>').addClass(NODATA_CONTAINER_CLASS).html(this.option('noDataText'));

    this._dateTableScrollable.$content().append(this._$noDataContainer);
  };

  _proto._setTableSizes = function _setTableSizes() {
    return (0, _common.noop)();
  };

  _proto._toggleHorizontalScrollClass = function _toggleHorizontalScrollClass() {
    return (0, _common.noop)();
  };

  _proto._createCrossScrollingConfig = function _createCrossScrollingConfig() {
    return (0, _common.noop)();
  };

  _proto._setGroupHeaderCellsHeight = function _setGroupHeaderCellsHeight() {
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
  };

  _proto._rowsIsEmpty = function _rowsIsEmpty(rows) {
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
  };

  _proto._detachGroupCountAttr = function _detachGroupCountAttr() {
    this.$element().removeAttr(AGENDA_GROUPED_ATTR);
  };

  _proto._attachGroupCountAttr = function _attachGroupCountAttr() {
    this.$element().attr(AGENDA_GROUPED_ATTR, this.option('groups').length);
  };

  _proto._removeEmptyRows = function _removeEmptyRows(rows) {
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
  };

  _proto._getGroupHeaderContainer = function _getGroupHeaderContainer() {
    return this._$groupTable;
  };

  _proto._makeGroupRows = function _makeGroupRows() {
    var tree = this.invoke('createReducedResourcesTree');
    var cellTemplate = this.option('resourceCellTemplate');

    var getGroupHeaderContentClass = this._getGroupHeaderContentClass();

    var cellTemplates = [];
    var table = tableCreator.makeGroupedTableFromJSON(tableCreator.VERTICAL, tree, {
      cellTag: 'th',
      groupTableClass: GROUP_TABLE_CLASS,
      groupRowClass: this._getGroupRowClass(),
      groupCellClass: this._getGroupHeaderClass(),
      groupCellCustomContent: function groupCellCustomContent(cell, cellText, index, data) {
        var container = _dom_adapter.default.createElement('div');

        var contentWrapper = _dom_adapter.default.createElement('div');

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
            container: (0, _element.getPublicElement)((0, _renderer.default)(container)),
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
      elements: (0, _renderer.default)(table).find('.' + this._getGroupRowClass()),
      cellTemplates: cellTemplates
    };
  };

  _proto._cleanView = function _cleanView() {
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
  };

  _proto._createWorkSpaceElements = function _createWorkSpaceElements() {
    this._createWorkSpaceStaticElements();
  };

  _proto._createWorkSpaceStaticElements = function _createWorkSpaceStaticElements() {
    if (this._$groupTable) {
      this._dateTableScrollable.$content().prepend(this._$groupTable);
    }

    this._dateTableScrollable.$content().append(this._$timePanel, this._$dateTable);

    this.$element().append(this._dateTableScrollable.$element());
  };

  _proto._renderDateTable = function _renderDateTable() {
    this._renderTableBody({
      container: (0, _element.getPublicElement)(this._$dateTable),
      rowClass: this._getDateTableRowClass(),
      cellClass: this._getDateTableCellClass()
    });
  };

  _proto._attachTablesEvents = function _attachTablesEvents() {
    return (0, _common.noop)();
  };

  _proto._attachEvents = function _attachEvents() {
    return (0, _common.noop)();
  };

  _proto._cleanCellDataCache = function _cleanCellDataCache() {
    return (0, _common.noop)();
  };

  _proto.isIndicationAvailable = function isIndicationAvailable() {
    return false;
  };

  _proto._prepareCellTemplateOptions = function _prepareCellTemplateOptions(text, date, rowIndex, $cell) {
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
        text: text,
        date: date,
        groups: groups,
        groupIndex: groupIndex
      },
      container: (0, _element.getPublicElement)($cell),
      index: rowIndex
    };
  };

  _proto._renderTableBody = function _renderTableBody(options) {
    var cellTemplates = [];
    var cellTemplateOpt = options.cellTemplate;
    this._$rows = [];
    var i;

    var fillTableBody = function (rowIndex, rowSize) {
      if (rowSize) {
        var date;
        var cellDateNumber;
        var cellDayName;
        var $row = (0, _renderer.default)('<tr>');
        var $td = (0, _renderer.default)('<td>').height(this._getRowHeight(rowSize));

        if (options.getStartDate) {
          date = options.getStartDate && options.getStartDate(rowIndex);
          cellDateNumber = _date.default.format(date, 'd');
          cellDayName = _date.default.format(date, this._formatWeekday);
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
      (0, _iterator.each)(this._rows[i], fillTableBody);

      this._setLastRowClass();
    }

    (0, _renderer.default)(options.container).append((0, _renderer.default)('<tbody>').append(this._$rows));

    this._applyCellTemplates(cellTemplates);
  };

  _proto._setLastRowClass = function _setLastRowClass() {
    if (this._rows.length > 1 && this._$rows.length) {
      var $lastRow = this._$rows[this._$rows.length - 1];
      $lastRow.addClass(LAST_ROW_CLASS);
    }
  };

  _proto._renderTimePanel = function _renderTimePanel() {
    this._renderTableBody({
      container: (0, _element.getPublicElement)(this._$timePanel),
      rowCount: this._getTimePanelRowCount(),
      cellCount: 1,
      rowClass: TIME_PANEL_ROW_CLASS,
      cellClass: TIME_PANEL_CELL_CLASS,
      cellTemplate: this.option('dateCellTemplate'),
      getStartDate: this._getTimePanelStartDate.bind(this)
    });
  };

  _proto._getTimePanelStartDate = function _getTimePanelStartDate(rowIndex) {
    var current = new Date(this.option('currentDate'));
    var cellDate = new Date(current.setDate(current.getDate() + rowIndex));
    return cellDate;
  };

  _proto._getRowHeight = function _getRowHeight(rowSize) {
    var baseHeight = this.option('rowHeight');
    var innerOffset = (rowSize - 1) * INNER_CELL_MARGIN;
    return rowSize ? baseHeight * rowSize + innerOffset + OUTER_CELL_MARGIN : 0;
  };

  _proto._getGroupRowHeight = function _getGroupRowHeight(groupRows) {
    // TODO: hotfix
    if (!groupRows) {
      return;
    }

    var result = 0;

    for (var i = 0; i < groupRows.length; i++) {
      result += this._getRowHeight(groupRows[i]);
    }

    return result;
  };

  _proto._calculateRows = function _calculateRows(appointments) {
    return this.renderingStrategy.calculateRows(appointments, this.option('agendaDuration'), this.option('currentDate'));
  };

  _proto.preRenderAppointments = function preRenderAppointments(options) {
    _WorkSpace.prototype.preRenderAppointments.call(this, options);

    this._calculateRows(options.appointments);
  };

  _proto.onDataSourceChanged = function onDataSourceChanged(appointments) {
    _WorkSpace.prototype.onDataSourceChanged.call(this);

    this._renderView();

    var rows = this._calculateRows(appointments);

    this._recalculateAgenda(rows);
  };

  _proto.getAgendaVerticalStepHeight = function getAgendaVerticalStepHeight() {
    return this.option('rowHeight');
  };

  _proto.getEndViewDate = function getEndViewDate() {
    var currentDate = new Date(this.option('currentDate'));
    var agendaDuration = this.option('agendaDuration');
    currentDate.setHours(this.option('endDayHour'));
    var result = currentDate.setDate(currentDate.getDate() + agendaDuration - 1) - 60000;
    return new Date(result);
  };

  _proto.getEndViewDateByEndDayHour = function getEndViewDateByEndDayHour() {
    return this.getEndViewDate();
  };

  _proto.getCoordinatesByDate = function getCoordinatesByDate() {
    return {
      top: 0,
      left: 0,
      max: 0,
      groupIndex: 0
    };
  };

  _proto.getCellDataByCoordinates = function getCellDataByCoordinates() {
    return {
      startDate: null,
      endDate: null
    };
  };

  _proto.updateScrollPosition = function updateScrollPosition(date) {
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
  };

  _proto.needUpdateScrollPosition = function needUpdateScrollPosition(hours, minutes, bounds) {
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
  };

  _createClass(SchedulerAgenda, [{
    key: "renderingStrategy",
    get: function get() {
      return this.invoke('getLayoutManager').getRenderingStrategyInstance();
    }
  }]);

  return SchedulerAgenda;
}(_uiScheduler.default);

(0, _component_registrator.default)('dxSchedulerAgenda', SchedulerAgenda);
var _default = SchedulerAgenda;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
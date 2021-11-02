"use strict";

exports.default = void 0;

var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));

var _uiScheduler = _interopRequireDefault(require("./ui.scheduler.timeline"));

var _date = _interopRequireDefault(require("../../../core/utils/date"));

var _layout = _interopRequireDefault(require("../../../renovation/ui/scheduler/workspaces/base/header_panel/layout.j"));

var _month = require("./utils/month");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TIMELINE_CLASS = 'dx-scheduler-timeline-month';
var DAY_IN_MILLISECONDS = 86400000;
var toMs = _date.default.dateToMilliseconds;

var SchedulerTimelineMonth = /*#__PURE__*/function (_SchedulerTimeline) {
  _inheritsLoose(SchedulerTimelineMonth, _SchedulerTimeline);

  function SchedulerTimelineMonth() {
    return _SchedulerTimeline.apply(this, arguments) || this;
  }

  var _proto = SchedulerTimelineMonth.prototype;

  _proto._renderView = function _renderView() {
    _SchedulerTimeline.prototype._renderView.call(this);

    this._updateScrollable();
  };

  _proto._getElementClass = function _getElementClass() {
    return TIMELINE_CLASS;
  };

  _proto._getDateHeaderTemplate = function _getDateHeaderTemplate() {
    return this.option('dateCellTemplate');
  };

  _proto._getHiddenInterval = function _getHiddenInterval() {
    return 0;
  };

  _proto._calculateDurationInCells = function _calculateDurationInCells(timeDiff) {
    return timeDiff / this.getCellDuration();
  };

  _proto.getCellDuration = function getCellDuration() {
    return toMs('day');
  };

  _proto.calculateEndViewDate = function calculateEndViewDate(dateOfLastViewCell) {
    return new Date(dateOfLastViewCell.getTime() + this._calculateDayDuration() * toMs('hour'));
  };

  _proto.isIndicatorVisible = function isIndicatorVisible() {
    return true;
  };

  _proto._getCellCount = function _getCellCount() {
    var currentDate = this.option('currentDate');
    var cellCount = 0;

    if (this._isWorkSpaceWithCount()) {
      var intervalCount = this.option('intervalCount');

      for (var i = 1; i <= intervalCount; i++) {
        cellCount += new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 0).getDate();
      }
    } else {
      cellCount = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    }

    return cellCount;
  };

  _proto._setFirstViewDate = function _setFirstViewDate() {
    this._firstViewDate = _date.default.getFirstMonthDate(this._getViewStartByOptions());

    this._setStartDayHour(this._firstViewDate);
  };

  _proto._getFormat = function _getFormat() {
    return this._formatWeekdayAndDay;
  };

  _proto._getDateByIndex = function _getDateByIndex(headerIndex) {
    var resultDate = new Date(this._firstViewDate);
    resultDate.setDate(this._firstViewDate.getDate() + headerIndex);
    return resultDate;
  };

  _proto._getInterval = function _getInterval() {
    return DAY_IN_MILLISECONDS;
  };

  _proto._getIntervalBetween = function _getIntervalBetween(currentDate) {
    var firstViewDate = this.getStartViewDate();

    var timeZoneOffset = _date.default.getTimezonesDifference(firstViewDate, currentDate);

    return currentDate.getTime() - (firstViewDate.getTime() - this.option('startDayHour') * 3600000) - timeZoneOffset;
  };

  _proto.calculateEndDate = function calculateEndDate(startDate) {
    var startDateCopy = new Date(startDate);
    return new Date(startDateCopy.setHours(this.option('endDayHour')));
  };

  _proto._calculateHiddenInterval = function _calculateHiddenInterval() {
    return 0;
  };

  _proto._getDateByCellIndexes = function _getDateByCellIndexes(rowIndex, cellIndex) {
    var date = _SchedulerTimeline.prototype._getDateByCellIndexes.call(this, rowIndex, cellIndex);

    this._setStartDayHour(date);

    return date;
  };

  _proto.getPositionShift = function getPositionShift() {
    return {
      top: 0,
      left: 0,
      cellPosition: 0
    };
  };

  _proto._getStartViewDate = function _getStartViewDate() {
    var firstMonthDate = _date.default.getFirstMonthDate(this.option('startDate'));

    return firstMonthDate;
  };

  _proto._getViewStartByOptions = function _getViewStartByOptions() {
    return (0, _month.getViewStartByOptions)(this.option('startDate'), this.option('currentDate'), this.option('intervalCount'), this._getStartViewDate());
  };

  _createClass(SchedulerTimelineMonth, [{
    key: "isDateAndTimeView",
    get: function get() {
      return false;
    }
  }, {
    key: "viewDirection",
    get: function get() {
      return 'horizontal';
    }
  }, {
    key: "renovatedHeaderPanelComponent",
    get: function get() {
      return _layout.default;
    }
  }]);

  return SchedulerTimelineMonth;
}(_uiScheduler.default);

(0, _component_registrator.default)('dxSchedulerTimelineMonth', SchedulerTimelineMonth);
var _default = SchedulerTimelineMonth;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
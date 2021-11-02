"use strict";

exports.default = void 0;

var _uiSchedulerAppointmentsStrategy = _interopRequireDefault(require("./ui.scheduler.appointments.strategy.horizontal"));

var _date = _interopRequireDefault(require("../../../core/utils/date"));

var _query = _interopRequireDefault(require("../../../data/query"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var HOURS_IN_DAY = 24;
var MINUTES_IN_HOUR = 60;
var MILLISECONDS_IN_MINUTE = 60000;
var ZERO_APPOINTMENT_DURATION_IN_DAYS = 1;

var HorizontalMonthLineRenderingStrategy = /*#__PURE__*/function (_HorizontalAppointmen) {
  _inheritsLoose(HorizontalMonthLineRenderingStrategy, _HorizontalAppointmen);

  function HorizontalMonthLineRenderingStrategy() {
    return _HorizontalAppointmen.apply(this, arguments) || this;
  }

  var _proto = HorizontalMonthLineRenderingStrategy.prototype;

  _proto.calculateAppointmentWidth = function calculateAppointmentWidth(appointment, position) {
    var startDate = _date.default.trimTime(position.info.appointment.startDate);

    var endDate = this.normalizeEndDateByViewEnd(appointment, position.info.appointment.endDate);
    var cellWidth = this.getDefaultCellWidth() || this.getAppointmentMinSize();
    var duration = Math.ceil(this._getDurationInDays(startDate, endDate));
    var width = this.cropAppointmentWidth(duration * cellWidth, cellWidth);

    if (this.instance.isVirtualScrolling()) {
      var workSpace = this.instance.getWorkSpace();
      var skippedDays = workSpace.viewDataProvider.getSkippedDaysCount(position.groupIndex, startDate, endDate, duration);
      width -= skippedDays * cellWidth;
    }

    return width;
  };

  _proto._getDurationInDays = function _getDurationInDays(startDate, endDate) {
    var adjustedDuration = this._adjustDurationByDaylightDiff(endDate.getTime() - startDate.getTime(), startDate, endDate);

    return adjustedDuration / _date.default.dateToMilliseconds('day') || ZERO_APPOINTMENT_DURATION_IN_DAYS;
  };

  _proto.getDeltaTime = function getDeltaTime(args, initialSize) {
    return HOURS_IN_DAY * MINUTES_IN_HOUR * MILLISECONDS_IN_MINUTE * this._getDeltaWidth(args, initialSize);
  };

  _proto.isAllDay = function isAllDay() {
    return false;
  };

  _proto.createTaskPositionMap = function createTaskPositionMap(items, skipSorting) {
    if (!skipSorting) {
      this.instance.getAppointmentsInstance()._sortAppointmentsByStartDate(items);
    }

    return _HorizontalAppointmen.prototype.createTaskPositionMap.call(this, items);
  };

  _proto._getSortedPositions = function _getSortedPositions(map, skipSorting) {
    var result = _HorizontalAppointmen.prototype._getSortedPositions.call(this, map);

    if (!skipSorting) {
      result = (0, _query.default)(result).sortBy('top').thenBy('left').thenBy('cellPosition').thenBy('i').toArray();
    }

    return result;
  };

  _proto.needCorrectAppointmentDates = function needCorrectAppointmentDates() {
    return false;
  };

  return HorizontalMonthLineRenderingStrategy;
}(_uiSchedulerAppointmentsStrategy.default);

var _default = HorizontalMonthLineRenderingStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
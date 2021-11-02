"use strict";

exports.default = void 0;

var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));

var _date = _interopRequireDefault(require("../../../core/utils/date"));

var _date2 = _interopRequireDefault(require("../../../localization/date"));

var _uiScheduler = _interopRequireDefault(require("./ui.scheduler.work_space_vertical"));

var _week = require("./utils/week");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var WEEK_CLASS = 'dx-scheduler-work-space-week';

var SchedulerWorkSpaceWeek = /*#__PURE__*/function (_SchedulerWorkSpaceVe) {
  _inheritsLoose(SchedulerWorkSpaceWeek, _SchedulerWorkSpaceVe);

  function SchedulerWorkSpaceWeek() {
    return _SchedulerWorkSpaceVe.apply(this, arguments) || this;
  }

  var _proto = SchedulerWorkSpaceWeek.prototype;

  _proto._getElementClass = function _getElementClass() {
    return WEEK_CLASS;
  };

  _proto._getRowCount = function _getRowCount() {
    return this._getCellCountInDay();
  };

  _proto._getCellCount = function _getCellCount() {
    return 7 * this.option('intervalCount');
  };

  _proto._getDateByIndex = function _getDateByIndex(headerIndex) {
    var resultDate = new Date(this._firstViewDate);
    resultDate.setDate(this._firstViewDate.getDate() + headerIndex);
    return resultDate;
  };

  _proto._getStartViewDate = function _getStartViewDate() {
    return _date.default.getFirstWeekDate(this.option('startDate'), this._firstDayOfWeek() || _date2.default.firstDayOfWeekIndex());
  };

  _proto._getIntervalDuration = function _getIntervalDuration() {
    return (0, _week.getIntervalDuration)(this.option('intervalCount'));
  };

  _proto.getPositionShift = function getPositionShift(timeShift, isAllDay) {
    if (!isAllDay && this.invoke('isAdaptive') && this.invoke('getMaxAppointmentCountPerCellByType') === 0) {
      return {
        top: 0,
        left: 0,
        cellPosition: 0
      };
    }

    return _SchedulerWorkSpaceVe.prototype.getPositionShift.call(this, timeShift, isAllDay);
  };

  _proto._isApplyCompactAppointmentOffset = function _isApplyCompactAppointmentOffset() {
    if (this.invoke('isAdaptive') && this.invoke('getMaxAppointmentCountPerCellByType') === 0) {
      return false;
    }

    return _SchedulerWorkSpaceVe.prototype._isApplyCompactAppointmentOffset.call(this);
  };

  return SchedulerWorkSpaceWeek;
}(_uiScheduler.default);

(0, _component_registrator.default)('dxSchedulerWorkSpaceWeek', SchedulerWorkSpaceWeek);
var _default = SchedulerWorkSpaceWeek;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
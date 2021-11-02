"use strict";

exports.default = void 0;

var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));

var _uiScheduler = _interopRequireDefault(require("./ui.scheduler.timeline_week"));

var _date = _interopRequireDefault(require("../../../core/utils/date"));

var _work_week = require("./utils/work_week");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var toMs = _date.default.dateToMilliseconds;
var TIMELINE_CLASS = 'dx-scheduler-timeline-work-week';
var LAST_DAY_WEEK_INDEX = 5;

var SchedulerTimelineWorkWeek = /*#__PURE__*/function (_SchedulerTimelineWee) {
  _inheritsLoose(SchedulerTimelineWorkWeek, _SchedulerTimelineWee);

  function SchedulerTimelineWorkWeek() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _SchedulerTimelineWee.call.apply(_SchedulerTimelineWee, [this].concat(args)) || this;
    _this._getWeekendsCount = _work_week.getWeekendsCount;
    _this._isSkippedData = _work_week.isDataOnWeekend;
    return _this;
  }

  var _proto = SchedulerTimelineWorkWeek.prototype;

  _proto._getElementClass = function _getElementClass() {
    return TIMELINE_CLASS;
  };

  _proto._getWeekDuration = function _getWeekDuration() {
    return 5;
  };

  _proto._firstDayOfWeek = function _firstDayOfWeek() {
    return (0, _work_week.getFirstDayOfWeek)(this.option('firstDayOfWeek'));
  };

  _proto._isSkippedData = function _isSkippedData() {
    return _work_week.isDataOnWeekend;
  };

  _proto._incrementDate = function _incrementDate(date) {
    var day = date.getDay();

    if (day === LAST_DAY_WEEK_INDEX) {
      date.setDate(date.getDate() + 2);
    }

    _SchedulerTimelineWee.prototype._incrementDate.call(this, date);
  };

  _proto._getOffsetByCount = function _getOffsetByCount(cellIndex) {
    var weekendCount = Math.floor(cellIndex / (5 * this._getCellCountInDay()));
    return toMs('day') * weekendCount * 2;
  };

  _proto._setFirstViewDate = function _setFirstViewDate() {
    this._firstViewDate = (0, _work_week.getFirstViewDate)(this._getViewStartByOptions(), this._firstDayOfWeek());

    this._setStartDayHour(this._firstViewDate);
  };

  return SchedulerTimelineWorkWeek;
}(_uiScheduler.default);

(0, _component_registrator.default)('dxSchedulerTimelineWorkWeek', SchedulerTimelineWorkWeek);
var _default = SchedulerTimelineWorkWeek;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
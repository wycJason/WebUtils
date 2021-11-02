"use strict";

exports.default = void 0;

var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));

var _date = _interopRequireDefault(require("../../../core/utils/date"));

var _work_week = require("./utils/work_week");

var _uiScheduler = _interopRequireDefault(require("./ui.scheduler.work_space_week"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var toMs = _date.default.dateToMilliseconds;
var WORK_WEEK_CLASS = 'dx-scheduler-work-space-work-week';
var dayIndexes = [1, 2, 3, 4, 5];
var weekCounter = 0;

var SchedulerWorkSpaceWorkWeek = /*#__PURE__*/function (_SchedulerWorkSpaceWe) {
  _inheritsLoose(SchedulerWorkSpaceWorkWeek, _SchedulerWorkSpaceWe);

  function SchedulerWorkSpaceWorkWeek() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _SchedulerWorkSpaceWe.call.apply(_SchedulerWorkSpaceWe, [this].concat(args)) || this;
    _this._isSkippedData = _work_week.isDataOnWeekend;
    _this._getWeekendsCount = _work_week.getWeekendsCount;
    return _this;
  }

  var _proto = SchedulerWorkSpaceWorkWeek.prototype;

  _proto._getElementClass = function _getElementClass() {
    return WORK_WEEK_CLASS;
  };

  _proto._getCellCount = function _getCellCount() {
    return 5 * this.option('intervalCount');
  };

  _proto._firstDayOfWeek = function _firstDayOfWeek() {
    return (0, _work_week.getFirstDayOfWeek)(this.option('firstDayOfWeek'));
  };

  _proto._getDateByIndex = function _getDateByIndex(headerIndex) {
    var resultDate = new Date(this._firstViewDate);

    if (headerIndex % this._getCellCount() === 0) {
      weekCounter = 0;
    }

    resultDate.setDate(this._firstViewDate.getDate() + headerIndex + weekCounter);
    var index = resultDate.getDay();

    while (dayIndexes.indexOf(index) === -1) {
      resultDate.setDate(resultDate.getDate() + 1);
      index = resultDate.getDay();
      weekCounter++;
    }

    return resultDate;
  };

  _proto._renderView = function _renderView() {
    weekCounter = 0;

    _SchedulerWorkSpaceWe.prototype._renderView.call(this);
  };

  _proto._setFirstViewDate = function _setFirstViewDate() {
    this._firstViewDate = (0, _work_week.getFirstViewDate)(this._getViewStartByOptions(), this._firstDayOfWeek());

    this._setStartDayHour(this._firstViewDate);
  };

  _proto._getOffsetByCount = function _getOffsetByCount(cellIndex) {
    var cellsInGroup = this._getCellCount();

    var inGroup = Math.floor(cellIndex / cellsInGroup);
    cellIndex = cellIndex - cellsInGroup * inGroup;
    var weekendCount = Math.floor(cellIndex / 5);
    return toMs('day') * weekendCount * 2;
  };

  return SchedulerWorkSpaceWorkWeek;
}(_uiScheduler.default);

(0, _component_registrator.default)('dxSchedulerWorkSpaceWorkWeek', SchedulerWorkSpaceWorkWeek);
var _default = SchedulerWorkSpaceWorkWeek;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
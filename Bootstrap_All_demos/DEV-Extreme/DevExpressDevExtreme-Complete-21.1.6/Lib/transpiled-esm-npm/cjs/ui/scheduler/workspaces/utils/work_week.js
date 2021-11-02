"use strict";

exports.getFirstViewDate = exports.getWeekendsCount = exports.getFirstDayOfWeek = exports.isDataOnWeekend = void 0;

var _date = _interopRequireDefault(require("../../../../core/utils/date"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MONDAY_INDEX = 1;
var SATURDAY_INDEX = 6;
var SUNDAY_INDEX = 0;

var isDataOnWeekend = function isDataOnWeekend(date) {
  var day = date.getDay();
  return day === SATURDAY_INDEX || day === SUNDAY_INDEX;
};

exports.isDataOnWeekend = isDataOnWeekend;

var getFirstDayOfWeek = function getFirstDayOfWeek(firstDayOfWeekOption) {
  return firstDayOfWeekOption || MONDAY_INDEX;
};

exports.getFirstDayOfWeek = getFirstDayOfWeek;

var getWeekendsCount = function getWeekendsCount(days) {
  return 2 * Math.floor(days / 7);
};

exports.getWeekendsCount = getWeekendsCount;

var getFirstViewDate = function getFirstViewDate(viewStart, firstDayOfWeek) {
  var firstViewDate = _date.default.getFirstWeekDate(viewStart, firstDayOfWeek);

  return _date.default.normalizeDateByWeek(firstViewDate, viewStart);
};

exports.getFirstViewDate = getFirstViewDate;
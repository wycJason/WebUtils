import dateUtils from '../../../../core/utils/date';
var MONDAY_INDEX = 1;
var SATURDAY_INDEX = 6;
var SUNDAY_INDEX = 0;
export var isDataOnWeekend = date => {
  var day = date.getDay();
  return day === SATURDAY_INDEX || day === SUNDAY_INDEX;
};
export var getFirstDayOfWeek = firstDayOfWeekOption => {
  return firstDayOfWeekOption || MONDAY_INDEX;
};
export var getWeekendsCount = days => {
  return 2 * Math.floor(days / 7);
};
export var getFirstViewDate = (viewStart, firstDayOfWeek) => {
  var firstViewDate = dateUtils.getFirstWeekDate(viewStart, firstDayOfWeek);
  return dateUtils.normalizeDateByWeek(firstViewDate, viewStart);
};
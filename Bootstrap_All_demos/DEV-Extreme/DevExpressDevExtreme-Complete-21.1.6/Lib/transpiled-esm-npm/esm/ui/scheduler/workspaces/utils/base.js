import dateUtils from '../../../../core/utils/date';
export var isDateInRange = (date, startDate, endDate, diff) => {
  return diff > 0 ? dateUtils.dateInRange(date, startDate, new Date(endDate.getTime() - 1)) : dateUtils.dateInRange(date, endDate, startDate, 'date');
};
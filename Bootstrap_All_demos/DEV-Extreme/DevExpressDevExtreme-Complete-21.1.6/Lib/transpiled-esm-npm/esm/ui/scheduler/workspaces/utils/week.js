import dateUtils from '../../../../core/utils/date';
export var getIntervalDuration = intervalCount => {
  return dateUtils.dateToMilliseconds('day') * 7 * intervalCount;
};
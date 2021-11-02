"use strict";

exports.getIntervalDuration = void 0;

var _date = _interopRequireDefault(require("../../../../core/utils/date"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getIntervalDuration = function getIntervalDuration(intervalCount) {
  return _date.default.dateToMilliseconds('day') * 7 * intervalCount;
};

exports.getIntervalDuration = getIntervalDuration;
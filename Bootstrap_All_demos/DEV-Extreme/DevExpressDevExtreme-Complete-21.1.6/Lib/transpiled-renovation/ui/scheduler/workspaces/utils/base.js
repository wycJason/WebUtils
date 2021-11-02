"use strict";

exports.isDateInRange = void 0;

var _date = _interopRequireDefault(require("../../../../core/utils/date"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isDateInRange = function isDateInRange(date, startDate, endDate, diff) {
  return diff > 0 ? _date.default.dateInRange(date, startDate, new Date(endDate.getTime() - 1)) : _date.default.dateInRange(date, endDate, startDate, 'date');
};

exports.isDateInRange = isDateInRange;
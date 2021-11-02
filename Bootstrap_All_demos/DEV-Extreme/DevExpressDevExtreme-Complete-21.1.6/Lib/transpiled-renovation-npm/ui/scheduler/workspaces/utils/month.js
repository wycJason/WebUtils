"use strict";

exports.getViewStartByOptions = void 0;

var _base = require("./base");

var getViewStartByOptions = function getViewStartByOptions(startDate, currentDate, intervalCount, startViewDate) {
  if (!startDate) {
    return new Date(currentDate);
  } else {
    var _startDate = new Date(startViewDate);

    var validStartViewDate = new Date(startViewDate);
    var diff = _startDate.getTime() <= currentDate.getTime() ? 1 : -1;
    var endDate = new Date(new Date(validStartViewDate.setMonth(validStartViewDate.getMonth() + diff * intervalCount)));

    while (!(0, _base.isDateInRange)(currentDate, _startDate, endDate, diff)) {
      _startDate = new Date(endDate);

      if (diff > 0) {
        _startDate.setDate(1);
      }

      endDate = new Date(new Date(endDate.setMonth(endDate.getMonth() + diff * intervalCount)));
    }

    return diff > 0 ? _startDate : endDate;
  }
};

exports.getViewStartByOptions = getViewStartByOptions;
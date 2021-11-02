"use strict";

exports.TimeZoneCalculator = exports.PathTimeZoneConversion = void 0;

var _type = require("../../core/utils/type");

var _date = _interopRequireDefault(require("../../core/utils/date"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toMs = _date.default.dateToMilliseconds;
var PathTimeZoneConversion = {
  fromSourceToAppointment: 'toAppointment',
  fromAppointmentToSource: 'fromAppointment',
  fromSourceToGrid: 'toGrid',
  fromGridToSource: 'fromGrid'
};
exports.PathTimeZoneConversion = PathTimeZoneConversion;

var TimeZoneCalculator = /*#__PURE__*/function () {
  function TimeZoneCalculator(options) {
    this.options = options;
  }

  var _proto = TimeZoneCalculator.prototype;

  _proto.createDate = function createDate(sourceDate, info) {
    var date = new Date(sourceDate);

    switch (info.path) {
      case PathTimeZoneConversion.fromSourceToAppointment:
        return this._getConvertedDate(date, info.appointmentTimeZone, true);

      case PathTimeZoneConversion.fromAppointmentToSource:
        return this._getConvertedDate(date, info.appointmentTimeZone, true, true);

      case PathTimeZoneConversion.fromSourceToGrid:
        return this._getConvertedDate(date, info.appointmentTimeZone, false);

      case PathTimeZoneConversion.fromGridToSource:
        return this._getConvertedDate(date, info.appointmentTimeZone, false, true);
    }

    throw new Error('not specified pathTimeZoneConversion');
  };

  _proto.getOffsets = function getOffsets(date, appointmentTimezone) {
    var clientOffset = -this._getClientOffset(date) / toMs('hour');

    var commonOffset = this._getCommonOffset(date);

    var appointmentOffset = this._getAppointmentOffset(date, appointmentTimezone);

    return {
      client: clientOffset,
      common: !(0, _type.isDefined)(commonOffset) ? clientOffset : commonOffset,
      appointment: typeof appointmentOffset !== 'number' ? clientOffset : appointmentOffset
    };
  };

  _proto._getClientOffset = function _getClientOffset(date) {
    return this.options.getClientOffset(date);
  };

  _proto._getCommonOffset = function _getCommonOffset(date) {
    return this.options.getCommonOffset(date);
  };

  _proto._getAppointmentOffset = function _getAppointmentOffset(date, appointmentTimezone) {
    return this.options.getAppointmentOffset(date, appointmentTimezone);
  };

  _proto._getConvertedDate = function _getConvertedDate(date, appointmentTimezone, useAppointmentTimeZone, isBack) {
    var newDate = new Date(date.getTime());
    var offsets = this.getOffsets(newDate, appointmentTimezone);

    if (useAppointmentTimeZone && !!appointmentTimezone) {
      return this._getConvertedDateByOffsets(date, offsets.client, offsets.appointment, isBack);
    }

    return this._getConvertedDateByOffsets(date, offsets.client, offsets.common, isBack);
  };

  _proto._getConvertedDateByOffsets = function _getConvertedDateByOffsets(date, clientOffset, targetOffset, isBack) {
    var direction = isBack ? -1 : 1;
    var utcDate = date.getTime() - direction * clientOffset * toMs('hour');
    return new Date(utcDate + direction * targetOffset * toMs('hour'));
  };

  return TimeZoneCalculator;
}();

exports.TimeZoneCalculator = TimeZoneCalculator;
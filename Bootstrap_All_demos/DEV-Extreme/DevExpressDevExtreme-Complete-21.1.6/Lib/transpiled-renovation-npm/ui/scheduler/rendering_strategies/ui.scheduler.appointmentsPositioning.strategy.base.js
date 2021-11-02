"use strict";

exports.default = void 0;

var _type = require("../../../core/utils/type");

var COLLECTOR_DEFAULT_WIDTH = 24;
var COLLECTOR_DEFAULT_OFFSET = 3;
var COMPACT_THEME_APPOINTMENT_DEFAULT_OFFSET = 22;
var APPOINTMENT_MIN_COUNT = 1;
var APPOINTMENT_DEFAULT_WIDTH = 40;
var COLLECTOR_WIDTH_IN_PERCENTS = 75;
var APPOINTMENT_INCREASED_WIDTH = 50;

var AppointmentPositioningStrategy = /*#__PURE__*/function () {
  function AppointmentPositioningStrategy(renderingStrategy) {
    this._renderingStrategy = renderingStrategy;
  }

  var _proto = AppointmentPositioningStrategy.prototype;

  _proto.getRenderingStrategy = function getRenderingStrategy() {
    return this._renderingStrategy;
  };

  _proto.getDropDownAppointmentWidth = function getDropDownAppointmentWidth(intervalCount, isAllDay) {
    if (isAllDay || !(0, _type.isDefined)(isAllDay)) {
      return COLLECTOR_WIDTH_IN_PERCENTS * this.getRenderingStrategy().getDefaultCellWidth() / 100;
    } else {
      return COLLECTOR_DEFAULT_WIDTH;
    }
  };

  _proto.getCollectorTopOffset = function getCollectorTopOffset() {
    return COLLECTOR_DEFAULT_OFFSET;
  };

  _proto.getCollectorLeftOffset = function getCollectorLeftOffset() {
    return COLLECTOR_DEFAULT_OFFSET;
  };

  _proto.getAppointmentDefaultOffset = function getAppointmentDefaultOffset() {
    if (this.getRenderingStrategy()._isCompactTheme()) {
      return COMPACT_THEME_APPOINTMENT_DEFAULT_OFFSET;
    }

    return this.getRenderingStrategy().instance.option('_appointmentOffset');
  };

  _proto.getDynamicAppointmentCountPerCell = function getDynamicAppointmentCountPerCell() {
    var renderingStrategy = this.getRenderingStrategy();
    var cellHeight = renderingStrategy.instance.fire('getCellHeight');

    var allDayCount = Math.floor((cellHeight - renderingStrategy._getAppointmentDefaultOffset()) / renderingStrategy._getAppointmentDefaultHeight()) || this._getAppointmentMinCount(); // NOTE: Simplify using only object


    if (renderingStrategy.hasAllDayAppointments()) {
      return {
        allDay: renderingStrategy.instance._groupOrientation === 'vertical' ? allDayCount : renderingStrategy.instance.option('_appointmentCountPerCell'),
        simple: this._calculateDynamicAppointmentCountPerCell() || this._getAppointmentMinCount()
      };
    } else {
      return allDayCount;
    }
  };

  _proto.getDropDownAppointmentHeight = function getDropDownAppointmentHeight() {
    return undefined;
  };

  _proto._getAppointmentMinCount = function _getAppointmentMinCount() {
    return APPOINTMENT_MIN_COUNT;
  };

  _proto._calculateDynamicAppointmentCountPerCell = function _calculateDynamicAppointmentCountPerCell() {
    return Math.floor(this.getRenderingStrategy()._getAppointmentMaxWidth() / APPOINTMENT_INCREASED_WIDTH);
  };

  _proto._getAppointmentDefaultWidth = function _getAppointmentDefaultWidth() {
    return APPOINTMENT_DEFAULT_WIDTH;
  };

  return AppointmentPositioningStrategy;
}();

var _default = AppointmentPositioningStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
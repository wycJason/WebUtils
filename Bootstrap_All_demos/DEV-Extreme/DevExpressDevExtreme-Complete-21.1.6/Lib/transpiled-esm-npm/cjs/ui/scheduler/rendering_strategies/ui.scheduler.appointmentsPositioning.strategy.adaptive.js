"use strict";

exports.default = void 0;

var _uiSchedulerAppointmentsPositioningStrategy = _interopRequireDefault(require("./ui.scheduler.appointmentsPositioning.strategy.base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var COLLECTOR_ADAPTIVE_SIZE = 28;
var COLLECTOR_ADAPTIVE_BOTTOM_OFFSET = 40;
var ADAPTIVE_APPOINTMENT_DEFAULT_OFFSET = 35;
var ADAPTIVE_APPOINTMENT_DEFAULT_WIDTH = 30;

var AdaptivePositioningStrategy = /*#__PURE__*/function (_BasePositioningStrat) {
  _inheritsLoose(AdaptivePositioningStrategy, _BasePositioningStrat);

  function AdaptivePositioningStrategy() {
    return _BasePositioningStrat.apply(this, arguments) || this;
  }

  var _proto = AdaptivePositioningStrategy.prototype;

  _proto.getDropDownAppointmentWidth = function getDropDownAppointmentWidth(intervalCount, isAllDay) {
    return this.getDropDownButtonAdaptiveSize();
  };

  _proto.getDropDownButtonAdaptiveSize = function getDropDownButtonAdaptiveSize() {
    return COLLECTOR_ADAPTIVE_SIZE;
  };

  _proto.getCollectorTopOffset = function getCollectorTopOffset(allDay) {
    var renderingStrategy = this.getRenderingStrategy();

    if (renderingStrategy.hasAllDayAppointments() && allDay) {
      return (renderingStrategy.getDefaultAllDayCellHeight() - renderingStrategy.getDropDownButtonAdaptiveSize()) / 2;
    } else {
      return this.getRenderingStrategy().getDefaultCellHeight() - COLLECTOR_ADAPTIVE_BOTTOM_OFFSET;
    }
  };

  _proto.getCollectorLeftOffset = function getCollectorLeftOffset() {
    var collectorWidth = this.getRenderingStrategy().getDropDownAppointmentWidth();
    return (this.getRenderingStrategy().getDefaultCellWidth() - collectorWidth) / 2;
  };

  _proto.getAppointmentDefaultOffset = function getAppointmentDefaultOffset() {
    return ADAPTIVE_APPOINTMENT_DEFAULT_OFFSET;
  };

  _proto.getDynamicAppointmentCountPerCell = function getDynamicAppointmentCountPerCell() {
    var renderingStrategy = this.getRenderingStrategy();

    if (renderingStrategy.hasAllDayAppointments()) {
      return {
        allDay: 0,
        simple: this._calculateDynamicAppointmentCountPerCell() || this._getAppointmentMinCount()
      };
    } else {
      return 0;
    }
  };

  _proto.getDropDownAppointmentHeight = function getDropDownAppointmentHeight() {
    return COLLECTOR_ADAPTIVE_SIZE;
  };

  _proto._getAppointmentMinCount = function _getAppointmentMinCount() {
    return 0;
  };

  _proto._getAppointmentDefaultWidth = function _getAppointmentDefaultWidth() {
    var renderingStrategy = this.getRenderingStrategy();

    if (renderingStrategy.hasAllDayAppointments()) {
      return ADAPTIVE_APPOINTMENT_DEFAULT_WIDTH;
    }

    return _BasePositioningStrat.prototype._getAppointmentDefaultWidth.call(this);
  };

  _proto._calculateDynamicAppointmentCountPerCell = function _calculateDynamicAppointmentCountPerCell() {
    return Math.floor(this.getRenderingStrategy()._getAppointmentMaxWidth() / this.getRenderingStrategy()._getAppointmentDefaultWidth());
  };

  return AdaptivePositioningStrategy;
}(_uiSchedulerAppointmentsPositioningStrategy.default);

var _default = AdaptivePositioningStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
import { isDefined } from '../../../core/utils/type';
var COLLECTOR_DEFAULT_WIDTH = 24;
var COLLECTOR_DEFAULT_OFFSET = 3;
var COMPACT_THEME_APPOINTMENT_DEFAULT_OFFSET = 22;
var APPOINTMENT_MIN_COUNT = 1;
var APPOINTMENT_DEFAULT_WIDTH = 40;
var COLLECTOR_WIDTH_IN_PERCENTS = 75;
var APPOINTMENT_INCREASED_WIDTH = 50;

class AppointmentPositioningStrategy {
  constructor(renderingStrategy) {
    this._renderingStrategy = renderingStrategy;
  }

  getRenderingStrategy() {
    return this._renderingStrategy;
  }

  getDropDownAppointmentWidth(intervalCount, isAllDay) {
    if (isAllDay || !isDefined(isAllDay)) {
      return COLLECTOR_WIDTH_IN_PERCENTS * this.getRenderingStrategy().getDefaultCellWidth() / 100;
    } else {
      return COLLECTOR_DEFAULT_WIDTH;
    }
  }

  getCollectorTopOffset() {
    return COLLECTOR_DEFAULT_OFFSET;
  }

  getCollectorLeftOffset() {
    return COLLECTOR_DEFAULT_OFFSET;
  }

  getAppointmentDefaultOffset() {
    if (this.getRenderingStrategy()._isCompactTheme()) {
      return COMPACT_THEME_APPOINTMENT_DEFAULT_OFFSET;
    }

    return this.getRenderingStrategy().instance.option('_appointmentOffset');
  }

  getDynamicAppointmentCountPerCell() {
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
  }

  getDropDownAppointmentHeight() {
    return undefined;
  }

  _getAppointmentMinCount() {
    return APPOINTMENT_MIN_COUNT;
  }

  _calculateDynamicAppointmentCountPerCell() {
    return Math.floor(this.getRenderingStrategy()._getAppointmentMaxWidth() / APPOINTMENT_INCREASED_WIDTH);
  }

  _getAppointmentDefaultWidth() {
    return APPOINTMENT_DEFAULT_WIDTH;
  }

}

export default AppointmentPositioningStrategy;
import BaseAppointmentsStrategy from './ui.scheduler.appointments.strategy.base';
import dateUtils from '../../../core/utils/date';
var DEFAULT_APPOINTMENT_HEIGHT = 60;
var MIN_APPOINTMENT_HEIGHT = 35;
var DROP_DOWN_BUTTON_OFFSET = 2;
var toMs = dateUtils.dateToMilliseconds;

class HorizontalRenderingStrategy extends BaseAppointmentsStrategy {
  _needVerifyItemSize() {
    return true;
  }

  calculateAppointmentWidth(appointment, position) {
    var cellWidth = this.getDefaultCellWidth() || this.getAppointmentMinSize();
    var allDay = this.instance.fire('getField', 'allDay', appointment);
    var startDate = position.info.appointment.startDate;
    var endDate = this.normalizeEndDateByViewEnd(appointment, position.info.appointment.endDate);

    var appointmentDuration = this._getAppointmentDurationInMs(startDate, endDate, allDay);

    appointmentDuration = this._adjustDurationByDaylightDiff(appointmentDuration, startDate, endDate);
    var cellDuration = this.instance.getAppointmentDurationInMinutes() * toMs('minute');
    var durationInCells = appointmentDuration / cellDuration;
    var width = this.cropAppointmentWidth(durationInCells * cellWidth, cellWidth);
    return width;
  }

  _needAdjustDuration(diff) {
    return diff < 0;
  }

  getAppointmentGeometry(coordinates) {
    var result = this._customizeAppointmentGeometry(coordinates);

    return super.getAppointmentGeometry(result);
  }

  _customizeAppointmentGeometry(coordinates) {
    var config = this._calculateGeometryConfig(coordinates);

    return this._customizeCoordinates(coordinates, config.height, config.appointmentCountPerCell, config.offset);
  }

  _getOffsets() {
    return {
      unlimited: 0,
      auto: 0
    };
  }

  _getCompactLeftCoordinate(itemLeft, index) {
    var cellWidth = this.getDefaultCellWidth() || this.getAppointmentMinSize();
    return itemLeft + cellWidth * index;
  }

  _getMaxHeight() {
    return this.getDefaultCellHeight() || this.getAppointmentMinSize();
  }

  _getAppointmentCount(overlappingMode, coordinates) {
    return this._getMaxAppointmentCountPerCellByType(false);
  }

  _getAppointmentDefaultHeight() {
    return DEFAULT_APPOINTMENT_HEIGHT;
  }

  _getAppointmentMinHeight() {
    return MIN_APPOINTMENT_HEIGHT;
  }

  _sortCondition(a, b) {
    return this._columnCondition(a, b);
  }

  _getOrientation() {
    return ['left', 'right', 'top'];
  }

  _getMaxAppointmentWidth(startDate) {
    return this.instance.fire('getMaxAppointmentWidth', {
      date: startDate
    });
  }

  getDropDownAppointmentWidth() {
    return this.getDefaultCellWidth() - DROP_DOWN_BUTTON_OFFSET * 2;
  }

  getDeltaTime(args, initialSize) {
    var deltaTime = 0;
    var deltaWidth = args.width - initialSize.width;
    deltaTime = toMs('minute') * Math.round(deltaWidth / this.getDefaultCellWidth() * this.instance.getAppointmentDurationInMinutes());
    return deltaTime;
  }

  isAllDay(appointmentData) {
    return this.instance.fire('getField', 'allDay', appointmentData);
  }

  needSeparateAppointment() {
    return this.instance.fire('isGroupedByDate');
  }

  _isItemsCross(firstItem, secondItem) {
    var orientation = this._getOrientation();

    return this._checkItemsCrossing(firstItem, secondItem, orientation);
  }

}

export default HorizontalRenderingStrategy;
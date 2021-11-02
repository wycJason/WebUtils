import _extends from "@babel/runtime/helpers/esm/extends";
import HorizontalMonthLineAppointmentsStrategy from './ui.scheduler.appointments.strategy.horizontal_month_line';
var MONTH_APPOINTMENT_HEIGHT_RATIO = 0.6;
var MONTH_APPOINTMENT_MIN_OFFSET = 26;
var MONTH_APPOINTMENT_MAX_OFFSET = 30;
var MONTH_DROPDOWN_APPOINTMENT_MIN_RIGHT_OFFSET = 36;
var MONTH_DROPDOWN_APPOINTMENT_MAX_RIGHT_OFFSET = 60;

class HorizontalMonthRenderingStrategy extends HorizontalMonthLineAppointmentsStrategy {
  _getLeftPosition(settings) {
    var fullWeekAppointmentWidth = this._getFullWeekAppointmentWidth(settings.groupIndex);

    var result = this._calculateMultiWeekAppointmentLeftOffset(settings.hMax, fullWeekAppointmentWidth);

    if (this.instance._groupOrientation === 'vertical') {
      result += this.instance.fire('getWorkSpaceDateTableOffset');
    }

    return result;
  }

  _getChunkCount(fullChunksWidth, firstChunkWidth, weekWidth) {
    var rawFullChunksWidth = fullChunksWidth - firstChunkWidth + weekWidth;
    return Math.ceil(rawFullChunksWidth / weekWidth);
  }

  _getChunkWidths(geometry) {
    var firstChunkWidth = geometry.reducedWidth;
    var fullChunksWidth = Math.floor(geometry.sourceAppointmentWidth);
    var widthWithoutFirstChunk = fullChunksWidth - firstChunkWidth;
    return [firstChunkWidth, fullChunksWidth, widthWithoutFirstChunk];
  }

  _getTailChunkSettings(withoutFirstChunkWidth, weekWidth, leftPosition) {
    var tailChunkWidth = withoutFirstChunkWidth % weekWidth || weekWidth;
    var rtlPosition = leftPosition + (weekWidth - tailChunkWidth);
    var tailChunkLeftPosition = this._isRtl() ? rtlPosition : leftPosition;
    return [tailChunkWidth, tailChunkLeftPosition];
  }

  _getAppointmentParts(geometry, settings) {
    var result = [];
    var weekWidth = Math.round(this._getFullWeekAppointmentWidth(settings.groupIndex));

    var [firstChunkWidth, fullChunksWidth, withoutFirstChunkWidth] = this._getChunkWidths(geometry, settings, weekWidth);

    var leftPosition = this._getLeftPosition(settings);

    var hasTailChunk = this.instance.fire('getEndViewDate') > settings.info.appointment.endDate;

    var chunkCount = this._getChunkCount(fullChunksWidth, firstChunkWidth, weekWidth);

    var [tailChunkWidth, tailChunkLeftPosition] = this._getTailChunkSettings(withoutFirstChunkWidth, weekWidth, leftPosition);

    for (var chunkIndex = 1; chunkIndex < chunkCount; chunkIndex++) {
      var topPosition = settings.top + this.getDefaultCellHeight() * chunkIndex;
      var isTailChunk = hasTailChunk && chunkIndex === chunkCount - 1;
      result.push(_extends({}, settings, {
        top: topPosition,
        left: isTailChunk ? tailChunkLeftPosition : leftPosition,
        height: geometry.height,
        width: isTailChunk ? tailChunkWidth : weekWidth,
        appointmentReduced: isTailChunk ? 'tail' : 'body',
        rowIndex: ++settings.rowIndex,
        cellIndex: 0
      }));
    }

    return result;
  }

  _calculateMultiWeekAppointmentLeftOffset(max, width) {
    return this._isRtl() ? max : max - width;
  }

  _getFullWeekAppointmentWidth(groupIndex) {
    this._maxFullWeekAppointmentWidth = this.instance.fire('getFullWeekAppointmentWidth', {
      groupIndex: groupIndex
    });
    return this._maxFullWeekAppointmentWidth;
  }

  _getAppointmentDefaultHeight() {
    return this._getAppointmentHeightByTheme();
  }

  _getAppointmentMinHeight() {
    return this._getAppointmentDefaultHeight();
  }

  _columnCondition(a, b) {
    var conditions = this._getConditions(a, b);

    return conditions.rowCondition || conditions.columnCondition || conditions.cellPositionCondition;
  }

  createTaskPositionMap(items) {
    return super.createTaskPositionMap(items, true);
  }

  _getSortedPositions(map) {
    return super._getSortedPositions(map, true);
  }

  _getDefaultRatio() {
    return MONTH_APPOINTMENT_HEIGHT_RATIO;
  }

  _getOffsets() {
    return {
      unlimited: MONTH_APPOINTMENT_MIN_OFFSET,
      auto: MONTH_APPOINTMENT_MAX_OFFSET
    };
  }

  getDropDownAppointmentWidth(intervalCount) {
    if (this.instance.fire('isAdaptive')) {
      return this.getDropDownButtonAdaptiveSize();
    }

    var offset = intervalCount > 1 ? MONTH_DROPDOWN_APPOINTMENT_MAX_RIGHT_OFFSET : MONTH_DROPDOWN_APPOINTMENT_MIN_RIGHT_OFFSET;
    return this.getDefaultCellWidth() - offset;
  }

  needCorrectAppointmentDates() {
    return false;
  }

  _needVerticalGroupBounds() {
    return false;
  }

  _needHorizontalGroupBounds() {
    return true;
  }

}

export default HorizontalMonthRenderingStrategy;
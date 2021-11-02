import _extends from "@babel/runtime/helpers/esm/extends";
import dateUtils from '../../core/utils/date';
import { isEmptyObject } from '../../core/utils/type';
import { extend } from '../../core/utils/extend';
import { getRecurrenceProcessor } from './recurrence';
import timeZoneUtils from './utils.timeZone.js';
var toMs = dateUtils.dateToMilliseconds;
export class AppointmentSettingsGenerator {
  constructor(scheduler) {
    this.scheduler = scheduler;
    this.settingsStrategy = this.scheduler.isVirtualScrolling() ? new AppointmentSettingsGeneratorVirtualStrategy(this.scheduler) : new AppointmentSettingsGeneratorBaseStrategy(this.scheduler);
  }

  create(rawAppointment) {
    return this.settingsStrategy.create(rawAppointment);
  }

}
export class AppointmentSettingsGeneratorBaseStrategy {
  constructor(scheduler) {
    this.scheduler = scheduler;
  }

  get timeZoneCalculator() {
    return this.scheduler.timeZoneCalculator;
  }

  get workspace() {
    return this.scheduler.getWorkSpace();
  }

  get viewDataProvider() {
    return this.workspace.viewDataProvider;
  }

  create(rawAppointment) {
    var {
      scheduler
    } = this;
    var appointment = scheduler.createAppointmentAdapter(rawAppointment);

    var itemResources = scheduler._resourcesManager.getResourcesFromItem(rawAppointment);

    var isAllDay = this._isAllDayAppointment(rawAppointment);

    var appointmentList = this._createAppointments(appointment, itemResources);

    appointmentList = this._getProcessedByAppointmentTimeZone(appointmentList, appointment); // T983264

    if (this._canProcessNotNativeTimezoneDates(appointment)) {
      appointmentList = this._getProcessedNotNativeTimezoneDates(appointmentList, appointment);
    }

    var gridAppointmentList = this._createGridAppointmentList(appointmentList, appointment);

    gridAppointmentList = this._cropAppointmentsByStartDayHour(gridAppointmentList, rawAppointment, isAllDay);
    gridAppointmentList = this._getProcessedLongAppointmentsIfRequired(gridAppointmentList, appointment);
    var appointmentInfos = this.createAppointmentInfos(gridAppointmentList, itemResources, isAllDay, appointment.isRecurrent);
    return appointmentInfos;
  }

  _getProcessedByAppointmentTimeZone(appointmentList, appointment) {
    var hasAppointmentTimeZone = !isEmptyObject(appointment.startDateTimeZone) || !isEmptyObject(appointment.endDateTimeZone);

    if (appointmentList.length > 1 && hasAppointmentTimeZone) {
      var appointmentOffsets = {
        startDate: this.timeZoneCalculator.getOffsets(appointment.startDate, appointment.startDateTimeZone),
        endDate: this.timeZoneCalculator.getOffsets(appointment.endDate, appointment.endDateTimeZone)
      };
      appointmentList.forEach(a => {
        var sourceOffsets = {
          startDate: this.timeZoneCalculator.getOffsets(a.startDate, appointment.startDateTimeZone),
          endDate: this.timeZoneCalculator.getOffsets(a.endDate, appointment.endDateTimeZone)
        };
        var startDateOffsetDiff = appointmentOffsets.startDate.appointment - sourceOffsets.startDate.appointment;
        var endDateOffsetDiff = appointmentOffsets.endDate.appointment - sourceOffsets.endDate.appointment;

        if (sourceOffsets.startDate.appointment !== sourceOffsets.startDate.common) {
          a.startDate = new Date(a.startDate.getTime() + startDateOffsetDiff * toMs('hour'));
        }

        if (sourceOffsets.endDate.appointment !== sourceOffsets.endDate.common) {
          a.endDate = new Date(a.endDate.getTime() + endDateOffsetDiff * toMs('hour'));
        }
      });
    }

    return appointmentList;
  }

  _isAllDayAppointment(rawAppointment) {
    return this.scheduler.appointmentTakesAllDay(rawAppointment) && this.workspace.supportAllDayRow();
  }

  _createAppointments(appointment, resources) {
    var appointments = this._createRecurrenceAppointments(appointment, resources);

    if (!appointment.isRecurrent && appointments.length === 0) {
      appointments.push({
        startDate: appointment.startDate,
        endDate: appointment.endDate
      });
    } // T817857


    appointments = appointments.map(item => {
      var _item$endDate;

      var resultEndTime = (_item$endDate = item.endDate) === null || _item$endDate === void 0 ? void 0 : _item$endDate.getTime();

      if (item.startDate.getTime() === resultEndTime) {
        item.endDate.setTime(resultEndTime + toMs('minute'));
      }

      return _extends({}, item, {
        exceptionDate: new Date(item.startDate)
      });
    });
    return appointments;
  }

  _canProcessNotNativeTimezoneDates(appointment) {
    var timeZoneName = this.scheduler.option('timeZone');
    var isTimeZoneSet = !isEmptyObject(timeZoneName);

    if (!isTimeZoneSet) {
      return false;
    }

    if (!appointment.isRecurrent) {
      return false;
    }

    return !timeZoneUtils.isEqualLocalTimeZone(timeZoneName, appointment.startDate);
  }

  _getProcessedNotNativeDateIfCrossDST(date, offset) {
    if (offset < 0) {
      // summer time
      var newDate = new Date(date);
      var newDateMinusOneHour = new Date(newDate);
      newDateMinusOneHour.setHours(newDateMinusOneHour.getHours() - 1);
      var newDateOffset = this.timeZoneCalculator.getOffsets(newDate).common;
      var newDateMinusOneHourOffset = this.timeZoneCalculator.getOffsets(newDateMinusOneHour).common;

      if (newDateOffset !== newDateMinusOneHourOffset) {
        return 0;
      }
    }

    return offset;
  }

  _getCommonOffset(date) {
    return this.timeZoneCalculator.getOffsets(date).common;
  }

  _getProcessedNotNativeTimezoneDates(appointmentList, appointment) {
    return appointmentList.map(item => {
      var diffStartDateOffset = this._getCommonOffset(appointment.startDate) - this._getCommonOffset(item.startDate);

      var diffEndDateOffset = this._getCommonOffset(appointment.endDate) - this._getCommonOffset(item.endDate);

      if (diffStartDateOffset === 0 && diffEndDateOffset === 0) {
        return item;
      }

      diffStartDateOffset = this._getProcessedNotNativeDateIfCrossDST(item.startDate, diffStartDateOffset);
      diffEndDateOffset = this._getProcessedNotNativeDateIfCrossDST(item.endDate, diffEndDateOffset);
      var newStartDate = new Date(item.startDate.getTime() + diffStartDateOffset * toMs('hour'));
      var newEndDate = new Date(item.endDate.getTime() + diffEndDateOffset * toMs('hour'));
      var testNewStartDate = this.timeZoneCalculator.createDate(newStartDate, {
        path: 'toGrid'
      });
      var testNewEndDate = this.timeZoneCalculator.createDate(newEndDate, {
        path: 'toGrid'
      });

      if (appointment.duration > testNewEndDate.getTime() - testNewStartDate.getTime()) {
        newEndDate = new Date(newStartDate.getTime() + appointment.duration);
      }

      return _extends({}, item, {
        startDate: newStartDate,
        endDate: newEndDate,
        exceptionDate: new Date(newStartDate)
      });
    });
  }

  _getProcessedLongAppointmentsIfRequired(gridAppointmentList, appointment) {
    var rawAppointment = appointment.source();
    var allDay = this.scheduler.appointmentTakesAllDay(rawAppointment);
    var dateRange = this.workspace.getDateRange();
    var renderingStrategy = this.scheduler.getLayoutManager().getRenderingStrategyInstance();

    if (renderingStrategy.needSeparateAppointment(allDay)) {
      var longStartDateParts = [];
      var resultDates = [];
      gridAppointmentList.forEach(gridAppointment => {
        var maxDate = new Date(dateRange[1]);
        var endDateOfPart = renderingStrategy.normalizeEndDateByViewEnd(rawAppointment, gridAppointment.endDate);
        longStartDateParts = dateUtils.getDatesOfInterval(gridAppointment.startDate, endDateOfPart, {
          milliseconds: this.scheduler.getWorkSpace().getIntervalDuration(allDay)
        });
        var list = longStartDateParts.filter(startDatePart => new Date(startDatePart) < maxDate).map(date => {
          return {
            startDate: date,
            endDate: new Date(new Date(date).setMilliseconds(appointment.duration)),
            source: gridAppointment.source
          };
        });
        resultDates = resultDates.concat(list);
      });
      gridAppointmentList = resultDates;
    }

    return gridAppointmentList;
  }

  _createGridAppointmentList(appointmentList, appointment) {
    return appointmentList.map(source => {
      var offsetDifference = appointment.startDate.getTimezoneOffset() - source.startDate.getTimezoneOffset();

      if (offsetDifference !== 0 && this._canProcessNotNativeTimezoneDates(appointment)) {
        source.startDate = new Date(source.startDate.getTime() + offsetDifference * toMs('minute'));
        source.endDate = new Date(source.endDate.getTime() + offsetDifference * toMs('minute'));
        source.exceptionDate = new Date(source.startDate);
      }

      var startDate = this.timeZoneCalculator.createDate(source.startDate, {
        path: 'toGrid'
      });
      var endDate = this.timeZoneCalculator.createDate(source.endDate, {
        path: 'toGrid'
      });
      return {
        startDate,
        endDate,
        source // TODO

      };
    });
  }

  _createExtremeRecurrenceDates(rawAppointment) {
    var dateRange = this.scheduler._workSpace.getDateRange();

    var startViewDate = this.scheduler.appointmentTakesAllDay(rawAppointment) ? dateUtils.trimTime(dateRange[0]) : dateRange[0];
    var endViewDate = dateRange[1];
    var commonTimeZone = this.scheduler.option('timeZone');

    if (commonTimeZone) {
      startViewDate = this.timeZoneCalculator.createDate(startViewDate, {
        path: 'fromGrid'
      });
      endViewDate = this.timeZoneCalculator.createDate(endViewDate, {
        path: 'fromGrid'
      });
      var daylightOffset = timeZoneUtils.getDaylightOffsetInMs(startViewDate, endViewDate);

      if (daylightOffset) {
        endViewDate = new Date(endViewDate.getTime() + daylightOffset);
      }
    }

    return [startViewDate, endViewDate];
  }

  _createRecurrenceOptions(appointment, groupIndex) {
    var [minRecurrenceDate, maxRecurrenceDate] = this._createExtremeRecurrenceDates(appointment.source(), groupIndex);

    return {
      rule: appointment.recurrenceRule,
      exception: appointment.recurrenceException,
      min: minRecurrenceDate,
      max: maxRecurrenceDate,
      firstDayOfWeek: this.scheduler.getFirstDayOfWeek(),
      start: appointment.startDate,
      end: appointment.endDate,
      getPostProcessedException: date => {
        var timeZoneName = this.scheduler.option('timeZone');

        if (isEmptyObject(timeZoneName) || timeZoneUtils.isEqualLocalTimeZone(timeZoneName, date)) {
          return date;
        }

        var appointmentOffset = this.timeZoneCalculator.getOffsets(appointment.startDate).common;
        var exceptionAppointmentOffset = this.timeZoneCalculator.getOffsets(date).common;
        var diff = appointmentOffset - exceptionAppointmentOffset;
        diff = this._getProcessedNotNativeDateIfCrossDST(date, diff);
        return new Date(date.getTime() - diff * dateUtils.dateToMilliseconds('hour'));
      }
    };
  }

  _createRecurrenceAppointments(appointment, resources) {
    var {
      duration
    } = appointment;

    var option = this._createRecurrenceOptions(appointment);

    var generatedStartDates = getRecurrenceProcessor().generateDates(option);
    return generatedStartDates.map(date => {
      var utcDate = timeZoneUtils.createUTCDateWithLocalOffset(date);
      utcDate.setTime(utcDate.getTime() + duration);
      var endDate = timeZoneUtils.createDateFromUTCWithLocalOffset(utcDate);
      return {
        startDate: new Date(date),
        endDate: endDate
      };
    });
  }

  _cropAppointmentsByStartDayHour(appointments, rawAppointment, isAllDay) {
    return appointments.map(appointment => {
      var startDate = new Date(appointment.startDate);

      var firstViewDate = this._getAppointmentFirstViewDate(appointment, rawAppointment);

      var startDayHour = this._getViewStartDayHour(firstViewDate);

      appointment.startDate = this._getAppointmentResultDate({
        appointment,
        rawAppointment,
        startDate,
        startDayHour,
        firstViewDate
      });
      return appointment;
    });
  }

  _getAppointmentFirstViewDate() {
    return this.scheduler.getStartViewDate();
  }

  _getViewStartDayHour() {
    return this.scheduler._getCurrentViewOption('startDayHour');
  }

  _getAppointmentResultDate(options) {
    var {
      appointment,
      rawAppointment,
      startDayHour,
      firstViewDate
    } = options;
    var {
      startDate
    } = options;
    var resultDate = new Date(appointment.startDate);

    if (this.scheduler.appointmentTakesAllDay(rawAppointment)) {
      resultDate = dateUtils.normalizeDate(startDate, firstViewDate);
    } else {
      if (startDate < firstViewDate) {
        startDate = firstViewDate;
      }

      resultDate = dateUtils.normalizeDate(appointment.startDate, startDate);
    }

    return dateUtils.roundDateByStartDayHour(resultDate, startDayHour);
  }

  createAppointmentInfos(gridAppointments, resources, isAllDay, recurrent) {
    var _this = this;

    var result = [];

    var _loop = function _loop(i) {
      var appointment = gridAppointments[i];

      var coordinates = _this.getCoordinates({
        appointment,
        resources,
        isAllDay,
        recurrent
      });

      coordinates.forEach(coordinate => {
        extend(coordinate, {
          info: {
            appointment: gridAppointments[i],
            sourceAppointment: gridAppointments[i].source
          }
        });
      });
      result = result.concat(coordinates);
    };

    for (var i = 0; i < gridAppointments.length; i++) {
      _loop(i);
    }

    return result;
  }

  getCoordinates(options) {
    var {
      appointment,
      resources,
      isAllDay
    } = options;
    return this.workspace.getCoordinatesByDateInGroup(appointment.startDate, resources, isAllDay);
  }

}
export class AppointmentSettingsGeneratorVirtualStrategy extends AppointmentSettingsGeneratorBaseStrategy {
  get viewDataProvider() {
    return this.workspace.viewDataProvider;
  }

  get isVerticalGrouping() {
    return this.workspace._isVerticalGroupedWorkSpace();
  }

  createAppointmentInfos(gridAppointments, resources, allDay, recurrent) {
    var appointments = allDay ? gridAppointments : gridAppointments.filter(_ref => {
      var {
        source,
        startDate,
        endDate
      } = _ref;
      var {
        groupIndex
      } = source;
      return this.viewDataProvider.isGroupIntersectDateInterval(groupIndex, startDate, endDate);
    });

    if (recurrent) {
      return this._createRecurrentAppointmentInfos(appointments, resources, allDay);
    }

    return super.createAppointmentInfos(appointments, resources, allDay, recurrent);
  }

  getCoordinates(options) {
    var {
      appointment,
      isAllDay,
      resources,
      recurrent
    } = options;
    var {
      startDate
    } = appointment;
    var {
      workspace
    } = this;
    var groupIndex = !recurrent ? appointment.source.groupIndex : undefined;
    return workspace.getCoordinatesByDateInGroup(startDate, resources, isAllDay, groupIndex);
  }

  _createRecurrentAppointmentInfos(gridAppointments, resources, allDay) {
    var result = [];
    gridAppointments.forEach(appointment => {
      var {
        source
      } = appointment;
      var {
        groupIndex
      } = source;
      var coordinate = this.workspace.getCoordinatesByDate(appointment.startDate, groupIndex, allDay);

      if (coordinate) {
        extend(coordinate, {
          info: {
            appointment,
            sourceAppointment: source
          }
        });
        result.push(coordinate);
      }
    });
    return result;
  }

  _cropAppointmentsByStartDayHour(appointments, rawAppointment, isAllDay) {
    return appointments.filter(appointment => {
      var firstViewDate = this._getAppointmentFirstViewDate(appointment, rawAppointment);

      if (!firstViewDate) return false;

      var startDayHour = this._getViewStartDayHour(firstViewDate);

      var startDate = new Date(appointment.startDate);
      appointment.startDate = this._getAppointmentResultDate({
        appointment,
        rawAppointment,
        startDate,
        startDayHour,
        firstViewDate
      });
      return !isAllDay ? appointment.endDate > appointment.startDate : true;
    });
  }

  _createRecurrenceAppointments(appointment, resources) {
    var {
      duration
    } = appointment;
    var result = [];
    var groupIndices = this.workspace._getGroupCount() ? this._getGroupIndices(resources) : [0];
    groupIndices.forEach(groupIndex => {
      var option = this._createRecurrenceOptions(appointment, groupIndex);

      var generatedStartDates = getRecurrenceProcessor().generateDates(option);
      var recurrentInfo = generatedStartDates.map(date => {
        var startDate = new Date(date);
        var utcDate = timeZoneUtils.createUTCDateWithLocalOffset(date);
        utcDate.setTime(utcDate.getTime() + duration);
        var endDate = timeZoneUtils.createDateFromUTCWithLocalOffset(utcDate);
        return {
          startDate,
          endDate,
          groupIndex
        };
      });
      result.push(...recurrentInfo);
    });
    return result;
  }

  _getViewStartDayHour(firstViewDate) {
    return firstViewDate.getHours();
  }

  _getAppointmentFirstViewDate(appointment, rawAppointment) {
    var {
      viewDataProvider
    } = this.scheduler.getWorkSpace();
    var {
      groupIndex
    } = appointment.source;
    var {
      startDate,
      endDate
    } = appointment;

    var isAllDay = this._isAllDayAppointment(rawAppointment);

    return viewDataProvider.findGroupCellStartDate(groupIndex, startDate, endDate, isAllDay);
  }

  _updateGroupIndices(appointments, itemResources) {
    var groupIndices = this._getGroupIndices(itemResources);

    var result = [];
    groupIndices.forEach(groupIndex => {
      var groupStartDate = this.viewDataProvider.getGroupStartDate(groupIndex);

      if (groupStartDate) {
        appointments.forEach(appointment => {
          var appointmentCopy = extend({}, appointment);
          appointmentCopy.groupIndex = groupIndex;
          result.push(appointmentCopy);
        });
      }
    });
    return result;
  }

  _getGroupIndices(resources) {
    var _groupIndices;

    var groupIndices = this.workspace._getGroupIndexes(resources);

    var {
      viewDataProvider
    } = this.workspace;
    var viewDataGroupIndices = viewDataProvider.getGroupIndices();

    if (!((_groupIndices = groupIndices) !== null && _groupIndices !== void 0 && _groupIndices.length)) {
      groupIndices = [0];
    }

    return groupIndices.filter(groupIndex => viewDataGroupIndices.indexOf(groupIndex) !== -1);
  }

  _createAppointments(appointment, resources) {
    var appointments = super._createAppointments(appointment, resources);

    return !appointment.isRecurrent ? this._updateGroupIndices(appointments, resources) : appointments;
  }

}
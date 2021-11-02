"use strict";

exports.AppointmentSettingsGeneratorVirtualStrategy = exports.AppointmentSettingsGeneratorBaseStrategy = exports.AppointmentSettingsGenerator = void 0;

var _date = _interopRequireDefault(require("../../core/utils/date"));

var _type = require("../../core/utils/type");

var _extend = require("../../core/utils/extend");

var _recurrence = require("./recurrence");

var _utilsTimeZone = _interopRequireDefault(require("./utils.timeZone.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var toMs = _date.default.dateToMilliseconds;

var AppointmentSettingsGenerator = /*#__PURE__*/function () {
  function AppointmentSettingsGenerator(scheduler) {
    this.scheduler = scheduler;
    this.settingsStrategy = this.scheduler.isVirtualScrolling() ? new AppointmentSettingsGeneratorVirtualStrategy(this.scheduler) : new AppointmentSettingsGeneratorBaseStrategy(this.scheduler);
  }

  var _proto = AppointmentSettingsGenerator.prototype;

  _proto.create = function create(rawAppointment) {
    return this.settingsStrategy.create(rawAppointment);
  };

  return AppointmentSettingsGenerator;
}();

exports.AppointmentSettingsGenerator = AppointmentSettingsGenerator;

var AppointmentSettingsGeneratorBaseStrategy = /*#__PURE__*/function () {
  function AppointmentSettingsGeneratorBaseStrategy(scheduler) {
    this.scheduler = scheduler;
  }

  var _proto2 = AppointmentSettingsGeneratorBaseStrategy.prototype;

  _proto2.create = function create(rawAppointment) {
    var scheduler = this.scheduler;
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
  };

  _proto2._getProcessedByAppointmentTimeZone = function _getProcessedByAppointmentTimeZone(appointmentList, appointment) {
    var _this = this;

    var hasAppointmentTimeZone = !(0, _type.isEmptyObject)(appointment.startDateTimeZone) || !(0, _type.isEmptyObject)(appointment.endDateTimeZone);

    if (appointmentList.length > 1 && hasAppointmentTimeZone) {
      var appointmentOffsets = {
        startDate: this.timeZoneCalculator.getOffsets(appointment.startDate, appointment.startDateTimeZone),
        endDate: this.timeZoneCalculator.getOffsets(appointment.endDate, appointment.endDateTimeZone)
      };
      appointmentList.forEach(function (a) {
        var sourceOffsets = {
          startDate: _this.timeZoneCalculator.getOffsets(a.startDate, appointment.startDateTimeZone),
          endDate: _this.timeZoneCalculator.getOffsets(a.endDate, appointment.endDateTimeZone)
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
  };

  _proto2._isAllDayAppointment = function _isAllDayAppointment(rawAppointment) {
    return this.scheduler.appointmentTakesAllDay(rawAppointment) && this.workspace.supportAllDayRow();
  };

  _proto2._createAppointments = function _createAppointments(appointment, resources) {
    var appointments = this._createRecurrenceAppointments(appointment, resources);

    if (!appointment.isRecurrent && appointments.length === 0) {
      appointments.push({
        startDate: appointment.startDate,
        endDate: appointment.endDate
      });
    } // T817857


    appointments = appointments.map(function (item) {
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
  };

  _proto2._canProcessNotNativeTimezoneDates = function _canProcessNotNativeTimezoneDates(appointment) {
    var timeZoneName = this.scheduler.option('timeZone');
    var isTimeZoneSet = !(0, _type.isEmptyObject)(timeZoneName);

    if (!isTimeZoneSet) {
      return false;
    }

    if (!appointment.isRecurrent) {
      return false;
    }

    return !_utilsTimeZone.default.isEqualLocalTimeZone(timeZoneName, appointment.startDate);
  };

  _proto2._getProcessedNotNativeDateIfCrossDST = function _getProcessedNotNativeDateIfCrossDST(date, offset) {
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
  };

  _proto2._getCommonOffset = function _getCommonOffset(date) {
    return this.timeZoneCalculator.getOffsets(date).common;
  };

  _proto2._getProcessedNotNativeTimezoneDates = function _getProcessedNotNativeTimezoneDates(appointmentList, appointment) {
    var _this2 = this;

    return appointmentList.map(function (item) {
      var diffStartDateOffset = _this2._getCommonOffset(appointment.startDate) - _this2._getCommonOffset(item.startDate);

      var diffEndDateOffset = _this2._getCommonOffset(appointment.endDate) - _this2._getCommonOffset(item.endDate);

      if (diffStartDateOffset === 0 && diffEndDateOffset === 0) {
        return item;
      }

      diffStartDateOffset = _this2._getProcessedNotNativeDateIfCrossDST(item.startDate, diffStartDateOffset);
      diffEndDateOffset = _this2._getProcessedNotNativeDateIfCrossDST(item.endDate, diffEndDateOffset);
      var newStartDate = new Date(item.startDate.getTime() + diffStartDateOffset * toMs('hour'));
      var newEndDate = new Date(item.endDate.getTime() + diffEndDateOffset * toMs('hour'));

      var testNewStartDate = _this2.timeZoneCalculator.createDate(newStartDate, {
        path: 'toGrid'
      });

      var testNewEndDate = _this2.timeZoneCalculator.createDate(newEndDate, {
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
  };

  _proto2._getProcessedLongAppointmentsIfRequired = function _getProcessedLongAppointmentsIfRequired(gridAppointmentList, appointment) {
    var _this3 = this;

    var rawAppointment = appointment.source();
    var allDay = this.scheduler.appointmentTakesAllDay(rawAppointment);
    var dateRange = this.workspace.getDateRange();
    var renderingStrategy = this.scheduler.getLayoutManager().getRenderingStrategyInstance();

    if (renderingStrategy.needSeparateAppointment(allDay)) {
      var longStartDateParts = [];
      var resultDates = [];
      gridAppointmentList.forEach(function (gridAppointment) {
        var maxDate = new Date(dateRange[1]);
        var endDateOfPart = renderingStrategy.normalizeEndDateByViewEnd(rawAppointment, gridAppointment.endDate);
        longStartDateParts = _date.default.getDatesOfInterval(gridAppointment.startDate, endDateOfPart, {
          milliseconds: _this3.scheduler.getWorkSpace().getIntervalDuration(allDay)
        });
        var list = longStartDateParts.filter(function (startDatePart) {
          return new Date(startDatePart) < maxDate;
        }).map(function (date) {
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
  };

  _proto2._createGridAppointmentList = function _createGridAppointmentList(appointmentList, appointment) {
    var _this4 = this;

    return appointmentList.map(function (source) {
      var offsetDifference = appointment.startDate.getTimezoneOffset() - source.startDate.getTimezoneOffset();

      if (offsetDifference !== 0 && _this4._canProcessNotNativeTimezoneDates(appointment)) {
        source.startDate = new Date(source.startDate.getTime() + offsetDifference * toMs('minute'));
        source.endDate = new Date(source.endDate.getTime() + offsetDifference * toMs('minute'));
        source.exceptionDate = new Date(source.startDate);
      }

      var startDate = _this4.timeZoneCalculator.createDate(source.startDate, {
        path: 'toGrid'
      });

      var endDate = _this4.timeZoneCalculator.createDate(source.endDate, {
        path: 'toGrid'
      });

      return {
        startDate: startDate,
        endDate: endDate,
        source: source // TODO

      };
    });
  };

  _proto2._createExtremeRecurrenceDates = function _createExtremeRecurrenceDates(rawAppointment) {
    var dateRange = this.scheduler._workSpace.getDateRange();

    var startViewDate = this.scheduler.appointmentTakesAllDay(rawAppointment) ? _date.default.trimTime(dateRange[0]) : dateRange[0];
    var endViewDate = dateRange[1];
    var commonTimeZone = this.scheduler.option('timeZone');

    if (commonTimeZone) {
      startViewDate = this.timeZoneCalculator.createDate(startViewDate, {
        path: 'fromGrid'
      });
      endViewDate = this.timeZoneCalculator.createDate(endViewDate, {
        path: 'fromGrid'
      });

      var daylightOffset = _utilsTimeZone.default.getDaylightOffsetInMs(startViewDate, endViewDate);

      if (daylightOffset) {
        endViewDate = new Date(endViewDate.getTime() + daylightOffset);
      }
    }

    return [startViewDate, endViewDate];
  };

  _proto2._createRecurrenceOptions = function _createRecurrenceOptions(appointment, groupIndex) {
    var _this5 = this;

    var _this$_createExtremeR = this._createExtremeRecurrenceDates(appointment.source(), groupIndex),
        _this$_createExtremeR2 = _slicedToArray(_this$_createExtremeR, 2),
        minRecurrenceDate = _this$_createExtremeR2[0],
        maxRecurrenceDate = _this$_createExtremeR2[1];

    return {
      rule: appointment.recurrenceRule,
      exception: appointment.recurrenceException,
      min: minRecurrenceDate,
      max: maxRecurrenceDate,
      firstDayOfWeek: this.scheduler.getFirstDayOfWeek(),
      start: appointment.startDate,
      end: appointment.endDate,
      getPostProcessedException: function getPostProcessedException(date) {
        var timeZoneName = _this5.scheduler.option('timeZone');

        if ((0, _type.isEmptyObject)(timeZoneName) || _utilsTimeZone.default.isEqualLocalTimeZone(timeZoneName, date)) {
          return date;
        }

        var appointmentOffset = _this5.timeZoneCalculator.getOffsets(appointment.startDate).common;

        var exceptionAppointmentOffset = _this5.timeZoneCalculator.getOffsets(date).common;

        var diff = appointmentOffset - exceptionAppointmentOffset;
        diff = _this5._getProcessedNotNativeDateIfCrossDST(date, diff);
        return new Date(date.getTime() - diff * _date.default.dateToMilliseconds('hour'));
      }
    };
  };

  _proto2._createRecurrenceAppointments = function _createRecurrenceAppointments(appointment, resources) {
    var duration = appointment.duration;

    var option = this._createRecurrenceOptions(appointment);

    var generatedStartDates = (0, _recurrence.getRecurrenceProcessor)().generateDates(option);
    return generatedStartDates.map(function (date) {
      var utcDate = _utilsTimeZone.default.createUTCDateWithLocalOffset(date);

      utcDate.setTime(utcDate.getTime() + duration);

      var endDate = _utilsTimeZone.default.createDateFromUTCWithLocalOffset(utcDate);

      return {
        startDate: new Date(date),
        endDate: endDate
      };
    });
  };

  _proto2._cropAppointmentsByStartDayHour = function _cropAppointmentsByStartDayHour(appointments, rawAppointment, isAllDay) {
    var _this6 = this;

    return appointments.map(function (appointment) {
      var startDate = new Date(appointment.startDate);

      var firstViewDate = _this6._getAppointmentFirstViewDate(appointment, rawAppointment);

      var startDayHour = _this6._getViewStartDayHour(firstViewDate);

      appointment.startDate = _this6._getAppointmentResultDate({
        appointment: appointment,
        rawAppointment: rawAppointment,
        startDate: startDate,
        startDayHour: startDayHour,
        firstViewDate: firstViewDate
      });
      return appointment;
    });
  };

  _proto2._getAppointmentFirstViewDate = function _getAppointmentFirstViewDate() {
    return this.scheduler.getStartViewDate();
  };

  _proto2._getViewStartDayHour = function _getViewStartDayHour() {
    return this.scheduler._getCurrentViewOption('startDayHour');
  };

  _proto2._getAppointmentResultDate = function _getAppointmentResultDate(options) {
    var appointment = options.appointment,
        rawAppointment = options.rawAppointment,
        startDayHour = options.startDayHour,
        firstViewDate = options.firstViewDate;
    var startDate = options.startDate;
    var resultDate = new Date(appointment.startDate);

    if (this.scheduler.appointmentTakesAllDay(rawAppointment)) {
      resultDate = _date.default.normalizeDate(startDate, firstViewDate);
    } else {
      if (startDate < firstViewDate) {
        startDate = firstViewDate;
      }

      resultDate = _date.default.normalizeDate(appointment.startDate, startDate);
    }

    return _date.default.roundDateByStartDayHour(resultDate, startDayHour);
  };

  _proto2.createAppointmentInfos = function createAppointmentInfos(gridAppointments, resources, isAllDay, recurrent) {
    var _this7 = this;

    var result = [];

    var _loop = function _loop(i) {
      var appointment = gridAppointments[i];

      var coordinates = _this7.getCoordinates({
        appointment: appointment,
        resources: resources,
        isAllDay: isAllDay,
        recurrent: recurrent
      });

      coordinates.forEach(function (coordinate) {
        (0, _extend.extend)(coordinate, {
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
  };

  _proto2.getCoordinates = function getCoordinates(options) {
    var appointment = options.appointment,
        resources = options.resources,
        isAllDay = options.isAllDay;
    return this.workspace.getCoordinatesByDateInGroup(appointment.startDate, resources, isAllDay);
  };

  _createClass(AppointmentSettingsGeneratorBaseStrategy, [{
    key: "timeZoneCalculator",
    get: function get() {
      return this.scheduler.timeZoneCalculator;
    }
  }, {
    key: "workspace",
    get: function get() {
      return this.scheduler.getWorkSpace();
    }
  }, {
    key: "viewDataProvider",
    get: function get() {
      return this.workspace.viewDataProvider;
    }
  }]);

  return AppointmentSettingsGeneratorBaseStrategy;
}();

exports.AppointmentSettingsGeneratorBaseStrategy = AppointmentSettingsGeneratorBaseStrategy;

var AppointmentSettingsGeneratorVirtualStrategy = /*#__PURE__*/function (_AppointmentSettingsG) {
  _inheritsLoose(AppointmentSettingsGeneratorVirtualStrategy, _AppointmentSettingsG);

  function AppointmentSettingsGeneratorVirtualStrategy() {
    return _AppointmentSettingsG.apply(this, arguments) || this;
  }

  var _proto3 = AppointmentSettingsGeneratorVirtualStrategy.prototype;

  _proto3.createAppointmentInfos = function createAppointmentInfos(gridAppointments, resources, allDay, recurrent) {
    var _this8 = this;

    var appointments = allDay ? gridAppointments : gridAppointments.filter(function (_ref) {
      var source = _ref.source,
          startDate = _ref.startDate,
          endDate = _ref.endDate;
      var groupIndex = source.groupIndex;
      return _this8.viewDataProvider.isGroupIntersectDateInterval(groupIndex, startDate, endDate);
    });

    if (recurrent) {
      return this._createRecurrentAppointmentInfos(appointments, resources, allDay);
    }

    return _AppointmentSettingsG.prototype.createAppointmentInfos.call(this, appointments, resources, allDay, recurrent);
  };

  _proto3.getCoordinates = function getCoordinates(options) {
    var appointment = options.appointment,
        isAllDay = options.isAllDay,
        resources = options.resources,
        recurrent = options.recurrent;
    var startDate = appointment.startDate;
    var workspace = this.workspace;
    var groupIndex = !recurrent ? appointment.source.groupIndex : undefined;
    return workspace.getCoordinatesByDateInGroup(startDate, resources, isAllDay, groupIndex);
  };

  _proto3._createRecurrentAppointmentInfos = function _createRecurrentAppointmentInfos(gridAppointments, resources, allDay) {
    var _this9 = this;

    var result = [];
    gridAppointments.forEach(function (appointment) {
      var source = appointment.source;
      var groupIndex = source.groupIndex;

      var coordinate = _this9.workspace.getCoordinatesByDate(appointment.startDate, groupIndex, allDay);

      if (coordinate) {
        (0, _extend.extend)(coordinate, {
          info: {
            appointment: appointment,
            sourceAppointment: source
          }
        });
        result.push(coordinate);
      }
    });
    return result;
  };

  _proto3._cropAppointmentsByStartDayHour = function _cropAppointmentsByStartDayHour(appointments, rawAppointment, isAllDay) {
    var _this10 = this;

    return appointments.filter(function (appointment) {
      var firstViewDate = _this10._getAppointmentFirstViewDate(appointment, rawAppointment);

      if (!firstViewDate) return false;

      var startDayHour = _this10._getViewStartDayHour(firstViewDate);

      var startDate = new Date(appointment.startDate);
      appointment.startDate = _this10._getAppointmentResultDate({
        appointment: appointment,
        rawAppointment: rawAppointment,
        startDate: startDate,
        startDayHour: startDayHour,
        firstViewDate: firstViewDate
      });
      return !isAllDay ? appointment.endDate > appointment.startDate : true;
    });
  };

  _proto3._createRecurrenceAppointments = function _createRecurrenceAppointments(appointment, resources) {
    var _this11 = this;

    var duration = appointment.duration;
    var result = [];
    var groupIndices = this.workspace._getGroupCount() ? this._getGroupIndices(resources) : [0];
    groupIndices.forEach(function (groupIndex) {
      var option = _this11._createRecurrenceOptions(appointment, groupIndex);

      var generatedStartDates = (0, _recurrence.getRecurrenceProcessor)().generateDates(option);
      var recurrentInfo = generatedStartDates.map(function (date) {
        var startDate = new Date(date);

        var utcDate = _utilsTimeZone.default.createUTCDateWithLocalOffset(date);

        utcDate.setTime(utcDate.getTime() + duration);

        var endDate = _utilsTimeZone.default.createDateFromUTCWithLocalOffset(utcDate);

        return {
          startDate: startDate,
          endDate: endDate,
          groupIndex: groupIndex
        };
      });
      result.push.apply(result, _toConsumableArray(recurrentInfo));
    });
    return result;
  };

  _proto3._getViewStartDayHour = function _getViewStartDayHour(firstViewDate) {
    return firstViewDate.getHours();
  };

  _proto3._getAppointmentFirstViewDate = function _getAppointmentFirstViewDate(appointment, rawAppointment) {
    var _this$scheduler$getWo = this.scheduler.getWorkSpace(),
        viewDataProvider = _this$scheduler$getWo.viewDataProvider;

    var groupIndex = appointment.source.groupIndex;
    var startDate = appointment.startDate,
        endDate = appointment.endDate;

    var isAllDay = this._isAllDayAppointment(rawAppointment);

    return viewDataProvider.findGroupCellStartDate(groupIndex, startDate, endDate, isAllDay);
  };

  _proto3._updateGroupIndices = function _updateGroupIndices(appointments, itemResources) {
    var _this12 = this;

    var groupIndices = this._getGroupIndices(itemResources);

    var result = [];
    groupIndices.forEach(function (groupIndex) {
      var groupStartDate = _this12.viewDataProvider.getGroupStartDate(groupIndex);

      if (groupStartDate) {
        appointments.forEach(function (appointment) {
          var appointmentCopy = (0, _extend.extend)({}, appointment);
          appointmentCopy.groupIndex = groupIndex;
          result.push(appointmentCopy);
        });
      }
    });
    return result;
  };

  _proto3._getGroupIndices = function _getGroupIndices(resources) {
    var _groupIndices;

    var groupIndices = this.workspace._getGroupIndexes(resources);

    var viewDataProvider = this.workspace.viewDataProvider;
    var viewDataGroupIndices = viewDataProvider.getGroupIndices();

    if (!((_groupIndices = groupIndices) !== null && _groupIndices !== void 0 && _groupIndices.length)) {
      groupIndices = [0];
    }

    return groupIndices.filter(function (groupIndex) {
      return viewDataGroupIndices.indexOf(groupIndex) !== -1;
    });
  };

  _proto3._createAppointments = function _createAppointments(appointment, resources) {
    var appointments = _AppointmentSettingsG.prototype._createAppointments.call(this, appointment, resources);

    return !appointment.isRecurrent ? this._updateGroupIndices(appointments, resources) : appointments;
  };

  _createClass(AppointmentSettingsGeneratorVirtualStrategy, [{
    key: "viewDataProvider",
    get: function get() {
      return this.workspace.viewDataProvider;
    }
  }, {
    key: "isVerticalGrouping",
    get: function get() {
      return this.workspace._isVerticalGroupedWorkSpace();
    }
  }]);

  return AppointmentSettingsGeneratorVirtualStrategy;
}(AppointmentSettingsGeneratorBaseStrategy);

exports.AppointmentSettingsGeneratorVirtualStrategy = AppointmentSettingsGeneratorVirtualStrategy;
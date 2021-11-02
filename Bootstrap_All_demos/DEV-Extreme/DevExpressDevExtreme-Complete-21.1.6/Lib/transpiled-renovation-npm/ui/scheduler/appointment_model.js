"use strict";

exports.default = void 0;

var _config = _interopRequireDefault(require("../../core/config"));

var _iterator = require("../../core/utils/iterator");

var _date_serialization = _interopRequireDefault(require("../../core/utils/date_serialization"));

var _recurrence = require("./recurrence");

var _date = _interopRequireDefault(require("../../core/utils/date"));

var _common = require("../../core/utils/common");

var _type = require("../../core/utils/type");

var _array = require("../../core/utils/array");

var _extend = require("../../core/utils/extend");

var _query = _interopRequireDefault(require("../../data/query"));

var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var toMs = _date.default.dateToMilliseconds;
var DATE_FILTER_POSITION = 0;
var USER_FILTER_POSITION = 1;

var FilterMaker = /*#__PURE__*/function () {
  function FilterMaker(dataAccessors) {
    this._filterRegistry = null;
    this._dataAccessors = dataAccessors;
  }

  var _proto = FilterMaker.prototype;

  _proto.isRegistered = function isRegistered() {
    return !!this._filterRegistry;
  };

  _proto.clearRegistry = function clearRegistry() {
    delete this._filterRegistry;
  };

  _proto.make = function make(type, args) {
    if (!this._filterRegistry) {
      this._filterRegistry = {};
    }

    this._make(type).apply(this, args);
  };

  _proto._make = function _make(type) {
    var _this = this;

    switch (type) {
      case 'date':
        return function (min, max, useAccessors) {
          var startDate = useAccessors ? _this._dataAccessors.getter.startDate : _this._dataAccessors.expr.startDateExpr;
          var endDate = useAccessors ? _this._dataAccessors.getter.endDate : _this._dataAccessors.expr.endDateExpr;
          var recurrenceRule = _this._dataAccessors.expr.recurrenceRuleExpr;
          _this._filterRegistry.date = [[[endDate, '>=', min], [startDate, '<', max]], 'or', [recurrenceRule, 'startswith', 'freq'], 'or', [[endDate, min], [startDate, min]]];

          if (!recurrenceRule) {
            _this._filterRegistry.date.splice(1, 2);
          }
        };

      case 'user':
        return function (userFilter) {
          _this._filterRegistry.user = userFilter;
        };
    }
  };

  _proto.combine = function combine() {
    var filter = [];
    this._filterRegistry.date && filter.push(this._filterRegistry.date);
    this._filterRegistry.user && filter.push(this._filterRegistry.user);
    return filter;
  };

  _proto.dateFilter = function dateFilter() {
    return this._filterRegistry.date;
  };

  return FilterMaker;
}();

var compareDateWithStartDayHour = function compareDateWithStartDayHour(startDate, endDate, startDayHour, allDay, severalDays) {
  var startTime = _date.default.dateTimeFromDecimal(startDayHour);

  var result = startDate.getHours() >= startTime.hours && startDate.getMinutes() >= startTime.minutes || endDate.getHours() === startTime.hours && endDate.getMinutes() > startTime.minutes || endDate.getHours() > startTime.hours || severalDays || allDay;
  return result;
};

var compareDateWithEndDayHour = function compareDateWithEndDayHour(options) {
  var startDate = options.startDate,
      endDate = options.endDate,
      startDayHour = options.startDayHour,
      endDayHour = options.endDayHour,
      viewStartDayHour = options.viewStartDayHour,
      viewEndDayHour = options.viewEndDayHour,
      allDay = options.allDay,
      severalDays = options.severalDays,
      min = options.min,
      max = options.max,
      checkIntersectViewport = options.checkIntersectViewport;
  var hiddenInterval = (24 - viewEndDayHour + viewStartDayHour) * toMs('hour');
  var apptDuration = endDate.getTime() - startDate.getTime();
  var delta = (hiddenInterval - apptDuration) / toMs('hour');
  var apptStartHour = startDate.getHours();
  var apptStartMinutes = startDate.getMinutes();
  var result;

  var endTime = _date.default.dateTimeFromDecimal(endDayHour);

  var startTime = _date.default.dateTimeFromDecimal(startDayHour);

  var apptIntersectViewport = startDate < max && endDate > min;
  result = checkIntersectViewport && apptIntersectViewport || apptStartHour < endTime.hours || apptStartHour === endTime.hours && apptStartMinutes < endTime.minutes || allDay && startDate <= max || severalDays && apptIntersectViewport && (apptStartHour < endTime.hours || endDate.getHours() * 60 + endDate.getMinutes() > startTime.hours * 60);

  if (apptDuration < hiddenInterval) {
    if (apptStartHour > endTime.hours && apptStartMinutes > endTime.minutes && delta <= apptStartHour - endDayHour) {
      result = false;
    }
  }

  return result;
};

var AppointmentModel = /*#__PURE__*/function () {
  function AppointmentModel(dataSource, dataAccessors, baseAppointmentDuration) {
    this.setDataAccessors(dataAccessors);
    this.setDataSource(dataSource);
    this._updatedAppointmentKeys = [];
    this._filterMaker = new FilterMaker(dataAccessors);
    this._baseAppointmentDuration = baseAppointmentDuration;
  }

  var _proto2 = AppointmentModel.prototype;

  _proto2._createFilter = function _createFilter(min, max, remoteFiltering, dateSerializationFormat) {
    this._filterMaker.make('date', [min, max]);

    var userFilterPosition = this._excessFiltering() ? this._dataSource.filter()[USER_FILTER_POSITION] : this._dataSource.filter();

    this._filterMaker.make('user', [userFilterPosition]);

    if (remoteFiltering) {
      this._dataSource.filter(this._combineRemoteFilter(dateSerializationFormat));
    }
  };

  _proto2._excessFiltering = function _excessFiltering() {
    var dateFilter = this._filterMaker.dateFilter();

    var dataSourceFilter = this._dataSource.filter();

    return dataSourceFilter && ((0, _common.equalByValue)(dataSourceFilter, dateFilter) || dataSourceFilter.length && (0, _common.equalByValue)(dataSourceFilter[DATE_FILTER_POSITION], dateFilter));
  };

  _proto2._combineFilter = function _combineFilter() {
    return this._filterMaker.combine();
  };

  _proto2._getStoreKey = function _getStoreKey(target) {
    var store = this._dataSource.store();

    return store.keyOf(target);
  };

  _proto2._filterAppointmentByResources = function _filterAppointmentByResources(appointment, resources) {
    var _this2 = this;

    var checkAppointmentResourceValues = function checkAppointmentResourceValues(resourceName, resourceIndex) {
      var resourceGetter = _this2._dataAccessors.getter.resources[resourceName];
      var resource;

      if ((0, _type.isFunction)(resourceGetter)) {
        resource = resourceGetter(appointment);
      }

      var appointmentResourceValues = (0, _array.wrapToArray)(resource);
      var resourceData = (0, _iterator.map)(resources[resourceIndex].items, function (item) {
        return item.id;
      });

      for (var j = 0; j < appointmentResourceValues.length; j++) {
        if ((0, _array.inArray)(appointmentResourceValues[j], resourceData) > -1) {
          return true;
        }
      }

      return false;
    };

    var result = false;

    for (var i = 0; i < resources.length; i++) {
      var resourceName = resources[i].name;
      result = checkAppointmentResourceValues(resourceName, i);

      if (!result) {
        return false;
      }
    }

    return result;
  };

  _proto2._filterAppointmentByRRule = function _filterAppointmentByRRule(appointment, min, max, startDayHour, endDayHour, firstDayOfWeek) {
    var recurrenceRule = appointment.recurrenceRule;
    var recurrenceException = appointment.recurrenceException;
    var allDay = appointment.allDay;
    var result = true;
    var appointmentStartDate = appointment.startDate;
    var appointmentEndDate = appointment.endDate;
    var recurrenceProcessor = (0, _recurrence.getRecurrenceProcessor)();

    if (allDay || this._appointmentPartInInterval(appointmentStartDate, appointmentEndDate, startDayHour, endDayHour)) {
      var trimmedDates = this._trimDates(min, max);

      min = trimmedDates.min;
      max = new Date(trimmedDates.max.getTime() - toMs('minute'));
    }

    if (recurrenceRule && !recurrenceProcessor.isValidRecurrenceRule(recurrenceRule)) {
      result = appointmentEndDate > min && appointmentStartDate <= max;
    }

    if (result && recurrenceProcessor.isValidRecurrenceRule(recurrenceRule)) {
      result = recurrenceProcessor.hasRecurrence({
        rule: recurrenceRule,
        exception: recurrenceException,
        start: appointmentStartDate,
        end: appointmentEndDate,
        min: min,
        max: max,
        firstDayOfWeek: firstDayOfWeek
      });
    }

    return result;
  };

  _proto2._appointmentPartInInterval = function _appointmentPartInInterval(startDate, endDate, startDayHour, endDayHour) {
    var apptStartDayHour = startDate.getHours();
    var apptEndDayHour = endDate.getHours();
    return apptStartDayHour <= startDayHour && apptEndDayHour <= endDayHour && apptEndDayHour >= startDayHour || apptEndDayHour >= endDayHour && apptStartDayHour <= endDayHour && apptStartDayHour >= startDayHour;
  };

  _proto2._createAllDayAppointmentFilter = function _createAllDayAppointmentFilter(filterOptions) {
    var viewStartDayHour = filterOptions.viewStartDayHour,
        viewEndDayHour = filterOptions.viewEndDayHour;
    var that = this;
    return [[function (appointment) {
      return that.appointmentTakesAllDay(appointment, viewStartDayHour, viewEndDayHour);
    }]];
  };

  _proto2._createCombinedFilter = function _createCombinedFilter(filterOptions, timeZoneCalculator) {
    var dataAccessors = this._dataAccessors;
    var min = new Date(filterOptions.min);
    var max = new Date(filterOptions.max);
    var getRecurrenceException = filterOptions.recurrenceException;
    var startDayHour = filterOptions.startDayHour,
        endDayHour = filterOptions.endDayHour,
        viewStartDayHour = filterOptions.viewStartDayHour,
        viewEndDayHour = filterOptions.viewEndDayHour,
        resources = filterOptions.resources,
        firstDayOfWeek = filterOptions.firstDayOfWeek,
        checkIntersectViewport = filterOptions.checkIntersectViewport;
    var that = this;
    return [[function (appointment) {
      var _appointment$visible;

      var appointmentVisible = (_appointment$visible = appointment.visible) !== null && _appointment$visible !== void 0 ? _appointment$visible : true;
      var result = appointmentVisible;
      var startDate = new Date(dataAccessors.getter.startDate(appointment));
      var endDate = new Date(dataAccessors.getter.endDate(appointment));
      var appointmentTakesAllDay = that.appointmentTakesAllDay(appointment, viewStartDayHour, viewEndDayHour);
      var appointmentTakesSeveralDays = that.appointmentTakesSeveralDays(appointment);
      var isAllDay = dataAccessors.getter.allDay(appointment);
      var appointmentIsLong = appointmentTakesSeveralDays || appointmentTakesAllDay;
      var useRecurrence = (0, _type.isDefined)(dataAccessors.getter.recurrenceRule);
      var recurrenceRule;

      if (useRecurrence) {
        recurrenceRule = dataAccessors.getter.recurrenceRule(appointment);
      }

      if (resources && resources.length) {
        result = that._filterAppointmentByResources(appointment, resources);
      }

      if (appointmentTakesAllDay && filterOptions.allDay === false) {
        result = false;
      }

      var startDateTimeZone = dataAccessors.getter.startDateTimeZone(appointment);
      var endDateTimeZone = dataAccessors.getter.endDateTimeZone(appointment);
      var comparableStartDate = timeZoneCalculator.createDate(startDate, {
        appointmentTimeZone: startDateTimeZone,
        path: 'toGrid'
      });
      var comparableEndDate = timeZoneCalculator.createDate(endDate, {
        appointmentTimeZone: endDateTimeZone,
        path: 'toGrid'
      });

      if (result && useRecurrence) {
        var recurrenceException = getRecurrenceException ? getRecurrenceException(appointment) : dataAccessors.getter.recurrenceException(appointment);
        result = that._filterAppointmentByRRule({
          startDate: comparableStartDate,
          endDate: comparableEndDate,
          recurrenceRule: recurrenceRule,
          recurrenceException: recurrenceException,
          allDay: appointmentTakesAllDay
        }, min, max, startDayHour, endDayHour, firstDayOfWeek);
      } // NOTE: Long appointment part without allDay field and recurrence rule should be filtered by min


      if (result && comparableEndDate < min && appointmentIsLong && !isAllDay && (!useRecurrence || useRecurrence && !recurrenceRule)) {
        result = false;
      }

      if (result && (0, _type.isDefined)(startDayHour) && (!useRecurrence || !filterOptions.isVirtualScrolling)) {
        result = compareDateWithStartDayHour(comparableStartDate, comparableEndDate, startDayHour, appointmentTakesAllDay, appointmentTakesSeveralDays);
      }

      if (result && (0, _type.isDefined)(endDayHour)) {
        result = compareDateWithEndDayHour({
          startDate: comparableStartDate,
          endDate: comparableEndDate,
          startDayHour: startDayHour,
          endDayHour: endDayHour,
          viewStartDayHour: viewStartDayHour,
          viewEndDayHour: viewEndDayHour,
          allDay: appointmentTakesAllDay,
          severalDays: appointmentTakesSeveralDays,
          min: min,
          max: max,
          checkIntersectViewport: checkIntersectViewport
        });
      }

      if (result && useRecurrence && !recurrenceRule) {
        if (comparableEndDate < min && !isAllDay) {
          result = false;
        }
      }

      return result;
    }]];
  };

  _proto2.setDataSource = function setDataSource(dataSource) {
    this._dataSource = dataSource;
    this.cleanModelState();

    this._initStoreChangeHandlers();

    this._filterMaker && this._filterMaker.clearRegistry();
  };

  _proto2._initStoreChangeHandlers = function _initStoreChangeHandlers() {
    var _this3 = this;

    var dataSource = this._dataSource;
    var store = dataSource === null || dataSource === void 0 ? void 0 : dataSource.store();

    if (store) {
      store.on('updating', function (newItem) {
        _this3._updatedAppointment = newItem;
      });
      store.on('push', function (pushItems) {
        var items = dataSource.items();
        var keyName = store.key();
        pushItems.forEach(function (pushItem) {
          var itemExists = items.filter(function (item) {
            return item[keyName] === pushItem.key;
          }).length !== 0;

          if (itemExists) {
            _this3._updatedAppointmentKeys.push({
              key: keyName,
              value: pushItem.key
            });
          } else {
            var data = pushItem.data;
            data && items.push(data);
          }
        });
        dataSource.load();
      });
    }
  };

  _proto2.getUpdatedAppointment = function getUpdatedAppointment() {
    return this._updatedAppointment;
  };

  _proto2.getUpdatedAppointmentKeys = function getUpdatedAppointmentKeys() {
    return this._updatedAppointmentKeys;
  };

  _proto2.cleanModelState = function cleanModelState() {
    this._updatedAppointment = null;
    this._updatedAppointmentKeys = [];
  };

  _proto2.setDataAccessors = function setDataAccessors(dataAccessors) {
    this._dataAccessors = dataAccessors;
    this._filterMaker = new FilterMaker(dataAccessors);
  };

  _proto2.filterByDate = function filterByDate(min, max, remoteFiltering, dateSerializationFormat) {
    if (!this._dataSource) {
      return;
    }

    var trimmedDates = this._trimDates(min, max);

    if (!this._filterMaker.isRegistered()) {
      this._createFilter(trimmedDates.min, trimmedDates.max, remoteFiltering, dateSerializationFormat);
    } else {
      var _this$_dataSource$fil;

      this._filterMaker.make('date', [trimmedDates.min, trimmedDates.max]);

      if (((_this$_dataSource$fil = this._dataSource.filter()) === null || _this$_dataSource$fil === void 0 ? void 0 : _this$_dataSource$fil.length) > 1) {
        // TODO: serialize user filter value only necessary for case T838165(details in note)
        var userFilter = this._serializeRemoteFilter([this._dataSource.filter()[1]], dateSerializationFormat);

        this._filterMaker.make('user', userFilter);
      }

      if (remoteFiltering) {
        this._dataSource.filter(this._combineRemoteFilter(dateSerializationFormat));
      }
    }
  };

  _proto2._combineRemoteFilter = function _combineRemoteFilter(dateSerializationFormat) {
    var combinedFilter = this._filterMaker.combine();

    return this._serializeRemoteFilter(combinedFilter, dateSerializationFormat);
  };

  _proto2._serializeRemoteFilter = function _serializeRemoteFilter(filter, dateSerializationFormat) {
    if (!Array.isArray(filter)) {
      return filter;
    }

    filter = (0, _extend.extend)([], filter);
    var startDate = this._dataAccessors.expr.startDateExpr;
    var endDate = this._dataAccessors.expr.endDateExpr;

    if ((0, _type.isString)(filter[0])) {
      if ((0, _config.default)().forceIsoDateParsing && filter.length > 1) {
        if (filter[0] === startDate || filter[0] === endDate) {
          // TODO: wrap filter value to new Date only necessary for case T838165(details in note)
          filter[filter.length - 1] = _date_serialization.default.serializeDate(new Date(filter[filter.length - 1]), dateSerializationFormat);
        }
      }
    }

    for (var i = 0; i < filter.length; i++) {
      filter[i] = this._serializeRemoteFilter(filter[i], dateSerializationFormat);
    }

    return filter;
  };

  _proto2._createAppointmentFilter = function _createAppointmentFilter(filterOptions, timeZoneCalculator) {
    var combinedFilter = this._createCombinedFilter(filterOptions, timeZoneCalculator);

    if (this._filterMaker.isRegistered()) {
      this._filterMaker.make('user', undefined);

      var trimmedDates = this._trimDates(filterOptions.min, filterOptions.max);

      this._filterMaker.make('date', [trimmedDates.min, trimmedDates.max, true]);

      var dateFilter = this.customizeDateFilter(this._filterMaker.combine(), timeZoneCalculator);
      combinedFilter.push([dateFilter]);
    }

    return combinedFilter;
  };

  _proto2.filterLoadedAppointments = function filterLoadedAppointments(filterOption, timeZoneCalculator) {
    var combinedFilter = this._createAppointmentFilter(filterOption, timeZoneCalculator);

    return (0, _query.default)(this.getPreparedDataItems()).filter(combinedFilter).toArray();
  };

  _proto2.filterAllDayAppointments = function filterAllDayAppointments(filterOption) {
    var combinedFilter = this._createAllDayAppointmentFilter(filterOption);

    return (0, _query.default)(this.getPreparedDataItems()).filter(combinedFilter).toArray();
  };

  _proto2.getPreparedDataItems = function getPreparedDataItems() {
    var _this$_dataSource,
        _this4 = this;

    var dataItems = (_this$_dataSource = this._dataSource) === null || _this$_dataSource === void 0 ? void 0 : _this$_dataSource.items();

    if (!dataItems) {
      return [];
    }

    return (0, _iterator.map)(dataItems, function (item) {
      var startDate = new Date(_this4._dataAccessors.getter.startDate(item));
      var endDate = new Date(_this4._dataAccessors.getter.endDate(item));

      _this4.replaceWrongEndDate(item, startDate, endDate);

      return item;
    });
  };

  _proto2.replaceWrongEndDate = function replaceWrongEndDate(appointment, startDate, endDate) {
    if (this._isEndDateWrong(startDate, endDate)) {
      var isAllDay = this._dataAccessors.getter.allDay(appointment);

      var calculatedEndDate = this._calculateAppointmentEndDate(isAllDay, startDate);

      this._dataAccessors.setter.endDate(appointment, calculatedEndDate);
    }
  };

  _proto2.filterLoadedVirtualAppointments = function filterLoadedVirtualAppointments(filterOptions, timeZoneCalculator, groupCount) {
    var _this5 = this;

    var combinedFilters = [];
    var itemsToFilter = this.getPreparedDataItems();
    var needPreFilter = groupCount > 0;

    if (needPreFilter) {
      itemsToFilter = itemsToFilter.filter(function (item) {
        for (var i = 0; i < filterOptions.length; ++i) {
          var resources = filterOptions[i].resources;

          if (_this5._filterAppointmentByResources(item, resources)) {
            return true;
          }
        }
      });
    }

    filterOptions.forEach(function (filterOption) {
      combinedFilters.length && combinedFilters.push('or');

      var filter = _this5._createAppointmentFilter(filterOption, timeZoneCalculator);

      combinedFilters.push(filter);
    });
    return (0, _query.default)(itemsToFilter).filter(combinedFilters).toArray();
  };

  _proto2._trimDates = function _trimDates(min, max) {
    var minCopy = _date.default.trimTime(new Date(min));

    var maxCopy = _date.default.trimTime(new Date(max));

    maxCopy.setDate(maxCopy.getDate() + 1);
    return {
      min: minCopy,
      max: maxCopy
    };
  };

  _proto2.hasAllDayAppointments = function hasAllDayAppointments(items, startDayHour, endDayHour) {
    if (!items) {
      return false;
    }

    var that = this;
    var result = false;
    (0, _iterator.each)(items, function (index, item) {
      if (that.appointmentTakesAllDay(item, startDayHour, endDayHour)) {
        result = true;
        return false;
      }
    });
    return result;
  };

  _proto2.appointmentTakesAllDay = function appointmentTakesAllDay(appointment, startDayHour, endDayHour) {
    var dataAccessors = this._dataAccessors;
    var startDate = dataAccessors.getter.startDate(appointment);
    var endDate = dataAccessors.getter.endDate(appointment);
    var allDay = dataAccessors.getter.allDay(appointment);
    return allDay || this._appointmentHasAllDayDuration(startDate, endDate, startDayHour, endDayHour);
  };

  _proto2._appointmentHasAllDayDuration = function _appointmentHasAllDayDuration(startDate, endDate, startDayHour, endDayHour) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    var dayDuration = 24;

    var appointmentDurationInHours = this._getAppointmentDurationInHours(startDate, endDate);

    return appointmentDurationInHours >= dayDuration || this._appointmentHasShortDayDuration(startDate, endDate, startDayHour, endDayHour);
  };

  _proto2._appointmentHasShortDayDuration = function _appointmentHasShortDayDuration(startDate, endDate, startDayHour, endDayHour) {
    var appointmentDurationInHours = this._getAppointmentDurationInHours(startDate, endDate);

    var shortDayDurationInHours = endDayHour - startDayHour;
    return appointmentDurationInHours >= shortDayDurationInHours && startDate.getHours() === startDayHour && endDate.getHours() === endDayHour;
  };

  _proto2._getAppointmentDurationInHours = function _getAppointmentDurationInHours(startDate, endDate) {
    return (endDate.getTime() - startDate.getTime()) / toMs('hour');
  };

  _proto2.appointmentTakesSeveralDays = function appointmentTakesSeveralDays(appointment) {
    var dataAccessors = this._dataAccessors;
    var startDate = new Date(dataAccessors.getter.startDate(appointment));
    var endDate = new Date(dataAccessors.getter.endDate(appointment));
    return !_date.default.sameDate(startDate, endDate);
  };

  _proto2.customizeDateFilter = function customizeDateFilter(dateFilter, timeZoneCalculator) {
    var _this6 = this;

    var currentFilter = (0, _extend.extend)(true, [], dateFilter);
    return function (appointment) {
      var startDate = new Date(_this6._dataAccessors.getter.startDate(appointment));
      var endDate = new Date(_this6._dataAccessors.getter.endDate(appointment));
      appointment = (0, _extend.extend)(true, {}, appointment);

      var startDateTimeZone = _this6._dataAccessors.getter.startDateTimeZone(appointment);

      var endDateTimeZone = _this6._dataAccessors.getter.endDateTimeZone(appointment);

      var comparableStartDate = timeZoneCalculator.createDate(startDate, {
        appointmentTimeZone: startDateTimeZone,
        path: 'toGrid'
      });
      var comparableEndDate = timeZoneCalculator.createDate(endDate, {
        appointmentTimeZone: endDateTimeZone,
        path: 'toGrid'
      });

      _this6._dataAccessors.setter.startDate(appointment, comparableStartDate);

      _this6._dataAccessors.setter.endDate(appointment, comparableEndDate);

      return (0, _query.default)([appointment]).filter(currentFilter).toArray().length > 0;
    }.bind(this);
  };

  _proto2._calculateAppointmentEndDate = function _calculateAppointmentEndDate(isAllDay, startDate) {
    if (isAllDay) {
      return _date.default.setToDayEnd(new Date(startDate));
    }

    return new Date(startDate.getTime() + this._baseAppointmentDuration * toMs('minute'));
  };

  _proto2._isEndDateWrong = function _isEndDateWrong(startDate, endDate) {
    return !endDate || isNaN(endDate.getTime()) || startDate.getTime() > endDate.getTime();
  };

  _proto2.add = function add(rawAppointment) {
    var _this7 = this;

    return this._dataSource.store().insert(rawAppointment).done(function () {
      return _this7._dataSource.load();
    });
  };

  _proto2.update = function update(target, data) {
    var _this8 = this;

    var key = this._getStoreKey(target);

    var d = new _deferred.Deferred();

    this._dataSource.store().update(key, data).done(function (result) {
      return _this8._dataSource.load().done(function () {
        return d.resolve(result);
      }).fail(d.reject);
    }).fail(d.reject);

    return d.promise();
  };

  _proto2.remove = function remove(rawAppointment) {
    var _this9 = this;

    var key = this._getStoreKey(rawAppointment);

    return this._dataSource.store().remove(key).done(function () {
      return _this9._dataSource.load();
    });
  };

  _createClass(AppointmentModel, [{
    key: "keyName",
    get: function get() {
      var store = this._dataSource.store();

      return store.key();
    }
  }]);

  return AppointmentModel;
}();

var _default = AppointmentModel;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
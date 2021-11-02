import config from '../../core/config';
import { map, each } from '../../core/utils/iterator';
import dateSerialization from '../../core/utils/date_serialization';
import { getRecurrenceProcessor } from './recurrence';
import dateUtils from '../../core/utils/date';
import { equalByValue } from '../../core/utils/common';
import { isFunction, isDefined, isString } from '../../core/utils/type';
import { inArray, wrapToArray } from '../../core/utils/array';
import { extend } from '../../core/utils/extend';
import query from '../../data/query';
import { Deferred } from '../../core/utils/deferred';
var toMs = dateUtils.dateToMilliseconds;
var DATE_FILTER_POSITION = 0;
var USER_FILTER_POSITION = 1;

class FilterMaker {
  constructor(dataAccessors) {
    this._filterRegistry = null;
    this._dataAccessors = dataAccessors;
  }

  isRegistered() {
    return !!this._filterRegistry;
  }

  clearRegistry() {
    delete this._filterRegistry;
  }

  make(type, args) {
    if (!this._filterRegistry) {
      this._filterRegistry = {};
    }

    this._make(type).apply(this, args);
  }

  _make(type) {
    switch (type) {
      case 'date':
        return (min, max, useAccessors) => {
          var startDate = useAccessors ? this._dataAccessors.getter.startDate : this._dataAccessors.expr.startDateExpr;
          var endDate = useAccessors ? this._dataAccessors.getter.endDate : this._dataAccessors.expr.endDateExpr;
          var recurrenceRule = this._dataAccessors.expr.recurrenceRuleExpr;
          this._filterRegistry.date = [[[endDate, '>=', min], [startDate, '<', max]], 'or', [recurrenceRule, 'startswith', 'freq'], 'or', [[endDate, min], [startDate, min]]];

          if (!recurrenceRule) {
            this._filterRegistry.date.splice(1, 2);
          }
        };

      case 'user':
        return userFilter => {
          this._filterRegistry.user = userFilter;
        };
    }
  }

  combine() {
    var filter = [];
    this._filterRegistry.date && filter.push(this._filterRegistry.date);
    this._filterRegistry.user && filter.push(this._filterRegistry.user);
    return filter;
  }

  dateFilter() {
    return this._filterRegistry.date;
  }

}

var compareDateWithStartDayHour = (startDate, endDate, startDayHour, allDay, severalDays) => {
  var startTime = dateUtils.dateTimeFromDecimal(startDayHour);
  var result = startDate.getHours() >= startTime.hours && startDate.getMinutes() >= startTime.minutes || endDate.getHours() === startTime.hours && endDate.getMinutes() > startTime.minutes || endDate.getHours() > startTime.hours || severalDays || allDay;
  return result;
};

var compareDateWithEndDayHour = options => {
  var {
    startDate,
    endDate,
    startDayHour,
    endDayHour,
    viewStartDayHour,
    viewEndDayHour,
    allDay,
    severalDays,
    min,
    max,
    checkIntersectViewport
  } = options;
  var hiddenInterval = (24 - viewEndDayHour + viewStartDayHour) * toMs('hour');
  var apptDuration = endDate.getTime() - startDate.getTime();
  var delta = (hiddenInterval - apptDuration) / toMs('hour');
  var apptStartHour = startDate.getHours();
  var apptStartMinutes = startDate.getMinutes();
  var result;
  var endTime = dateUtils.dateTimeFromDecimal(endDayHour);
  var startTime = dateUtils.dateTimeFromDecimal(startDayHour);
  var apptIntersectViewport = startDate < max && endDate > min;
  result = checkIntersectViewport && apptIntersectViewport || apptStartHour < endTime.hours || apptStartHour === endTime.hours && apptStartMinutes < endTime.minutes || allDay && startDate <= max || severalDays && apptIntersectViewport && (apptStartHour < endTime.hours || endDate.getHours() * 60 + endDate.getMinutes() > startTime.hours * 60);

  if (apptDuration < hiddenInterval) {
    if (apptStartHour > endTime.hours && apptStartMinutes > endTime.minutes && delta <= apptStartHour - endDayHour) {
      result = false;
    }
  }

  return result;
};

class AppointmentModel {
  constructor(dataSource, dataAccessors, baseAppointmentDuration) {
    this.setDataAccessors(dataAccessors);
    this.setDataSource(dataSource);
    this._updatedAppointmentKeys = [];
    this._filterMaker = new FilterMaker(dataAccessors);
    this._baseAppointmentDuration = baseAppointmentDuration;
  }

  get keyName() {
    var store = this._dataSource.store();

    return store.key();
  }

  _createFilter(min, max, remoteFiltering, dateSerializationFormat) {
    this._filterMaker.make('date', [min, max]);

    var userFilterPosition = this._excessFiltering() ? this._dataSource.filter()[USER_FILTER_POSITION] : this._dataSource.filter();

    this._filterMaker.make('user', [userFilterPosition]);

    if (remoteFiltering) {
      this._dataSource.filter(this._combineRemoteFilter(dateSerializationFormat));
    }
  }

  _excessFiltering() {
    var dateFilter = this._filterMaker.dateFilter();

    var dataSourceFilter = this._dataSource.filter();

    return dataSourceFilter && (equalByValue(dataSourceFilter, dateFilter) || dataSourceFilter.length && equalByValue(dataSourceFilter[DATE_FILTER_POSITION], dateFilter));
  }

  _combineFilter() {
    return this._filterMaker.combine();
  }

  _getStoreKey(target) {
    var store = this._dataSource.store();

    return store.keyOf(target);
  }

  _filterAppointmentByResources(appointment, resources) {
    var checkAppointmentResourceValues = (resourceName, resourceIndex) => {
      var resourceGetter = this._dataAccessors.getter.resources[resourceName];
      var resource;

      if (isFunction(resourceGetter)) {
        resource = resourceGetter(appointment);
      }

      var appointmentResourceValues = wrapToArray(resource);
      var resourceData = map(resources[resourceIndex].items, item => {
        return item.id;
      });

      for (var j = 0; j < appointmentResourceValues.length; j++) {
        if (inArray(appointmentResourceValues[j], resourceData) > -1) {
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
  }

  _filterAppointmentByRRule(appointment, min, max, startDayHour, endDayHour, firstDayOfWeek) {
    var recurrenceRule = appointment.recurrenceRule;
    var recurrenceException = appointment.recurrenceException;
    var allDay = appointment.allDay;
    var result = true;
    var appointmentStartDate = appointment.startDate;
    var appointmentEndDate = appointment.endDate;
    var recurrenceProcessor = getRecurrenceProcessor();

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
  }

  _appointmentPartInInterval(startDate, endDate, startDayHour, endDayHour) {
    var apptStartDayHour = startDate.getHours();
    var apptEndDayHour = endDate.getHours();
    return apptStartDayHour <= startDayHour && apptEndDayHour <= endDayHour && apptEndDayHour >= startDayHour || apptEndDayHour >= endDayHour && apptStartDayHour <= endDayHour && apptStartDayHour >= startDayHour;
  }

  _createAllDayAppointmentFilter(filterOptions) {
    var {
      viewStartDayHour,
      viewEndDayHour
    } = filterOptions;
    var that = this;
    return [[appointment => that.appointmentTakesAllDay(appointment, viewStartDayHour, viewEndDayHour)]];
  }

  _createCombinedFilter(filterOptions, timeZoneCalculator) {
    var dataAccessors = this._dataAccessors;
    var min = new Date(filterOptions.min);
    var max = new Date(filterOptions.max);
    var getRecurrenceException = filterOptions.recurrenceException;
    var {
      startDayHour,
      endDayHour,
      viewStartDayHour,
      viewEndDayHour,
      resources,
      firstDayOfWeek,
      checkIntersectViewport
    } = filterOptions;
    var that = this;
    return [[appointment => {
      var _appointment$visible;

      var appointmentVisible = (_appointment$visible = appointment.visible) !== null && _appointment$visible !== void 0 ? _appointment$visible : true;
      var result = appointmentVisible;
      var startDate = new Date(dataAccessors.getter.startDate(appointment));
      var endDate = new Date(dataAccessors.getter.endDate(appointment));
      var appointmentTakesAllDay = that.appointmentTakesAllDay(appointment, viewStartDayHour, viewEndDayHour);
      var appointmentTakesSeveralDays = that.appointmentTakesSeveralDays(appointment);
      var isAllDay = dataAccessors.getter.allDay(appointment);
      var appointmentIsLong = appointmentTakesSeveralDays || appointmentTakesAllDay;
      var useRecurrence = isDefined(dataAccessors.getter.recurrenceRule);
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

      if (result && isDefined(startDayHour) && (!useRecurrence || !filterOptions.isVirtualScrolling)) {
        result = compareDateWithStartDayHour(comparableStartDate, comparableEndDate, startDayHour, appointmentTakesAllDay, appointmentTakesSeveralDays);
      }

      if (result && isDefined(endDayHour)) {
        result = compareDateWithEndDayHour({
          startDate: comparableStartDate,
          endDate: comparableEndDate,
          startDayHour,
          endDayHour,
          viewStartDayHour,
          viewEndDayHour,
          allDay: appointmentTakesAllDay,
          severalDays: appointmentTakesSeveralDays,
          min,
          max,
          checkIntersectViewport
        });
      }

      if (result && useRecurrence && !recurrenceRule) {
        if (comparableEndDate < min && !isAllDay) {
          result = false;
        }
      }

      return result;
    }]];
  }

  setDataSource(dataSource) {
    this._dataSource = dataSource;
    this.cleanModelState();

    this._initStoreChangeHandlers();

    this._filterMaker && this._filterMaker.clearRegistry();
  }

  _initStoreChangeHandlers() {
    var dataSource = this._dataSource;
    var store = dataSource === null || dataSource === void 0 ? void 0 : dataSource.store();

    if (store) {
      store.on('updating', newItem => {
        this._updatedAppointment = newItem;
      });
      store.on('push', pushItems => {
        var items = dataSource.items();
        var keyName = store.key();
        pushItems.forEach(pushItem => {
          var itemExists = items.filter(item => item[keyName] === pushItem.key).length !== 0;

          if (itemExists) {
            this._updatedAppointmentKeys.push({
              key: keyName,
              value: pushItem.key
            });
          } else {
            var {
              data
            } = pushItem;
            data && items.push(data);
          }
        });
        dataSource.load();
      });
    }
  }

  getUpdatedAppointment() {
    return this._updatedAppointment;
  }

  getUpdatedAppointmentKeys() {
    return this._updatedAppointmentKeys;
  }

  cleanModelState() {
    this._updatedAppointment = null;
    this._updatedAppointmentKeys = [];
  }

  setDataAccessors(dataAccessors) {
    this._dataAccessors = dataAccessors;
    this._filterMaker = new FilterMaker(dataAccessors);
  }

  filterByDate(min, max, remoteFiltering, dateSerializationFormat) {
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
  }

  _combineRemoteFilter(dateSerializationFormat) {
    var combinedFilter = this._filterMaker.combine();

    return this._serializeRemoteFilter(combinedFilter, dateSerializationFormat);
  }

  _serializeRemoteFilter(filter, dateSerializationFormat) {
    if (!Array.isArray(filter)) {
      return filter;
    }

    filter = extend([], filter);
    var startDate = this._dataAccessors.expr.startDateExpr;
    var endDate = this._dataAccessors.expr.endDateExpr;

    if (isString(filter[0])) {
      if (config().forceIsoDateParsing && filter.length > 1) {
        if (filter[0] === startDate || filter[0] === endDate) {
          // TODO: wrap filter value to new Date only necessary for case T838165(details in note)
          filter[filter.length - 1] = dateSerialization.serializeDate(new Date(filter[filter.length - 1]), dateSerializationFormat);
        }
      }
    }

    for (var i = 0; i < filter.length; i++) {
      filter[i] = this._serializeRemoteFilter(filter[i], dateSerializationFormat);
    }

    return filter;
  }

  _createAppointmentFilter(filterOptions, timeZoneCalculator) {
    var combinedFilter = this._createCombinedFilter(filterOptions, timeZoneCalculator);

    if (this._filterMaker.isRegistered()) {
      this._filterMaker.make('user', undefined);

      var trimmedDates = this._trimDates(filterOptions.min, filterOptions.max);

      this._filterMaker.make('date', [trimmedDates.min, trimmedDates.max, true]);

      var dateFilter = this.customizeDateFilter(this._filterMaker.combine(), timeZoneCalculator);
      combinedFilter.push([dateFilter]);
    }

    return combinedFilter;
  }

  filterLoadedAppointments(filterOption, timeZoneCalculator) {
    var combinedFilter = this._createAppointmentFilter(filterOption, timeZoneCalculator);

    return query(this.getPreparedDataItems()).filter(combinedFilter).toArray();
  }

  filterAllDayAppointments(filterOption) {
    var combinedFilter = this._createAllDayAppointmentFilter(filterOption);

    return query(this.getPreparedDataItems()).filter(combinedFilter).toArray();
  }

  getPreparedDataItems() {
    var _this$_dataSource;

    var dataItems = (_this$_dataSource = this._dataSource) === null || _this$_dataSource === void 0 ? void 0 : _this$_dataSource.items();

    if (!dataItems) {
      return [];
    }

    return map(dataItems, item => {
      var startDate = new Date(this._dataAccessors.getter.startDate(item));
      var endDate = new Date(this._dataAccessors.getter.endDate(item));
      this.replaceWrongEndDate(item, startDate, endDate);
      return item;
    });
  }

  replaceWrongEndDate(appointment, startDate, endDate) {
    if (this._isEndDateWrong(startDate, endDate)) {
      var isAllDay = this._dataAccessors.getter.allDay(appointment);

      var calculatedEndDate = this._calculateAppointmentEndDate(isAllDay, startDate);

      this._dataAccessors.setter.endDate(appointment, calculatedEndDate);
    }
  }

  filterLoadedVirtualAppointments(filterOptions, timeZoneCalculator, groupCount) {
    var combinedFilters = [];
    var itemsToFilter = this.getPreparedDataItems();
    var needPreFilter = groupCount > 0;

    if (needPreFilter) {
      itemsToFilter = itemsToFilter.filter(item => {
        for (var i = 0; i < filterOptions.length; ++i) {
          var {
            resources
          } = filterOptions[i];

          if (this._filterAppointmentByResources(item, resources)) {
            return true;
          }
        }
      });
    }

    filterOptions.forEach(filterOption => {
      combinedFilters.length && combinedFilters.push('or');

      var filter = this._createAppointmentFilter(filterOption, timeZoneCalculator);

      combinedFilters.push(filter);
    });
    return query(itemsToFilter).filter(combinedFilters).toArray();
  }

  _trimDates(min, max) {
    var minCopy = dateUtils.trimTime(new Date(min));
    var maxCopy = dateUtils.trimTime(new Date(max));
    maxCopy.setDate(maxCopy.getDate() + 1);
    return {
      min: minCopy,
      max: maxCopy
    };
  }

  hasAllDayAppointments(items, startDayHour, endDayHour) {
    if (!items) {
      return false;
    }

    var that = this;
    var result = false;
    each(items, (index, item) => {
      if (that.appointmentTakesAllDay(item, startDayHour, endDayHour)) {
        result = true;
        return false;
      }
    });
    return result;
  }

  appointmentTakesAllDay(appointment, startDayHour, endDayHour) {
    var dataAccessors = this._dataAccessors;
    var startDate = dataAccessors.getter.startDate(appointment);
    var endDate = dataAccessors.getter.endDate(appointment);
    var allDay = dataAccessors.getter.allDay(appointment);
    return allDay || this._appointmentHasAllDayDuration(startDate, endDate, startDayHour, endDayHour);
  }

  _appointmentHasAllDayDuration(startDate, endDate, startDayHour, endDayHour) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    var dayDuration = 24;

    var appointmentDurationInHours = this._getAppointmentDurationInHours(startDate, endDate);

    return appointmentDurationInHours >= dayDuration || this._appointmentHasShortDayDuration(startDate, endDate, startDayHour, endDayHour);
  }

  _appointmentHasShortDayDuration(startDate, endDate, startDayHour, endDayHour) {
    var appointmentDurationInHours = this._getAppointmentDurationInHours(startDate, endDate);

    var shortDayDurationInHours = endDayHour - startDayHour;
    return appointmentDurationInHours >= shortDayDurationInHours && startDate.getHours() === startDayHour && endDate.getHours() === endDayHour;
  }

  _getAppointmentDurationInHours(startDate, endDate) {
    return (endDate.getTime() - startDate.getTime()) / toMs('hour');
  }

  appointmentTakesSeveralDays(appointment) {
    var dataAccessors = this._dataAccessors;
    var startDate = new Date(dataAccessors.getter.startDate(appointment));
    var endDate = new Date(dataAccessors.getter.endDate(appointment));
    return !dateUtils.sameDate(startDate, endDate);
  }

  customizeDateFilter(dateFilter, timeZoneCalculator) {
    var currentFilter = extend(true, [], dateFilter);
    return (appointment => {
      var startDate = new Date(this._dataAccessors.getter.startDate(appointment));
      var endDate = new Date(this._dataAccessors.getter.endDate(appointment));
      appointment = extend(true, {}, appointment);

      var startDateTimeZone = this._dataAccessors.getter.startDateTimeZone(appointment);

      var endDateTimeZone = this._dataAccessors.getter.endDateTimeZone(appointment);

      var comparableStartDate = timeZoneCalculator.createDate(startDate, {
        appointmentTimeZone: startDateTimeZone,
        path: 'toGrid'
      });
      var comparableEndDate = timeZoneCalculator.createDate(endDate, {
        appointmentTimeZone: endDateTimeZone,
        path: 'toGrid'
      });

      this._dataAccessors.setter.startDate(appointment, comparableStartDate);

      this._dataAccessors.setter.endDate(appointment, comparableEndDate);

      return query([appointment]).filter(currentFilter).toArray().length > 0;
    }).bind(this);
  }

  _calculateAppointmentEndDate(isAllDay, startDate) {
    if (isAllDay) {
      return dateUtils.setToDayEnd(new Date(startDate));
    }

    return new Date(startDate.getTime() + this._baseAppointmentDuration * toMs('minute'));
  }

  _isEndDateWrong(startDate, endDate) {
    return !endDate || isNaN(endDate.getTime()) || startDate.getTime() > endDate.getTime();
  }

  add(rawAppointment) {
    return this._dataSource.store().insert(rawAppointment).done(() => this._dataSource.load());
  }

  update(target, data) {
    var key = this._getStoreKey(target);

    var d = new Deferred();

    this._dataSource.store().update(key, data).done(result => this._dataSource.load().done(() => d.resolve(result)).fail(d.reject)).fail(d.reject);

    return d.promise();
  }

  remove(rawAppointment) {
    var key = this._getStoreKey(rawAppointment);

    return this._dataSource.store().remove(key).done(() => this._dataSource.load());
  }

}

export default AppointmentModel;
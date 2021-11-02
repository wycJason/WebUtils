"use strict";

exports.default = void 0;

var _date = _interopRequireDefault(require("../../../core/utils/date"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var toMs = _date.default.dateToMilliseconds;
var HOUR_MS = toMs('hour');

var AppointmentFilter = /*#__PURE__*/function () {
  function AppointmentFilter(scheduler) {
    this.scheduler = scheduler;
  }

  var _proto = AppointmentFilter.prototype;

  _proto.filter = function filter() {
    return this.filterStrategy.filter();
  };

  _proto.hasAllDayAppointments = function hasAllDayAppointments(appointments) {
    return this.filterStrategy.hasAllDayAppointments(appointments);
  };

  _createClass(AppointmentFilter, [{
    key: "filterStrategy",
    get: function get() {
      return this.scheduler.isVirtualScrolling() ? new AppointmentFilterVirtualStrategy(this.scheduler) : new AppointmentFilterBaseStrategy(this.scheduler);
    }
  }]);

  return AppointmentFilter;
}();

exports.default = AppointmentFilter;

var AppointmentFilterBaseStrategy = /*#__PURE__*/function () {
  function AppointmentFilterBaseStrategy(scheduler) {
    this.scheduler = scheduler;
  }

  var _proto2 = AppointmentFilterBaseStrategy.prototype;

  _proto2.filter = function filter() {
    var dateRange = this.workspace.getDateRange();
    var resources = this.resourcesManager.getResourcesData();
    var allDay;

    if (!this.scheduler.option('showAllDayPanel') && this.workspace.supportAllDayRow()) {
      allDay = false;
    }

    return this.appointmentModel.filterLoadedAppointments({
      startDayHour: this.viewStartDayHour,
      endDayHour: this.viewEndDayHour,
      viewStartDayHour: this.viewStartDayHour,
      viewEndDayHour: this.viewEndDayHour,
      min: dateRange[0],
      max: dateRange[1],
      resources: resources,
      allDay: allDay,
      firstDayOfWeek: this.firstDayOfWeek,
      recurrenceException: this.recurrenceExceptionGenerator
    }, this.timeZoneCalculator);
  };

  _proto2.hasAllDayAppointments = function hasAllDayAppointments(appointments) {
    return this.appointmentModel.hasAllDayAppointments(appointments, this.viewStartDayHour, this.viewEndDayHour);
  };

  _createClass(AppointmentFilterBaseStrategy, [{
    key: "workspace",
    get: function get() {
      return this.scheduler.getWorkSpace();
    }
  }, {
    key: "viewDataProvider",
    get: function get() {
      return this.workspace.viewDataProvider;
    }
  }, {
    key: "resourcesManager",
    get: function get() {
      return this.scheduler._resourcesManager;
    }
  }, {
    key: "appointmentModel",
    get: function get() {
      return this.scheduler.getAppointmentModel();
    }
  }, {
    key: "timeZoneCalculator",
    get: function get() {
      return this.scheduler.timeZoneCalculator;
    }
  }, {
    key: "viewStartDayHour",
    get: function get() {
      return this.scheduler._getCurrentViewOption('startDayHour');
    }
  }, {
    key: "viewEndDayHour",
    get: function get() {
      return this.scheduler._getCurrentViewOption('endDayHour');
    }
  }, {
    key: "firstDayOfWeek",
    get: function get() {
      return this.scheduler.getFirstDayOfWeek();
    }
  }, {
    key: "recurrenceExceptionGenerator",
    get: function get() {
      return this.scheduler._getRecurrenceException.bind(this.scheduler);
    }
  }]);

  return AppointmentFilterBaseStrategy;
}();

var AppointmentFilterVirtualStrategy = /*#__PURE__*/function (_AppointmentFilterBas) {
  _inheritsLoose(AppointmentFilterVirtualStrategy, _AppointmentFilterBas);

  function AppointmentFilterVirtualStrategy(scheduler) {
    return _AppointmentFilterBas.call(this, scheduler) || this;
  }

  var _proto3 = AppointmentFilterVirtualStrategy.prototype;

  _proto3.filter = function filter() {
    var _this = this;

    var isCalculateStartAndEndDayHour = this.workspace.isDateAndTimeView;
    var checkIntersectViewport = this.workspace.isDateAndTimeView && this.workspace.viewDirection === 'horizontal';
    var isAllDayWorkspace = !this.workspace.supportAllDayRow();
    var showAllDayAppointments = this.scheduler.option('showAllDayPanel') || isAllDayWorkspace;
    var endViewDate = this.workspace.getEndViewDateByEndDayHour();
    var filterOptions = [];
    var groupsInfo = this.viewDataProvider.getCompletedGroupsInfo();
    groupsInfo.forEach(function (item) {
      var groupIndex = item.groupIndex;
      var groupStartDate = item.startDate;
      var groupEndDate = new Date(Math.min(item.endDate, endViewDate));
      var startDayHour = isCalculateStartAndEndDayHour ? groupStartDate.getHours() : _this.viewStartDayHour;
      var endDayHour = isCalculateStartAndEndDayHour ? startDayHour + groupStartDate.getMinutes() / 60 + (groupEndDate - groupStartDate) / HOUR_MS : _this.viewEndDayHour;

      var resources = _this._getPrerenderFilterResources(groupIndex);

      var allDayPanel = _this.viewDataProvider.getAllDayPanel(groupIndex); // TODO split by workspace strategies


      var supportAllDayAppointment = isAllDayWorkspace || !!showAllDayAppointments && (allDayPanel === null || allDayPanel === void 0 ? void 0 : allDayPanel.length) > 0;
      filterOptions.push({
        isVirtualScrolling: true,
        startDayHour: startDayHour,
        endDayHour: endDayHour,
        viewStartDayHour: _this.viewStartDayHour,
        viewEndDayHour: _this.viewEndDayHour,
        min: groupStartDate,
        max: groupEndDate,
        allDay: supportAllDayAppointment,
        resources: resources,
        firstDayOfWeek: _this.firstDayOfWeek,
        recurrenceException: _this.recurrenceExceptionGenerator,
        checkIntersectViewport: checkIntersectViewport
      });
    });
    return this.appointmentModel.filterLoadedVirtualAppointments(filterOptions, this.timeZoneCalculator, this.workspace._getGroupCount());
  };

  _proto3.hasAllDayAppointments = function hasAllDayAppointments() {
    return this.appointmentModel.filterAllDayAppointments({
      viewStartDayHour: this.viewStartDayHour,
      viewEndDayHour: this.viewEndDayHour
    }).length > 0;
  };

  _proto3._getPrerenderFilterResources = function _getPrerenderFilterResources(groupIndex) {
    var cellGroup = this.viewDataProvider.getCellsGroup(groupIndex);
    return this.resourcesManager.getResourcesDataByGroups([cellGroup]);
  };

  return AppointmentFilterVirtualStrategy;
}(AppointmentFilterBaseStrategy);

module.exports = exports.default;
module.exports.default = exports.default;
import dateUtils from '../../../core/utils/date';
var toMs = dateUtils.dateToMilliseconds;
var HOUR_MS = toMs('hour');
export default class AppointmentFilter {
  constructor(scheduler) {
    this.scheduler = scheduler;
  }

  get filterStrategy() {
    return this.scheduler.isVirtualScrolling() ? new AppointmentFilterVirtualStrategy(this.scheduler) : new AppointmentFilterBaseStrategy(this.scheduler);
  }

  filter() {
    return this.filterStrategy.filter();
  }

  hasAllDayAppointments(appointments) {
    return this.filterStrategy.hasAllDayAppointments(appointments);
  }

}

class AppointmentFilterBaseStrategy {
  constructor(scheduler) {
    this.scheduler = scheduler;
  }

  get workspace() {
    return this.scheduler.getWorkSpace();
  }

  get viewDataProvider() {
    return this.workspace.viewDataProvider;
  }

  get resourcesManager() {
    return this.scheduler._resourcesManager;
  }

  get appointmentModel() {
    return this.scheduler.getAppointmentModel();
  }

  get timeZoneCalculator() {
    return this.scheduler.timeZoneCalculator;
  }

  get viewStartDayHour() {
    return this.scheduler._getCurrentViewOption('startDayHour');
  }

  get viewEndDayHour() {
    return this.scheduler._getCurrentViewOption('endDayHour');
  }

  get firstDayOfWeek() {
    return this.scheduler.getFirstDayOfWeek();
  }

  get recurrenceExceptionGenerator() {
    return this.scheduler._getRecurrenceException.bind(this.scheduler);
  }

  filter() {
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
  }

  hasAllDayAppointments(appointments) {
    return this.appointmentModel.hasAllDayAppointments(appointments, this.viewStartDayHour, this.viewEndDayHour);
  }

}

class AppointmentFilterVirtualStrategy extends AppointmentFilterBaseStrategy {
  constructor(scheduler) {
    super(scheduler);
  }

  filter() {
    var isCalculateStartAndEndDayHour = this.workspace.isDateAndTimeView;
    var checkIntersectViewport = this.workspace.isDateAndTimeView && this.workspace.viewDirection === 'horizontal';
    var isAllDayWorkspace = !this.workspace.supportAllDayRow();
    var showAllDayAppointments = this.scheduler.option('showAllDayPanel') || isAllDayWorkspace;
    var endViewDate = this.workspace.getEndViewDateByEndDayHour();
    var filterOptions = [];
    var groupsInfo = this.viewDataProvider.getCompletedGroupsInfo();
    groupsInfo.forEach(item => {
      var groupIndex = item.groupIndex;
      var groupStartDate = item.startDate;
      var groupEndDate = new Date(Math.min(item.endDate, endViewDate));
      var startDayHour = isCalculateStartAndEndDayHour ? groupStartDate.getHours() : this.viewStartDayHour;
      var endDayHour = isCalculateStartAndEndDayHour ? startDayHour + groupStartDate.getMinutes() / 60 + (groupEndDate - groupStartDate) / HOUR_MS : this.viewEndDayHour;

      var resources = this._getPrerenderFilterResources(groupIndex);

      var allDayPanel = this.viewDataProvider.getAllDayPanel(groupIndex); // TODO split by workspace strategies

      var supportAllDayAppointment = isAllDayWorkspace || !!showAllDayAppointments && (allDayPanel === null || allDayPanel === void 0 ? void 0 : allDayPanel.length) > 0;
      filterOptions.push({
        isVirtualScrolling: true,
        startDayHour,
        endDayHour,
        viewStartDayHour: this.viewStartDayHour,
        viewEndDayHour: this.viewEndDayHour,
        min: groupStartDate,
        max: groupEndDate,
        allDay: supportAllDayAppointment,
        resources,
        firstDayOfWeek: this.firstDayOfWeek,
        recurrenceException: this.recurrenceExceptionGenerator,
        checkIntersectViewport
      });
    });
    return this.appointmentModel.filterLoadedVirtualAppointments(filterOptions, this.timeZoneCalculator, this.workspace._getGroupCount());
  }

  hasAllDayAppointments() {
    return this.appointmentModel.filterAllDayAppointments({
      viewStartDayHour: this.viewStartDayHour,
      viewEndDayHour: this.viewEndDayHour
    }).length > 0;
  }

  _getPrerenderFilterResources(groupIndex) {
    var cellGroup = this.viewDataProvider.getCellsGroup(groupIndex);
    return this.resourcesManager.getResourcesDataByGroups([cellGroup]);
  }

}
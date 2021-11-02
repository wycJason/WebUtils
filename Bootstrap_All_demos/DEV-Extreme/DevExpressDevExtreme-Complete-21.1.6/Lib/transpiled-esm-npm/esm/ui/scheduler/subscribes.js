import $ from '../../core/renderer';
import { wrapToArray, inArray } from '../../core/utils/array';
import { isDefined, isPlainObject } from '../../core/utils/type';
import dateUtils from '../../core/utils/date';
import { each } from '../../core/utils/iterator';
import errors from '../widget/ui.errors';
import { locate } from '../../animation/translator';
import { grep } from '../../core/utils/common';
import { extend } from '../../core/utils/extend';
import { Deferred } from '../../core/utils/deferred';
import dateLocalization from '../../localization/date';
import timeZoneUtils from './utils.timeZone';
import { AGENDA_LAST_IN_DATE_APPOINTMENT_CLASS } from './constants';
import utils from './utils';
import { getFieldExpr as getResourceFieldExpr } from './resources/utils';
var toMs = dateUtils.dateToMilliseconds;
var subscribes = {
  getTimeZoneCalculator: function getTimeZoneCalculator() {
    return this.timeZoneCalculator;
  },
  isCurrentViewAgenda: function isCurrentViewAgenda() {
    return this.option('currentView') === 'agenda';
  },
  currentViewUpdated: function currentViewUpdated(currentView) {
    this.option('currentView', currentView);
  },
  currentDateUpdated: function currentDateUpdated(date) {
    this.option('currentDate', date);
  },
  getOption: function getOption(name) {
    return this.option(name);
  },
  isVirtualScrolling: function isVirtualScrolling() {
    return this.isVirtualScrolling();
  },
  setCellDataCacheAlias: function setCellDataCacheAlias(appointment, geometry) {
    this._workSpace.setCellDataCacheAlias(appointment, geometry);
  },
  createAppointmentSettings: function createAppointmentSettings(appointment) {
    return this._getAppointmentSettingsGenerator().create(appointment);
  },
  isGroupedByDate: function isGroupedByDate() {
    return this.getWorkSpace().isGroupedByDate();
  },
  showAppointmentTooltip: function showAppointmentTooltip(options) {
    var targetedAppointment = this.getTargetedAppointment(options.data, options.target);
    this.showAppointmentTooltip(options.data, options.target, targetedAppointment);
  },
  hideAppointmentTooltip: function hideAppointmentTooltip() {
    this.hideAppointmentTooltip();
  },
  showAddAppointmentPopup: function showAddAppointmentPopup(cellData, cellGroups) {
    var appointmentAdapter = this.createAppointmentAdapter({});
    appointmentAdapter.allDay = cellData.allDay;
    appointmentAdapter.startDate = this.timeZoneCalculator.createDate(cellData.startDate, {
      path: 'fromGrid'
    });
    appointmentAdapter.endDate = this.timeZoneCalculator.createDate(cellData.endDate, {
      path: 'fromGrid'
    });
    var resultAppointment = extend(appointmentAdapter.source(), cellGroups);
    this.showAppointmentPopup(resultAppointment, true);
  },
  showEditAppointmentPopup: function showEditAppointmentPopup(options) {
    var targetedData = this.getTargetedAppointment(options.data, options.target);
    this.showAppointmentPopup(options.data, false, targetedData);
  },
  updateAppointmentAfterResize: function updateAppointmentAfterResize(options) {
    var info = utils.dataAccessors.getAppointmentInfo(options.$appointment);
    var exceptionDate = info.sourceAppointment.exceptionDate;

    this._checkRecurringAppointment(options.target, options.data, exceptionDate, function () {
      this._updateAppointment(options.target, options.data, function () {
        this._appointments.moveAppointmentBack();
      });
    }.bind(this));
  },
  getUpdatedData: function getUpdatedData(rawAppointment) {
    return this._getUpdatedData(rawAppointment);
  },
  updateAppointmentAfterDrag: function updateAppointmentAfterDrag(_ref) {
    var {
      event,
      element,
      rawAppointment,
      coordinates
    } = _ref;
    var info = utils.dataAccessors.getAppointmentInfo(element);
    var appointment = this.createAppointmentAdapter(rawAppointment);
    var targetedAppointment = this.createAppointmentAdapter(extend({}, rawAppointment, this._getUpdatedData(rawAppointment)));
    var targetedRawAppointment = targetedAppointment.source();

    var newCellIndex = this._workSpace.getDroppableCellIndex();

    var oldCellIndex = this._workSpace.getCellIndexByCoordinates(coordinates);

    var becomeAllDay = targetedAppointment.allDay;
    var wasAllDay = appointment.allDay;
    var movedBetweenAllDayAndSimple = this._workSpace.supportAllDayRow() && (wasAllDay && !becomeAllDay || !wasAllDay && becomeAllDay);

    if (newCellIndex !== oldCellIndex || movedBetweenAllDayAndSimple) {
      this._checkRecurringAppointment(rawAppointment, targetedRawAppointment, info.sourceAppointment.exceptionDate, function () {
        this._updateAppointment(rawAppointment, targetedRawAppointment, function () {
          this._appointments.moveAppointmentBack(event);
        }, event);
      }.bind(this), undefined, undefined, event);
    } else {
      this._appointments.moveAppointmentBack(event);
    }
  },
  onDeleteButtonPress: function onDeleteButtonPress(options) {
    var targetedData = this.getTargetedAppointment(options.data, $(options.target));
    this.checkAndDeleteAppointment(options.data, targetedData);
    this.hideAppointmentTooltip();
  },
  getAppointmentColor: function getAppointmentColor(options) {
    var resourcesManager = this._resourcesManager;
    var resourceForPainting = resourcesManager.getResourceForPainting(this._getCurrentViewOption('groups'));
    var response = new Deferred().resolve().promise();

    if (resourceForPainting) {
      var field = getResourceFieldExpr(resourceForPainting);
      var groupIndex = options.groupIndex;

      var groups = this._workSpace._getCellGroups(groupIndex);

      var resourceValues = wrapToArray(resourcesManager.getDataAccessors(field, 'getter')(options.itemData));
      var groupId = resourceValues.length ? resourceValues[0] : undefined;

      for (var i = 0; i < groups.length; i++) {
        if (groups[i].name === field) {
          groupId = groups[i].id;
          break;
        }
      }

      response = resourcesManager.getResourceColor(field, groupId);
    }

    return response;
  },
  getHeaderHeight: function getHeaderHeight() {
    return this._header._$element && parseInt(this._header._$element.outerHeight(), 10);
  },
  getResourcesFromItem: function getResourcesFromItem(itemData) {
    return this._resourcesManager.getResourcesFromItem(itemData);
  },
  appointmentTakesSeveralDays: function appointmentTakesSeveralDays(appointment) {
    return this._appointmentModel.appointmentTakesSeveralDays(appointment);
  },

  getTextAndFormatDate(appointmentRaw, targetedAppointmentRaw, format) {
    // TODO: rename to createFormattedDateText
    var appointmentAdapter = this.createAppointmentAdapter(appointmentRaw);
    var targetedAdapter = this.createAppointmentAdapter(targetedAppointmentRaw || appointmentRaw); // TODO pull out time zone converting from appointment adapter for knockout(T947938)

    var startDate = this.timeZoneCalculator.createDate(targetedAdapter.startDate, {
      path: 'toGrid'
    });
    var endDate = this.timeZoneCalculator.createDate(targetedAdapter.endDate, {
      path: 'toGrid'
    });
    var formatType = format || this.fire('_getTypeFormat', startDate, endDate, targetedAdapter.allDay);
    return {
      text: targetedAdapter.text || appointmentAdapter.text,
      formatDate: this.fire('_formatDates', startDate, endDate, formatType)
    };
  },

  _getTypeFormat(startDate, endDate, isAllDay) {
    if (isAllDay) {
      return 'DATE';
    }

    if (this.option('currentView') !== 'month' && dateUtils.sameDate(startDate, endDate)) {
      return 'TIME';
    }

    return 'DATETIME';
  },

  _createAppointmentTitle(data) {
    if (isPlainObject(data)) {
      return data.text;
    }

    return String(data);
  },

  _formatDates(startDate, endDate, formatType) {
    var dateFormat = 'monthandday';
    var timeFormat = 'shorttime';
    var isSameDate = startDate.getDate() === endDate.getDate();

    switch (formatType) {
      case 'DATETIME':
        return [dateLocalization.format(startDate, dateFormat), ' ', dateLocalization.format(startDate, timeFormat), ' - ', isSameDate ? '' : dateLocalization.format(endDate, dateFormat) + ' ', dateLocalization.format(endDate, timeFormat)].join('');

      case 'TIME':
        return "".concat(dateLocalization.format(startDate, timeFormat), " - ").concat(dateLocalization.format(endDate, timeFormat));

      case 'DATE':
        return "".concat(dateLocalization.format(startDate, dateFormat)).concat(isSameDate ? '' : ' - ' + dateLocalization.format(endDate, dateFormat));
    }
  },

  getResizableAppointmentArea: function getResizableAppointmentArea(options) {
    var allDay = options.allDay;

    var groups = this._getCurrentViewOption('groups');

    if (groups && groups.length) {
      if (allDay || this.getLayoutManager().getRenderingStrategyInstance()._needHorizontalGroupBounds()) {
        var horizontalGroupBounds = this._workSpace.getGroupBounds(options.coordinates);

        return {
          left: horizontalGroupBounds.left,
          right: horizontalGroupBounds.right,
          top: 0,
          bottom: 0
        };
      }

      if (this.getLayoutManager().getRenderingStrategyInstance()._needVerticalGroupBounds(allDay) && this._workSpace._isVerticalGroupedWorkSpace()) {
        var verticalGroupBounds = this._workSpace.getGroupBounds(options.coordinates);

        return {
          left: 0,
          right: 0,
          top: verticalGroupBounds.top,
          bottom: verticalGroupBounds.bottom
        };
      }
    }
  },
  needRecalculateResizableArea: function needRecalculateResizableArea() {
    return this.getWorkSpace().needRecalculateResizableArea();
  },
  getAppointmentGeometry: function getAppointmentGeometry(settings) {
    return this.getLayoutManager().getRenderingStrategyInstance().getAppointmentGeometry(settings);
  },
  isAllDay: function isAllDay(appointmentData) {
    return this.getLayoutManager().getRenderingStrategyInstance().isAllDay(appointmentData);
  },
  getDeltaTime: function getDeltaTime(e, initialSize, itemData) {
    return this.getLayoutManager().getRenderingStrategyInstance().getDeltaTime(e, initialSize, itemData);
  },
  getDropDownAppointmentWidth: function getDropDownAppointmentWidth(isAllDay) {
    return this.getLayoutManager().getRenderingStrategyInstance().getDropDownAppointmentWidth(this._getViewCountConfig().intervalCount, isAllDay);
  },
  getDropDownAppointmentHeight: function getDropDownAppointmentHeight() {
    return this.getLayoutManager().getRenderingStrategyInstance().getDropDownAppointmentHeight();
  },
  getCellWidth: function getCellWidth() {
    return this.getWorkSpace().getCellWidth();
  },
  getCellHeight: function getCellHeight() {
    return this.getWorkSpace().getCellHeight();
  },
  getResizableStep: function getResizableStep() {
    var workSpace = this.getWorkSpace();
    var cellWidth = workSpace.getCellWidth();

    if (workSpace.isGroupedByDate()) {
      return workSpace._getGroupCount() * cellWidth;
    }

    return cellWidth;
  },
  getRenderingStrategy: function getRenderingStrategy() {
    return this._getAppointmentsRenderingStrategy();
  },
  getMaxAppointmentCountPerCellByType: function getMaxAppointmentCountPerCellByType(isAllDay) {
    return this.getRenderingStrategyInstance()._getMaxAppointmentCountPerCellByType(isAllDay);
  },
  needCorrectAppointmentDates: function needCorrectAppointmentDates() {
    return this.getRenderingStrategyInstance().needCorrectAppointmentDates();
  },
  getRenderingStrategyDirection: function getRenderingStrategyDirection() {
    return this.getRenderingStrategyInstance().getDirection();
  },
  getWorkSpaceDateTableOffset: function getWorkSpaceDateTableOffset() {
    return this.getWorkSpaceDateTableOffset();
  },
  getFullWeekAppointmentWidth: function getFullWeekAppointmentWidth(options) {
    var groupIndex = options.groupIndex;
    return this._workSpace.getGroupWidth(groupIndex);
  },
  getMaxAppointmentWidth: function getMaxAppointmentWidth(options) {
    var workSpace = this._workSpace;
    return workSpace.getCellCountToLastViewDate(options.date) * workSpace.getCellWidth();
  },
  updateAppointmentStartDate: function updateAppointmentStartDate(options) {
    var appointment = options.appointment;

    var firstViewDate = this._workSpace.getStartViewDate();

    var startDate = new Date(options.startDate);

    var startDayHour = this._getCurrentViewOption('startDayHour');

    var updatedStartDate;

    if (this.appointmentTakesAllDay(appointment)) {
      updatedStartDate = dateUtils.normalizeDate(startDate, firstViewDate);
    } else {
      if (startDate < firstViewDate) {
        startDate = firstViewDate;
      }

      updatedStartDate = dateUtils.normalizeDate(options.startDate, new Date(startDate));
    }

    return dateUtils.roundDateByStartDayHour(updatedStartDate, startDayHour);
  },
  updateAppointmentEndDate: function updateAppointmentEndDate(options) {
    var endDate = options.endDate;

    var endDayHour = this._getCurrentViewOption('endDayHour');

    var startDayHour = this._getCurrentViewOption('startDayHour');

    var updatedEndDate = endDate;

    if (endDate.getHours() >= endDayHour) {
      updatedEndDate.setHours(endDayHour, 0, 0, 0);
    } else if (!options.isSameDate && startDayHour > 0 && endDate.getHours() * 60 + endDate.getMinutes() < startDayHour * 60) {
      updatedEndDate = new Date(updatedEndDate.getTime() - toMs('day'));
      updatedEndDate.setHours(endDayHour, 0, 0, 0);
    }

    return updatedEndDate;
  },
  renderCompactAppointments: function renderCompactAppointments(options) {
    this._compactAppointmentsHelper.render(options);
  },
  clearCompactAppointments: function clearCompactAppointments() {
    this._compactAppointmentsHelper.clear();
  },
  supportCompactDropDownAppointments: function supportCompactDropDownAppointments() {
    return this._workSpace._supportCompactDropDownAppointments();
  },
  isApplyCompactAppointmentOffset: function isApplyCompactAppointmentOffset() {
    return this._workSpace._isApplyCompactAppointmentOffset();
  },
  getGroupCount: function getGroupCount() {
    return this._workSpace._getGroupCount();
  },
  mapAppointmentFields: function mapAppointmentFields(config) {
    var {
      itemData,
      itemElement,
      targetedAppointment
    } = config;
    var targetedData = targetedAppointment || this.getTargetedAppointment(itemData, itemElement);
    return {
      appointmentData: config.itemData,
      appointmentElement: config.itemElement,
      targetedAppointmentData: targetedData
    };
  },
  getOffsetByAllDayPanel: function getOffsetByAllDayPanel(groupIndex) {
    return this._workSpace._getOffsetByAllDayPanel(groupIndex);
  },
  getGroupTop: function getGroupTop(groupIndex) {
    return this._workSpace._getGroupTop(groupIndex);
  },
  updateResizableArea: function updateResizableArea() {
    var $allResizableElements = this.$element().find('.dx-scheduler-appointment.dx-resizable');
    var horizontalResizables = grep($allResizableElements, function (el) {
      var $el = $(el);
      var resizableInst = $el.dxResizable('instance');
      var area = resizableInst.option('area');
      return inArray(resizableInst.option('handles'), ['right left', 'left right']) > -1 && isPlainObject(area);
    });
    each(horizontalResizables, function (_, el) {
      var $el = $(el);
      var position = locate($el);

      var appointmentData = this._appointments._getItemData($el);

      var area = this._appointments._calculateResizableArea({
        left: position.left
      }, appointmentData);

      $el.dxResizable('instance').option('area', area);
    }.bind(this));
  },
  getField: function getField(field, obj) {
    if (!isDefined(this._dataAccessors.getter[field])) {
      return;
    }

    return this._dataAccessors.getter[field](obj);
  },
  setField: function setField(field, obj, value) {
    if (!isDefined(this._dataAccessors.setter[field])) {
      return;
    }

    var splitExprStr = this.option(field + 'Expr').split('.');
    var rootField = splitExprStr[0];

    if (obj[rootField] === undefined && splitExprStr.length > 1) {
      var emptyChain = function (arr) {
        var result = {};
        var tmp = result;
        var arrLength = arr.length - 1;

        for (var i = 1; i < arrLength; i++) {
          tmp = tmp[arr[i]] = {};
        }

        return result;
      }(splitExprStr);

      obj[rootField] = emptyChain;
    }

    this._dataAccessors.setter[field](obj, value);

    return obj;
  },
  renderAppointments: function renderAppointments() {
    this._renderAppointments();
  },
  dayHasAppointment: function dayHasAppointment(day, appointment, trimTime) {
    return this.dayHasAppointment(day, appointment, trimTime);
  },
  createResourcesTree: function createResourcesTree() {
    return this._resourcesManager.createResourcesTree(this._loadedResources);
  },
  getResourceTreeLeaves: function getResourceTreeLeaves(tree, appointmentResources) {
    return this._resourcesManager.getResourceTreeLeaves(tree, appointmentResources);
  },
  createReducedResourcesTree: function createReducedResourcesTree() {
    var tree = this._resourcesManager.createResourcesTree(this._loadedResources);

    return this._resourcesManager.reduceResourcesTree(tree, this.getFilteredItems());
  },
  groupAppointmentsByResources: function groupAppointmentsByResources(appointments) {
    var result = {
      '0': appointments
    };

    var groups = this._getCurrentViewOption('groups');

    if (groups && groups.length && this._resourcesManager.getResourcesData().length) {
      result = this._resourcesManager.groupAppointmentsByResources(appointments, this._loadedResources);
    }

    var totalResourceCount = 0;
    each(this._loadedResources, function (i, resource) {
      if (!i) {
        totalResourceCount = resource.items.length;
      } else {
        totalResourceCount *= resource.items.length;
      }
    });

    for (var j = 0; j < totalResourceCount; j++) {
      var index = j.toString();

      if (result[index]) {
        continue;
      }

      result[index] = [];
    }

    return result;
  },
  getLayoutManager: function getLayoutManager() {
    return this._layoutManager;
  },
  getAgendaVerticalStepHeight: function getAgendaVerticalStepHeight() {
    return this.getWorkSpace().getAgendaVerticalStepHeight();
  },
  getAgendaDuration: function getAgendaDuration() {
    return this._getCurrentViewOption('agendaDuration');
  },
  getStartViewDate: function getStartViewDate() {
    return this.getStartViewDate();
  },
  getEndViewDate: function getEndViewDate() {
    return this.getEndViewDate();
  },
  getMaxAppointmentsPerCell: function getMaxAppointmentsPerCell() {
    return this.getMaxAppointmentsPerCell();
  },
  forceMaxAppointmentPerCell: function forceMaxAppointmentPerCell() {
    return this.forceMaxAppointmentPerCell();
  },
  onAgendaReady: function onAgendaReady(rows) {
    var $appts = this.getAppointmentsInstance()._itemElements();

    var total = 0;

    var applyClass = function applyClass(_, count) {
      var index = count + total - 1;
      $appts.eq(index).addClass(AGENDA_LAST_IN_DATE_APPOINTMENT_CLASS);
      total += count;
    };

    for (var i = 0; i < rows.length; i++) {
      each(rows[i], applyClass);
    }
  },
  getTimezone: function getTimezone() {
    return this._getTimezoneOffsetByOption();
  },
  getTargetedAppointmentData: function getTargetedAppointmentData(appointment, element) {
    return this.getTargetedAppointment(appointment, element);
  },
  getAppointmentDurationInMs: function getAppointmentDurationInMs(options) {
    var startDate = options.startDate;
    var endDate = options.endDate;
    var allDay = options.allDay;
    var appointmentDuration = endDate.getTime() - startDate.getTime();
    var dayDuration = toMs('day');

    var visibleDayDuration = this._workSpace.getVisibleDayDuration();

    var result = 0;

    if (allDay) {
      var ceilQuantityOfDays = Math.ceil(appointmentDuration / dayDuration);
      result = ceilQuantityOfDays * visibleDayDuration;
    } else {
      var isDifferentDates = !timeZoneUtils.isSameAppointmentDates(startDate, endDate);
      var floorQuantityOfDays = Math.floor(appointmentDuration / dayDuration);
      var tailDuration;

      if (isDifferentDates) {
        var startDateEndHour = new Date(new Date(startDate).setHours(this.option('endDayHour'), 0, 0));
        var hiddenDayDuration = dayDuration - visibleDayDuration - (startDate.getTime() > startDateEndHour.getTime() ? startDate.getTime() - startDateEndHour.getTime() : 0);
        tailDuration = appointmentDuration - (floorQuantityOfDays ? floorQuantityOfDays * dayDuration : hiddenDayDuration);
        var startDayTime = this.option('startDayHour') * toMs('hour');
        var endPartDuration = endDate - dateUtils.trimTime(endDate);

        if (endPartDuration < startDayTime) {
          if (floorQuantityOfDays) {
            tailDuration -= hiddenDayDuration;
          }

          tailDuration += startDayTime - endPartDuration;
        }
      } else {
        tailDuration = appointmentDuration % dayDuration;
      }

      if (tailDuration > visibleDayDuration) {
        tailDuration = visibleDayDuration;
      }

      result = floorQuantityOfDays * visibleDayDuration + tailDuration || toMs('minute');
    }

    return result;
  },
  replaceWrongEndDate: function replaceWrongEndDate(appointment, startDate, endDate) {
    this._appointmentModel.replaceWrongEndDate(appointment, startDate, endDate);
  },
  calculateAppointmentEndDate: function calculateAppointmentEndDate(isAllDay, startDate) {
    return this._appointmentModel._calculateAppointmentEndDate(isAllDay, startDate);
  },
  getEndDayHour: function getEndDayHour() {
    return this._workSpace.option('endDayHour') || this.option('endDayHour');
  },
  getStartDayHour: function getStartDayHour() {
    return this._workSpace.option('startDayHour') || this.option('startDayHour');
  },
  isAdaptive: function isAdaptive() {
    return this.option('adaptivityEnabled');
  },
  validateDayHours: function validateDayHours() {
    var endDayHour = this._getCurrentViewOption('endDayHour');

    var startDayHour = this._getCurrentViewOption('startDayHour');

    if (startDayHour >= endDayHour) {
      throw errors.Error('E1058');
    }
  },
  removeDroppableCellClass: function removeDroppableCellClass() {
    this._workSpace.removeDroppableCellClass();
  }
};
export default subscribes;
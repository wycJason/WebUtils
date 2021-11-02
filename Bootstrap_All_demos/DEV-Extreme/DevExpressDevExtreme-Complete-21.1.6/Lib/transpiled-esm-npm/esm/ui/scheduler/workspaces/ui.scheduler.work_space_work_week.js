import registerComponent from '../../../core/component_registrator';
import dateUtils from '../../../core/utils/date';
import { isDataOnWeekend, getWeekendsCount, getFirstDayOfWeek, getFirstViewDate } from './utils/work_week';
import SchedulerWorkSpaceWeek from './ui.scheduler.work_space_week';
var toMs = dateUtils.dateToMilliseconds;
var WORK_WEEK_CLASS = 'dx-scheduler-work-space-work-week';
var dayIndexes = [1, 2, 3, 4, 5];
var weekCounter = 0;

class SchedulerWorkSpaceWorkWeek extends SchedulerWorkSpaceWeek {
  constructor() {
    super(...arguments);
    this._isSkippedData = isDataOnWeekend;
    this._getWeekendsCount = getWeekendsCount;
  }

  _getElementClass() {
    return WORK_WEEK_CLASS;
  }

  _getCellCount() {
    return 5 * this.option('intervalCount');
  }

  _firstDayOfWeek() {
    return getFirstDayOfWeek(this.option('firstDayOfWeek'));
  }

  _getDateByIndex(headerIndex) {
    var resultDate = new Date(this._firstViewDate);

    if (headerIndex % this._getCellCount() === 0) {
      weekCounter = 0;
    }

    resultDate.setDate(this._firstViewDate.getDate() + headerIndex + weekCounter);
    var index = resultDate.getDay();

    while (dayIndexes.indexOf(index) === -1) {
      resultDate.setDate(resultDate.getDate() + 1);
      index = resultDate.getDay();
      weekCounter++;
    }

    return resultDate;
  }

  _renderView() {
    weekCounter = 0;

    super._renderView();
  }

  _setFirstViewDate() {
    this._firstViewDate = getFirstViewDate(this._getViewStartByOptions(), this._firstDayOfWeek());

    this._setStartDayHour(this._firstViewDate);
  }

  _getOffsetByCount(cellIndex) {
    var cellsInGroup = this._getCellCount();

    var inGroup = Math.floor(cellIndex / cellsInGroup);
    cellIndex = cellIndex - cellsInGroup * inGroup;
    var weekendCount = Math.floor(cellIndex / 5);
    return toMs('day') * weekendCount * 2;
  }

}

registerComponent('dxSchedulerWorkSpaceWorkWeek', SchedulerWorkSpaceWorkWeek);
export default SchedulerWorkSpaceWorkWeek;
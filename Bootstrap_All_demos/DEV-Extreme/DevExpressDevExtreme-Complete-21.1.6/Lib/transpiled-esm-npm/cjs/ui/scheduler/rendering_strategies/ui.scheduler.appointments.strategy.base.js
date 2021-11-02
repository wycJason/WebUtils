"use strict";

exports.default = void 0;

var _uiSchedulerAppointmentsPositioningStrategy = _interopRequireDefault(require("./ui.scheduler.appointmentsPositioning.strategy.base"));

var _uiSchedulerAppointmentsPositioningStrategy2 = _interopRequireDefault(require("./ui.scheduler.appointmentsPositioning.strategy.adaptive"));

var _extend = require("../../../core/utils/extend");

var _date = _interopRequireDefault(require("../../../core/utils/date"));

var _type = require("../../../core/utils/type");

var _themes = require("../../themes");

var _utils = _interopRequireDefault(require("../utils.timeZone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var toMs = _date.default.dateToMilliseconds;
var APPOINTMENT_MIN_SIZE = 2;
var APPOINTMENT_DEFAULT_HEIGHT = 20;
var COMPACT_THEME_APPOINTMENT_DEFAULT_HEIGHT = 18;
var DROP_DOWN_BUTTON_ADAPTIVE_SIZE = 28;

var BaseRenderingStrategy = /*#__PURE__*/function () {
  function BaseRenderingStrategy(instance) {
    this.instance = instance;

    this._initPositioningStrategy();
  }

  var _proto = BaseRenderingStrategy.prototype;

  _proto._isAdaptive = function _isAdaptive() {
    return this.instance.fire('isAdaptive');
  };

  _proto._correctCollectorCoordinatesInAdaptive = function _correctCollectorCoordinatesInAdaptive(coordinates, isAllDay) {
    coordinates.top = coordinates.top + this.getCollectorTopOffset(isAllDay);
    coordinates.left = coordinates.left + this.getCollectorLeftOffset();
  };

  _proto._initPositioningStrategy = function _initPositioningStrategy() {
    this._positioningStrategy = this._isAdaptive() ? new _uiSchedulerAppointmentsPositioningStrategy2.default(this) : new _uiSchedulerAppointmentsPositioningStrategy.default(this);
  };

  _proto.getPositioningStrategy = function getPositioningStrategy() {
    return this._positioningStrategy;
  };

  _proto.getAppointmentMinSize = function getAppointmentMinSize() {
    return APPOINTMENT_MIN_SIZE;
  };

  _proto.keepAppointmentSettings = function keepAppointmentSettings() {
    return false;
  };

  _proto.getDeltaTime = function getDeltaTime() {};

  _proto.getAppointmentGeometry = function getAppointmentGeometry(coordinates) {
    return coordinates;
  };

  _proto.needCorrectAppointmentDates = function needCorrectAppointmentDates() {
    return true;
  };

  _proto.getDirection = function getDirection() {
    return 'horizontal';
  };

  _proto.createTaskPositionMap = function createTaskPositionMap(items) {
    delete this._maxAppointmentCountPerCell;
    var length = items && items.length;
    if (!length) return;
    this._defaultWidth = this.instance.fire('getCellWidth');
    this._defaultHeight = this.instance.fire('getCellHeight');
    this._allDayHeight = this.instance._allDayCellHeight;
    var map = [];

    for (var i = 0; i < length; i++) {
      var coordinates = this._getItemPosition(items[i]);

      if (coordinates.length && this._isRtl()) {
        coordinates = this._correctRtlCoordinates(coordinates);
      }

      map.push(coordinates);
    }

    var positionArray = this._getSortedPositions(map);

    var resultPositions = this._getResultPositions(positionArray);

    return this._getExtendedPositionMap(map, resultPositions);
  };

  _proto._getDeltaWidth = function _getDeltaWidth(args, initialSize) {
    var intervalWidth = this.instance.fire('getResizableStep') || this.getAppointmentMinSize();
    var initialWidth = initialSize.width;
    return Math.round((args.width - initialWidth) / intervalWidth);
  };

  _proto._correctRtlCoordinates = function _correctRtlCoordinates(coordinates) {
    var width = coordinates[0].width || this._getAppointmentMaxWidth();

    coordinates.forEach(function (coordinate) {
      if (!coordinate.appointmentReduced) {
        coordinate.left -= width;
      }
    });
    return coordinates;
  };

  _proto._getAppointmentMaxWidth = function _getAppointmentMaxWidth() {
    return this.getDefaultCellWidth();
  };

  _proto._getItemPosition = function _getItemPosition(appointment) {
    var position = this._getAppointmentCoordinates(appointment);

    var allDay = this.isAllDay(appointment);
    var result = [];

    for (var j = 0; j < position.length; j++) {
      var height = this.calculateAppointmentHeight(appointment, position[j]);
      var width = this.calculateAppointmentWidth(appointment, position[j]);
      var resultWidth = width;
      var appointmentReduced = null;
      var multiWeekAppointmentParts = [];
      var initialRowIndex = position[j].rowIndex;
      var initialCellIndex = position[j].cellIndex;

      if (this._needVerifyItemSize() || allDay) {
        var currentMaxAllowedPosition = position[j].hMax;

        if (this.isAppointmentGreaterThan(currentMaxAllowedPosition, {
          left: position[j].left,
          width: width
        })) {
          appointmentReduced = 'head';
          initialRowIndex = position[j].rowIndex;
          initialCellIndex = position[j].cellIndex;
          resultWidth = this._reduceMultiWeekAppointment(width, {
            left: position[j].left,
            right: currentMaxAllowedPosition
          });
          multiWeekAppointmentParts = this._getAppointmentParts({
            sourceAppointmentWidth: width,
            reducedWidth: resultWidth,
            height: height
          }, position[j]);

          if (this._isRtl()) {
            position[j].left = currentMaxAllowedPosition;
          }
        }
      }

      (0, _extend.extend)(position[j], {
        height: height,
        width: resultWidth,
        allDay: allDay,
        rowIndex: initialRowIndex,
        cellIndex: initialCellIndex,
        appointmentReduced: appointmentReduced
      });
      result = this._getAppointmentPartsPosition(multiWeekAppointmentParts, position[j], result);
    }

    return result;
  };

  _proto._getAppointmentPartsPosition = function _getAppointmentPartsPosition(appointmentParts, position, result) {
    if (appointmentParts.length) {
      appointmentParts.unshift(position);
      result = result.concat(appointmentParts);
    } else {
      result.push(position);
    }

    return result;
  };

  _proto._getAppointmentCoordinates = function _getAppointmentCoordinates(appointment) {
    return this.instance.fire('createAppointmentSettings', appointment);
  };

  _proto._isRtl = function _isRtl() {
    return this.instance.option('rtlEnabled');
  };

  _proto._getAppointmentParts = function _getAppointmentParts() {
    return [];
  };

  _proto._getCompactAppointmentParts = function _getCompactAppointmentParts(appointmentWidth) {
    var cellWidth = this.getDefaultCellWidth() || this.getAppointmentMinSize();
    return Math.round(appointmentWidth / cellWidth);
  };

  _proto._reduceMultiWeekAppointment = function _reduceMultiWeekAppointment(sourceAppointmentWidth, bound) {
    if (this._isRtl()) {
      sourceAppointmentWidth = Math.floor(bound.left - bound.right);
    } else {
      sourceAppointmentWidth = bound.right - Math.floor(bound.left);
    }

    return sourceAppointmentWidth;
  };

  _proto.calculateAppointmentHeight = function calculateAppointmentHeight() {
    return 0;
  };

  _proto.calculateAppointmentWidth = function calculateAppointmentWidth() {
    return 0;
  };

  _proto.isAppointmentGreaterThan = function isAppointmentGreaterThan(etalon, comparisonParameters) {
    var result = comparisonParameters.left + comparisonParameters.width - etalon;

    if (this._isRtl()) {
      result = etalon + comparisonParameters.width - comparisonParameters.left;
    }

    return result > this.getDefaultCellWidth() / 2;
  };

  _proto.isAllDay = function isAllDay() {
    return false;
  };

  _proto.cropAppointmentWidth = function cropAppointmentWidth(width, cellWidth) {
    if (this.instance.fire('isGroupedByDate')) {
      width = cellWidth;
    }

    return width;
  };

  _proto._getSortedPositions = function _getSortedPositions(positionList) {
    var _this = this;

    var result = [];

    var round = function round(value) {
      return Math.round(value * 100) / 100;
    };

    var createItem = function createItem(rowIndex, cellIndex, top, left, bottom, right, position, allDay) {
      return {
        i: rowIndex,
        j: cellIndex,
        top: round(top),
        left: round(left),
        bottom: round(bottom),
        right: round(right),
        cellPosition: position,
        allDay: allDay
      };
    };

    for (var rowIndex = 0, rowCount = positionList.length; rowIndex < rowCount; rowIndex++) {
      for (var cellIndex = 0, cellCount = positionList[rowIndex].length; cellIndex < cellCount; cellIndex++) {
        var _positionList$rowInde = positionList[rowIndex][cellIndex],
            top = _positionList$rowInde.top,
            left = _positionList$rowInde.left,
            height = _positionList$rowInde.height,
            width = _positionList$rowInde.width,
            cellPosition = _positionList$rowInde.cellPosition,
            allDay = _positionList$rowInde.allDay;
        result.push(createItem(rowIndex, cellIndex, top, left, top + height, left + width, cellPosition, allDay));
      }
    }

    return result.sort(function (a, b) {
      return _this._sortCondition(a, b);
    });
  };

  _proto._sortCondition = function _sortCondition() {};

  _proto._getConditions = function _getConditions(a, b) {
    var isSomeEdge = this._isSomeEdge(a, b);

    return {
      columnCondition: isSomeEdge || this._normalizeCondition(a.left, b.left),
      rowCondition: isSomeEdge || this._normalizeCondition(a.top, b.top),
      cellPositionCondition: isSomeEdge || this._normalizeCondition(a.cellPosition, b.cellPosition)
    };
  };

  _proto._rowCondition = function _rowCondition(a, b) {
    var conditions = this._getConditions(a, b);

    return conditions.columnCondition || conditions.rowCondition;
  };

  _proto._columnCondition = function _columnCondition(a, b) {
    var conditions = this._getConditions(a, b);

    return conditions.rowCondition || conditions.columnCondition;
  };

  _proto._isSomeEdge = function _isSomeEdge(a, b) {
    return a.i === b.i && a.j === b.j;
  };

  _proto._normalizeCondition = function _normalizeCondition(first, second) {
    // NOTE: ie & ff pixels
    var result = first - second;
    return Math.abs(result) > 1 ? result : 0;
  };

  _proto._isItemsCross = function _isItemsCross(firstItem, secondItem) {
    var areItemsInTheSameTable = !!firstItem.allDay === !!secondItem.allDay;
    var areItemsAllDay = firstItem.allDay && secondItem.allDay;

    if (areItemsInTheSameTable) {
      var orientation = this._getOrientation(areItemsAllDay);

      return this._checkItemsCrossing(firstItem, secondItem, orientation);
    } else {
      return false;
    }
  };

  _proto._checkItemsCrossing = function _checkItemsCrossing(firstItem, secondItem, orientation) {
    var firstItemSide_1 = Math.floor(firstItem[orientation[0]]);
    var firstItemSide_2 = Math.floor(firstItem[orientation[1]]);
    var secondItemSide_1 = Math.ceil(secondItem[orientation[0]]);
    var secondItemSide_2 = Math.ceil(secondItem[orientation[1]]);
    var isItemCross = Math.abs(firstItem[orientation[2]] - secondItem[orientation[2]]) <= 1;
    return isItemCross && (firstItemSide_1 <= secondItemSide_1 && firstItemSide_2 > secondItemSide_1 || firstItemSide_1 < secondItemSide_2 && firstItemSide_2 >= secondItemSide_2 || firstItemSide_1 === secondItemSide_1 && firstItemSide_2 === secondItemSide_2);
  };

  _proto._getOrientation = function _getOrientation(isAllDay) {
    return isAllDay ? ['left', 'right', 'top'] : ['top', 'bottom', 'left'];
  };

  _proto._getResultPositions = function _getResultPositions(sortedArray) {
    var _this2 = this;

    var result = [];
    var i;
    var sortedIndex = 0;
    var currentItem;
    var indexes;
    var itemIndex;
    var maxIndexInStack = 0;
    var stack = {};

    var findFreeIndex = function findFreeIndex(indexes, index) {
      var isFind = indexes.some(function (item) {
        return item === index;
      });

      if (isFind) {
        return findFreeIndex(indexes, ++index);
      } else {
        return index;
      }
    };

    var createItem = function createItem(currentItem, index) {
      var currentIndex = index || 0;
      return {
        index: currentIndex,
        i: currentItem.i,
        j: currentItem.j,
        left: currentItem.left,
        right: currentItem.right,
        top: currentItem.top,
        bottom: currentItem.bottom,
        allDay: currentItem.allDay,
        sortedIndex: _this2._skipSortedIndex(currentIndex) ? null : sortedIndex++
      };
    };

    var startNewStack = function startNewStack(currentItem) {
      stack.items = [createItem(currentItem)];
      stack.left = currentItem.left;
      stack.right = currentItem.right;
      stack.top = currentItem.top;
      stack.bottom = currentItem.bottom;
      stack.allDay = currentItem.allDay;
    };

    var pushItemsInResult = function pushItemsInResult(items) {
      items.forEach(function (item) {
        result.push({
          index: item.index,
          count: maxIndexInStack + 1,
          i: item.i,
          j: item.j,
          sortedIndex: item.sortedIndex
        });
      });
    };

    for (i = 0; i < sortedArray.length; i++) {
      currentItem = sortedArray[i];
      indexes = [];

      if (!stack.items) {
        startNewStack(currentItem);
      } else {
        if (this._isItemsCross(stack, currentItem)) {
          stack.items.forEach(function (item, index) {
            if (_this2._isItemsCross(item, currentItem)) {
              indexes.push(item.index);
            }
          });
          itemIndex = indexes.length ? findFreeIndex(indexes, 0) : 0;
          stack.items.push(createItem(currentItem, itemIndex));
          maxIndexInStack = Math.max(itemIndex, maxIndexInStack);
          stack.left = Math.min(stack.left, currentItem.left);
          stack.right = Math.max(stack.right, currentItem.right);
          stack.top = Math.min(stack.top, currentItem.top);
          stack.bottom = Math.max(stack.bottom, currentItem.bottom);
          stack.allDay = currentItem.allDay;
        } else {
          pushItemsInResult(stack.items);
          stack = {};
          startNewStack(currentItem);
          maxIndexInStack = 0;
        }
      }
    }

    if (stack.items) {
      pushItemsInResult(stack.items);
    }

    return result.sort(function (a, b) {
      var columnCondition = a.j - b.j;
      var rowCondition = a.i - b.i;
      return rowCondition ? rowCondition : columnCondition;
    });
  };

  _proto._skipSortedIndex = function _skipSortedIndex(index) {
    return index > this._getMaxAppointmentCountPerCell() - 1;
  };

  _proto._findIndexByKey = function _findIndexByKey(arr, iKey, jKey, iValue, jValue) {
    var result = 0;

    for (var i = 0, len = arr.length; i < len; i++) {
      if (arr[i][iKey] === iValue && arr[i][jKey] === jValue) {
        result = i;
        break;
      }
    }

    return result;
  };

  _proto._getExtendedPositionMap = function _getExtendedPositionMap(map, positions) {
    var positionCounter = 0;
    var result = [];

    for (var i = 0, mapLength = map.length; i < mapLength; i++) {
      var resultString = [];

      for (var j = 0, itemLength = map[i].length; j < itemLength; j++) {
        map[i][j].index = positions[positionCounter].index;
        map[i][j].sortedIndex = positions[positionCounter].sortedIndex;
        map[i][j].count = positions[positionCounter++].count;
        resultString.push(map[i][j]);

        this._checkLongCompactAppointment(map[i][j], resultString);
      }

      result.push(resultString);
    }

    return result;
  };

  _proto._checkLongCompactAppointment = function _checkLongCompactAppointment(item, result) {
    this._splitLongCompactAppointment(item, result);

    return result;
  };

  _proto._splitLongCompactAppointment = function _splitLongCompactAppointment(item, result) {
    var appointmentCountPerCell = this._getMaxAppointmentCountPerCellByType(item.allDay);

    var compactCount = 0;

    if (appointmentCountPerCell !== undefined && item.index > appointmentCountPerCell - 1) {
      item.isCompact = true;
      compactCount = this._getCompactAppointmentParts(item.width);

      for (var k = 1; k < compactCount; k++) {
        var compactPart = (0, _extend.extend)(true, {}, item);
        compactPart.left = this._getCompactLeftCoordinate(item.left, k);
        compactPart.cellIndex = compactPart.cellIndex + k;
        compactPart.sortedIndex = null;
        result.push(compactPart);
      }
    }

    return result;
  };

  _proto.normalizeEndDateByViewEnd = function normalizeEndDateByViewEnd(appointment, endDate) {
    var result = new Date(endDate.getTime());

    if (!this.isAllDay(appointment)) {
      var viewEndDate = _date.default.roundToHour(this.instance.fire('getEndViewDate'));

      if (result > viewEndDate) {
        result = viewEndDate;
      }
    }

    var endDayHour = this.instance._getCurrentViewOption('endDayHour');

    var allDay = this.instance.fire('getField', 'allDay', appointment);
    var currentViewEndTime = new Date(new Date(endDate.getTime()).setHours(endDayHour, 0, 0, 0));

    if (result.getTime() > currentViewEndTime.getTime() || allDay && result.getHours() < endDayHour) {
      result = currentViewEndTime;
    }

    return result;
  };

  _proto._adjustDurationByDaylightDiff = function _adjustDurationByDaylightDiff(duration, startDate, endDate) {
    var daylightDiff = _utils.default.getDaylightOffset(startDate, endDate);

    return this._needAdjustDuration(daylightDiff) ? this._calculateDurationByDaylightDiff(duration, daylightDiff) : duration;
  };

  _proto._needAdjustDuration = function _needAdjustDuration(diff) {
    return diff !== 0;
  };

  _proto._calculateDurationByDaylightDiff = function _calculateDurationByDaylightDiff(duration, diff) {
    return duration + diff * toMs('minute');
  };

  _proto._getAppointmentDurationInMs = function _getAppointmentDurationInMs(startDate, endDate, allDay) {
    return this.instance.fire('getAppointmentDurationInMs', {
      startDate: startDate,
      endDate: endDate,
      allDay: allDay
    });
  };

  _proto._markAppointmentAsVirtual = function _markAppointmentAsVirtual(coordinates) {
    var isAllDay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var countFullWidthAppointmentInCell = this._getMaxAppointmentCountPerCellByType(isAllDay);

    if (coordinates.count - countFullWidthAppointmentInCell > 0) {
      var top = coordinates.top,
          left = coordinates.left;
      coordinates.virtual = {
        top: top,
        left: left,
        index: this._generateAppointmentCollectorIndex(coordinates, isAllDay),
        isAllDay: isAllDay
      };
    }
  };

  _proto._generateAppointmentCollectorIndex = function _generateAppointmentCollectorIndex(_ref, isAllDay) {
    var groupIndex = _ref.groupIndex,
        rowIndex = _ref.rowIndex,
        cellIndex = _ref.cellIndex;
    return "".concat(groupIndex, "-").concat(rowIndex, "-").concat(cellIndex, "-").concat(isAllDay);
  };

  _proto._getMaxAppointmentCountPerCellByType = function _getMaxAppointmentCountPerCellByType(isAllDay) {
    var appointmentCountPerCell = this._getMaxAppointmentCountPerCell();

    if ((0, _type.isObject)(appointmentCountPerCell)) {
      return isAllDay ? this._getMaxAppointmentCountPerCell().allDay : this._getMaxAppointmentCountPerCell().simple;
    } else {
      return appointmentCountPerCell;
    }
  };

  _proto.getDropDownAppointmentWidth = function getDropDownAppointmentWidth(intervalCount, isAllDay) {
    return this.getPositioningStrategy().getDropDownAppointmentWidth(intervalCount, isAllDay);
  };

  _proto.getDropDownAppointmentHeight = function getDropDownAppointmentHeight() {
    return this.getPositioningStrategy().getDropDownAppointmentHeight();
  };

  _proto.getDropDownButtonAdaptiveSize = function getDropDownButtonAdaptiveSize() {
    return DROP_DOWN_BUTTON_ADAPTIVE_SIZE;
  };

  _proto.getDefaultCellWidth = function getDefaultCellWidth() {
    return this._defaultWidth;
  };

  _proto.getDefaultCellHeight = function getDefaultCellHeight() {
    return this._defaultHeight;
  };

  _proto.getDefaultAllDayCellHeight = function getDefaultAllDayCellHeight() {
    return this._allDayHeight;
  };

  _proto.getCollectorTopOffset = function getCollectorTopOffset(allDay) {
    return this.getPositioningStrategy().getCollectorTopOffset(allDay);
  };

  _proto.getCollectorLeftOffset = function getCollectorLeftOffset() {
    return this.getPositioningStrategy().getCollectorLeftOffset();
  };

  _proto.getAppointmentDataCalculator = function getAppointmentDataCalculator() {};

  _proto._customizeCoordinates = function _customizeCoordinates(coordinates, height, appointmentCountPerCell, topOffset, isAllDay) {
    var index = coordinates.index;
    var appointmentHeight = height / appointmentCountPerCell;
    var appointmentTop = coordinates.top + index * appointmentHeight;
    var top = appointmentTop + topOffset;
    var width = coordinates.width;
    var left = coordinates.left;

    if (coordinates.isCompact) {
      this._isAdaptive() && this._correctCollectorCoordinatesInAdaptive(coordinates, isAllDay);

      this._markAppointmentAsVirtual(coordinates, isAllDay);
    }

    return {
      height: appointmentHeight,
      width: width,
      top: top,
      left: left,
      empty: this._isAppointmentEmpty(height, width)
    };
  };

  _proto._isAppointmentEmpty = function _isAppointmentEmpty(height, width) {
    return height < this._getAppointmentMinHeight() || width < this._getAppointmentMinWidth();
  };

  _proto._calculateGeometryConfig = function _calculateGeometryConfig(coordinates) {
    var overlappingMode = this.instance.fire('getMaxAppointmentsPerCell');

    var offsets = this._getOffsets();

    var appointmentDefaultOffset = this._getAppointmentDefaultOffset();

    var appointmentCountPerCell = this._getAppointmentCount(overlappingMode, coordinates);

    var ratio = this._getDefaultRatio(coordinates, appointmentCountPerCell);

    var maxHeight = this._getMaxHeight();

    if (!(0, _type.isNumeric)(appointmentCountPerCell)) {
      appointmentCountPerCell = coordinates.count;
      ratio = (maxHeight - offsets.unlimited) / maxHeight;
    }

    var topOffset = (1 - ratio) * maxHeight;

    if (overlappingMode === 'auto' || (0, _type.isNumeric)(overlappingMode)) {
      ratio = 1;
      maxHeight = maxHeight - appointmentDefaultOffset;
      topOffset = appointmentDefaultOffset;
    }

    return {
      height: ratio * maxHeight,
      appointmentCountPerCell: appointmentCountPerCell,
      offset: topOffset
    };
  };

  _proto._getAppointmentCount = function _getAppointmentCount() {};

  _proto._getDefaultRatio = function _getDefaultRatio() {};

  _proto._getOffsets = function _getOffsets() {};

  _proto._getMaxHeight = function _getMaxHeight() {};

  _proto._needVerifyItemSize = function _needVerifyItemSize() {
    return false;
  };

  _proto.needSeparateAppointment = function needSeparateAppointment(allDay) {
    return this.instance.fire('isGroupedByDate') && allDay;
  };

  _proto._getMaxAppointmentCountPerCell = function _getMaxAppointmentCountPerCell() {
    if (!this._maxAppointmentCountPerCell) {
      var overlappingMode = this.instance.fire('getMaxAppointmentsPerCell');
      var appointmentCountPerCell;

      if ((0, _type.isNumeric)(overlappingMode)) {
        appointmentCountPerCell = overlappingMode;
      }

      if (overlappingMode === 'auto') {
        appointmentCountPerCell = this._getDynamicAppointmentCountPerCell();
      }

      if (overlappingMode === 'unlimited') {
        appointmentCountPerCell = undefined;
      }

      this._maxAppointmentCountPerCell = appointmentCountPerCell;
    }

    return this._maxAppointmentCountPerCell;
  };

  _proto._getDynamicAppointmentCountPerCell = function _getDynamicAppointmentCountPerCell() {
    return this.getPositioningStrategy().getDynamicAppointmentCountPerCell();
  };

  _proto.hasAllDayAppointments = function hasAllDayAppointments() {
    return false;
  };

  _proto._isCompactTheme = function _isCompactTheme() {
    return ((0, _themes.current)() || '').split('.').pop() === 'compact';
  };

  _proto._getAppointmentDefaultOffset = function _getAppointmentDefaultOffset() {
    return this.getPositioningStrategy().getAppointmentDefaultOffset();
  };

  _proto._getAppointmentDefaultHeight = function _getAppointmentDefaultHeight() {
    return this._getAppointmentHeightByTheme();
  };

  _proto._getAppointmentMinHeight = function _getAppointmentMinHeight() {
    return this._getAppointmentDefaultHeight();
  };

  _proto._getAppointmentHeightByTheme = function _getAppointmentHeightByTheme() {
    return this._isCompactTheme() ? COMPACT_THEME_APPOINTMENT_DEFAULT_HEIGHT : APPOINTMENT_DEFAULT_HEIGHT;
  };

  _proto._getAppointmentDefaultWidth = function _getAppointmentDefaultWidth() {
    return this.getPositioningStrategy()._getAppointmentDefaultWidth();
  };

  _proto._getAppointmentMinWidth = function _getAppointmentMinWidth() {
    return this._getAppointmentDefaultWidth();
  };

  _proto._needVerticalGroupBounds = function _needVerticalGroupBounds() {
    return false;
  };

  _proto._needHorizontalGroupBounds = function _needHorizontalGroupBounds() {
    return false;
  };

  _createClass(BaseRenderingStrategy, [{
    key: "isVirtualScrolling",
    get: function get() {
      return this.instance.fire('isVirtualScrolling');
    }
  }]);

  return BaseRenderingStrategy;
}();

var _default = BaseRenderingStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
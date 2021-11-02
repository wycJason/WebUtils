"use strict";

exports.default = void 0;

var _uiSchedulerAppointmentsStrategy = _interopRequireDefault(require("./ui.scheduler.appointments.strategy.horizontal_month_line"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MONTH_APPOINTMENT_HEIGHT_RATIO = 0.6;
var MONTH_APPOINTMENT_MIN_OFFSET = 26;
var MONTH_APPOINTMENT_MAX_OFFSET = 30;
var MONTH_DROPDOWN_APPOINTMENT_MIN_RIGHT_OFFSET = 36;
var MONTH_DROPDOWN_APPOINTMENT_MAX_RIGHT_OFFSET = 60;

var HorizontalMonthRenderingStrategy = /*#__PURE__*/function (_HorizontalMonthLineA) {
  _inheritsLoose(HorizontalMonthRenderingStrategy, _HorizontalMonthLineA);

  function HorizontalMonthRenderingStrategy() {
    return _HorizontalMonthLineA.apply(this, arguments) || this;
  }

  var _proto = HorizontalMonthRenderingStrategy.prototype;

  _proto._getLeftPosition = function _getLeftPosition(settings) {
    var fullWeekAppointmentWidth = this._getFullWeekAppointmentWidth(settings.groupIndex);

    var result = this._calculateMultiWeekAppointmentLeftOffset(settings.hMax, fullWeekAppointmentWidth);

    if (this.instance._groupOrientation === 'vertical') {
      result += this.instance.fire('getWorkSpaceDateTableOffset');
    }

    return result;
  };

  _proto._getChunkCount = function _getChunkCount(fullChunksWidth, firstChunkWidth, weekWidth) {
    var rawFullChunksWidth = fullChunksWidth - firstChunkWidth + weekWidth;
    return Math.ceil(rawFullChunksWidth / weekWidth);
  };

  _proto._getChunkWidths = function _getChunkWidths(geometry) {
    var firstChunkWidth = geometry.reducedWidth;
    var fullChunksWidth = Math.floor(geometry.sourceAppointmentWidth);
    var widthWithoutFirstChunk = fullChunksWidth - firstChunkWidth;
    return [firstChunkWidth, fullChunksWidth, widthWithoutFirstChunk];
  };

  _proto._getTailChunkSettings = function _getTailChunkSettings(withoutFirstChunkWidth, weekWidth, leftPosition) {
    var tailChunkWidth = withoutFirstChunkWidth % weekWidth || weekWidth;
    var rtlPosition = leftPosition + (weekWidth - tailChunkWidth);
    var tailChunkLeftPosition = this._isRtl() ? rtlPosition : leftPosition;
    return [tailChunkWidth, tailChunkLeftPosition];
  };

  _proto._getAppointmentParts = function _getAppointmentParts(geometry, settings) {
    var result = [];
    var weekWidth = Math.round(this._getFullWeekAppointmentWidth(settings.groupIndex));

    var _this$_getChunkWidths = this._getChunkWidths(geometry, settings, weekWidth),
        _this$_getChunkWidths2 = _slicedToArray(_this$_getChunkWidths, 3),
        firstChunkWidth = _this$_getChunkWidths2[0],
        fullChunksWidth = _this$_getChunkWidths2[1],
        withoutFirstChunkWidth = _this$_getChunkWidths2[2];

    var leftPosition = this._getLeftPosition(settings);

    var hasTailChunk = this.instance.fire('getEndViewDate') > settings.info.appointment.endDate;

    var chunkCount = this._getChunkCount(fullChunksWidth, firstChunkWidth, weekWidth);

    var _this$_getTailChunkSe = this._getTailChunkSettings(withoutFirstChunkWidth, weekWidth, leftPosition),
        _this$_getTailChunkSe2 = _slicedToArray(_this$_getTailChunkSe, 2),
        tailChunkWidth = _this$_getTailChunkSe2[0],
        tailChunkLeftPosition = _this$_getTailChunkSe2[1];

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
  };

  _proto._calculateMultiWeekAppointmentLeftOffset = function _calculateMultiWeekAppointmentLeftOffset(max, width) {
    return this._isRtl() ? max : max - width;
  };

  _proto._getFullWeekAppointmentWidth = function _getFullWeekAppointmentWidth(groupIndex) {
    this._maxFullWeekAppointmentWidth = this.instance.fire('getFullWeekAppointmentWidth', {
      groupIndex: groupIndex
    });
    return this._maxFullWeekAppointmentWidth;
  };

  _proto._getAppointmentDefaultHeight = function _getAppointmentDefaultHeight() {
    return this._getAppointmentHeightByTheme();
  };

  _proto._getAppointmentMinHeight = function _getAppointmentMinHeight() {
    return this._getAppointmentDefaultHeight();
  };

  _proto._columnCondition = function _columnCondition(a, b) {
    var conditions = this._getConditions(a, b);

    return conditions.rowCondition || conditions.columnCondition || conditions.cellPositionCondition;
  };

  _proto.createTaskPositionMap = function createTaskPositionMap(items) {
    return _HorizontalMonthLineA.prototype.createTaskPositionMap.call(this, items, true);
  };

  _proto._getSortedPositions = function _getSortedPositions(map) {
    return _HorizontalMonthLineA.prototype._getSortedPositions.call(this, map, true);
  };

  _proto._getDefaultRatio = function _getDefaultRatio() {
    return MONTH_APPOINTMENT_HEIGHT_RATIO;
  };

  _proto._getOffsets = function _getOffsets() {
    return {
      unlimited: MONTH_APPOINTMENT_MIN_OFFSET,
      auto: MONTH_APPOINTMENT_MAX_OFFSET
    };
  };

  _proto.getDropDownAppointmentWidth = function getDropDownAppointmentWidth(intervalCount) {
    if (this.instance.fire('isAdaptive')) {
      return this.getDropDownButtonAdaptiveSize();
    }

    var offset = intervalCount > 1 ? MONTH_DROPDOWN_APPOINTMENT_MAX_RIGHT_OFFSET : MONTH_DROPDOWN_APPOINTMENT_MIN_RIGHT_OFFSET;
    return this.getDefaultCellWidth() - offset;
  };

  _proto.needCorrectAppointmentDates = function needCorrectAppointmentDates() {
    return false;
  };

  _proto._needVerticalGroupBounds = function _needVerticalGroupBounds() {
    return false;
  };

  _proto._needHorizontalGroupBounds = function _needHorizontalGroupBounds() {
    return true;
  };

  return HorizontalMonthRenderingStrategy;
}(_uiSchedulerAppointmentsStrategy.default);

var _default = HorizontalMonthRenderingStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
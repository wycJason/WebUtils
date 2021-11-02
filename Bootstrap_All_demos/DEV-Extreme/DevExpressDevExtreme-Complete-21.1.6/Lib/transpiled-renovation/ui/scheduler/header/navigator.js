"use strict";

exports.Navigator = void 0;

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _common = require("../../../core/utils/common");

var _type = require("../../../core/utils/type");

var _ui = _interopRequireDefault(require("../../widget/ui.errors"));

var _date = _interopRequireDefault(require("../../../core/utils/date"));

var _extend = require("../../../core/utils/extend");

var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));

var _devices = _interopRequireDefault(require("../../../core/devices"));

var _ui2 = _interopRequireDefault(require("../../widget/ui.widget"));

var _button = _interopRequireDefault(require("../../button"));

var _calendar = _interopRequireDefault(require("../../calendar"));

var _popover = _interopRequireDefault(require("../../popover"));

var _popup = _interopRequireDefault(require("../../popup"));

var _publisher_mixin = _interopRequireDefault(require("../publisher_mixin"));

var _date2 = _interopRequireDefault(require("../../../localization/date"));

var _ui3 = _interopRequireDefault(require("../../scroll_view/ui.scrollable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ELEMENT_CLASS = 'dx-scheduler-navigator';
var CALENDAR_CLASS = 'dx-scheduler-navigator-calendar';
var NEXT_BUTTON_CLASS = 'dx-scheduler-navigator-next';
var CAPTION_BUTTON_CLASS = 'dx-scheduler-navigator-caption';
var PREVIOUS_BUTTON_CLASS = 'dx-scheduler-navigator-previous';
var CALENDAR_POPOVER_CLASS = 'dx-scheduler-navigator-calendar-popover';
var MONDAY_INDEX = 1;

var getDefaultFirstDayOfWeekIndex = function getDefaultFirstDayOfWeekIndex(shift) {
  return shift ? MONDAY_INDEX : _date2.default.firstDayOfWeekIndex();
};

var getDateMonthFormat = function getDateMonthFormat(short) {
  return function (date) {
    var monthName = _date2.default.getMonthNames(short ? 'abbreviated' : 'wide')[date.getMonth()];

    return [_date2.default.format(date, 'day'), monthName].join(' ');
  };
};

var getMonthYearFormat = function getMonthYearFormat(date) {
  return _date2.default.getMonthNames('abbreviated')[date.getMonth()] + ' ' + _date2.default.format(date, 'year');
};

var getCaptionFormat = function getCaptionFormat(short, intervalCount, duration) {
  var dateMonthFormat = getDateMonthFormat(short);
  return function (date) {
    if (intervalCount > 1) {
      var lastIntervalDate = new Date(date);
      var defaultViewDuration = duration;
      lastIntervalDate.setDate(date.getDate() + defaultViewDuration - 1);
      var isDifferentMonthDates = date.getMonth() !== lastIntervalDate.getMonth();
      var useShortFormat = isDifferentMonthDates || short;

      var firstWeekDateText = _date2.default.format(date, isDifferentMonthDates ? getDateMonthFormat(useShortFormat) : 'd');

      var lastWeekDateText = _date2.default.format(lastIntervalDate, getCaptionFormat(useShortFormat));

      return firstWeekDateText + '-' + lastWeekDateText;
    }

    return [dateMonthFormat(date), _date2.default.format(date, 'year')].join(' ');
  };
};

var getWeekCaption = function getWeekCaption(date, shift, rejectWeekend) {
  var firstDayOfWeek = this.option('firstDayOfWeek');
  var firstDayOfWeekIndex = (0, _type.isDefined)(firstDayOfWeek) ? firstDayOfWeek : getDefaultFirstDayOfWeekIndex(shift);
  if (firstDayOfWeekIndex === 0 && rejectWeekend) firstDayOfWeekIndex = MONDAY_INDEX;

  var firstWeekDate = _date.default.getFirstWeekDate(date, firstDayOfWeekIndex);

  var weekendDuration = 2;

  if (rejectWeekend) {
    firstWeekDate = _date.default.normalizeDateByWeek(firstWeekDate, date);
  }

  if (firstDayOfWeek >= 6 && rejectWeekend) {
    firstWeekDate.setDate(firstWeekDate.getDate() + (7 - firstDayOfWeek + 1));
  }

  var lastWeekDate = new Date(firstWeekDate);
  var intervalCount = this.option('intervalCount');
  shift = shift || 6;
  lastWeekDate = new Date(lastWeekDate.setDate(lastWeekDate.getDate() + (intervalCount > 1 ? 7 * (intervalCount - 1) + shift : shift)));

  if (lastWeekDate.getDay() % 6 === 0 && rejectWeekend) {
    lastWeekDate.setDate(lastWeekDate.getDate() + weekendDuration);
  }

  return {
    text: formatCaptionByMonths.call(this, lastWeekDate, firstWeekDate),
    startDate: firstWeekDate,
    endDate: lastWeekDate
  };
};

var formatCaptionByMonths = function formatCaptionByMonths(lastDate, firstDate) {
  var isDifferentMonthDates = firstDate.getMonth() !== lastDate.getMonth();
  var isDifferentYears = firstDate.getFullYear() !== lastDate.getFullYear();
  var useShortFormat = isDifferentMonthDates || this.option('_useShortDateFormat');
  var lastDateText;
  var firstDateText;

  if (isDifferentYears) {
    firstDateText = _date2.default.format(firstDate, getCaptionFormat(true));
    lastDateText = _date2.default.format(lastDate, getCaptionFormat(true));
  } else {
    firstDateText = _date2.default.format(firstDate, isDifferentMonthDates ? getDateMonthFormat(useShortFormat) : 'd');
    lastDateText = _date2.default.format(lastDate, getCaptionFormat(useShortFormat));
  }

  return firstDateText + '-' + lastDateText;
};

var getMonthCaption = function getMonthCaption(date) {
  var firstDate = new Date(_date.default.getFirstMonthDate(date));
  var lastDate = new Date(_date.default.getLastMonthDate(firstDate));
  var text;

  if (this.option('intervalCount') > 1) {
    lastDate = new Date(firstDate);
    lastDate.setMonth(firstDate.getMonth() + this.option('intervalCount') - 1);
    lastDate = new Date(_date.default.getLastMonthDate(lastDate));
    var isSameYear = firstDate.getYear() === lastDate.getYear();
    var lastDateText = getMonthYearFormat(lastDate);
    var firstDateText = isSameYear ? _date2.default.getMonthNames('abbreviated')[firstDate.getMonth()] : getMonthYearFormat(firstDate);
    text = firstDateText + '-' + lastDateText;
  } else {
    text = _date2.default.format(date, 'monthandyear');
  }

  return {
    text: text,
    startDate: firstDate,
    endDate: lastDate
  };
};

var dateGetter = function dateGetter(date, offset) {
  return new Date(date[this.setter](date[this.getter]() + offset));
};

var getConfig = function getConfig(step) {
  var agendaDuration;

  switch (step) {
    case 'day':
      return {
        duration: 1 * this.option('intervalCount'),
        setter: 'setDate',
        getter: 'getDate',
        getDate: dateGetter,
        getCaption: function getCaption(date) {
          var format = getCaptionFormat(false, this.option('intervalCount'), this._getConfig().duration);
          return {
            text: _date2.default.format(date, format),
            startDate: date,
            endDate: date
          };
        }
      };

    case 'week':
      return {
        duration: 7 * this.option('intervalCount'),
        setter: 'setDate',
        getter: 'getDate',
        getDate: dateGetter,
        getCaption: getWeekCaption
      };

    case 'workWeek':
      return {
        duration: 7 * this.option('intervalCount'),
        setter: 'setDate',
        getter: 'getDate',
        getDate: dateGetter,
        getCaption: function getCaption(date) {
          return getWeekCaption.call(this, date, 4, true);
        }
      };

    case 'month':
      return {
        duration: 1 * this.option('intervalCount'),
        setter: 'setMonth',
        getter: 'getMonth',
        getDate: function getDate(date, offset) {
          var currentDate = date.getDate();
          date.setDate(1);
          date = dateGetter.call(this, date, offset);

          var lastDate = _date.default.getLastMonthDay(date);

          date.setDate(currentDate < lastDate ? currentDate : lastDate);
          return date;
        },
        getCaption: getMonthCaption
      };

    case 'agenda':
      agendaDuration = this.invoke('getAgendaDuration');
      agendaDuration = (0, _type.isNumeric)(agendaDuration) && agendaDuration > 0 ? agendaDuration : 7;
      return {
        duration: agendaDuration,
        setter: 'setDate',
        getter: 'getDate',
        getDate: dateGetter,
        getCaption: function getCaption(date) {
          var format = getCaptionFormat(this.option('_useShortDateFormat'));
          var firstDate = new Date(date);
          var lastDate = new Date(date);
          var text;

          if (agendaDuration > 1) {
            lastDate.setDate(lastDate.getDate() + agendaDuration - 1);
            text = formatCaptionByMonths.call(this, lastDate, date);
          } else {
            text = _date2.default.format(date, format);
          }

          return {
            text: text,
            startDate: firstDate,
            endDate: lastDate
          };
        }
      };
  }
};

var Navigator = _ui2.default.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      date: new Date(),
      displayedDate: undefined,
      step: 'day',
      intervalCount: 1,
      min: undefined,
      max: undefined,
      firstDayOfWeek: undefined,
      _useShortDateFormat: false,
      todayDate: function todayDate() {
        return new Date();
      }
    });
  },
  _defaultOptionsRules: function _defaultOptionsRules() {
    return this.callBase().concat([{
      device: function device() {
        return !_devices.default.real().generic || _devices.default.isSimulator();
      },
      options: {
        _useShortDateFormat: true
      }
    }]);
  },
  _optionChanged: function _optionChanged(args) {
    switch (args.name) {
      case 'step':
      case 'date':
      case 'intervalCount':
      case 'displayedDate':
        this._updateButtonsState();

        this._renderCaption();

        this._setCalendarOption('value', this.option('date'));

        break;

      case 'min':
      case 'max':
        this._updateButtonsState();

        this._setCalendarOption(args.name, args.value);

        break;

      case 'firstDayOfWeek':
        this._setCalendarOption(args.name, args.value);

        break;

      case 'customizeDateNavigatorText':
        this._renderCaption();

        break;

      case 'tabIndex':
      case 'focusStateEnabled':
        this._next.option(args.name, args.value);

        this._caption.option(args.name, args.value);

        this._prev.option(args.name, args.value);

        this._setCalendarOption(args.name, args.value);

        this.callBase(args);
        break;

      case '_useShortDateFormat':
        break;

      default:
        this.callBase(args);
    }
  },
  _init: function _init() {
    this.callBase();
    this.$element().addClass(ELEMENT_CLASS);

    this._initButtons();
  },
  _initButtons: function _initButtons() {
    var $next = (0, _renderer.default)('<div>').addClass(NEXT_BUTTON_CLASS);
    this._next = this._createComponent($next, _button.default, {
      icon: 'chevronnext',
      onClick: this._updateCurrentDate.bind(this, 1),
      focusStateEnabled: this.option('focusStateEnabled'),
      tabIndex: this.option('tabIndex'),
      integrationOptions: {}
    });
    var $caption = (0, _renderer.default)('<div>').addClass(CAPTION_BUTTON_CLASS);
    this._caption = this._createComponent($caption, _button.default, {
      focusStateEnabled: this.option('focusStateEnabled'),
      tabIndex: this.option('tabIndex'),
      integrationOptions: {}
    });
    var $prev = (0, _renderer.default)('<div>').addClass(PREVIOUS_BUTTON_CLASS);
    this._prev = this._createComponent($prev, _button.default, {
      icon: 'chevronprev',
      onClick: this._updateCurrentDate.bind(this, -1),
      focusStateEnabled: this.option('focusStateEnabled'),
      tabIndex: this.option('tabIndex'),
      integrationOptions: {}
    });
    this.setAria('label', 'Next period', $next);
    this.setAria('label', 'Previous period', $prev);

    this._updateButtonsState();

    this.$element().append($prev, $caption, $next);
  },
  _updateButtonsState: function _updateButtonsState() {
    var min = this.option('min');
    var max = this.option('max');

    var caption = this._getConfig().getCaption.call(this, this.option('displayedDate') || this.option('date'));

    min = min ? _date.default.trimTime(min) : min;
    max = max ? _date.default.trimTime(max) : max;
    max && max.setHours(23, 59, 59);

    this._prev.option('disabled', min && !isNaN(min.getTime()) && this._getNextDate(-1, caption.endDate) < min);

    this._next.option('disabled', max && !isNaN(max.getTime()) && this._getNextDate(1, caption.startDate) > max);
  },
  _updateCurrentDate: function _updateCurrentDate(direction) {
    var date = this._getNextDate(direction);

    _date.default.normalizeDate(date, this.option('min'), this.option('max'));

    this.notifyObserver('currentDateUpdated', date);
  },
  _getNextDate: function _getNextDate(direction) {
    var initialDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var stepConfig = this._getConfig();

    var offset = stepConfig.duration * direction;
    var date = stepConfig.getDate(new Date(initialDate || this.option('date')), offset);
    return date;
  },
  _renderFocusTarget: _common.noop,
  _initMarkup: function _initMarkup() {
    this.callBase();

    this._renderCaption();
  },
  _render: function _render() {
    this.callBase();

    this._renderPopover();

    this._renderCaptionKeys();
  },
  _isMobileLayout: function _isMobileLayout() {
    return !_devices.default.current().generic;
  },
  _renderPopover: function _renderPopover() {
    var _this = this;

    var overlayType = this._isMobileLayout() ? _popup.default : _popover.default;
    var popoverContainer = (0, _renderer.default)('<div>').addClass(CALENDAR_POPOVER_CLASS);
    this._popover = this._createComponent(popoverContainer, overlayType, {
      contentTemplate: function contentTemplate() {
        return _this._createPopupContent();
      },
      defaultOptionsRules: [{
        device: function device() {
          return !_devices.default.current().generic;
        },
        options: {
          fullScreen: true,
          showCloseButton: false,
          toolbarItems: [{
            shortcut: 'cancel'
          }]
        }
      }, {
        device: function device() {
          return _devices.default.current().generic;
        },
        options: {
          target: this._caption.$element()
        }
      }]
    });

    this._popover.$element().appendTo(this.$element());
  },
  _createScrollable: function _createScrollable(content) {
    var result = this._createComponent((0, _renderer.default)('<div>'), _ui3.default, {
      direction: 'vertical'
    });

    result.$content().append(content);
    return result;
  },
  _createPopupContent: function _createPopupContent() {
    var result = (0, _renderer.default)('<div>').addClass(CALENDAR_CLASS);
    this._calendar = this._createComponent(result, _calendar.default, this._calendarOptions());

    if (this._isMobileLayout()) {
      var scrollable = this._createScrollable(result);

      return scrollable.$element();
    }

    return result;
  },
  _calendarOptions: function _calendarOptions() {
    return {
      min: this.option('min'),
      max: this.option('max'),
      firstDayOfWeek: this.option('firstDayOfWeek'),
      value: this.option('date'),
      _todayDate: this.option('todayDate'),
      focusStateEnabled: this.option('focusStateEnabled'),
      onValueChanged: function (e) {
        if (!this.option('visible')) return;
        this.notifyObserver('currentDateUpdated', e.value);

        this._popover.hide();
      }.bind(this),
      hasFocus: function hasFocus() {
        return true;
      },
      tabIndex: null
    };
  },
  _renderCaption: function _renderCaption() {
    var _this2 = this;

    var date = this.option('displayedDate') || this.option('date');

    var captionConfig = this._getConfig().getCaption.call(this, date);

    var customizationFunction = this.option('customizeDateNavigatorText');
    var caption = (0, _type.isFunction)(customizationFunction) ? customizationFunction(captionConfig) : captionConfig.text;

    this._caption.option({
      text: caption,
      onKeyboardHandled: function onKeyboardHandled(opts) {
        _this2.option('focusStateEnabled') && !_this2.option('disabled') && _this2._calendar._keyboardHandler(opts);
      },
      onClick: function onClick() {
        return _this2._popover.toggle();
      }
    });
  },
  _renderCaptionKeys: function _renderCaptionKeys() {
    if (!this.option('focusStateEnabled') || this.option('disabled')) {
      return;
    }

    var that = this;

    var executeHandler = function executeHandler() {
      if (that._popover.$content().is(':hidden')) {
        that._popover.show();
      } else {
        return true;
      }
    };

    var tabHandler = function tabHandler() {
      that._popover.hide();
    };

    this._caption.registerKeyHandler('enter', executeHandler);

    this._caption.registerKeyHandler('space', executeHandler);

    this._caption.registerKeyHandler('tab', tabHandler);
  },
  _setCalendarOption: function _setCalendarOption(name, value) {
    if (this._calendar) {
      this._calendar.option(name, value);
    }
  },
  _getConfig: function _getConfig() {
    var step = this.option('step');
    var config = getConfig.call(this, step);

    if (!config) {
      throw _ui.default.Error('E1033', step);
    }

    return config;
  }
}).include(_publisher_mixin.default);

exports.Navigator = Navigator;
(0, _component_registrator.default)('dxSchedulerNavigator', Navigator);
"use strict";

exports.Header = void 0;

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _type = require("../../../core/utils/type");

var _extend = require("../../../core/utils/extend");

var _iterator = require("../../../core/utils/iterator");

var _array = require("../../../core/utils/array");

var _inflector = require("../../../core/utils/inflector");

var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));

var _ui = _interopRequireDefault(require("../../widget/ui.widget"));

var _navigator = require("./navigator");

var _drop_down_menu = _interopRequireDefault(require("../../drop_down_menu"));

var _tabs = _interopRequireDefault(require("../../tabs"));

var _constants = require("../../tabs/constants");

var _errors = _interopRequireDefault(require("../../../core/errors"));

var _message = _interopRequireDefault(require("../../../localization/message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var COMPONENT_CLASS = 'dx-scheduler-header';
var VIEW_SWITCHER_CLASS = 'dx-scheduler-view-switcher';
var VIEW_SWITCHER_LABEL_CLASS = 'dx-scheduler-view-switcher-label';
var STEP_MAP = {
  day: 'day',
  week: 'week',
  workWeek: 'workWeek',
  month: 'month',
  timelineDay: 'day',
  timelineWeek: 'week',
  timelineWorkWeek: 'workWeek',
  timelineMonth: 'month',
  agenda: 'agenda'
};
var VIEWS = ['day', 'week', 'workWeek', 'month', 'timelineDay', 'timelineWeek', 'timelineWorkWeek', 'timelineMonth', 'agenda'];

var Header = /*#__PURE__*/function (_Widget) {
  _inheritsLoose(Header, _Widget);

  function Header() {
    return _Widget.apply(this, arguments) || this;
  }

  var _proto = Header.prototype;

  _proto._getDefaultOptions = function _getDefaultOptions() {
    return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
      views: [],
      isAdaptive: false,
      intervalCount: 1,
      currentView: 'day',
      firstDayOfWeek: undefined,
      currentDate: new Date(),
      min: undefined,
      max: undefined,
      useDropDownViewSwitcher: false,
      _dropDownButtonIcon: 'overlay'
    });
  };

  _proto._setOptionsByReference = function _setOptionsByReference() {
    _Widget.prototype._setOptionsByReference.call(this);

    (0, _extend.extend)(this._optionsByReference, {
      currentView: true
    });
  };

  _proto._optionChanged = function _optionChanged(args) {
    var value = args.value;

    switch (args.name) {
      case 'views':
        this._validateViews();

        this._viewSwitcher.option({
          items: value,
          selectedItem: this.option('currentView')
        });

        break;

      case 'customizeDateNavigatorText':
        this._navigator.option(args.name, value);

        break;

      case 'currentView':
        this._viewSwitcher.option('selectedItem', value);

        this._navigator.option('step', STEP_MAP[this._getCurrentViewType()]);

        this._changeViewSwitcherLabelText();

        break;

      case 'currentDate':
        this._navigator.option('date', value);

        break;

      case 'displayedDate':
        this._navigator.option('displayedDate', value);

        break;

      case 'min':
      case 'max':
      case 'firstDayOfWeek':
      case 'intervalCount':
        this._navigator.option(args.name, value);

        break;

      case 'tabIndex':
      case 'focusStateEnabled':
        this._viewSwitcher.option(args.name, value);

        this._navigator.option(args.name, value);

        _Widget.prototype._optionChanged.call(this, args);

        break;

      case 'useDropDownViewSwitcher':
        this._refreshViewSwitcher();

        break;

      default:
        _Widget.prototype._optionChanged.call(this, args);

    }
  };

  _proto._init = function _init() {
    _Widget.prototype._init.call(this);

    this.$element().addClass(COMPONENT_CLASS);
  };

  _proto._initMarkup = function _initMarkup() {
    _Widget.prototype._initMarkup.call(this);

    this._renderNavigator();

    this._renderViewSwitcher();
  };

  _proto._renderNavigator = function _renderNavigator() {
    this._navigator = this._createComponent('<div>', _navigator.Navigator, {
      min: this.option('min'),
      max: this.option('max'),
      intervalCount: this.option('intervalCount'),
      date: this.option('currentDate'),
      step: STEP_MAP[this._getCurrentViewType()],
      firstDayOfWeek: this.option('firstDayOfWeek'),
      tabIndex: this.option('tabIndex'),
      focusStateEnabled: this.option('focusStateEnabled'),
      observer: this.option('observer'),
      customizeDateNavigatorText: this.option('customizeDateNavigatorText'),
      todayDate: this.option('todayDate')
    });

    this._navigator.$element().appendTo(this.$element());
  };

  _proto._renderViewSwitcher = function _renderViewSwitcher() {
    this._validateViews();

    var $viewSwitcher = (0, _renderer.default)('<div>').addClass(VIEW_SWITCHER_CLASS).appendTo(this.$element());
    this.option('useDropDownViewSwitcher') ? this._renderViewSwitcherDropDownMenu($viewSwitcher) : this._renderViewSwitcherTabs($viewSwitcher);
  };

  _proto._validateViews = function _validateViews() {
    var views = this.option('views');
    (0, _iterator.each)(views, function (_, view) {
      var isViewIsObject = (0, _type.isObject)(view);
      var viewType = isViewIsObject && view.type ? view.type : view;

      if ((0, _array.inArray)(viewType, VIEWS) === -1) {
        _errors.default.log('W0008', viewType);
      }
    });
  };

  _proto._getCurrentViewType = function _getCurrentViewType() {
    var currentView = this.option('currentView');
    return currentView.type || currentView;
  };

  _proto._renderViewSwitcherTabs = function _renderViewSwitcherTabs($element) {
    var that = this;
    $element.addClass(_constants.TABS_EXPANDED_CLASS);
    this._viewSwitcher = this._createComponent($element, _tabs.default, {
      selectionRequired: true,
      scrollingEnabled: true,
      onSelectionChanged: this._updateCurrentView.bind(this),
      items: this.option('views'),
      itemTemplate: function itemTemplate(item) {
        return (0, _renderer.default)('<span>').addClass('dx-tab-text').text(that._getItemText(item));
      },
      selectedItem: this.option('currentView'),
      tabIndex: this.option('tabIndex'),
      focusStateEnabled: this.option('focusStateEnabled')
    });
  };

  _proto._getItemText = function _getItemText(item) {
    return item.name || _message.default.format('dxScheduler-switcher' + (0, _inflector.camelize)(item.type || item, true));
  };

  _proto._refreshViewSwitcher = function _refreshViewSwitcher() {
    this._viewSwitcher._dispose();

    this._viewSwitcher.$element().remove();

    delete this._viewSwitcher;

    this._removeViewSwitcherLabel();

    this._renderViewSwitcher();
  };

  _proto._removeViewSwitcherLabel = function _removeViewSwitcherLabel() {
    if ((0, _type.isDefined)(this._$viewSwitcherLabel)) {
      this._$viewSwitcherLabel.detach();

      this._$viewSwitcherLabel.remove();

      delete this._$viewSwitcherLabel;
    }
  };

  _proto._renderViewSwitcherDropDownMenu = function _renderViewSwitcherDropDownMenu($element) {
    var that = this;
    this._$viewSwitcherLabel = (0, _renderer.default)('<div>').addClass(VIEW_SWITCHER_LABEL_CLASS).appendTo(this.$element());

    this._changeViewSwitcherLabelText();

    this._viewSwitcher = this._createComponent($element, _drop_down_menu.default, {
      onItemClick: this._updateCurrentView.bind(this),
      buttonIcon: this.option('_dropDownButtonIcon'),
      items: this.option('views'),
      selectionMode: this.option('isAdaptive') ? 'single' : 'none',
      selectedItemKeys: [this.option('currentView')],
      itemTemplate: function itemTemplate(item) {
        return (0, _renderer.default)('<span>').addClass('dx-dropdownmenu-item-text').text(that._getItemText(item));
      }
    });
  };

  _proto._changeViewSwitcherLabelText = function _changeViewSwitcherLabelText() {
    if (!(0, _type.isDefined)(this._$viewSwitcherLabel)) {
      return;
    }

    var currentView = this.option('currentView');

    var currentViewText = this._getItemText(currentView);

    this._$viewSwitcherLabel.text(currentViewText);
  };

  _proto._getCurrentViewName = function _getCurrentViewName(currentView) {
    return (0, _type.isObject)(currentView) ? currentView.name || currentView.type : currentView;
  };

  _proto._updateCurrentView = function _updateCurrentView(e) {
    var selectedItem = e.itemData || e.component.option('selectedItem');

    var viewName = this._getCurrentViewName(selectedItem);

    this.notifyObserver('currentViewUpdated', viewName);
  };

  _proto._renderFocusTarget = function _renderFocusTarget() {};

  _proto.notifyObserver = function notifyObserver(subject, args) {
    var observer = this.option('observer');

    if (observer) {
      observer.fire(subject, args);
    }
  };

  _proto.invoke = function invoke() {
    var observer = this.option('observer');

    if (observer) {
      return observer.fire.apply(observer, arguments);
    }
  };

  return Header;
}(_ui.default);

exports.Header = Header;
(0, _component_registrator.default)('dxSchedulerHeader', Header);
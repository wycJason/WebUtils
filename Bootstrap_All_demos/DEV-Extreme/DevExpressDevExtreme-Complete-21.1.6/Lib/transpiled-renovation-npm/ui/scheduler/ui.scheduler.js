"use strict";

exports.default = void 0;

var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));

var _config = _interopRequireDefault(require("../../core/config"));

var _devices = _interopRequireDefault(require("../../core/devices"));

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _bindable_template = require("../../core/templates/bindable_template");

var _empty_template = require("../../core/templates/empty_template");

var _array = require("../../core/utils/array");

var _browser = _interopRequireDefault(require("../../core/utils/browser"));

var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));

var _common = require("../../core/utils/common");

var _data = require("../../core/utils/data");

var _position = require("../../core/utils/position");

var _date = _interopRequireDefault(require("../../core/utils/date"));

var _date_serialization = _interopRequireDefault(require("../../core/utils/date_serialization"));

var _deferred = require("../../core/utils/deferred");

var _extend = require("../../core/utils/extend");

var _iterator = require("../../core/utils/iterator");

var _support = require("../../core/utils/support");

var _type = require("../../core/utils/type");

var _window = require("../../core/utils/window");

var _data_helper = _interopRequireDefault(require("../../data_helper"));

var _visibility_change = require("../../events/visibility_change");

var _date2 = _interopRequireDefault(require("../../localization/date"));

var _message = _interopRequireDefault(require("../../localization/message"));

var _dialog = require("../dialog");

var _themes = require("../themes");

var _ui = _interopRequireDefault(require("../widget/ui.errors"));

var _ui2 = _interopRequireDefault(require("../widget/ui.widget"));

var _appointmentPopup = _interopRequireDefault(require("./appointmentPopup"));

var _compactAppointmentsHelper = require("./compactAppointmentsHelper");

var _desktopTooltipStrategy = require("./tooltip_strategies/desktopTooltipStrategy");

var _mobileTooltipStrategy = require("./tooltip_strategies/mobileTooltipStrategy");

var _loading = require("./loading");

var _appointmentCollection = _interopRequireDefault(require("./appointments/appointmentCollection"));

var _appointments = _interopRequireDefault(require("./appointments.layout_manager"));

var _appointment_model = _interopRequireDefault(require("./appointment_model"));

var _header = require("./header/header");

var _resourceManager = require("./resources/resourceManager");

var _subscribes = _interopRequireDefault(require("./subscribes"));

var _recurrence = require("./recurrence");

var _utils = _interopRequireDefault(require("./utils.timeZone"));

var _uiScheduler = _interopRequireDefault(require("./workspaces/ui.scheduler.agenda"));

var _uiScheduler2 = _interopRequireDefault(require("./workspaces/ui.scheduler.timeline_day"));

var _uiScheduler3 = _interopRequireDefault(require("./workspaces/ui.scheduler.timeline_month"));

var _uiScheduler4 = _interopRequireDefault(require("./workspaces/ui.scheduler.timeline_week"));

var _uiScheduler5 = _interopRequireDefault(require("./workspaces/ui.scheduler.timeline_work_week"));

var _uiScheduler6 = _interopRequireDefault(require("./workspaces/ui.scheduler.work_space_day"));

var _uiScheduler7 = _interopRequireDefault(require("./workspaces/ui.scheduler.work_space_month"));

var _uiScheduler8 = _interopRequireDefault(require("./workspaces/ui.scheduler.work_space_week"));

var _uiScheduler9 = _interopRequireDefault(require("./workspaces/ui.scheduler.work_space_work_week"));

var _appointmentAdapter = _interopRequireDefault(require("./appointmentAdapter"));

var _timeZoneCalculator = require("./timeZoneCalculator");

var _dataStructures = require("./dataStructures");

var _appointmentSettingsGenerator = require("./appointmentSettingsGenerator");

var _appointmentFilter = _interopRequireDefault(require("./appointments/appointmentFilter"));

var _utils2 = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// STYLE scheduler
var MINUTES_IN_HOUR = 60;
var WIDGET_CLASS = 'dx-scheduler';
var WIDGET_SMALL_CLASS = "".concat(WIDGET_CLASS, "-small");
var WIDGET_ADAPTIVE_CLASS = "".concat(WIDGET_CLASS, "-adaptive");
var WIDGET_WIN_NO_TOUCH_CLASS = "".concat(WIDGET_CLASS, "-win-no-touch");
var WIDGET_READONLY_CLASS = "".concat(WIDGET_CLASS, "-readonly");
var WIDGET_SMALL_WIDTH = 400;
var FULL_DATE_FORMAT = 'yyyyMMddTHHmmss';
var UTC_FULL_DATE_FORMAT = FULL_DATE_FORMAT + 'Z';
var VIEWS_CONFIG = {
  day: {
    workSpace: _uiScheduler6.default,
    renderingStrategy: 'vertical'
  },
  week: {
    workSpace: _uiScheduler8.default,
    renderingStrategy: 'vertical'
  },
  workWeek: {
    workSpace: _uiScheduler9.default,
    renderingStrategy: 'vertical'
  },
  month: {
    workSpace: _uiScheduler7.default,
    renderingStrategy: 'horizontalMonth'
  },
  timelineDay: {
    workSpace: _uiScheduler2.default,
    renderingStrategy: 'horizontal'
  },
  timelineWeek: {
    workSpace: _uiScheduler4.default,
    renderingStrategy: 'horizontal'
  },
  timelineWorkWeek: {
    workSpace: _uiScheduler5.default,
    renderingStrategy: 'horizontal'
  },
  timelineMonth: {
    workSpace: _uiScheduler3.default,
    renderingStrategy: 'horizontalMonthLine'
  },
  agenda: {
    workSpace: _uiScheduler.default,
    renderingStrategy: 'agenda'
  }
};
var StoreEventNames = {
  ADDING: 'onAppointmentAdding',
  ADDED: 'onAppointmentAdded',
  DELETING: 'onAppointmentDeleting',
  DELETED: 'onAppointmentDeleted',
  UPDATING: 'onAppointmentUpdating',
  UPDATED: 'onAppointmentUpdated'
};
var RECURRENCE_EDITING_MODE = {
  SERIES: 'editSeries',
  OCCURENCE: 'editOccurence',
  CANCEL: 'cancel'
};

var Scheduler = /*#__PURE__*/function (_Widget) {
  _inheritsLoose(Scheduler, _Widget);

  function Scheduler() {
    return _Widget.apply(this, arguments) || this;
  }

  var _proto = Scheduler.prototype;

  _proto._getDefaultOptions = function _getDefaultOptions() {
    var defaultOptions = (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
      views: ['day', 'week'],
      currentView: 'day',
      // TODO: should we calculate currentView if views array contains only one item, for example 'month'?
      currentDate: _date.default.trimTime(new Date()),
      min: undefined,
      max: undefined,
      dateSerializationFormat: undefined,
      firstDayOfWeek: undefined,
      groups: [],
      resources: [],
      dataSource: null,
      customizeDateNavigatorText: undefined,
      appointmentTemplate: 'item',
      dropDownAppointmentTemplate: 'dropDownAppointment',
      appointmentCollectorTemplate: 'appointmentCollector',
      dataCellTemplate: null,
      timeCellTemplate: null,
      resourceCellTemplate: null,
      dateCellTemplate: null,
      startDayHour: 0,
      endDayHour: 24,
      editing: {
        allowAdding: true,
        allowDeleting: true,
        allowDragging: true,
        allowResizing: true,
        allowUpdating: true,
        allowTimeZoneEditing: false,
        allowEditingTimeZones: false
      },
      showAllDayPanel: true,
      showCurrentTimeIndicator: true,
      shadeUntilCurrentTime: false,
      indicatorUpdateInterval: 300000,

      /**
          * @hidden
          * @name dxSchedulerOptions.indicatorTime
          * @type Date
          * @default undefined
          */
      indicatorTime: undefined,
      recurrenceEditMode: 'dialog',
      cellDuration: 30,
      maxAppointmentsPerCell: 'auto',
      selectedCellData: [],
      groupByDate: false,
      onAppointmentRendered: null,
      onAppointmentClick: null,
      onAppointmentDblClick: null,
      onAppointmentContextMenu: null,
      onCellClick: null,
      onCellContextMenu: null,
      onAppointmentAdding: null,
      onAppointmentAdded: null,
      onAppointmentUpdating: null,
      onAppointmentUpdated: null,
      onAppointmentDeleting: null,
      onAppointmentDeleted: null,
      onAppointmentFormOpening: null,
      appointmentTooltipTemplate: 'appointmentTooltip',

      /**
          * @hidden
          * @name dxSchedulerOptions.appointmentPopupTemplate
          * @type template|function
          * @default "appointmentPopup"
          * @type_function_param1 appointmentData:object
          * @type_function_param2 contentElement:DxElement
          * @type_function_return string|Element|jQuery
          */
      appointmentPopupTemplate: 'appointmentPopup',
      crossScrollingEnabled: false,
      useDropDownViewSwitcher: false,
      startDateExpr: 'startDate',
      endDateExpr: 'endDate',
      textExpr: 'text',
      descriptionExpr: 'description',
      allDayExpr: 'allDay',
      recurrenceRuleExpr: 'recurrenceRule',
      recurrenceExceptionExpr: 'recurrenceException',
      disabledExpr: 'disabled',
      remoteFiltering: false,
      timeZone: '',
      startDateTimeZoneExpr: 'startDateTimeZone',
      endDateTimeZoneExpr: 'endDateTimeZone',
      noDataText: _message.default.format('dxCollectionWidget-noDataText'),
      adaptivityEnabled: false,
      allowMultipleCellSelection: true,
      scrolling: {
        mode: 'standard'
      },
      renovateRender: true,
      _draggingMode: 'outlook',
      _appointmentTooltipOffset: {
        x: 0,
        y: 0
      },
      _appointmentTooltipButtonsPosition: 'bottom',
      _appointmentTooltipOpenButtonText: _message.default.format('dxScheduler-openAppointment'),
      _dropDownButtonIcon: 'overflow',
      _appointmentCountPerCell: 2,
      _collectorOffset: 0,
      _appointmentOffset: 26
      /**
          * @name dxSchedulerOptions.activeStateEnabled
          * @hidden
          */

      /**
          * @name dxSchedulerOptions.hoverStateEnabled
          * @hidden
          */

    });
    return (0, _extend.extend)(true, defaultOptions, {
      integrationOptions: {
        useDeferUpdateForTemplates: false
      }
    });
  };

  _proto._defaultOptionsRules = function _defaultOptionsRules() {
    return _Widget.prototype._defaultOptionsRules.call(this).concat([{
      device: function device() {
        return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device: function device() {
        return !_devices.default.current().generic;
      },
      options: {
        useDropDownViewSwitcher: true,
        editing: {
          allowDragging: false,
          allowResizing: false
        }
      }
    }, {
      device: function device() {
        return (0, _themes.isMaterial)();
      },
      options: {
        useDropDownViewSwitcher: true,
        dateCellTemplate: function dateCellTemplate(data, index, element) {
          var text = data.text;
          text.split(' ').forEach(function (text, index) {
            var span = (0, _renderer.default)('<span>').text(text).addClass('dx-scheduler-header-panel-cell-date');
            (0, _renderer.default)(element).append(span);
            if (!index) (0, _renderer.default)(element).append(' ');
          });
        },
        _appointmentTooltipOffset: {
          x: 0,
          y: 11
        },
        _appointmentTooltipButtonsPosition: 'top',
        _appointmentTooltipOpenButtonText: null,
        _dropDownButtonIcon: 'chevrondown',
        _appointmentCountPerCell: 1,
        _collectorOffset: 20,
        _appointmentOffset: 30
      }
    }]);
  };

  _proto._setDeprecatedOptions = function _setDeprecatedOptions() {
    _Widget.prototype._setDeprecatedOptions.call(this);

    (0, _extend.extend)(this._deprecatedOptions, {
      dropDownAppointmentTemplate: {
        since: '19.2',
        message: 'appointmentTooltipTemplate'
      },
      allowEditingTimeZones: {
        since: '20.1',
        alias: 'allowTimeZoneEditing'
      }
    });
  };

  _proto._getAppointmentSettingsGenerator = function _getAppointmentSettingsGenerator() {
    return new _appointmentSettingsGenerator.AppointmentSettingsGenerator(this);
  };

  _proto._postponeDataSourceLoading = function _postponeDataSourceLoading(promise) {
    this.postponedOperations.add('_reloadDataSource', this._reloadDataSource.bind(this), promise);
  };

  _proto._postponeResourceLoading = function _postponeResourceLoading() {
    var _this = this;

    var whenLoaded = this.postponedOperations.add('_loadResources', function () {
      return _this._loadResources();
    });
    var resolveCallbacks = new _deferred.Deferred();
    whenLoaded.done(function (resources) {
      resolveCallbacks.resolve(resources);
    });

    this._postponeDataSourceLoading(whenLoaded);

    return resolveCallbacks.promise();
  };

  _proto._optionChanged = function _optionChanged(args) {
    var _this2 = this;

    var value = args.value;
    var name = args.name;

    switch (args.name) {
      case 'customizeDateNavigatorText':
        this._updateOption('header', name, value);

        break;

      case 'firstDayOfWeek':
        this._updateOption('workSpace', name, value);

        this._updateOption('header', name, value);

        break;

      case 'currentDate':
        value = this._dateOption(name);
        value = _date.default.trimTime(new Date(value));
        this.option('selectedCellData', []);

        this._workSpace.option(name, new Date(value));

        this._header.option(name, new Date(value));

        this._header.option('displayedDate', this._workSpace._getViewStartByOptions());

        this._appointments.option('items', []);

        this._filterAppointmentsByDate();

        this._postponeDataSourceLoading();

        break;

      case 'dataSource':
        this._initDataSource();

        this._appointmentModel.setDataSource(this._dataSource);

        this._postponeResourceLoading().done(function (resources) {
          _this2._filterAppointmentsByDate();

          _this2._updateOption('workSpace', 'showAllDayPanel', _this2.option('showAllDayPanel'));
        });

        break;

      case 'min':
      case 'max':
        value = this._dateOption(name);

        this._updateOption('header', name, new Date(value));

        this._updateOption('workSpace', name, new Date(value));

        break;

      case 'views':
        this._processCurrentView();

        if (this._getCurrentViewOptions()) {
          this.repaint();
        } else {
          this._header.option(name, value);
        }

        break;

      case 'useDropDownViewSwitcher':
        this._header.option(name, value);

        break;

      case 'currentView':
        this._processCurrentView();

        this.fire('validateDayHours');
        this.getLayoutManager().initRenderingStrategy(this._getAppointmentsRenderingStrategy());

        this._validateCellDuration();

        this._appointments.option({
          items: [],
          allowDrag: this._allowDragging(),
          allowResize: this._allowResizing(),
          itemTemplate: this._getAppointmentTemplate('appointmentTemplate')
        });

        this._postponeResourceLoading().done(function (resources) {
          _this2._refreshWorkSpace(resources);

          _this2._updateHeader();

          _this2._filterAppointmentsByDate();

          _this2._appointments.option('allowAllDayResize', value !== 'day');
        });

        break;

      case 'appointmentTemplate':
        this._appointments.option('itemTemplate', value);

        break;

      case 'dateCellTemplate':
      case 'resourceCellTemplate':
      case 'dataCellTemplate':
      case 'timeCellTemplate':
        this.repaint();
        break;

      case 'groups':
        this._postponeResourceLoading().done(function (resources) {
          _this2._refreshWorkSpace(resources);

          _this2._filterAppointmentsByDate();
        });

        break;

      case 'resources':
        this._resourcesManager.setResources(this.option('resources'));

        this._appointmentModel.setDataAccessors(this._combineDataAccessors());

        this._postponeResourceLoading().done(function (resources) {
          _this2._appointments.option('items', []);

          _this2._refreshWorkSpace(resources);

          _this2._filterAppointmentsByDate();
        });

        break;

      case 'startDayHour':
      case 'endDayHour':
        this.fire('validateDayHours');

        this._appointments.option('items', []);

        this._updateOption('workSpace', name, value);

        this._appointments.repaint();

        this._filterAppointmentsByDate();

        this._postponeDataSourceLoading();

        break;

      case StoreEventNames.ADDING:
      case StoreEventNames.ADDED:
      case StoreEventNames.UPDATING:
      case StoreEventNames.UPDATED:
      case StoreEventNames.DELETING:
      case StoreEventNames.DELETED:
      case 'onAppointmentFormOpening':
        this._actions[name] = this._createActionByOption(name);
        break;

      case 'onAppointmentRendered':
        this._appointments.option('onItemRendered', this._getAppointmentRenderedAction());

        break;

      case 'onAppointmentClick':
        this._appointments.option('onItemClick', this._createActionByOption(name));

        break;

      case 'onAppointmentDblClick':
        this._appointments.option(name, this._createActionByOption(name));

        break;

      case 'onAppointmentContextMenu':
        this._appointments.option('onItemContextMenu', this._createActionByOption(name));

        break;

      case 'noDataText':
      case 'allowMultipleCellSelection':
      case 'selectedCellData':
      case 'accessKey':
      case 'onCellClick':
        this._workSpace.option(name, value);

        break;

      case 'onCellContextMenu':
        this._workSpace.option(name, value);

        break;

      case 'crossScrollingEnabled':
        this._postponeResourceLoading().done(function (resources) {
          _this2._appointments.option('items', []);

          _this2._refreshWorkSpace(resources);

          if (_this2._readyToRenderAppointments) {
            _this2._appointments.option('items', _this2._getAppointmentsToRepaint());
          }
        });

        break;

      case 'cellDuration':
        this._validateCellDuration();

        this._appointments.option('items', []);

        if (this._readyToRenderAppointments) {
          this._updateOption('workSpace', 'hoursInterval', value / 60);

          this._appointments.option('items', this._getAppointmentsToRepaint());
        }

        break;

      case 'tabIndex':
      case 'focusStateEnabled':
        this._updateOption('header', name, value);

        this._updateOption('workSpace', name, value);

        this._appointments.option(name, value);

        _Widget.prototype._optionChanged.call(this, args);

        break;

      case 'width':
        // TODO: replace with css
        this._updateOption('header', name, value);

        if (this.option('crossScrollingEnabled')) {
          this._updateOption('workSpace', 'width', value);
        }

        _Widget.prototype._optionChanged.call(this, args);

        this._dimensionChanged();

        break;

      case 'height':
        _Widget.prototype._optionChanged.call(this, args);

        this._dimensionChanged();

        break;

      case 'editing':
        {
          this._initEditing();

          var editing = this._editing;

          this._bringEditingModeToAppointments(editing);

          this.hideAppointmentTooltip();

          this._cleanPopup();

          break;
        }

      case 'showAllDayPanel':
        this._postponeResourceLoading().done(function (resources) {
          _this2._filterAppointmentsByDate();

          _this2._updateOption('workSpace', 'allDayExpanded', value);

          _this2._updateOption('workSpace', name, value);
        });

        break;

      case 'showCurrentTimeIndicator':
      case 'indicatorTime':
      case 'indicatorUpdateInterval':
      case 'shadeUntilCurrentTime':
      case 'groupByDate':
        this._updateOption('workSpace', name, value);

        this.repaint();
        break;

      case 'appointmentDragging':
      case 'appointmentTooltipTemplate':
      case 'appointmentPopupTemplate':
      case 'recurrenceEditMode':
      case 'remoteFiltering':
      case 'timeZone':
      case 'dropDownAppointmentTemplate':
      case 'appointmentCollectorTemplate':
      case '_appointmentTooltipOffset':
      case '_appointmentTooltipButtonsPosition':
      case '_appointmentTooltipOpenButtonText':
      case '_dropDownButtonIcon':
      case '_appointmentCountPerCell':
      case '_collectorOffset':
      case '_appointmentOffset':
        this.repaint();
        break;

      case 'dateSerializationFormat':
        break;

      case 'maxAppointmentsPerCell':
        break;

      case 'startDateExpr':
      case 'endDateExpr':
      case 'startDateTimeZoneExpr':
      case 'endDateTimeZoneExpr':
      case 'textExpr':
      case 'descriptionExpr':
      case 'allDayExpr':
      case 'recurrenceRuleExpr':
      case 'recurrenceExceptionExpr':
      case 'disabledExpr':
        this._updateExpression(name, value);

        this._appointmentModel.setDataAccessors(this._combineDataAccessors());

        this._initAppointmentTemplate();

        this.repaint();
        break;

      case 'adaptivityEnabled':
        this._toggleAdaptiveClass();

        this.repaint();
        break;

      case 'scrolling':
        this.option('crossScrollingEnabled', this._isHorizontalVirtualScrolling() || this.option('crossScrollingEnabled'));

        this._updateOption('workSpace', args.fullName, value);

        break;

      case 'renovateRender':
        this._updateOption('workSpace', name, value);

        break;

      case '_draggingMode':
        this._workSpace.option('draggingMode', value);

        break;

      default:
        _Widget.prototype._optionChanged.call(this, args);

    }
  };

  _proto._updateHeader = function _updateHeader() {
    var viewCountConfig = this._getViewCountConfig();

    this._header.option('intervalCount', viewCountConfig.intervalCount);

    this._header.option('displayedDate', this._workSpace._getViewStartByOptions());

    this._header.option('min', this._dateOption('min'));

    this._header.option('max', this._dateOption('max'));

    this._header.option('currentDate', this._dateOption('currentDate'));

    this._header.option('firstDayOfWeek', this._getCurrentViewOption('firstDayOfWeek'));

    this._header.option('currentView', this._currentView);
  };

  _proto._dateOption = function _dateOption(optionName) {
    var optionValue = this._getCurrentViewOption(optionName);

    return _date_serialization.default.deserializeDate(optionValue);
  };

  _proto._getSerializationFormat = function _getSerializationFormat(optionName) {
    var value = this._getCurrentViewOption(optionName);

    if (typeof value === 'number') {
      return 'number';
    }

    if (!(0, _type.isString)(value)) {
      return;
    }

    return _date_serialization.default.getDateSerializationFormat(value);
  };

  _proto._bringEditingModeToAppointments = function _bringEditingModeToAppointments(editing) {
    var editingConfig = {
      allowDelete: editing.allowUpdating && editing.allowDeleting
    };

    if (!this._isAgenda()) {
      editingConfig.allowDrag = editing.allowDragging;
      editingConfig.allowResize = editing.allowResizing;
      editingConfig.allowAllDayResize = editing.allowResizing && this._supportAllDayResizing();
    }

    this._appointments.option(editingConfig);

    this.repaint();
  };

  _proto._isAgenda = function _isAgenda() {
    return this._getAppointmentsRenderingStrategy() === 'agenda';
  };

  _proto._allowDragging = function _allowDragging() {
    return this._editing.allowDragging && !this._isAgenda();
  };

  _proto._allowResizing = function _allowResizing() {
    return this._editing.allowResizing && !this._isAgenda();
  };

  _proto._allowAllDayResizing = function _allowAllDayResizing() {
    return this._editing.allowResizing && this._supportAllDayResizing();
  };

  _proto._supportAllDayResizing = function _supportAllDayResizing() {
    return this._getCurrentViewType() !== 'day' || this._currentView.intervalCount > 1;
  };

  _proto._isAllDayExpanded = function _isAllDayExpanded(items) {
    return this.option('showAllDayPanel') && this.appointmentFilter.hasAllDayAppointments(items);
  };

  _proto._getTimezoneOffsetByOption = function _getTimezoneOffsetByOption(date) {
    return _utils.default.calculateTimezoneByValue(this.option('timeZone'), date);
  };

  _proto._filterAppointmentsByDate = function _filterAppointmentsByDate() {
    var dateRange = this._workSpace.getDateRange();

    var startDate = this.timeZoneCalculator.createDate(dateRange[0], {
      path: 'fromGrid'
    });
    var endDate = this.timeZoneCalculator.createDate(dateRange[1], {
      path: 'fromGrid'
    });

    this._appointmentModel.filterByDate(startDate, endDate, this.option('remoteFiltering'), this.option('dateSerializationFormat'));
  };

  _proto._loadResources = function _loadResources() {
    var groups = this._getCurrentViewOption('groups');

    var result = new _deferred.Deferred();

    this._resourcesManager.loadResources(groups).done(function (resources) {
      this._loadedResources = resources;
      result.resolve(resources);
    }.bind(this));

    return result.promise();
  };

  _proto._reloadDataSource = function _reloadDataSource() {
    var result = new _deferred.Deferred();

    if (this._dataSource) {
      this._dataSource.load().done(function () {
        (0, _loading.hide)();

        this._fireContentReadyAction(result);
      }.bind(this)).fail(function () {
        (0, _loading.hide)();
        result.reject();
      });

      this._dataSource.isLoading() && (0, _loading.show)({
        container: this.$element(),
        position: {
          of: this.$element()
        }
      });
    } else {
      this._fireContentReadyAction(result);
    }

    return result.promise();
  };

  _proto._fireContentReadyAction = function _fireContentReadyAction(result) {
    var contentReadyBase = _Widget.prototype._fireContentReadyAction.bind(this);

    var fireContentReady = function fireContentReady() {
      contentReadyBase();
      result === null || result === void 0 ? void 0 : result.resolve();
    };

    if (this._workSpaceRecalculation) {
      var _this$_workSpaceRecal;

      (_this$_workSpaceRecal = this._workSpaceRecalculation) === null || _this$_workSpaceRecal === void 0 ? void 0 : _this$_workSpaceRecal.done(function () {
        fireContentReady();
      });
    } else {
      fireContentReady();
    }
  };

  _proto._dimensionChanged = function _dimensionChanged() {
    var filteredItems = this.getFilteredItems();

    this._toggleSmallClass();

    if (!this._isAgenda() && filteredItems && this._isVisible()) {
      this._workSpace._cleanAllowedPositions();

      this._workSpace.option('allDayExpanded', this._isAllDayExpanded(filteredItems));

      this._workSpace._dimensionChanged();

      var appointments = this._layoutManager.createAppointmentsMap(filteredItems);

      this._appointments.option('items', appointments);
    }

    this.hideAppointmentTooltip();

    this._appointmentPopup.triggerResize();

    this._appointmentPopup.updatePopupFullScreenMode();
  };

  _proto._clean = function _clean() {
    this._cleanPopup();

    _Widget.prototype._clean.call(this);
  };

  _proto._toggleSmallClass = function _toggleSmallClass() {
    var width = (0, _position.getBoundingRect)(this.$element().get(0)).width;
    this.$element().toggleClass(WIDGET_SMALL_CLASS, width < WIDGET_SMALL_WIDTH);
  };

  _proto._toggleAdaptiveClass = function _toggleAdaptiveClass() {
    this.$element().toggleClass(WIDGET_ADAPTIVE_CLASS, this.option('adaptivityEnabled'));
  };

  _proto._visibilityChanged = function _visibilityChanged(visible) {
    visible && this._dimensionChanged();
  };

  _proto._dataSourceOptions = function _dataSourceOptions() {
    return {
      paginate: false
    };
  };

  _proto._init = function _init() {
    var _this3 = this;

    this._initExpressions({
      startDate: this.option('startDateExpr'),
      endDate: this.option('endDateExpr'),
      startDateTimeZone: this.option('startDateTimeZoneExpr'),
      endDateTimeZone: this.option('endDateTimeZoneExpr'),
      allDay: this.option('allDayExpr'),
      text: this.option('textExpr'),
      description: this.option('descriptionExpr'),
      recurrenceRule: this.option('recurrenceRuleExpr'),
      recurrenceException: this.option('recurrenceExceptionExpr'),
      disabled: this.option('disabledExpr')
    });

    _Widget.prototype._init.call(this);

    this._initDataSource();

    this._loadedResources = [];
    this.$element().addClass(WIDGET_CLASS).toggleClass(WIDGET_WIN_NO_TOUCH_CLASS, !!(_browser.default.msie && _support.touch));

    this._initEditing();

    this._resourcesManager = new _resourceManager.ResourceManager(this.option('resources'));

    var combinedDataAccessors = this._combineDataAccessors();

    this._appointmentModel = new _appointment_model.default(this._dataSource, combinedDataAccessors, this.getAppointmentDurationInMinutes());

    this._initActions();

    this._compactAppointmentsHelper = new _compactAppointmentsHelper.CompactAppointmentsHelper(this);
    this._asyncTemplatesTimers = [];
    this._dataSourceLoadedCallback = (0, _callbacks.default)();
    this._subscribes = _subscribes.default;
    this.timeZoneCalculator = new _timeZoneCalculator.TimeZoneCalculator({
      getClientOffset: function getClientOffset(date) {
        return _utils.default.getClientTimezoneOffset(date);
      },
      getCommonOffset: function getCommonOffset(date, timeZone) {
        return _utils.default.calculateTimezoneByValue(timeZone || _this3.option('timeZone'), date);
      },
      getAppointmentOffset: function getAppointmentOffset(date, appointmentTimezone) {
        return _utils.default.calculateTimezoneByValue(appointmentTimezone, date);
      }
    });
  };

  _proto._initTemplates = function _initTemplates() {
    this._initAppointmentTemplate();

    this._templateManager.addDefaultTemplates({
      appointmentTooltip: new _empty_template.EmptyTemplate(),
      dropDownAppointment: new _empty_template.EmptyTemplate()
    });

    _Widget.prototype._initTemplates.call(this);
  };

  _proto._initAppointmentTemplate = function _initAppointmentTemplate() {
    var _this4 = this;

    var expr = this._dataAccessors.expr;

    var createGetter = function createGetter(property) {
      return (0, _data.compileGetter)("appointmentData.".concat(property));
    };

    var getDate = function getDate(getter) {
      return function (data) {
        var value = getter(data);

        if (value instanceof Date) {
          return value.valueOf();
        }

        return value;
      };
    };

    this._templateManager.addDefaultTemplates(_defineProperty({}, 'item', new _bindable_template.BindableTemplate(function ($container, data, model) {
      return _this4.getAppointmentsInstance()._renderAppointmentTemplate($container, data, model);
    }, ['html', 'text', 'startDate', 'endDate', 'allDay', 'description', 'recurrenceRule', 'recurrenceException', 'startDateTimeZone', 'endDateTimeZone'], this.option('integrationOptions.watchMethod'), {
      'text': createGetter(expr.textExpr),
      'startDate': getDate(createGetter(expr.startDateExpr)),
      'endDate': getDate(createGetter(expr.endDateExpr)),
      'startDateTimeZone': createGetter(expr.startDateTimeZoneExpr),
      'endDateTimeZone': createGetter(expr.endDateTimeZoneExpr),
      'allDay': createGetter(expr.allDayExpr),
      'recurrenceRule': createGetter(expr.recurrenceRuleExpr)
    })));
  };

  _proto._combineDataAccessors = function _combineDataAccessors() {
    var resourcesDataAccessors = this._resourcesManager._dataAccessors;
    var result = (0, _extend.extend)(true, {}, this._dataAccessors);
    (0, _iterator.each)(resourcesDataAccessors, function (type, accessor) {
      result[type].resources = accessor;
    }.bind(this));
    return result;
  };

  _proto._renderContent = function _renderContent() {
    this._renderContentImpl();
  };

  _proto._dataSourceChangedHandler = function _dataSourceChangedHandler(result) {
    if (this._readyToRenderAppointments) {
      this._workSpaceRecalculation.done(function () {
        this._renderAppointments();

        var filteredItems = this.getFilteredItems();
        this.getWorkSpace().onDataSourceChanged(filteredItems);
      }.bind(this));
    }
  };

  _proto.isVirtualScrolling = function isVirtualScrolling() {
    var _this$getWorkSpace;

    return (_this$getWorkSpace = this.getWorkSpace()) === null || _this$getWorkSpace === void 0 ? void 0 : _this$getWorkSpace.isVirtualScrolling();
  };

  _proto._filterAppointments = function _filterAppointments() {
    return this.appointmentFilter.filter();
  };

  _proto._renderAppointments = function _renderAppointments() {
    var workspace = this.getWorkSpace();
    this._filteredItems = this._filterAppointments();
    workspace.preRenderAppointments({
      allDayExpanded: this._isAllDayExpanded(this._filteredItems),
      appointments: this._filteredItems
    });

    if (this._filteredItems.length && this._isVisible()) {
      this._appointments.option('items', this._getAppointmentsToRepaint());

      this._appointmentModel.cleanModelState();
    } else {
      this._appointments.option('items', []);
    }
  };

  _proto._getAppointmentsToRepaint = function _getAppointmentsToRepaint() {
    var appointments = this._layoutManager.createAppointmentsMap(this._filteredItems);

    return this._layoutManager.getRepaintedAppointments(appointments, this.getAppointmentsInstance().option('items'));
  };

  _proto._initExpressions = function _initExpressions(fields) {
    var isDateField = function isDateField(field) {
      return field === 'startDate' || field === 'endDate';
    };

    if (!this._dataAccessors) {
      this._dataAccessors = {
        getter: {},
        setter: {},
        expr: {}
      };
    }

    (0, _iterator.each)(fields, function (name, expr) {
      if (expr) {
        var getter = (0, _data.compileGetter)(expr);
        var setter = (0, _data.compileSetter)(expr);
        var dateGetter;
        var dateSetter;

        if (isDateField(name)) {
          var that = this;

          dateGetter = function dateGetter() {
            var value = getter.apply(this, arguments);

            if ((0, _config.default)().forceIsoDateParsing) {
              if (!that.option('dateSerializationFormat')) {
                var format = _date_serialization.default.getDateSerializationFormat(value);

                if (format) {
                  that.option('dateSerializationFormat', format);
                }
              }

              value = _date_serialization.default.deserializeDate(value);
            }

            return value;
          };

          dateSetter = function dateSetter(object, value) {
            if ((0, _config.default)().forceIsoDateParsing || that.option('dateSerializationFormat')) {
              value = _date_serialization.default.serializeDate(value, that.option('dateSerializationFormat'));
            }

            setter.call(this, object, value);
          };
        }

        this._dataAccessors.getter[name] = dateGetter || getter;
        this._dataAccessors.setter[name] = dateSetter || setter;
        this._dataAccessors.expr[name + 'Expr'] = expr;
      } else {
        delete this._dataAccessors.getter[name];
        delete this._dataAccessors.setter[name];
        delete this._dataAccessors.expr[name + 'Expr'];
      }
    }.bind(this));
  };

  _proto._updateExpression = function _updateExpression(name, value) {
    var exprObj = {};
    exprObj[name.replace('Expr', '')] = value;

    this._initExpressions(exprObj);
  };

  _proto._initEditing = function _initEditing() {
    var editing = this.option('editing');
    this._editing = {
      allowAdding: !!editing,
      allowUpdating: !!editing,
      allowDeleting: !!editing,
      allowResizing: !!editing,
      allowDragging: !!editing
    };

    if ((0, _type.isObject)(editing)) {
      this._editing = (0, _extend.extend)(this._editing, editing);
    }

    this._editing.allowDragging = this._editing.allowDragging && this._editing.allowUpdating;
    this._editing.allowResizing = this._editing.allowResizing && this._editing.allowUpdating;
    this.$element().toggleClass(WIDGET_READONLY_CLASS, this._isReadOnly());
  };

  _proto._isReadOnly = function _isReadOnly() {
    var result = true;
    var editing = this._editing;

    for (var prop in editing) {
      if (Object.prototype.hasOwnProperty.call(editing, prop)) {
        result = result && !editing[prop];
      }
    }

    return result;
  };

  _proto._dispose = function _dispose() {
    var _this$_recurrenceDial;

    this._appointmentTooltip && this._appointmentTooltip.dispose();
    (_this$_recurrenceDial = this._recurrenceDialog) === null || _this$_recurrenceDial === void 0 ? void 0 : _this$_recurrenceDial.hide(RECURRENCE_EDITING_MODE.CANCEL);
    this.hideAppointmentPopup();
    this.hideAppointmentTooltip();

    this._asyncTemplatesTimers.forEach(clearTimeout);

    this._asyncTemplatesTimers = [];

    _Widget.prototype._dispose.call(this);
  };

  _proto._initActions = function _initActions() {
    this._actions = {
      'onAppointmentAdding': this._createActionByOption(StoreEventNames.ADDING),
      'onAppointmentAdded': this._createActionByOption(StoreEventNames.ADDED),
      'onAppointmentUpdating': this._createActionByOption(StoreEventNames.UPDATING),
      'onAppointmentUpdated': this._createActionByOption(StoreEventNames.UPDATED),
      'onAppointmentDeleting': this._createActionByOption(StoreEventNames.DELETING),
      'onAppointmentDeleted': this._createActionByOption(StoreEventNames.DELETED),
      'onAppointmentFormOpening': this._createActionByOption('onAppointmentFormOpening')
    };
  };

  _proto._getAppointmentRenderedAction = function _getAppointmentRenderedAction() {
    return this._createActionByOption('onAppointmentRendered', {
      excludeValidators: ['disabled', 'readOnly']
    });
  };

  _proto._renderFocusTarget = function _renderFocusTarget() {
    return (0, _common.noop)();
  };

  _proto._initMarkup = function _initMarkup() {
    _Widget.prototype._initMarkup.call(this);

    this.fire('validateDayHours');

    this._validateCellDuration();

    this._processCurrentView();

    this._renderHeader();

    this._layoutManager = new _appointments.default(this, this._getAppointmentsRenderingStrategy());
    this._appointments = this._createComponent('<div>', _appointmentCollection.default, this._appointmentsConfig());

    this._appointments.option('itemTemplate', this._getAppointmentTemplate('appointmentTemplate'));

    this._appointmentTooltip = new (this.option('adaptivityEnabled') ? _mobileTooltipStrategy.MobileTooltipStrategy : _desktopTooltipStrategy.DesktopTooltipStrategy)(this._getAppointmentTooltipOptions());
    this._appointmentPopup = new _appointmentPopup.default(this);

    if (this._isLoaded() || this._isDataSourceLoading()) {
      this._initMarkupCore(this._loadedResources);

      this._dataSourceChangedHandler(this._dataSource.items());

      this._fireContentReadyAction();
    } else {
      this._loadResources().done(function (resources) {
        this._initMarkupCore(resources);

        this._reloadDataSource();
      }.bind(this));
    }
  };

  _proto._getAppointmentTooltipOptions = function _getAppointmentTooltipOptions() {
    var _this5 = this;

    var that = this;
    return {
      createComponent: that._createComponent.bind(that),
      container: that.$element(),
      getScrollableContainer: that.getWorkSpaceScrollableContainer.bind(that),
      addDefaultTemplates: that._templateManager.addDefaultTemplates.bind(that._templateManager),
      getAppointmentTemplate: that._getAppointmentTemplate.bind(that),
      showAppointmentPopup: that.showAppointmentPopup.bind(that),
      checkAndDeleteAppointment: that.checkAndDeleteAppointment.bind(that),
      isAppointmentInAllDayPanel: that.isAppointmentInAllDayPanel.bind(that),
      createFormattedDateText: function createFormattedDateText(appointment, targetedAppointment, format) {
        return _this5.fire('getTextAndFormatDate', appointment, targetedAppointment, format);
      },
      getAppointmentDisabled: function getAppointmentDisabled(appointment) {
        return _this5.createAppointmentAdapter(appointment).disabled;
      }
    };
  };

  _proto.checkAndDeleteAppointment = function checkAndDeleteAppointment(appointment, targetedAppointment) {
    var _this6 = this;

    var targetedAdapter = this.createAppointmentAdapter(targetedAppointment);

    this._checkRecurringAppointment(appointment, targetedAppointment, targetedAdapter.startDate, function () {
      _this6.deleteAppointment(appointment);
    }, true);
  };

  _proto._getExtraAppointmentTooltipOptions = function _getExtraAppointmentTooltipOptions() {
    return {
      rtlEnabled: this.option('rtlEnabled'),
      focusStateEnabled: this.option('focusStateEnabled'),
      editing: this.option('editing'),
      offset: this.option('_appointmentTooltipOffset')
    };
  };

  _proto.isAppointmentInAllDayPanel = function isAppointmentInAllDayPanel(appointmentData) {
    var workSpace = this._workSpace;
    var itTakesAllDay = this.appointmentTakesAllDay(appointmentData);
    return itTakesAllDay && workSpace.supportAllDayRow() && workSpace.option('showAllDayPanel');
  };

  _proto._initMarkupCore = function _initMarkupCore(resources) {
    var _this7 = this;

    this._readyToRenderAppointments = (0, _window.hasWindow)();
    this._workSpace && this._cleanWorkspace();

    this._renderWorkSpace(resources);

    this._appointments.option({
      fixedContainer: this._workSpace.getFixedContainer(),
      allDayContainer: this._workSpace.getAllDayContainer()
    });

    this._waitAsyncTemplate(function () {
      var _this7$_workSpaceReca;

      return (_this7$_workSpaceReca = _this7._workSpaceRecalculation) === null || _this7$_workSpaceReca === void 0 ? void 0 : _this7$_workSpaceReca.resolve();
    });

    this._filterAppointmentsByDate();
  };

  _proto._isLoaded = function _isLoaded() {
    return this._isResourcesLoaded() && this._isDataSourceLoaded();
  };

  _proto._isResourcesLoaded = function _isResourcesLoaded() {
    return (0, _type.isDefined)(this._loadedResources);
  };

  _proto._isDataSourceLoaded = function _isDataSourceLoaded() {
    return this._dataSource && this._dataSource.isLoaded();
  };

  _proto._render = function _render() {
    // NOTE: remove small class applying after adaptivity implementation
    this._toggleSmallClass();

    this._toggleAdaptiveClass();

    _Widget.prototype._render.call(this);
  };

  _proto._renderHeader = function _renderHeader() {
    var $header = (0, _renderer.default)('<div>').appendTo(this.$element());
    this._header = this._createComponent($header, _header.Header, this._headerConfig());
  };

  _proto._headerConfig = function _headerConfig() {
    var _this8 = this;

    var currentViewOptions = this._getCurrentViewOptions();

    var countConfig = this._getViewCountConfig();

    var result = (0, _extend.extend)({
      isAdaptive: this.option('adaptivityEnabled'),
      firstDayOfWeek: this.option('firstDayOfWeek'),
      currentView: this._currentView,
      tabIndex: this.option('tabIndex'),
      focusStateEnabled: this.option('focusStateEnabled'),
      width: this.option('width'),
      rtlEnabled: this.option('rtlEnabled'),
      useDropDownViewSwitcher: this.option('useDropDownViewSwitcher'),
      _dropDownButtonIcon: this.option('_dropDownButtonIcon'),
      customizeDateNavigatorText: this.option('customizeDateNavigatorText')
    }, currentViewOptions);
    result.observer = this;
    result.intervalCount = countConfig.intervalCount;
    result.views = this.option('views');
    result.min = new Date(this._dateOption('min'));
    result.max = new Date(this._dateOption('max'));
    result.currentDate = _date.default.trimTime(new Date(this._dateOption('currentDate')));

    result.todayDate = function () {
      var result = _this8.timeZoneCalculator.createDate(new Date(), {
        path: 'toGrid'
      });

      return result;
    };

    return result;
  };

  _proto._appointmentsConfig = function _appointmentsConfig() {
    var that = this;
    var config = {
      observer: this,
      onItemRendered: this._getAppointmentRenderedAction(),
      onItemClick: this._createActionByOption('onAppointmentClick'),
      onItemContextMenu: this._createActionByOption('onAppointmentContextMenu'),
      onAppointmentDblClick: this._createActionByOption('onAppointmentDblClick'),
      tabIndex: this.option('tabIndex'),
      focusStateEnabled: this.option('focusStateEnabled'),
      allowDrag: this._allowDragging(),
      allowDelete: this._editing.allowUpdating && this._editing.allowDeleting,
      allowResize: this._allowResizing(),
      allowAllDayResize: this._allowAllDayResizing(),
      rtlEnabled: this.option('rtlEnabled'),
      currentView: this.option('currentView'),
      onContentReady: function onContentReady() {
        that._workSpace && that._workSpace.option('allDayExpanded', that._isAllDayExpanded(that.getFilteredItems()));
      }
    };
    return config;
  };

  _proto.getCollectorOffset = function getCollectorOffset() {
    if (this._workSpace.needApplyCollectorOffset() && !this.option('adaptivityEnabled')) {
      return this.option('_collectorOffset');
    } else {
      return 0;
    }
  };

  _proto.getAppointmentDurationInMinutes = function getAppointmentDurationInMinutes() {
    return this._getCurrentViewOption('cellDuration');
  };

  _proto._processCurrentView = function _processCurrentView() {
    var views = this.option('views');
    var currentView = this.option('currentView');
    var that = this;
    this._currentView = null;
    (0, _iterator.each)(views, function (_, view) {
      var isViewIsObject = (0, _type.isObject)(view);
      var viewName = isViewIsObject ? view.name : view;
      var viewType = view.type;

      if (currentView === viewName || currentView === viewType) {
        that._currentView = view;
        return false;
      }
    });

    if (!this._currentView) {
      var isCurrentViewValid = !!VIEWS_CONFIG[currentView];

      if (isCurrentViewValid) {
        this._currentView = currentView;
      } else {
        this._currentView = views[0];
      }
    }
  };

  _proto._validateCellDuration = function _validateCellDuration() {
    var endDayHour = this._getCurrentViewOption('endDayHour');

    var startDayHour = this._getCurrentViewOption('startDayHour');

    var cellDuration = this._getCurrentViewOption('cellDuration');

    if ((endDayHour - startDayHour) * MINUTES_IN_HOUR % cellDuration !== 0) {
      _ui.default.log('W1015');
    }
  };

  _proto._getCurrentViewType = function _getCurrentViewType() {
    return this._currentView.type || this._currentView;
  };

  _proto._getAppointmentsRenderingStrategy = function _getAppointmentsRenderingStrategy() {
    return VIEWS_CONFIG[this._getCurrentViewType()].renderingStrategy;
  };

  _proto._renderWorkSpace = function _renderWorkSpace(groups) {
    this._readyToRenderAppointments && this._toggleSmallClass();
    var $workSpace = (0, _renderer.default)('<div>').appendTo(this.$element());

    var countConfig = this._getViewCountConfig();

    var workSpaceComponent = VIEWS_CONFIG[this._getCurrentViewType()].workSpace;

    var workSpaceConfig = this._workSpaceConfig(groups, countConfig);

    this._workSpace = this._createComponent($workSpace, workSpaceComponent, workSpaceConfig);
    this._allowDragging() && this._workSpace.initDragBehavior(this, this._all);

    this._workSpace._attachTablesEvents();

    this._workSpace.getWorkArea().append(this._appointments.$element());

    this._recalculateWorkspace();

    countConfig.startDate && this._header && this._header.option('currentDate', this._workSpace._getHeaderDate());

    this._appointments.option('_collectorOffset', this.getCollectorOffset());
  };

  _proto._getViewCountConfig = function _getViewCountConfig() {
    var currentView = this.option('currentView');

    var view = this._getViewByName(currentView);

    var viewCount = view && view.intervalCount || 1;
    var startDate = view && view.startDate || null;
    return {
      intervalCount: viewCount,
      startDate: startDate
    };
  };

  _proto._getViewByName = function _getViewByName(name) {
    var views = this.option('views');

    for (var i = 0; i < views.length; i++) {
      if (views[i].name === name || views[i].type === name || views[i] === name) return views[i];
    }
  };

  _proto._recalculateWorkspace = function _recalculateWorkspace() {
    var _this9 = this;

    this._workSpaceRecalculation = new _deferred.Deferred();

    this._waitAsyncTemplate(function () {
      (0, _visibility_change.triggerResizeEvent)(_this9._workSpace.$element());

      _this9._workSpace._refreshDateTimeIndication();
    });
  };

  _proto._workSpaceConfig = function _workSpaceConfig(groups, countConfig) {
    var _currentViewOptions$s,
        _this10 = this;

    var currentViewOptions = this._getCurrentViewOptions();

    var scrolling = this.option('scrolling');
    var isVirtualScrolling = scrolling.mode === 'virtual' || ((_currentViewOptions$s = currentViewOptions.scrolling) === null || _currentViewOptions$s === void 0 ? void 0 : _currentViewOptions$s.mode) === 'virtual';
    var horizontalVirtualScrollingAllowed = isVirtualScrolling && (!(0, _type.isDefined)(scrolling.orientation) || ['horizontal', 'both'].filter(function (item) {
      var _currentViewOptions$s2;

      return scrolling.orientation === item || ((_currentViewOptions$s2 = currentViewOptions.scrolling) === null || _currentViewOptions$s2 === void 0 ? void 0 : _currentViewOptions$s2.orientation) === item;
    }).length > 0);
    var crossScrollingEnabled = this.option('crossScrollingEnabled') || horizontalVirtualScrollingAllowed;
    var result = (0, _extend.extend)({
      noDataText: this.option('noDataText'),
      firstDayOfWeek: this.option('firstDayOfWeek'),
      startDayHour: this.option('startDayHour'),
      endDayHour: this.option('endDayHour'),
      tabIndex: this.option('tabIndex'),
      accessKey: this.option('accessKey'),
      focusStateEnabled: this.option('focusStateEnabled'),
      cellDuration: this.option('cellDuration'),
      showAllDayPanel: this.option('showAllDayPanel'),
      showCurrentTimeIndicator: this.option('showCurrentTimeIndicator'),
      indicatorTime: this.option('indicatorTime'),
      indicatorUpdateInterval: this.option('indicatorUpdateInterval'),
      shadeUntilCurrentTime: this.option('shadeUntilCurrentTime'),
      allDayExpanded: this._appointments.option('items'),
      crossScrollingEnabled: crossScrollingEnabled,
      dataCellTemplate: this.option('dataCellTemplate'),
      timeCellTemplate: this.option('timeCellTemplate'),
      resourceCellTemplate: this.option('resourceCellTemplate'),
      dateCellTemplate: this.option('dateCellTemplate'),
      allowMultipleCellSelection: this.option('allowMultipleCellSelection'),
      selectedCellData: this.option('selectedCellData'),
      onSelectionChanged: function onSelectionChanged(args) {
        _this10.option('selectedCellData', args.selectedCellData);
      },
      groupByDate: this._getCurrentViewOption('groupByDate'),
      scrolling: scrolling,
      draggingMode: this.option('_draggingMode'),
      // TODO: SSR does not work correctly with renovated render
      renovateRender: this._isRenovatedRender(isVirtualScrolling)
    }, currentViewOptions);
    result.observer = this;
    result.intervalCount = countConfig.intervalCount;
    result.startDate = countConfig.startDate;
    result.groups = groups;
    result.onCellClick = this._createActionByOption('onCellClick');
    result.onCellContextMenu = this._createActionByOption('onCellContextMenu');
    result.min = new Date(this._dateOption('min'));
    result.max = new Date(this._dateOption('max'));
    result.currentDate = _date.default.trimTime(new Date(this._dateOption('currentDate')));
    result.hoursInterval = result.cellDuration / 60;
    result.allDayExpanded = this._isAllDayExpanded(this.getFilteredItems());
    result.dataCellTemplate = result.dataCellTemplate ? this._getTemplate(result.dataCellTemplate) : null;
    result.timeCellTemplate = result.timeCellTemplate ? this._getTemplate(result.timeCellTemplate) : null;
    result.resourceCellTemplate = result.resourceCellTemplate ? this._getTemplate(result.resourceCellTemplate) : null;
    result.dateCellTemplate = result.dateCellTemplate ? this._getTemplate(result.dateCellTemplate) : null;
    return result;
  };

  _proto._isRenovatedRender = function _isRenovatedRender(isVirtualScrolling) {
    return this.option('renovateRender') && (0, _window.hasWindow)() || isVirtualScrolling;
  };

  _proto._waitAsyncTemplate = function _waitAsyncTemplate(callback) {
    if (this._options.silent('templatesRenderAsynchronously')) {
      var timer = setTimeout(function () {
        callback();
        clearTimeout(timer);
      });

      this._asyncTemplatesTimers.push(timer);
    } else {
      callback();
    }
  };

  _proto._getCurrentViewOptions = function _getCurrentViewOptions() {
    return this._currentView;
  };

  _proto._getCurrentViewOption = function _getCurrentViewOption(optionName) {
    var currentViewOptions = this._getCurrentViewOptions();

    if (currentViewOptions && currentViewOptions[optionName] !== undefined) {
      return currentViewOptions[optionName];
    }

    return this.option(optionName);
  };

  _proto._getAppointmentTemplate = function _getAppointmentTemplate(optionName) {
    var currentViewOptions = this._getCurrentViewOptions();

    if (currentViewOptions && currentViewOptions[optionName]) {
      return this._getTemplate(currentViewOptions[optionName]);
    }

    return this._getTemplateByOption(optionName);
  };

  _proto._updateOption = function _updateOption(viewName, optionName, value) {
    var currentViewOptions = this._getCurrentViewOptions();

    if (!currentViewOptions || !(0, _type.isDefined)(currentViewOptions[optionName])) {
      this['_' + viewName].option(optionName, value);
    }
  };

  _proto._refreshWorkSpace = function _refreshWorkSpace(groups) {
    var _this11 = this;

    this._cleanWorkspace();

    delete this._workSpace;

    this._renderWorkSpace(groups);

    if (this._readyToRenderAppointments) {
      this._appointments.option({
        fixedContainer: this._workSpace.getFixedContainer(),
        allDayContainer: this._workSpace.getAllDayContainer()
      });

      this._waitAsyncTemplate(function () {
        return _this11._workSpaceRecalculation.resolve();
      });
    }
  };

  _proto._cleanWorkspace = function _cleanWorkspace() {
    this._appointments.$element().detach();

    this._workSpace._dispose();

    this._workSpace.$element().remove();

    this.option('selectedCellData', []);
  };

  _proto.getWorkSpaceScrollable = function getWorkSpaceScrollable() {
    return this._workSpace.getScrollable();
  };

  _proto.getWorkSpaceScrollableContainer = function getWorkSpaceScrollableContainer() {
    return this._workSpace.getScrollableContainer();
  };

  _proto.getWorkSpaceDateTableOffset = function getWorkSpaceDateTableOffset() {
    return !this.option('crossScrollingEnabled') || this.option('rtlEnabled') ? this._workSpace.getWorkSpaceLeftOffset() : 0;
  };

  _proto.getWorkSpace = function getWorkSpace() {
    return this._workSpace;
  };

  _proto.getAppointmentModel = function getAppointmentModel() {
    return this._appointmentModel;
  };

  _proto.getHeader = function getHeader() {
    return this._header;
  };

  _proto.getMaxAppointmentsPerCell = function getMaxAppointmentsPerCell() {
    return this._getCurrentViewOption('maxAppointmentsPerCell');
  };

  _proto._cleanPopup = function _cleanPopup() {
    this._appointmentPopup && this._appointmentPopup.dispose();
  };

  _proto._checkRecurringAppointment = function _checkRecurringAppointment(targetAppointment, singleAppointment, exceptionDate, callback, isDeleted, isPopupEditing, dragEvent) {
    var _this12 = this;

    delete this._updatedRecAppointment;
    var recurrenceRule = this.fire('getField', 'recurrenceRule', targetAppointment);

    if (!(0, _recurrence.getRecurrenceProcessor)().evalRecurrenceRule(recurrenceRule).isValid || !this._editing.allowUpdating) {
      callback();
      return;
    }

    var editMode = this.option('recurrenceEditMode');

    switch (editMode) {
      case 'series':
        callback();
        break;

      case 'occurrence':
        this._excludeAppointmentFromSeries(targetAppointment, singleAppointment, exceptionDate, isDeleted, isPopupEditing, dragEvent);

        break;

      default:
        if (dragEvent) {
          dragEvent.cancel = new _deferred.Deferred();
        }

        this._showRecurrenceChangeConfirm(isDeleted).done(function (editingMode) {
          editingMode === RECURRENCE_EDITING_MODE.SERIES && callback();
          editingMode === RECURRENCE_EDITING_MODE.OCCURENCE && _this12._excludeAppointmentFromSeries(targetAppointment, singleAppointment, exceptionDate, isDeleted, isPopupEditing, dragEvent);
        }).fail(function () {
          return _this12._appointments.moveAppointmentBack(dragEvent);
        });

    }
  };

  _proto._excludeAppointmentFromSeries = function _excludeAppointmentFromSeries(rawAppointment, newRawAppointment, exceptionDate, isDeleted, isPopupEditing, dragEvent) {
    var _this13 = this;

    var appointment = this.createAppointmentAdapter(_extends({}, rawAppointment));
    var newAppointment = this.createAppointmentAdapter(newRawAppointment);
    newAppointment.recurrenceRule = '';
    newAppointment.recurrenceException = '';
    var keyPropertyName = this._appointmentModel.keyName;
    delete newRawAppointment[keyPropertyName];
    var canCreateNewAppointment = !isDeleted && !isPopupEditing;

    if (canCreateNewAppointment) {
      this.addAppointment(newRawAppointment);
    }

    appointment.recurrenceException = this._createRecurrenceException(appointment, exceptionDate);

    if (isPopupEditing) {
      // TODO: need to refactor - move as parameter to appointment popup
      this._updatedRecAppointment = appointment.source();

      this._appointmentPopup.show(newRawAppointment, true);

      this._editAppointmentData = rawAppointment;
    } else {
      this._updateAppointment(rawAppointment, appointment.source(), function () {
        _this13._appointments.moveAppointmentBack(dragEvent);
      }, dragEvent);
    }
  };

  _proto._createRecurrenceException = function _createRecurrenceException(appointment, exceptionDate) {
    var result = [];

    if (appointment.recurrenceException) {
      result.push(appointment.recurrenceException);
    }

    result.push(this._getSerializedDate(exceptionDate, appointment.startDate, appointment.allDay));
    return result.join();
  };

  _proto._getSerializedDate = function _getSerializedDate(date, startDate, isAllDay) {
    isAllDay && date.setHours(startDate.getHours(), startDate.getMinutes(), startDate.getSeconds(), startDate.getMilliseconds());
    return _date_serialization.default.serializeDate(date, UTC_FULL_DATE_FORMAT);
  };

  _proto._showRecurrenceChangeConfirm = function _showRecurrenceChangeConfirm(isDeleted) {
    var message = _message.default.format(isDeleted ? 'dxScheduler-confirmRecurrenceDeleteMessage' : 'dxScheduler-confirmRecurrenceEditMessage');

    var seriesText = _message.default.format(isDeleted ? 'dxScheduler-confirmRecurrenceDeleteSeries' : 'dxScheduler-confirmRecurrenceEditSeries');

    var occurrenceText = _message.default.format(isDeleted ? 'dxScheduler-confirmRecurrenceDeleteOccurrence' : 'dxScheduler-confirmRecurrenceEditOccurrence');

    this._recurrenceDialog = (0, _dialog.custom)({
      messageHtml: message,
      showCloseButton: true,
      showTitle: true,
      buttons: [{
        text: seriesText,
        onClick: function onClick() {
          return RECURRENCE_EDITING_MODE.SERIES;
        }
      }, {
        text: occurrenceText,
        onClick: function onClick() {
          return RECURRENCE_EDITING_MODE.OCCURENCE;
        }
      }],
      popupOptions: {
        onHidden: function onHidden(e) {
          e.component.$element().remove();
        }
      }
    });
    return this._recurrenceDialog.show();
  };

  _proto._getUpdatedData = function _getUpdatedData(rawAppointment) {
    var _this14 = this;

    var getConvertedFromGrid = function getConvertedFromGrid(date) {
      return date ? _this14.timeZoneCalculator.createDate(date, {
        path: 'fromGrid'
      }) : undefined;
    };

    var isValidDate = function isValidDate(date) {
      return !isNaN(new Date(date).getTime());
    };

    var targetCell = this.getTargetCellData();
    var appointment = this.createAppointmentAdapter(rawAppointment);
    var cellStartDate = getConvertedFromGrid(targetCell.startDate);
    var cellEndDate = getConvertedFromGrid(targetCell.endDate);
    var appointmentStartDate = new Date(appointment.startDate);
    var appointmentEndDate = new Date(appointment.endDate);
    var resultedStartDate = cellStartDate || appointmentStartDate;

    if (!isValidDate(appointmentStartDate)) {
      appointmentStartDate = resultedStartDate;
    }

    if (!isValidDate(appointmentEndDate)) {
      appointmentEndDate = cellEndDate;
    }

    var duration = appointmentEndDate.getTime() - appointmentStartDate.getTime();
    var isKeepAppointmentHours = this._workSpace.keepOriginalHours() && isValidDate(appointment.startDate) && isValidDate(cellStartDate);

    if (isKeepAppointmentHours) {
      var trimTime = _date.default.trimTime;
      var startDate = this.timeZoneCalculator.createDate(appointment.startDate, {
        path: 'toGrid'
      });
      var timeInMs = startDate.getTime() - trimTime(startDate).getTime();
      resultedStartDate = new Date(trimTime(targetCell.startDate).getTime() + timeInMs);
      resultedStartDate = this.timeZoneCalculator.createDate(resultedStartDate, {
        path: 'fromGrid'
      });
    }

    var result = this.createAppointmentAdapter({});

    if (targetCell.allDay !== undefined) {
      result.allDay = targetCell.allDay;
    }

    result.startDate = resultedStartDate;
    var resultedEndDate = new Date(resultedStartDate.getTime() + duration);

    if (this.appointmentTakesAllDay(rawAppointment) && !result.allDay && this._workSpace.supportAllDayRow()) {
      resultedEndDate = this._workSpace.calculateEndDate(resultedStartDate);
    }

    if (appointment.allDay && !this._workSpace.supportAllDayRow() && !this._workSpace.keepOriginalHours()) {
      var dateCopy = new Date(resultedStartDate);
      dateCopy.setHours(0);
      resultedEndDate = new Date(dateCopy.getTime() + duration);

      if (resultedEndDate.getHours() !== 0) {
        resultedEndDate.setHours(this._getCurrentViewOption('endDayHour'));
      }
    }

    var timeZoneOffset = _utils.default.getTimezoneOffsetChangeInMs(appointmentStartDate, appointmentEndDate, resultedStartDate, resultedEndDate);

    result.endDate = new Date(resultedEndDate.getTime() - timeZoneOffset);
    var rawResult = result.source();

    this._resourcesManager.setResourcesToItem(rawResult, targetCell.groups);

    return rawResult;
  };

  _proto.getTargetedAppointment = function getTargetedAppointment(appointment, element) {
    var settings = _utils2.default.dataAccessors.getAppointmentSettings(element);

    var info = _utils2.default.dataAccessors.getAppointmentInfo(element);

    var appointmentIndex = (0, _renderer.default)(element).data(this._appointments._itemIndexKey());
    var adapter = this.createAppointmentAdapter(appointment);
    var targetedAdapter = adapter.clone();

    if (this._isAgenda() && adapter.isRecurrent) {
      var getStartDate = this.getRenderingStrategyInstance().getAppointmentDataCalculator();
      var newStartDate = getStartDate((0, _renderer.default)(element), adapter.startDate).startDate;
      targetedAdapter.startDate = newStartDate;
      targetedAdapter.endDate = new Date(newStartDate.getTime() + adapter.duration);
    } else if (settings) {
      targetedAdapter.startDate = info ? info.sourceAppointment.startDate : adapter.startDate; // TODO: in agenda we havn't info field

      targetedAdapter.endDate = info ? info.sourceAppointment.endDate : adapter.endDate;
    }

    var rawTargetedAppointment = targetedAdapter.source();

    if (element) {
      this.setTargetedAppointmentResources(rawTargetedAppointment, element, appointmentIndex);
    }

    return rawTargetedAppointment;
  };

  _proto.subscribe = function subscribe(subject, action) {
    this._subscribes[subject] = _subscribes.default[subject] = action;
  };

  _proto.fire = function fire(subject) {
    var callback = this._subscribes[subject];
    var args = Array.prototype.slice.call(arguments);

    if (!(0, _type.isFunction)(callback)) {
      throw _ui.default.Error('E1031', subject);
    }

    return callback.apply(this, args.slice(1));
  };

  _proto.getTargetCellData = function getTargetCellData() {
    return this._workSpace.getDataByDroppableCell();
  };

  _proto._updateAppointment = function _updateAppointment(target, rawAppointment, onUpdatePrevented, dragEvent) {
    var updatingOptions = {
      newData: rawAppointment,
      oldData: (0, _extend.extend)({}, target),
      cancel: false
    };

    var performFailAction = function (err) {
      if (onUpdatePrevented) {
        onUpdatePrevented.call(this);
      }

      if (err && err.name === 'Error') {
        throw err;
      }
    }.bind(this);

    this._actions[StoreEventNames.UPDATING](updatingOptions);

    if (dragEvent && !(0, _type.isDeferred)(dragEvent.cancel)) {
      dragEvent.cancel = new _deferred.Deferred();
    }

    return this._processActionResult(updatingOptions, function (canceled) {
      var _this15 = this;

      var deferred = new _deferred.Deferred();

      if (!canceled) {
        this._expandAllDayPanel(rawAppointment);

        try {
          deferred = this._appointmentModel.update(target, rawAppointment).done(function () {
            dragEvent && dragEvent.cancel.resolve(false);
          }).always(function (storeAppointment) {
            return _this15._onDataPromiseCompleted(StoreEventNames.UPDATED, storeAppointment);
          }).fail(function () {
            return performFailAction();
          });
        } catch (err) {
          performFailAction(err);
          deferred.resolve();
        }
      } else {
        performFailAction();
        deferred.resolve();
      }

      return deferred.promise();
    });
  };

  _proto._processActionResult = function _processActionResult(actionOptions, callback) {
    var _this16 = this;

    var deferred = new _deferred.Deferred();

    var resolveCallback = function resolveCallback(callbackResult) {
      (0, _deferred.when)((0, _deferred.fromPromise)(callbackResult)).always(deferred.resolve);
    };

    if ((0, _type.isPromise)(actionOptions.cancel)) {
      (0, _deferred.when)((0, _deferred.fromPromise)(actionOptions.cancel)).always(function (cancel) {
        if (!(0, _type.isDefined)(cancel)) {
          cancel = actionOptions.cancel.state() === 'rejected';
        }

        resolveCallback(callback.call(_this16, cancel));
      });
    } else {
      resolveCallback(callback.call(this, actionOptions.cancel));
    }

    return deferred.promise();
  };

  _proto._expandAllDayPanel = function _expandAllDayPanel(appointment) {
    if (!this._isAllDayExpanded(this.getFilteredItems()) && this.appointmentTakesAllDay(appointment)) {
      this._workSpace.option('allDayExpanded', true);
    }
  };

  _proto._onDataPromiseCompleted = function _onDataPromiseCompleted(handlerName, storeAppointment, appointment) {
    var args = {
      appointmentData: appointment || storeAppointment
    };

    if (storeAppointment instanceof Error) {
      args.error = storeAppointment;
    } else {
      this._appointmentPopup.isVisible() && this._appointmentPopup.hide();
    }

    this._actions[handlerName](args);

    this._fireContentReadyAction();
  };

  _proto.getAppointmentPopup = function getAppointmentPopup() {
    return this._appointmentPopup.getPopup();
  };

  _proto.getUpdatedAppointment = function getUpdatedAppointment() {
    return this._appointmentModel.getUpdatedAppointment();
  };

  _proto.getUpdatedAppointmentKeys = function getUpdatedAppointmentKeys() {
    return this._appointmentModel.getUpdatedAppointmentKeys();
  };

  _proto.getAppointmentsInstance = function getAppointmentsInstance() {
    return this._appointments;
  };

  _proto.getResourceManager = function getResourceManager() {
    return this._resourcesManager;
  };

  _proto.getLayoutManager = function getLayoutManager() {
    return this._layoutManager;
  };

  _proto.getRenderingStrategyInstance = function getRenderingStrategyInstance() {
    return this._layoutManager.getRenderingStrategyInstance();
  };

  _proto.getFilteredItems = function getFilteredItems() {
    return this._filteredItems;
  };

  _proto.getActions = function getActions() {
    return this._actions;
  };

  _proto.appointmentTakesAllDay = function appointmentTakesAllDay(appointment) {
    return this._appointmentModel.appointmentTakesAllDay(appointment, this._getCurrentViewOption('startDayHour'), this._getCurrentViewOption('endDayHour'));
  } // TODO: use for appointment model
  ;

  _proto._getRecurrenceException = function _getRecurrenceException(rawAppointment) {
    var appointment = this.createAppointmentAdapter(rawAppointment);
    var recurrenceException = appointment.recurrenceException;

    if (recurrenceException) {
      var exceptions = recurrenceException.split(',');

      for (var i = 0; i < exceptions.length; i++) {
        exceptions[i] = this._convertRecurrenceException(exceptions[i], appointment.startDate);
      }

      return exceptions.join();
    }

    return recurrenceException;
  };

  _proto._convertRecurrenceException = function _convertRecurrenceException(exceptionString, startDate) {
    var _this17 = this;

    exceptionString = exceptionString.replace(/\s/g, '');

    var getConvertedToTimeZone = function getConvertedToTimeZone(date) {
      return _this17.timeZoneCalculator.createDate(date, {
        path: 'toGrid'
      });
    };

    var exceptionDate = _date_serialization.default.deserializeDate(exceptionString);

    var convertedStartDate = getConvertedToTimeZone(startDate);
    var convertedExceptionDate = getConvertedToTimeZone(exceptionDate);
    convertedExceptionDate = _utils.default.correctRecurrenceExceptionByTimezone(convertedExceptionDate, convertedStartDate, this.option('timeZone'));
    exceptionString = _date_serialization.default.serializeDate(convertedExceptionDate, FULL_DATE_FORMAT);
    return exceptionString;
  };

  _proto.dayHasAppointment = function dayHasAppointment(day, rawAppointment, trimTime) {
    var _this18 = this;

    var getConvertedToTimeZone = function getConvertedToTimeZone(date) {
      return _this18.timeZoneCalculator.createDate(date, {
        path: 'toGrid'
      });
    };

    var appointment = this.createAppointmentAdapter(rawAppointment);
    var startDate = new Date(appointment.startDate);
    var endDate = new Date(appointment.endDate);
    startDate = getConvertedToTimeZone(startDate);
    endDate = getConvertedToTimeZone(endDate);

    if (day.getTime() === endDate.getTime()) {
      return startDate.getTime() === endDate.getTime();
    }

    if (trimTime) {
      day = _date.default.trimTime(day);
      startDate = _date.default.trimTime(startDate);
      endDate = _date.default.trimTime(endDate);
    }

    var dayTimeStamp = day.getTime();
    var startDateTimeStamp = startDate.getTime();
    var endDateTimeStamp = endDate.getTime();
    return (0, _array.inArray)(dayTimeStamp, [startDateTimeStamp, endDateTimeStamp]) > -1 || startDateTimeStamp < dayTimeStamp && endDateTimeStamp > dayTimeStamp;
  };

  _proto.setTargetedAppointmentResources = function setTargetedAppointmentResources(rawAppointment, element, appointmentIndex) {
    var groups = this._getCurrentViewOption('groups');

    if (groups !== null && groups !== void 0 && groups.length) {
      var resourcesSetter = this._resourcesManager._dataAccessors.setter;
      var workSpace = this._workSpace;
      var getGroups;
      var setResourceCallback;

      if (this._isAgenda()) {
        getGroups = function getGroups() {
          var apptSettings = this.getLayoutManager()._positionMap[appointmentIndex];

          return workSpace._getCellGroups(apptSettings[0].groupIndex);
        };

        setResourceCallback = function setResourceCallback(_, group) {
          resourcesSetter[group.name](rawAppointment, group.id);
        };
      } else {
        getGroups = function getGroups() {
          // TODO: in the future, necessary refactor the engine of determining groups
          var setting = _utils2.default.dataAccessors.getAppointmentSettings(element) || {};
          return workSpace.getCellDataByCoordinates({
            left: setting.left,
            top: setting.top
          }).groups;
        };

        setResourceCallback = function setResourceCallback(field, value) {
          resourcesSetter[field](rawAppointment, value);
        };
      }

      (0, _iterator.each)(getGroups.call(this), setResourceCallback);
    }
  };

  _proto.getStartViewDate = function getStartViewDate() {
    return this._workSpace.getStartViewDate();
  };

  _proto.getEndViewDate = function getEndViewDate() {
    return this._workSpace.getEndViewDate();
  };

  _proto.showAppointmentPopup = function showAppointmentPopup(rawAppointment, createNewAppointment, rawTargetedAppointment) {
    var _this19 = this;

    var appointment = this.createAppointmentAdapter(rawTargetedAppointment || rawAppointment);
    var newTargetedAppointment = (0, _extend.extend)({}, rawAppointment, rawTargetedAppointment);

    this._checkRecurringAppointment(rawAppointment, newTargetedAppointment, appointment.startDate, function () {
      if (createNewAppointment || (0, _type.isEmptyObject)(rawAppointment)) {
        delete _this19._editAppointmentData;
        _this19._editing.allowAdding && _this19._appointmentPopup.show(rawAppointment, true);
      } else {
        _this19._editAppointmentData = rawAppointment;

        _this19._appointmentPopup.show(rawAppointment, _this19._editing.allowUpdating);
      }
    }, false, true);
  };

  _proto.hideAppointmentPopup = function hideAppointmentPopup(saveChanges) {
    if (this._appointmentPopup && this._appointmentPopup.isVisible()) {
      saveChanges && this._appointmentPopup.saveChanges();

      this._appointmentPopup.hide();
    }
  };

  _proto.showAppointmentTooltip = function showAppointmentTooltip(appointment, element, targetedAppointment) {
    if (appointment) {
      var settings = _utils2.default.dataAccessors.getAppointmentSettings(element);

      var deferredColor = this.fire('getAppointmentColor', {
        itemData: targetedAppointment || appointment,
        groupIndex: settings === null || settings === void 0 ? void 0 : settings.groupIndex
      });
      var info = new _dataStructures.AppointmentTooltipInfo(appointment, targetedAppointment, deferredColor);
      this.showAppointmentTooltipCore(element, [info]);
    }
  };

  _proto.showAppointmentTooltipCore = function showAppointmentTooltipCore(target, data, options) {
    if (this._appointmentTooltip.isAlreadyShown(target)) {
      this.hideAppointmentTooltip();
    } else {
      this._appointmentTooltip.show(target, data, (0, _extend.extend)(this._getExtraAppointmentTooltipOptions(), options));
    }
  };

  _proto.hideAppointmentTooltip = function hideAppointmentTooltip() {
    this._appointmentTooltip && this._appointmentTooltip.hide();
  };

  _proto.scrollToTime = function scrollToTime(hours, minutes, date) {
    _ui.default.log('W0002', 'dxScheduler', 'scrollToTime', '21.1', 'Use the "scrollTo" method instead');

    this._workSpace.scrollToTime(hours, minutes, date);
  };

  _proto.scrollTo = function scrollTo(date, groups, allDay) {
    this._workSpace.scrollTo(date, groups, allDay);
  };

  _proto._isHorizontalVirtualScrolling = function _isHorizontalVirtualScrolling() {
    var scrolling = this.option('scrolling');
    var orientation = scrolling.orientation,
        mode = scrolling.mode;
    var isVirtualScrolling = mode === 'virtual';
    return isVirtualScrolling && (orientation === 'horizontal' || orientation === 'both');
  };

  _proto.addAppointment = function addAppointment(rawAppointment) {
    var _this20 = this;

    var appointment = this.createAppointmentAdapter(rawAppointment);
    appointment.text = appointment.text || '';
    var serializedAppointment = appointment.source(true);
    var addingOptions = {
      appointmentData: serializedAppointment,
      cancel: false
    };

    this._actions[StoreEventNames.ADDING](addingOptions);

    return this._processActionResult(addingOptions, function (canceled) {
      if (canceled) {
        return new _deferred.Deferred().resolve();
      }

      _this20._expandAllDayPanel(serializedAppointment);

      return _this20._appointmentModel.add(serializedAppointment).always(function (storeAppointment) {
        return _this20._onDataPromiseCompleted(StoreEventNames.ADDED, storeAppointment);
      });
    });
  };

  _proto.updateAppointment = function updateAppointment(target, appointment) {
    return this._updateAppointment(target, appointment);
  };

  _proto.deleteAppointment = function deleteAppointment(rawAppointment) {
    var deletingOptions = {
      appointmentData: rawAppointment,
      cancel: false
    };

    this._actions[StoreEventNames.DELETING](deletingOptions);

    this._processActionResult(deletingOptions, function (canceled) {
      var _this21 = this;

      if (!canceled) {
        this._appointmentModel.remove(rawAppointment).always(function (storeAppointment) {
          return _this21._onDataPromiseCompleted(StoreEventNames.DELETED, storeAppointment, rawAppointment);
        });
      }
    });
  };

  _proto.focus = function focus() {
    if (this._editAppointmentData) {
      this._appointments.focus();
    } else {
      this._workSpace.focus();
    }
  };

  _proto.getFirstDayOfWeek = function getFirstDayOfWeek() {
    return (0, _type.isDefined)(this.option('firstDayOfWeek')) ? this.option('firstDayOfWeek') : _date2.default.firstDayOfWeekIndex();
  };

  _proto.createAppointmentAdapter = function createAppointmentAdapter(rawAppointment) {
    var _this22 = this;

    var options = {
      getField: function getField(rawAppointment, property) {
        return _this22.fire('getField', property, rawAppointment);
      },
      setField: function setField(rawAppointment, property, value) {
        return _this22.fire('setField', property, rawAppointment, value);
      },
      getTimeZoneCalculator: function getTimeZoneCalculator() {
        return _this22.timeZoneCalculator;
      }
    };
    return new _appointmentAdapter.default(rawAppointment, options);
  }
  /**
      * @name dxScheduler.registerKeyHandler
      * @publicName registerKeyHandler(key, handler)
      * @hidden
      */
  ;

  _createClass(Scheduler, [{
    key: "appointmentFilter",
    get: function get() {
      return new _appointmentFilter.default(this);
    }
  }]);

  return Scheduler;
}(_ui2.default);

Scheduler.include(_data_helper.default);
(0, _component_registrator.default)('dxScheduler', Scheduler);
var _default = Scheduler;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
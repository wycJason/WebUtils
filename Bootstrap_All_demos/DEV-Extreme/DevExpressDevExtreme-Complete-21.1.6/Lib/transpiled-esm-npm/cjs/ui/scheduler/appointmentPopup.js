"use strict";

exports.default = void 0;

var _devices = _interopRequireDefault(require("../../core/devices"));

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _date = _interopRequireDefault(require("../../core/utils/date"));

var _deferred = require("../../core/utils/deferred");

var _extend = require("../../core/utils/extend");

var _iterator = require("../../core/utils/iterator");

var _type = require("../../core/utils/type");

var _window = require("../../core/utils/window");

var _visibility_change = require("../../events/visibility_change");

var _message = _interopRequireDefault(require("../../localization/message"));

var _popup = _interopRequireDefault(require("../popup"));

var _appointment_form = require("./appointment_form");

var _loading = require("./loading");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toMs = _date.default.dateToMilliseconds;
var WIDGET_CLASS = 'dx-scheduler';
var APPOINTMENT_POPUP_CLASS = "".concat(WIDGET_CLASS, "-appointment-popup");
var APPOINTMENT_POPUP_WIDTH = 485;
var APPOINTMENT_POPUP_WIDTH_WITH_RECURRENCE = 970;
var APPOINTMENT_POPUP_FULLSCREEN_WINDOW_WIDTH = 1000;
var APPOINTMENT_POPUP_FULLSCREEN_WINDOW_WIDTH_MOBILE = 500;
var APPOINTMENT_POPUP_WIDTH_MOBILE = 350;
var TOOLBAR_ITEM_AFTER_LOCATION = 'after';
var TOOLBAR_ITEM_BEFORE_LOCATION = 'before';
var DAY_IN_MS = toMs('day');

var AppointmentPopup = /*#__PURE__*/function () {
  function AppointmentPopup(scheduler) {
    this.scheduler = scheduler;
    this._popup = null;
    this._appointmentForm = null;
    this.state = {
      lastEditData: null,
      saveChangesLocker: false,
      appointment: {
        data: null,
        isEmptyText: false,
        isEmptyDescription: false
      }
    };
  }

  var _proto = AppointmentPopup.prototype;

  _proto.show = function show() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var isDoneButtonVisible = arguments.length > 1 ? arguments[1] : undefined;

    if ((0, _type.isEmptyObject)(data)) {
      var startDate = new Date(this.scheduler.option('currentDate'));
      var endDate = new Date(startDate.getTime() + this.scheduler.option('cellDuration') * toMs('minute'));
      this.scheduler.fire('setField', 'startDate', data, startDate);
      this.scheduler.fire('setField', 'endDate', data, endDate);
    }

    this.state.appointment.data = data;

    if (!this._popup) {
      var popupConfig = this._createPopupConfig();

      this._popup = this._createPopup(popupConfig);
    }

    this._popup.option('toolbarItems', this._createPopupToolbarItems(isDoneButtonVisible));

    this._popup.show();
  };

  _proto.hide = function hide() {
    this._popup.hide();
  };

  _proto.isVisible = function isVisible() {
    return this._popup ? this._popup.option('visible') : false;
  };

  _proto.dispose = function dispose() {
    if (this._$popup) {
      this._popup.$element().remove();

      this._$popup = null;
    }
  };

  _proto._createPopup = function _createPopup(options) {
    var popupElement = (0, _renderer.default)('<div>').addClass(APPOINTMENT_POPUP_CLASS).appendTo(this.scheduler.$element());
    return this.scheduler._createComponent(popupElement, _popup.default, options);
  };

  _proto._createPopupConfig = function _createPopupConfig() {
    var _this = this;

    return {
      height: 'auto',
      maxHeight: '100%',
      showCloseButton: false,
      showTitle: false,
      onHiding: function onHiding() {
        _this.scheduler.focus();
      },
      contentTemplate: function contentTemplate() {
        return _this._createPopupContent();
      },
      onShowing: function onShowing(e) {
        return _this._onShowing(e);
      },
      defaultOptionsRules: [{
        device: function device() {
          return _devices.default.current().android;
        },
        options: {
          showTitle: false
        }
      }]
    };
  };

  _proto._onShowing = function _onShowing(e) {
    var _this2 = this;

    this._updateForm();

    var arg = {
      form: this._appointmentForm,
      popup: this._popup,
      appointmentData: this.state.appointment.data,
      cancel: false
    };

    this.scheduler._actions['onAppointmentFormOpening'](arg);

    this.scheduler._processActionResult(arg, function (canceled) {
      if (canceled) {
        e.cancel = true;
      } else {
        _this2.updatePopupFullScreenMode();
      }
    });
  };

  _proto._createPopupContent = function _createPopupContent() {
    var formElement = (0, _renderer.default)('<div>');
    this._appointmentForm = this._createForm(formElement);
    return formElement;
  };

  _proto._createAppointmentFormData = function _createAppointmentFormData(rawAppointment) {
    var appointment = this._createAppointmentAdapter(rawAppointment);

    var result = (0, _extend.extend)(true, {
      repeat: !!appointment.recurrenceRule
    }, rawAppointment);
    (0, _iterator.each)(this.scheduler._resourcesManager.getResourcesFromItem(result, true) || {}, function (name, value) {
      return result[name] = value;
    });
    return result;
  };

  _proto._createForm = function _createForm(element) {
    var expr = this.scheduler._dataAccessors.expr;
    var resources = this.scheduler.option('resources');

    var allowTimeZoneEditing = this._getAllowTimeZoneEditing();

    var rawAppointment = this.state.appointment.data;

    var formData = this._createAppointmentFormData(rawAppointment);

    var readOnly = this._isReadOnly(rawAppointment);

    _appointment_form.AppointmentForm.prepareAppointmentFormEditors(expr, this.scheduler, this.triggerResize.bind(this), this.changeSize.bind(this), formData, allowTimeZoneEditing, readOnly);

    if (resources && resources.length) {
      _appointment_form.AppointmentForm.concatResources(this.scheduler._resourcesManager.getEditors());
    }

    return _appointment_form.AppointmentForm.create(this.scheduler._createComponent.bind(this.scheduler), element, readOnly, formData);
  };

  _proto._getAllowTimeZoneEditing = function _getAllowTimeZoneEditing() {
    var scheduler = this.scheduler;
    return scheduler.option('editing.allowTimeZoneEditing') || scheduler.option('editing.allowEditingTimeZones');
  };

  _proto._isReadOnly = function _isReadOnly(rawAppointment) {
    var adapter = this.scheduler.createAppointmentAdapter(rawAppointment);

    if (rawAppointment && adapter.disabled) {
      return true;
    }

    return this.scheduler._editAppointmentData ? !this.scheduler._editing.allowUpdating : false;
  };

  _proto._createAppointmentAdapter = function _createAppointmentAdapter(rawAppointment) {
    return this.scheduler.createAppointmentAdapter(rawAppointment);
  };

  _proto._updateForm = function _updateForm() {
    var data = this.state.appointment.data;

    var adapter = this._createAppointmentAdapter(data);

    var allDay = adapter.allDay;
    var startDate = adapter.startDate && adapter.calculateStartDate('toAppointment');
    var endDate = adapter.endDate && adapter.calculateEndDate('toAppointment');
    this.state.appointment.isEmptyText = data === undefined || adapter.text === undefined;
    this.state.appointment.isEmptyDescription = data === undefined || adapter.description === undefined;

    var appointment = this._createAppointmentAdapter(this._createAppointmentFormData(data));

    if (appointment.text === undefined) {
      appointment.text = '';
    }

    if (appointment.description === undefined) {
      appointment.description = '';
    }

    if (appointment.recurrenceRule === undefined) {
      appointment.recurrenceRule = '';
    }

    var formData = appointment.source();

    if (startDate) {
      this.scheduler.fire('setField', 'startDate', formData, startDate);
    }

    if (endDate) {
      this.scheduler.fire('setField', 'endDate', formData, endDate);
    }

    var _this$scheduler$_data = this.scheduler._dataAccessors.expr,
        startDateExpr = _this$scheduler$_data.startDateExpr,
        endDateExpr = _this$scheduler$_data.endDateExpr;

    this._appointmentForm.option('readOnly', this._isReadOnly(data));

    _appointment_form.AppointmentForm.updateFormData(this._appointmentForm, formData, this.scheduler._dataAccessors.expr);

    _appointment_form.AppointmentForm.setEditorsType(this._appointmentForm, startDateExpr, endDateExpr, allDay);
  };

  _proto._isDeviceMobile = function _isDeviceMobile() {
    return _devices.default.current().deviceType !== 'desktop';
  };

  _proto._isPopupFullScreenNeeded = function _isPopupFullScreenNeeded() {
    var width = this._tryGetWindowWidth();

    if (width) {
      return this._isDeviceMobile() ? width < APPOINTMENT_POPUP_FULLSCREEN_WINDOW_WIDTH_MOBILE : width < APPOINTMENT_POPUP_FULLSCREEN_WINDOW_WIDTH;
    }

    return false;
  };

  _proto._tryGetWindowWidth = function _tryGetWindowWidth() {
    if ((0, _window.hasWindow)()) {
      var window = (0, _window.getWindow)();
      return (0, _renderer.default)(window).width();
    }
  };

  _proto.triggerResize = function triggerResize() {
    this._popup && (0, _visibility_change.triggerResizeEvent)(this._popup.$element());
  };

  _proto._getMaxWidth = function _getMaxWidth(isRecurrence) {
    if (this._isDeviceMobile()) {
      return APPOINTMENT_POPUP_WIDTH_MOBILE;
    }

    return isRecurrence ? APPOINTMENT_POPUP_WIDTH_WITH_RECURRENCE : APPOINTMENT_POPUP_WIDTH;
  };

  _proto.changeSize = function changeSize(isRecurrence) {
    var isFullScreen = this._isPopupFullScreenNeeded();

    this._popup.option({
      maxWidth: isFullScreen ? '100%' : this._getMaxWidth(isRecurrence),
      fullScreen: isFullScreen
    });
  };

  _proto.updatePopupFullScreenMode = function updatePopupFullScreenMode() {
    if (!this._appointmentForm) {
      return;
    }

    var isRecurrence = _appointment_form.AppointmentForm.getRecurrenceRule(this._appointmentForm.option('formData'), this.scheduler._dataAccessors.expr);

    if (this.isVisible()) {
      this.changeSize(isRecurrence);
    }
  };

  _proto._createPopupToolbarItems = function _createPopupToolbarItems(isDoneButtonVisible) {
    var _this3 = this;

    var result = [];
    var isIOs = _devices.default.current().platform === 'ios';

    if (isDoneButtonVisible) {
      result.push({
        shortcut: 'done',
        options: {
          text: _message.default.format('Done')
        },
        location: TOOLBAR_ITEM_AFTER_LOCATION,
        onClick: function onClick(e) {
          return _this3._doneButtonClickHandler(e);
        }
      });
    }

    result.push({
      shortcut: 'cancel',
      location: isIOs ? TOOLBAR_ITEM_BEFORE_LOCATION : TOOLBAR_ITEM_AFTER_LOCATION
    });
    return result;
  };

  _proto.saveChanges = function saveChanges(showLoadPanel) {
    var _this4 = this;

    var deferred = new _deferred.Deferred();

    var validation = this._appointmentForm.validate();

    var state = this.state.appointment;
    showLoadPanel && this._showLoadPanel();
    (0, _deferred.when)(validation && validation.complete || validation).done(function (validation) {
      if (validation && !validation.isValid) {
        _this4._hideLoadPanel();

        deferred.resolve(false);
        return;
      } // const formData = objectUtils.deepExtendArraySafe({}, this._appointmentForm.option('formData'), true);


      var formData = _this4._appointmentForm.option('formData');

      var adapter = _this4.scheduler.createAppointmentAdapter(formData);

      var appointment = adapter.clone({
        pathTimeZone: 'fromAppointment'
      }).source(); // TODO:

      var oldData = _this4.scheduler._editAppointmentData;
      var recData = _this4.scheduler._updatedRecAppointment;

      if (state.isEmptyText && adapter.text === '') {
        delete appointment.text; // TODO
      }

      if (state.isEmptyDescription && adapter.description === '') {
        delete appointment.description; // TODO
      }

      if (state.data.recurrenceRule === undefined && adapter.recurrenceRule === '') {
        // TODO: plug for recurrent editor
        delete appointment.recurrenceRule;
      }

      if ((0, _type.isDefined)(appointment.repeat)) {
        delete appointment.repeat; // TODO
      }

      if (oldData && !recData) {
        _this4.scheduler.updateAppointment(oldData, appointment).done(deferred.resolve);
      } else {
        if (recData) {
          _this4.scheduler.updateAppointment(oldData, recData);

          delete _this4.scheduler._updatedRecAppointment;
        }

        _this4.scheduler.addAppointment(appointment).done(deferred.resolve);
      }

      deferred.done(function () {
        _this4._hideLoadPanel();

        _this4.state.lastEditData = appointment;
      });
    });
    return deferred.promise();
  };

  _proto._doneButtonClickHandler = function _doneButtonClickHandler(e) {
    e.cancel = true;
    this.saveEditData();
  };

  _proto.saveEditData = function saveEditData() {
    var _this5 = this;

    var deferred = new _deferred.Deferred();

    if (this._tryLockSaveChanges()) {
      (0, _deferred.when)(this.saveChanges(true)).done(function () {
        if (_this5.state.lastEditData) {
          var adapter = _this5.scheduler.createAppointmentAdapter(_this5.state.lastEditData);

          var startDate = adapter.startDate,
              endDate = adapter.endDate,
              allDay = adapter.allDay;
          var startTime = startDate.getTime();
          var endTime = endDate.getTime();
          var inAllDayRow = allDay || endTime - startTime >= DAY_IN_MS;

          _this5.scheduler._workSpace.updateScrollPosition(startDate, _this5.scheduler._resourcesManager.getResourcesFromItem(_this5.state.lastEditData, true), inAllDayRow);

          _this5.state.lastEditData = null;
        }

        _this5._unlockSaveChanges();

        deferred.resolve();
      });
    }

    return deferred.promise();
  };

  _proto._hideLoadPanel = function _hideLoadPanel() {
    (0, _loading.hide)();
  };

  _proto._showLoadPanel = function _showLoadPanel() {
    var $overlayContent = this._popup.$overlayContent();

    (0, _loading.show)({
      container: $overlayContent,
      position: {
        of: $overlayContent
      }
    });
  };

  _proto._tryLockSaveChanges = function _tryLockSaveChanges() {
    if (this.state.saveChangesLocker === false) {
      this.state.saveChangesLocker = true;
      return true;
    }

    return false;
  };

  _proto._unlockSaveChanges = function _unlockSaveChanges() {
    this.state.saveChangesLocker = false;
  };

  return AppointmentPopup;
}();

exports.default = AppointmentPopup;
module.exports = exports.default;
module.exports.default = exports.default;
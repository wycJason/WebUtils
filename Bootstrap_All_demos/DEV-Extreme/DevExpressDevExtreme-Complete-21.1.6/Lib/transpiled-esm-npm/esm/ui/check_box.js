import $ from '../core/renderer';
import eventsEngine from '../events/core/events_engine';
import devices from '../core/devices';
import { extend } from '../core/utils/extend';
import { render } from './widget/utils.ink_ripple';
import Editor from './editor/editor';
import registerComponent from '../core/component_registrator';
import { addNamespace } from '../events/utils/index';
import { name as clickEventName } from '../events/click'; // STYLE checkbox

var CHECKBOX_CLASS = 'dx-checkbox';
var CHECKBOX_ICON_CLASS = 'dx-checkbox-icon';
var CHECKBOX_CHECKED_CLASS = 'dx-checkbox-checked';
var CHECKBOX_CONTAINER_CLASS = 'dx-checkbox-container';
var CHECKBOX_TEXT_CLASS = 'dx-checkbox-text';
var CHECKBOX_HAS_TEXT_CLASS = 'dx-checkbox-has-text';
var CHECKBOX_INDETERMINATE_CLASS = 'dx-checkbox-indeterminate';
var CHECKBOX_FEEDBACK_HIDE_TIMEOUT = 100;
var CheckBox = Editor.inherit({
  _supportedKeys: function _supportedKeys() {
    var click = function click(e) {
      e.preventDefault();

      this._clickAction({
        event: e
      });
    };

    return extend(this.callBase(), {
      space: click
    });
  },
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
      hoverStateEnabled: true,
      activeStateEnabled: true,
      value: false,
      text: '',
      useInkRipple: false
    });
  },
  _defaultOptionsRules: function _defaultOptionsRules() {
    return this.callBase().concat([{
      device: function device() {
        return devices.real().deviceType === 'desktop' && !devices.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }]);
  },
  _canValueBeChangedByClick: function _canValueBeChangedByClick() {
    return true;
  },
  _useTemplates: function _useTemplates() {
    return false;
  },
  _feedbackHideTimeout: CHECKBOX_FEEDBACK_HIDE_TIMEOUT,
  _initMarkup: function _initMarkup() {
    this._renderSubmitElement();

    this._$container = $('<div>').addClass(CHECKBOX_CONTAINER_CLASS);
    this.setAria('role', 'checkbox');
    this.$element().addClass(CHECKBOX_CLASS);

    this._renderValue();

    this._renderIcon();

    this._renderText();

    this.option('useInkRipple') && this._renderInkRipple();
    this.$element().append(this._$container);
    this.callBase();
  },
  _render: function _render() {
    this._renderClick();

    this.callBase();
  },
  _renderSubmitElement: function _renderSubmitElement() {
    this._$submitElement = $('<input>').attr('type', 'hidden').appendTo(this.$element());
  },
  _getSubmitElement: function _getSubmitElement() {
    return this._$submitElement;
  },
  _renderInkRipple: function _renderInkRipple() {
    this._inkRipple = render({
      waveSizeCoefficient: 2.5,
      useHoldAnimation: false,
      wavesNumber: 2,
      isCentered: true
    });
  },
  _renderInkWave: function _renderInkWave(element, dxEvent, doRender, waveIndex) {
    if (!this._inkRipple) {
      return;
    }

    var config = {
      element: element,
      event: dxEvent,
      wave: waveIndex
    };

    if (doRender) {
      this._inkRipple.showWave(config);
    } else {
      this._inkRipple.hideWave(config);
    }
  },
  _updateFocusState: function _updateFocusState(e, value) {
    this.callBase.apply(this, arguments);

    this._renderInkWave(this._$icon, e, value, 0);
  },
  _toggleActiveState: function _toggleActiveState($element, value, e) {
    this.callBase.apply(this, arguments);

    this._renderInkWave(this._$icon, e, value, 1);
  },
  _renderIcon: function _renderIcon() {
    this._$icon = $('<span>').addClass(CHECKBOX_ICON_CLASS).prependTo(this._$container);
  },
  _renderText: function _renderText() {
    var textValue = this.option('text');

    if (!textValue) {
      if (this._$text) {
        this._$text.remove();

        this.$element().removeClass(CHECKBOX_HAS_TEXT_CLASS);
      }

      return;
    }

    if (!this._$text) {
      this._$text = $('<span>').addClass(CHECKBOX_TEXT_CLASS);
    }

    this._$text.text(textValue);

    this._$container.append(this._$text);

    this.$element().addClass(CHECKBOX_HAS_TEXT_CLASS);
  },
  _renderClick: function _renderClick() {
    var that = this;
    var eventName = addNamespace(clickEventName, that.NAME);
    that._clickAction = that._createAction(that._clickHandler);
    eventsEngine.off(that.$element(), eventName);
    eventsEngine.on(that.$element(), eventName, function (e) {
      that._clickAction({
        event: e
      });
    });
  },
  _clickHandler: function _clickHandler(args) {
    var that = args.component;

    that._saveValueChangeEvent(args.event);

    that.option('value', !that.option('value'));
  },
  _renderValue: function _renderValue() {
    var $element = this.$element();
    var checked = this.option('value');
    var indeterminate = checked === undefined;
    $element.toggleClass(CHECKBOX_CHECKED_CLASS, Boolean(checked));
    $element.toggleClass(CHECKBOX_INDETERMINATE_CLASS, indeterminate);

    this._getSubmitElement().val(checked);

    this.setAria('checked', indeterminate ? 'mixed' : checked || 'false');
  },
  _optionChanged: function _optionChanged(args) {
    switch (args.name) {
      case 'useInkRipple':
        this._invalidate();

        break;

      case 'value':
        this._renderValue();

        this.callBase(args);
        break;

      case 'text':
        this._renderText();

        this._renderDimensions();

        break;

      default:
        this.callBase(args);
    }
  },
  _clean: function _clean() {
    delete this._inkRipple;
    this.callBase();
  }
});
registerComponent('dxCheckBox', CheckBox);
export default CheckBox;
import $ from '../../core/renderer';
import eventsEngine from '../../events/core/events_engine';
import devices from '../../core/devices';
import { extend } from '../../core/utils/extend';
import { render } from '../widget/utils.ink_ripple';
import registerComponent from '../../core/component_registrator';
import Editor from '../editor/editor';
import { addNamespace } from '../../events/utils/index';
import { name as clickEventName } from '../../events/click';
var RADIO_BUTTON_CLASS = 'dx-radiobutton';
var RADIO_BUTTON_ICON_CLASS = 'dx-radiobutton-icon';
var RADIO_BUTTON_ICON_DOT_CLASS = 'dx-radiobutton-icon-dot';
var RADIO_BUTTON_CHECKED_CLASS = 'dx-radiobutton-checked';
var RADIO_BUTTON_ICON_CHECKED_CLASS = 'dx-radiobutton-icon-checked';
/**
* @name dxRadioButton
* @inherits CollectionWidget
* @hidden
*/

var RadioButton = Editor.inherit({
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
      useInkRipple: false
    });
  },
  _canValueBeChangedByClick: function _canValueBeChangedByClick() {
    return true;
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
  _init: function _init() {
    this.callBase();
    this.$element().addClass(RADIO_BUTTON_CLASS);
  },
  _initMarkup: function _initMarkup() {
    this.callBase();

    this._renderIcon();

    this.option('useInkRipple') && this._renderInkRipple();

    this._renderCheckedState(this.option('value'));

    this._renderClick();

    this.setAria('role', 'radio');
  },
  _renderInkRipple: function _renderInkRipple() {
    this._inkRipple = render({
      waveSizeCoefficient: 3.3,
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
    this._$icon = $('<div>').addClass(RADIO_BUTTON_ICON_CLASS);
    $('<div>').addClass(RADIO_BUTTON_ICON_DOT_CLASS).appendTo(this._$icon);
    this.$element().append(this._$icon);
  },
  _renderCheckedState: function _renderCheckedState(checked) {
    this.$element().toggleClass(RADIO_BUTTON_CHECKED_CLASS, checked).find('.' + RADIO_BUTTON_ICON_CLASS).toggleClass(RADIO_BUTTON_ICON_CHECKED_CLASS, checked);
    this.setAria('checked', checked);
  },
  _renderClick: function _renderClick() {
    var eventName = addNamespace(clickEventName, this.NAME);
    this._clickAction = this._createAction(function (args) {
      this._clickHandler(args.event);
    }.bind(this));
    eventsEngine.off(this.$element(), eventName);
    eventsEngine.on(this.$element(), eventName, function (e) {
      this._clickAction({
        event: e
      });
    }.bind(this));
  },
  _clickHandler: function _clickHandler(e) {
    this._saveValueChangeEvent(e);

    this.option('value', true);
  },
  _optionChanged: function _optionChanged(args) {
    switch (args.name) {
      case 'useInkRipple':
        this._invalidate();

        break;

      case 'value':
        this._renderCheckedState(args.value);

        this.callBase(args);
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
registerComponent('dxRadioButton', RadioButton);
export default RadioButton;
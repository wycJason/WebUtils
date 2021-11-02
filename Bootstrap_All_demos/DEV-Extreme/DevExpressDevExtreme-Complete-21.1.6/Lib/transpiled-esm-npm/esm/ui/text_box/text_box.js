import $ from '../../core/renderer';
import { getNavigator, getWindow } from '../../core/utils/window';
var window = getWindow();
var navigator = getNavigator();
import browser from '../../core/utils/browser';
import eventsEngine from '../../events/core/events_engine';
import devices from '../../core/devices';
import { inArray } from '../../core/utils/array';
import { extend } from '../../core/utils/extend';
import registerComponent from '../../core/component_registrator';
import TextEditor from './ui.text_editor';
import { addNamespace, normalizeKeyName } from '../../events/utils/index'; // STYLE textBox

var ua = navigator.userAgent;
var ignoreKeys = ['backspace', 'tab', 'enter', 'pageUp', 'pageDown', 'end', 'home', 'leftArrow', 'rightArrow', 'downArrow', 'upArrow', 'del'];
var TEXTBOX_CLASS = 'dx-textbox';
var SEARCHBOX_CLASS = 'dx-searchbox';
var ICON_CLASS = 'dx-icon';
var SEARCH_ICON_CLASS = 'dx-icon-search';
var TextBox = TextEditor.inherit({
  ctor: function ctor(element, options) {
    if (options) {
      this._showClearButton = options.showClearButton;
    }

    this.callBase.apply(this, arguments);
  },
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
      value: '',
      mode: 'text',
      maxLength: null
    });
  },
  _initMarkup: function _initMarkup() {
    this.$element().addClass(TEXTBOX_CLASS);
    this.callBase();
    this.setAria('role', 'textbox');
  },
  _renderContentImpl: function _renderContentImpl() {
    this._renderMaxLengthHandlers();

    this.callBase();
  },
  _renderInputType: function _renderInputType() {
    this.callBase();

    this._renderSearchMode();
  },
  _renderMaxLengthHandlers: function _renderMaxLengthHandlers() {
    if (this._isAndroidOrIE()) {
      eventsEngine.on(this._input(), addNamespace('keydown', this.NAME), this._onKeyDownCutOffHandler.bind(this));
      eventsEngine.on(this._input(), addNamespace('change', this.NAME), this._onChangeCutOffHandler.bind(this));
    }
  },
  _useTemplates: function _useTemplates() {
    return false;
  },
  _renderProps: function _renderProps() {
    this.callBase();

    this._toggleMaxLengthProp();
  },
  _toggleMaxLengthProp: function _toggleMaxLengthProp() {
    var maxLength = this._getMaxLength();

    if (maxLength && maxLength > 0) {
      this._input().attr('maxLength', maxLength);
    } else {
      this._input().removeAttr('maxLength');
    }
  },
  _renderSearchMode: function _renderSearchMode() {
    var $element = this._$element;

    if (this.option('mode') === 'search') {
      $element.addClass(SEARCHBOX_CLASS);

      this._renderSearchIcon();

      if (this._showClearButton === undefined) {
        this._showClearButton = this.option('showClearButton');
        this.option('showClearButton', true);
      }
    } else {
      $element.removeClass(SEARCHBOX_CLASS);
      this._$searchIcon && this._$searchIcon.remove();
      this.option('showClearButton', this._showClearButton === undefined ? this.option('showClearButton') : this._showClearButton);
      delete this._showClearButton;
    }
  },
  _renderSearchIcon: function _renderSearchIcon() {
    var $searchIcon = $('<div>').addClass(ICON_CLASS).addClass(SEARCH_ICON_CLASS);
    $searchIcon.prependTo(this._input().parent());
    this._$searchIcon = $searchIcon;
  },
  _optionChanged: function _optionChanged(args) {
    switch (args.name) {
      case 'maxLength':
        this._toggleMaxLengthProp();

        this._renderMaxLengthHandlers();

        break;

      case 'mask':
        this.callBase(args);

        this._toggleMaxLengthProp();

        break;

      default:
        this.callBase(args);
    }
  },
  _onKeyDownCutOffHandler: function _onKeyDownCutOffHandler(e) {
    var actualMaxLength = this._getMaxLength();

    if (actualMaxLength && !e.ctrlKey && !this._hasSelection()) {
      var $input = $(e.target);
      var key = normalizeKeyName(e);

      this._cutOffExtraChar($input);

      return $input.val().length < actualMaxLength || inArray(key, ignoreKeys) !== -1 || window.getSelection().toString() !== '';
    } else {
      return true;
    }
  },
  _onChangeCutOffHandler: function _onChangeCutOffHandler(e) {
    var $input = $(e.target);

    if (this.option('maxLength')) {
      this._cutOffExtraChar($input);
    }
  },
  _cutOffExtraChar: function _cutOffExtraChar($input) {
    var actualMaxLength = this._getMaxLength();

    var textInput = $input.val();

    if (actualMaxLength && textInput.length > actualMaxLength) {
      $input.val(textInput.substr(0, actualMaxLength));
    }
  },
  _getMaxLength: function _getMaxLength() {
    var isMaskSpecified = !!this.option('mask');
    return isMaskSpecified ? null : this.option('maxLength');
  },
  _isAndroidOrIE: function _isAndroidOrIE() {
    var realDevice = devices.real();
    var version = realDevice.version.join('.');
    return browser.msie || realDevice.platform === 'android' && version && /^(2\.|4\.1)/.test(version) && !/chrome/i.test(ua);
  }
});
registerComponent('dxTextBox', TextBox);
export default TextBox;
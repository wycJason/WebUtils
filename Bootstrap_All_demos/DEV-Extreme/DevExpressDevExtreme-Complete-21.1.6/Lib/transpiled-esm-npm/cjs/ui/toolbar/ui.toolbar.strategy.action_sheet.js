"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _uiToolbar = _interopRequireDefault(require("./ui.toolbar.strategy"));

var _extend = require("../../core/utils/extend");

var _action_sheet = _interopRequireDefault(require("../action_sheet"));

var _button = _interopRequireDefault(require("../button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOOLBAR_MENU_BUTTON_CLASS = 'dx-toolbar-menu-button';

var ActionSheetStrategy = _uiToolbar.default.inherit({
  NAME: 'actionSheet',
  _getMenuItemTemplate: function _getMenuItemTemplate() {
    return this._toolbar._getTemplate('actionSheetItem');
  },
  render: function render() {
    if (!this._hasVisibleMenuItems()) {
      return;
    }

    this._renderMenuButton();

    this._renderWidget();
  },
  _renderMenuButton: function _renderMenuButton() {
    var _this = this;

    this._renderMenuButtonContainer();

    this._$button = (0, _renderer.default)('<div>').appendTo(this._$menuButtonContainer).addClass(TOOLBAR_MENU_BUTTON_CLASS);

    this._toolbar._createComponent(this._$button, _button.default, {
      icon: 'overflow',
      onClick: function onClick() {
        _this._toolbar.option('overflowMenuVisible', !_this._toolbar.option('overflowMenuVisible'));
      }
    });
  },
  _menuWidget: function _menuWidget() {
    return _action_sheet.default;
  },
  _menuContainer: function _menuContainer() {
    return this._toolbar.$element();
  },
  _widgetOptions: function _widgetOptions() {
    var _this2 = this;

    return (0, _extend.extend)(this.callBase(), {
      target: this._$button,
      showTitle: false,
      onOptionChanged: function onOptionChanged(_ref) {
        var name = _ref.name,
            value = _ref.value;

        if (name === 'visible') {
          _this2._toolbar.option('overflowMenuVisible', value);
        }
      }
    });
  }
});

var _default = ActionSheetStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
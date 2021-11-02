"use strict";

exports.default = void 0;

var _extend = require("../../core/utils/extend");

var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));

var _uiToolbar = _interopRequireDefault(require("./ui.toolbar.strategy"));

var _uiToolbar2 = _interopRequireDefault(require("./ui.toolbar.menu"));

var _drop_down_menu = _interopRequireDefault(require("../drop_down_menu"));

var _devices = _interopRequireDefault(require("../../core/devices"));

var _popover_contants = require("../popover_contants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MENU_INVISIBLE_CLASS = 'dx-state-invisible';

var DropDownMenuStrategy = _uiToolbar.default.inherit({
  NAME: 'dropDownMenu',
  render: function render() {
    if (!this._hasVisibleMenuItems()) {
      return;
    }

    this._renderMenuButtonContainer();

    this._renderWidget();
  },
  renderMenuItems: function renderMenuItems() {
    if (!this._menu) {
      this.render();
    }

    this.callBase();

    if (this._menu && !this._menu.option('items').length) {
      this._menu.close();
    }
  },
  _menuWidget: function _menuWidget() {
    return _drop_down_menu.default;
  },
  _widgetOptions: function _widgetOptions() {
    var _this = this;

    var topAndBottomOffset = 2 * _popover_contants.POPOVER_BOUNDARY_OFFSET;
    return (0, _extend.extend)(this.callBase(), {
      deferRendering: true,
      container: this._toolbar.option('menuContainer'),
      popupMaxHeight: _devices.default.current().platform === 'android' ? _dom_adapter.default.getDocumentElement().clientHeight - topAndBottomOffset : undefined,
      menuWidget: _uiToolbar2.default,
      onOptionChanged: function onOptionChanged(_ref) {
        var name = _ref.name,
            value = _ref.value;

        if (name === 'opened') {
          _this._toolbar.option('overflowMenuVisible', value);
        }

        if (name === 'items') {
          _this._updateMenuVisibility(value);
        }
      },
      popupPosition: {
        at: 'bottom right',
        my: 'top right'
      }
    });
  },
  _updateMenuVisibility: function _updateMenuVisibility(menuItems) {
    var items = menuItems || this._getMenuItems();

    var isMenuVisible = items.length && this._hasVisibleMenuItems(items);

    this._toggleMenuVisibility(isMenuVisible);
  },
  _toggleMenuVisibility: function _toggleMenuVisibility(value) {
    if (!this._menuContainer()) {
      return;
    }

    this._menuContainer().toggleClass(MENU_INVISIBLE_CLASS, !value);
  },
  _menuContainer: function _menuContainer() {
    return this._$menuButtonContainer;
  }
});

var _default = DropDownMenuStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
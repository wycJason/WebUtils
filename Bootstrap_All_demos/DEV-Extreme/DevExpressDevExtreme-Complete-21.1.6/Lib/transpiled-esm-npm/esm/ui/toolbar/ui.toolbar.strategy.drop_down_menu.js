import { extend } from '../../core/utils/extend';
import domAdapter from '../../core/dom_adapter';
import ToolbarStrategy from './ui.toolbar.strategy';
import ToolbarMenu from './ui.toolbar.menu';
import DropDownMenu from '../drop_down_menu';
import devices from '../../core/devices';
import { POPOVER_BOUNDARY_OFFSET } from '../popover_contants';
var MENU_INVISIBLE_CLASS = 'dx-state-invisible';
var DropDownMenuStrategy = ToolbarStrategy.inherit({
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
    return DropDownMenu;
  },
  _widgetOptions: function _widgetOptions() {
    var topAndBottomOffset = 2 * POPOVER_BOUNDARY_OFFSET;
    return extend(this.callBase(), {
      deferRendering: true,
      container: this._toolbar.option('menuContainer'),
      popupMaxHeight: devices.current().platform === 'android' ? domAdapter.getDocumentElement().clientHeight - topAndBottomOffset : undefined,
      menuWidget: ToolbarMenu,
      onOptionChanged: _ref => {
        var {
          name,
          value
        } = _ref;

        if (name === 'opened') {
          this._toolbar.option('overflowMenuVisible', value);
        }

        if (name === 'items') {
          this._updateMenuVisibility(value);
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
export default DropDownMenuStrategy;
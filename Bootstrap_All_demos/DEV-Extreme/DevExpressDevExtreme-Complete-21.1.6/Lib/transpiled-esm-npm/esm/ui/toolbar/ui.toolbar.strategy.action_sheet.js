import $ from '../../core/renderer';
import ToolbarStrategy from './ui.toolbar.strategy';
import { extend } from '../../core/utils/extend';
import ActionSheet from '../action_sheet';
import Button from '../button';
var TOOLBAR_MENU_BUTTON_CLASS = 'dx-toolbar-menu-button';
var ActionSheetStrategy = ToolbarStrategy.inherit({
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
    this._renderMenuButtonContainer();

    this._$button = $('<div>').appendTo(this._$menuButtonContainer).addClass(TOOLBAR_MENU_BUTTON_CLASS);

    this._toolbar._createComponent(this._$button, Button, {
      icon: 'overflow',
      onClick: () => {
        this._toolbar.option('overflowMenuVisible', !this._toolbar.option('overflowMenuVisible'));
      }
    });
  },
  _menuWidget: function _menuWidget() {
    return ActionSheet;
  },
  _menuContainer: function _menuContainer() {
    return this._toolbar.$element();
  },
  _widgetOptions: function _widgetOptions() {
    return extend(this.callBase(), {
      target: this._$button,
      showTitle: false,
      onOptionChanged: _ref => {
        var {
          name,
          value
        } = _ref;

        if (name === 'visible') {
          this._toolbar.option('overflowMenuVisible', value);
        }
      }
    });
  }
});
export default ActionSheetStrategy;
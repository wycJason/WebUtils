import $ from '../core/renderer';
import registerComponent from '../core/component_registrator';
import { grep, deferRender } from '../core/utils/common';
import { extend } from '../core/utils/extend';
import { merge } from '../core/utils/array';
import { each } from '../core/utils/iterator';
import ActionSheetStrategy from './toolbar/ui.toolbar.strategy.action_sheet';
import DropDownMenuStrategy from './toolbar/ui.toolbar.strategy.drop_down_menu';
import ToolbarBase from './toolbar/ui.toolbar.base';
import { ChildDefaultTemplate } from '../core/templates/child_default_template'; // STYLE toolbar

var STRATEGIES = {
  actionSheet: ActionSheetStrategy,
  dropDownMenu: DropDownMenuStrategy
};
var TOOLBAR_AUTO_HIDE_ITEM_CLASS = 'dx-toolbar-item-auto-hide';
var TOOLBAR_AUTO_HIDE_TEXT_CLASS = 'dx-toolbar-text-auto-hide';
var TOOLBAR_HIDDEN_ITEM = 'dx-toolbar-item-invisible';
var Toolbar = ToolbarBase.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
      menuItemTemplate: 'menuItem',

      /**
      * @name dxToolbarOptions.submenuType
      * @type string
      * @default 'dropDownMenu'
      * @acceptValues 'actionSheet'|'dropDownMenu'
      * @hidden
      */
      submenuType: 'dropDownMenu',
      menuContainer: undefined,
      overflowMenuVisible: false
      /**
      * @name dxToolbarOptions.selectedIndex
      * @type number
      * @default -1
      * @hidden
      */

      /**
      * @name dxToolbarOptions.activeStateEnabled
      * @hidden
      */

      /**
      * @name dxToolbarOptions.focusStateEnabled
      * @hidden
      */

      /**
      * @name dxToolbarOptions.accessKey
      * @hidden
      */

      /**
      * @name dxToolbarOptions.tabIndex
      * @hidden
      */

      /**
      * @name dxToolbarOptions.selectedItems
      * @hidden
      */

      /**
      * @name dxToolbarOptions.selectedItemKeys
      * @hidden
      */

      /**
      * @name dxToolbarOptions.keyExpr
      * @hidden
      */

      /**
      * @name dxToolbarOptions.selectedItem
      * @hidden
      */

      /**
      * @name dxToolbarOptions.onSelectionChanged
      * @action
      * @hidden
      */

    });
  },
  _dimensionChanged: function _dimensionChanged(dimension) {
    if (dimension === 'height') {
      return;
    }

    this.callBase();

    this._menuStrategy.renderMenuItems();
  },
  _initTemplates: function _initTemplates() {
    this.callBase();

    this._templateManager.addDefaultTemplates({
      actionSheetItem: new ChildDefaultTemplate('item')
    });
  },
  _initMarkup: function _initMarkup() {
    this.callBase();

    this._renderMenu();
  },
  _postProcessRenderItems: function _postProcessRenderItems() {
    this._hideOverflowItems();

    this._menuStrategy._updateMenuVisibility();

    this.callBase();
    deferRender(() => {
      this._menuStrategy.renderMenuItems();
    });
  },
  _renderItem: function _renderItem(index, item, itemContainer, $after) {
    var itemElement = this.callBase(index, item, itemContainer, $after);

    if (item.locateInMenu === 'auto') {
      itemElement.addClass(TOOLBAR_AUTO_HIDE_ITEM_CLASS);
    }

    if (item.widget === 'dxButton' && item.showText === 'inMenu') {
      itemElement.toggleClass(TOOLBAR_AUTO_HIDE_TEXT_CLASS);
    }

    return itemElement;
  },
  _getItemsWidth: function _getItemsWidth() {
    return this._getSummaryItemsWidth([this._$beforeSection, this._$centerSection, this._$afterSection]);
  },
  _hideOverflowItems: function _hideOverflowItems(elementWidth) {
    var overflowItems = this.$element().find('.' + TOOLBAR_AUTO_HIDE_ITEM_CLASS);

    if (!overflowItems.length) {
      return;
    }

    elementWidth = elementWidth || this.$element().width();
    $(overflowItems).removeClass(TOOLBAR_HIDDEN_ITEM);

    var itemsWidth = this._getItemsWidth();

    while (overflowItems.length && elementWidth < itemsWidth) {
      var $item = overflowItems.eq(-1);
      itemsWidth -= $item.outerWidth();
      $item.addClass(TOOLBAR_HIDDEN_ITEM);
      overflowItems.splice(-1, 1);
    }
  },
  _getMenuItems: function _getMenuItems() {
    var that = this;
    var menuItems = grep(this.option('items') || [], function (item) {
      return that._isMenuItem(item);
    });

    var $hiddenItems = this._itemContainer().children('.' + TOOLBAR_AUTO_HIDE_ITEM_CLASS + '.' + TOOLBAR_HIDDEN_ITEM).not('.dx-state-invisible');

    this._restoreItems = this._restoreItems || [];
    var overflowItems = [].slice.call($hiddenItems).map(item => {
      var itemData = that._getItemData(item);

      var $itemContainer = $(item).children();
      var $itemMarkup = $itemContainer.children();
      return extend({
        menuItemTemplate: function menuItemTemplate() {
          that._restoreItems.push({
            container: $itemContainer,
            item: $itemMarkup
          });

          var $container = $('<div>').addClass(TOOLBAR_AUTO_HIDE_ITEM_CLASS);
          return $container.append($itemMarkup);
        }
      }, itemData);
    });
    return merge(overflowItems, menuItems);
  },
  _getToolbarItems: function _getToolbarItems() {
    var that = this;
    return grep(this.option('items') || [], function (item) {
      return !that._isMenuItem(item);
    });
  },
  _renderMenu: function _renderMenu() {
    this._renderMenuStrategy();

    deferRender(() => {
      this._menuStrategy.render();
    });
  },
  _renderMenuStrategy: function _renderMenuStrategy() {
    var strategyName = this.option('submenuType');

    if (this._requireDropDownStrategy()) {
      strategyName = 'dropDownMenu';
    }

    var strategy = STRATEGIES[strategyName];

    if (!(this._menuStrategy && this._menuStrategy.NAME === strategyName)) {
      this._menuStrategy = new strategy(this);
    }
  },
  _requireDropDownStrategy: function _requireDropDownStrategy() {
    var items = this.option('items') || [];
    var result = false;
    each(items, function (index, item) {
      if (item.locateInMenu === 'auto') {
        result = true;
      } else if (item.locateInMenu === 'always' && item.widget) {
        result = true;
      }
    });
    return result;
  },
  _arrangeItems: function _arrangeItems() {
    if (this.$element().is(':hidden')) {
      return;
    }

    this._$centerSection.css({
      margin: '0 auto',
      float: 'none'
    });

    each(this._restoreItems || [], function (_, obj) {
      $(obj.container).append(obj.item);
    });
    this._restoreItems = [];
    var elementWidth = this.$element().width();

    this._hideOverflowItems(elementWidth);

    this.callBase(elementWidth);
  },
  _itemOptionChanged: function _itemOptionChanged(item, property, value) {
    if (this._isMenuItem(item)) {
      this._menuStrategy.renderMenuItems();
    } else if (this._isToolbarItem(item)) {
      this.callBase(item, property, value);
    } else {
      this.callBase(item, property, value);

      this._menuStrategy.renderMenuItems();
    }

    if (property === 'location') {
      this.repaint();
    }
  },
  _isMenuItem: function _isMenuItem(itemData) {
    return itemData.location === 'menu' || itemData.locateInMenu === 'always';
  },
  _isToolbarItem: function _isToolbarItem(itemData) {
    return itemData.location === undefined || itemData.locateInMenu === 'never';
  },
  _optionChanged: function _optionChanged(args) {
    var {
      name,
      value
    } = args;

    switch (name) {
      case 'submenuType':
        this._invalidate();

        break;

      case 'menuItemTemplate':
        this._changeMenuOption('itemTemplate', this._getTemplate(value));

        break;

      case 'onItemClick':
        this._changeMenuOption(name, value);

        this.callBase.apply(this, arguments);
        break;

      case 'menuContainer':
        this._changeMenuOption('container', value);

        break;

      case 'overflowMenuVisible':
        this._changeMenuOption(this._menuStrategy.NAME === 'dropDownMenu' ? 'opened' : 'visible', value);

        break;

      default:
        this.callBase.apply(this, arguments);
    }
  },
  _changeMenuOption: function _changeMenuOption(name, value) {
    this._menuStrategy.widgetOption(name, value);
  }
  /**
   * @name dxToolbar.registerKeyHandler
   * @publicName registerKeyHandler(key, handler)
   * @hidden
  */

  /**
   * @name dxToolbar.focus
   * @publicName focus()
   * @hidden
  */

});
registerComponent('dxToolbar', Toolbar);
export default Toolbar;
/**
 * @name dxToolbarItem
 * @inherits CollectionWidgetItem
 * @type object
 */
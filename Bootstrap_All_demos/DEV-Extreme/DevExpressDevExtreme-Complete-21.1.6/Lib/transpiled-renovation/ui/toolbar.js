"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../core/renderer"));

var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));

var _common = require("../core/utils/common");

var _extend = require("../core/utils/extend");

var _array = require("../core/utils/array");

var _iterator = require("../core/utils/iterator");

var _uiToolbarStrategy = _interopRequireDefault(require("./toolbar/ui.toolbar.strategy.action_sheet"));

var _uiToolbarStrategy2 = _interopRequireDefault(require("./toolbar/ui.toolbar.strategy.drop_down_menu"));

var _uiToolbar = _interopRequireDefault(require("./toolbar/ui.toolbar.base"));

var _child_default_template = require("../core/templates/child_default_template");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// STYLE toolbar
var STRATEGIES = {
  actionSheet: _uiToolbarStrategy.default,
  dropDownMenu: _uiToolbarStrategy2.default
};
var TOOLBAR_AUTO_HIDE_ITEM_CLASS = 'dx-toolbar-item-auto-hide';
var TOOLBAR_AUTO_HIDE_TEXT_CLASS = 'dx-toolbar-text-auto-hide';
var TOOLBAR_HIDDEN_ITEM = 'dx-toolbar-item-invisible';

var Toolbar = _uiToolbar.default.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
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
      actionSheetItem: new _child_default_template.ChildDefaultTemplate('item')
    });
  },
  _initMarkup: function _initMarkup() {
    this.callBase();

    this._renderMenu();
  },
  _postProcessRenderItems: function _postProcessRenderItems() {
    var _this = this;

    this._hideOverflowItems();

    this._menuStrategy._updateMenuVisibility();

    this.callBase();
    (0, _common.deferRender)(function () {
      _this._menuStrategy.renderMenuItems();
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
    (0, _renderer.default)(overflowItems).removeClass(TOOLBAR_HIDDEN_ITEM);

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
    var menuItems = (0, _common.grep)(this.option('items') || [], function (item) {
      return that._isMenuItem(item);
    });

    var $hiddenItems = this._itemContainer().children('.' + TOOLBAR_AUTO_HIDE_ITEM_CLASS + '.' + TOOLBAR_HIDDEN_ITEM).not('.dx-state-invisible');

    this._restoreItems = this._restoreItems || [];
    var overflowItems = [].slice.call($hiddenItems).map(function (item) {
      var itemData = that._getItemData(item);

      var $itemContainer = (0, _renderer.default)(item).children();
      var $itemMarkup = $itemContainer.children();
      return (0, _extend.extend)({
        menuItemTemplate: function menuItemTemplate() {
          that._restoreItems.push({
            container: $itemContainer,
            item: $itemMarkup
          });

          var $container = (0, _renderer.default)('<div>').addClass(TOOLBAR_AUTO_HIDE_ITEM_CLASS);
          return $container.append($itemMarkup);
        }
      }, itemData);
    });
    return (0, _array.merge)(overflowItems, menuItems);
  },
  _getToolbarItems: function _getToolbarItems() {
    var that = this;
    return (0, _common.grep)(this.option('items') || [], function (item) {
      return !that._isMenuItem(item);
    });
  },
  _renderMenu: function _renderMenu() {
    var _this2 = this;

    this._renderMenuStrategy();

    (0, _common.deferRender)(function () {
      _this2._menuStrategy.render();
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
    (0, _iterator.each)(items, function (index, item) {
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

    (0, _iterator.each)(this._restoreItems || [], function (_, obj) {
      (0, _renderer.default)(obj.container).append(obj.item);
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
    var name = args.name,
        value = args.value;

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

(0, _component_registrator.default)('dxToolbar', Toolbar);
var _default = Toolbar;
/**
 * @name dxToolbarItem
 * @inherits CollectionWidgetItem
 * @type object
 */

exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
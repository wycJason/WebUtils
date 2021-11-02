"use strict";

exports.default = void 0;

var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _base = _interopRequireDefault(require("./base"));

var _toolbar = _interopRequireDefault(require("../../toolbar"));

require("../../select_box");

require("../../color_box/color_view");

require("../../number_box");

var _ui = _interopRequireDefault(require("../../widget/ui.errors"));

var _widget_collector = _interopRequireDefault(require("./widget_collector"));

var _iterator = require("../../../core/utils/iterator");

var _type = require("../../../core/utils/type");

var _extend = require("../../../core/utils/extend");

var _message = _interopRequireDefault(require("../../../localization/message"));

var _inflector = require("../../../core/utils/inflector");

var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));

var _index = require("../../../events/utils/index");

var _table_helper = require("../utils/table_helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ToolbarModule = _base.default;

if (_devextremeQuill.default) {
  var TOOLBAR_WRAPPER_CLASS = 'dx-htmleditor-toolbar-wrapper';
  var TOOLBAR_CLASS = 'dx-htmleditor-toolbar';
  var TOOLBAR_FORMAT_WIDGET_CLASS = 'dx-htmleditor-toolbar-format';
  var TOOLBAR_SEPARATOR_CLASS = 'dx-htmleditor-toolbar-separator';
  var TOOLBAR_MENU_SEPARATOR_CLASS = 'dx-htmleditor-toolbar-menu-separator';
  var ACTIVE_FORMAT_CLASS = 'dx-format-active';
  var ICON_CLASS = 'dx-icon';
  var SELECTION_CHANGE_EVENT = 'selection-change';
  var DIALOG_COLOR_CAPTION = 'dxHtmlEditor-dialogColorCaption';
  var DIALOG_BACKGROUND_CAPTION = 'dxHtmlEditor-dialogBackgroundCaption';
  var DIALOG_LINK_CAPTION = 'dxHtmlEditor-dialogLinkCaption';
  var DIALOG_LINK_FIELD_URL = 'dxHtmlEditor-dialogLinkUrlField';
  var DIALOG_LINK_FIELD_TEXT = 'dxHtmlEditor-dialogLinkTextField';
  var DIALOG_LINK_FIELD_TARGET = 'dxHtmlEditor-dialogLinkTargetField';
  var DIALOG_LINK_FIELD_TARGET_CLASS = 'dx-formdialog-field-target';
  var DIALOG_IMAGE_CAPTION = 'dxHtmlEditor-dialogImageCaption';
  var DIALOG_IMAGE_FIELD_URL = 'dxHtmlEditor-dialogImageUrlField';
  var DIALOG_IMAGE_FIELD_ALT = 'dxHtmlEditor-dialogImageAltField';
  var DIALOG_IMAGE_FIELD_WIDTH = 'dxHtmlEditor-dialogImageWidthField';
  var DIALOG_IMAGE_FIELD_HEIGHT = 'dxHtmlEditor-dialogImageHeightField';
  var DIALOG_TABLE_FIELD_COLUMNS = 'dxHtmlEditor-dialogInsertTableRowsField';
  var DIALOG_TABLE_FIELD_ROWS = 'dxHtmlEditor-dialogInsertTableColumnsField';
  var DIALOG_TABLE_CAPTION = 'dxHtmlEditor-dialogInsertTableCaption';
  var USER_ACTION = 'user';
  var SILENT_ACTION = 'silent';
  var ICON_MAP = {
    insertHeaderRow: 'header',
    clear: 'clearformat'
  };

  var localize = function localize(name) {
    return _message.default.format("dxHtmlEditor-".concat((0, _inflector.camelize)(name)));
  };

  var localizeValue = function localizeValue(value, name) {
    if (name === 'header') {
      var isHeaderValue = (0, _type.isDefined)(value) && value !== false;
      return isHeaderValue ? "".concat(localize('heading'), " ").concat(value) : localize('normalText');
    }

    return localize(value) || value;
  };

  ToolbarModule = /*#__PURE__*/function (_BaseModule) {
    _inheritsLoose(ToolbarModule, _BaseModule);

    function ToolbarModule(quill, options) {
      var _this;

      _this = _BaseModule.call(this, quill, options) || this;
      _this._toolbarWidgets = new _widget_collector.default();
      _this._formatHandlers = _this._getFormatHandlers();
      _this._tableFormats = (0, _table_helper.getTableFormats)(quill);

      if ((0, _type.isDefined)(options.items)) {
        _this._addCallbacks();

        _this._renderToolbar();

        _this.quill.on('editor-change', function (eventName) {
          var isSelectionChanged = eventName === SELECTION_CHANGE_EVENT;

          _this._updateToolbar(isSelectionChanged);
        });
      }

      return _this;
    }

    var _proto = ToolbarModule.prototype;

    _proto._applyFormat = function _applyFormat(formatArgs, event) {
      var _this$quill;

      this.saveValueChangeEvent(event);

      (_this$quill = this.quill).format.apply(_this$quill, _toConsumableArray(formatArgs));
    };

    _proto._addCallbacks = function _addCallbacks() {
      this.addCleanCallback(this.clean.bind(this));
      this.editorInstance.addContentInitializedCallback(this.updateHistoryWidgets.bind(this));
    };

    _proto._updateToolbar = function _updateToolbar(isSelectionChanged) {
      this.updateFormatWidgets(isSelectionChanged);
      this.updateHistoryWidgets();
      this.updateTableWidgets();
    };

    _proto._getDefaultClickHandler = function _getDefaultClickHandler(name) {
      var _this2 = this;

      return function (_ref) {
        var event = _ref.event;

        var formats = _this2.quill.getFormat();

        var value = formats[name];
        var newValue = !((0, _type.isBoolean)(value) ? value : (0, _type.isDefined)(value));

        _this2._applyFormat([name, newValue, USER_ACTION], event);

        _this2._updateFormatWidget(name, newValue, formats);
      };
    };

    _proto._updateFormatWidget = function _updateFormatWidget(name, isApplied, formats) {
      var widget = this._toolbarWidgets.getByName(name);

      if (!widget) {
        return;
      }

      if (isApplied) {
        this._markActiveFormatWidget(name, widget, formats);
      } else {
        this._resetFormatWidget(name, widget);

        if (Object.prototype.hasOwnProperty.call(name)) {
          delete formats[name];
        }
      }

      this._toggleClearFormatting(isApplied || !(0, _type.isEmptyObject)(formats));
    };

    _proto._getFormatHandlers = function _getFormatHandlers() {
      var _this3 = this;

      return {
        clear: function clear(_ref2) {
          var event = _ref2.event;

          var range = _this3.quill.getSelection();

          if (range) {
            _this3.saveValueChangeEvent(event);

            _this3.quill.removeFormat(range);

            _this3.updateFormatWidgets();
          }
        },
        link: this._prepareLinkHandler(),
        image: this._prepareImageHandler(),
        color: this._prepareColorClickHandler('color'),
        background: this._prepareColorClickHandler('background'),
        orderedList: this._prepareShortcutHandler('list', 'ordered'),
        bulletList: this._prepareShortcutHandler('list', 'bullet'),
        alignLeft: this._prepareShortcutHandler('align', 'left'),
        alignCenter: this._prepareShortcutHandler('align', 'center'),
        alignRight: this._prepareShortcutHandler('align', 'right'),
        alignJustify: this._prepareShortcutHandler('align', 'justify'),
        codeBlock: this._getDefaultClickHandler('code-block'),
        undo: function undo(_ref3) {
          var event = _ref3.event;

          _this3.saveValueChangeEvent(event);

          _this3.quill.history.undo();
        },
        redo: function redo(_ref4) {
          var event = _ref4.event;

          _this3.saveValueChangeEvent(event);

          _this3.quill.history.redo();
        },
        increaseIndent: function increaseIndent(_ref5) {
          var event = _ref5.event;

          _this3._applyFormat(['indent', '+1', USER_ACTION], event);
        },
        decreaseIndent: function decreaseIndent(_ref6) {
          var event = _ref6.event;

          _this3._applyFormat(['indent', '-1', USER_ACTION], event);
        },
        superscript: this._prepareShortcutHandler('script', 'super'),
        subscript: this._prepareShortcutHandler('script', 'sub'),
        insertTable: this._prepareInsertTableHandler(),
        insertRowAbove: (0, _table_helper.getTableOperationHandler)(this.quill, 'insertRowAbove'),
        insertRowBelow: (0, _table_helper.getTableOperationHandler)(this.quill, 'insertRowBelow'),
        insertColumnLeft: (0, _table_helper.getTableOperationHandler)(this.quill, 'insertColumnLeft'),
        insertColumnRight: (0, _table_helper.getTableOperationHandler)(this.quill, 'insertColumnRight'),
        deleteColumn: (0, _table_helper.getTableOperationHandler)(this.quill, 'deleteColumn'),
        deleteRow: (0, _table_helper.getTableOperationHandler)(this.quill, 'deleteRow'),
        deleteTable: (0, _table_helper.getTableOperationHandler)(this.quill, 'deleteTable')
      };
    };

    _proto._prepareShortcutHandler = function _prepareShortcutHandler(name, shortcutValue) {
      var _this4 = this;

      return function (_ref7) {
        var event = _ref7.event;

        var formats = _this4.quill.getFormat();

        var value = formats[name] === shortcutValue ? false : shortcutValue;

        _this4._applyFormat([name, value, USER_ACTION], event);

        _this4.updateFormatWidgets(true);
      };
    };

    _proto._prepareLinkHandler = function _prepareLinkHandler() {
      var _this5 = this;

      return function () {
        _this5.quill.focus();

        var selection = _this5.quill.getSelection();

        var hasEmbedContent = _this5._hasEmbedContent(selection);

        var formats = selection ? _this5.quill.getFormat() : {};
        var formData = {
          href: formats.link || '',
          text: selection && !hasEmbedContent ? _this5.quill.getText(selection) : '',
          target: Object.prototype.hasOwnProperty.call(formats, 'target') ? !!formats.target : true
        };

        _this5.editorInstance.formDialogOption('title', _message.default.format(DIALOG_LINK_CAPTION));

        var promise = _this5.editorInstance.showFormDialog({
          formData: formData,
          items: _this5._getLinkFormItems(selection)
        });

        promise.done(function (formData, event) {
          if (selection && !hasEmbedContent) {
            var text = formData.text || formData.href;
            var index = selection.index,
                length = selection.length;
            formData.text = undefined;

            _this5.saveValueChangeEvent(event);

            length && _this5.quill.deleteText(index, length, SILENT_ACTION);

            _this5.quill.insertText(index, text, 'link', formData, USER_ACTION);

            _this5.quill.setSelection(index + text.length, 0, USER_ACTION);
          } else {
            formData.text = !selection && !formData.text ? formData.href : formData.text;

            _this5._applyFormat(['link', formData, USER_ACTION], event);
          }
        });
        promise.fail(function () {
          _this5.quill.focus();
        });
      };
    };

    _proto._hasEmbedContent = function _hasEmbedContent(selection) {
      return !!selection && this.quill.getText(selection).trim().length < selection.length;
    };

    _proto._getLinkFormItems = function _getLinkFormItems(selection) {
      return [{
        dataField: 'href',
        label: {
          text: _message.default.format(DIALOG_LINK_FIELD_URL)
        }
      }, {
        dataField: 'text',
        label: {
          text: _message.default.format(DIALOG_LINK_FIELD_TEXT)
        },
        visible: !this._hasEmbedContent(selection)
      }, {
        dataField: 'target',
        editorType: 'dxCheckBox',
        editorOptions: {
          text: _message.default.format(DIALOG_LINK_FIELD_TARGET)
        },
        cssClass: DIALOG_LINK_FIELD_TARGET_CLASS,
        label: {
          visible: false
        }
      }];
    };

    _proto._prepareImageHandler = function _prepareImageHandler() {
      var _this6 = this;

      return function () {
        var formData = _this6.quill.getFormat();

        var isUpdateDialog = Object.prototype.hasOwnProperty.call(formData, 'imageSrc');
        var defaultIndex = _this6._defaultPasteIndex;

        if (isUpdateDialog) {
          var _this6$quill$getForma = _this6.quill.getFormat(defaultIndex - 1, 1),
              imageSrc = _this6$quill$getForma.imageSrc;

          formData.src = formData.imageSrc;
          delete formData.imageSrc;

          if (!imageSrc || defaultIndex === 0) {
            _this6.quill.setSelection(defaultIndex + 1, 0, SILENT_ACTION);
          }
        }

        var formatIndex = _this6._embedFormatIndex;

        _this6.editorInstance.formDialogOption('title', _message.default.format(DIALOG_IMAGE_CAPTION));

        var promise = _this6.editorInstance.showFormDialog({
          formData: formData,
          items: _this6._imageFormItems
        });

        promise.done(function (formData, event) {
          var index = defaultIndex;

          _this6.saveValueChangeEvent(event);

          if (isUpdateDialog) {
            index = formatIndex;

            _this6.quill.deleteText(index, 1, SILENT_ACTION);
          }

          _this6.quill.insertEmbed(index, 'extendedImage', formData, USER_ACTION);

          _this6.quill.setSelection(index + 1, 0, USER_ACTION);
        }).always(function () {
          _this6.quill.focus();
        });
      };
    };

    _proto._prepareInsertTableHandler = function _prepareInsertTableHandler() {
      var _this7 = this;

      return function () {
        var formats = _this7.quill.getFormat();

        var isTableFocused = _this7._tableFormats.some(function (format) {
          return Object.prototype.hasOwnProperty.call(formats, format);
        });

        var formData = {
          rows: 1,
          columns: 1
        };

        if (isTableFocused) {
          _this7.quill.focus();

          return;
        }

        _this7.editorInstance.formDialogOption('title', _message.default.format(DIALOG_TABLE_CAPTION));

        var promise = _this7.editorInstance.showFormDialog({
          formData: formData,
          items: _this7._insertTableFormItems
        });

        promise.done(function (formData, event) {
          _this7.quill.focus();

          var table = _this7.quill.getModule('table');

          if (table) {
            _this7.saveValueChangeEvent(event);

            var columns = formData.columns,
                rows = formData.rows;
            table.insertTable(columns, rows);
          }
        }).always(function () {
          _this7.quill.focus();
        });
      };
    };

    _proto._renderToolbar = function _renderToolbar() {
      var _this8 = this;

      var container = this.options.container || this._getContainer();

      this._$toolbar = (0, _renderer.default)('<div>').addClass(TOOLBAR_CLASS).appendTo(container);
      this._$toolbarContainer = (0, _renderer.default)(container).addClass(TOOLBAR_WRAPPER_CLASS);

      _events_engine.default.on(this._$toolbarContainer, (0, _index.addNamespace)('mousedown', this.editorInstance.NAME), function (e) {
        e.preventDefault();
      });

      this.toolbarInstance = this.editorInstance._createComponent(this._$toolbar, _toolbar.default, this.toolbarConfig);
      this.editorInstance.on('optionChanged', function (_ref8) {
        var name = _ref8.name;

        if (name === 'readOnly' || name === 'disabled') {
          _this8.toolbarInstance.option('disabled', _this8.isInteractionDisabled);
        }
      });
    };

    _proto.isMultilineMode = function isMultilineMode() {
      var _this$options$multili;

      return (_this$options$multili = this.options.multiline) !== null && _this$options$multili !== void 0 ? _this$options$multili : true;
    };

    _proto.clean = function clean() {
      this._toolbarWidgets.clear();

      if (this._$toolbarContainer) {
        this._$toolbarContainer.empty().removeClass(TOOLBAR_WRAPPER_CLASS);
      }
    };

    _proto.repaint = function repaint() {
      this.toolbarInstance && this.toolbarInstance.repaint();
    };

    _proto._getContainer = function _getContainer() {
      var $container = (0, _renderer.default)('<div>');
      this.editorInstance.$element().prepend($container);
      return $container;
    };

    _proto._detectRenamedOptions = function _detectRenamedOptions(item) {
      var optionsInfo = [{
        newName: 'name',
        oldName: 'formatName'
      }, {
        newName: 'acceptedValues',
        oldName: 'formatValues'
      }];

      if ((0, _type.isObject)(item)) {
        (0, _iterator.each)(optionsInfo, function (index, optionName) {
          if (Object.prototype.hasOwnProperty.call(item, optionName.oldName)) {
            _ui.default.log('W1016', optionName.oldName, optionName.newName);
          }
        });
      }
    };

    _proto._prepareToolbarItems = function _prepareToolbarItems() {
      var _this9 = this;

      var resultItems = [];
      (0, _iterator.each)(this.options.items, function (index, item) {
        var newItem;

        _this9._detectRenamedOptions(item);

        if ((0, _type.isObject)(item)) {
          newItem = _this9._handleObjectItem(item);
        } else if ((0, _type.isString)(item)) {
          var buttonItemConfig = _this9._prepareButtonItemConfig(item);

          newItem = _this9._getToolbarItem(buttonItemConfig);
        }

        if (newItem) {
          resultItems.push(newItem);
        }
      });
      return resultItems;
    };

    _proto._handleObjectItem = function _handleObjectItem(item) {
      if (item.name && item.acceptedValues && this._isAcceptableItem(item.widget, 'dxSelectBox')) {
        var selectItemConfig = this._prepareSelectItemConfig(item);

        return this._getToolbarItem(selectItemConfig);
      } else if (item.name && this._isAcceptableItem(item.widget, 'dxButton')) {
        var defaultButtonItemConfig = this._prepareButtonItemConfig(item.name);

        var buttonItemConfig = (0, _extend.extend)(true, defaultButtonItemConfig, item);
        return this._getToolbarItem(buttonItemConfig);
      } else {
        return this._getToolbarItem(item);
      }
    };

    _proto._isAcceptableItem = function _isAcceptableItem(widget, acceptableWidgetName) {
      return !widget || widget === acceptableWidgetName;
    };

    _proto._prepareButtonItemConfig = function _prepareButtonItemConfig(name) {
      var _ICON_MAP$name;

      var iconName = (_ICON_MAP$name = ICON_MAP[name]) !== null && _ICON_MAP$name !== void 0 ? _ICON_MAP$name : name;
      var buttonText = (0, _inflector.titleize)(name);
      return {
        widget: 'dxButton',
        name: name,
        options: {
          hint: localize(buttonText),
          text: localize(buttonText),
          icon: iconName.toLowerCase(),
          onClick: this._formatHandlers[name] || this._getDefaultClickHandler(name),
          stylingMode: 'text'
        },
        showText: 'inMenu'
      };
    };

    _proto._prepareSelectItemConfig = function _prepareSelectItemConfig(item) {
      var _this10 = this;

      var name = item.name,
          acceptedValues = item.acceptedValues;
      return (0, _extend.extend)(true, {
        widget: 'dxSelectBox',
        name: name,
        options: {
          stylingMode: 'filled',
          dataSource: acceptedValues,
          displayExpr: function displayExpr(value) {
            return localizeValue(value, name);
          },
          placeholder: localize(name),
          onValueChanged: function onValueChanged(e) {
            if (!_this10._isReset) {
              _this10._hideAdaptiveMenu();

              _this10._applyFormat([name, e.value, USER_ACTION], e.event);

              _this10._setValueSilent(e.component, e.value);
            }
          }
        }
      }, item);
    };

    _proto._hideAdaptiveMenu = function _hideAdaptiveMenu() {
      if (this.toolbarInstance.option('overflowMenuVisible')) {
        this.toolbarInstance.option('overflowMenuVisible', false);
      }
    };

    _proto._prepareColorClickHandler = function _prepareColorClickHandler(name) {
      var _this11 = this;

      return function () {
        var formData = _this11.quill.getFormat();

        var caption = name === 'color' ? DIALOG_COLOR_CAPTION : DIALOG_BACKGROUND_CAPTION;

        _this11.editorInstance.formDialogOption('title', _message.default.format(caption));

        var promise = _this11.editorInstance.showFormDialog({
          formData: formData,
          items: [{
            dataField: name,
            editorType: 'dxColorView',
            _forceItemFlexSizeCorrectionInIE: true,
            // WA for the T702531 (IE only)
            editorOptions: {
              focusStateEnabled: false
            },
            label: {
              visible: false
            }
          }]
        });

        promise.done(function (formData, event) {
          _this11._applyFormat([name, formData[name], USER_ACTION], event);
        });
        promise.fail(function () {
          _this11.quill.focus();
        });
      };
    };

    _proto._getToolbarItem = function _getToolbarItem(item) {
      var _this12 = this;

      var baseItem = {
        options: {
          onInitialized: function onInitialized(e) {
            if (item.name) {
              e.component.$element().addClass(TOOLBAR_FORMAT_WIDGET_CLASS);
              e.component.$element().toggleClass("dx-".concat(item.name.toLowerCase(), "-format"), !!item.name);

              _this12._toolbarWidgets.add(item.name, e.component);
            }
          }
        }
      };
      var multilineItem = this.isMultilineMode() ? {
        location: 'before',
        locateInMenu: 'never'
      } : {};
      return (0, _extend.extend)(true, {
        location: 'before',
        locateInMenu: 'auto'
      }, this._getDefaultConfig(item.name), item, baseItem, multilineItem);
    };

    _proto._getDefaultItemsConfig = function _getDefaultItemsConfig() {
      return {
        clear: {
          options: {
            disabled: true
          }
        },
        undo: {
          options: {
            disabled: true
          }
        },
        redo: {
          options: {
            disabled: true
          }
        },
        // ToDo: move it to the table module
        insertRowAbove: {
          options: {
            disabled: true
          }
        },
        insertRowBelow: {
          options: {
            disabled: true
          }
        },
        insertHeaderRow: {
          options: {
            disabled: true
          }
        },
        insertColumnLeft: {
          options: {
            disabled: true
          }
        },
        insertColumnRight: {
          options: {
            disabled: true
          }
        },
        deleteRow: {
          options: {
            disabled: true
          }
        },
        deleteColumn: {
          options: {
            disabled: true
          }
        },
        deleteTable: {
          options: {
            disabled: true
          }
        },
        separator: {
          template: function template(data, index, element) {
            (0, _renderer.default)(element).addClass(TOOLBAR_SEPARATOR_CLASS);
          },
          menuItemTemplate: function menuItemTemplate(data, index, element) {
            (0, _renderer.default)(element).addClass(TOOLBAR_MENU_SEPARATOR_CLASS);
          }
        }
      };
    };

    _proto._getDefaultConfig = function _getDefaultConfig(name) {
      return this._getDefaultItemsConfig()[name];
    };

    _proto.updateHistoryWidgets = function updateHistoryWidgets() {
      var historyModule = this.quill.history;

      if (!historyModule) {
        return;
      }

      var _historyModule$stack = historyModule.stack,
          undoOps = _historyModule$stack.undo,
          redoOps = _historyModule$stack.redo;

      this._updateManipulationWidget(this._toolbarWidgets.getByName('undo'), Boolean(undoOps.length));

      this._updateManipulationWidget(this._toolbarWidgets.getByName('redo'), Boolean(redoOps.length));
    };

    _proto.updateTableWidgets = function updateTableWidgets() {
      var _this13 = this;

      var table = this.quill.getModule('table');

      if (!table) {
        return;
      }

      var selection = this.quill.getSelection();
      var formats = selection && this.quill.getFormat(selection) || {};

      var isTableOperationsEnabled = this._tableFormats.some(function (format) {
        return Boolean(formats[format]);
      });

      _table_helper.TABLE_OPERATIONS.forEach(function (operationName) {
        var isInsertTable = operationName === 'insertTable';

        var widget = _this13._toolbarWidgets.getByName(operationName);

        _this13._updateManipulationWidget(widget, isInsertTable ? !isTableOperationsEnabled : isTableOperationsEnabled);
      });
    };

    _proto._updateManipulationWidget = function _updateManipulationWidget(widget, isOperationEnabled) {
      if (!widget) {
        return;
      }

      widget.option('disabled', !isOperationEnabled);
    };

    _proto.updateFormatWidgets = function updateFormatWidgets(isResetRequired) {
      var selection = this.quill.getSelection();

      if (!selection) {
        return;
      }

      var formats = this.quill.getFormat(selection);
      var hasFormats = !(0, _type.isEmptyObject)(formats);

      if (!hasFormats || isResetRequired) {
        this._resetFormatWidgets();
      }

      for (var formatName in formats) {
        var widgetName = this._getFormatWidgetName(formatName, formats);

        var formatWidget = this._toolbarWidgets.getByName(widgetName) || this._toolbarWidgets.getByName(formatName);

        if (!formatWidget) {
          continue;
        }

        this._markActiveFormatWidget(formatName, formatWidget, formats);
      }

      this._toggleClearFormatting(hasFormats || selection.length > 1);
    };

    _proto._markActiveFormatWidget = function _markActiveFormatWidget(name, widget, formats) {
      if (this._isColorFormat(name)) {
        this._updateColorWidget(name, formats[name]);
      }

      if ('value' in widget.option()) {
        this._setValueSilent(widget, formats[name]);
      } else {
        widget.$element().addClass(ACTIVE_FORMAT_CLASS);
      }
    };

    _proto._toggleClearFormatting = function _toggleClearFormatting(hasFormats) {
      var clearWidget = this._toolbarWidgets.getByName('clear');

      if (clearWidget) {
        clearWidget.option('disabled', !hasFormats);
      }
    };

    _proto._isColorFormat = function _isColorFormat(name) {
      return name === 'color' || name === 'background';
    };

    _proto._updateColorWidget = function _updateColorWidget(name, color) {
      var formatWidget = this._toolbarWidgets.getByName(name);

      if (!formatWidget) {
        return;
      }

      formatWidget.$element().find(".".concat(ICON_CLASS)).css('borderBottomColor', color || 'transparent');
    };

    _proto._getFormatWidgetName = function _getFormatWidgetName(name, formats) {
      var widgetName;

      switch (name) {
        case 'align':
          widgetName = name + (0, _inflector.titleize)(formats[name]);
          break;

        case 'list':
          widgetName = formats[name] + (0, _inflector.titleize)(name);
          break;

        case 'code-block':
          widgetName = 'codeBlock';
          break;

        case 'script':
          widgetName = formats[name] + name;
          break;

        case 'imageSrc':
          widgetName = 'image';
          break;

        default:
          widgetName = name;
      }

      return widgetName;
    };

    _proto._setValueSilent = function _setValueSilent(widget, value) {
      this._isReset = true;
      widget.option('value', value);
      this._isReset = false;
    };

    _proto._resetFormatWidgets = function _resetFormatWidgets() {
      var _this14 = this;

      this._toolbarWidgets.each(function (name, widget) {
        _this14._resetFormatWidget(name, widget);
      });
    };

    _proto._resetFormatWidget = function _resetFormatWidget(name, widget) {
      widget.$element().removeClass(ACTIVE_FORMAT_CLASS);

      if (this._isColorFormat(name)) {
        this._updateColorWidget(name);
      }

      if (name === 'clear') {
        widget.option('disabled', true);
      }

      if (widget.NAME === 'dxSelectBox') {
        this._setValueSilent(widget, null);
      }
    };

    _proto.addClickHandler = function addClickHandler(name, handler) {
      this._formatHandlers[name] = handler;

      var formatWidget = this._toolbarWidgets.getByName(name);

      if (formatWidget && formatWidget.NAME === 'dxButton') {
        formatWidget.option('onClick', handler);
      }
    };

    _createClass(ToolbarModule, [{
      key: "_insertTableFormItems",
      get: function get() {
        return [{
          dataField: 'columns',
          editorType: 'dxNumberBox',
          editorOptions: {
            min: 1
          },
          label: {
            text: _message.default.format(DIALOG_TABLE_FIELD_COLUMNS)
          }
        }, {
          dataField: 'rows',
          editorType: 'dxNumberBox',
          editorOptions: {
            min: 1
          },
          label: {
            text: _message.default.format(DIALOG_TABLE_FIELD_ROWS)
          }
        }];
      }
    }, {
      key: "_embedFormatIndex",
      get: function get() {
        var selection = this.quill.getSelection();

        if (selection) {
          if (selection.length) {
            return selection.index;
          } else {
            return selection.index - 1;
          }
        } else {
          return this.quill.getLength();
        }
      }
    }, {
      key: "_defaultPasteIndex",
      get: function get() {
        var _selection$index;

        var selection = this.quill.getSelection();
        return (_selection$index = selection === null || selection === void 0 ? void 0 : selection.index) !== null && _selection$index !== void 0 ? _selection$index : this.quill.getLength();
      }
    }, {
      key: "_imageFormItems",
      get: function get() {
        return [{
          dataField: 'src',
          label: {
            text: _message.default.format(DIALOG_IMAGE_FIELD_URL)
          }
        }, {
          dataField: 'width',
          label: {
            text: _message.default.format(DIALOG_IMAGE_FIELD_WIDTH)
          }
        }, {
          dataField: 'height',
          label: {
            text: _message.default.format(DIALOG_IMAGE_FIELD_HEIGHT)
          }
        }, {
          dataField: 'alt',
          label: {
            text: _message.default.format(DIALOG_IMAGE_FIELD_ALT)
          }
        }];
      }
    }, {
      key: "toolbarConfig",
      get: function get() {
        return {
          dataSource: this._prepareToolbarItems(),
          disabled: this.isInteractionDisabled,
          menuContainer: this._$toolbarContainer,
          multiline: this.isMultilineMode()
        };
      }
    }, {
      key: "isInteractionDisabled",
      get: function get() {
        return this.editorInstance.option('readOnly') || this.editorInstance.option('disabled');
      }
    }]);

    return ToolbarModule;
  }(_base.default);
}

var _default = ToolbarModule;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
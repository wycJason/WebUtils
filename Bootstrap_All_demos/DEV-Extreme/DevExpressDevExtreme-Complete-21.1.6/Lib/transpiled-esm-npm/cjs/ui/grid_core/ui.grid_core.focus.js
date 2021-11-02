"use strict";

exports.focusModule = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _uiGrid_core = _interopRequireDefault(require("./ui.grid_core.modules"));

var _iterator = require("../../core/utils/iterator");

var _uiGrid_core2 = _interopRequireDefault(require("./ui.grid_core.utils"));

var _common = require("../../core/utils/common");

var _type = require("../../core/utils/type");

var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROW_FOCUSED_CLASS = 'dx-row-focused';
var FOCUSED_ROW_SELECTOR = '.dx-row' + '.' + ROW_FOCUSED_CLASS;
var TABLE_POSTFIX_CLASS = 'table';
var CELL_FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';

var FocusController = _uiGrid_core.default.ViewController.inherit(function () {
  return {
    init: function init() {
      this._dataController = this.getController('data');
      this._keyboardController = this.getController('keyboardNavigation');
      this.component._optionsByReference.focusedRowKey = true;
    },
    optionChanged: function optionChanged(args) {
      if (args.name === 'focusedRowIndex') {
        var focusedRowKey = this.option('focusedRowKey');

        this._focusRowByIndex(args.value);

        this._triggerFocusedRowChangedIfNeed(focusedRowKey, args.value);

        args.handled = true;
      } else if (args.name === 'focusedRowKey') {
        args.handled = true;

        if (Array.isArray(args.value) && JSON.stringify(args.value) === JSON.stringify(args.previousValue)) {
          return;
        }

        var focusedRowIndex = this.option('focusedRowIndex');

        this._focusRowByKey(args.value);

        this._triggerFocusedRowChangedIfNeed(args.value, focusedRowIndex);
      } else if (args.name === 'focusedColumnIndex') {
        args.handled = true;
      } else if (args.name === 'focusedRowEnabled') {
        args.handled = true;
      } else if (args.name === 'autoNavigateToFocusedRow') {
        args.handled = true;
      } else {
        this.callBase(args);
      }
    },
    _triggerFocusedRowChangedIfNeed: function _triggerFocusedRowChangedIfNeed(focusedRowKey, focusedRowIndex) {
      var focusedRowIndexByKey = this.getFocusedRowIndexByKey(focusedRowKey);

      if (focusedRowIndex === focusedRowIndexByKey) {
        var rowIndex = this._dataController.getRowIndexByKey(focusedRowKey);

        if (rowIndex >= 0) {
          var $rowElement = (0, _renderer.default)(this.getView('rowsView').getRowElement(rowIndex));

          this.getController('keyboardNavigation')._fireFocusedRowChanged($rowElement, focusedRowIndex);
        }
      }
    },
    isAutoNavigateToFocusedRow: function isAutoNavigateToFocusedRow() {
      return this.option('scrolling.mode') !== 'infinite' && this.option('autoNavigateToFocusedRow');
    },
    _focusRowByIndex: function _focusRowByIndex(index, operationTypes) {
      if (!this.option('focusedRowEnabled')) {
        return;
      }

      index = index !== undefined ? index : this.option('focusedRowIndex');

      if (index < 0) {
        if (this.isAutoNavigateToFocusedRow()) {
          this._resetFocusedRow();
        }
      } else {
        this._focusRowByIndexCore(index, operationTypes);
      }
    },
    _focusRowByIndexCore: function _focusRowByIndexCore(index, operationTypes) {
      var _this = this;

      var dataController = this.getController('data');
      var pageSize = dataController.pageSize();

      var setKeyByIndex = function setKeyByIndex() {
        if (_this._isValidFocusedRowIndex(index)) {
          var rowIndex = index - dataController.getRowIndexOffset(true);

          if (!operationTypes || operationTypes.paging && !operationTypes.filtering) {
            var lastItemIndex = dataController._getLastItemIndex();

            rowIndex = Math.min(rowIndex, lastItemIndex);
          }

          var focusedRowKey = dataController.getKeyByRowIndex(rowIndex, true);

          if ((0, _type.isDefined)(focusedRowKey) && !_this.isRowFocused(focusedRowKey)) {
            _this.option('focusedRowKey', focusedRowKey);
          }
        }
      };

      if (pageSize >= 0) {
        if (!this._isLocalRowIndex(index)) {
          var pageIndex = Math.floor(index / dataController.pageSize());
          (0, _deferred.when)(dataController.pageIndex(pageIndex), dataController.waitReady()).done(function () {
            setKeyByIndex();
          });
        } else {
          setKeyByIndex();
        }
      }
    },
    _isLocalRowIndex: function _isLocalRowIndex(index) {
      var dataController = this.getController('data');

      var isVirtualScrolling = this.getController('keyboardNavigation')._isVirtualScrolling();

      if (isVirtualScrolling) {
        var pageIndex = Math.floor(index / dataController.pageSize());
        var virtualItems = dataController.virtualItemsCount();
        var virtualItemsBegin = virtualItems ? virtualItems.begin : -1;
        var visibleRowsCount = dataController.getVisibleRows().length + dataController.getRowIndexOffset();
        var visiblePagesCount = Math.ceil(visibleRowsCount / dataController.pageSize());
        return virtualItemsBegin <= index && visiblePagesCount > pageIndex;
      }

      return true;
    },
    _setFocusedRowKeyByIndex: function _setFocusedRowKeyByIndex(index) {
      var dataController = this.getController('data');

      if (this._isValidFocusedRowIndex(index)) {
        var rowIndex = Math.min(index - dataController.getRowIndexOffset(), dataController.items().length - 1);
        var focusedRowKey = dataController.getKeyByRowIndex(rowIndex);

        if ((0, _type.isDefined)(focusedRowKey) && !this.isRowFocused(focusedRowKey)) {
          this.option('focusedRowKey', focusedRowKey);
        }
      }
    },
    _focusRowByKey: function _focusRowByKey(key) {
      if (!(0, _type.isDefined)(key)) {
        this._resetFocusedRow();
      } else {
        this._navigateToRow(key, true);
      }
    },
    _resetFocusedRow: function _resetFocusedRow() {
      var focusedRowKey = this.option('focusedRowKey');
      var isFocusedRowKeyDefined = (0, _type.isDefined)(focusedRowKey);

      if (!isFocusedRowKeyDefined && this.option('focusedRowIndex') < 0) {
        return;
      }

      var keyboardController = this.getController('keyboardNavigation');

      if (isFocusedRowKeyDefined) {
        this.option('focusedRowKey', undefined);
      }

      keyboardController.setFocusedRowIndex(-1);
      this.option('focusedRowIndex', -1);
      this.getController('data').updateItems({
        changeType: 'updateFocusedRow',
        focusedRowKey: undefined
      });

      keyboardController._fireFocusedRowChanged(undefined, -1);
    },
    _isValidFocusedRowIndex: function _isValidFocusedRowIndex(rowIndex) {
      var dataController = this.getController('data');
      var row = dataController.getVisibleRows()[rowIndex];
      return !row || row.rowType === 'data' || row.rowType === 'group';
    },
    publicMethods: function publicMethods() {
      return ['navigateToRow', 'isRowFocused'];
    },
    navigateToRow: function navigateToRow(key) {
      if (!this.isAutoNavigateToFocusedRow()) {
        this.option('focusedRowIndex', -1);
      }

      this._navigateToRow(key);
    },
    _navigateToRow: function _navigateToRow(key, needFocusRow) {
      var that = this;
      var dataController = that.getController('data');
      var isAutoNavigate = that.isAutoNavigateToFocusedRow();
      var d = new _deferred.Deferred();

      if (key === undefined || !dataController.dataSource()) {
        return d.reject().promise();
      }

      var rowIndexByKey = that.getFocusedRowIndexByKey(key);

      if (!isAutoNavigate && needFocusRow || rowIndexByKey >= 0) {
        that._navigateTo(key, d, needFocusRow);
      } else {
        dataController.getPageIndexByKey(key).done(function (pageIndex) {
          if (pageIndex < 0) {
            d.resolve(-1);
            return;
          }

          if (pageIndex === dataController.pageIndex()) {
            dataController.reload().done(function () {
              if (that.isRowFocused(key)) {
                d.resolve(that.getFocusedRowIndexByKey(key));
              } else {
                that._navigateTo(key, d, needFocusRow);
              }
            }).fail(d.reject);
          } else {
            dataController.pageIndex(pageIndex).done(function () {
              that._navigateTo(key, d, needFocusRow);
            }).fail(d.reject);
          }
        }).fail(d.reject);
      }

      return d.promise();
    },
    _navigateTo: function _navigateTo(key, deferred, needFocusRow) {
      var visibleRowIndex = this.getController('data').getRowIndexByKey(key);
      var isVirtualRowRenderingMode = this.option('scrolling.rowRenderingMode') === 'virtual';
      var isAutoNavigate = this.isAutoNavigateToFocusedRow();

      if (isAutoNavigate && isVirtualRowRenderingMode && visibleRowIndex < 0) {
        this._navigateToVirtualRow(key, deferred, needFocusRow);
      } else {
        this._navigateToVisibleRow(key, deferred, needFocusRow);
      }
    },
    _navigateToVisibleRow: function _navigateToVisibleRow(key, deferred, needFocusRow) {
      if (needFocusRow) {
        this._triggerUpdateFocusedRow(key, deferred);
      } else {
        this.getView('rowsView').scrollToRowElement(key);
      }
    },
    _navigateToVirtualRow: function _navigateToVirtualRow(key, deferred, needFocusRow) {
      var that = this;
      var dataController = this.getController('data');
      var rowsScrollController = dataController._rowsScrollController;

      var rowIndex = _uiGrid_core2.default.getIndexByKey(key, dataController.items(true));

      var scrollable = that.getView('rowsView').getScrollable();

      if (rowsScrollController && scrollable && rowIndex >= 0) {
        var focusedRowIndex = rowIndex + dataController.getRowIndexOffset(true);
        var offset = rowsScrollController.getItemOffset(focusedRowIndex);

        if (needFocusRow) {
          var triggerUpdateFocusedRow = function triggerUpdateFocusedRow() {
            that.component.off('contentReady', triggerUpdateFocusedRow);

            that._triggerUpdateFocusedRow(key, deferred);
          };

          that.component.on('contentReady', triggerUpdateFocusedRow);
        }

        scrollable.scrollTo({
          y: offset
        });
      }
    },
    _triggerUpdateFocusedRow: function _triggerUpdateFocusedRow(key, deferred) {
      var dataController = this.getController('data');
      var focusedRowIndex = this.getFocusedRowIndexByKey(key);

      if (this._isValidFocusedRowIndex(focusedRowIndex)) {
        if (this.option('focusedRowEnabled')) {
          dataController.updateItems({
            changeType: 'updateFocusedRow',
            focusedRowKey: key
          });
        } else {
          this.getView('rowsView').scrollToRowElement(key);
        }

        this.getController('keyboardNavigation').setFocusedRowIndex(focusedRowIndex);
        deferred && deferred.resolve(focusedRowIndex);
      } else {
        deferred && deferred.resolve(-1);
      }
    },
    getFocusedRowIndexByKey: function getFocusedRowIndexByKey(key) {
      var dataController = this.getController('data');
      var loadedRowIndex = dataController.getRowIndexByKey(key, true);
      return loadedRowIndex >= 0 ? loadedRowIndex + dataController.getRowIndexOffset(true) : -1;
    },
    _focusRowByKeyOrIndex: function _focusRowByKeyOrIndex() {
      var _this2 = this;

      var focusedRowKey = this.option('focusedRowKey');
      var currentFocusedRowIndex = this.option('focusedRowIndex');
      var keyboardController = this.getController('keyboardNavigation');
      var dataController = this.getController('data');

      if ((0, _type.isDefined)(focusedRowKey)) {
        var visibleRowIndex = dataController.getRowIndexByKey(focusedRowKey);

        if (visibleRowIndex >= 0) {
          if (keyboardController._isVirtualScrolling()) {
            currentFocusedRowIndex = visibleRowIndex + dataController.getRowIndexOffset();
          }

          keyboardController.setFocusedRowIndex(currentFocusedRowIndex);

          this._triggerUpdateFocusedRow(focusedRowKey);
        } else {
          this._navigateToRow(focusedRowKey, true).done(function (focusedRowIndex) {
            if (currentFocusedRowIndex >= 0 && focusedRowIndex < 0) {
              _this2._focusRowByIndex();
            } else if (currentFocusedRowIndex < 0 && focusedRowIndex >= 0) {
              keyboardController.setFocusedRowIndex(focusedRowIndex);
            }
          });
        }
      } else if (currentFocusedRowIndex >= 0) {
        this.getController('focus')._focusRowByIndex(currentFocusedRowIndex);
      }
    },
    isRowFocused: function isRowFocused(key) {
      var focusedRowKey = this.option('focusedRowKey');

      if ((0, _type.isDefined)(focusedRowKey)) {
        return (0, _common.equalByValue)(key, this.option('focusedRowKey'));
      }
    },
    updateFocusedRow: function updateFocusedRow(change) {
      var that = this;

      var focusedRowIndex = that._dataController.getRowIndexByKey(change.focusedRowKey);

      var rowsView = that.getView('rowsView');
      var $tableElement;
      (0, _iterator.each)(rowsView.getTableElements(), function (index, element) {
        var _change$items;

        var isMainTable = index === 0;
        $tableElement = (0, _renderer.default)(element);

        that._clearPreviousFocusedRow($tableElement, focusedRowIndex);

        that._prepareFocusedRow({
          changedItem: change === null || change === void 0 ? void 0 : (_change$items = change.items) === null || _change$items === void 0 ? void 0 : _change$items[focusedRowIndex],
          $tableElement: $tableElement,
          focusedRowIndex: focusedRowIndex,
          isMainTable: isMainTable
        });
      });
    },
    _clearPreviousFocusedRow: function _clearPreviousFocusedRow($tableElement, focusedRowIndex) {
      var _this3 = this;

      var isNotMasterDetailFocusedRow = function isNotMasterDetailFocusedRow(_, focusedRow) {
        var $focusedRowTable = (0, _renderer.default)(focusedRow).closest(".".concat(_this3.addWidgetPrefix(TABLE_POSTFIX_CLASS)));
        return $tableElement.is($focusedRowTable);
      };

      var $prevRowFocusedElement = $tableElement.find(FOCUSED_ROW_SELECTOR).filter(isNotMasterDetailFocusedRow);
      $prevRowFocusedElement.removeClass(ROW_FOCUSED_CLASS).removeClass(CELL_FOCUS_DISABLED_CLASS).removeAttr('tabindex');
      $prevRowFocusedElement.children('td').removeAttr('tabindex');

      if (focusedRowIndex !== 0) {
        var $firstRow = (0, _renderer.default)(this.getView('rowsView').getRowElement(0));
        $firstRow.removeClass(CELL_FOCUS_DISABLED_CLASS).removeAttr('tabIndex');
      }
    },
    _prepareFocusedRow: function _prepareFocusedRow(options) {
      var $row;
      var changedItem = options.changedItem;

      if (changedItem && (changedItem.rowType === 'data' || changedItem.rowType === 'group')) {
        var focusedRowIndex = options.focusedRowIndex;
        var $tableElement = options.$tableElement;
        var isMainTable = options.isMainTable;
        var tabIndex = this.option('tabindex') || 0;
        var rowsView = this.getView('rowsView');
        $row = (0, _renderer.default)(rowsView._getRowElements($tableElement).eq(focusedRowIndex));
        $row.addClass(ROW_FOCUSED_CLASS).attr('tabindex', tabIndex);

        if (isMainTable) {
          rowsView.scrollToElementVertically($row);
        }
      }

      return $row;
    }
  };
}());

var focusModule = {
  defaultOptions: function defaultOptions() {
    return {
      focusedRowEnabled: false,
      autoNavigateToFocusedRow: true,
      focusedRowKey: undefined,
      focusedRowIndex: -1,
      focusedColumnIndex: -1
    };
  },
  controllers: {
    focus: FocusController
  },
  extenders: {
    controllers: {
      keyboardNavigation: {
        init: function init() {
          var rowIndex = this.option('focusedRowIndex');
          var columnIndex = this.option('focusedColumnIndex');
          this.createAction('onFocusedRowChanging', {
            excludeValidators: ['disabled', 'readOnly']
          });
          this.createAction('onFocusedRowChanged', {
            excludeValidators: ['disabled', 'readOnly']
          });
          this.createAction('onFocusedCellChanging', {
            excludeValidators: ['disabled', 'readOnly']
          });
          this.createAction('onFocusedCellChanged', {
            excludeValidators: ['disabled', 'readOnly']
          });
          this.callBase();
          this.setRowFocusType();
          this._focusedCellPosition = {};

          if ((0, _type.isDefined)(rowIndex)) {
            this._focusedCellPosition.rowIndex = this.option('focusedRowIndex');
          }

          if ((0, _type.isDefined)(columnIndex)) {
            this._focusedCellPosition.columnIndex = this.option('focusedColumnIndex');
          }
        },
        setFocusedRowIndex: function setFocusedRowIndex(rowIndex) {
          var dataController = this.getController('data');
          this.callBase(rowIndex);
          var visibleRowIndex = rowIndex - dataController.getRowIndexOffset();
          var visibleRow = dataController.getVisibleRows()[visibleRowIndex];

          if (!visibleRow || !visibleRow.isNewRow) {
            this.option('focusedRowIndex', rowIndex);
          }
        },
        setFocusedColumnIndex: function setFocusedColumnIndex(columnIndex) {
          this.callBase(columnIndex);
          this.option('focusedColumnIndex', columnIndex);
        },
        _escapeKeyHandler: function _escapeKeyHandler(eventArgs, isEditing) {
          if (isEditing || !this.option('focusedRowEnabled')) {
            this.callBase(eventArgs, isEditing);
            return;
          }

          if (this.isCellFocusType()) {
            this.setRowFocusType();

            this._focus(this._getCellElementFromTarget(eventArgs.originalEvent.target), true);
          }
        },
        _updateFocusedCellPosition: function _updateFocusedCellPosition($cell, direction) {
          var prevRowIndex = this.option('focusedRowIndex');
          var prevColumnIndex = this.option('focusedColumnIndex');
          var position = this.callBase($cell, direction);

          if (position && position.columnIndex >= 0) {
            this._fireFocusedCellChanged($cell, prevColumnIndex, prevRowIndex);
          }
        }
      },
      editorFactory: {
        renderFocusOverlay: function renderFocusOverlay($element, hideBorder) {
          var keyboardController = this.getController('keyboardNavigation');
          var focusedRowEnabled = this.option('focusedRowEnabled');
          var editingController = this.getController('editing');
          var isRowElement = keyboardController._getElementType($element) === 'row';
          var $cell;

          if (!focusedRowEnabled || !keyboardController.isRowFocusType() || editingController.isEditing()) {
            this.callBase($element, hideBorder);
          } else if (focusedRowEnabled) {
            if (isRowElement && !$element.hasClass(ROW_FOCUSED_CLASS)) {
              $cell = keyboardController.getFirstValidCellInRow($element);
              keyboardController.focus($cell);
            }
          }
        }
      },
      columns: {
        getSortDataSourceParameters: function getSortDataSourceParameters(_, sortByKey) {
          var _this4 = this;

          var result = this.callBase.apply(this, arguments);
          var dataController = this.getController('data');
          var dataSource = dataController._dataSource;
          var store = dataController.store();
          var key = store && store.key();
          var remoteOperations = dataSource && dataSource.remoteOperations() || {};
          var isLocalOperations = Object.keys(remoteOperations).every(function (operationName) {
            return !remoteOperations[operationName];
          });

          if (key && (this.option('focusedRowEnabled') && this.getController('focus').isAutoNavigateToFocusedRow() !== false || sortByKey)) {
            key = Array.isArray(key) ? key : [key];
            var notSortedKeys = key.filter(function (key) {
              return !_this4.columnOption(key, 'sortOrder');
            });

            if (notSortedKeys.length) {
              result = result || [];

              if (isLocalOperations) {
                result.push({
                  selector: dataSource.getDataIndexGetter(),
                  desc: false
                });
              } else {
                notSortedKeys.forEach(function (notSortedKey) {
                  return result.push({
                    selector: notSortedKey,
                    desc: false
                  });
                });
              }
            }
          }

          return result;
        }
      },
      data: {
        _applyChange: function _applyChange(change) {
          if (change && change.changeType === 'updateFocusedRow') return;
          return this.callBase.apply(this, arguments);
        },
        _fireChanged: function _fireChanged(e) {
          this.callBase(e);

          if (this.option('focusedRowEnabled') && this._dataSource) {
            var isPartialUpdate = e.changeType === 'update' && e.repaintChangesOnly;
            var isPartialUpdateWithDeleting = isPartialUpdate && e.changeTypes && e.changeTypes.indexOf('remove') >= 0;

            if (e.changeType === 'refresh' && e.items.length || isPartialUpdateWithDeleting) {
              this._updatePageIndexes();

              this.processUpdateFocusedRow(e);
            } else if (e.changeType === 'append' || e.changeType === 'prepend') {
              this._updatePageIndexes();
            }
          }
        },
        _updatePageIndexes: function _updatePageIndexes() {
          var prevRenderingPageIndex = this._lastRenderingPageIndex || 0;
          var renderingPageIndex = this._rowsScrollController ? this._rowsScrollController.pageIndex() : 0;
          this._lastRenderingPageIndex = renderingPageIndex;
          this._isPagingByRendering = renderingPageIndex !== prevRenderingPageIndex;
        },
        isPagingByRendering: function isPagingByRendering() {
          return this._isPagingByRendering;
        },
        processUpdateFocusedRow: function processUpdateFocusedRow(e) {
          var operationTypes = e.operationTypes || {};
          var focusController = this.getController('focus');
          var reload = operationTypes.reload,
              fullReload = operationTypes.fullReload;
          var keyboardController = this.getController('keyboardNavigation');

          var isVirtualScrolling = keyboardController._isVirtualScrolling();

          var focusedRowKey = this.option('focusedRowKey');
          var isAutoNavigate = focusController.isAutoNavigateToFocusedRow();

          if (reload && !fullReload && (0, _type.isDefined)(focusedRowKey)) {
            focusController._navigateToRow(focusedRowKey, true).done(function (focusedRowIndex) {
              if (focusedRowIndex < 0) {
                focusController._focusRowByIndex(undefined, operationTypes);
              }
            });
          } else if (operationTypes.paging && !isVirtualScrolling) {
            if (isAutoNavigate) {
              var rowIndexByKey = this.getRowIndexByKey(focusedRowKey);
              var isValidRowIndexByKey = rowIndexByKey >= 0;
              var focusedRowIndex = this.option('focusedRowIndex');
              var needFocusRowByIndex = focusedRowIndex >= 0 && (focusedRowIndex === rowIndexByKey || !isValidRowIndexByKey);

              if (needFocusRowByIndex) {
                focusController._focusRowByIndex(undefined, operationTypes);
              }
            } else {
              if (this.getRowIndexByKey(focusedRowKey) < 0) {
                this.option('focusedRowIndex', -1);
              }
            }
          } else if (operationTypes.fullReload) {
            focusController._focusRowByKeyOrIndex();
          }
        },
        getPageIndexByKey: function getPageIndexByKey(key) {
          var that = this;
          var d = new _deferred.Deferred();
          that.getGlobalRowIndexByKey(key).done(function (globalIndex) {
            d.resolve(globalIndex >= 0 ? Math.floor(globalIndex / that.pageSize()) : -1);
          }).fail(d.reject);
          return d.promise();
        },
        getGlobalRowIndexByKey: function getGlobalRowIndexByKey(key) {
          if (this._dataSource.group()) {
            return this._calculateGlobalRowIndexByGroupedData(key);
          }

          return this._calculateGlobalRowIndexByFlatData(key);
        },
        _calculateGlobalRowIndexByFlatData: function _calculateGlobalRowIndexByFlatData(key, groupFilter, useGroup) {
          var that = this;
          var deferred = new _deferred.Deferred();
          var dataSource = that._dataSource;

          var filter = that._generateFilterByKey(key);

          dataSource.load({
            filter: that._concatWithCombinedFilter(filter),
            skip: 0,
            take: 1
          }).done(function (data) {
            if (data.length > 0) {
              filter = that._generateOperationFilterByKey(key, data[0], useGroup);
              dataSource.load({
                filter: that._concatWithCombinedFilter(filter, groupFilter),
                skip: 0,
                take: 1,
                requireTotalCount: true
              }).done(function (_, extra) {
                deferred.resolve(extra.totalCount);
              });
            } else {
              deferred.resolve(-1);
            }
          });
          return deferred.promise();
        },
        _concatWithCombinedFilter: function _concatWithCombinedFilter(filter, groupFilter) {
          var combinedFilter = this.getCombinedFilter();
          return _uiGrid_core2.default.combineFilters([filter, combinedFilter, groupFilter]);
        },
        _generateBooleanFilter: function _generateBooleanFilter(selector, value, sortInfo) {
          var result;

          if (value === false) {
            result = [selector, '=', sortInfo.desc ? true : null];
          } else if (value === true ? !sortInfo.desc : sortInfo.desc) {
            result = [selector, '<>', value];
          }

          return result;
        },
        _generateOperationFilterByKey: function _generateOperationFilterByKey(key, rowData, useGroup) {
          var that = this;
          var dataSource = that._dataSource;

          var filter = that._generateFilterByKey(key, '<');

          var sort = that._columnsController.getSortDataSourceParameters(!dataSource.remoteOperations().filtering, true);

          if (useGroup) {
            var group = that._columnsController.getGroupDataSourceParameters(!dataSource.remoteOperations().filtering);

            if (group) {
              sort = sort ? group.concat(sort) : group;
            }
          }

          if (sort) {
            sort.slice().reverse().forEach(function (sortInfo) {
              var selector = sortInfo.selector;
              var getter;

              if (typeof selector === 'function') {
                getter = selector;
              } else {
                getter = that._columnsController.columnOption(selector, 'selector');
              }

              var value = getter ? getter(rowData) : rowData[selector];
              filter = [[selector, '=', value], 'and', filter];

              if (value === null || (0, _type.isBoolean)(value)) {
                var booleanFilter = that._generateBooleanFilter(selector, value, sortInfo);

                if (booleanFilter) {
                  filter = [booleanFilter, 'or', filter];
                }
              } else {
                var filterOperation = sortInfo.desc ? '>' : '<';
                var sortFilter = [selector, filterOperation, value];

                if (!sortInfo.desc) {
                  sortFilter = [sortFilter, 'or', [selector, '=', null]];
                }

                filter = [sortFilter, 'or', filter];
              }
            });
          }

          return filter;
        },
        _generateFilterByKey: function _generateFilterByKey(key, operation) {
          var dataSourceKey = this._dataSource.key();

          var filter = [];

          if (!operation) {
            operation = '=';
          }

          if (Array.isArray(dataSourceKey)) {
            for (var i = 0; i < dataSourceKey.length; ++i) {
              var keyPart = key[dataSourceKey[i]];

              if (keyPart) {
                if (filter.length > 0) {
                  filter.push('and');
                }

                filter.push([dataSourceKey[i], operation, keyPart]);
              }
            }
          } else {
            filter = [dataSourceKey, operation, key];
          }

          return filter;
        },
        _getLastItemIndex: function _getLastItemIndex() {
          return this.items(true).length - 1;
        }
      },
      editing: {
        _deleteRowCore: function _deleteRowCore(rowIndex) {
          var _this5 = this;

          var deferred = this.callBase.apply(this, arguments);
          var dataController = this.getController('data');
          var rowKey = dataController.getKeyByRowIndex(rowIndex);
          deferred.done(function () {
            var rowIndex = dataController.getRowIndexByKey(rowKey);
            var visibleRows = dataController.getVisibleRows();

            if (rowIndex === -1 && !visibleRows.length) {
              _this5.getController('focus')._resetFocusedRow();
            }
          });
        }
      }
    },
    views: {
      rowsView: {
        _createRow: function _createRow(row) {
          var $row = this.callBase(row);

          if (this.option('focusedRowEnabled') && row) {
            if (this.getController('focus').isRowFocused(row.key)) {
              $row.addClass(ROW_FOCUSED_CLASS);
            }
          }

          return $row;
        },
        _checkRowKeys: function _checkRowKeys(options) {
          this.callBase.apply(this, arguments);

          if (this.option('focusedRowEnabled') && this.option('dataSource')) {
            var store = this._dataController.store();

            if (store && !store.key()) {
              this._dataController.fireError('E1042', 'Row focusing');
            }
          }
        },
        _update: function _update(change) {
          if (change.changeType === 'updateFocusedRow') {
            if (this.option('focusedRowEnabled')) {
              this.getController('focus').updateFocusedRow(change);
            }
          } else {
            this.callBase(change);
          }
        },
        updateFocusElementTabIndex: function updateFocusElementTabIndex($cellElements, preventScroll) {
          if (this.option('focusedRowEnabled')) {
            this._setFocusedRowElementTabIndex(preventScroll);
          } else {
            this.callBase($cellElements);
          }
        },
        _setFocusedRowElementTabIndex: function _setFocusedRowElementTabIndex(preventScroll) {
          var _this6 = this;

          var focusedRowKey = this.option('focusedRowKey');
          var tabIndex = this.option('tabIndex') || 0;
          var dataController = this._dataController;
          var columnsController = this._columnsController;
          var rowIndex = dataController.getRowIndexByKey(focusedRowKey);
          var columnIndex = this.option('focusedColumnIndex');

          var $row = this._findRowElementForTabIndex();

          if (!(0, _type.isDefined)(this._scrollToFocusOnResize)) {
            this._scrollToFocusOnResize = function () {
              _this6.scrollToElementVertically(_this6._findRowElementForTabIndex());

              _this6.resizeCompleted.remove(_this6._scrollToFocusOnResize);
            };
          }

          $row.attr('tabIndex', tabIndex);

          if (rowIndex >= 0 && !preventScroll) {
            if (columnIndex < 0) {
              columnIndex = 0;
            }

            rowIndex += dataController.getRowIndexOffset();
            columnIndex += columnsController.getColumnIndexOffset();
            this.getController('keyboardNavigation').setFocusedCellPosition(rowIndex, columnIndex);

            if (this.getController('focus').isAutoNavigateToFocusedRow()) {
              var dataSource = dataController.dataSource();
              var operationTypes = dataSource && dataSource.operationTypes();

              if (operationTypes && !operationTypes.paging && !dataController.isPagingByRendering()) {
                this.resizeCompleted.remove(this._scrollToFocusOnResize);
                this.resizeCompleted.add(this._scrollToFocusOnResize);
              }
            }
          }
        },
        _findRowElementForTabIndex: function _findRowElementForTabIndex() {
          var focusedRowKey = this.option('focusedRowKey');

          var rowIndex = this._dataController.getRowIndexByKey(focusedRowKey);

          return (0, _renderer.default)(this.getRowElement(rowIndex >= 0 ? rowIndex : 0));
        },
        scrollToRowElement: function scrollToRowElement(key) {
          var rowIndex = this.getController('data').getRowIndexByKey(key);
          var $row = (0, _renderer.default)(this.getRow(rowIndex));
          this.scrollToElementVertically($row);
        },
        scrollToElementVertically: function scrollToElementVertically($row) {
          var scrollable = this.getScrollable();

          if (scrollable) {
            var position = scrollable.getScrollElementPosition($row, 'vertical');
            scrollable.scrollTo({
              top: position
            });
          }
        }
      }
    }
  }
};
exports.focusModule = focusModule;
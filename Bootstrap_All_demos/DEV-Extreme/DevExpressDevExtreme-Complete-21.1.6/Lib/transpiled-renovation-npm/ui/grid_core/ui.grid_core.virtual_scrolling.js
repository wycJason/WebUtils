"use strict";

exports.virtualScrollingModule = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _window = require("../../core/utils/window");

var _uiGrid_core = require("./ui.grid_core.virtual_scrolling_core");

var _uiGrid_core2 = _interopRequireDefault(require("./ui.grid_core.utils"));

var _iterator = require("../../core/utils/iterator");

var _deferred = require("../../core/utils/deferred");

var _load_indicator = _interopRequireDefault(require("../load_indicator"));

var _browser = _interopRequireDefault(require("../../core/utils/browser"));

var _position = require("../../core/utils/position");

var _type = require("../../core/utils/type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TABLE_CLASS = 'table';
var BOTTOM_LOAD_PANEL_CLASS = 'bottom-load-panel';
var TABLE_CONTENT_CLASS = 'table-content';
var GROUP_SPACE_CLASS = 'group-space';
var CONTENT_CLASS = 'content';
var ROW_CLASS = 'dx-row';
var FREESPACE_CLASS = 'dx-freespace-row';
var COLUMN_LINES_CLASS = 'dx-column-lines';
var VIRTUAL_ROW_CLASS = 'dx-virtual-row';
var SCROLLING_MODE_INFINITE = 'infinite';
var SCROLLING_MODE_VIRTUAL = 'virtual';
var SCROLLING_MODE_STANDARD = 'standard';
var PIXELS_LIMIT = 250000; // this limit is defined for IE

var LOAD_TIMEOUT = 300;
var NEW_SCROLLING_MODE = 'scrolling.newMode';

var isVirtualMode = function isVirtualMode(that) {
  return that.option('scrolling.mode') === SCROLLING_MODE_VIRTUAL;
};

var isAppendMode = function isAppendMode(that) {
  return that.option('scrolling.mode') === SCROLLING_MODE_INFINITE;
};

var isVirtualRowRendering = function isVirtualRowRendering(that) {
  var rowRenderingMode = that.option('scrolling.rowRenderingMode');

  if (rowRenderingMode === SCROLLING_MODE_VIRTUAL) {
    return true;
  } else if (rowRenderingMode === SCROLLING_MODE_STANDARD) {
    return false;
  }
};

var _correctCount = function correctCount(items, count, fromEnd, isItemCountableFunc) {
  for (var i = 0; i < count + 1; i++) {
    var item = items[fromEnd ? items.length - 1 - i : i];

    if (item && !isItemCountableFunc(item, i === count, fromEnd)) {
      count++;
    }
  }

  return count;
};

var isItemCountableByDataSource = function isItemCountableByDataSource(item, dataSource) {
  return item.rowType === 'data' && !item.isNewRow || item.rowType === 'group' && dataSource.isGroupItemCountable(item.data);
};

var updateItemIndices = function updateItemIndices(items) {
  items.forEach(function (item, index) {
    item.rowIndex = index;
  });
  return items;
};

var VirtualScrollingDataSourceAdapterExtender = function () {
  var _updateLoading = function updateLoading(that) {
    var beginPageIndex = that._virtualScrollController.beginPageIndex(-1);

    if (isVirtualMode(that)) {
      if (beginPageIndex < 0 || that.viewportSize() >= 0 && that.getViewportItemIndex() >= 0 && (beginPageIndex * that.pageSize() > that.getViewportItemIndex() || beginPageIndex * that.pageSize() + that.itemsCount() < that.getViewportItemIndex() + that.viewportSize()) && that._dataSource.isLoading()) {
        if (!that._isLoading) {
          that._isLoading = true;
          that.loadingChanged.fire(true);
        }
      } else {
        if (that._isLoading) {
          that._isLoading = false;
          that.loadingChanged.fire(false);
        }
      }
    }
  };

  var result = {
    init: function init() {
      this.callBase.apply(this, arguments);
      this._items = [];
      this._isLoaded = true;
      this._loadPageCount = 1;
      this._virtualScrollController = new _uiGrid_core.VirtualScrollController(this.component, this._getVirtualScrollDataOptions());
    },
    _getVirtualScrollDataOptions: function _getVirtualScrollDataOptions() {
      var that = this;
      return {
        pageSize: function pageSize() {
          return that.pageSize();
        },
        totalItemsCount: function totalItemsCount() {
          return that.totalItemsCount();
        },
        hasKnownLastPage: function hasKnownLastPage() {
          return that.hasKnownLastPage();
        },
        pageIndex: function pageIndex(index) {
          return that._dataSource.pageIndex(index);
        },
        isLoading: function isLoading() {
          return that._dataSource.isLoading() && !that.isCustomLoading();
        },
        pageCount: function pageCount() {
          return that.pageCount();
        },
        load: function load() {
          return that._dataSource.load();
        },
        updateLoading: function updateLoading() {
          _updateLoading(that);
        },
        itemsCount: function itemsCount() {
          return that.itemsCount(true);
        },
        items: function items() {
          return that._dataSource.items();
        },
        viewportItems: function viewportItems(items) {
          if (items) {
            that._items = items;
          }

          return that._items;
        },
        onChanged: function onChanged(e) {
          that.changed.fire(e);
        },
        changingDuration: function changingDuration(e) {
          if (that.isLoading()) {
            return LOAD_TIMEOUT;
          }

          return that._renderTime || 0;
        }
      };
    },
    _handleLoadingChanged: function _handleLoadingChanged(isLoading) {
      if (this.option(NEW_SCROLLING_MODE)) {
        this.callBase.apply(this, arguments);
        return;
      }

      if (!isVirtualMode(this) || this._isLoadingAll) {
        this._isLoading = isLoading;
        this.callBase.apply(this, arguments);
      }

      if (isLoading) {
        this._startLoadTime = new Date();
      } else {
        this._startLoadTime = undefined;
      }
    },
    _handleLoadError: function _handleLoadError() {
      if (!this.option(NEW_SCROLLING_MODE)) {
        this._isLoading = false;
        this.loadingChanged.fire(false);
      }

      this.callBase.apply(this, arguments);
    },
    _handleDataChanged: function _handleDataChanged(e) {
      if (this.option(NEW_SCROLLING_MODE)) {
        this.callBase.apply(this, arguments);
        return;
      }

      var callBase = this.callBase.bind(this);

      this._virtualScrollController.handleDataChanged(callBase, e);
    },
    _customizeRemoteOperations: function _customizeRemoteOperations(options, operationTypes) {
      var newMode = this.option(NEW_SCROLLING_MODE);

      if ((isVirtualMode(this) || isAppendMode(this) && newMode) && !operationTypes.reload && (operationTypes.skip || newMode) && this._renderTime < this.option('scrolling.renderingThreshold')) {
        options.delay = undefined;
      }

      this.callBase.apply(this, arguments);
    },
    items: function items() {
      if (this.option(NEW_SCROLLING_MODE)) {
        return this._dataSource.items();
      }

      return this._items;
    },
    itemsCount: function itemsCount(isBase) {
      if (isBase) {
        return this.callBase();
      }

      return this._virtualScrollController.itemsCount();
    },
    load: function load(loadOptions) {
      if (this.option(NEW_SCROLLING_MODE) || loadOptions) {
        return this.callBase(loadOptions);
      }

      return this._virtualScrollController.load();
    },
    isLoading: function isLoading() {
      return this._isLoading;
    },
    isLoaded: function isLoaded() {
      return this._dataSource.isLoaded() && this._isLoaded;
    },
    resetPagesCache: function resetPagesCache(isLiveUpdate) {
      if (!isLiveUpdate) {
        this._virtualScrollController.reset(true);
      }

      this.callBase.apply(this, arguments);
    },
    _changeRowExpandCore: function _changeRowExpandCore() {
      var result = this.callBase.apply(this, arguments);

      if (this.option(NEW_SCROLLING_MODE)) {
        return result;
      }

      this.resetPagesCache();

      _updateLoading(this);

      return result;
    },
    reload: function reload() {
      this._dataSource.pageIndex(this.pageIndex());

      var virtualScrollController = this._virtualScrollController;

      if (!this.option(NEW_SCROLLING_MODE) && virtualScrollController) {
        var d = new _deferred.Deferred();
        this.callBase.apply(this, arguments).done(function (r) {
          var delayDeferred = virtualScrollController.getDelayDeferred();

          if (delayDeferred) {
            delayDeferred.done(d.resolve).fail(d.reject);
          } else {
            d.resolve(r);
          }
        }).fail(d.reject);
        return d;
      } else {
        return this.callBase.apply(this, arguments);
      }
    },
    refresh: function refresh(options, operationTypes) {
      if (!this.option(NEW_SCROLLING_MODE)) {
        var storeLoadOptions = options.storeLoadOptions;
        var dataSource = this._dataSource;

        if (operationTypes.reload) {
          this._virtualScrollController.reset();

          dataSource.items().length = 0;
          this._isLoaded = false;

          _updateLoading(this);

          this._isLoaded = true;

          if (isAppendMode(this)) {
            this.pageIndex(0);
            dataSource.pageIndex(0);
            storeLoadOptions.pageIndex = 0;
            options.pageIndex = 0;
            storeLoadOptions.skip = 0;
          } else {
            dataSource.pageIndex(this.pageIndex());

            if (dataSource.paginate()) {
              options.pageIndex = this.pageIndex();
              storeLoadOptions.skip = this.pageIndex() * this.pageSize();
            }
          }
        } else if (isAppendMode(this) && storeLoadOptions.skip && this._skipCorrection < 0) {
          storeLoadOptions.skip += this._skipCorrection;
        }
      }

      return this.callBase.apply(this, arguments);
    },
    dispose: function dispose() {
      this._virtualScrollController.dispose();

      this.callBase.apply(this, arguments);
    },
    loadPageCount: function loadPageCount(count) {
      if (!(0, _type.isDefined)(count)) {
        return this._loadPageCount;
      }

      this._loadPageCount = count;
    },
    _handleDataLoading: function _handleDataLoading(options) {
      var loadPageCount = this.loadPageCount();
      options.loadPageCount = loadPageCount;

      if (this.option(NEW_SCROLLING_MODE) && loadPageCount > 1) {
        options.storeLoadOptions.take = loadPageCount * this.pageSize();
      }

      this.callBase.apply(this, arguments);
    },
    _loadPageSize: function _loadPageSize() {
      return this.callBase.apply(this, arguments) * this.loadPageCount();
    }
  };
  ['beginPageIndex', 'endPageIndex'].forEach(function (name) {
    result[name] = function () {
      if (this.option(NEW_SCROLLING_MODE)) {
        var dataSource = this._dataSource;
        return dataSource.pageIndex.apply(dataSource, arguments);
      }

      var virtualScrollController = this._virtualScrollController;
      return virtualScrollController[name].apply(virtualScrollController, arguments);
    };
  });
  ['virtualItemsCount', 'getContentOffset', 'getVirtualContentSize', 'setContentItemSizes', 'setViewportPosition', 'getViewportItemIndex', 'setViewportItemIndex', 'getItemIndexByPosition', 'viewportSize', 'viewportItemSize', 'getItemSize', 'getItemSizes', 'pageIndex', 'loadIfNeed'].forEach(function (name) {
    result[name] = function () {
      var virtualScrollController = this._virtualScrollController;
      return virtualScrollController[name].apply(virtualScrollController, arguments);
    };
  });
  return result;
}();

var VirtualScrollingRowsViewExtender = function () {
  var removeEmptyRows = function removeEmptyRows($emptyRows, className) {
    var getRowParent = function getRowParent(row) {
      return (0, _renderer.default)(row).parent('.' + className).get(0);
    };

    var tBodies = $emptyRows.toArray().map(getRowParent).filter(function (row) {
      return row;
    });

    if (tBodies.length) {
      $emptyRows = (0, _renderer.default)(tBodies);
    }

    var rowCount = className === FREESPACE_CLASS ? $emptyRows.length - 1 : $emptyRows.length;

    for (var i = 0; i < rowCount; i++) {
      $emptyRows.eq(i).remove();
    }
  };

  return {
    init: function init() {
      var _this = this,
          _dataController$state;

      var dataController = this.getController('data');
      this.callBase();
      dataController.pageChanged.add(function () {
        _this.scrollToPage(dataController.pageIndex());
      });
      dataController.dataSourceChanged.add(function () {
        !_this._scrollTop && _this._scrollToCurrentPageOnResize();
      });
      (_dataController$state = dataController.stateLoaded) === null || _dataController$state === void 0 ? void 0 : _dataController$state.add(function () {
        _this._scrollToCurrentPageOnResize();
      });

      this._scrollToCurrentPageOnResize();
    },
    _scrollToCurrentPageOnResize: function _scrollToCurrentPageOnResize() {
      var _this2 = this;

      var dataController = this.getController('data');

      if (dataController.pageIndex() > 0) {
        var resizeHandler = function resizeHandler() {
          _this2.resizeCompleted.remove(resizeHandler);

          _this2.scrollToPage(dataController.pageIndex());
        };

        this.resizeCompleted.add(resizeHandler);
      }
    },
    scrollToPage: function scrollToPage(pageIndex) {
      var that = this;
      var dataController = that._dataController;
      var pageSize = dataController ? dataController.pageSize() : 0;
      var scrollPosition;

      if (isVirtualMode(that) || isAppendMode(that)) {
        var itemSize = dataController.getItemSize();
        var itemSizes = dataController.getItemSizes();
        var itemIndex = pageIndex * pageSize;
        scrollPosition = itemIndex * itemSize;

        for (var index in itemSizes) {
          if (index < itemIndex) {
            scrollPosition += itemSizes[index] - itemSize;
          }
        }
      } else {
        scrollPosition = 0;
      }

      that.scrollTo({
        y: scrollPosition,
        x: that._scrollLeft
      });
    },
    renderDelayedTemplates: function renderDelayedTemplates(e) {
      this._updateContentPosition(true);

      this.callBase.apply(this, arguments);
    },
    _renderCore: function _renderCore(e) {
      var that = this;
      var startRenderTime = new Date();
      that.callBase.apply(that, arguments);
      var dataSource = that._dataController._dataSource;

      if (dataSource && e) {
        var itemCount = e.items ? e.items.length : 20;
        var viewportSize = that._dataController.viewportSize() || 20;

        if (isVirtualRowRendering(that) && itemCount > 0) {
          dataSource._renderTime = (new Date() - startRenderTime) * viewportSize / itemCount;
        } else {
          dataSource._renderTime = new Date() - startRenderTime;
        }
      }
    },
    _getRowElements: function _getRowElements(tableElement) {
      var $rows = this.callBase(tableElement);
      return $rows && $rows.not('.' + VIRTUAL_ROW_CLASS);
    },
    _removeRowsElements: function _removeRowsElements(contentTable, removeCount, changeType) {
      var rowElements = this._getRowElements(contentTable).toArray();

      if (changeType === 'append') {
        rowElements = rowElements.slice(0, removeCount);
      } else {
        rowElements = rowElements.slice(-removeCount);
      }

      var errorHandlingController = this.getController('errorHandling');
      rowElements.map(function (rowElement) {
        var $rowElement = (0, _renderer.default)(rowElement);
        errorHandlingController && errorHandlingController.removeErrorRow($rowElement.next());
        $rowElement.remove();
      });
    },
    _restoreErrorRow: function _restoreErrorRow(contentTable) {
      var editingController = this.getController('editing');
      editingController && editingController.hasChanges() && this._getRowElements(contentTable).each(function (_, item) {
        var rowOptions = (0, _renderer.default)(item).data('options');

        if (rowOptions) {
          var change = editingController.getChangeByKey(rowOptions.key);
          change && editingController._showErrorRow(change);
        }
      });
    },
    _updateContent: function _updateContent(tableElement, change) {
      var $freeSpaceRowElements;

      var contentElement = this._findContentElement();

      var changeType = change && change.changeType;

      if (changeType === 'append' || changeType === 'prepend') {
        var contentTable = contentElement.children().first();

        var $tBodies = this._getBodies(tableElement);

        if ($tBodies.length === 1) {
          this._getBodies(contentTable)[changeType === 'append' ? 'append' : 'prepend']($tBodies.children());
        } else {
          $tBodies[changeType === 'append' ? 'appendTo' : 'prependTo'](contentTable);
        }

        tableElement.remove();
        $freeSpaceRowElements = this._getFreeSpaceRowElements(contentTable);
        removeEmptyRows($freeSpaceRowElements, FREESPACE_CLASS);

        if (change.removeCount) {
          this._removeRowsElements(contentTable, change.removeCount, changeType);
        }

        this._restoreErrorRow(contentTable);
      } else {
        this.callBase.apply(this, arguments);
      }

      this._updateBottomLoading();
    },
    _addVirtualRow: function _addVirtualRow($table, isFixed, location, position) {
      if (!position) return;

      var $virtualRow = this._createEmptyRow(VIRTUAL_ROW_CLASS, isFixed, position);

      $virtualRow = this._wrapRowIfNeed($table, $virtualRow);

      this._appendEmptyRow($table, $virtualRow, location);
    },
    _getRowHeights: function _getRowHeights() {
      var rowHeights = this._getRowElements(this._tableElement).toArray().map(function (row) {
        return (0, _position.getBoundingRect)(row).height;
      });

      return rowHeights;
    },
    _correctRowHeights: function _correctRowHeights(rowHeights) {
      var dataController = this._dataController;
      var dataSource = dataController._dataSource;
      var correctedRowHeights = [];
      var visibleRows = dataController.getVisibleRows();
      var itemSize = 0;
      var firstCountableItem = true;

      for (var i = 0; i < rowHeights.length; i++) {
        var currentItem = visibleRows[i];

        if (!(0, _type.isDefined)(currentItem)) {
          continue;
        }

        if (isItemCountableByDataSource(currentItem, dataSource)) {
          if (firstCountableItem) {
            firstCountableItem = false;
          } else {
            correctedRowHeights.push(itemSize);
            itemSize = 0;
          }
        }

        itemSize += rowHeights[i];
      }

      itemSize > 0 && correctedRowHeights.push(itemSize);
      return correctedRowHeights;
    },
    _updateContentPosition: function _updateContentPosition(isRender) {
      var _this3 = this;

      var dataController = this._dataController;
      var rowHeight = this._rowHeight || 20;
      dataController.viewportItemSize(rowHeight);

      if (isVirtualMode(this) || isVirtualRowRendering(this)) {
        if (!isRender) {
          var rowHeights = this._getRowHeights();

          var correctedRowHeights = this._correctRowHeights(rowHeights);

          dataController.setContentItemSizes(correctedRowHeights);
        }

        var top = dataController.getContentOffset('begin');
        var bottom = dataController.getContentOffset('end');
        var $tables = this.getTableElements();
        var $virtualRows = $tables.children('tbody').children('.' + VIRTUAL_ROW_CLASS);
        removeEmptyRows($virtualRows, VIRTUAL_ROW_CLASS);
        $tables.each(function (index, element) {
          var isFixed = index > 0;
          _this3._isFixedTableRendering = isFixed;

          _this3._addVirtualRow((0, _renderer.default)(element), isFixed, 'top', top);

          _this3._addVirtualRow((0, _renderer.default)(element), isFixed, 'bottom', bottom);

          _this3._isFixedTableRendering = false;
        });
      }
    },
    _isTableLinesDisplaysCorrect: function _isTableLinesDisplaysCorrect(table) {
      var hasColumnLines = table.find('.' + COLUMN_LINES_CLASS).length > 0;
      return hasColumnLines === this.option('showColumnLines');
    },
    _isColumnElementsEqual: function _isColumnElementsEqual($columns, $virtualColumns) {
      var result = $columns.length === $virtualColumns.length;

      if (result) {
        (0, _iterator.each)($columns, function (index, element) {
          if (element.style.width !== $virtualColumns[index].style.width) {
            result = false;
            return result;
          }
        });
      }

      return result;
    },
    _renderVirtualTableContent: function _renderVirtualTableContent(container, height) {
      var that = this;

      var columns = that._columnsController.getVisibleColumns();

      var html = that._createColGroup(columns).prop('outerHTML');

      var freeSpaceCellsHtml = '';
      var columnLinesClass = that.option('showColumnLines') ? COLUMN_LINES_CLASS : '';

      var createFreeSpaceRowHtml = function createFreeSpaceRowHtml(height) {
        return '<tr style=\'height:' + height + 'px;\' class=\'' + FREESPACE_CLASS + ' ' + ROW_CLASS + ' ' + columnLinesClass + '\' >' + freeSpaceCellsHtml + '</tr>';
      };

      for (var i = 0; i < columns.length; i++) {
        var classes = that._getCellClasses(columns[i]);

        var classString = classes.length ? ' class=\'' + classes.join(' ') + '\'' : '';
        freeSpaceCellsHtml += '<td' + classString + '/>';
      }

      while (height > PIXELS_LIMIT) {
        html += createFreeSpaceRowHtml(PIXELS_LIMIT);
        height -= PIXELS_LIMIT;
      }

      html += createFreeSpaceRowHtml(height);
      container.addClass(that.addWidgetPrefix(TABLE_CLASS));
      container.html(html);
    },
    _getCellClasses: function _getCellClasses(column) {
      var classes = [];
      var cssClass = column.cssClass;
      var isExpandColumn = column.command === 'expand';
      cssClass && classes.push(cssClass);
      isExpandColumn && classes.push(this.addWidgetPrefix(GROUP_SPACE_CLASS));
      return classes;
    },
    _findBottomLoadPanel: function _findBottomLoadPanel($contentElement) {
      var $element = $contentElement || this.element();
      var $bottomLoadPanel = $element && $element.find('.' + this.addWidgetPrefix(BOTTOM_LOAD_PANEL_CLASS));

      if ($bottomLoadPanel && $bottomLoadPanel.length) {
        return $bottomLoadPanel;
      }
    },
    _updateBottomLoading: function _updateBottomLoading() {
      var that = this;
      var virtualMode = isVirtualMode(this);
      var appendMode = isAppendMode(this);
      var showBottomLoading = !that._dataController.hasKnownLastPage() && that._dataController.isLoaded() && (virtualMode || appendMode);

      var $contentElement = that._findContentElement();

      var bottomLoadPanelElement = that._findBottomLoadPanel($contentElement);

      if (showBottomLoading) {
        if (!bottomLoadPanelElement) {
          (0, _renderer.default)('<div>').addClass(that.addWidgetPrefix(BOTTOM_LOAD_PANEL_CLASS)).append(that._createComponent((0, _renderer.default)('<div>'), _load_indicator.default).$element()).appendTo($contentElement);
        }
      } else if (bottomLoadPanelElement) {
        bottomLoadPanelElement.remove();
      }
    },
    _handleScroll: function _handleScroll(e) {
      var that = this;

      if (that._hasHeight && that._rowHeight) {
        that._dataController.setViewportPosition(e.scrollOffset.top);
      }

      that.callBase.apply(that, arguments);
    },
    _needUpdateRowHeight: function _needUpdateRowHeight(itemsCount) {
      var that = this;
      return that.callBase.apply(that, arguments) || itemsCount > 0 && that.option('scrolling.mode') === SCROLLING_MODE_INFINITE && that.option('scrolling.rowRenderingMode') !== SCROLLING_MODE_VIRTUAL;
    },
    _updateRowHeight: function _updateRowHeight() {
      this.callBase.apply(this, arguments);

      if (this._rowHeight) {
        this._updateContentPosition();

        var viewportHeight = this._hasHeight ? this.element().outerHeight() : (0, _renderer.default)((0, _window.getWindow)()).outerHeight();
        var dataController = this._dataController;
        var itemsCount = dataController.items().length;
        var $tableElement = this.getTableElement();

        var rowsHeight = this._getRowsHeight($tableElement);

        var rowHeight = itemsCount ? rowsHeight / itemsCount : this._rowHeight;
        dataController.viewportSize(Math.ceil(viewportHeight / rowHeight));

        if (this.option(NEW_SCROLLING_MODE) && !(0, _type.isDefined)(dataController._loadViewportParams)) {
          var viewportSize = dataController.viewportSize();
          var viewportIsNotFilled = viewportSize > dataController.items().length && (isAppendMode(this) || dataController.totalItemsCount() > viewportSize);
          viewportIsNotFilled && dataController.loadViewport();
        }
      }
    },
    updateFreeSpaceRowHeight: function updateFreeSpaceRowHeight() {
      var result = this.callBase.apply(this, arguments);

      if (result) {
        this._updateContentPosition();
      }

      return result;
    },
    setLoading: function setLoading(isLoading, messageText) {
      var dataController = this._dataController;
      var hasBottomLoadPanel = dataController.pageIndex() > 0 && dataController.isLoaded() && !!this._findBottomLoadPanel();

      if (this.option(NEW_SCROLLING_MODE) && isLoading && dataController.isViewportChanging()) {
        return;
      }

      if (hasBottomLoadPanel) {
        isLoading = false;
      }

      this.callBase.call(this, isLoading, messageText);
    },
    _resizeCore: function _resizeCore() {
      var that = this;
      var $element = that.element();
      that.callBase();

      if (that.component.$element() && !that._windowScroll && $element.closest((0, _window.getWindow)().document).length) {
        that._windowScroll = (0, _uiGrid_core.subscribeToExternalScrollers)($element, function (scrollPos) {
          if (!that._hasHeight && that._rowHeight) {
            that._dataController.setViewportPosition(scrollPos);
          }
        }, that.component.$element());
        that.on('disposing', function () {
          that._windowScroll.dispose();
        });
      }

      that.loadIfNeed();
    },
    loadIfNeed: function loadIfNeed() {
      var _dataController$loadI;

      var dataController = this._dataController;
      dataController === null || dataController === void 0 ? void 0 : (_dataController$loadI = dataController.loadIfNeed) === null || _dataController$loadI === void 0 ? void 0 : _dataController$loadI.call(dataController);
    },
    setColumnWidths: function setColumnWidths(widths) {
      var scrollable = this.getScrollable();
      var $content;
      this.callBase.apply(this, arguments);

      if (this.option('scrolling.mode') === 'virtual') {
        $content = scrollable ? (0, _renderer.default)(scrollable.content()) : this.element();
        this.callBase(widths, $content.children('.' + this.addWidgetPrefix(CONTENT_CLASS)).children(':not(.' + this.addWidgetPrefix(TABLE_CONTENT_CLASS) + ')'));
      }
    },
    dispose: function dispose() {
      clearTimeout(this._scrollTimeoutID);
      this.callBase();
    }
  };
}();

var virtualScrollingModule = {
  defaultOptions: function defaultOptions() {
    return {
      scrolling: {
        timeout: 300,
        updateTimeout: 300,
        minTimeout: 0,
        renderingThreshold: 100,
        removeInvisiblePages: true,
        rowPageSize: 5,
        mode: 'standard',
        preloadEnabled: false,
        rowRenderingMode: 'standard',
        loadTwoPagesOnStart: false,
        newMode: false,
        minGap: 1
      }
    };
  },
  extenders: {
    dataSourceAdapter: VirtualScrollingDataSourceAdapterExtender,
    controllers: {
      data: function () {
        var members = {
          _refreshDataSource: function _refreshDataSource() {
            var baseResult = this.callBase.apply(this, arguments) || new _deferred.Deferred().resolve().promise();
            baseResult.done(this.initVirtualRows.bind(this));
            return baseResult;
          },
          getRowPageSize: function getRowPageSize() {
            var rowPageSize = this.option('scrolling.rowPageSize');
            var pageSize = this.pageSize();
            return pageSize && pageSize < rowPageSize ? pageSize : rowPageSize;
          },
          reload: function reload() {
            var _this4 = this;

            var rowsScrollController = this._rowsScrollController || this._dataSource;
            var itemIndex = rowsScrollController && rowsScrollController.getItemIndexByPosition();
            var result = this.callBase.apply(this, arguments);
            return result && result.done(function () {
              if (isVirtualMode(_this4) || isVirtualRowRendering(_this4)) {
                var rowIndexOffset = _this4.getRowIndexOffset();

                var rowIndex = Math.floor(itemIndex) - rowIndexOffset;
                var component = _this4.component;
                var scrollable = component.getScrollable && component.getScrollable();

                var isSortingOperation = _this4.dataSource().operationTypes().sorting;

                if (scrollable && !isSortingOperation) {
                  var rowElement = component.getRowElement(rowIndex);
                  var $rowElement = rowElement && rowElement[0] && (0, _renderer.default)(rowElement[0]);
                  var top = $rowElement && $rowElement.position().top;
                  var isChromeLatest = _browser.default.chrome && _browser.default.version >= 91;
                  var allowedTopOffset = _browser.default.mozilla || _browser.default.msie || isChromeLatest ? 1 : 0; // T884308

                  if (top > allowedTopOffset) {
                    top = Math.round(top + $rowElement.outerHeight() * (itemIndex % 1));
                    scrollable.scrollTo({
                      y: top
                    });
                  }
                }
              }
            });
          },
          initVirtualRows: function initVirtualRows() {
            var _this5 = this;

            var virtualRowsRendering = isVirtualRowRendering(this);

            if (this.option('scrolling.mode') !== 'virtual' && virtualRowsRendering !== true || virtualRowsRendering === false || !this.option('scrolling.rowPageSize')) {
              this._visibleItems = null;
              this._rowsScrollController = null;
              return;
            }

            var pageIndex = !isVirtualMode(this) && this.pageIndex() >= this.pageCount() ? this.pageCount() - 1 : this.pageIndex();
            this._rowPageIndex = Math.ceil(pageIndex * this.pageSize() / this.getRowPageSize());
            this._uncountableItemCount = 0;
            this._visibleItems = this.option(NEW_SCROLLING_MODE) ? null : [];
            this._rowsScrollController = new _uiGrid_core.VirtualScrollController(this.component, this._getRowsScrollDataOptions(), true);
            this._viewportChanging = false;

            this._rowsScrollController.positionChanged.add(function () {
              var _this5$_dataSource;

              if (_this5.option(NEW_SCROLLING_MODE)) {
                _this5._viewportChanging = true;

                _this5.loadViewport();

                _this5._viewportChanging = false;
                return;
              }

              (_this5$_dataSource = _this5._dataSource) === null || _this5$_dataSource === void 0 ? void 0 : _this5$_dataSource.setViewportItemIndex(_this5._rowsScrollController.getViewportItemIndex());
            });

            if (this.isLoaded() && !this.option(NEW_SCROLLING_MODE)) {
              this._rowsScrollController.load();
            }
          },
          isViewportChanging: function isViewportChanging() {
            return this._viewportChanging;
          },
          _getRowsScrollDataOptions: function _getRowsScrollDataOptions() {
            var that = this;

            var isItemCountable = function isItemCountable(item) {
              return isItemCountableByDataSource(item, that._dataSource);
            };

            return {
              pageSize: function pageSize() {
                return that.getRowPageSize();
              },
              totalItemsCount: function totalItemsCount() {
                if (that.option(NEW_SCROLLING_MODE)) {
                  return that.totalItemsCount() + that._uncountableItemCount;
                }

                return isVirtualMode(that) ? that.totalItemsCount() : that._items.filter(isItemCountable).length;
              },
              hasKnownLastPage: function hasKnownLastPage() {
                return true;
              },
              pageIndex: function pageIndex(index) {
                if (index !== undefined) {
                  that._rowPageIndex = index;
                }

                return that._rowPageIndex;
              },
              isLoading: function isLoading() {
                return that.isLoading();
              },
              pageCount: function pageCount() {
                var pageCount = Math.ceil(this.totalItemsCount() / this.pageSize());
                return pageCount ? pageCount : 1;
              },
              load: function load() {
                if (that._rowsScrollController.pageIndex() >= this.pageCount()) {
                  that._rowPageIndex = this.pageCount() - 1;

                  that._rowsScrollController.pageIndex(that._rowPageIndex);
                }

                if (!this.items().length && this.totalItemsCount()) return;

                that._rowsScrollController.handleDataChanged(function (change) {
                  change = change || {};
                  change.changeType = change.changeType || 'refresh';
                  change.items = change.items || that._visibleItems;

                  that._visibleItems.forEach(function (item, index) {
                    item.rowIndex = index;
                  });

                  that._fireChanged(change);
                });
              },
              updateLoading: function updateLoading() {},
              itemsCount: function itemsCount() {
                return this.items().filter(isItemCountable).length;
              },
              correctCount: function correctCount(items, count, fromEnd) {
                return _correctCount(items, count, fromEnd, function (item, isNextAfterLast, fromEnd) {
                  if (item.isNewRow) {
                    return isNextAfterLast && !fromEnd;
                  }

                  if (isNextAfterLast && fromEnd) {
                    return !item.isNewRow;
                  }

                  return isItemCountable(item);
                });
              },
              items: function items(countableOnly) {
                var dataSource = that.dataSource();
                var virtualItemsCount = dataSource && dataSource.virtualItemsCount();
                var begin = virtualItemsCount ? virtualItemsCount.begin : 0;
                var rowPageSize = that.getRowPageSize();
                var skip = that._rowPageIndex * rowPageSize - begin;
                var take = rowPageSize;
                var result = that._items;

                if (skip < 0) {
                  return [];
                }

                if (skip) {
                  skip = this.correctCount(result, skip);
                  result = result.slice(skip);
                }

                if (take) {
                  take = this.correctCount(result, take);
                  result = result.slice(0, take);
                }

                return countableOnly ? result.filter(isItemCountable) : result;
              },
              viewportItems: function viewportItems(items) {
                if (items && !that.option(NEW_SCROLLING_MODE)) {
                  that._visibleItems = items;
                }

                return that._visibleItems;
              },
              onChanged: function onChanged() {},
              changingDuration: function changingDuration(e) {
                var dataSource = that.dataSource();

                if (dataSource.isLoading() && !that.option(NEW_SCROLLING_MODE)) {
                  return LOAD_TIMEOUT;
                }

                return (dataSource === null || dataSource === void 0 ? void 0 : dataSource._renderTime) || 0;
              }
            };
          },
          _updateItemsCore: function _updateItemsCore(change) {
            var _this6 = this;

            var delta = this.getRowIndexDelta();
            this.callBase.apply(this, arguments);

            if (this.option(NEW_SCROLLING_MODE) && isVirtualRowRendering(this)) {
              return;
            }

            var rowsScrollController = this._rowsScrollController;

            if (rowsScrollController) {
              var visibleItems = this._visibleItems;
              var isRefresh = change.changeType === 'refresh' || change.isLiveUpdate;
              if (change.changeType === 'append' && change.items && !change.items.length) return;

              if (isRefresh || change.changeType === 'append' || change.changeType === 'prepend') {
                change.cancel = true;
                isRefresh && rowsScrollController.reset(true);
                rowsScrollController.load();
              } else {
                if (change.changeType === 'update') {
                  change.rowIndices.forEach(function (rowIndex, index) {
                    var changeType = change.changeTypes[index];
                    var newItem = change.items[index];

                    if (changeType === 'update') {
                      visibleItems[rowIndex] = newItem;
                    } else if (changeType === 'insert') {
                      visibleItems.splice(rowIndex, 0, newItem);
                    } else if (changeType === 'remove') {
                      visibleItems.splice(rowIndex, 1);
                    }
                  });
                } else {
                  visibleItems.forEach(function (item, index) {
                    visibleItems[index] = _this6._items[index + delta] || visibleItems[index];
                  });
                  change.items = visibleItems;
                }

                updateItemIndices(visibleItems);
              }
            }
          },
          _updateLoadViewportParams: function _updateLoadViewportParams() {
            this._loadViewportParams = this._rowsScrollController.getViewportParams();
          },
          _afterProcessItems: function _afterProcessItems(items, change) {
            var _this7 = this;

            this._uncountableItemCount = 0;

            if ((0, _type.isDefined)(this._loadViewportParams)) {
              this._uncountableItemCount = items.filter(function (item) {
                return !isItemCountableByDataSource(item, _this7._dataSource);
              }).length;

              this._updateLoadViewportParams();

              var _this$getLoadPagePara = this.getLoadPageParams(),
                  skipForCurrentPage = _this$getLoadPagePara.skipForCurrentPage;

              change.repaintChangesOnly = change.changeType === 'refresh';
              return items.slice(skipForCurrentPage, skipForCurrentPage + this._loadViewportParams.take);
            }

            return this.callBase.apply(this, arguments);
          },
          _applyChange: function _applyChange(change) {
            var that = this;
            var items = change.items;
            var changeType = change.changeType;
            var removeCount = change.removeCount;

            if (removeCount) {
              var fromEnd = changeType === 'prepend';
              removeCount = _correctCount(that._items, removeCount, fromEnd, function (item, isNextAfterLast) {
                return item.rowType === 'data' && !item.isNewRow || item.rowType === 'group' && (that._dataSource.isGroupItemCountable(item.data) || isNextAfterLast);
              });
              change.removeCount = removeCount;
            }

            switch (changeType) {
              case 'prepend':
                that._items.unshift.apply(that._items, items);

                if (removeCount) {
                  that._items.splice(-removeCount);
                }

                break;

              case 'append':
                that._items.push.apply(that._items, items);

                if (removeCount) {
                  that._items.splice(0, removeCount);
                }

                break;

              default:
                that.callBase(change);
                break;
            }
          },
          items: function items(allItems) {
            return allItems ? this._items : this._visibleItems || this._items;
          },
          getRowIndexDelta: function getRowIndexDelta() {
            var visibleItems = this._visibleItems;
            var delta = 0;

            if (visibleItems && visibleItems[0]) {
              delta = this._items.indexOf(visibleItems[0]);
            }

            return delta < 0 ? 0 : delta;
          },
          getRowIndexOffset: function getRowIndexOffset(byLoadedRows) {
            var offset = 0;
            var dataSource = this.dataSource();
            var rowsScrollController = this._rowsScrollController;
            var virtualMode = isVirtualMode(this);
            var appendMode = isAppendMode(this);
            var newMode = this.option(NEW_SCROLLING_MODE);

            if (rowsScrollController && !byLoadedRows) {
              if (this.option(NEW_SCROLLING_MODE) && (0, _type.isDefined)(this._loadViewportParams)) {
                var _this$getLoadPagePara2 = this.getLoadPageParams(),
                    skipForCurrentPage = _this$getLoadPagePara2.skipForCurrentPage,
                    pageIndex = _this$getLoadPagePara2.pageIndex;

                offset = pageIndex * this.pageSize() + skipForCurrentPage;
              } else {
                offset = rowsScrollController.beginPageIndex() * rowsScrollController.pageSize();
              }
            } else if ((virtualMode || appendMode && newMode) && dataSource) {
              offset = dataSource.beginPageIndex() * dataSource.pageSize();
            }

            return offset;
          },
          viewportSize: function viewportSize() {
            var rowsScrollController = this._rowsScrollController;
            var dataSource = this._dataSource;
            var result = rowsScrollController === null || rowsScrollController === void 0 ? void 0 : rowsScrollController.viewportSize.apply(rowsScrollController, arguments);

            if (this.option(NEW_SCROLLING_MODE)) {
              return result;
            }

            return dataSource === null || dataSource === void 0 ? void 0 : dataSource.viewportSize.apply(dataSource, arguments);
          },
          viewportItemSize: function viewportItemSize() {
            var rowsScrollController = this._rowsScrollController;
            var dataSource = this._dataSource;
            var result = rowsScrollController === null || rowsScrollController === void 0 ? void 0 : rowsScrollController.viewportItemSize.apply(rowsScrollController, arguments);

            if (this.option(NEW_SCROLLING_MODE)) {
              return result;
            }

            return dataSource === null || dataSource === void 0 ? void 0 : dataSource.viewportItemSize.apply(dataSource, arguments);
          },
          setViewportPosition: function setViewportPosition() {
            var rowsScrollController = this._rowsScrollController;
            var dataSource = this._dataSource;

            if (rowsScrollController) {
              rowsScrollController.setViewportPosition.apply(rowsScrollController, arguments);
            } else {
              dataSource === null || dataSource === void 0 ? void 0 : dataSource.setViewportPosition.apply(dataSource, arguments);
            }
          },
          setContentItemSizes: function setContentItemSizes(sizes) {
            var rowsScrollController = this._rowsScrollController;
            var dataSource = this._dataSource;
            var result = rowsScrollController === null || rowsScrollController === void 0 ? void 0 : rowsScrollController.setContentItemSizes(sizes);

            if (this.option(NEW_SCROLLING_MODE)) {
              return result;
            }

            return dataSource === null || dataSource === void 0 ? void 0 : dataSource.setContentItemSizes(sizes);
          },
          getLoadPageParams: function getLoadPageParams() {
            var viewportParams = this._loadViewportParams;
            var pageIndex = Math.floor(viewportParams.skip / this.pageSize());
            var skipForCurrentPage = viewportParams.skip - pageIndex * this.pageSize();
            var loadPageCount = Math.ceil((skipForCurrentPage + viewportParams.take) / this.pageSize());
            return {
              pageIndex: pageIndex,
              loadPageCount: loadPageCount,
              skipForCurrentPage: skipForCurrentPage
            };
          },
          loadViewport: function loadViewport() {
            if (isVirtualMode(this) || isAppendMode(this)) {
              this._updateLoadViewportParams();

              var _this$getLoadPagePara3 = this.getLoadPageParams(),
                  pageIndex = _this$getLoadPagePara3.pageIndex,
                  loadPageCount = _this$getLoadPagePara3.loadPageCount;

              var dataSourceAdapter = this._dataSource;

              if (pageIndex !== dataSourceAdapter.pageIndex() || loadPageCount !== dataSourceAdapter.loadPageCount()) {
                dataSourceAdapter.pageIndex(pageIndex);
                dataSourceAdapter.loadPageCount(loadPageCount);
                this.load();
              } else if (!this._isLoading) {
                this.updateItems();
              }
            }
          },
          loadIfNeed: function loadIfNeed() {
            if (this.option(NEW_SCROLLING_MODE)) {
              return;
            }

            var rowsScrollController = this._rowsScrollController;
            rowsScrollController && rowsScrollController.loadIfNeed();
            var dataSource = this._dataSource;
            return dataSource && dataSource.loadIfNeed();
          },
          getItemSize: function getItemSize() {
            var rowsScrollController = this._rowsScrollController;

            if (rowsScrollController) {
              return rowsScrollController.getItemSize.apply(rowsScrollController, arguments);
            }

            var dataSource = this._dataSource;
            return dataSource && dataSource.getItemSize.apply(dataSource, arguments);
          },
          getItemSizes: function getItemSizes() {
            var rowsScrollController = this._rowsScrollController;

            if (rowsScrollController) {
              return rowsScrollController.getItemSizes.apply(rowsScrollController, arguments);
            }

            var dataSource = this._dataSource;
            return dataSource && dataSource.getItemSizes.apply(dataSource, arguments);
          },
          getContentOffset: function getContentOffset() {
            var rowsScrollController = this._rowsScrollController;

            if (rowsScrollController) {
              return rowsScrollController.getContentOffset.apply(rowsScrollController, arguments);
            }

            var dataSource = this._dataSource;
            return dataSource && dataSource.getContentOffset.apply(dataSource, arguments);
          },
          refresh: function refresh(options) {
            var dataSource = this._dataSource;

            if (dataSource && options && options.load && isAppendMode(this)) {
              dataSource.resetCurrentTotalCount();
            }

            return this.callBase.apply(this, arguments);
          },
          dispose: function dispose() {
            var rowsScrollController = this._rowsScrollController;
            rowsScrollController && rowsScrollController.dispose();
            this.callBase.apply(this, arguments);
          },
          topItemIndex: function topItemIndex() {
            var _this$_loadViewportPa;

            return (_this$_loadViewportPa = this._loadViewportParams) === null || _this$_loadViewportPa === void 0 ? void 0 : _this$_loadViewportPa.skip;
          },
          bottomItemIndex: function bottomItemIndex() {
            var viewportParams = this._loadViewportParams;
            return viewportParams && viewportParams.skip + viewportParams.take;
          },
          virtualItemsCount: function virtualItemsCount() {
            var rowsScrollController = this._rowsScrollController;

            if (rowsScrollController) {
              return rowsScrollController.virtualItemsCount.apply(rowsScrollController, arguments);
            }

            var dataSource = this._dataSource;
            return dataSource === null || dataSource === void 0 ? void 0 : dataSource.virtualItemsCount.apply(dataSource, arguments);
          }
        };

        _uiGrid_core2.default.proxyMethod(members, 'getVirtualContentSize');

        _uiGrid_core2.default.proxyMethod(members, 'setViewportItemIndex');

        return members;
      }(),
      resizing: {
        resize: function resize() {
          var that = this;
          var callBase = that.callBase;
          var result;

          if (isVirtualMode(that) || isVirtualRowRendering(that)) {
            clearTimeout(that._resizeTimeout);
            var diff = new Date() - that._lastTime;
            var updateTimeout = that.option('scrolling.updateTimeout');

            if (that._lastTime && diff < updateTimeout) {
              result = new _deferred.Deferred();
              that._resizeTimeout = setTimeout(function () {
                callBase.apply(that).done(result.resolve).fail(result.reject);
                that._lastTime = new Date();
              }, updateTimeout);
              that._lastTime = new Date();
            } else {
              result = callBase.apply(that);

              if (that._dataController.isLoaded()) {
                that._lastTime = new Date();
              }
            }
          } else {
            result = callBase.apply(that);
          }

          return result;
        },
        dispose: function dispose() {
          this.callBase.apply(this, arguments);
          clearTimeout(this._resizeTimeout);
        }
      }
    },
    views: {
      rowsView: VirtualScrollingRowsViewExtender
    }
  }
};
exports.virtualScrollingModule = virtualScrollingModule;
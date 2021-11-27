import $ from '../../core/renderer';
import { getWindow, hasWindow } from '../../core/utils/window';
var window = getWindow();
import coreBrowserUtils from '../../core/utils/browser';
import eventsEngine from '../../events/core/events_engine';
import registerComponent from '../../core/component_registrator';
import { getPublicElement } from '../../core/element';
import { format as formatString } from '../../core/utils/string';
import { noop, deferRender, deferUpdate } from '../../core/utils/common';
import { each } from '../../core/utils/iterator';
import { isDefined } from '../../core/utils/type';
import { extend } from '../../core/utils/extend';
import { name as clickEventName } from '../../events/click';
import localizationMessage from '../../localization/message';
import Widget from '../widget/ui.widget';
import { addNamespace } from '../../events/utils/index';
import gridCoreUtils from '../grid_core/ui.grid_core.utils';
import { setFieldProperty, findField, mergeArraysByMaxValue } from './ui.pivot_grid.utils';
import { DataController } from './ui.pivot_grid.data_controller';
import { DataArea } from './ui.pivot_grid.data_area';
import { VerticalHeadersArea, HorizontalHeadersArea } from './ui.pivot_grid.headers_area';
import { getSize } from '../../core/utils/size';
import { FieldsArea } from './ui.pivot_grid.fields_area';
import PivotGridFieldChooser from './ui.pivot_grid.field_chooser';
import PivotGridFieldChooserBase from './ui.pivot_grid.field_chooser_base';
import { ExportController } from './ui.pivot_grid.export';
import chartIntegrationMixin from './ui.pivot_grid.chart_integration';
import Popup from '../popup';
import ContextMenu from '../context_menu';
import { when, Deferred } from '../../core/utils/deferred'; // STYLE pivotGrid

var DATA_AREA_CELL_CLASS = 'dx-area-data-cell';
var ROW_AREA_CELL_CLASS = 'dx-area-row-cell';
var COLUMN_AREA_CELL_CLASS = 'dx-area-column-cell';
var DESCRIPTION_AREA_CELL_CLASS = 'dx-area-description-cell';
var BORDERS_CLASS = 'dx-pivotgrid-border';
var PIVOTGRID_CLASS = 'dx-pivotgrid';
var ROW_LINES_CLASS = 'dx-row-lines';
var BOTTOM_ROW_CLASS = 'dx-bottom-row';
var BOTTOM_BORDER_CLASS = 'dx-bottom-border';
var FIELDS_CONTAINER_CLASS = 'dx-pivotgrid-fields-container';
var FIELDS_CLASS = 'dx-area-fields';
var FIELD_CHOOSER_POPUP_CLASS = 'dx-fieldchooser-popup';
var INCOMPRESSIBLE_FIELDS_CLASS = 'dx-incompressible-fields';
var OVERFLOW_HIDDEN_CLASS = 'dx-overflow-hidden';
var TR = '<tr>';
var TD = '<td>';
var DIV = '<div>';
var TEST_HEIGHT = 66666;
var FIELD_CALCULATED_OPTIONS = ['allowSorting', 'allowSortingBySummary', 'allowFiltering', 'allowExpandAll'];

function getArraySum(array) {
  var sum = 0;
  each(array, function (_, value) {
    sum += value || 0;
  });
  return sum;
}

function adjustSizeArray(sizeArray, space) {
  var delta = space / sizeArray.length;

  for (var i = 0; i < sizeArray.length; i++) {
    sizeArray[i] -= delta;
  }
}

function unsubscribeScrollEvents(area) {
  area.off('scroll').off('stop');
}

function subscribeToScrollEvent(area, handler) {
  unsubscribeScrollEvents(area);
  area.on('scroll', handler).on('stop', handler);
}

function getCommonBorderWidth(elements, direction) {
  var borderStyleNames = direction === 'width' ? ['borderLeftWidth', 'borderRightWidth'] : ['borderTopWidth', 'borderBottomWidth'];
  var width = 0;
  each(elements, function (_, elem) {
    var computedStyle = window.getComputedStyle(elem.get(0));
    borderStyleNames.forEach(function (borderStyleName) {
      width += parseFloat(computedStyle[borderStyleName]) || 0;
    });
  });
  return width;
}

function clickedOnFieldsArea($targetElement) {
  return $targetElement.closest('.' + FIELDS_CLASS).length || $targetElement.find('.' + FIELDS_CLASS).length;
}
/**
* @name dxPivotGridOptions.activeStateEnabled
* @hidden
*/

/**
* @name dxPivotGridOptions.hoverStateEnabled
* @hidden
*/

/**
* @name dxPivotGridOptions.focusStateEnabled
* @hidden
*/

/**
* @name dxPivotGridOptions.accessKey
* @hidden
*/

/**
* @name dxPivotGrid.registerKeyHandler
* @publicName registerKeyHandler(key, handler)
* @hidden
*/


var PivotGrid = Widget.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
      scrolling: {
        timeout: 300,
        renderingThreshold: 150,
        minTimeout: 10,
        mode: 'standard',
        useNative: 'auto',
        removeInvisiblePages: true,
        virtualRowHeight: 50,
        virtualColumnWidth: 100,
        loadTwoPagesOnStart: true
      },
      encodeHtml: true,
      dataSource: null,
      activeStateEnabled: false,
      fieldChooser: {
        minWidth: 250,
        minHeight: 250,
        enabled: true,
        allowSearch: false,
        searchTimeout: 500,
        layout: 0,
        title: localizationMessage.format('dxPivotGrid-fieldChooserTitle'),
        width: 600,
        height: 600,
        applyChangesMode: 'instantly'
      },
      onContextMenuPreparing: null,
      allowSorting: false,
      allowSortingBySummary: false,
      allowFiltering: false,
      allowExpandAll: false,
      wordWrapEnabled: true,
      fieldPanel: {
        showColumnFields: true,
        showFilterFields: true,
        showDataFields: true,
        showRowFields: true,
        allowFieldDragging: true,
        visible: false,
        texts: {
          columnFieldArea: localizationMessage.format('dxPivotGrid-columnFieldArea'),
          rowFieldArea: localizationMessage.format('dxPivotGrid-rowFieldArea'),
          filterFieldArea: localizationMessage.format('dxPivotGrid-filterFieldArea'),
          dataFieldArea: localizationMessage.format('dxPivotGrid-dataFieldArea')
        }
      },
      dataFieldArea: 'column',
      'export': {
        enabled: false,
        fileName: 'PivotGrid',
        proxyUrl: undefined,
        ignoreExcelErrors: true
      },
      showRowTotals: true,
      showRowGrandTotals: true,
      showColumnTotals: true,
      showColumnGrandTotals: true,
      hideEmptySummaryCells: true,
      showTotalsPrior: 'none',
      rowHeaderLayout: 'standard',
      loadPanel: {
        enabled: true,
        text: localizationMessage.format('Loading'),
        width: 200,
        height: 70,
        showIndicator: true,
        indicatorSrc: '',
        showPane: true
      },
      texts: {
        grandTotal: localizationMessage.format('dxPivotGrid-grandTotal'),
        total: localizationMessage.getFormatter('dxPivotGrid-total'),
        noData: localizationMessage.format('dxDataGrid-noDataText'),
        showFieldChooser: localizationMessage.format('dxPivotGrid-showFieldChooser'),
        expandAll: localizationMessage.format('dxPivotGrid-expandAll'),
        collapseAll: localizationMessage.format('dxPivotGrid-collapseAll'),
        sortColumnBySummary: localizationMessage.getFormatter('dxPivotGrid-sortColumnBySummary'),
        sortRowBySummary: localizationMessage.getFormatter('dxPivotGrid-sortRowBySummary'),
        removeAllSorting: localizationMessage.format('dxPivotGrid-removeAllSorting'),
        exportToExcel: localizationMessage.format('dxDataGrid-exportToExcel'),
        dataNotAvailable: localizationMessage.format('dxPivotGrid-dataNotAvailable')
      },
      onCellClick: null,
      onCellPrepared: null,
      showBorders: false,
      stateStoring: {
        enabled: false,
        storageKey: null,
        type: 'localStorage',
        customLoad: null,
        customSave: null,
        savingTimeout: 2000
      },
      onExpandValueChanging: null,
      renderCellCountLimit: 20000,
      onExporting: null,
      onExported: null,
      onFileSaving: null,
      headerFilter: {
        width: 252,
        height: 325,
        allowSearch: false,
        showRelevantValues: false,
        searchTimeout: 500,
        texts: {
          emptyValue: localizationMessage.format('dxDataGrid-headerFilterEmptyValue'),
          ok: localizationMessage.format('dxDataGrid-headerFilterOK'),
          cancel: localizationMessage.format('dxDataGrid-headerFilterCancel')
        }
      }
    });
  },
  _updateCalculatedOptions: function _updateCalculatedOptions(fields) {
    var that = this;
    each(fields, function (index, field) {
      each(FIELD_CALCULATED_OPTIONS, function (_, optionName) {
        var isCalculated = field._initProperties && optionName in field._initProperties && field._initProperties[optionName] === undefined;
        var needUpdate = field[optionName] === undefined || isCalculated;

        if (needUpdate) {
          setFieldProperty(field, optionName, that.option(optionName));
        }
      });
    });
  },
  _getDataControllerOptions: function _getDataControllerOptions() {
    var that = this;
    return {
      component: that,
      dataSource: that.option('dataSource'),
      texts: that.option('texts'),
      showRowTotals: that.option('showRowTotals'),
      showRowGrandTotals: that.option('showRowGrandTotals'),
      showColumnTotals: that.option('showColumnTotals'),
      showTotalsPrior: that.option('showTotalsPrior'),
      showColumnGrandTotals: that.option('showColumnGrandTotals'),
      dataFieldArea: that.option('dataFieldArea'),
      rowHeaderLayout: that.option('rowHeaderLayout'),
      hideEmptySummaryCells: that.option('hideEmptySummaryCells'),
      onFieldsPrepared: function onFieldsPrepared(fields) {
        that._updateCalculatedOptions(fields);
      }
    };
  },
  _initDataController: function _initDataController() {
    var that = this;
    that._dataController && that._dataController.dispose();
    that._dataController = new DataController(that._getDataControllerOptions());

    if (hasWindow()) {
      that._dataController.changed.add(function () {
        that._render();
      });
    }

    that._dataController.scrollChanged.add(function (options) {
      that._scrollLeft = options.left;
      that._scrollTop = options.top;
    });

    that._dataController.loadingChanged.add(function (isLoading) {
      that._updateLoading();
    });

    that._dataController.progressChanged.add(that._updateLoading.bind(that));

    that._dataController.dataSourceChanged.add(function () {
      that._trigger('onChanged');
    });

    var expandValueChanging = that.option('onExpandValueChanging');

    if (expandValueChanging) {
      that._dataController.expandValueChanging.add(function (e) {
        expandValueChanging(e);
      });
    }
  },
  _init: function _init() {
    var that = this;
    that.callBase();

    that._initDataController();

    that._scrollLeft = that._scrollTop = null;

    that._initActions();
  },
  _initActions: function _initActions() {
    var that = this;
    that._actions = {
      onChanged: that._createActionByOption('onChanged'),
      onContextMenuPreparing: that._createActionByOption('onContextMenuPreparing'),
      onCellClick: that._createActionByOption('onCellClick'),
      onExporting: that._createActionByOption('onExporting'),
      onExported: that._createActionByOption('onExported'),
      onFileSaving: that._createActionByOption('onFileSaving'),
      onCellPrepared: that._createActionByOption('onCellPrepared')
    };
  },
  _trigger: function _trigger(eventName, eventArg) {
    this._actions[eventName](eventArg);
  },
  _optionChanged: function _optionChanged(args) {
    var that = this;

    if (FIELD_CALCULATED_OPTIONS.indexOf(args.name) >= 0) {
      var fields = this.getDataSource().fields();

      this._updateCalculatedOptions(fields);
    }

    switch (args.name) {
      case 'dataSource':
      case 'allowSorting':
      case 'allowFiltering':
      case 'allowExpandAll':
      case 'allowSortingBySummary':
      case 'scrolling':
      case 'stateStoring':
        that._initDataController();

        that._fieldChooserPopup.hide();

        that._renderFieldChooser();

        that._invalidate();

        break;

      case 'texts':
      case 'showTotalsPrior':
      case 'showRowTotals':
      case 'showRowGrandTotals':
      case 'showColumnTotals':
      case 'showColumnGrandTotals':
      case 'hideEmptySummaryCells':
      case 'dataFieldArea':
        that._dataController.updateViewOptions(that._getDataControllerOptions());

        break;

      case 'useNativeScrolling':
      case 'encodeHtml':
      case 'renderCellCountLimit':
        break;

      case 'rtlEnabled':
        that.callBase(args);

        that._renderFieldChooser();

        that._renderContextMenu();

        hasWindow() && that._renderLoadPanel(that._dataArea.groupElement(), that.$element());

        that._invalidate();

        break;

      case 'export':
        that._renderDescriptionArea();

        break;

      case 'onExpandValueChanging':
        break;

      case 'onCellClick':
      case 'onContextMenuPreparing':
      case 'onExporting':
      case 'onExported':
      case 'onFileSaving':
      case 'onCellPrepared':
        that._actions[args.name] = that._createActionByOption(args.name);
        break;

      case 'fieldChooser':
        that._renderFieldChooser();

        that._renderDescriptionArea();

        break;

      case 'loadPanel':
        if (hasWindow()) {
          if (args.fullName === 'loadPanel.enabled') {
            clearTimeout(this._hideLoadingTimeoutID);

            that._renderLoadPanel(that._dataArea.groupElement(), that.$element());
          } else {
            that._renderLoadPanel(that._dataArea.groupElement(), that.$element());

            that._invalidate();
          }
        }

        break;

      case 'fieldPanel':
        that._renderDescriptionArea();

        that._invalidate();

        break;

      case 'headerFilter':
        that._renderFieldChooser();

        that._invalidate();

        break;

      case 'showBorders':
        that._tableElement().toggleClass(BORDERS_CLASS, !!args.value);

        that.updateDimensions();
        break;

      case 'wordWrapEnabled':
        that._tableElement().toggleClass('dx-word-wrap', !!args.value);

        that.updateDimensions();
        break;

      case 'rowHeaderLayout':
        that._tableElement().find('.' + ROW_AREA_CELL_CLASS).toggleClass('dx-area-tree-view', args.value === 'tree');

        that._dataController.updateViewOptions(that._getDataControllerOptions());

        break;

      case 'height':
      case 'width':
        that._hasHeight = null;
        that.callBase(args);
        that.resize();
        break;

      default:
        that.callBase(args);
    }
  },
  _updateScrollPosition: function _updateScrollPosition(columnsArea, rowsArea, dataArea) {
    var that = this;
    var scrollTop;
    var scrollLeft;
    var scrolled = that._scrollTop || that._scrollLeft;
    if (that._scrollUpdating) return; // T645458

    that._scrollUpdating = true;

    if (rowsArea && !rowsArea.hasScroll() && that._hasHeight) {
      that._scrollTop = null;
    }

    if (columnsArea && !columnsArea.hasScroll()) {
      that._scrollLeft = null;
    }

    if (that._scrollTop !== null || that._scrollLeft !== null || scrolled || that.option('rtlEnabled')) {
      scrollTop = that._scrollTop || 0;
      scrollLeft = that._scrollLeft || 0;
      dataArea.scrollTo({
        x: scrollLeft,
        y: scrollTop
      });
      columnsArea.scrollTo(scrollLeft);
      rowsArea.scrollTo(scrollTop);

      that._dataController.updateWindowScrollPosition(that._scrollTop);
    }

    that._scrollUpdating = false;
  },
  _subscribeToEvents: function _subscribeToEvents(columnsArea, rowsArea, dataArea) {
    var that = this;

    var scrollHandler = function scrollHandler(e) {
      var scrollOffset = e.scrollOffset;
      var leftOffset = isDefined(scrollOffset.left) ? scrollOffset.left : that._scrollLeft;
      var topOffset = isDefined(scrollOffset.top) && that._hasHeight ? scrollOffset.top : that._scrollTop;

      if ((that._scrollLeft || 0) !== (leftOffset || 0) || (that._scrollTop || 0) !== (topOffset || 0)) {
        that._scrollLeft = leftOffset;
        that._scrollTop = topOffset;

        that._updateScrollPosition(columnsArea, rowsArea, dataArea);

        if (that.option('scrolling.mode') === 'virtual') {
          that._dataController.setViewportPosition(that._scrollLeft, that._scrollTop);
        }
      }
    };

    each([columnsArea, rowsArea, dataArea], function (_, area) {
      subscribeToScrollEvent(area, scrollHandler);
    });
    !that._hasHeight && that._dataController.subscribeToWindowScrollEvents(dataArea.groupElement());
  },
  _clean: noop,
  _needDelayResizing: function _needDelayResizing(cellsInfo) {
    var cellsCount = cellsInfo.length * (cellsInfo.length ? cellsInfo[0].length : 0);
    return cellsCount > this.option('renderCellCountLimit');
  },
  _renderFieldChooser: function _renderFieldChooser() {
    var that = this;
    var container = that._pivotGridContainer;
    var fieldChooserOptions = that.option('fieldChooser') || {};
    var toolbarItems = fieldChooserOptions.applyChangesMode === 'onDemand' ? [{
      toolbar: 'bottom',
      location: 'after',
      widget: 'dxButton',
      options: {
        text: localizationMessage.format('OK'),
        onClick: function onClick(e) {
          that._fieldChooserPopup.$content().dxPivotGridFieldChooser('applyChanges');

          that._fieldChooserPopup.hide();
        }
      }
    }, {
      toolbar: 'bottom',
      location: 'after',
      widget: 'dxButton',
      options: {
        text: localizationMessage.format('Cancel'),
        onClick: function onClick(e) {
          that._fieldChooserPopup.hide();
        }
      }
    }] : [];
    var fieldChooserComponentOptions = {
      layout: fieldChooserOptions.layout,
      texts: fieldChooserOptions.texts || {},
      dataSource: that.getDataSource(),
      allowSearch: fieldChooserOptions.allowSearch,
      searchTimeout: fieldChooserOptions.searchTimeout,
      width: undefined,
      height: undefined,
      headerFilter: that.option('headerFilter'),
      encodeHtml: that.option('encodeHtml'),
      applyChangesMode: fieldChooserOptions.applyChangesMode,
      onContextMenuPreparing: function onContextMenuPreparing(e) {
        that._trigger('onContextMenuPreparing', e);
      }
    };
    var popupOptions = {
      shading: false,
      title: fieldChooserOptions.title,
      width: fieldChooserOptions.width,
      height: fieldChooserOptions.height,
      showCloseButton: true,
      resizeEnabled: true,
      minWidth: fieldChooserOptions.minWidth,
      minHeight: fieldChooserOptions.minHeight,
      toolbarItems: toolbarItems,
      onResize: function onResize(e) {
        e.component.$content().dxPivotGridFieldChooser('updateDimensions');
      },
      onShown: function onShown(e) {
        that._createComponent(e.component.content(), PivotGridFieldChooser, fieldChooserComponentOptions);
      },
      onHidden: function onHidden(e) {
        var fieldChooser = e.component.$content().dxPivotGridFieldChooser('instance');
        fieldChooser.resetTreeView();
        fieldChooser.cancelChanges();
      }
    };

    if (that._fieldChooserPopup) {
      that._fieldChooserPopup.option(popupOptions);

      that._fieldChooserPopup.$content().dxPivotGridFieldChooser(fieldChooserComponentOptions);
    } else {
      that._fieldChooserPopup = that._createComponent($(DIV).addClass(FIELD_CHOOSER_POPUP_CLASS).appendTo(container), Popup, popupOptions);
    }
  },
  _renderContextMenu: function _renderContextMenu() {
    var that = this;
    var $container = that._pivotGridContainer;

    if (that._contextMenu) {
      that._contextMenu.$element().remove();
    }

    that._contextMenu = that._createComponent($(DIV).appendTo($container), ContextMenu, {
      onPositioning: function onPositioning(actionArgs) {
        var event = actionArgs.event;
        actionArgs.cancel = true;

        if (!event) {
          return;
        }

        var targetElement = event.target.cellIndex >= 0 ? event.target : $(event.target).closest('td').get(0);

        if (!targetElement) {
          return;
        }

        var args = that._createEventArgs(targetElement, event);

        var items = that._getContextMenuItems(args);

        if (items) {
          actionArgs.component.option('items', items);
          actionArgs.cancel = false;
          return;
        }
      },
      onItemClick: function onItemClick(params) {
        params.itemData.onItemClick && params.itemData.onItemClick(params);
      },
      cssClass: PIVOTGRID_CLASS,
      target: that.$element()
    });
  },
  _getContextMenuItems: function _getContextMenuItems(e) {
    var that = this;
    var items = [];
    var texts = that.option('texts');

    if (e.area === 'row' || e.area === 'column') {
      var areaFields = e[e.area + 'Fields'];
      var oppositeAreaFields = e[e.area === 'column' ? 'rowFields' : 'columnFields'];
      var field = e.cell.path && areaFields[e.cell.path.length - 1];
      var dataSource = that.getDataSource();

      if (field && field.allowExpandAll && e.cell.path.length < e[e.area + 'Fields'].length && !dataSource.paginate()) {
        items.push({
          beginGroup: true,
          icon: 'none',
          text: texts.expandAll,
          onItemClick: function onItemClick() {
            dataSource.expandAll(field.index);
          }
        });
        items.push({
          text: texts.collapseAll,
          icon: 'none',
          onItemClick: function onItemClick() {
            dataSource.collapseAll(field.index);
          }
        });
      }

      if (e.cell.isLast && !dataSource.paginate()) {
        var sortingBySummaryItemCount = 0;
        each(oppositeAreaFields, function (index, field) {
          if (!field.allowSortingBySummary) {
            return;
          }

          each(e.dataFields, function (dataIndex, dataField) {
            if (isDefined(e.cell.dataIndex) && e.cell.dataIndex !== dataIndex) {
              return;
            }

            var showDataFieldCaption = !isDefined(e.cell.dataIndex) && e.dataFields.length > 1;
            var textFormat = e.area === 'column' ? texts.sortColumnBySummary : texts.sortRowBySummary;
            var checked = findField(e.dataFields, field.sortBySummaryField) === dataIndex && (e.cell.path || []).join('/') === (field.sortBySummaryPath || []).join('/');
            var text = formatString(textFormat, showDataFieldCaption ? field.caption + ' - ' + dataField.caption : field.caption);
            items.push({
              beginGroup: sortingBySummaryItemCount === 0,
              icon: checked ? field.sortOrder === 'desc' ? 'sortdowntext' : 'sortuptext' : 'none',
              text: text,
              onItemClick: function onItemClick() {
                dataSource.field(field.index, {
                  sortBySummaryField: dataField.name || dataField.caption || dataField.dataField,
                  sortBySummaryPath: e.cell.path,
                  sortOrder: field.sortOrder === 'desc' ? 'asc' : 'desc'
                });
                dataSource.load();
              }
            });
            sortingBySummaryItemCount++;
          });
        });
        each(oppositeAreaFields, function (index, field) {
          if (!field.allowSortingBySummary || !isDefined(field.sortBySummaryField)) {
            return;
          }

          items.push({
            beginGroup: sortingBySummaryItemCount === 0,
            icon: 'none',
            text: texts.removeAllSorting,
            onItemClick: function onItemClick() {
              each(oppositeAreaFields, function (index, field) {
                dataSource.field(field.index, {
                  sortBySummaryField: undefined,
                  sortBySummaryPath: undefined,
                  sortOrder: undefined
                });
              });
              dataSource.load();
            }
          });
          return false;
        });
      }
    }

    if (that.option('fieldChooser.enabled')) {
      items.push({
        beginGroup: true,
        icon: 'columnchooser',
        text: texts.showFieldChooser,
        onItemClick: function onItemClick() {
          that._fieldChooserPopup.show();
        }
      });
    }

    if (that.option('export.enabled')) {
      items.push({
        beginGroup: true,
        icon: 'xlsxfile',
        text: texts.exportToExcel,
        onItemClick: function onItemClick() {
          that.exportToExcel();
        }
      });
    }

    e.items = items;

    that._trigger('onContextMenuPreparing', e);

    items = e.items;

    if (items && items.length) {
      return items;
    }
  },
  _createEventArgs: function _createEventArgs(targetElement, dxEvent) {
    var that = this;
    var dataSource = that.getDataSource();
    var args = {
      rowFields: dataSource.getAreaFields('row'),
      columnFields: dataSource.getAreaFields('column'),
      dataFields: dataSource.getAreaFields('data'),
      event: dxEvent
    };

    if (clickedOnFieldsArea($(targetElement))) {
      return extend(that._createFieldArgs(targetElement), args);
    } else {
      return extend(that._createCellArgs(targetElement), args);
    }
  },
  _createFieldArgs: function _createFieldArgs(targetElement) {
    var field = $(targetElement).children().data('field');
    var args = {
      field: field
    };
    return isDefined(field) ? args : {};
  },
  _createCellArgs: function _createCellArgs(cellElement) {
    var $cellElement = $(cellElement);
    var columnIndex = cellElement.cellIndex;
    var rowIndex = cellElement.parentElement.rowIndex;
    var $table = $cellElement.closest('table');
    var data = $table.data('data');
    var cell = data && data[rowIndex] && data[rowIndex][columnIndex];
    var args = {
      area: $table.data('area'),
      rowIndex: rowIndex,
      columnIndex: columnIndex,
      cellElement: getPublicElement($cellElement),
      cell: cell
    };
    return args;
  },
  _handleCellClick: function _handleCellClick(e) {
    var that = this;

    var args = that._createEventArgs(e.currentTarget, e);

    var cell = args.cell;

    if (!cell || !args.area && (args.rowIndex || args.columnIndex)) {
      return;
    }

    that._trigger('onCellClick', args);

    cell && !args.cancel && isDefined(cell.expanded) && setTimeout(function () {
      that._dataController[cell.expanded ? 'collapseHeaderItem' : 'expandHeaderItem'](args.area, cell.path);
    });
  },
  _getNoDataText: function _getNoDataText() {
    return this.option('texts.noData');
  },
  _renderNoDataText: gridCoreUtils.renderNoDataText,
  _renderLoadPanel: gridCoreUtils.renderLoadPanel,
  _updateLoading: function _updateLoading(progress) {
    var that = this;

    var isLoading = that._dataController.isLoading();

    if (!that._loadPanel) return;

    var loadPanelVisible = that._loadPanel.option('visible');

    if (!loadPanelVisible) {
      that._startLoadingTime = new Date();
    }

    if (isLoading) {
      if (progress) {
        if (new Date() - that._startLoadingTime >= 1000) {
          that._loadPanel.option('message', Math.floor(progress * 100) + '%');
        }
      } else {
        that._loadPanel.option('message', that.option('loadPanel.text'));
      }
    }

    clearTimeout(that._hideLoadingTimeoutID);

    if (loadPanelVisible && !isLoading) {
      that._hideLoadingTimeoutID = setTimeout(function () {
        that._loadPanel.option('visible', false);

        that.$element().removeClass(OVERFLOW_HIDDEN_CLASS);
      });
    } else {
      that._loadPanel.option('visible', isLoading);

      that.$element().toggleClass(OVERFLOW_HIDDEN_CLASS, !isLoading);
    }
  },
  _renderDescriptionArea: function _renderDescriptionArea() {
    var $element = this.$element();
    var $descriptionCell = $element.find('.' + DESCRIPTION_AREA_CELL_CLASS);
    var $toolbarContainer = $(DIV).addClass('dx-pivotgrid-toolbar');
    var fieldPanel = this.option('fieldPanel');
    var $filterHeader = $element.find('.dx-filter-header');
    var $columnHeader = $element.find('.dx-column-header');
    var $targetContainer;

    if (fieldPanel.visible && fieldPanel.showFilterFields) {
      $targetContainer = $filterHeader;
    } else if (fieldPanel.visible && (fieldPanel.showDataFields || fieldPanel.showColumnFields)) {
      $targetContainer = $columnHeader;
    } else {
      $targetContainer = $descriptionCell;
    }

    $columnHeader.toggleClass(BOTTOM_BORDER_CLASS, !!(fieldPanel.visible && (fieldPanel.showDataFields || fieldPanel.showColumnFields)));
    $filterHeader.toggleClass(BOTTOM_BORDER_CLASS, !!(fieldPanel.visible && fieldPanel.showFilterFields));
    $descriptionCell.toggleClass('dx-pivotgrid-background', fieldPanel.visible && (fieldPanel.showDataFields || fieldPanel.showColumnFields || fieldPanel.showRowFields));
    this.$element().find('.dx-pivotgrid-toolbar').remove();
    $toolbarContainer.prependTo($targetContainer);

    if (this.option('fieldChooser.enabled')) {
      var $buttonElement = $(DIV).appendTo($toolbarContainer).addClass('dx-pivotgrid-field-chooser-button');
      var buttonOptions = {
        icon: 'columnchooser',
        hint: this.option('texts.showFieldChooser'),
        onClick: () => {
          this.getFieldChooserPopup().show();
        }
      };

      this._createComponent($buttonElement, 'dxButton', buttonOptions);
    }

    if (this.option('export.enabled')) {
      var _$buttonElement = $(DIV).appendTo($toolbarContainer).addClass('dx-pivotgrid-export-button');

      var _buttonOptions = {
        icon: 'xlsxfile',
        hint: this.option('texts.exportToExcel'),
        onClick: () => {
          this.exportToExcel();
        }
      };

      this._createComponent(_$buttonElement, 'dxButton', _buttonOptions);
    }
  },
  _detectHasContainerHeight: function _detectHasContainerHeight() {
    var that = this;
    var element = that.$element();

    if (isDefined(that._hasHeight)) {
      var height = that.option('height') || that.$element().get(0).style.height;

      if (height && that._hasHeight ^ height !== 'auto') {
        that._hasHeight = null;
      }
    }

    if (isDefined(that._hasHeight) || element.is(':hidden')) {
      return;
    }

    that._pivotGridContainer.addClass('dx-hidden');

    var testElement = $(DIV).height(TEST_HEIGHT);
    element.append(testElement);
    that._hasHeight = element.height() !== TEST_HEIGHT;

    that._pivotGridContainer.removeClass('dx-hidden');

    testElement.remove();
  },
  _renderHeaders: function _renderHeaders(rowHeaderContainer, columnHeaderContainer, filterHeaderContainer, dataHeaderContainer) {
    var that = this;
    var dataSource = that.getDataSource();
    that._rowFields = that._rowFields || new FieldsArea(that, 'row');

    that._rowFields.render(rowHeaderContainer, dataSource.getAreaFields('row'));

    that._columnFields = that._columnFields || new FieldsArea(that, 'column');

    that._columnFields.render(columnHeaderContainer, dataSource.getAreaFields('column'));

    that._filterFields = that._filterFields || new FieldsArea(that, 'filter');

    that._filterFields.render(filterHeaderContainer, dataSource.getAreaFields('filter'));

    that._dataFields = that._dataFields || new FieldsArea(that, 'data');

    that._dataFields.render(dataHeaderContainer, dataSource.getAreaFields('data'));

    that.$element().dxPivotGridFieldChooserBase('instance').renderSortable();
  },
  _createTableElement: function _createTableElement() {
    var that = this;
    var $table = $('<table>').css({
      width: '100%'
    }).toggleClass(BORDERS_CLASS, !!that.option('showBorders')).toggleClass('dx-word-wrap', !!that.option('wordWrapEnabled'));
    eventsEngine.on($table, addNamespace(clickEventName, 'dxPivotGrid'), 'td', that._handleCellClick.bind(that));
    return $table;
  },
  _renderDataArea: function _renderDataArea(dataAreaElement) {
    var that = this;
    var dataArea = that._dataArea || new DataArea(that);
    that._dataArea = dataArea;
    dataArea.render(dataAreaElement, that._dataController.getCellsInfo());
    return dataArea;
  },
  _renderRowsArea: function _renderRowsArea(rowsAreaElement) {
    var that = this;
    var rowsArea = that._rowsArea || new VerticalHeadersArea(that);
    that._rowsArea = rowsArea;
    rowsArea.render(rowsAreaElement, that._dataController.getRowsInfo());
    return rowsArea;
  },
  _renderColumnsArea: function _renderColumnsArea(columnsAreaElement) {
    var that = this;
    var columnsArea = that._columnsArea || new HorizontalHeadersArea(that);
    that._columnsArea = columnsArea;
    columnsArea.render(columnsAreaElement, that._dataController.getColumnsInfo());
    return columnsArea;
  },
  _initMarkup: function _initMarkup() {
    var that = this;
    that.callBase.apply(this, arguments);
    that.$element().addClass(PIVOTGRID_CLASS);
  },
  _renderContentImpl: function _renderContentImpl() {
    var that = this;
    var columnsAreaElement;
    var rowsAreaElement;
    var dataAreaElement;
    var tableElement;
    var isFirstDrawing = !that._pivotGridContainer;
    var rowHeaderContainer;
    var columnHeaderContainer;
    var filterHeaderContainer;
    var dataHeaderContainer;
    tableElement = !isFirstDrawing && that._tableElement();

    if (!tableElement) {
      that.$element().addClass(ROW_LINES_CLASS).addClass(FIELDS_CONTAINER_CLASS);
      that._pivotGridContainer = $(DIV).addClass('dx-pivotgrid-container');

      that._renderFieldChooser();

      that._renderContextMenu();

      columnsAreaElement = $(TD).addClass(COLUMN_AREA_CELL_CLASS);
      rowsAreaElement = $(TD).addClass(ROW_AREA_CELL_CLASS);
      dataAreaElement = $(TD).addClass(DATA_AREA_CELL_CLASS);
      tableElement = that._createTableElement();
      dataHeaderContainer = $(TD).addClass('dx-data-header');
      filterHeaderContainer = $('<td>').attr('colspan', '2').addClass('dx-filter-header');
      columnHeaderContainer = $(TD).addClass('dx-column-header');
      rowHeaderContainer = $(TD).addClass(DESCRIPTION_AREA_CELL_CLASS);
      $(TR).append(filterHeaderContainer).appendTo(tableElement);
      $(TR).append(dataHeaderContainer).append(columnHeaderContainer).appendTo(tableElement);
      $(TR).toggleClass('dx-ie', coreBrowserUtils.msie === true).append(rowHeaderContainer).append(columnsAreaElement).appendTo(tableElement);
      $(TR).addClass(BOTTOM_ROW_CLASS).append(rowsAreaElement).append(dataAreaElement).appendTo(tableElement);

      that._pivotGridContainer.append(tableElement);

      that.$element().append(that._pivotGridContainer);

      if (that.option('rowHeaderLayout') === 'tree') {
        rowsAreaElement.addClass('dx-area-tree-view');
      }
    }

    that.$element().addClass(OVERFLOW_HIDDEN_CLASS);

    that._createComponent(that.$element(), PivotGridFieldChooserBase, {
      dataSource: that.getDataSource(),
      encodeHtml: that.option('encodeHtml'),
      allowFieldDragging: that.option('fieldPanel.allowFieldDragging'),
      headerFilter: that.option('headerFilter'),
      visible: that.option('visible')
    });

    var dataArea = that._renderDataArea(dataAreaElement);

    var rowsArea = that._renderRowsArea(rowsAreaElement);

    var columnsArea = that._renderColumnsArea(columnsAreaElement);

    dataArea.tableElement().prepend(columnsArea.headElement());

    if (isFirstDrawing) {
      that._renderLoadPanel(dataArea.groupElement().parent(), that.$element());

      that._renderDescriptionArea();

      rowsArea.renderScrollable();
      columnsArea.renderScrollable();
      dataArea.renderScrollable();
    }

    [dataArea, rowsArea, columnsArea].forEach(function (area) {
      unsubscribeScrollEvents(area);
    });

    that._renderHeaders(rowHeaderContainer, columnHeaderContainer, filterHeaderContainer, dataHeaderContainer);

    that._update(isFirstDrawing);
  },
  _update: function _update(isFirstDrawing) {
    var that = this;

    var updateHandler = function updateHandler() {
      that.updateDimensions();
    };

    if (that._needDelayResizing(that._dataArea.getData()) && isFirstDrawing) {
      setTimeout(updateHandler);
    } else {
      updateHandler();
    }
  },
  _fireContentReadyAction: function _fireContentReadyAction() {
    if (!this._dataController.isLoading()) {
      this.callBase();
    }
  },
  getScrollPath: function getScrollPath(area) {
    var that = this;

    if (area === 'column') {
      return that._columnsArea.getScrollPath(that._scrollLeft);
    } else {
      return that._rowsArea.getScrollPath(that._scrollTop);
    }
  },
  getDataSource: function getDataSource() {
    return this._dataController.getDataSource();
  },
  getFieldChooserPopup: function getFieldChooserPopup() {
    return this._fieldChooserPopup;
  },
  hasScroll: function hasScroll(area) {
    var that = this;
    return area === 'column' ? that._columnsArea.hasScroll() : that._rowsArea.hasScroll();
  },
  _dimensionChanged: function _dimensionChanged() {
    this.updateDimensions();
  },
  _visibilityChanged: function _visibilityChanged(visible) {
    if (visible) {
      this.updateDimensions();
    }
  },
  _dispose: function _dispose() {
    var that = this;
    clearTimeout(that._hideLoadingTimeoutID);
    that.callBase.apply(that, arguments);

    if (that._dataController) {
      that._dataController.dispose();
    }
  },
  _tableElement: function _tableElement() {
    return this.$element().find('table').first();
  },
  addWidgetPrefix: function addWidgetPrefix(className) {
    return 'dx-pivotgrid-' + className;
  },
  resize: function resize() {
    this.updateDimensions();
  },
  isReady: function isReady() {
    return this.callBase() && !this._dataController.isLoading();
  },
  updateDimensions: function updateDimensions() {
    var that = this;
    var groupWidth;

    var tableElement = that._tableElement();

    var bordersWidth;
    var totalWidth = 0;
    var totalHeight = 0;
    var rowsAreaWidth = 0;
    var hasRowsScroll;
    var hasColumnsScroll;
    var dataAreaCell = tableElement.find('.' + DATA_AREA_CELL_CLASS);
    var rowAreaCell = tableElement.find('.' + ROW_AREA_CELL_CLASS);
    var columnAreaCell = tableElement.find('.' + COLUMN_AREA_CELL_CLASS);
    var descriptionCell = tableElement.find('.' + DESCRIPTION_AREA_CELL_CLASS);
    var filterHeaderCell = tableElement.find('.dx-filter-header');
    var columnHeaderCell = tableElement.find('.dx-column-header');
    var rowFieldsHeader = that._rowFields;
    var d = new Deferred();

    if (!hasWindow()) {
      return;
    }

    var needSynchronizeFieldPanel = rowFieldsHeader.isVisible() && that.option('rowHeaderLayout') !== 'tree';

    that._detectHasContainerHeight();

    if (!that._dataArea.headElement().length) {
      that._dataArea.tableElement().prepend(that._columnsArea.headElement());
    }

    if (needSynchronizeFieldPanel) {
      that._rowsArea.updateColspans(rowFieldsHeader.getColumnsCount());

      that._rowsArea.tableElement().prepend(rowFieldsHeader.headElement());
    }

    tableElement.addClass(INCOMPRESSIBLE_FIELDS_CLASS);

    that._dataArea.reset();

    that._rowsArea.reset();

    that._columnsArea.reset();

    rowFieldsHeader.reset();

    var calculateHasScroll = (areaSize, totalSize) => totalSize - areaSize >= 1;

    var calculateGroupHeight = (dataAreaHeight, totalHeight, hasRowsScroll, hasColumnsScroll, scrollBarWidth) => {
      return hasRowsScroll ? dataAreaHeight : totalHeight + (hasColumnsScroll ? scrollBarWidth : 0);
    };

    deferUpdate(function () {
      var resultWidths = that._dataArea.getColumnsWidth();

      var rowHeights = that._rowsArea.getRowsHeight();

      var rowsAreaHeights = needSynchronizeFieldPanel ? rowHeights.slice(1) : rowHeights;

      var dataAreaHeights = that._dataArea.getRowsHeight();

      var descriptionCellHeight = getSize(descriptionCell[0], 'height', {
        paddings: true,
        borders: true,
        margins: true
      }) + (needSynchronizeFieldPanel ? rowHeights[0] : 0);

      var columnsAreaRowCount = that._dataController.getColumnsInfo().length;

      var resultHeights = mergeArraysByMaxValue(rowsAreaHeights, dataAreaHeights.slice(columnsAreaRowCount));
      var columnsAreaRowHeights = dataAreaHeights.slice(0, columnsAreaRowCount);
      var columnsAreaHeight = getArraySum(columnsAreaRowHeights);

      var rowsAreaColumnWidths = that._rowsArea.getColumnsWidth();

      var filterAreaHeight = 0;
      var dataAreaHeight = 0;

      if (that._hasHeight) {
        filterAreaHeight = filterHeaderCell.height();
        var $dataHeader = tableElement.find('.dx-data-header');
        var dataHeaderHeight = coreBrowserUtils.msie ? getSize($dataHeader.get(0), 'height', {
          paddings: false,
          borders: false,
          margins: false
        }) : $dataHeader.height();
        bordersWidth = getCommonBorderWidth([columnAreaCell, dataAreaCell, tableElement, columnHeaderCell, filterHeaderCell], 'height');
        dataAreaHeight = that.$element().height() - filterAreaHeight - dataHeaderHeight - (Math.max(that._dataArea.headElement().height(), columnAreaCell.height(), descriptionCellHeight) + bordersWidth);
      }

      totalWidth = that._dataArea.tableElement().width();
      totalHeight = getArraySum(resultHeights);

      if (!totalWidth || !totalHeight) {
        d.resolve();
        return;
      }

      rowsAreaWidth = getArraySum(rowsAreaColumnWidths);
      var elementWidth = that.$element().width();
      bordersWidth = getCommonBorderWidth([rowAreaCell, dataAreaCell, tableElement], 'width');
      groupWidth = elementWidth - rowsAreaWidth - bordersWidth;
      groupWidth = groupWidth > 0 ? groupWidth : totalWidth;
      var diff = totalWidth - groupWidth;
      var needAdjustWidthOnZoom = diff >= 0 && diff <= 2;

      if (needAdjustWidthOnZoom) {
        // T914454
        adjustSizeArray(resultWidths, diff);
        totalWidth = groupWidth;
      }

      hasRowsScroll = that._hasHeight && calculateHasScroll(dataAreaHeight, totalHeight);
      hasColumnsScroll = calculateHasScroll(groupWidth, totalWidth);

      var scrollBarWidth = that._dataArea.getScrollbarWidth();

      var groupHeight = calculateGroupHeight(dataAreaHeight, totalHeight, hasRowsScroll, hasColumnsScroll, scrollBarWidth);
      deferRender(function () {
        that._columnsArea.tableElement().append(that._dataArea.headElement());

        rowFieldsHeader.tableElement().append(that._rowsArea.headElement());

        if (!hasColumnsScroll && hasRowsScroll && scrollBarWidth) {
          adjustSizeArray(resultWidths, scrollBarWidth);
          totalWidth -= scrollBarWidth;
        }

        if (descriptionCellHeight > columnsAreaHeight) {
          adjustSizeArray(columnsAreaRowHeights, columnsAreaHeight - descriptionCellHeight);

          that._columnsArea.setRowsHeight(columnsAreaRowHeights);
        }

        tableElement.removeClass(INCOMPRESSIBLE_FIELDS_CLASS);
        columnHeaderCell.children().css('maxWidth', groupWidth);

        that._columnsArea.setGroupWidth(groupWidth);

        that._columnsArea.processScrollBarSpacing(hasRowsScroll ? scrollBarWidth : 0);

        that._columnsArea.setColumnsWidth(resultWidths);

        that._rowsArea.setGroupHeight(that._hasHeight ? groupHeight : 'auto');

        that._rowsArea.processScrollBarSpacing(hasColumnsScroll ? scrollBarWidth : 0); // B232690


        that._rowsArea.setColumnsWidth(rowsAreaColumnWidths);

        that._rowsArea.setRowsHeight(resultHeights);

        that._dataArea.setColumnsWidth(resultWidths);

        that._dataArea.setRowsHeight(resultHeights);

        that._dataArea.setGroupWidth(groupWidth);

        that._dataArea.setGroupHeight(that._hasHeight ? groupHeight : 'auto');

        needSynchronizeFieldPanel && rowFieldsHeader.setColumnsWidth(rowsAreaColumnWidths);
        dataAreaCell.toggleClass(BOTTOM_BORDER_CLASS, !hasRowsScroll);
        rowAreaCell.toggleClass(BOTTOM_BORDER_CLASS, !hasRowsScroll); // T317921

        if (!that._hasHeight && elementWidth !== that.$element().width()) {
          var _diff = elementWidth - that.$element().width();

          if (!hasColumnsScroll) {
            adjustSizeArray(resultWidths, _diff);

            that._columnsArea.setColumnsWidth(resultWidths);

            that._dataArea.setColumnsWidth(resultWidths);
          }

          that._dataArea.setGroupWidth(groupWidth - _diff);

          that._columnsArea.setGroupWidth(groupWidth - _diff);
        }

        if (that._hasHeight && that._filterFields.isVisible() && filterHeaderCell.height() !== filterAreaHeight) {
          var _diff2 = filterHeaderCell.height() - filterAreaHeight;

          if (_diff2 > 0) {
            hasRowsScroll = calculateHasScroll(dataAreaHeight - _diff2, totalHeight);

            var _groupHeight = calculateGroupHeight(dataAreaHeight - _diff2, totalHeight, hasRowsScroll, hasColumnsScroll, scrollBarWidth);

            that._dataArea.setGroupHeight(_groupHeight);

            that._rowsArea.setGroupHeight(_groupHeight);
          }
        }

        var scrollingOptions = that.option('scrolling');

        if (scrollingOptions.mode === 'virtual') {
          that._setVirtualContentParams(scrollingOptions, resultWidths, resultHeights, groupWidth, groupHeight, that._hasHeight, rowsAreaWidth);
        }

        var updateScrollableResults = [];

        that._dataArea.updateScrollableOptions({
          direction: that._dataArea.getScrollableDirection(hasColumnsScroll, hasRowsScroll),
          rtlEnabled: that.option('rtlEnabled')
        });

        each([that._columnsArea, that._rowsArea, that._dataArea], function (_, area) {
          updateScrollableResults.push(area && area.updateScrollable());
        });

        that._updateLoading();

        that._renderNoDataText(dataAreaCell);

        when.apply($, updateScrollableResults).done(function () {
          that._updateScrollPosition(that._columnsArea, that._rowsArea, that._dataArea);

          that._subscribeToEvents(that._columnsArea, that._rowsArea, that._dataArea);

          d.resolve();
        });
      });
    });
    return d;
  },
  _setVirtualContentParams: function _setVirtualContentParams(scrollingOptions, resultWidths, resultHeights, groupWidth, groupHeight, hasHeight, rowsAreaWidth) {
    var virtualContentParams = this._dataController.calculateVirtualContentParams({
      virtualRowHeight: scrollingOptions.virtualRowHeight,
      virtualColumnWidth: scrollingOptions.virtualColumnWidth,
      itemWidths: resultWidths,
      itemHeights: resultHeights,
      rowCount: resultHeights.length,
      columnCount: resultWidths.length,
      viewportWidth: groupWidth,
      viewportHeight: hasHeight ? groupHeight : $(window).outerHeight()
    });

    this._dataArea.setVirtualContentParams({
      top: virtualContentParams.contentTop,
      left: virtualContentParams.contentLeft,
      width: virtualContentParams.width,
      height: virtualContentParams.height
    });

    this._rowsArea.setVirtualContentParams({
      top: virtualContentParams.contentTop,
      width: rowsAreaWidth,
      height: virtualContentParams.height
    });

    this._columnsArea.setVirtualContentParams({
      left: virtualContentParams.contentLeft,
      width: virtualContentParams.width,
      height: this._columnsArea.groupElement().height()
    });
  },
  applyPartialDataSource: function applyPartialDataSource(area, path, dataSource) {
    this._dataController.applyPartialDataSource(area, path, dataSource);
  }
}).inherit(ExportController).include(chartIntegrationMixin);
registerComponent('dxPivotGrid', PivotGrid);
export default PivotGrid;
"use strict";

exports.default = void 0;

var _component_registrator = _interopRequireDefault(require("../../../../core/component_registrator"));

var _data_grid = _interopRequireDefault(require("../../../component_wrapper/data_grid"));

var _data_grid2 = require("./data_grid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DataGrid = /*#__PURE__*/function (_DataGridBaseComponen) {
  _inheritsLoose(DataGrid, _DataGridBaseComponen);

  function DataGrid() {
    return _DataGridBaseComponen.apply(this, arguments) || this;
  }

  var _proto = DataGrid.prototype;

  _proto.getProps = function getProps() {
    var props = _DataGridBaseComponen.prototype.getProps.call(this);

    props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
    return props;
  };

  _proto.getComponentInstance = function getComponentInstance() {
    var _this$viewRef;

    return (_this$viewRef = this.viewRef) === null || _this$viewRef === void 0 ? void 0 : _this$viewRef.getComponentInstance();
  };

  _proto.beginCustomLoading = function beginCustomLoading(messageText) {
    var _this$viewRef2;

    return (_this$viewRef2 = this.viewRef) === null || _this$viewRef2 === void 0 ? void 0 : _this$viewRef2.beginCustomLoading(messageText);
  };

  _proto.byKey = function byKey(key) {
    var _this$viewRef3;

    return (_this$viewRef3 = this.viewRef) === null || _this$viewRef3 === void 0 ? void 0 : _this$viewRef3.byKey(key);
  };

  _proto.cancelEditData = function cancelEditData() {
    var _this$viewRef4;

    return (_this$viewRef4 = this.viewRef) === null || _this$viewRef4 === void 0 ? void 0 : _this$viewRef4.cancelEditData();
  };

  _proto.cellValue = function cellValue(rowIndex, dataField, value) {
    var _this$viewRef5;

    return (_this$viewRef5 = this.viewRef) === null || _this$viewRef5 === void 0 ? void 0 : _this$viewRef5.cellValue(rowIndex, dataField, value);
  };

  _proto.clearFilter = function clearFilter(filterName) {
    var _this$viewRef6;

    return (_this$viewRef6 = this.viewRef) === null || _this$viewRef6 === void 0 ? void 0 : _this$viewRef6.clearFilter(filterName);
  };

  _proto.clearSelection = function clearSelection() {
    var _this$viewRef7;

    return (_this$viewRef7 = this.viewRef) === null || _this$viewRef7 === void 0 ? void 0 : _this$viewRef7.clearSelection();
  };

  _proto.clearSorting = function clearSorting() {
    var _this$viewRef8;

    return (_this$viewRef8 = this.viewRef) === null || _this$viewRef8 === void 0 ? void 0 : _this$viewRef8.clearSorting();
  };

  _proto.closeEditCell = function closeEditCell() {
    var _this$viewRef9;

    return (_this$viewRef9 = this.viewRef) === null || _this$viewRef9 === void 0 ? void 0 : _this$viewRef9.closeEditCell();
  };

  _proto.collapseAdaptiveDetailRow = function collapseAdaptiveDetailRow() {
    var _this$viewRef10;

    return (_this$viewRef10 = this.viewRef) === null || _this$viewRef10 === void 0 ? void 0 : _this$viewRef10.collapseAdaptiveDetailRow();
  };

  _proto.columnCount = function columnCount() {
    var _this$viewRef11;

    return (_this$viewRef11 = this.viewRef) === null || _this$viewRef11 === void 0 ? void 0 : _this$viewRef11.columnCount();
  };

  _proto.columnOption = function columnOption(id, optionName, optionValue) {
    var _this$viewRef12;

    return (_this$viewRef12 = this.viewRef) === null || _this$viewRef12 === void 0 ? void 0 : _this$viewRef12.columnOption(id, optionName, optionValue);
  };

  _proto.deleteColumn = function deleteColumn(id) {
    var _this$viewRef13;

    return (_this$viewRef13 = this.viewRef) === null || _this$viewRef13 === void 0 ? void 0 : _this$viewRef13.deleteColumn(id);
  };

  _proto.deleteRow = function deleteRow(rowIndex) {
    var _this$viewRef14;

    return (_this$viewRef14 = this.viewRef) === null || _this$viewRef14 === void 0 ? void 0 : _this$viewRef14.deleteRow(rowIndex);
  };

  _proto.deselectAll = function deselectAll() {
    var _this$viewRef15;

    return (_this$viewRef15 = this.viewRef) === null || _this$viewRef15 === void 0 ? void 0 : _this$viewRef15.deselectAll();
  };

  _proto.deselectRows = function deselectRows(keys) {
    var _this$viewRef16;

    return (_this$viewRef16 = this.viewRef) === null || _this$viewRef16 === void 0 ? void 0 : _this$viewRef16.deselectRows(keys);
  };

  _proto.editCell = function editCell(rowIndex, dataFieldColumnIndex) {
    var _this$viewRef17;

    return (_this$viewRef17 = this.viewRef) === null || _this$viewRef17 === void 0 ? void 0 : _this$viewRef17.editCell(rowIndex, dataFieldColumnIndex);
  };

  _proto.editRow = function editRow(rowIndex) {
    var _this$viewRef18;

    return (_this$viewRef18 = this.viewRef) === null || _this$viewRef18 === void 0 ? void 0 : _this$viewRef18.editRow(rowIndex);
  };

  _proto.endCustomLoading = function endCustomLoading() {
    var _this$viewRef19;

    return (_this$viewRef19 = this.viewRef) === null || _this$viewRef19 === void 0 ? void 0 : _this$viewRef19.endCustomLoading();
  };

  _proto.expandAdaptiveDetailRow = function expandAdaptiveDetailRow(key) {
    var _this$viewRef20;

    return (_this$viewRef20 = this.viewRef) === null || _this$viewRef20 === void 0 ? void 0 : _this$viewRef20.expandAdaptiveDetailRow(key);
  };

  _proto.filter = function filter(filterExpr) {
    var _this$viewRef21;

    return (_this$viewRef21 = this.viewRef) === null || _this$viewRef21 === void 0 ? void 0 : _this$viewRef21.filter(filterExpr);
  };

  _proto.focus = function focus(element) {
    var _this$viewRef22;

    return (_this$viewRef22 = this.viewRef) === null || _this$viewRef22 === void 0 ? void 0 : _this$viewRef22.focus(this._patchElementParam(element));
  };

  _proto.getCellElement = function getCellElement(rowIndex, dataField) {
    var _this$viewRef23;

    return (_this$viewRef23 = this.viewRef) === null || _this$viewRef23 === void 0 ? void 0 : _this$viewRef23.getCellElement(rowIndex, dataField);
  };

  _proto.getCombinedFilter = function getCombinedFilter(returnDataField) {
    var _this$viewRef24;

    return (_this$viewRef24 = this.viewRef) === null || _this$viewRef24 === void 0 ? void 0 : _this$viewRef24.getCombinedFilter(returnDataField);
  };

  _proto.getDataSource = function getDataSource() {
    var _this$viewRef25;

    return (_this$viewRef25 = this.viewRef) === null || _this$viewRef25 === void 0 ? void 0 : _this$viewRef25.getDataSource();
  };

  _proto.getKeyByRowIndex = function getKeyByRowIndex(rowIndex) {
    var _this$viewRef26;

    return (_this$viewRef26 = this.viewRef) === null || _this$viewRef26 === void 0 ? void 0 : _this$viewRef26.getKeyByRowIndex(rowIndex);
  };

  _proto.getRowElement = function getRowElement(rowIndex) {
    var _this$viewRef27;

    return (_this$viewRef27 = this.viewRef) === null || _this$viewRef27 === void 0 ? void 0 : _this$viewRef27.getRowElement(rowIndex);
  };

  _proto.getRowIndexByKey = function getRowIndexByKey(key) {
    var _this$viewRef28;

    return (_this$viewRef28 = this.viewRef) === null || _this$viewRef28 === void 0 ? void 0 : _this$viewRef28.getRowIndexByKey(key);
  };

  _proto.getScrollable = function getScrollable() {
    var _this$viewRef29;

    return (_this$viewRef29 = this.viewRef) === null || _this$viewRef29 === void 0 ? void 0 : _this$viewRef29.getScrollable();
  };

  _proto.getVisibleColumnIndex = function getVisibleColumnIndex(id) {
    var _this$viewRef30;

    return (_this$viewRef30 = this.viewRef) === null || _this$viewRef30 === void 0 ? void 0 : _this$viewRef30.getVisibleColumnIndex(id);
  };

  _proto.hasEditData = function hasEditData() {
    var _this$viewRef31;

    return (_this$viewRef31 = this.viewRef) === null || _this$viewRef31 === void 0 ? void 0 : _this$viewRef31.hasEditData();
  };

  _proto.hideColumnChooser = function hideColumnChooser() {
    var _this$viewRef32;

    return (_this$viewRef32 = this.viewRef) === null || _this$viewRef32 === void 0 ? void 0 : _this$viewRef32.hideColumnChooser();
  };

  _proto.isAdaptiveDetailRowExpanded = function isAdaptiveDetailRowExpanded(key) {
    var _this$viewRef33;

    return (_this$viewRef33 = this.viewRef) === null || _this$viewRef33 === void 0 ? void 0 : _this$viewRef33.isAdaptiveDetailRowExpanded(key);
  };

  _proto.isRowFocused = function isRowFocused(key) {
    var _this$viewRef34;

    return (_this$viewRef34 = this.viewRef) === null || _this$viewRef34 === void 0 ? void 0 : _this$viewRef34.isRowFocused(key);
  };

  _proto.isRowSelected = function isRowSelected(key) {
    var _this$viewRef35;

    return (_this$viewRef35 = this.viewRef) === null || _this$viewRef35 === void 0 ? void 0 : _this$viewRef35.isRowSelected(key);
  };

  _proto.keyOf = function keyOf(obj) {
    var _this$viewRef36;

    return (_this$viewRef36 = this.viewRef) === null || _this$viewRef36 === void 0 ? void 0 : _this$viewRef36.keyOf(obj);
  };

  _proto.navigateToRow = function navigateToRow(key) {
    var _this$viewRef37;

    return (_this$viewRef37 = this.viewRef) === null || _this$viewRef37 === void 0 ? void 0 : _this$viewRef37.navigateToRow(key);
  };

  _proto.pageCount = function pageCount() {
    var _this$viewRef38;

    return (_this$viewRef38 = this.viewRef) === null || _this$viewRef38 === void 0 ? void 0 : _this$viewRef38.pageCount();
  };

  _proto.pageIndex = function pageIndex(newIndex) {
    var _this$viewRef39;

    return (_this$viewRef39 = this.viewRef) === null || _this$viewRef39 === void 0 ? void 0 : _this$viewRef39.pageIndex(newIndex);
  };

  _proto.pageSize = function pageSize(value) {
    var _this$viewRef40;

    return (_this$viewRef40 = this.viewRef) === null || _this$viewRef40 === void 0 ? void 0 : _this$viewRef40.pageSize(value);
  };

  _proto.refresh = function refresh(changesOnly) {
    var _this$viewRef41;

    return (_this$viewRef41 = this.viewRef) === null || _this$viewRef41 === void 0 ? void 0 : _this$viewRef41.refresh(changesOnly);
  };

  _proto.repaintRows = function repaintRows(rowIndexes) {
    var _this$viewRef42;

    return (_this$viewRef42 = this.viewRef) === null || _this$viewRef42 === void 0 ? void 0 : _this$viewRef42.repaintRows(rowIndexes);
  };

  _proto.saveEditData = function saveEditData() {
    var _this$viewRef43;

    return (_this$viewRef43 = this.viewRef) === null || _this$viewRef43 === void 0 ? void 0 : _this$viewRef43.saveEditData();
  };

  _proto.searchByText = function searchByText(text) {
    var _this$viewRef44;

    return (_this$viewRef44 = this.viewRef) === null || _this$viewRef44 === void 0 ? void 0 : _this$viewRef44.searchByText(text);
  };

  _proto.selectAll = function selectAll() {
    var _this$viewRef45;

    return (_this$viewRef45 = this.viewRef) === null || _this$viewRef45 === void 0 ? void 0 : _this$viewRef45.selectAll();
  };

  _proto.selectRows = function selectRows(keys, preserve) {
    var _this$viewRef46;

    return (_this$viewRef46 = this.viewRef) === null || _this$viewRef46 === void 0 ? void 0 : _this$viewRef46.selectRows(keys, preserve);
  };

  _proto.selectRowsByIndexes = function selectRowsByIndexes(indexes) {
    var _this$viewRef47;

    return (_this$viewRef47 = this.viewRef) === null || _this$viewRef47 === void 0 ? void 0 : _this$viewRef47.selectRowsByIndexes(indexes);
  };

  _proto.showColumnChooser = function showColumnChooser() {
    var _this$viewRef48;

    return (_this$viewRef48 = this.viewRef) === null || _this$viewRef48 === void 0 ? void 0 : _this$viewRef48.showColumnChooser();
  };

  _proto.undeleteRow = function undeleteRow(rowIndex) {
    var _this$viewRef49;

    return (_this$viewRef49 = this.viewRef) === null || _this$viewRef49 === void 0 ? void 0 : _this$viewRef49.undeleteRow(rowIndex);
  };

  _proto.updateDimensions = function updateDimensions() {
    var _this$viewRef50;

    return (_this$viewRef50 = this.viewRef) === null || _this$viewRef50 === void 0 ? void 0 : _this$viewRef50.updateDimensions();
  };

  _proto.resize = function resize() {
    var _this$viewRef51;

    return (_this$viewRef51 = this.viewRef) === null || _this$viewRef51 === void 0 ? void 0 : _this$viewRef51.resize();
  };

  _proto.addColumn = function addColumn(columnOptions) {
    var _this$viewRef52;

    return (_this$viewRef52 = this.viewRef) === null || _this$viewRef52 === void 0 ? void 0 : _this$viewRef52.addColumn(columnOptions);
  };

  _proto.addRow = function addRow() {
    var _this$viewRef53;

    return (_this$viewRef53 = this.viewRef) === null || _this$viewRef53 === void 0 ? void 0 : _this$viewRef53.addRow();
  };

  _proto.clearGrouping = function clearGrouping() {
    var _this$viewRef54;

    return (_this$viewRef54 = this.viewRef) === null || _this$viewRef54 === void 0 ? void 0 : _this$viewRef54.clearGrouping();
  };

  _proto.collapseAll = function collapseAll(groupIndex) {
    var _this$viewRef55;

    return (_this$viewRef55 = this.viewRef) === null || _this$viewRef55 === void 0 ? void 0 : _this$viewRef55.collapseAll(groupIndex);
  };

  _proto.collapseRow = function collapseRow(key) {
    var _this$viewRef56;

    return (_this$viewRef56 = this.viewRef) === null || _this$viewRef56 === void 0 ? void 0 : _this$viewRef56.collapseRow(key);
  };

  _proto.expandAll = function expandAll(groupIndex) {
    var _this$viewRef57;

    return (_this$viewRef57 = this.viewRef) === null || _this$viewRef57 === void 0 ? void 0 : _this$viewRef57.expandAll(groupIndex);
  };

  _proto.expandRow = function expandRow(key) {
    var _this$viewRef58;

    return (_this$viewRef58 = this.viewRef) === null || _this$viewRef58 === void 0 ? void 0 : _this$viewRef58.expandRow(key);
  };

  _proto.exportToExcel = function exportToExcel(selectionOnly) {
    var _this$viewRef59;

    return (_this$viewRef59 = this.viewRef) === null || _this$viewRef59 === void 0 ? void 0 : _this$viewRef59.exportToExcel(selectionOnly);
  };

  _proto.getSelectedRowKeys = function getSelectedRowKeys() {
    var _this$viewRef60;

    return (_this$viewRef60 = this.viewRef) === null || _this$viewRef60 === void 0 ? void 0 : _this$viewRef60.getSelectedRowKeys();
  };

  _proto.getSelectedRowsData = function getSelectedRowsData() {
    var _this$viewRef61;

    return (_this$viewRef61 = this.viewRef) === null || _this$viewRef61 === void 0 ? void 0 : _this$viewRef61.getSelectedRowsData();
  };

  _proto.getTotalSummaryValue = function getTotalSummaryValue(summaryItemName) {
    var _this$viewRef62;

    return (_this$viewRef62 = this.viewRef) === null || _this$viewRef62 === void 0 ? void 0 : _this$viewRef62.getTotalSummaryValue(summaryItemName);
  };

  _proto.getVisibleColumns = function getVisibleColumns(headerLevel) {
    var _this$viewRef63;

    return (_this$viewRef63 = this.viewRef) === null || _this$viewRef63 === void 0 ? void 0 : _this$viewRef63.getVisibleColumns(headerLevel);
  };

  _proto.getVisibleRows = function getVisibleRows() {
    var _this$viewRef64;

    return (_this$viewRef64 = this.viewRef) === null || _this$viewRef64 === void 0 ? void 0 : _this$viewRef64.getVisibleRows();
  };

  _proto.isRowExpanded = function isRowExpanded(key) {
    var _this$viewRef65;

    return (_this$viewRef65 = this.viewRef) === null || _this$viewRef65 === void 0 ? void 0 : _this$viewRef65.isRowExpanded(key);
  };

  _proto.totalCount = function totalCount() {
    var _this$viewRef66;

    return (_this$viewRef66 = this.viewRef) === null || _this$viewRef66 === void 0 ? void 0 : _this$viewRef66.totalCount();
  };

  _proto.isScrollbarVisible = function isScrollbarVisible() {
    var _this$viewRef67;

    return (_this$viewRef67 = this.viewRef) === null || _this$viewRef67 === void 0 ? void 0 : _this$viewRef67.isScrollbarVisible();
  };

  _proto.getTopVisibleRowData = function getTopVisibleRowData() {
    var _this$viewRef68;

    return (_this$viewRef68 = this.viewRef) === null || _this$viewRef68 === void 0 ? void 0 : _this$viewRef68.getTopVisibleRowData();
  };

  _proto.getScrollbarWidth = function getScrollbarWidth(isHorizontal) {
    var _this$viewRef69;

    return (_this$viewRef69 = this.viewRef) === null || _this$viewRef69 === void 0 ? void 0 : _this$viewRef69.getScrollbarWidth(isHorizontal);
  };

  _proto._getActionConfigs = function _getActionConfigs() {
    return {
      onCellClick: {},
      onCellDblClick: {},
      onCellHoverChanged: {},
      onCellPrepared: {},
      onContextMenuPreparing: {},
      onEditingStart: {},
      onEditorPrepared: {},
      onEditorPreparing: {},
      onExported: {},
      onExporting: {},
      onFileSaving: {},
      onFocusedCellChanged: {},
      onFocusedCellChanging: {},
      onFocusedRowChanged: {},
      onFocusedRowChanging: {},
      onRowClick: {},
      onRowDblClick: {},
      onRowPrepared: {},
      onAdaptiveDetailRowPreparing: {},
      onDataErrorOccurred: {},
      onInitNewRow: {},
      onRowCollapsed: {},
      onRowCollapsing: {},
      onRowExpanded: {},
      onRowExpanding: {},
      onRowInserted: {},
      onRowInserting: {},
      onRowRemoved: {},
      onRowRemoving: {},
      onRowUpdated: {},
      onRowUpdating: {},
      onRowValidating: {},
      onSelectionChanged: {},
      onToolbarPreparing: {},
      onClick: {},
      onContentReady: {
        excludeValidators: ["disabled", "readOnly"]
      }
    };
  };

  _createClass(DataGrid, [{
    key: "_propsInfo",
    get: function get() {
      return {
        twoWay: [["filterValue", [], "filterValueChange"], ["focusedColumnIndex", -1, "focusedColumnIndexChange"], ["focusedRowIndex", -1, "focusedRowIndexChange"], ["focusedRowKey", null, "focusedRowKeyChange"], ["selectedRowKeys", [], "selectedRowKeysChange"], ["selectionFilter", [], "selectionFilterChange"]],
        allowNull: ["defaultFocusedRowKey", "focusedRowKey"],
        elements: [],
        templates: ["rowTemplate"],
        props: ["columns", "editing", "export", "groupPanel", "grouping", "masterDetail", "scrolling", "selection", "sortByGroupSummaryInfo", "summary", "columnChooser", "columnFixing", "filterPanel", "filterRow", "headerFilter", "useKeyboard", "keyboardNavigation", "loadPanel", "pager", "paging", "rowDragging", "searchPanel", "sorting", "stateStoring", "rowTemplate", "customizeColumns", "customizeExportData", "keyExpr", "remoteOperations", "allowColumnReordering", "allowColumnResizing", "autoNavigateToFocusedRow", "cacheEnabled", "cellHintEnabled", "columnAutoWidth", "columnHidingEnabled", "columnMinWidth", "columnResizingMode", "columnWidth", "dataSource", "dateSerializationFormat", "errorRowEnabled", "filterBuilder", "filterBuilderPopup", "filterSyncEnabled", "focusedRowEnabled", "highlightChanges", "noDataText", "renderAsync", "repaintChangesOnly", "rowAlternationEnabled", "showBorders", "showColumnHeaders", "showColumnLines", "showRowLines", "twoWayBindingEnabled", "wordWrapEnabled", "loadingTimeout", "commonColumnSettings", "onCellClick", "onCellDblClick", "onCellHoverChanged", "onCellPrepared", "onContextMenuPreparing", "onEditingStart", "onEditorPrepared", "onEditorPreparing", "onExported", "onExporting", "onFileSaving", "onFocusedCellChanged", "onFocusedCellChanging", "onFocusedRowChanged", "onFocusedRowChanging", "onRowClick", "onRowDblClick", "onRowPrepared", "onAdaptiveDetailRowPreparing", "onDataErrorOccurred", "onInitNewRow", "onKeyDown", "onRowCollapsed", "onRowCollapsing", "onRowExpanded", "onRowExpanding", "onRowInserted", "onRowInserting", "onRowRemoved", "onRowRemoving", "onRowUpdated", "onRowUpdating", "onRowValidating", "onSelectionChanged", "onToolbarPreparing", "defaultFilterValue", "filterValueChange", "defaultFocusedColumnIndex", "focusedColumnIndexChange", "defaultFocusedRowIndex", "focusedRowIndexChange", "defaultFocusedRowKey", "focusedRowKeyChange", "defaultSelectedRowKeys", "selectedRowKeysChange", "defaultSelectionFilter", "selectionFilterChange", "accessKey", "activeStateEnabled", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "onClick", "onContentReady", "rtlEnabled", "tabIndex", "visible", "width", "filterValue", "focusedColumnIndex", "focusedRowIndex", "focusedRowKey", "selectedRowKeys", "selectionFilter"]
      };
    }
  }, {
    key: "_viewComponent",
    get: function get() {
      return _data_grid2.DataGrid;
    }
  }]);

  return DataGrid;
}(_data_grid.default);

exports.default = DataGrid;
(0, _component_registrator.default)("dxDataGrid", DataGrid);
module.exports = exports.default;
module.exports.default = exports.default;
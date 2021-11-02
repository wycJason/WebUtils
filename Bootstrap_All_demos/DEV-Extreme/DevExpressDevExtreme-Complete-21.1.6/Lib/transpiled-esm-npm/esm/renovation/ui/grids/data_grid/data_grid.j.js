import registerComponent from "../../../../core/component_registrator";
import DataGridBaseComponent from "../../../component_wrapper/data_grid";
import { DataGrid as DataGridComponent } from "./data_grid";
export default class DataGrid extends DataGridBaseComponent {
  getProps() {
    var props = super.getProps();
    props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
    return props;
  }

  getComponentInstance() {
    var _this$viewRef;

    return (_this$viewRef = this.viewRef) === null || _this$viewRef === void 0 ? void 0 : _this$viewRef.getComponentInstance();
  }

  beginCustomLoading(messageText) {
    var _this$viewRef2;

    return (_this$viewRef2 = this.viewRef) === null || _this$viewRef2 === void 0 ? void 0 : _this$viewRef2.beginCustomLoading(messageText);
  }

  byKey(key) {
    var _this$viewRef3;

    return (_this$viewRef3 = this.viewRef) === null || _this$viewRef3 === void 0 ? void 0 : _this$viewRef3.byKey(key);
  }

  cancelEditData() {
    var _this$viewRef4;

    return (_this$viewRef4 = this.viewRef) === null || _this$viewRef4 === void 0 ? void 0 : _this$viewRef4.cancelEditData();
  }

  cellValue(rowIndex, dataField, value) {
    var _this$viewRef5;

    return (_this$viewRef5 = this.viewRef) === null || _this$viewRef5 === void 0 ? void 0 : _this$viewRef5.cellValue(rowIndex, dataField, value);
  }

  clearFilter(filterName) {
    var _this$viewRef6;

    return (_this$viewRef6 = this.viewRef) === null || _this$viewRef6 === void 0 ? void 0 : _this$viewRef6.clearFilter(filterName);
  }

  clearSelection() {
    var _this$viewRef7;

    return (_this$viewRef7 = this.viewRef) === null || _this$viewRef7 === void 0 ? void 0 : _this$viewRef7.clearSelection();
  }

  clearSorting() {
    var _this$viewRef8;

    return (_this$viewRef8 = this.viewRef) === null || _this$viewRef8 === void 0 ? void 0 : _this$viewRef8.clearSorting();
  }

  closeEditCell() {
    var _this$viewRef9;

    return (_this$viewRef9 = this.viewRef) === null || _this$viewRef9 === void 0 ? void 0 : _this$viewRef9.closeEditCell();
  }

  collapseAdaptiveDetailRow() {
    var _this$viewRef10;

    return (_this$viewRef10 = this.viewRef) === null || _this$viewRef10 === void 0 ? void 0 : _this$viewRef10.collapseAdaptiveDetailRow();
  }

  columnCount() {
    var _this$viewRef11;

    return (_this$viewRef11 = this.viewRef) === null || _this$viewRef11 === void 0 ? void 0 : _this$viewRef11.columnCount();
  }

  columnOption(id, optionName, optionValue) {
    var _this$viewRef12;

    return (_this$viewRef12 = this.viewRef) === null || _this$viewRef12 === void 0 ? void 0 : _this$viewRef12.columnOption(id, optionName, optionValue);
  }

  deleteColumn(id) {
    var _this$viewRef13;

    return (_this$viewRef13 = this.viewRef) === null || _this$viewRef13 === void 0 ? void 0 : _this$viewRef13.deleteColumn(id);
  }

  deleteRow(rowIndex) {
    var _this$viewRef14;

    return (_this$viewRef14 = this.viewRef) === null || _this$viewRef14 === void 0 ? void 0 : _this$viewRef14.deleteRow(rowIndex);
  }

  deselectAll() {
    var _this$viewRef15;

    return (_this$viewRef15 = this.viewRef) === null || _this$viewRef15 === void 0 ? void 0 : _this$viewRef15.deselectAll();
  }

  deselectRows(keys) {
    var _this$viewRef16;

    return (_this$viewRef16 = this.viewRef) === null || _this$viewRef16 === void 0 ? void 0 : _this$viewRef16.deselectRows(keys);
  }

  editCell(rowIndex, dataFieldColumnIndex) {
    var _this$viewRef17;

    return (_this$viewRef17 = this.viewRef) === null || _this$viewRef17 === void 0 ? void 0 : _this$viewRef17.editCell(rowIndex, dataFieldColumnIndex);
  }

  editRow(rowIndex) {
    var _this$viewRef18;

    return (_this$viewRef18 = this.viewRef) === null || _this$viewRef18 === void 0 ? void 0 : _this$viewRef18.editRow(rowIndex);
  }

  endCustomLoading() {
    var _this$viewRef19;

    return (_this$viewRef19 = this.viewRef) === null || _this$viewRef19 === void 0 ? void 0 : _this$viewRef19.endCustomLoading();
  }

  expandAdaptiveDetailRow(key) {
    var _this$viewRef20;

    return (_this$viewRef20 = this.viewRef) === null || _this$viewRef20 === void 0 ? void 0 : _this$viewRef20.expandAdaptiveDetailRow(key);
  }

  filter(filterExpr) {
    var _this$viewRef21;

    return (_this$viewRef21 = this.viewRef) === null || _this$viewRef21 === void 0 ? void 0 : _this$viewRef21.filter(filterExpr);
  }

  focus(element) {
    var _this$viewRef22;

    return (_this$viewRef22 = this.viewRef) === null || _this$viewRef22 === void 0 ? void 0 : _this$viewRef22.focus(this._patchElementParam(element));
  }

  getCellElement(rowIndex, dataField) {
    var _this$viewRef23;

    return (_this$viewRef23 = this.viewRef) === null || _this$viewRef23 === void 0 ? void 0 : _this$viewRef23.getCellElement(rowIndex, dataField);
  }

  getCombinedFilter(returnDataField) {
    var _this$viewRef24;

    return (_this$viewRef24 = this.viewRef) === null || _this$viewRef24 === void 0 ? void 0 : _this$viewRef24.getCombinedFilter(returnDataField);
  }

  getDataSource() {
    var _this$viewRef25;

    return (_this$viewRef25 = this.viewRef) === null || _this$viewRef25 === void 0 ? void 0 : _this$viewRef25.getDataSource();
  }

  getKeyByRowIndex(rowIndex) {
    var _this$viewRef26;

    return (_this$viewRef26 = this.viewRef) === null || _this$viewRef26 === void 0 ? void 0 : _this$viewRef26.getKeyByRowIndex(rowIndex);
  }

  getRowElement(rowIndex) {
    var _this$viewRef27;

    return (_this$viewRef27 = this.viewRef) === null || _this$viewRef27 === void 0 ? void 0 : _this$viewRef27.getRowElement(rowIndex);
  }

  getRowIndexByKey(key) {
    var _this$viewRef28;

    return (_this$viewRef28 = this.viewRef) === null || _this$viewRef28 === void 0 ? void 0 : _this$viewRef28.getRowIndexByKey(key);
  }

  getScrollable() {
    var _this$viewRef29;

    return (_this$viewRef29 = this.viewRef) === null || _this$viewRef29 === void 0 ? void 0 : _this$viewRef29.getScrollable();
  }

  getVisibleColumnIndex(id) {
    var _this$viewRef30;

    return (_this$viewRef30 = this.viewRef) === null || _this$viewRef30 === void 0 ? void 0 : _this$viewRef30.getVisibleColumnIndex(id);
  }

  hasEditData() {
    var _this$viewRef31;

    return (_this$viewRef31 = this.viewRef) === null || _this$viewRef31 === void 0 ? void 0 : _this$viewRef31.hasEditData();
  }

  hideColumnChooser() {
    var _this$viewRef32;

    return (_this$viewRef32 = this.viewRef) === null || _this$viewRef32 === void 0 ? void 0 : _this$viewRef32.hideColumnChooser();
  }

  isAdaptiveDetailRowExpanded(key) {
    var _this$viewRef33;

    return (_this$viewRef33 = this.viewRef) === null || _this$viewRef33 === void 0 ? void 0 : _this$viewRef33.isAdaptiveDetailRowExpanded(key);
  }

  isRowFocused(key) {
    var _this$viewRef34;

    return (_this$viewRef34 = this.viewRef) === null || _this$viewRef34 === void 0 ? void 0 : _this$viewRef34.isRowFocused(key);
  }

  isRowSelected(key) {
    var _this$viewRef35;

    return (_this$viewRef35 = this.viewRef) === null || _this$viewRef35 === void 0 ? void 0 : _this$viewRef35.isRowSelected(key);
  }

  keyOf(obj) {
    var _this$viewRef36;

    return (_this$viewRef36 = this.viewRef) === null || _this$viewRef36 === void 0 ? void 0 : _this$viewRef36.keyOf(obj);
  }

  navigateToRow(key) {
    var _this$viewRef37;

    return (_this$viewRef37 = this.viewRef) === null || _this$viewRef37 === void 0 ? void 0 : _this$viewRef37.navigateToRow(key);
  }

  pageCount() {
    var _this$viewRef38;

    return (_this$viewRef38 = this.viewRef) === null || _this$viewRef38 === void 0 ? void 0 : _this$viewRef38.pageCount();
  }

  pageIndex(newIndex) {
    var _this$viewRef39;

    return (_this$viewRef39 = this.viewRef) === null || _this$viewRef39 === void 0 ? void 0 : _this$viewRef39.pageIndex(newIndex);
  }

  pageSize(value) {
    var _this$viewRef40;

    return (_this$viewRef40 = this.viewRef) === null || _this$viewRef40 === void 0 ? void 0 : _this$viewRef40.pageSize(value);
  }

  refresh(changesOnly) {
    var _this$viewRef41;

    return (_this$viewRef41 = this.viewRef) === null || _this$viewRef41 === void 0 ? void 0 : _this$viewRef41.refresh(changesOnly);
  }

  repaintRows(rowIndexes) {
    var _this$viewRef42;

    return (_this$viewRef42 = this.viewRef) === null || _this$viewRef42 === void 0 ? void 0 : _this$viewRef42.repaintRows(rowIndexes);
  }

  saveEditData() {
    var _this$viewRef43;

    return (_this$viewRef43 = this.viewRef) === null || _this$viewRef43 === void 0 ? void 0 : _this$viewRef43.saveEditData();
  }

  searchByText(text) {
    var _this$viewRef44;

    return (_this$viewRef44 = this.viewRef) === null || _this$viewRef44 === void 0 ? void 0 : _this$viewRef44.searchByText(text);
  }

  selectAll() {
    var _this$viewRef45;

    return (_this$viewRef45 = this.viewRef) === null || _this$viewRef45 === void 0 ? void 0 : _this$viewRef45.selectAll();
  }

  selectRows(keys, preserve) {
    var _this$viewRef46;

    return (_this$viewRef46 = this.viewRef) === null || _this$viewRef46 === void 0 ? void 0 : _this$viewRef46.selectRows(keys, preserve);
  }

  selectRowsByIndexes(indexes) {
    var _this$viewRef47;

    return (_this$viewRef47 = this.viewRef) === null || _this$viewRef47 === void 0 ? void 0 : _this$viewRef47.selectRowsByIndexes(indexes);
  }

  showColumnChooser() {
    var _this$viewRef48;

    return (_this$viewRef48 = this.viewRef) === null || _this$viewRef48 === void 0 ? void 0 : _this$viewRef48.showColumnChooser();
  }

  undeleteRow(rowIndex) {
    var _this$viewRef49;

    return (_this$viewRef49 = this.viewRef) === null || _this$viewRef49 === void 0 ? void 0 : _this$viewRef49.undeleteRow(rowIndex);
  }

  updateDimensions() {
    var _this$viewRef50;

    return (_this$viewRef50 = this.viewRef) === null || _this$viewRef50 === void 0 ? void 0 : _this$viewRef50.updateDimensions();
  }

  resize() {
    var _this$viewRef51;

    return (_this$viewRef51 = this.viewRef) === null || _this$viewRef51 === void 0 ? void 0 : _this$viewRef51.resize();
  }

  addColumn(columnOptions) {
    var _this$viewRef52;

    return (_this$viewRef52 = this.viewRef) === null || _this$viewRef52 === void 0 ? void 0 : _this$viewRef52.addColumn(columnOptions);
  }

  addRow() {
    var _this$viewRef53;

    return (_this$viewRef53 = this.viewRef) === null || _this$viewRef53 === void 0 ? void 0 : _this$viewRef53.addRow();
  }

  clearGrouping() {
    var _this$viewRef54;

    return (_this$viewRef54 = this.viewRef) === null || _this$viewRef54 === void 0 ? void 0 : _this$viewRef54.clearGrouping();
  }

  collapseAll(groupIndex) {
    var _this$viewRef55;

    return (_this$viewRef55 = this.viewRef) === null || _this$viewRef55 === void 0 ? void 0 : _this$viewRef55.collapseAll(groupIndex);
  }

  collapseRow(key) {
    var _this$viewRef56;

    return (_this$viewRef56 = this.viewRef) === null || _this$viewRef56 === void 0 ? void 0 : _this$viewRef56.collapseRow(key);
  }

  expandAll(groupIndex) {
    var _this$viewRef57;

    return (_this$viewRef57 = this.viewRef) === null || _this$viewRef57 === void 0 ? void 0 : _this$viewRef57.expandAll(groupIndex);
  }

  expandRow(key) {
    var _this$viewRef58;

    return (_this$viewRef58 = this.viewRef) === null || _this$viewRef58 === void 0 ? void 0 : _this$viewRef58.expandRow(key);
  }

  exportToExcel(selectionOnly) {
    var _this$viewRef59;

    return (_this$viewRef59 = this.viewRef) === null || _this$viewRef59 === void 0 ? void 0 : _this$viewRef59.exportToExcel(selectionOnly);
  }

  getSelectedRowKeys() {
    var _this$viewRef60;

    return (_this$viewRef60 = this.viewRef) === null || _this$viewRef60 === void 0 ? void 0 : _this$viewRef60.getSelectedRowKeys();
  }

  getSelectedRowsData() {
    var _this$viewRef61;

    return (_this$viewRef61 = this.viewRef) === null || _this$viewRef61 === void 0 ? void 0 : _this$viewRef61.getSelectedRowsData();
  }

  getTotalSummaryValue(summaryItemName) {
    var _this$viewRef62;

    return (_this$viewRef62 = this.viewRef) === null || _this$viewRef62 === void 0 ? void 0 : _this$viewRef62.getTotalSummaryValue(summaryItemName);
  }

  getVisibleColumns(headerLevel) {
    var _this$viewRef63;

    return (_this$viewRef63 = this.viewRef) === null || _this$viewRef63 === void 0 ? void 0 : _this$viewRef63.getVisibleColumns(headerLevel);
  }

  getVisibleRows() {
    var _this$viewRef64;

    return (_this$viewRef64 = this.viewRef) === null || _this$viewRef64 === void 0 ? void 0 : _this$viewRef64.getVisibleRows();
  }

  isRowExpanded(key) {
    var _this$viewRef65;

    return (_this$viewRef65 = this.viewRef) === null || _this$viewRef65 === void 0 ? void 0 : _this$viewRef65.isRowExpanded(key);
  }

  totalCount() {
    var _this$viewRef66;

    return (_this$viewRef66 = this.viewRef) === null || _this$viewRef66 === void 0 ? void 0 : _this$viewRef66.totalCount();
  }

  isScrollbarVisible() {
    var _this$viewRef67;

    return (_this$viewRef67 = this.viewRef) === null || _this$viewRef67 === void 0 ? void 0 : _this$viewRef67.isScrollbarVisible();
  }

  getTopVisibleRowData() {
    var _this$viewRef68;

    return (_this$viewRef68 = this.viewRef) === null || _this$viewRef68 === void 0 ? void 0 : _this$viewRef68.getTopVisibleRowData();
  }

  getScrollbarWidth(isHorizontal) {
    var _this$viewRef69;

    return (_this$viewRef69 = this.viewRef) === null || _this$viewRef69 === void 0 ? void 0 : _this$viewRef69.getScrollbarWidth(isHorizontal);
  }

  _getActionConfigs() {
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
  }

  get _propsInfo() {
    return {
      twoWay: [["filterValue", [], "filterValueChange"], ["focusedColumnIndex", -1, "focusedColumnIndexChange"], ["focusedRowIndex", -1, "focusedRowIndexChange"], ["focusedRowKey", null, "focusedRowKeyChange"], ["selectedRowKeys", [], "selectedRowKeysChange"], ["selectionFilter", [], "selectionFilterChange"]],
      allowNull: ["defaultFocusedRowKey", "focusedRowKey"],
      elements: [],
      templates: ["rowTemplate"],
      props: ["columns", "editing", "export", "groupPanel", "grouping", "masterDetail", "scrolling", "selection", "sortByGroupSummaryInfo", "summary", "columnChooser", "columnFixing", "filterPanel", "filterRow", "headerFilter", "useKeyboard", "keyboardNavigation", "loadPanel", "pager", "paging", "rowDragging", "searchPanel", "sorting", "stateStoring", "rowTemplate", "customizeColumns", "customizeExportData", "keyExpr", "remoteOperations", "allowColumnReordering", "allowColumnResizing", "autoNavigateToFocusedRow", "cacheEnabled", "cellHintEnabled", "columnAutoWidth", "columnHidingEnabled", "columnMinWidth", "columnResizingMode", "columnWidth", "dataSource", "dateSerializationFormat", "errorRowEnabled", "filterBuilder", "filterBuilderPopup", "filterSyncEnabled", "focusedRowEnabled", "highlightChanges", "noDataText", "renderAsync", "repaintChangesOnly", "rowAlternationEnabled", "showBorders", "showColumnHeaders", "showColumnLines", "showRowLines", "twoWayBindingEnabled", "wordWrapEnabled", "loadingTimeout", "commonColumnSettings", "onCellClick", "onCellDblClick", "onCellHoverChanged", "onCellPrepared", "onContextMenuPreparing", "onEditingStart", "onEditorPrepared", "onEditorPreparing", "onExported", "onExporting", "onFileSaving", "onFocusedCellChanged", "onFocusedCellChanging", "onFocusedRowChanged", "onFocusedRowChanging", "onRowClick", "onRowDblClick", "onRowPrepared", "onAdaptiveDetailRowPreparing", "onDataErrorOccurred", "onInitNewRow", "onKeyDown", "onRowCollapsed", "onRowCollapsing", "onRowExpanded", "onRowExpanding", "onRowInserted", "onRowInserting", "onRowRemoved", "onRowRemoving", "onRowUpdated", "onRowUpdating", "onRowValidating", "onSelectionChanged", "onToolbarPreparing", "defaultFilterValue", "filterValueChange", "defaultFocusedColumnIndex", "focusedColumnIndexChange", "defaultFocusedRowIndex", "focusedRowIndexChange", "defaultFocusedRowKey", "focusedRowKeyChange", "defaultSelectedRowKeys", "selectedRowKeysChange", "defaultSelectionFilter", "selectionFilterChange", "accessKey", "activeStateEnabled", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "onClick", "onContentReady", "rtlEnabled", "tabIndex", "visible", "width", "filterValue", "focusedColumnIndex", "focusedRowIndex", "focusedRowKey", "selectedRowKeys", "selectionFilter"]
    };
  }

  get _viewComponent() {
    return DataGridComponent;
  }

}
registerComponent("dxDataGrid", DataGrid);
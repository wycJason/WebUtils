import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["onOptionChanged"],
    _excluded2 = ["accessKey", "activeStateEnabled", "allowColumnReordering", "allowColumnResizing", "autoNavigateToFocusedRow", "cacheEnabled", "cellHintEnabled", "columnAutoWidth", "columnChooser", "columnFixing", "columnHidingEnabled", "columnMinWidth", "columnResizingMode", "columnWidth", "columns", "commonColumnSettings", "customizeColumns", "customizeExportData", "dataSource", "dateSerializationFormat", "defaultFilterValue", "defaultFocusedColumnIndex", "defaultFocusedRowIndex", "defaultFocusedRowKey", "defaultSelectedRowKeys", "defaultSelectionFilter", "disabled", "editing", "errorRowEnabled", "export", "filterBuilder", "filterBuilderPopup", "filterPanel", "filterRow", "filterSyncEnabled", "filterValue", "filterValueChange", "focusStateEnabled", "focusedColumnIndex", "focusedColumnIndexChange", "focusedRowEnabled", "focusedRowIndex", "focusedRowIndexChange", "focusedRowKey", "focusedRowKeyChange", "groupPanel", "grouping", "headerFilter", "height", "highlightChanges", "hint", "hoverStateEnabled", "keyExpr", "keyboardNavigation", "loadPanel", "loadingTimeout", "masterDetail", "noDataText", "onAdaptiveDetailRowPreparing", "onCellClick", "onCellDblClick", "onCellHoverChanged", "onCellPrepared", "onClick", "onContentReady", "onContextMenuPreparing", "onDataErrorOccurred", "onEditingStart", "onEditorPrepared", "onEditorPreparing", "onExported", "onExporting", "onFileSaving", "onFocusedCellChanged", "onFocusedCellChanging", "onFocusedRowChanged", "onFocusedRowChanging", "onInitNewRow", "onKeyDown", "onRowClick", "onRowCollapsed", "onRowCollapsing", "onRowDblClick", "onRowExpanded", "onRowExpanding", "onRowInserted", "onRowInserting", "onRowPrepared", "onRowRemoved", "onRowRemoving", "onRowUpdated", "onRowUpdating", "onRowValidating", "onSelectionChanged", "onToolbarPreparing", "pager", "paging", "remoteOperations", "renderAsync", "repaintChangesOnly", "rowAlternationEnabled", "rowDragging", "rowTemplate", "rtlEnabled", "scrolling", "searchPanel", "selectedRowKeys", "selectedRowKeysChange", "selection", "selectionFilter", "selectionFilterChange", "showBorders", "showColumnHeaders", "showColumnLines", "showRowLines", "sortByGroupSummaryInfo", "sorting", "stateStoring", "summary", "tabIndex", "twoWayBindingEnabled", "useKeyboard", "visible", "width", "wordWrapEnabled"];
import { createComponentVNode, normalizeProps } from "inferno";
import { InfernoEffect, InfernoWrapperComponent } from "@devextreme/vdom";
import { DataGridProps } from "./common/data_grid_props";
import "../../../../ui/data_grid/ui.data_grid";
import { Widget } from "../../common/widget";
import { DataGridComponent } from "./datagrid_component";
import { DataGridViews } from "./data_grid_views";
import { getUpdatedOptions } from "./utils/get_updated_options";
var aria = {
  role: "presentation"
};
var rowSelector = ".dx-row";
export var viewFunction = _ref => {
  var {
    instance,
    onDimensionChanged,
    onHoverEnd,
    onHoverStart,
    props: {
      accessKey,
      activeStateEnabled,
      disabled,
      focusStateEnabled,
      height,
      hint,
      hoverStateEnabled,
      onContentReady,
      rtlEnabled,
      showBorders,
      tabIndex,
      visible,
      width
    },
    restAttributes,
    widgetElementRef
  } = _ref;
  return normalizeProps(createComponentVNode(2, Widget, _extends({
    "rootElementRef": widgetElementRef,
    "accessKey": accessKey,
    "activeStateEnabled": activeStateEnabled,
    "activeStateUnit": rowSelector,
    "aria": aria,
    "disabled": disabled,
    "focusStateEnabled": focusStateEnabled,
    "height": height,
    "hint": hint,
    "hoverStateEnabled": hoverStateEnabled,
    "onContentReady": onContentReady,
    "rtlEnabled": rtlEnabled,
    "tabIndex": tabIndex,
    "visible": visible,
    "width": width,
    "onHoverStart": onHoverStart,
    "onHoverEnd": onHoverEnd,
    "onDimensionChanged": onDimensionChanged
  }, restAttributes, {
    children: createComponentVNode(2, DataGridViews, {
      "instance": instance,
      "showBorders": showBorders
    })
  })));
};
import { createRef as infernoCreateRef } from "inferno";

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class DataGrid extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this._currentState = null;
    this.widgetElementRef = infernoCreateRef();
    this.isTwoWayPropUpdating = false;
    this.state = {
      instance: undefined,
      filterValue: this.props.filterValue !== undefined ? this.props.filterValue : this.props.defaultFilterValue,
      focusedColumnIndex: this.props.focusedColumnIndex !== undefined ? this.props.focusedColumnIndex : this.props.defaultFocusedColumnIndex,
      focusedRowIndex: this.props.focusedRowIndex !== undefined ? this.props.focusedRowIndex : this.props.defaultFocusedRowIndex,
      focusedRowKey: this.props.focusedRowKey !== undefined ? this.props.focusedRowKey : this.props.defaultFocusedRowKey,
      selectedRowKeys: this.props.selectedRowKeys !== undefined ? this.props.selectedRowKeys : this.props.defaultSelectedRowKeys,
      selectionFilter: this.props.selectionFilter !== undefined ? this.props.selectionFilter : this.props.defaultSelectionFilter
    };
    this.getComponentInstance = this.getComponentInstance.bind(this);
    this.beginCustomLoading = this.beginCustomLoading.bind(this);
    this.byKey = this.byKey.bind(this);
    this.cancelEditData = this.cancelEditData.bind(this);
    this.cellValue = this.cellValue.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
    this.clearSorting = this.clearSorting.bind(this);
    this.closeEditCell = this.closeEditCell.bind(this);
    this.collapseAdaptiveDetailRow = this.collapseAdaptiveDetailRow.bind(this);
    this.columnCount = this.columnCount.bind(this);
    this.callMethod = this.callMethod.bind(this);
    this.columnOption = this.columnOption.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.deselectAll = this.deselectAll.bind(this);
    this.deselectRows = this.deselectRows.bind(this);
    this.editCell = this.editCell.bind(this);
    this.editRow = this.editRow.bind(this);
    this.endCustomLoading = this.endCustomLoading.bind(this);
    this.expandAdaptiveDetailRow = this.expandAdaptiveDetailRow.bind(this);
    this.filter = this.filter.bind(this);
    this.focus = this.focus.bind(this);
    this.getCellElement = this.getCellElement.bind(this);
    this.getCombinedFilter = this.getCombinedFilter.bind(this);
    this.getDataSource = this.getDataSource.bind(this);
    this.getKeyByRowIndex = this.getKeyByRowIndex.bind(this);
    this.getRowElement = this.getRowElement.bind(this);
    this.getRowIndexByKey = this.getRowIndexByKey.bind(this);
    this.getScrollable = this.getScrollable.bind(this);
    this.getVisibleColumnIndex = this.getVisibleColumnIndex.bind(this);
    this.hasEditData = this.hasEditData.bind(this);
    this.hideColumnChooser = this.hideColumnChooser.bind(this);
    this.isAdaptiveDetailRowExpanded = this.isAdaptiveDetailRowExpanded.bind(this);
    this.isRowFocused = this.isRowFocused.bind(this);
    this.isRowSelected = this.isRowSelected.bind(this);
    this.keyOf = this.keyOf.bind(this);
    this.navigateToRow = this.navigateToRow.bind(this);
    this.pageCount = this.pageCount.bind(this);
    this.pageIndex = this.pageIndex.bind(this);
    this.pageSize = this.pageSize.bind(this);
    this.refresh = this.refresh.bind(this);
    this.repaintRows = this.repaintRows.bind(this);
    this.saveEditData = this.saveEditData.bind(this);
    this.searchByText = this.searchByText.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.selectRows = this.selectRows.bind(this);
    this.selectRowsByIndexes = this.selectRowsByIndexes.bind(this);
    this.showColumnChooser = this.showColumnChooser.bind(this);
    this.undeleteRow = this.undeleteRow.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.resize = this.resize.bind(this);
    this.addColumn = this.addColumn.bind(this);
    this.addRow = this.addRow.bind(this);
    this.clearGrouping = this.clearGrouping.bind(this);
    this.collapseAll = this.collapseAll.bind(this);
    this.collapseRow = this.collapseRow.bind(this);
    this.expandAll = this.expandAll.bind(this);
    this.expandRow = this.expandRow.bind(this);
    this.exportToExcel = this.exportToExcel.bind(this);
    this.getSelectedRowKeys = this.getSelectedRowKeys.bind(this);
    this.getSelectedRowsData = this.getSelectedRowsData.bind(this);
    this.getTotalSummaryValue = this.getTotalSummaryValue.bind(this);
    this.getVisibleColumns = this.getVisibleColumns.bind(this);
    this.getVisibleRows = this.getVisibleRows.bind(this);
    this.isRowExpanded = this.isRowExpanded.bind(this);
    this.totalCount = this.totalCount.bind(this);
    this.isScrollbarVisible = this.isScrollbarVisible.bind(this);
    this.getTopVisibleRowData = this.getTopVisibleRowData.bind(this);
    this.getScrollbarWidth = this.getScrollbarWidth.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.dispose = this.dispose.bind(this);
    this.initInstanceElement = this.initInstanceElement.bind(this);
    this.subscribeOptionChanged = this.subscribeOptionChanged.bind(this);
    this.instanceOptionChangedHandler = this.instanceOptionChangedHandler.bind(this);
    this.updateTwoWayValue = this.updateTwoWayValue.bind(this);
    this.onHoverStart = this.onHoverStart.bind(this);
    this.onHoverEnd = this.onHoverEnd.bind(this);
    this.onDimensionChanged = this.onDimensionChanged.bind(this);
    this.normalizeProps = this.normalizeProps.bind(this);
    this.createInstance = this.createInstance.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.updateOptions, [this.instance, this.props, this.__state_filterValue, this.__state_focusedColumnIndex, this.__state_focusedRowIndex, this.__state_focusedRowKey, this.__state_selectedRowKeys, this.__state_selectionFilter]), new InfernoEffect(this.dispose, []), new InfernoEffect(this.initInstanceElement, []), new InfernoEffect(this.subscribeOptionChanged, [this.instance, this.props.editing, this.props.searchPanel, this.props.focusedRowKeyChange, this.props.focusedRowIndexChange, this.props.focusedColumnIndexChange, this.props.filterValueChange, this.props.selectedRowKeysChange, this.props.selectionFilterChange])];
  }

  updateEffects() {
    var _this$_effects$, _this$_effects$2;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.instance, this.props, this.__state_filterValue, this.__state_focusedColumnIndex, this.__state_focusedRowIndex, this.__state_focusedRowKey, this.__state_selectedRowKeys, this.__state_selectionFilter]);
    (_this$_effects$2 = this._effects[3]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.instance, this.props.editing, this.props.searchPanel, this.props.focusedRowKeyChange, this.props.focusedRowIndexChange, this.props.focusedColumnIndexChange, this.props.filterValueChange, this.props.selectedRowKeysChange, this.props.selectionFilterChange]);
  }

  get instance() {
    var state = this._currentState || this.state;
    return state.instance;
  }

  set_instance(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        instance: newValue
      };
    });
  }

  get __state_filterValue() {
    var state = this._currentState || this.state;
    return this.props.filterValue !== undefined ? this.props.filterValue : state.filterValue;
  }

  set_filterValue(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this.props.filterValueChange(newValue);
      this._currentState = null;
      return {
        filterValue: newValue
      };
    });
  }

  get __state_focusedColumnIndex() {
    var state = this._currentState || this.state;
    return this.props.focusedColumnIndex !== undefined ? this.props.focusedColumnIndex : state.focusedColumnIndex;
  }

  set_focusedColumnIndex(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this.props.focusedColumnIndexChange(newValue);
      this._currentState = null;
      return {
        focusedColumnIndex: newValue
      };
    });
  }

  get __state_focusedRowIndex() {
    var state = this._currentState || this.state;
    return this.props.focusedRowIndex !== undefined ? this.props.focusedRowIndex : state.focusedRowIndex;
  }

  set_focusedRowIndex(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this.props.focusedRowIndexChange(newValue);
      this._currentState = null;
      return {
        focusedRowIndex: newValue
      };
    });
  }

  get __state_focusedRowKey() {
    var state = this._currentState || this.state;
    return this.props.focusedRowKey !== undefined ? this.props.focusedRowKey : state.focusedRowKey;
  }

  set_focusedRowKey(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this.props.focusedRowKeyChange(newValue);
      this._currentState = null;
      return {
        focusedRowKey: newValue
      };
    });
  }

  get __state_selectedRowKeys() {
    var state = this._currentState || this.state;
    return this.props.selectedRowKeys !== undefined ? this.props.selectedRowKeys : state.selectedRowKeys;
  }

  set_selectedRowKeys(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this.props.selectedRowKeysChange(newValue);
      this._currentState = null;
      return {
        selectedRowKeys: newValue
      };
    });
  }

  get __state_selectionFilter() {
    var state = this._currentState || this.state;
    return this.props.selectionFilter !== undefined ? this.props.selectionFilter : state.selectionFilter;
  }

  set_selectionFilter(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this.props.selectionFilterChange(newValue);
      this._currentState = null;
      return {
        selectionFilter: newValue
      };
    });
  }

  updateOptions() {
    if (this.instance && this.prevProps && !this.isTwoWayPropUpdating) {
      var updatedOptions = getUpdatedOptions(this.prevProps, _extends({}, this.props, {
        filterValue: this.__state_filterValue,
        focusedColumnIndex: this.__state_focusedColumnIndex,
        focusedRowIndex: this.__state_focusedRowIndex,
        focusedRowKey: this.__state_focusedRowKey,
        selectedRowKeys: this.__state_selectedRowKeys,
        selectionFilter: this.__state_selectionFilter
      }));
      this.instance.beginUpdate();
      updatedOptions.forEach(_ref2 => {
        var {
          path,
          previousValue,
          value
        } = _ref2;

        this.instance._options.silent(path, previousValue);

        this.instance.option(path, value);
      });
      this.prevProps = _extends({}, this.props, {
        filterValue: this.__state_filterValue,
        focusedColumnIndex: this.__state_focusedColumnIndex,
        focusedRowIndex: this.__state_focusedRowIndex,
        focusedRowKey: this.__state_focusedRowKey,
        selectedRowKeys: this.__state_selectedRowKeys,
        selectionFilter: this.__state_selectionFilter
      });
      this.instance.endUpdate();
    } else {
      this.prevProps = _extends({}, this.props, {
        filterValue: this.__state_filterValue,
        focusedColumnIndex: this.__state_focusedColumnIndex,
        focusedRowIndex: this.__state_focusedRowIndex,
        focusedRowKey: this.__state_focusedRowKey,
        selectedRowKeys: this.__state_selectedRowKeys,
        selectionFilter: this.__state_selectionFilter
      });
    }
  }

  dispose() {
    return () => {
      this.instance.dispose();
    };
  }

  initInstanceElement() {
    this.set_instance(() => this.createInstance());
  }

  subscribeOptionChanged() {
    var _this$instance;

    (_this$instance = this.instance) === null || _this$instance === void 0 ? void 0 : _this$instance.on("optionChanged", this.instanceOptionChangedHandler.bind(this));
  }

  callMethod(funcName, args) {
    var _this$instance2;

    var normalizedArgs = [...args].filter(arg => arg !== undefined);
    return (_this$instance2 = this.instance) === null || _this$instance2 === void 0 ? void 0 : _this$instance2[funcName](...normalizedArgs);
  }

  instanceOptionChangedHandler(e) {
    try {
      this.isTwoWayPropUpdating = true;
      this.updateTwoWayValue(e);
    } finally {
      this.isTwoWayPropUpdating = false;
    }
  }

  updateTwoWayValue(e) {
    var isValueCorrect = e.value === e.component.option(e.fullName);

    if (e.value !== e.previousValue && isValueCorrect) {
      if (e.name === "editing" && this.props.editing) {
        if (e.fullName === "editing.changes") {
          this.props.editing.changes = e.value;
        }

        if (e.fullName === "editing.editRowKey") {
          this.props.editing.editRowKey = e.value;
        }

        if (e.fullName === "editing.editColumnName") {
          this.props.editing.editColumnName = e.value;
        }
      }

      if (e.fullName === "searchPanel.text" && this.props.searchPanel) {
        this.props.searchPanel.text = e.value;
      }

      if (e.fullName === "focusedRowKey") {
        this.set_focusedRowKey(() => e.value);
      }

      if (e.fullName === "focusedRowIndex") {
        this.set_focusedRowIndex(() => e.value);
      }

      if (e.fullName === "focusedColumnIndex") {
        this.set_focusedColumnIndex(() => e.value);
      }

      if (e.fullName === "filterValue") {
        this.set_filterValue(() => e.value);
      }

      if (e.fullName === "selectedRowKeys") {
        this.set_selectedRowKeys(() => e.value);
      }

      if (e.fullName === "selectionFilter") {
        this.set_selectionFilter(() => e.value);
      }
    }
  }

  onHoverStart(event) {
    event.currentTarget.classList.add("dx-state-hover");
  }

  onHoverEnd(event) {
    event.currentTarget.classList.remove("dx-state-hover");
  }

  onDimensionChanged() {
    var _this$instance3;

    (_this$instance3 = this.instance) === null || _this$instance3 === void 0 ? void 0 : _this$instance3.updateDimensions(true);
  }

  normalizeProps(props) {
    var result = {};
    Object.keys(props).forEach(key => {
      if (_extends({}, this.props, {
        filterValue: this.__state_filterValue,
        focusedColumnIndex: this.__state_focusedColumnIndex,
        focusedRowIndex: this.__state_focusedRowIndex,
        focusedRowKey: this.__state_focusedRowKey,
        selectedRowKeys: this.__state_selectedRowKeys,
        selectionFilter: this.__state_selectionFilter
      })[key] !== undefined) {
        result[key] = props[key];
      }
    });
    return result;
  }

  createInstance() {
    var _this$widgetElementRe;

    var element = (_this$widgetElementRe = this.widgetElementRef) === null || _this$widgetElementRe === void 0 ? void 0 : _this$widgetElementRe.current;

    var _this$props$filterVal = _extends({}, this.props, {
      filterValue: this.__state_filterValue,
      focusedColumnIndex: this.__state_focusedColumnIndex,
      focusedRowIndex: this.__state_focusedRowIndex,
      focusedRowKey: this.__state_focusedRowKey,
      selectedRowKeys: this.__state_selectedRowKeys,
      selectionFilter: this.__state_selectionFilter
    }),
        restProps = _objectWithoutPropertiesLoose(_this$props$filterVal, _excluded);

    var instance = new DataGridComponent(element, this.normalizeProps(restProps));
    instance.getController("resizing").updateSize(element);
    return instance;
  }

  get restAttributes() {
    var _this$props$filterVal2 = _extends({}, this.props, {
      filterValue: this.__state_filterValue,
      focusedColumnIndex: this.__state_focusedColumnIndex,
      focusedRowIndex: this.__state_focusedRowIndex,
      focusedRowKey: this.__state_focusedRowKey,
      selectedRowKeys: this.__state_selectedRowKeys,
      selectionFilter: this.__state_selectionFilter
    }),
        restProps = _objectWithoutPropertiesLoose(_this$props$filterVal2, _excluded2);

    return restProps;
  }

  getComponentInstance() {
    return this.instance;
  }

  beginCustomLoading(messageText) {
    var _this$instance4;

    return (_this$instance4 = this.instance) === null || _this$instance4 === void 0 ? void 0 : _this$instance4.beginCustomLoading(messageText);
  }

  byKey(key) {
    var _this$instance5;

    return (_this$instance5 = this.instance) === null || _this$instance5 === void 0 ? void 0 : _this$instance5.byKey(key);
  }

  cancelEditData() {
    var _this$instance6;

    return (_this$instance6 = this.instance) === null || _this$instance6 === void 0 ? void 0 : _this$instance6.cancelEditData();
  }

  cellValue(rowIndex, dataField, value) {
    var _this$instance7;

    return (_this$instance7 = this.instance) === null || _this$instance7 === void 0 ? void 0 : _this$instance7.cellValue(rowIndex, dataField, value);
  }

  clearFilter(filterName) {
    var _this$instance8;

    return (_this$instance8 = this.instance) === null || _this$instance8 === void 0 ? void 0 : _this$instance8.clearFilter(filterName);
  }

  clearSelection() {
    var _this$instance9;

    return (_this$instance9 = this.instance) === null || _this$instance9 === void 0 ? void 0 : _this$instance9.clearSelection();
  }

  clearSorting() {
    var _this$instance10;

    return (_this$instance10 = this.instance) === null || _this$instance10 === void 0 ? void 0 : _this$instance10.clearSorting();
  }

  closeEditCell() {
    var _this$instance11;

    return (_this$instance11 = this.instance) === null || _this$instance11 === void 0 ? void 0 : _this$instance11.closeEditCell();
  }

  collapseAdaptiveDetailRow() {
    var _this$instance12;

    return (_this$instance12 = this.instance) === null || _this$instance12 === void 0 ? void 0 : _this$instance12.collapseAdaptiveDetailRow();
  }

  columnCount() {
    var _this$instance13;

    return (_this$instance13 = this.instance) === null || _this$instance13 === void 0 ? void 0 : _this$instance13.columnCount();
  }

  columnOption(id, optionName, optionValue) {
    return this.callMethod("columnOption", arguments);
  }

  deleteColumn(id) {
    var _this$instance14;

    return (_this$instance14 = this.instance) === null || _this$instance14 === void 0 ? void 0 : _this$instance14.deleteColumn(id);
  }

  deleteRow(rowIndex) {
    var _this$instance15;

    return (_this$instance15 = this.instance) === null || _this$instance15 === void 0 ? void 0 : _this$instance15.deleteRow(rowIndex);
  }

  deselectAll() {
    var _this$instance16;

    return (_this$instance16 = this.instance) === null || _this$instance16 === void 0 ? void 0 : _this$instance16.deselectAll();
  }

  deselectRows(keys) {
    var _this$instance17;

    return (_this$instance17 = this.instance) === null || _this$instance17 === void 0 ? void 0 : _this$instance17.deselectRows(keys);
  }

  editCell(rowIndex, dataFieldColumnIndex) {
    var _this$instance18;

    return (_this$instance18 = this.instance) === null || _this$instance18 === void 0 ? void 0 : _this$instance18.editCell(rowIndex, dataFieldColumnIndex);
  }

  editRow(rowIndex) {
    var _this$instance19;

    return (_this$instance19 = this.instance) === null || _this$instance19 === void 0 ? void 0 : _this$instance19.editRow(rowIndex);
  }

  endCustomLoading() {
    var _this$instance20;

    return (_this$instance20 = this.instance) === null || _this$instance20 === void 0 ? void 0 : _this$instance20.endCustomLoading();
  }

  expandAdaptiveDetailRow(key) {
    var _this$instance21;

    return (_this$instance21 = this.instance) === null || _this$instance21 === void 0 ? void 0 : _this$instance21.expandAdaptiveDetailRow(key);
  }

  filter(filterExpr) {
    var _this$instance22;

    return (_this$instance22 = this.instance) === null || _this$instance22 === void 0 ? void 0 : _this$instance22.filter(filterExpr);
  }

  focus(element) {
    var _this$instance23;

    return (_this$instance23 = this.instance) === null || _this$instance23 === void 0 ? void 0 : _this$instance23.focus(element);
  }

  getCellElement(rowIndex, dataField) {
    var _this$instance24;

    return (_this$instance24 = this.instance) === null || _this$instance24 === void 0 ? void 0 : _this$instance24.getCellElement(rowIndex, dataField);
  }

  getCombinedFilter(returnDataField) {
    var _this$instance25;

    return (_this$instance25 = this.instance) === null || _this$instance25 === void 0 ? void 0 : _this$instance25.getCombinedFilter(returnDataField);
  }

  getDataSource() {
    var _this$instance26;

    return (_this$instance26 = this.instance) === null || _this$instance26 === void 0 ? void 0 : _this$instance26.getDataSource();
  }

  getKeyByRowIndex(rowIndex) {
    var _this$instance27;

    return (_this$instance27 = this.instance) === null || _this$instance27 === void 0 ? void 0 : _this$instance27.getKeyByRowIndex(rowIndex);
  }

  getRowElement(rowIndex) {
    var _this$instance28;

    return (_this$instance28 = this.instance) === null || _this$instance28 === void 0 ? void 0 : _this$instance28.getRowElement(rowIndex);
  }

  getRowIndexByKey(key) {
    var _this$instance29;

    return (_this$instance29 = this.instance) === null || _this$instance29 === void 0 ? void 0 : _this$instance29.getRowIndexByKey(key);
  }

  getScrollable() {
    var _this$instance30;

    return (_this$instance30 = this.instance) === null || _this$instance30 === void 0 ? void 0 : _this$instance30.getScrollable();
  }

  getVisibleColumnIndex(id) {
    var _this$instance31;

    return (_this$instance31 = this.instance) === null || _this$instance31 === void 0 ? void 0 : _this$instance31.getVisibleColumnIndex(id);
  }

  hasEditData() {
    var _this$instance32;

    return (_this$instance32 = this.instance) === null || _this$instance32 === void 0 ? void 0 : _this$instance32.hasEditData();
  }

  hideColumnChooser() {
    var _this$instance33;

    return (_this$instance33 = this.instance) === null || _this$instance33 === void 0 ? void 0 : _this$instance33.hideColumnChooser();
  }

  isAdaptiveDetailRowExpanded(key) {
    var _this$instance34;

    return (_this$instance34 = this.instance) === null || _this$instance34 === void 0 ? void 0 : _this$instance34.isAdaptiveDetailRowExpanded(key);
  }

  isRowFocused(key) {
    var _this$instance35;

    return (_this$instance35 = this.instance) === null || _this$instance35 === void 0 ? void 0 : _this$instance35.isRowFocused(key);
  }

  isRowSelected(key) {
    var _this$instance36;

    return (_this$instance36 = this.instance) === null || _this$instance36 === void 0 ? void 0 : _this$instance36.isRowSelected(key);
  }

  keyOf(obj) {
    var _this$instance37;

    return (_this$instance37 = this.instance) === null || _this$instance37 === void 0 ? void 0 : _this$instance37.keyOf(obj);
  }

  navigateToRow(key) {
    var _this$instance38;

    return (_this$instance38 = this.instance) === null || _this$instance38 === void 0 ? void 0 : _this$instance38.navigateToRow(key);
  }

  pageCount() {
    var _this$instance39;

    return (_this$instance39 = this.instance) === null || _this$instance39 === void 0 ? void 0 : _this$instance39.pageCount();
  }

  pageIndex(newIndex) {
    var _this$instance40;

    return (_this$instance40 = this.instance) === null || _this$instance40 === void 0 ? void 0 : _this$instance40.pageIndex(newIndex);
  }

  pageSize(value) {
    var _this$instance41;

    return (_this$instance41 = this.instance) === null || _this$instance41 === void 0 ? void 0 : _this$instance41.pageSize(value);
  }

  refresh(changesOnly) {
    var _this$instance42;

    return (_this$instance42 = this.instance) === null || _this$instance42 === void 0 ? void 0 : _this$instance42.refresh(changesOnly);
  }

  repaintRows(rowIndexes) {
    var _this$instance43;

    return (_this$instance43 = this.instance) === null || _this$instance43 === void 0 ? void 0 : _this$instance43.repaintRows(rowIndexes);
  }

  saveEditData() {
    var _this$instance44;

    return (_this$instance44 = this.instance) === null || _this$instance44 === void 0 ? void 0 : _this$instance44.saveEditData();
  }

  searchByText(text) {
    var _this$instance45;

    return (_this$instance45 = this.instance) === null || _this$instance45 === void 0 ? void 0 : _this$instance45.searchByText(text);
  }

  selectAll() {
    var _this$instance46;

    return (_this$instance46 = this.instance) === null || _this$instance46 === void 0 ? void 0 : _this$instance46.selectAll();
  }

  selectRows(keys, preserve) {
    var _this$instance47;

    return (_this$instance47 = this.instance) === null || _this$instance47 === void 0 ? void 0 : _this$instance47.selectRows(keys, preserve);
  }

  selectRowsByIndexes(indexes) {
    var _this$instance48;

    return (_this$instance48 = this.instance) === null || _this$instance48 === void 0 ? void 0 : _this$instance48.selectRowsByIndexes(indexes);
  }

  showColumnChooser() {
    var _this$instance49;

    return (_this$instance49 = this.instance) === null || _this$instance49 === void 0 ? void 0 : _this$instance49.showColumnChooser();
  }

  undeleteRow(rowIndex) {
    var _this$instance50;

    return (_this$instance50 = this.instance) === null || _this$instance50 === void 0 ? void 0 : _this$instance50.undeleteRow(rowIndex);
  }

  updateDimensions() {
    var _this$instance51;

    return (_this$instance51 = this.instance) === null || _this$instance51 === void 0 ? void 0 : _this$instance51.updateDimensions();
  }

  resize() {
    var _this$instance52;

    return (_this$instance52 = this.instance) === null || _this$instance52 === void 0 ? void 0 : _this$instance52.resize();
  }

  addColumn(columnOptions) {
    var _this$instance53;

    return (_this$instance53 = this.instance) === null || _this$instance53 === void 0 ? void 0 : _this$instance53.addColumn(columnOptions);
  }

  addRow() {
    var _this$instance54;

    return (_this$instance54 = this.instance) === null || _this$instance54 === void 0 ? void 0 : _this$instance54.addRow();
  }

  clearGrouping() {
    var _this$instance55;

    return (_this$instance55 = this.instance) === null || _this$instance55 === void 0 ? void 0 : _this$instance55.clearGrouping();
  }

  collapseAll(groupIndex) {
    var _this$instance56;

    return (_this$instance56 = this.instance) === null || _this$instance56 === void 0 ? void 0 : _this$instance56.collapseAll(groupIndex);
  }

  collapseRow(key) {
    var _this$instance57;

    return (_this$instance57 = this.instance) === null || _this$instance57 === void 0 ? void 0 : _this$instance57.collapseRow(key);
  }

  expandAll(groupIndex) {
    var _this$instance58;

    return (_this$instance58 = this.instance) === null || _this$instance58 === void 0 ? void 0 : _this$instance58.expandAll(groupIndex);
  }

  expandRow(key) {
    var _this$instance59;

    return (_this$instance59 = this.instance) === null || _this$instance59 === void 0 ? void 0 : _this$instance59.expandRow(key);
  }

  exportToExcel(selectionOnly) {
    var _this$instance60;

    return (_this$instance60 = this.instance) === null || _this$instance60 === void 0 ? void 0 : _this$instance60.exportToExcel(selectionOnly);
  }

  getSelectedRowKeys() {
    var _this$instance61;

    return (_this$instance61 = this.instance) === null || _this$instance61 === void 0 ? void 0 : _this$instance61.getSelectedRowKeys();
  }

  getSelectedRowsData() {
    var _this$instance62;

    return (_this$instance62 = this.instance) === null || _this$instance62 === void 0 ? void 0 : _this$instance62.getSelectedRowsData();
  }

  getTotalSummaryValue(summaryItemName) {
    var _this$instance63;

    return (_this$instance63 = this.instance) === null || _this$instance63 === void 0 ? void 0 : _this$instance63.getTotalSummaryValue(summaryItemName);
  }

  getVisibleColumns(headerLevel) {
    var _this$instance64;

    return (_this$instance64 = this.instance) === null || _this$instance64 === void 0 ? void 0 : _this$instance64.getVisibleColumns(headerLevel);
  }

  getVisibleRows() {
    var _this$instance65;

    return (_this$instance65 = this.instance) === null || _this$instance65 === void 0 ? void 0 : _this$instance65.getVisibleRows();
  }

  isRowExpanded(key) {
    var _this$instance66;

    return (_this$instance66 = this.instance) === null || _this$instance66 === void 0 ? void 0 : _this$instance66.isRowExpanded(key);
  }

  totalCount() {
    var _this$instance67;

    return (_this$instance67 = this.instance) === null || _this$instance67 === void 0 ? void 0 : _this$instance67.totalCount();
  }

  isScrollbarVisible() {
    var _this$instance68;

    return (_this$instance68 = this.instance) === null || _this$instance68 === void 0 ? void 0 : _this$instance68.isScrollbarVisible();
  }

  getTopVisibleRowData() {
    var _this$instance69;

    return (_this$instance69 = this.instance) === null || _this$instance69 === void 0 ? void 0 : _this$instance69.getTopVisibleRowData();
  }

  getScrollbarWidth(isHorizontal) {
    var _this$instance70;

    return (_this$instance70 = this.instance) === null || _this$instance70 === void 0 ? void 0 : _this$instance70.getScrollbarWidth(isHorizontal);
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        filterValue: this.__state_filterValue,
        focusedColumnIndex: this.__state_focusedColumnIndex,
        focusedRowIndex: this.__state_focusedRowIndex,
        focusedRowKey: this.__state_focusedRowKey,
        selectedRowKeys: this.__state_selectedRowKeys,
        selectionFilter: this.__state_selectionFilter,
        rowTemplate: getTemplate(props.rowTemplate)
      }),
      instance: this.instance,
      widgetElementRef: this.widgetElementRef,
      callMethod: this.callMethod,
      instanceOptionChangedHandler: this.instanceOptionChangedHandler,
      updateTwoWayValue: this.updateTwoWayValue,
      onHoverStart: this.onHoverStart,
      onHoverEnd: this.onHoverEnd,
      onDimensionChanged: this.onDimensionChanged,
      normalizeProps: this.normalizeProps,
      createInstance: this.createInstance,
      restAttributes: this.restAttributes
    });
  }

}
DataGrid.defaultProps = _extends({}, DataGridProps);
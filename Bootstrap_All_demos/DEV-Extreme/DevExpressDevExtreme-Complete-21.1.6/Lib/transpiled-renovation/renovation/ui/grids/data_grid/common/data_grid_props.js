"use strict";

exports.DataGridProps = exports.DataGridCommonColumnSettings = exports.DataGridExport = exports.DataGridLoadPanel = exports.DataGridKeyboardNavigation = exports.DataGridHeaderFilter = exports.DataGridFilterRow = exports.DataGridFilterPanel = exports.DataGridStateStoring = exports.DataGridSorting = exports.DataGridSearchPanel = exports.DataGridColumnFixing = exports.DataGridColumnChooser = exports.DataGridRowDragging = exports.DataGridMasterDetail = exports.DataGridPager = exports.DataGridSummary = exports.DataGridSummaryTotalItem = exports.DataGridSummaryGroupItem = exports.DataGridGrouping = exports.DataGridGroupPanel = exports.DataGridSortByGroupSummaryInfoItem = exports.DataGridPaging = exports.DataGridSelection = exports.DataGridScrolling = exports.DataGridEditing = exports.DataGridEditingTexts = exports.DataGridColumn = exports.DataGridColumnLookup = exports.DataGridColumnHeaderFilter = exports.DataGridColumnButton = void 0;

var _base_props = require("../../../common/base_props");

var _message = _interopRequireDefault(require("../../../../../localization/message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DataGridColumnButton = {};
exports.DataGridColumnButton = DataGridColumnButton;
var DataGridColumnHeaderFilter = {};
exports.DataGridColumnHeaderFilter = DataGridColumnHeaderFilter;
var DataGridColumnLookup = {};
exports.DataGridColumnLookup = DataGridColumnLookup;
var DataGridColumn = {};
exports.DataGridColumn = DataGridColumn;
var DataGridEditingTexts = {};
exports.DataGridEditingTexts = DataGridEditingTexts;
var DataGridEditing = {
  changesChange: function changesChange() {},
  editRowKeyChange: function editRowKeyChange() {},
  editColumnNameChange: function editColumnNameChange() {}
};
exports.DataGridEditing = DataGridEditing;
var DataGridScrolling = {};
exports.DataGridScrolling = DataGridScrolling;
var DataGridSelection = {};
exports.DataGridSelection = DataGridSelection;
var DataGridPaging = {};
exports.DataGridPaging = DataGridPaging;
var DataGridSortByGroupSummaryInfoItem = {};
exports.DataGridSortByGroupSummaryInfoItem = DataGridSortByGroupSummaryInfoItem;
var DataGridGroupPanel = {};
exports.DataGridGroupPanel = DataGridGroupPanel;
var DataGridGrouping = {};
exports.DataGridGrouping = DataGridGrouping;
var DataGridSummaryGroupItem = {};
exports.DataGridSummaryGroupItem = DataGridSummaryGroupItem;
var DataGridSummaryTotalItem = {};
exports.DataGridSummaryTotalItem = DataGridSummaryTotalItem;
var DataGridSummary = {};
exports.DataGridSummary = DataGridSummary;
var DataGridPager = {};
exports.DataGridPager = DataGridPager;
var DataGridMasterDetail = {};
exports.DataGridMasterDetail = DataGridMasterDetail;
var DataGridRowDragging = {};
exports.DataGridRowDragging = DataGridRowDragging;
var DataGridColumnChooser = {};
exports.DataGridColumnChooser = DataGridColumnChooser;
var DataGridColumnFixing = {};
exports.DataGridColumnFixing = DataGridColumnFixing;
var DataGridSearchPanel = {};
exports.DataGridSearchPanel = DataGridSearchPanel;
var DataGridSorting = {};
exports.DataGridSorting = DataGridSorting;
var DataGridStateStoring = {};
exports.DataGridStateStoring = DataGridStateStoring;
var DataGridFilterPanel = {};
exports.DataGridFilterPanel = DataGridFilterPanel;
var DataGridFilterRow = {};
exports.DataGridFilterRow = DataGridFilterRow;
var DataGridHeaderFilter = {};
exports.DataGridHeaderFilter = DataGridHeaderFilter;
var DataGridKeyboardNavigation = {};
exports.DataGridKeyboardNavigation = DataGridKeyboardNavigation;
var DataGridLoadPanel = {};
exports.DataGridLoadPanel = DataGridLoadPanel;
var DataGridExport = {};
exports.DataGridExport = DataGridExport;
var DataGridCommonColumnSettings = {};
exports.DataGridCommonColumnSettings = DataGridCommonColumnSettings;

var DataGridProps = _extends({}, _base_props.BaseWidgetProps, {
  editing: {
    mode: "row",
    refreshMode: "full",
    allowAdding: false,
    allowUpdating: false,
    allowDeleting: false,
    useIcons: false,
    selectTextOnEditStart: false,
    confirmDelete: true,
    form: {
      colCount: 2
    },
    popup: {},
    startEditAction: "click",
    editRowKey: null,
    editColumnName: undefined,
    changes: []
  },
  groupPanel: {
    visible: false,
    emptyPanelText: _message.default.format("dxDataGrid-groupPanelEmptyText"),
    allowColumnDragging: true
  },
  grouping: {
    autoExpandAll: true,
    allowCollapsing: true,
    contextMenuEnabled: false,
    expandMode: "buttonClick",
    texts: {
      groupContinuesMessage: _message.default.format("dxDataGrid-groupContinuesMessage"),
      groupContinuedMessage: _message.default.format("dxDataGrid-groupContinuedMessage"),
      groupByThisColumn: _message.default.format("dxDataGrid-groupHeaderText"),
      ungroup: _message.default.format("dxDataGrid-ungroupHeaderText"),
      ungroupAll: _message.default.format("dxDataGrid-ungroupAllText")
    }
  },
  scrolling: {
    timeout: 300,
    updateTimeout: 300,
    minTimeout: 0,
    renderingThreshold: 100,
    removeInvisiblePages: true,
    rowPageSize: 5,
    mode: "standard",
    preloadEnabled: false,
    rowRenderingMode: "standard",
    loadTwoPagesOnStart: false,
    columnRenderingMode: "standard",
    columnPageSize: 5,
    columnRenderingThreshold: 300,
    useNative: "auto"
  },
  keyboardNavigation: {
    enabled: true,
    enterKeyAction: "startEdit",
    enterKeyDirection: "none",
    editOnKeyPress: false
  },
  searchPanel: {
    visible: false,
    width: 160,
    placeholder: _message.default.format("dxDataGrid-searchPanelPlaceholder"),
    highlightSearchText: true,
    highlightCaseSensitive: false,
    text: "",
    searchVisibleColumnsOnly: false
  },
  sorting: {
    mode: "single",
    ascendingText: _message.default.format("dxDataGrid-sortingAscendingText"),
    descendingText: _message.default.format("dxDataGrid-sortingDescendingText"),
    clearText: _message.default.format("dxDataGrid-sortingClearText"),
    showSortIndexes: true
  },
  filterSyncEnabled: "auto",
  showBorders: false,
  showColumnHeaders: true,
  showColumnLines: true,
  showRowLines: false,
  loadingTimeout: 30,
  commonColumnSettings: {
    allowExporting: true,
    allowFiltering: true,
    allowHiding: true,
    allowSorting: true,
    allowEditing: true,
    encodeHtml: true,
    trueText: _message.default.format("dxDataGrid-trueText"),
    falseText: _message.default.format("dxDataGrid-falseText")
  },
  defaultFilterValue: [],
  filterValueChange: function filterValueChange() {},
  defaultFocusedColumnIndex: -1,
  focusedColumnIndexChange: function focusedColumnIndexChange() {},
  defaultFocusedRowIndex: -1,
  focusedRowIndexChange: function focusedRowIndexChange() {},
  defaultFocusedRowKey: null,
  focusedRowKeyChange: function focusedRowKeyChange() {},
  defaultSelectedRowKeys: [],
  selectedRowKeysChange: function selectedRowKeysChange() {},
  defaultSelectionFilter: [],
  selectionFilterChange: function selectionFilterChange() {}
});

exports.DataGridProps = DataGridProps;
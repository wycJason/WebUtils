import $ from '../../core/renderer';
import { compileGetter, compileSetter } from '../../core/utils/data';
import { extend } from '../../core/utils/extend';
import { getWindow } from '../../core/utils/window';
import { isDefined } from '../../core/utils/type';
import { ModelChangesListener } from './ui.gantt.model_changes_listener';
import DataOption from './ui.gantt.data.option';
import LoadPanel from '../load_panel';
import registerComponent from '../../core/component_registrator';
import SplitterControl from '../splitter';
import Widget from '../widget/ui.widget';
import { GanttActionsManager } from './ui.gantt.actions';
import { GanttCustomFieldsManager } from './ui.gantt.custom_fields';
import { GanttDialog } from './ui.gantt.dialogs';
import { GanttExportHelper } from './ui.gantt.export_helper';
import { GanttHelper } from './ui.gantt.helper';
import { GanttMappingHelper } from './ui.gantt.mapping_helper';
import { GanttSizeHelper } from './ui.gantt.size_helper';
import { GanttTemplatesManager } from './ui.gantt.templates';
import { GanttToolbar, GanttContextMenuBar } from './ui.gantt.bars';
import { GanttTreeList } from './ui.gantt.treelist';
import { GanttView } from './ui.gantt.view';
var window = getWindow(); // STYLE gantt

var GANTT_CLASS = 'dx-gantt';
var GANTT_VIEW_CLASS = 'dx-gantt-view';
var GANTT_TREE_LIST_WRAPPER = 'dx-gantt-treelist-wrapper';
var GANTT_TOOLBAR_WRAPPER = 'dx-gantt-toolbar-wrapper';
var GANTT_MAIN_WRAPPER = 'dx-gantt-main-wrapper';
var GANTT_TASKS = 'tasks';
var GANTT_DEPENDENCIES = 'dependencies';
var GANTT_RESOURCES = 'resources';
var GANTT_RESOURCE_ASSIGNMENTS = 'resourceAssignments';
var GANTT_NEW_TASK_CACHE_KEY = 'gantt_new_task_key';

class Gantt extends Widget {
  _init() {
    super._init();

    this._isGanttRendered = false;

    this._initHelpers();
  }

  _initMarkup() {
    super._initMarkup();

    this.$element().addClass(GANTT_CLASS);
    this._$toolbarWrapper = $('<div>').addClass(GANTT_TOOLBAR_WRAPPER).appendTo(this.$element());
    this._$toolbar = $('<div>').appendTo(this._$toolbarWrapper);
    this._$mainWrapper = $('<div>').addClass(GANTT_MAIN_WRAPPER).appendTo(this.$element());
    this._$treeListWrapper = $('<div>').addClass(GANTT_TREE_LIST_WRAPPER).appendTo(this._$mainWrapper);
    this._$treeList = $('<div>').appendTo(this._$treeListWrapper);
    this._$splitter = $('<div>').appendTo(this._$mainWrapper);
    this._$ganttView = $('<div>').addClass(GANTT_VIEW_CLASS).appendTo(this._$mainWrapper);
    this._$dialog = $('<div>').appendTo(this.$element());
    this._$loadPanel = $('<div>').appendTo(this.$element());
    this._$contextMenu = $('<div>').appendTo(this.$element());

    this._refreshDataSource(GANTT_TASKS);

    this._refreshDataSource(GANTT_DEPENDENCIES);

    this._refreshDataSource(GANTT_RESOURCES);

    this._refreshDataSource(GANTT_RESOURCE_ASSIGNMENTS);
  }

  _clean() {
    var _this$_ganttView;

    (_this$_ganttView = this._ganttView) === null || _this$_ganttView === void 0 ? void 0 : _this$_ganttView._ganttViewCore.cleanMarkup();
    delete this._ganttView;
    delete this._dialogInstance;
    delete this._loadPanel;

    super._clean();
  }

  _refresh() {
    this._isGanttRendered = false;

    super._refresh();
  }

  _renderContent() {
    this._isMainElementVisible = this.$element().is(':visible');

    if (this._isMainElementVisible && !this._isGanttRendered) {
      this._isGanttRendered = true;

      this._renderBars();

      this._renderTreeList();

      this._renderSplitter();
    }
  }

  _renderTreeList() {
    this._ganttTreeList = new GanttTreeList(this);
    this._treeList = this._ganttTreeList.getTreeList();

    this._ganttTreeList.onAfterTreeListCreate();
  }

  _renderSplitter() {
    this._splitter = this._createComponent(this._$splitter, SplitterControl, {
      container: this.$element(),
      leftElement: this._$treeListWrapper,
      rightElement: this._$ganttView,
      onApplyPanelSize: e => {
        this._sizeHelper.onApplyPanelSize(e);
      }
    });

    this._splitter.option('initialLeftPanelWidth', this.option('taskListWidth'));
  }

  _renderBars() {
    this._bars = [];
    this._toolbar = new GanttToolbar(this._$toolbar, this);

    this._updateToolbarContent();

    this._bars.push(this._toolbar);

    this._contextMenuBar = new GanttContextMenuBar(this._$contextMenu, this);

    this._updateContextMenu();

    this._bars.push(this._contextMenuBar);
  }

  _initHelpers() {
    this._mappingHelper = new GanttMappingHelper(this);
    this._customFieldsManager = new GanttCustomFieldsManager(this);
    this._actionsManager = new GanttActionsManager(this);
    this._ganttTemplatesManager = new GanttTemplatesManager(this);
    this._sizeHelper = new GanttSizeHelper(this);
  }

  _initGanttView() {
    if (this._ganttView) {
      return;
    }

    this._ganttView = this._createComponent(this._$ganttView, GanttView, {
      width: '100%',
      height: this._ganttTreeList.getOffsetHeight(),
      rowHeight: this._ganttTreeList.getRowHeight(),
      headerHeight: this._ganttTreeList.getHeaderHeight(),
      tasks: this._tasks,
      dependencies: this._dependencies,
      resources: this._resources,
      resourceAssignments: this._resourceAssignments,
      allowSelection: this.option('allowSelection'),
      selectedRowKey: this.option('selectedRowKey'),
      showResources: this.option('showResources'),
      taskTitlePosition: this.option('taskTitlePosition'),
      firstDayOfWeek: this.option('firstDayOfWeek'),
      showRowLines: this.option('showRowLines'),
      scaleType: this.option('scaleType'),
      editing: this.option('editing'),
      validation: this.option('validation'),
      stripLines: this.option('stripLines'),
      bars: this._bars,
      mainElement: this.$element(),
      onSelectionChanged: e => {
        this._ganttTreeList.selectRows(GanttHelper.getArrayFromOneElement(e.id));
      },
      onScroll: e => {
        this._ganttTreeList.scrollBy(e.scrollTop);
      },
      onDialogShowing: this._showDialog.bind(this),
      onPopupMenuShowing: this._showPopupMenu.bind(this),
      onExpandAll: this._expandAll.bind(this),
      onCollapseAll: this._collapseAll.bind(this),
      modelChangesListener: ModelChangesListener.create(this),
      exportHelper: this._getExportHelper(),
      taskTooltipContentTemplate: this._ganttTemplatesManager.getTaskTooltipContentTemplateFunc(this.option('taskTooltipContentTemplate')),
      taskProgressTooltipContentTemplate: this._ganttTemplatesManager.getTaskProgressTooltipContentTemplateFunc(this.option('taskProgressTooltipContentTemplate')),
      taskTimeTooltipContentTemplate: this._ganttTemplatesManager.getTaskTimeTooltipContentTemplateFunc(this.option('taskTimeTooltipContentTemplate')),
      taskContentTemplate: this._ganttTemplatesManager.getTaskContentTemplateFunc(this.option('taskContentTemplate')),
      onTaskClick: e => {
        this._ganttTreeList.onRowClick(e);
      },
      onTaskDblClick: e => {
        this._ganttTreeList.onRowDblClick(e);
      },
      onAdjustControl: () => {
        this._sizeHelper.onAdjustControl();
      }
    });

    this._fireContentReadyAction();
  }

  _refreshDataSource(name) {
    var dataOption = this["_".concat(name, "Option")];

    if (dataOption) {
      dataOption.dispose();
      delete this["_".concat(name, "Option")];
      delete this["_".concat(name)];
    }

    dataOption = new DataOption(name, this._getLoadPanel(), (name, data) => {
      this._dataSourceChanged(name, data);
    });
    dataOption.option('dataSource', this._getSpecificDataSourceOption(name));

    dataOption._refreshDataSource();

    this["_".concat(name, "Option")] = dataOption;
  }

  _getSpecificDataSourceOption(name) {
    var dataSource = this.option("".concat(name, ".dataSource"));

    if (!dataSource || Array.isArray(dataSource)) {
      return {
        store: {
          type: 'array',
          data: dataSource !== null && dataSource !== void 0 ? dataSource : [],
          key: this.option("".concat(name, ".keyExpr"))
        }
      };
    }

    return dataSource;
  }

  _dataSourceChanged(dataSourceName, data) {
    var getters = GanttHelper.compileGettersByOption(this.option(dataSourceName));

    var validatedData = this._validateSourceData(dataSourceName, data);

    var mappedData = validatedData.map(GanttHelper.prepareMapHandler(getters));
    this["_".concat(dataSourceName)] = mappedData;

    this._setGanttViewOption(dataSourceName, mappedData);

    if (dataSourceName === GANTT_TASKS) {
      var _this$_ganttTreeList, _this$_ganttTreeList2, _this$_ganttTreeList3;

      this._tasksRaw = validatedData;
      var expandedRowKeys = validatedData.map(t => t[this.option('tasks.parentIdExpr')]).filter((value, index, self) => value && self.indexOf(value) === index);
      (_this$_ganttTreeList = this._ganttTreeList) === null || _this$_ganttTreeList === void 0 ? void 0 : _this$_ganttTreeList.setOption('expandedRowKeys', expandedRowKeys);
      var forceUpdate = !((_this$_ganttTreeList2 = this._ganttTreeList) !== null && _this$_ganttTreeList2 !== void 0 && _this$_ganttTreeList2.getDataSource()) && !this._ganttView;
      (_this$_ganttTreeList3 = this._ganttTreeList) === null || _this$_ganttTreeList3 === void 0 ? void 0 : _this$_ganttTreeList3.updateDataSource(validatedData, forceUpdate);
    }
  }

  _validateSourceData(dataSourceName, data) {
    return data && dataSourceName === GANTT_TASKS ? this._validateTaskData(data) : data;
  }

  _validateTaskData(data) {
    var _this$option;

    var keyGetter = compileGetter(this.option("".concat(GANTT_TASKS, ".keyExpr")));
    var parentIdGetter = compileGetter(this.option("".concat(GANTT_TASKS, ".parentIdExpr")));
    var rootValue = (_this$option = this.option('rootValue')) !== null && _this$option !== void 0 ? _this$option : 'dx_dxt_gantt_default_root_value';
    var validationTree = {};

    for (var i = 0; i < data.length; i++) {
      var item = data[i];

      if (item) {
        var _validationTree$key;

        var key = keyGetter(item);
        var isRootTask = key === rootValue;
        var treeItem = (_validationTree$key = validationTree[key]) !== null && _validationTree$key !== void 0 ? _validationTree$key : validationTree[key] = {
          key: key,
          children: []
        };

        if (!isRootTask) {
          var _parentIdGetter, _validationTree$paren;

          var parentId = (_parentIdGetter = parentIdGetter(item)) !== null && _parentIdGetter !== void 0 ? _parentIdGetter : rootValue;
          var parentTreeItem = (_validationTree$paren = validationTree[parentId]) !== null && _validationTree$paren !== void 0 ? _validationTree$paren : validationTree[parentId] = {
            key: parentId,
            children: []
          };
          parentTreeItem.children.push(treeItem);
          treeItem.parent = parentTreeItem;
        }
      }
    }

    var validKeys = [rootValue];

    this._appendChildKeys(validationTree[rootValue], validKeys);

    return data.filter(item => validKeys.indexOf(keyGetter(item)) > -1);
  }

  _appendChildKeys(treeItem, keys) {
    var children = treeItem === null || treeItem === void 0 ? void 0 : treeItem.children;

    for (var i = 0; i < (children === null || children === void 0 ? void 0 : children.length); i++) {
      var child = children[i];
      keys.push(child.key);

      this._appendChildKeys(child, keys);
    }
  }

  _onRecordInserted(optionName, record, callback) {
    var dataOption = this["_".concat(optionName, "Option")];

    if (dataOption) {
      var data = GanttHelper.getStoreObject(this.option(optionName), record);
      var isTaskInsert = optionName === GANTT_TASKS;

      if (isTaskInsert) {
        this._customFieldsManager.addCustomFieldsDataFromCache(GANTT_NEW_TASK_CACHE_KEY, data);
      }

      dataOption.insert(data, response => {
        var keyGetter = compileGetter(this.option("".concat(optionName, ".keyExpr")));
        var insertedId = keyGetter(response);
        callback(insertedId);

        dataOption._reloadDataSource().done(data => {
          if (isTaskInsert) {
            this._ganttTreeList.onTaskInserted(insertedId, record.parentId);
          }
        });

        if (isTaskInsert) {
          setTimeout(() => {
            this._sizeHelper.updateGanttRowHeights();
          }, 300);
        }

        this._actionsManager.raiseInsertedAction(optionName, data, insertedId);
      });
    }
  }

  _onRecordUpdated(optionName, key, fieldName, value) {
    var dataOption = this["_".concat(optionName, "Option")];
    var isTaskUpdated = optionName === GANTT_TASKS;

    if (dataOption) {
      var setter = compileSetter(this.option("".concat(optionName, ".").concat(fieldName, "Expr")));
      var data = {};
      setter(data, value);

      var hasCustomFieldsData = isTaskUpdated && this._customFieldsManager.cache.hasData(key);

      if (hasCustomFieldsData) {
        this._customFieldsManager.addCustomFieldsDataFromCache(key, data);
      }

      dataOption.update(key, data, () => {
        dataOption._reloadDataSource();

        this._actionsManager.raiseUpdatedAction(optionName, data, key);
      });
    }
  }

  _onRecordRemoved(optionName, key, data) {
    var dataOption = this["_".concat(optionName, "Option")];

    if (dataOption) {
      dataOption.remove(key, () => {
        dataOption._reloadDataSource();

        this._actionsManager.raiseDeletedAction(optionName, key, this._mappingHelper.convertCoreToMappedData(optionName, data));
      });
    }
  }

  _onParentTaskUpdated(data) {
    var mappedData = this.getTaskDataByCoreData(data);

    this._actionsManager.raiseUpdatedAction(GANTT_TASKS, mappedData, data.id);
  }

  _onParentTasksRecalculated(data) {
    var _this$_ganttTreeList4;

    var setters = GanttHelper.compileSettersByOption(this.option(GANTT_TASKS));

    var treeDataSource = this._customFieldsManager.appendCustomFields(data.map(GanttHelper.prepareSetterMapHandler(setters)));

    (_this$_ganttTreeList4 = this._ganttTreeList) === null || _this$_ganttTreeList4 === void 0 ? void 0 : _this$_ganttTreeList4.setOption('dataSource', treeDataSource);
  }

  _getToolbarItems() {
    var items = this.option('toolbar.items');
    return items ? items : [];
  }

  _updateToolbarContent() {
    var items = this._getToolbarItems();

    if (items.length) {
      this._$toolbarWrapper.show();
    } else {
      this._$toolbarWrapper.hide();
    }

    this._toolbar && this._toolbar.createItems(items);

    this._updateBarItemsState();
  }

  _updateContextMenu() {
    var contextMenuOptions = this.option('contextMenu');

    if (contextMenuOptions.enabled && this._contextMenuBar) {
      this._contextMenuBar.createItems(contextMenuOptions.items);

      this._updateBarItemsState();
    }
  }

  _updateBarItemsState() {
    this._ganttView && this._ganttView.updateBarItemsState();
  }

  _showDialog(e) {
    if (!this._dialogInstance) {
      this._dialogInstance = new GanttDialog(this, this._$dialog);
    }

    this._dialogInstance.show(e.name, e.parameters, e.callback, e.afterClosing, this.option('editing'));
  }

  _showPopupMenu(info) {
    if (this.option('contextMenu.enabled')) {
      this._ganttView.getBarManager().updateContextMenu();

      var args = {
        cancel: false,
        event: info.event,
        targetType: info.type,
        targetKey: info.key,
        items: extend(true, [], this._contextMenuBar._items),
        data: info.type === 'task' ? this.getTaskData(info.key) : this.getDependencyData(info.key)
      };

      this._actionsManager.raiseContextMenuPreparing(args);

      if (!args.cancel) {
        this._contextMenuBar.show(info.position, args.items);
      }
    }
  }

  _getLoadPanel() {
    if (!this._loadPanel) {
      this._loadPanel = this._createComponent(this._$loadPanel, LoadPanel, {
        position: {
          of: this.$element()
        }
      });
    }

    return this._loadPanel;
  }

  _getTaskKeyGetter() {
    return compileGetter(this.option("".concat(GANTT_TASKS, ".keyExpr")));
  }

  _setGanttViewOption(optionName, value) {
    this._ganttView && this._ganttView.option(optionName, value);
  }

  _getGanttViewOption(optionName, value) {
    var _this$_ganttView2;

    return (_this$_ganttView2 = this._ganttView) === null || _this$_ganttView2 === void 0 ? void 0 : _this$_ganttView2.option(optionName);
  }

  _getExportHelper() {
    var _this$_exportHelper;

    (_this$_exportHelper = this._exportHelper) !== null && _this$_exportHelper !== void 0 ? _this$_exportHelper : this._exportHelper = new GanttExportHelper(this);
    return this._exportHelper;
  }

  _executeCoreCommand(id) {
    this._ganttView.executeCoreCommand(id);
  }

  _expandAll() {
    this._changeExpandAll(true);
  }

  _collapseAll() {
    this._changeExpandAll(false);
  }

  _changeExpandAll(expanded) {
    var _promise;

    var keysToExpand = [];

    this._treeList.forEachNode(node => {
      var _node$children;

      if ((_node$children = node.children) !== null && _node$children !== void 0 && _node$children.length) {
        keysToExpand.push(node.key);
      }
    });

    var promise;
    this._lockRowExpandEvent = keysToExpand.length > 0;
    var state = keysToExpand.reduce((previous, key, index) => {
      previous[key] = expanded;
      var action = expanded ? this._treeList.expandRow : this._treeList.collapseRow;
      var isLast = index === keysToExpand.length - 1;

      if (isLast) {
        promise = action(key);
      } else {
        action(key);
      }

      return previous;
    }, {});
    (_promise = promise) === null || _promise === void 0 ? void 0 : _promise.then(() => {
      this._ganttView._ganttViewCore.applyTasksExpandedState(state);

      this._sizeHelper.adjustHeight();

      delete this._lockRowExpandEvent;
    });
  }

  _onTreeListRowExpandChanged(e, expanded) {
    if (!this._lockRowExpandEvent) {
      this._ganttView.changeTaskExpanded(e.key, expanded);

      this._sizeHelper.adjustHeight();
    }
  }

  getTaskResources(key) {
    if (!isDefined(key)) {
      return null;
    }

    var coreData = this._ganttView._ganttViewCore.getTaskResources(key);

    return coreData.map(r => this._mappingHelper.convertCoreToMappedData(GANTT_RESOURCES, r));
  }

  getVisibleTaskKeys() {
    return this._ganttView._ganttViewCore.getVisibleTaskKeys();
  }

  getVisibleDependencyKeys() {
    return this._ganttView._ganttViewCore.getVisibleDependencyKeys();
  }

  getVisibleResourceKeys() {
    return this._ganttView._ganttViewCore.getVisibleResourceKeys();
  }

  getVisibleResourceAssignmentKeys() {
    return this._ganttView._ganttViewCore.getVisibleResourceAssignmentKeys();
  }

  getTaskData(key) {
    if (!isDefined(key)) {
      return null;
    }

    var coreData = this._ganttView._ganttViewCore.getTaskData(key);

    var mappedData = this.getTaskDataByCoreData(coreData);
    return mappedData;
  }

  getTaskDataByCoreData(coreData) {
    var mappedData = coreData ? this._mappingHelper.convertCoreToMappedData(GANTT_TASKS, coreData) : null;

    this._customFieldsManager.addCustomFieldsData(coreData.id, mappedData);

    return mappedData;
  }

  insertTask(data) {
    this._customFieldsManager.saveCustomFieldsDataToCache(GANTT_NEW_TASK_CACHE_KEY, data);

    this._ganttView._ganttViewCore.insertTask(this._mappingHelper.convertMappedToCoreData(GANTT_TASKS, data));
  }

  deleteTask(key) {
    this._ganttView._ganttViewCore.deleteTask(key);
  }

  updateTask(key, data) {
    var coreTaskData = this._mappingHelper.convertMappedToCoreData(GANTT_TASKS, data);

    var isCustomFieldsUpdateOnly = !Object.keys(coreTaskData).length;

    this._customFieldsManager.saveCustomFieldsDataToCache(key, data, true, isCustomFieldsUpdateOnly);

    this._ganttView._ganttViewCore.updateTask(key, coreTaskData);
  }

  getDependencyData(key) {
    if (!isDefined(key)) {
      return null;
    }

    var coreData = this._ganttView._ganttViewCore.getDependencyData(key);

    return coreData ? this._mappingHelper.convertCoreToMappedData(GANTT_DEPENDENCIES, coreData) : null;
  }

  insertDependency(data) {
    this._ganttView._ganttViewCore.insertDependency(this._mappingHelper.convertMappedToCoreData(GANTT_DEPENDENCIES, data));
  }

  deleteDependency(key) {
    this._ganttView._ganttViewCore.deleteDependency(key);
  }

  getResourceData(key) {
    var coreData = this._ganttView._ganttViewCore.getResourceData(key);

    return coreData ? this._mappingHelper.convertCoreToMappedData(GANTT_RESOURCES, coreData) : null;
  }

  deleteResource(key) {
    this._ganttView._ganttViewCore.deleteResource(key);
  }

  insertResource(data, taskKeys) {
    this._ganttView._ganttViewCore.insertResource(this._mappingHelper.convertMappedToCoreData(GANTT_RESOURCES, data), taskKeys);
  }

  getResourceAssignmentData(key) {
    var coreData = this._ganttView._ganttViewCore.getResourceAssignmentData(key);

    return coreData ? this._mappingHelper.convertCoreToMappedData(GANTT_RESOURCE_ASSIGNMENTS, coreData) : null;
  }

  assignResourceToTask(resourceKey, taskKey) {
    this._ganttView._ganttViewCore.assignResourceToTask(resourceKey, taskKey);
  } // eslint-disable-next-line spellcheck/spell-checker


  unassignResourceFromTask(resourceKey, taskKey) {
    // eslint-disable-next-line spellcheck/spell-checker
    this._ganttView._ganttViewCore.unassignResourceFromTask(resourceKey, taskKey);
  }

  updateDimensions() {
    this._sizeHelper.onAdjustControl();
  }

  scrollToDate(date) {
    this._ganttView._ganttViewCore.scrollToDate(date);
  }

  showResourceManagerDialog() {
    this._ganttView._ganttViewCore.showResourcesDialog();
  }

  exportToPdf(options) {
    var _fullOptions$docCreat, _window$jspdf$jsPDF, _window$jspdf, _fullOptions$format;

    this._exportHelper.reset();

    var fullOptions = extend({}, options);

    if (fullOptions.createDocumentMethod) {
      fullOptions.docCreateMethod = fullOptions.createDocumentMethod;
    }

    (_fullOptions$docCreat = fullOptions.docCreateMethod) !== null && _fullOptions$docCreat !== void 0 ? _fullOptions$docCreat : fullOptions.docCreateMethod = (_window$jspdf$jsPDF = (_window$jspdf = window['jspdf']) === null || _window$jspdf === void 0 ? void 0 : _window$jspdf['jsPDF']) !== null && _window$jspdf$jsPDF !== void 0 ? _window$jspdf$jsPDF : window['jsPDF'];
    (_fullOptions$format = fullOptions.format) !== null && _fullOptions$format !== void 0 ? _fullOptions$format : fullOptions.format = 'a4';
    return new Promise(resolve => {
      var _this$_ganttView3;

      var doc = (_this$_ganttView3 = this._ganttView) === null || _this$_ganttView3 === void 0 ? void 0 : _this$_ganttView3._ganttViewCore.exportToPdf(fullOptions);
      resolve(doc);
    });
  }

  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), GanttHelper.getDefaultOptions());
  }

  _optionChanged(args) {
    var _this$_ganttTreeList5, _this$_sizeHelper, _this$_ganttTreeList6, _this$_actionsManager, _this$_actionsManager2, _this$_actionsManager3, _this$_actionsManager4, _this$_actionsManager5, _this$_actionsManager6, _this$_actionsManager7, _this$_actionsManager8, _this$_actionsManager9, _this$_actionsManager10, _this$_actionsManager11, _this$_actionsManager12, _this$_actionsManager13, _this$_actionsManager14, _this$_actionsManager15, _this$_actionsManager16, _this$_actionsManager17, _this$_actionsManager18, _this$_actionsManager19, _this$_actionsManager20, _this$_actionsManager21, _this$_actionsManager22, _this$_actionsManager23, _this$_actionsManager24, _this$_actionsManager25, _this$_actionsManager26, _this$_ganttTreeList7, _this$_ganttTreeList8, _this$_ganttTemplates, _this$_ganttTemplates2, _this$_ganttTemplates3, _this$_ganttTemplates4, _this$_ganttTreeList9, _this$_sizeHelper2, _this$_sizeHelper3;

    switch (args.name) {
      case 'tasks':
        this._refreshDataSource(GANTT_TASKS);

        break;

      case 'dependencies':
        this._refreshDataSource(GANTT_DEPENDENCIES);

        break;

      case 'resources':
        this._refreshDataSource(GANTT_RESOURCES);

        break;

      case 'resourceAssignments':
        this._refreshDataSource(GANTT_RESOURCE_ASSIGNMENTS);

        break;

      case 'columns':
        (_this$_ganttTreeList5 = this._ganttTreeList) === null || _this$_ganttTreeList5 === void 0 ? void 0 : _this$_ganttTreeList5.setOption('columns', this._ganttTreeList.getColumns());
        break;

      case 'taskListWidth':
        (_this$_sizeHelper = this._sizeHelper) === null || _this$_sizeHelper === void 0 ? void 0 : _this$_sizeHelper.setInnerElementsWidth();
        break;

      case 'showResources':
        this._setGanttViewOption('showResources', args.value);

        break;

      case 'taskTitlePosition':
        this._setGanttViewOption('taskTitlePosition', args.value);

        break;

      case 'firstDayOfWeek':
        this._setGanttViewOption('firstDayOfWeek', args.value);

        break;

      case 'selectedRowKey':
        (_this$_ganttTreeList6 = this._ganttTreeList) === null || _this$_ganttTreeList6 === void 0 ? void 0 : _this$_ganttTreeList6.selectRows(GanttHelper.getArrayFromOneElement(args.value));
        break;

      case 'onSelectionChanged':
        (_this$_actionsManager = this._actionsManager) === null || _this$_actionsManager === void 0 ? void 0 : _this$_actionsManager.createSelectionChangedAction();
        break;

      case 'onTaskClick':
        (_this$_actionsManager2 = this._actionsManager) === null || _this$_actionsManager2 === void 0 ? void 0 : _this$_actionsManager2.createTaskClickAction();
        break;

      case 'onTaskDblClick':
        (_this$_actionsManager3 = this._actionsManager) === null || _this$_actionsManager3 === void 0 ? void 0 : _this$_actionsManager3.createTaskDblClickAction();
        break;

      case 'onTaskInserting':
        (_this$_actionsManager4 = this._actionsManager) === null || _this$_actionsManager4 === void 0 ? void 0 : _this$_actionsManager4.createTaskInsertingAction();
        break;

      case 'onTaskInserted':
        (_this$_actionsManager5 = this._actionsManager) === null || _this$_actionsManager5 === void 0 ? void 0 : _this$_actionsManager5.createTaskInsertedAction();
        break;

      case 'onTaskDeleting':
        (_this$_actionsManager6 = this._actionsManager) === null || _this$_actionsManager6 === void 0 ? void 0 : _this$_actionsManager6.createTaskDeletingAction();
        break;

      case 'onTaskDeleted':
        (_this$_actionsManager7 = this._actionsManager) === null || _this$_actionsManager7 === void 0 ? void 0 : _this$_actionsManager7.createTaskDeletedAction();
        break;

      case 'onTaskUpdating':
        (_this$_actionsManager8 = this._actionsManager) === null || _this$_actionsManager8 === void 0 ? void 0 : _this$_actionsManager8.createTaskUpdatingAction();
        break;

      case 'onTaskUpdated':
        (_this$_actionsManager9 = this._actionsManager) === null || _this$_actionsManager9 === void 0 ? void 0 : _this$_actionsManager9.createTaskUpdatedAction();
        break;

      case 'onTaskMoving':
        (_this$_actionsManager10 = this._actionsManager) === null || _this$_actionsManager10 === void 0 ? void 0 : _this$_actionsManager10.createTaskMovingAction();
        break;

      case 'onTaskEditDialogShowing':
        (_this$_actionsManager11 = this._actionsManager) === null || _this$_actionsManager11 === void 0 ? void 0 : _this$_actionsManager11.createTaskEditDialogShowingAction();
        break;

      case 'onResourceManagerDialogShowing':
        (_this$_actionsManager12 = this._actionsManager) === null || _this$_actionsManager12 === void 0 ? void 0 : _this$_actionsManager12.createResourceManagerDialogShowingAction();
        break;

      case 'onDependencyInserting':
        (_this$_actionsManager13 = this._actionsManager) === null || _this$_actionsManager13 === void 0 ? void 0 : _this$_actionsManager13.createDependencyInsertingAction();
        break;

      case 'onDependencyInserted':
        (_this$_actionsManager14 = this._actionsManager) === null || _this$_actionsManager14 === void 0 ? void 0 : _this$_actionsManager14.createDependencyInsertedAction();
        break;

      case 'onDependencyDeleting':
        (_this$_actionsManager15 = this._actionsManager) === null || _this$_actionsManager15 === void 0 ? void 0 : _this$_actionsManager15.createDependencyDeletingAction();
        break;

      case 'onDependencyDeleted':
        (_this$_actionsManager16 = this._actionsManager) === null || _this$_actionsManager16 === void 0 ? void 0 : _this$_actionsManager16.createDependencyDeletedAction();
        break;

      case 'onResourceInserting':
        (_this$_actionsManager17 = this._actionsManager) === null || _this$_actionsManager17 === void 0 ? void 0 : _this$_actionsManager17.createResourceInsertingAction();
        break;

      case 'onResourceInserted':
        (_this$_actionsManager18 = this._actionsManager) === null || _this$_actionsManager18 === void 0 ? void 0 : _this$_actionsManager18.createResourceInsertedAction();
        break;

      case 'onResourceDeleting':
        (_this$_actionsManager19 = this._actionsManager) === null || _this$_actionsManager19 === void 0 ? void 0 : _this$_actionsManager19.createResourceDeletingAction();
        break;

      case 'onResourceDeleted':
        (_this$_actionsManager20 = this._actionsManager) === null || _this$_actionsManager20 === void 0 ? void 0 : _this$_actionsManager20.createResourceDeletedAction();
        break;

      case 'onResourceAssigning':
        (_this$_actionsManager21 = this._actionsManager) === null || _this$_actionsManager21 === void 0 ? void 0 : _this$_actionsManager21.createResourceAssigningAction();
        break;

      case 'onResourceAssigned':
        (_this$_actionsManager22 = this._actionsManager) === null || _this$_actionsManager22 === void 0 ? void 0 : _this$_actionsManager22.createResourceAssignedAction();
        break;

      case 'onResourceUnassigning':
        // eslint-disable-next-line spellcheck/spell-checker
        (_this$_actionsManager23 = this._actionsManager) === null || _this$_actionsManager23 === void 0 ? void 0 : _this$_actionsManager23.createResourceUnassigningAction();
        break;

      case 'onResourceUnassigned':
        // eslint-disable-next-line spellcheck/spell-checker
        (_this$_actionsManager24 = this._actionsManager) === null || _this$_actionsManager24 === void 0 ? void 0 : _this$_actionsManager24.createResourceUnassignedAction();
        break;

      case 'onCustomCommand':
        (_this$_actionsManager25 = this._actionsManager) === null || _this$_actionsManager25 === void 0 ? void 0 : _this$_actionsManager25.createCustomCommandAction();
        break;

      case 'onContextMenuPreparing':
        (_this$_actionsManager26 = this._actionsManager) === null || _this$_actionsManager26 === void 0 ? void 0 : _this$_actionsManager26.createContextMenuPreparingAction();
        break;

      case 'allowSelection':
        (_this$_ganttTreeList7 = this._ganttTreeList) === null || _this$_ganttTreeList7 === void 0 ? void 0 : _this$_ganttTreeList7.setOption('selection.mode', GanttHelper.getSelectionMode(args.value));

        this._setGanttViewOption('allowSelection', args.value);

        break;

      case 'showRowLines':
        (_this$_ganttTreeList8 = this._ganttTreeList) === null || _this$_ganttTreeList8 === void 0 ? void 0 : _this$_ganttTreeList8.setOption('showRowLines', args.value);

        this._setGanttViewOption('showRowLines', args.value);

        break;

      case 'stripLines':
        this._setGanttViewOption('stripLines', args.value);

        break;

      case 'scaleType':
        this._setGanttViewOption('scaleType', args.value);

        break;

      case 'editing':
        this._setGanttViewOption('editing', this.option(args.name));

        break;

      case 'validation':
        this._setGanttViewOption('validation', this.option(args.name));

        break;

      case 'toolbar':
        this._updateToolbarContent();

        break;

      case 'contextMenu':
        this._updateContextMenu();

        break;

      case 'taskTooltipContentTemplate':
        this._setGanttViewOption('taskTooltipContentTemplate', (_this$_ganttTemplates = this._ganttTemplatesManager) === null || _this$_ganttTemplates === void 0 ? void 0 : _this$_ganttTemplates.getTaskTooltipContentTemplateFunc(args.value));

        break;

      case 'taskProgressTooltipContentTemplate':
        this._setGanttViewOption('taskProgressTooltipContentTemplate', (_this$_ganttTemplates2 = this._ganttTemplatesManager) === null || _this$_ganttTemplates2 === void 0 ? void 0 : _this$_ganttTemplates2.getTaskProgressTooltipContentTemplateFunc(args.value));

        break;

      case 'taskTimeTooltipContentTemplate':
        this._setGanttViewOption('taskTimeTooltipContentTemplate', (_this$_ganttTemplates3 = this._ganttTemplatesManager) === null || _this$_ganttTemplates3 === void 0 ? void 0 : _this$_ganttTemplates3.getTaskTimeTooltipContentTemplateFunc(args.value));

        break;

      case 'taskContentTemplate':
        this._setGanttViewOption('taskContentTemplate', (_this$_ganttTemplates4 = this._ganttTemplatesManager) === null || _this$_ganttTemplates4 === void 0 ? void 0 : _this$_ganttTemplates4.getTaskContentTemplateFunc(args.value));

        break;

      case 'rootValue':
        (_this$_ganttTreeList9 = this._ganttTreeList) === null || _this$_ganttTreeList9 === void 0 ? void 0 : _this$_ganttTreeList9.setOption('rootValue', args.value);
        break;

      case 'width':
        super._optionChanged(args);

        (_this$_sizeHelper2 = this._sizeHelper) === null || _this$_sizeHelper2 === void 0 ? void 0 : _this$_sizeHelper2.updateGanttWidth();
        break;

      case 'height':
        super._optionChanged(args);

        (_this$_sizeHelper3 = this._sizeHelper) === null || _this$_sizeHelper3 === void 0 ? void 0 : _this$_sizeHelper3.setGanttHeight(this._$element.height());
        break;

      default:
        super._optionChanged(args);

    }
  }

}

registerComponent('dxGantt', Gantt);
export default Gantt;
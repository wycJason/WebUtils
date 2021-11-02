import _extends from "@babel/runtime/helpers/esm/extends";
import Component from "./component";
import gridCore from "../../ui/data_grid/ui.data_grid.core";
import { updatePropsImmutable } from "./utils";
export default class DataGridWrapper extends Component {
  beginUpdate() {
    var _this$viewRef;

    var gridInstance = (_this$viewRef = this.viewRef) === null || _this$viewRef === void 0 ? void 0 : _this$viewRef.getComponentInstance();
    super.beginUpdate();
    gridInstance === null || gridInstance === void 0 ? void 0 : gridInstance.beginUpdate();
  }

  endUpdate() {
    var _this$viewRef2;

    var gridInstance = (_this$viewRef2 = this.viewRef) === null || _this$viewRef2 === void 0 ? void 0 : _this$viewRef2.getComponentInstance();
    super.endUpdate();
    gridInstance === null || gridInstance === void 0 ? void 0 : gridInstance.endUpdate();
  }

  isReady() {
    var _this$viewRef3;

    var gridInstance = (_this$viewRef3 = this.viewRef) === null || _this$viewRef3 === void 0 ? void 0 : _this$viewRef3.getComponentInstance();
    return gridInstance === null || gridInstance === void 0 ? void 0 : gridInstance.isReady();
  }

  getView(name) {
    var _this$viewRef4;

    var gridInstance = (_this$viewRef4 = this.viewRef) === null || _this$viewRef4 === void 0 ? void 0 : _this$viewRef4.getComponentInstance();
    return gridInstance === null || gridInstance === void 0 ? void 0 : gridInstance.getView(name);
  }

  getController(name) {
    var _this$viewRef5;

    var gridInstance = (_this$viewRef5 = this.viewRef) === null || _this$viewRef5 === void 0 ? void 0 : _this$viewRef5.getComponentInstance();
    return gridInstance === null || gridInstance === void 0 ? void 0 : gridInstance.getController(name);
  }

  state(state) {
    var _this$viewRef6;

    var gridInstance = (_this$viewRef6 = this.viewRef) === null || _this$viewRef6 === void 0 ? void 0 : _this$viewRef6.getComponentInstance();
    return gridInstance === null || gridInstance === void 0 ? void 0 : gridInstance.state(state);
  }

  _wrapKeyDownHandler(handler) {
    return handler;
  }

  _optionChanging(fullName, value, prevValue) {
    super._optionChanging(fullName, value, prevValue);

    if (this.viewRef) {
      var name = fullName.split(/[.[]/)[0];

      var prevProps = _extends({}, this.viewRef.prevProps);

      updatePropsImmutable(prevProps, this.option(), name, fullName);
      this.viewRef.prevProps = prevProps;
    }
  }

  _optionChanged(e) {
    var _this$viewRef7, _this$viewRef7$getCom;

    var gridInstance = (_this$viewRef7 = this.viewRef) === null || _this$viewRef7 === void 0 ? void 0 : (_this$viewRef7$getCom = _this$viewRef7.getComponentInstance) === null || _this$viewRef7$getCom === void 0 ? void 0 : _this$viewRef7$getCom.call(_this$viewRef7);

    if (e.fullName === "dataSource" && e.value === (gridInstance === null || gridInstance === void 0 ? void 0 : gridInstance.option("dataSource"))) {
      gridInstance === null || gridInstance === void 0 ? void 0 : gridInstance.option("dataSource", e.value);
    }

    super._optionChanged(e);
  }

  _createTemplateComponent(templateOption) {
    return templateOption;
  }

  _initializeComponent() {
    var options = this.option();
    this._onInitialized = options.onInitialized;
    options.onInitialized = null;

    super._initializeComponent();
  }

  _patchOptionValues(options) {
    options.onInitialized = this._onInitialized;
    return super._patchOptionValues(options);
  }

  _setOptionsByReference() {
    super._setOptionsByReference();

    this._optionsByReference["focusedRowKey"] = true;
    this._optionsByReference["editing.editRowKey"] = true;
    this._optionsByReference["editing.changes"] = true;
  }

  _setDeprecatedOptions() {
    super._setDeprecatedOptions();

    this._deprecatedOptions["useKeyboard"] = {
      since: "19.2",
      alias: "keyboardNavigation.enabled"
    };
  }

}
DataGridWrapper.registerModule = gridCore.registerModule.bind(gridCore);
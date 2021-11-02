import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["instance", "showBorders"];
import { createComponentVNode } from "inferno";
import { InfernoEffect, InfernoComponent } from "@devextreme/vdom";
import { GridBaseViews } from "../grid_base/grid_base_views";
import { gridViewModule } from "../../../../ui/grid_core/ui.grid_core.grid_view";
import { DataGridProps } from "./common/data_grid_props";
import { deferRender } from "../../../../core/utils/common";
var {
  VIEW_NAMES
} = gridViewModule;
var DATA_GRID_CLASS = "dx-datagrid";
var DATA_GRID_ROLE_NAME = "grid";
export var viewFunction = _ref => {
  var {
    props: {
      showBorders
    },
    views
  } = _ref;
  return createComponentVNode(2, GridBaseViews, {
    "views": views,
    "className": DATA_GRID_CLASS,
    "showBorders": showBorders,
    "role": DATA_GRID_ROLE_NAME
  });
};
var DataGridPropsType = {
  showBorders: DataGridProps.showBorders
};
export class DataGridViews extends InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.update = this.update.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.update, [this.props.instance])];
  }

  updateEffects() {
    var _this$_effects$;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.instance]);
  }

  update() {
    var gridInstance = this.props.instance;

    if (!gridInstance) {
      return;
    }

    var dataController = gridInstance.getController("data");
    var resizingController = gridInstance.getController("resizing");
    deferRender(() => {
      resizingController.resize();

      if (dataController.isLoaded()) {
        resizingController.fireContentReadyAction();
      }
    });
  }

  get views() {
    if (!this.props.instance) {
      return [];
    }

    var views = VIEW_NAMES.map(viewName => this.props.instance.getView(viewName)).filter(view => view);
    return views.map(view => ({
      name: view.name,
      view
    }));
  }

  get restAttributes() {
    var _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);

    return restProps;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      views: this.views,
      restAttributes: this.restAttributes
    });
  }

}
DataGridViews.defaultProps = _extends({}, DataGridPropsType);
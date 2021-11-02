import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["defaultPageSize", "pageSize", "pageSizeChange", "pageSizes", "parentRef"];
import { createComponentVNode } from "inferno";
import { InfernoEffect, InfernoComponent } from "@devextreme/vdom";
import { SelectBox } from "../../select_box";
import { calculateValuesFittedWidth } from "../utils/calculate_values_fitted_width";
import { getElementMinWidth } from "../utils/get_element_width";
import { PagerProps } from "../common/pager_props";
export var viewFunction = _ref => {
  var {
    props: {
      pageSize,
      pageSizeChange,
      pageSizes
    },
    width
  } = _ref;
  return createComponentVNode(2, SelectBox, {
    "displayExpr": "text",
    "valueExpr": "value",
    "dataSource": pageSizes,
    "value": pageSize,
    "valueChange": pageSizeChange,
    "width": width
  });
};
export var PageSizeSmallProps = {};
var PageSizeSmallPropsType = {
  defaultPageSize: PagerProps.pageSize
};
export class PageSizeSmall extends InfernoComponent {
  constructor(props) {
    super(props);
    this._currentState = null;
    this.state = {
      minWidth: 10,
      pageSize: this.props.pageSize !== undefined ? this.props.pageSize : this.props.defaultPageSize
    };
    this.updateWidth = this.updateWidth.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.updateWidth, [this.minWidth, this.__state_pageSize, this.props.pageSizeChange, this.props.pageSizes, this.props.defaultPageSize])];
  }

  updateEffects() {
    var _this$_effects$;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.minWidth, this.__state_pageSize, this.props.pageSizeChange, this.props.pageSizes, this.props.defaultPageSize]);
  }

  get minWidth() {
    var state = this._currentState || this.state;
    return state.minWidth;
  }

  set_minWidth(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this._currentState = null;
      return {
        minWidth: newValue
      };
    });
  }

  get __state_pageSize() {
    var state = this._currentState || this.state;
    return this.props.pageSize !== undefined ? this.props.pageSize : state.pageSize;
  }

  set_pageSize(value) {
    this.setState(state => {
      var _this$props$pageSizeC, _this$props;

      this._currentState = state;
      var newValue = value();
      (_this$props$pageSizeC = (_this$props = this.props).pageSizeChange) === null || _this$props$pageSizeC === void 0 ? void 0 : _this$props$pageSizeC.call(_this$props, newValue);
      this._currentState = null;
      return {
        pageSize: newValue
      };
    });
  }

  updateWidth() {
    this.set_minWidth(() => getElementMinWidth(this.props.parentRef.current) || this.minWidth);
  }

  get width() {
    return calculateValuesFittedWidth(this.minWidth, this.props.pageSizes.map(p => p.value));
  }

  get restAttributes() {
    var _this$props$pageSize = _extends({}, this.props, {
      pageSize: this.__state_pageSize
    }),
        restProps = _objectWithoutPropertiesLoose(_this$props$pageSize, _excluded);

    return restProps;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        pageSize: this.__state_pageSize
      }),
      width: this.width,
      restAttributes: this.restAttributes
    });
  }

}
PageSizeSmall.defaultProps = _extends({}, PageSizeSmallPropsType);
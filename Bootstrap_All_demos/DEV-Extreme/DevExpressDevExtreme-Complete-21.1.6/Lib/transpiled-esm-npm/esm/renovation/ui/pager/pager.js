import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["className", "defaultPageIndex", "defaultPageSize", "displayMode", "gridCompatibility", "hasKnownLastPage", "infoText", "lightModeEnabled", "maxPagesCount", "onKeyDown", "pageCount", "pageIndex", "pageIndexChange", "pageSize", "pageSizeChange", "pageSizes", "pagesCountText", "pagesNavigatorVisible", "rtlEnabled", "showInfo", "showNavigationButtons", "showPageSizes", "totalCount", "visible"];
import { createComponentVNode, normalizeProps } from "inferno";
import { InfernoWrapperComponent } from "@devextreme/vdom";
import { ResizableContainer } from "./resizable_container";
import { PagerProps } from "./common/pager_props";
import { PagerContent } from "./content";
import { combineClasses } from "../../utils/combine_classes";
export var viewFunction = _ref => {
  var {
    pagerProps,
    restAttributes
  } = _ref;
  return normalizeProps(createComponentVNode(2, ResizableContainer, _extends({
    "contentTemplate": PagerContent,
    "pagerProps": pagerProps
  }, restAttributes)));
};
export class Pager extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this._currentState = null;
    this.state = {
      pageIndex: this.props.pageIndex !== undefined ? this.props.pageIndex : this.props.defaultPageIndex,
      pageSize: this.props.pageSize !== undefined ? this.props.pageSize : this.props.defaultPageSize
    };
    this.pageIndexChange = this.pageIndexChange.bind(this);
    this.pageSizeChange = this.pageSizeChange.bind(this);
  }

  get __state_pageIndex() {
    var state = this._currentState || this.state;
    return this.props.pageIndex !== undefined ? this.props.pageIndex : state.pageIndex;
  }

  set_pageIndex(value) {
    this.setState(state => {
      var _this$props$pageIndex, _this$props;

      this._currentState = state;
      var newValue = value();
      (_this$props$pageIndex = (_this$props = this.props).pageIndexChange) === null || _this$props$pageIndex === void 0 ? void 0 : _this$props$pageIndex.call(_this$props, newValue);
      this._currentState = null;
      return {
        pageIndex: newValue
      };
    });
  }

  get __state_pageSize() {
    var state = this._currentState || this.state;
    return this.props.pageSize !== undefined ? this.props.pageSize : state.pageSize;
  }

  set_pageSize(value) {
    this.setState(state => {
      var _this$props$pageSizeC, _this$props2;

      this._currentState = state;
      var newValue = value();
      (_this$props$pageSizeC = (_this$props2 = this.props).pageSizeChange) === null || _this$props$pageSizeC === void 0 ? void 0 : _this$props$pageSizeC.call(_this$props2, newValue);
      this._currentState = null;
      return {
        pageSize: newValue
      };
    });
  }

  pageIndexChange(newPageIndex) {
    if (this.props.gridCompatibility) {
      this.set_pageIndex(() => newPageIndex + 1);
    } else {
      this.set_pageIndex(() => newPageIndex);
    }
  }

  get pageIndex() {
    if (this.props.gridCompatibility) {
      return this.__state_pageIndex - 1;
    }

    return this.__state_pageIndex;
  }

  pageSizeChange(newPageSize) {
    this.set_pageSize(() => newPageSize);
  }

  get className() {
    if (this.props.gridCompatibility) {
      return combineClasses({
        "dx-datagrid-pager": true,
        ["".concat(this.props.className)]: !!this.props.className
      });
    }

    return this.props.className;
  }

  get pagerProps() {
    return _extends({}, _extends({}, this.props, {
      pageIndex: this.__state_pageIndex,
      pageSize: this.__state_pageSize
    }), {
      className: this.className,
      pageIndex: this.pageIndex,
      pageIndexChange: pageIndex => this.pageIndexChange(pageIndex),
      pageSizeChange: pageSize => this.pageSizeChange(pageSize)
    });
  }

  get restAttributes() {
    var _this$props$pageIndex2 = _extends({}, this.props, {
      pageIndex: this.__state_pageIndex,
      pageSize: this.__state_pageSize
    }),
        restProps = _objectWithoutPropertiesLoose(_this$props$pageIndex2, _excluded);

    return restProps;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        pageIndex: this.__state_pageIndex,
        pageSize: this.__state_pageSize
      }),
      pageIndexChange: this.pageIndexChange,
      pageIndex: this.pageIndex,
      pageSizeChange: this.pageSizeChange,
      className: this.className,
      pagerProps: this.pagerProps,
      restAttributes: this.restAttributes
    });
  }

}
Pager.defaultProps = _extends({}, PagerProps);
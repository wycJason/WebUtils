import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["defaultPageSize", "isLargeDisplayMode", "pageSize", "pageSizeChange", "pageSizes", "rootElementRef"];
import { createVNode, createComponentVNode } from "inferno";
import { InfernoEffect, InfernoComponent } from "@devextreme/vdom";
import { PageSizeSmall } from "./small";
import { PageSizeLarge } from "./large";
import { PagerProps } from "../common/pager_props";
import messageLocalization from "../../../../localization/message";
import { PAGER_PAGE_SIZES_CLASS } from "../common/consts";
export var viewFunction = _ref => {
  var {
    htmlRef,
    normalizedPageSizes,
    props: {
      isLargeDisplayMode,
      pageSize,
      pageSizeChange
    }
  } = _ref;
  return createVNode(1, "div", PAGER_PAGE_SIZES_CLASS, [isLargeDisplayMode && createComponentVNode(2, PageSizeLarge, {
    "pageSizes": normalizedPageSizes,
    "pageSize": pageSize,
    "pageSizeChange": pageSizeChange
  }), !isLargeDisplayMode && createComponentVNode(2, PageSizeSmall, {
    "parentRef": htmlRef,
    "pageSizes": normalizedPageSizes,
    "pageSize": pageSize,
    "pageSizeChange": pageSizeChange
  })], 0, null, null, htmlRef);
};

function getAllText() {
  return messageLocalization.getFormatter("dxPager-pageSizesAllText")();
}

var PageSizeSelectorProps = {
  isLargeDisplayMode: true
};
var PageSizeSelectorPropsType = {
  pageSizes: PagerProps.pageSizes,
  isLargeDisplayMode: PageSizeSelectorProps.isLargeDisplayMode,
  defaultPageSize: PagerProps.pageSize
};
import { createRef as infernoCreateRef } from "inferno";
export class PageSizeSelector extends InfernoComponent {
  constructor(props) {
    super(props);
    this._currentState = null;
    this.htmlRef = infernoCreateRef();
    this.state = {
      pageSize: this.props.pageSize !== undefined ? this.props.pageSize : this.props.defaultPageSize
    };
    this.setRootElementRef = this.setRootElementRef.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.setRootElementRef, [])];
  }

  updateEffects() {}

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

  setRootElementRef() {
    var {
      rootElementRef
    } = this.props;

    if (rootElementRef) {
      rootElementRef.current = this.htmlRef.current;
    }
  }

  get normalizedPageSizes() {
    var {
      pageSizes
    } = this.props;
    return pageSizes.map(p => p === "all" || p === 0 ? {
      text: getAllText(),
      value: 0
    } : {
      text: String(p),
      value: p
    });
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
      htmlRef: this.htmlRef,
      normalizedPageSizes: this.normalizedPageSizes,
      restAttributes: this.restAttributes
    });
  }

}
PageSizeSelector.defaultProps = _extends({}, PageSizeSelectorPropsType);
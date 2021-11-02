import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["defaultPageIndex", "pageCount", "pageIndex", "pageIndexChange", "pagesCountText"];
import { createVNode, createComponentVNode } from "inferno";
import { InfernoEffect, InfernoComponent } from "@devextreme/vdom";
import { Page } from "./page";
import { PAGER_INFO_CLASS } from "../info";
import { NumberBox } from "../../number_box";
import messageLocalization from "../../../../localization/message";
import { calculateValuesFittedWidth } from "../utils/calculate_values_fitted_width";
import { getElementMinWidth } from "../utils/get_element_width";
import { PagerProps } from "../common/pager_props";
var PAGER_INFO_TEXT_CLASS = "".concat(PAGER_INFO_CLASS, "  dx-info-text");
var PAGER_PAGE_INDEX_CLASS = "dx-page-index";
var LIGHT_PAGES_CLASS = "dx-light-pages";
var PAGER_PAGES_COUNT_CLASS = "dx-pages-count";
export var viewFunction = _ref => {
  var {
    pageIndexRef,
    pagesCountText,
    props: {
      pageCount
    },
    selectLastPageIndex,
    value,
    valueChange,
    width
  } = _ref;
  return createVNode(1, "div", LIGHT_PAGES_CLASS, [createComponentVNode(2, NumberBox, {
    "rootElementRef": pageIndexRef,
    "className": PAGER_PAGE_INDEX_CLASS,
    "min": 1,
    "max": pageCount,
    "width": width,
    "value": value,
    "valueChange": valueChange
  }), createVNode(1, "span", PAGER_INFO_TEXT_CLASS, pagesCountText, 0), createComponentVNode(2, Page, {
    "className": PAGER_PAGES_COUNT_CLASS,
    "selected": false,
    "index": pageCount - 1,
    "onClick": selectLastPageIndex
  })], 4);
};
var PagerSmallProps = {
  pageCount: PagerProps.pageCount,
  defaultPageIndex: PagerProps.pageIndex
};
import { createRef as infernoCreateRef } from "inferno";
export class PagesSmall extends InfernoComponent {
  constructor(props) {
    super(props);
    this._currentState = null;
    this.pageIndexRef = infernoCreateRef();
    this.state = {
      minWidth: 10,
      pageIndex: this.props.pageIndex !== undefined ? this.props.pageIndex : this.props.defaultPageIndex
    };
    this.updateWidth = this.updateWidth.bind(this);
    this.selectLastPageIndex = this.selectLastPageIndex.bind(this);
    this.valueChange = this.valueChange.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.updateWidth, [this.minWidth])];
  }

  updateEffects() {
    var _this$_effects$;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.minWidth]);
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

  updateWidth() {
    this.set_minWidth(() => this.pageIndexRef.current && getElementMinWidth(this.pageIndexRef.current) || this.minWidth);
  }

  get value() {
    return this.__state_pageIndex + 1;
  }

  get width() {
    var pageCount = this.props.pageCount;
    return calculateValuesFittedWidth(this.minWidth, [pageCount]);
  }

  get pagesCountText() {
    return this.props.pagesCountText || messageLocalization.getFormatter("dxPager-pagesCountText")();
  }

  selectLastPageIndex() {
    var _this$props$pageIndex2, _this$props2;

    var {
      pageCount
    } = this.props;
    (_this$props$pageIndex2 = (_this$props2 = this.props).pageIndexChange) === null || _this$props$pageIndex2 === void 0 ? void 0 : _this$props$pageIndex2.call(_this$props2, pageCount - 1);
  }

  valueChange(value) {
    this.set_pageIndex(() => value - 1);
  }

  get restAttributes() {
    var _this$props$pageIndex3 = _extends({}, this.props, {
      pageIndex: this.__state_pageIndex
    }),
        restProps = _objectWithoutPropertiesLoose(_this$props$pageIndex3, _excluded);

    return restProps;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        pageIndex: this.__state_pageIndex
      }),
      pageIndexRef: this.pageIndexRef,
      value: this.value,
      width: this.width,
      pagesCountText: this.pagesCountText,
      selectLastPageIndex: this.selectLastPageIndex,
      valueChange: this.valueChange,
      restAttributes: this.restAttributes
    });
  }

}
PagesSmall.defaultProps = _extends({}, PagerSmallProps);
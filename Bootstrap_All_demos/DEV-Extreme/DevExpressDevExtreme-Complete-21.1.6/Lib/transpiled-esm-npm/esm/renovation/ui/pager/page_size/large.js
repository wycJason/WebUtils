import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["defaultPageSize", "pageSize", "pageSizeChange", "pageSizes"];
import { createFragment, createComponentVNode } from "inferno";
import { Fragment } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import { LightButton } from "../common/light_button";
import { PagerProps } from "../common/pager_props";
import { PAGER_SELECTED_PAGE_SIZE_CLASS, PAGER_PAGE_SIZE_CLASS } from "../common/consts";
export var viewFunction = _ref => {
  var {
    pageSizesText
  } = _ref;
  return createFragment(pageSizesText.map(_ref2 => {
    var {
      className,
      click,
      label,
      text
    } = _ref2;
    return createComponentVNode(2, LightButton, {
      "className": className,
      "label": label,
      "onClick": click,
      children: text
    }, text);
  }), 0);
};
export var PageSizeLargeProps = {};
var PageSizeLargePropsType = {
  defaultPageSize: PagerProps.pageSize
};
export class PageSizeLarge extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this._currentState = null;
    this.state = {
      pageSize: this.props.pageSize !== undefined ? this.props.pageSize : this.props.defaultPageSize
    };
    this.onPageSizeChange = this.onPageSizeChange.bind(this);
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

  get pageSizesText() {
    var {
      pageSizes
    } = this.props;
    return pageSizes.map(_ref3 => {
      var {
        text,
        value: processedPageSize
      } = _ref3;
      var selected = processedPageSize === this.__state_pageSize;
      var className = selected ? PAGER_SELECTED_PAGE_SIZE_CLASS : PAGER_PAGE_SIZE_CLASS;
      return {
        className,
        click: this.onPageSizeChange(processedPageSize),
        label: "Display ".concat(processedPageSize, " items on page"),
        text
      };
    });
  }

  onPageSizeChange(processedPageSize) {
    return () => {
      this.set_pageSize(() => processedPageSize);
    };
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
      pageSizesText: this.pageSizesText,
      restAttributes: this.restAttributes
    });
  }

}
PageSizeLarge.defaultProps = _extends({}, PageSizeLargePropsType);
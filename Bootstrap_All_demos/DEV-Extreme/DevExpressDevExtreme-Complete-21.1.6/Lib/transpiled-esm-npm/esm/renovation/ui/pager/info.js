import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["defaultPageIndex", "infoText", "pageCount", "pageIndex", "pageIndexChange", "rootElementRef", "totalCount"];
import { createVNode } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import { format } from "../../../core/utils/string";
import messageLocalization from "../../../localization/message";
import { PagerProps } from "./common/pager_props";
export var PAGER_INFO_CLASS = "dx-info";
export var viewFunction = _ref => {
  var {
    props: {
      rootElementRef
    },
    text
  } = _ref;
  return createVNode(1, "div", PAGER_INFO_CLASS, text, 0, null, null, rootElementRef);
};
export var InfoTextProps = {};
var InfoTextPropsType = {
  pageCount: PagerProps.pageCount,
  totalCount: PagerProps.totalCount,
  defaultPageIndex: PagerProps.pageIndex,
  pageIndexChange: () => {}
};
export class InfoText extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this._currentState = null;
    this.state = {
      pageIndex: this.props.pageIndex !== undefined ? this.props.pageIndex : this.props.defaultPageIndex
    };
  }

  get __state_pageIndex() {
    var state = this._currentState || this.state;
    return this.props.pageIndex !== undefined ? this.props.pageIndex : state.pageIndex;
  }

  set_pageIndex(value) {
    this.setState(state => {
      this._currentState = state;
      var newValue = value();
      this.props.pageIndexChange(newValue);
      this._currentState = null;
      return {
        pageIndex: newValue
      };
    });
  }

  get infoText() {
    return this.props.infoText || messageLocalization.getFormatter("dxPager-infoText")();
  }

  get text() {
    var {
      pageCount,
      totalCount
    } = this.props;
    return format(this.infoText, (this.__state_pageIndex + 1).toString(), pageCount.toString(), totalCount.toString());
  }

  get restAttributes() {
    var _this$props$pageIndex = _extends({}, this.props, {
      pageIndex: this.__state_pageIndex
    }),
        restProps = _objectWithoutPropertiesLoose(_this$props$pageIndex, _excluded);

    return restProps;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        pageIndex: this.__state_pageIndex
      }),
      infoText: this.infoText,
      text: this.text,
      restAttributes: this.restAttributes
    });
  }

}
InfoText.defaultProps = _extends({}, InfoTextPropsType);
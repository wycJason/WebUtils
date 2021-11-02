import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["pageIndexes"],
    _excluded2 = ["defaultPageIndex", "maxPagesCount", "pageCount", "pageIndex", "pageIndexChange"];
import { createVNode, createFragment, createComponentVNode } from "inferno";
import { Fragment } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import { Page } from "./page";
import { PagerProps } from "../common/pager_props";
import { ConfigContext } from "../../../common/config_context";
var PAGER_PAGE_SEPARATOR_CLASS = "dx-separator";
export var viewFunction = _ref => {
  var {
    pages
  } = _ref;
  var PagesMarkup = pages.map(_ref2 => {
    var {
      key,
      pageProps
    } = _ref2;
    return pageProps ? createComponentVNode(2, Page, {
      "index": pageProps.index,
      "selected": pageProps.selected,
      "onClick": pageProps.onClick
    }, key) : createVNode(1, "div", PAGER_PAGE_SEPARATOR_CLASS, ". . .", 16, null, key);
  });
  return createFragment(PagesMarkup, 0);
};
var PAGES_LIMITER = 4;

function getDelimiterType(startIndex, slidingWindowSize, pageCount) {
  if (startIndex === 1) {
    return "high";
  }

  if (startIndex + slidingWindowSize === pageCount - 1) {
    return "low";
  }

  return "both";
}

function createPageIndexesBySlidingWindowIndexes(slidingWindowIndexes, pageCount, delimiter) {
  var pageIndexes = [];
  var indexesForReuse = [];

  switch (delimiter) {
    case "none":
      pageIndexes = [...slidingWindowIndexes];
      break;

    case "both":
      pageIndexes = [0, "low", ...slidingWindowIndexes, "high", pageCount - 1];
      indexesForReuse = slidingWindowIndexes.slice(1, -1);
      break;

    case "high":
      pageIndexes = [0, ...slidingWindowIndexes, "high", pageCount - 1];
      indexesForReuse = slidingWindowIndexes.slice(0, -1);
      break;

    case "low":
      pageIndexes = [0, "low", ...slidingWindowIndexes, pageCount - 1];
      indexesForReuse = slidingWindowIndexes.slice(1);
      break;
  }

  return {
    slidingWindowIndexes,
    indexesForReuse,
    pageIndexes
  };
}

function createPageIndexes(startIndex, slidingWindowSize, pageCount, delimiter) {
  var slidingWindowIndexes = [];

  for (var i = 0; i < slidingWindowSize; i += 1) {
    slidingWindowIndexes.push(i + startIndex);
  }

  return createPageIndexesBySlidingWindowIndexes(slidingWindowIndexes, pageCount, delimiter);
}

var PagesLargePropsType = {
  maxPagesCount: PagerProps.maxPagesCount,
  pageCount: PagerProps.pageCount,
  defaultPageIndex: PagerProps.pageIndex
};
export class PagesLarge extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this._currentState = null;
    this.state = {
      pageIndex: this.props.pageIndex !== undefined ? this.props.pageIndex : this.props.defaultPageIndex
    };
    this.canReuseSlidingWindow = this.canReuseSlidingWindow.bind(this);
    this.generatePageIndexes = this.generatePageIndexes.bind(this);
    this.isSlidingWindowMode = this.isSlidingWindowMode.bind(this);
    this.onPageClick = this.onPageClick.bind(this);
  }

  get config() {
    if ("ConfigContext" in this.context) {
      return this.context.ConfigContext;
    }

    return ConfigContext;
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

  get slidingWindowState() {
    var slidingWindowState = this.slidingWindowStateHolder;

    if (!slidingWindowState) {
      return {
        indexesForReuse: [],
        slidingWindowIndexes: []
      };
    }

    return slidingWindowState;
  }

  canReuseSlidingWindow(currentPageCount, pageIndex) {
    var {
      indexesForReuse
    } = this.slidingWindowState;
    var currentPageNotExistInIndexes = indexesForReuse.indexOf(currentPageCount) === -1;
    var pageIndexExistInIndexes = indexesForReuse.indexOf(pageIndex) !== -1;
    return currentPageNotExistInIndexes && pageIndexExistInIndexes;
  }

  generatePageIndexes() {
    var {
      pageCount
    } = this.props;
    var startIndex = 0;
    var {
      slidingWindowIndexes
    } = this.slidingWindowState;

    if (this.__state_pageIndex === slidingWindowIndexes[0]) {
      startIndex = this.__state_pageIndex - 1;
    } else if (this.__state_pageIndex === slidingWindowIndexes[slidingWindowIndexes.length - 1]) {
      startIndex = this.__state_pageIndex + 2 - PAGES_LIMITER;
    } else if (this.__state_pageIndex < PAGES_LIMITER) {
      startIndex = 1;
    } else if (this.__state_pageIndex >= pageCount - PAGES_LIMITER) {
      startIndex = pageCount - PAGES_LIMITER - 1;
    } else {
      startIndex = this.__state_pageIndex - 1;
    }

    var slidingWindowSize = PAGES_LIMITER;
    var delimiter = getDelimiterType(startIndex, slidingWindowSize, pageCount);

    var _createPageIndexes = createPageIndexes(startIndex, slidingWindowSize, pageCount, delimiter),
        {
      pageIndexes
    } = _createPageIndexes,
        slidingWindowState = _objectWithoutPropertiesLoose(_createPageIndexes, _excluded);

    this.slidingWindowStateHolder = slidingWindowState;
    return pageIndexes;
  }

  isSlidingWindowMode() {
    var {
      maxPagesCount,
      pageCount
    } = this.props;
    return pageCount <= PAGES_LIMITER || pageCount <= maxPagesCount;
  }

  onPageClick(pageIndex) {
    var _this$props$pageIndex2, _this$props2;

    (_this$props$pageIndex2 = (_this$props2 = this.props).pageIndexChange) === null || _this$props$pageIndex2 === void 0 ? void 0 : _this$props$pageIndex2.call(_this$props2, pageIndex);
  }

  get pageIndexes() {
    var {
      pageCount
    } = this.props;

    if (this.isSlidingWindowMode()) {
      return createPageIndexes(0, pageCount, pageCount, "none").pageIndexes;
    }

    if (this.canReuseSlidingWindow(pageCount, this.__state_pageIndex)) {
      var {
        slidingWindowIndexes
      } = this.slidingWindowState;
      var delimiter = getDelimiterType(slidingWindowIndexes[0], PAGES_LIMITER, pageCount);
      return createPageIndexesBySlidingWindowIndexes(slidingWindowIndexes, pageCount, delimiter).pageIndexes;
    }

    return this.generatePageIndexes();
  }

  get pages() {
    var _this$config;

    var createPage = index => {
      var pagerProps = index === "low" || index === "high" ? null : {
        index,
        onClick: () => this.onPageClick(index),
        selected: this.__state_pageIndex === index
      };
      return {
        key: index.toString(),
        pageProps: pagerProps
      };
    };

    var rtlPageIndexes = (_this$config = this.config) !== null && _this$config !== void 0 && _this$config.rtlEnabled ? [...this.pageIndexes].reverse() : this.pageIndexes;
    return rtlPageIndexes.map(index => createPage(index));
  }

  get restAttributes() {
    var _this$props$pageIndex3 = _extends({}, this.props, {
      pageIndex: this.__state_pageIndex
    }),
        restProps = _objectWithoutPropertiesLoose(_this$props$pageIndex3, _excluded2);

    return restProps;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        pageIndex: this.__state_pageIndex
      }),
      config: this.config,
      pageIndexes: this.pageIndexes,
      pages: this.pages,
      restAttributes: this.restAttributes
    });
  }

}
PagesLarge.defaultProps = _extends({}, PagesLargePropsType);
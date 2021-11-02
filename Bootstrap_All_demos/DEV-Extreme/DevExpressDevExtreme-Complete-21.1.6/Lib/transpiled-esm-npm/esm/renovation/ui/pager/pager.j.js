import registerComponent from "../../../core/component_registrator";
import { GridPagerWrapper } from "../../component_wrapper/grid_pager";
import { Pager as PagerComponent } from "./pager";
export default class Pager extends GridPagerWrapper {
  getProps() {
    var props = super.getProps();
    props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
    return props;
  }

  get _propsInfo() {
    return {
      twoWay: [["pageIndex", 1, "pageIndexChange"], ["pageSize", 5, "pageSizeChange"]],
      allowNull: [],
      elements: [],
      templates: [],
      props: ["gridCompatibility", "className", "showInfo", "infoText", "lightModeEnabled", "displayMode", "maxPagesCount", "pageCount", "pagesCountText", "visible", "hasKnownLastPage", "pagesNavigatorVisible", "pageIndexChange", "pageSizeChange", "showPageSizes", "pageSizes", "rtlEnabled", "showNavigationButtons", "totalCount", "onKeyDown", "defaultPageIndex", "defaultPageSize", "pageIndex", "pageSize"]
    };
  }

  get _viewComponent() {
    return PagerComponent;
  }

}
registerComponent("dxPager", Pager);
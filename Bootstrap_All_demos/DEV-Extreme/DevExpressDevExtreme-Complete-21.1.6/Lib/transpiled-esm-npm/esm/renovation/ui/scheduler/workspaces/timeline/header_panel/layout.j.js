import registerComponent from "../../../../../../core/component_registrator";
import HeaderPanel from "../../../../../component_wrapper/scheduler_header_panel";
import { TimelineHeaderPanelLayout as TimelineHeaderPanelLayoutComponent } from "./layout";
export default class TimelineHeaderPanelLayout extends HeaderPanel {
  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: [],
      templates: ["dateCellTemplate", "timeCellTemplate", "dateHeaderTemplate", "resourceCellTemplate"],
      props: ["dateHeaderData", "isRenderDateHeader", "groupPanelCellBaseColSpan", "dateCellTemplate", "timeCellTemplate", "dateHeaderTemplate", "groups", "groupOrientation", "groupByDate", "height", "baseColSpan", "columnCountPerGroup", "className", "resourceCellTemplate"]
    };
  }

  get _viewComponent() {
    return TimelineHeaderPanelLayoutComponent;
  }

}
registerComponent("dxTimelineHeaderPanelLayout", TimelineHeaderPanelLayout);
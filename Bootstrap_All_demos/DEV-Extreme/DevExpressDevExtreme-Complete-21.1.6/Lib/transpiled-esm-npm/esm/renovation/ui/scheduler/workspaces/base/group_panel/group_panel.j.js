import registerComponent from "../../../../../../core/component_registrator";
import BaseComponent from "../../../../../component_wrapper/component";
import { GroupPanel as GroupPanelComponent } from "./group_panel";
export default class GroupPanel extends BaseComponent {
  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: [],
      templates: ["resourceCellTemplate"],
      props: ["groups", "groupOrientation", "groupByDate", "height", "baseColSpan", "columnCountPerGroup", "className", "resourceCellTemplate"]
    };
  }

  get _viewComponent() {
    return GroupPanelComponent;
  }

}
registerComponent("dxGroupPanel", GroupPanel);
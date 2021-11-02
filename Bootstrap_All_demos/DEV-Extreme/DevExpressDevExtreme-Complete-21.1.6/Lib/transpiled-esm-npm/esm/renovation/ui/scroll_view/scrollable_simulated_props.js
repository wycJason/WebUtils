import _extends from "@babel/runtime/helpers/esm/extends";
import { ScrollableProps } from "./scrollable_props";
import { BaseWidgetProps } from "../common/base_props";
import { WidgetProps } from "../common/widget";
export var ScrollableSimulatedProps = _extends({}, ScrollableProps, {
  inertiaEnabled: true,
  useKeyboard: true
});
export var ScrollableSimulatedPropsType = {
  inertiaEnabled: ScrollableSimulatedProps.inertiaEnabled,
  useKeyboard: ScrollableSimulatedProps.useKeyboard,
  useNative: ScrollableSimulatedProps.useNative,
  direction: ScrollableSimulatedProps.direction,
  showScrollbar: ScrollableSimulatedProps.showScrollbar,
  bounceEnabled: ScrollableSimulatedProps.bounceEnabled,
  scrollByContent: ScrollableSimulatedProps.scrollByContent,
  scrollByThumb: ScrollableSimulatedProps.scrollByThumb,
  updateManually: ScrollableSimulatedProps.updateManually,
  pullDownEnabled: ScrollableSimulatedProps.pullDownEnabled,
  reachBottomEnabled: ScrollableSimulatedProps.reachBottomEnabled,
  forceGeneratePockets: ScrollableSimulatedProps.forceGeneratePockets,
  needScrollViewContentWrapper: ScrollableSimulatedProps.needScrollViewContentWrapper,
  needScrollViewLoadPanel: ScrollableSimulatedProps.needScrollViewLoadPanel,
  aria: WidgetProps.aria,
  disabled: BaseWidgetProps.disabled,
  visible: BaseWidgetProps.visible
};
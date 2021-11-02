import noop from "../../utils/noop";
import { TopPocketState } from "./common/consts";
export var ScrollbarProps = {
  activeStateEnabled: false,
  containerSize: 0,
  contentSize: 0,
  topPocketSize: 0,
  bottomPocketSize: 0,
  scrollableOffset: 0,
  isScrollableHovered: false,
  forceVisibility: false,
  forceUpdateScrollbarLocation: false,
  scrollLocation: 0,
  onAnimatorCancel: noop,
  onPullDown: noop,
  onReachBottom: noop,
  onRelease: noop,
  defaultPocketState: TopPocketState.STATE_RELEASED
};
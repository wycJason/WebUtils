import { isDefined, isPlainObject } from "../../../../core/utils/type";
import { ensureDefined } from "../../../../core/utils/common";
import { ScrollDirection } from "./scroll_direction";
export function restoreLocation(location, direction) {
  if (isPlainObject(location)) {
    var left = ensureDefined(location.left, location.x);
    var top = ensureDefined(location.top, location.y);
    return {
      left: isDefined(left) ? -left : undefined,
      top: isDefined(top) ? -top : undefined
    };
  }

  var {
    isHorizontal,
    isVertical
  } = new ScrollDirection(direction);
  return {
    left: isHorizontal ? -location : undefined,
    top: isVertical ? -location : undefined
  };
}
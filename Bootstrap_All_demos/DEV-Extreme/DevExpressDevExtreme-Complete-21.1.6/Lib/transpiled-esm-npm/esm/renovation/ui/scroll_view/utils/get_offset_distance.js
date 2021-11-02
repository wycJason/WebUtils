import { ensureDefined } from "../../../../core/utils/common";
import { restoreLocation } from "./restore_location";
export function getOffsetDistance(targetLocation, direction, scrollOffset) {
  var location = restoreLocation(targetLocation, direction);
  var top = -scrollOffset.top - ensureDefined(location.top, -scrollOffset.top);
  var left = -scrollOffset.left - ensureDefined(location.left, -scrollOffset.left);
  return {
    top,
    left
  };
}
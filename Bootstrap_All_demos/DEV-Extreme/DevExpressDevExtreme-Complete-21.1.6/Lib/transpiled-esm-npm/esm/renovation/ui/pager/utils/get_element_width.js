import getElementComputedStyle from "../../../utils/get_computed_style";
import { toNumber } from "../../../utils/type_conversion";
export function getElementStyle(name, element) {
  var computedStyle = getElementComputedStyle(element) || {};
  return toNumber(computedStyle[name]);
}
export function getElementWidth(element) {
  return getElementStyle("width", element);
}
export function getElementMinWidth(element) {
  return getElementStyle("minWidth", element);
}
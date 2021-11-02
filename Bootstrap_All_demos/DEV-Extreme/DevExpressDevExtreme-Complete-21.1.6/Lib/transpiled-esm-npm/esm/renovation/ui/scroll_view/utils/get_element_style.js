import getElementComputedStyle from "../../../utils/get_computed_style";
export function getElementStyle(name, element) {
  var computedStyle = getElementComputedStyle(element) || {};
  return computedStyle[name];
}
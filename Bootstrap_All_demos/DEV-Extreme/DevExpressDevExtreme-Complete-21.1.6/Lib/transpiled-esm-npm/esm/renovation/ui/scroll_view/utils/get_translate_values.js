import { getElementStyle } from "./get_element_style";
export function getTranslateValues(element) {
  if (!element) return {
    left: 0,
    top: 0
  };
  var matrix = getElementStyle("transform", element);
  var regex = /matrix.*\((.+)\)/;
  var matrixValues = regex.exec(matrix);

  if (matrixValues) {
    var result = matrixValues[1].split(", ");
    return {
      left: Number(result[4]),
      top: Number(result[5])
    };
  }

  return {
    left: 0,
    top: 0
  };
}
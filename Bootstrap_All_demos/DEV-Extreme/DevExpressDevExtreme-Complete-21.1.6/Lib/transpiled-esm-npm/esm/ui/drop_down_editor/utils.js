import { hasWindow } from '../../core/utils/window';

var getElementWidth = function getElementWidth($element) {
  if (hasWindow()) {
    return $element.outerWidth();
  }
};

var getSizeValue = function getSizeValue(size) {
  if (size === null) {
    size = undefined;
  }

  if (typeof size === 'function') {
    size = size();
  }

  return size;
};

export { getElementWidth, getSizeValue };
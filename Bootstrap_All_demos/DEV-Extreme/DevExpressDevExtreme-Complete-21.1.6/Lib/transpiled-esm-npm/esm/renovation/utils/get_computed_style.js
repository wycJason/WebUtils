export default function getElementComputedStyle(el) {
  var _window$getComputedSt, _window;

  return el ? (_window$getComputedSt = (_window = window).getComputedStyle) === null || _window$getComputedSt === void 0 ? void 0 : _window$getComputedSt.call(_window, el) : null;
}
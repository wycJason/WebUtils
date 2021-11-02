export default function getElementOffset(elem) {
  if (!elem) return null;
  var rect = elem.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX
  };
}
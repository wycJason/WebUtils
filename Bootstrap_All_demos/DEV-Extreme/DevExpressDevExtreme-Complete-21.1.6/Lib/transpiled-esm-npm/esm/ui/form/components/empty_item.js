export var FIELD_EMPTY_ITEM_CLASS = 'dx-field-empty-item';
export function renderEmptyItemTo(_ref) {
  var {
    $container
  } = _ref;
  return $container.addClass(FIELD_EMPTY_ITEM_CLASS).html('&nbsp;');
}
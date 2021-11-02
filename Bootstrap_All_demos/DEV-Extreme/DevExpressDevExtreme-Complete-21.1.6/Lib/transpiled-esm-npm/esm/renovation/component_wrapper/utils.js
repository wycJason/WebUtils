import _extends from "@babel/runtime/helpers/esm/extends";
import { each } from "../../core/utils/iterator";
import { isPlainObject } from "../../core/utils/type";
export var addAttributes = ($element, attributes) => {
  each(attributes, (_, _ref) => {
    var {
      name,
      value
    } = _ref;

    if (name === "class") {
      $element.addClass(value);
    } else {
      $element.attr(name, value);
    }
  });
};
export function getAriaName(name) {
  return name === "role" || name === "id" ? name : "aria-".concat(name);
}
export var removeDifferentElements = ($children, $newChildren) => {
  each($newChildren, (__, element) => {
    var hasComponent = false;
    each($children, (_, oldElement) => {
      if (element === oldElement) {
        hasComponent = true;
      }
    });

    if (!hasComponent && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  });
};
export function updatePropsImmutable(props, option, name, fullName) {
  var currentPropsValue = option[name];
  var result = props;

  if (name !== fullName) {
    if (Array.isArray(currentPropsValue)) {
      var newArray = [...currentPropsValue];
      result[name] = newArray;
      var matchIndex = /\[\s*(\d+)\s*\]/g.exec(fullName);

      if (matchIndex) {
        var index = parseInt(matchIndex[1], 10);

        if (isPlainObject(newArray[index])) {
          newArray[index] = _extends({}, currentPropsValue[index]);
        }
      }

      return;
    }
  }

  if (isPlainObject(currentPropsValue)) {
    result[name] = _extends({}, currentPropsValue);
  } else {
    result[name] = currentPropsValue;
  }
}
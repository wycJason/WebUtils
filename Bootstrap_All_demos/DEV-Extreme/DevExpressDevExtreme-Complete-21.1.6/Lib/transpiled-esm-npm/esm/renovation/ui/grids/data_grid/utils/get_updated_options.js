import _extends from "@babel/runtime/helpers/esm/extends";
import { isPlainObject, type } from "../../../../../core/utils/type";

function getDiffItem(key, value, previousValue) {
  return {
    path: key,
    value,
    previousValue
  };
}

function compare(resultPaths, item1, item2, key) {
  var type1 = type(item1);
  var type2 = type(item2);
  if (item1 === item2) return;

  if (type1 !== type2) {
    resultPaths.push(getDiffItem(key, item2, item1));
  } else if (type1 === "object") {
    if (!isPlainObject(item2)) {
      resultPaths.push(getDiffItem(key, item2, item1));
    } else {
      var diffPaths = objectDiffs(item1, item2);
      resultPaths.push(...diffPaths.map(item => _extends({}, item, {
        path: "".concat(key, ".").concat(item.path)
      })));
    }
  } else if (type1 === "array") {
    if (key !== "columns" && item1 !== item2) {
      resultPaths.push(getDiffItem(key, item2, item1));
    } else if (item1.length !== item2.length) {
      resultPaths.push(getDiffItem(key, item2, item1));
    } else {
      var _diffPaths = objectDiffs(item1, item2);

      [].push.apply(resultPaths, _diffPaths.map(item => _extends({}, item, {
        path: "".concat(key).concat(item.path)
      })));
    }
  } else {
    resultPaths.push(getDiffItem(key, item2, item1));
  }
}

var objectDiffsFiltered = propsEnumerator => (oldProps, props) => {
  var resultPaths = [];
  var processItem = !Array.isArray(oldProps) ? propName => compare(resultPaths, oldProps[propName], props[propName], propName) : propName => compare(resultPaths, oldProps[propName], props[propName], "[".concat(propName, "]"));
  propsEnumerator(oldProps).forEach(processItem);
  Object.keys(props).filter(propName => !Object.prototype.hasOwnProperty.call(oldProps, propName) && oldProps[propName] !== props[propName]).forEach(propName => {
    resultPaths.push({
      path: propName,
      value: props[propName],
      previousValue: oldProps[propName]
    });
  });
  return resultPaths;
};

var objectDiffs = objectDiffsFiltered(oldProps => Object.keys(oldProps));
var reactProps = {
  key: true,
  ref: true,
  children: true,
  style: true
};
var objectDiffsWithoutReactProps = objectDiffsFiltered(prop => Object.keys(prop).filter(p => !reactProps[p]));
export function getUpdatedOptions(oldProps, props) {
  return objectDiffsWithoutReactProps(oldProps, props);
}
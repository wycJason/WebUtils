"use strict";

exports.getTableFormats = getTableFormats;
exports.getTableOperationHandler = getTableOperationHandler;
exports.TABLE_OPERATIONS = void 0;
var TABLE_FORMATS = ['table', 'tableHeaderCell'];
var TABLE_OPERATIONS = ['insertTable', 'insertHeaderRow', 'insertRowAbove', 'insertRowBelow', 'insertColumnLeft', 'insertColumnRight', 'deleteColumn', 'deleteRow', 'deleteTable'];
exports.TABLE_OPERATIONS = TABLE_OPERATIONS;

function getTableFormats(quill) {
  var tableModule = quill.getModule('table'); // backward compatibility with an old devextreme-quill packages

  return tableModule !== null && tableModule !== void 0 && tableModule.tableFormats ? tableModule.tableFormats() : TABLE_FORMATS;
}

function getTableOperationHandler(quill, operationName) {
  for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    rest[_key - 2] = arguments[_key];
  }

  return function () {
    var table = quill.getModule('table');

    if (!table) {
      return;
    }

    quill.focus();
    return table[operationName].apply(table, rest);
  };
}
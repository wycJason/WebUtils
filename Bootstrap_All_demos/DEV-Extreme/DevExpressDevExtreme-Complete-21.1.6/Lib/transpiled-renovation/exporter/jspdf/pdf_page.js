"use strict";

exports.PdfPage = void 0;

var _type = require("../../core/utils/type");

var PdfPage = /*#__PURE__*/function () {
  function PdfPage(table) {
    this._tables = (0, _type.isDefined)(table) ? [table] : [];
  }

  var _proto = PdfPage.prototype;

  _proto.addTable = function addTable(table) {
    this._tables.push(table);
  };

  return PdfPage;
}();

exports.PdfPage = PdfPage;
"use strict";

exports.drawPdfTable = drawPdfTable;

var _extend = require("../../core/utils/extend");

var _type = require("../../core/utils/type");

var _pdf_utils = require("./pdf_utils");

// this function is large and will grow
function drawPdfTable(doc, styles, table, options) {
  if (!(0, _type.isDefined)(doc)) {
    throw 'doc is required';
  }

  var _ref = options !== null && options !== void 0 ? options : {},
      allowDrawBorders = _ref.allowDrawBorders,
      allowDrawCustomBorders = _ref.allowDrawCustomBorders,
      allowDrawCellContent = _ref.allowDrawCellContent;

  function drawBackColor(doc, cell) {
    if ((0, _type.isDefined)(cell.backgroundColor)) {
      doc.setFillColor(cell.backgroundColor);
      (0, _pdf_utils.drawRect)(doc, cell._rect.x, cell._rect.y, cell._rect.w, cell._rect.h, 'F');
    }
  }

  function drawBorder(rect) {
    var drawLeftBorder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var drawRightBorder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var drawTopBorder = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var drawBottomBorder = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

    if (!(0, _type.isDefined)(rect)) {
      throw 'rect is required';
    }

    var defaultBorderLineWidth = 1;

    if (!drawLeftBorder && !drawRightBorder && !drawTopBorder && !drawBottomBorder) {
      return;
    } else if (drawLeftBorder && drawRightBorder && drawTopBorder && drawBottomBorder) {
      doc.setLineWidth(defaultBorderLineWidth);
      (0, _pdf_utils.drawRect)(doc, rect.x, rect.y, rect.w, rect.h);
    } else {
      doc.setLineWidth(defaultBorderLineWidth);

      if (drawTopBorder) {
        (0, _pdf_utils.drawLine)(doc, rect.x, rect.y, rect.x + rect.w, rect.y); // top
      }

      if (drawLeftBorder) {
        (0, _pdf_utils.drawLine)(doc, rect.x, rect.y, rect.x, rect.y + rect.h); // left
      }

      if (drawRightBorder) {
        (0, _pdf_utils.drawLine)(doc, rect.x + rect.w, rect.y, rect.x + rect.w, rect.y + rect.h); // right
      }

      if (drawBottomBorder) {
        (0, _pdf_utils.drawLine)(doc, rect.x, rect.y + rect.h, rect.x + rect.w, rect.y + rect.h); // bottom
      }
    }
  }

  function drawRow(rowCells) {
    if (!(0, _type.isDefined)(rowCells)) {
      throw 'rowCells is required';
    }

    rowCells.forEach(function (cell) {
      if (cell.skip === true) {
        return;
      }

      if (!(0, _type.isDefined)(cell._rect)) {
        throw 'cell._rect is required';
      }

      if (allowDrawCellContent === true) {
        drawBackColor(doc, cell);
        var font = (0, _type.isDefined)(cell.font) ? (0, _extend.extend)({}, styles.font, cell.font) : styles.font;
        var docFont = doc.getFont();

        if (font.name !== docFont.fontName || font.style !== docFont.fontStyle || (0, _type.isDefined)(font.weight) // fontWeight logic, https://raw.githack.com/MrRio/jsPDF/master/docs/jspdf.js.html#line4842
        ) {
          doc.setFont(font.name, font.style, font.weight);
        }

        if (font.size !== doc.getFontSize()) {
          doc.setFontSize(font.size);
        }

        var textColor = (0, _type.isDefined)(cell.textColor) ? cell.textColor : styles.textColor;

        if (textColor !== doc.getTextColor()) {
          doc.setTextColor(textColor);
        }

        if ((0, _type.isDefined)(cell.text) && cell.text !== '') {
          // TODO: use cell.text.trim() ?
          (0, _pdf_utils.drawTextInRect)(doc, cell.text, cell._rect, cell.wordWrapEnabled, cell.jsPdfTextOptions);
        }
      }

      var isDrawBorders = (0, _type.isDefined)(cell.borderColor) ? allowDrawCustomBorders === true : allowDrawBorders === true;

      if (isDrawBorders) {
        var borderColor = (0, _type.isDefined)(cell.borderColor) ? cell.borderColor : styles.borderColor;

        if (borderColor !== doc.getDrawColor()) {
          doc.setDrawColor(borderColor);
        }

        drawBorder(cell._rect, cell.drawLeftBorder, cell.drawRightBorder, cell.drawTopBorder, cell.drawBottomBorder);
      }
    });
  }

  if (!(0, _type.isDefined)(table)) {
    return Promise.resolve();
  }

  if (!(0, _type.isDefined)(table.rect)) {
    throw 'table.rect is required';
  }

  if ((0, _type.isDefined)(table.rows)) {
    for (var rowIndex = 0; rowIndex < table.rows.length; rowIndex++) {
      drawRow(table.rows[rowIndex]);
    }
  }

  if (allowDrawBorders === true && ((0, _type.isDefined)(table.drawTableBorder) ? table.drawTableBorder : (0, _type.isDefined)(table.rows) && table.rows.length === 0)) {
    drawBorder(table.rect);
  }
}
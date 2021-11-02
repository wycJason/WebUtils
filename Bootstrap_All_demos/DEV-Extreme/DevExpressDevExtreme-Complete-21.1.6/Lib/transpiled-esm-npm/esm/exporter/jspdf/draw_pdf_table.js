import { extend } from '../../core/utils/extend';
import { isDefined } from '../../core/utils/type';
import { drawLine, drawRect, drawTextInRect } from './pdf_utils'; // this function is large and will grow

export function drawPdfTable(doc, styles, table, options) {
  if (!isDefined(doc)) {
    throw 'doc is required';
  }

  var {
    allowDrawBorders,
    allowDrawCustomBorders,
    allowDrawCellContent
  } = options !== null && options !== void 0 ? options : {};

  function drawBackColor(doc, cell) {
    if (isDefined(cell.backgroundColor)) {
      doc.setFillColor(cell.backgroundColor);
      drawRect(doc, cell._rect.x, cell._rect.y, cell._rect.w, cell._rect.h, 'F');
    }
  }

  function drawBorder(rect) {
    var drawLeftBorder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var drawRightBorder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var drawTopBorder = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var drawBottomBorder = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

    if (!isDefined(rect)) {
      throw 'rect is required';
    }

    var defaultBorderLineWidth = 1;

    if (!drawLeftBorder && !drawRightBorder && !drawTopBorder && !drawBottomBorder) {
      return;
    } else if (drawLeftBorder && drawRightBorder && drawTopBorder && drawBottomBorder) {
      doc.setLineWidth(defaultBorderLineWidth);
      drawRect(doc, rect.x, rect.y, rect.w, rect.h);
    } else {
      doc.setLineWidth(defaultBorderLineWidth);

      if (drawTopBorder) {
        drawLine(doc, rect.x, rect.y, rect.x + rect.w, rect.y); // top
      }

      if (drawLeftBorder) {
        drawLine(doc, rect.x, rect.y, rect.x, rect.y + rect.h); // left
      }

      if (drawRightBorder) {
        drawLine(doc, rect.x + rect.w, rect.y, rect.x + rect.w, rect.y + rect.h); // right
      }

      if (drawBottomBorder) {
        drawLine(doc, rect.x, rect.y + rect.h, rect.x + rect.w, rect.y + rect.h); // bottom
      }
    }
  }

  function drawRow(rowCells) {
    if (!isDefined(rowCells)) {
      throw 'rowCells is required';
    }

    rowCells.forEach(cell => {
      if (cell.skip === true) {
        return;
      }

      if (!isDefined(cell._rect)) {
        throw 'cell._rect is required';
      }

      if (allowDrawCellContent === true) {
        drawBackColor(doc, cell);
        var font = isDefined(cell.font) ? extend({}, styles.font, cell.font) : styles.font;
        var docFont = doc.getFont();

        if (font.name !== docFont.fontName || font.style !== docFont.fontStyle || isDefined(font.weight) // fontWeight logic, https://raw.githack.com/MrRio/jsPDF/master/docs/jspdf.js.html#line4842
        ) {
          doc.setFont(font.name, font.style, font.weight);
        }

        if (font.size !== doc.getFontSize()) {
          doc.setFontSize(font.size);
        }

        var textColor = isDefined(cell.textColor) ? cell.textColor : styles.textColor;

        if (textColor !== doc.getTextColor()) {
          doc.setTextColor(textColor);
        }

        if (isDefined(cell.text) && cell.text !== '') {
          // TODO: use cell.text.trim() ?
          drawTextInRect(doc, cell.text, cell._rect, cell.wordWrapEnabled, cell.jsPdfTextOptions);
        }
      }

      var isDrawBorders = isDefined(cell.borderColor) ? allowDrawCustomBorders === true : allowDrawBorders === true;

      if (isDrawBorders) {
        var borderColor = isDefined(cell.borderColor) ? cell.borderColor : styles.borderColor;

        if (borderColor !== doc.getDrawColor()) {
          doc.setDrawColor(borderColor);
        }

        drawBorder(cell._rect, cell.drawLeftBorder, cell.drawRightBorder, cell.drawTopBorder, cell.drawBottomBorder);
      }
    });
  }

  if (!isDefined(table)) {
    return Promise.resolve();
  }

  if (!isDefined(table.rect)) {
    throw 'table.rect is required';
  }

  if (isDefined(table.rows)) {
    for (var rowIndex = 0; rowIndex < table.rows.length; rowIndex++) {
      drawRow(table.rows[rowIndex]);
    }
  }

  if (allowDrawBorders === true && (isDefined(table.drawTableBorder) ? table.drawTableBorder : isDefined(table.rows) && table.rows.length === 0)) {
    drawBorder(table.rect);
  }
}
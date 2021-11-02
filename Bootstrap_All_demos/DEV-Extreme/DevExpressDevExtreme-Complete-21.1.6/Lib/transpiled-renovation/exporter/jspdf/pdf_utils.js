"use strict";

exports.calculateRowHeight = calculateRowHeight;
exports.drawLine = drawLine;
exports.drawRect = drawRect;
exports.drawTextInRect = drawTextInRect;

var _type = require("../../core/utils/type");

var _extend = require("../../core/utils/extend");

function round(value) {
  return Math.round(value * 1000) / 1000; // checked with browser zoom - 500%
}

function getTextLines(doc, text, font, _ref) {
  var wordWrapEnabled = _ref.wordWrapEnabled,
      columnWidth = _ref.columnWidth;

  if (wordWrapEnabled) {
    // it also splits text by '\n' automatically
    return doc.splitTextToSize(text, columnWidth, {
      fontSize: (font === null || font === void 0 ? void 0 : font.size) || doc.getFontSize()
    });
  }

  return text.split('\n');
}

function calculateTextHeight(doc, text, font, _ref2) {
  var wordWrapEnabled = _ref2.wordWrapEnabled,
      columnWidth = _ref2.columnWidth;
  var height = doc.getTextDimensions(text, {
    fontSize: (font === null || font === void 0 ? void 0 : font.size) || doc.getFontSize()
  }).h;
  var linesCount = getTextLines(doc, text, font, {
    wordWrapEnabled: wordWrapEnabled,
    columnWidth: columnWidth
  }).length;
  return height * linesCount * doc.getLineHeightFactor();
}

function calculateRowHeight(doc, cells, columnWidths) {
  if (cells.length !== columnWidths.length) {
    throw 'the cells count must be equal to the count of the columns';
  }

  var rowHeight = 0;

  for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
    var cellText = cells[cellIndex].text;
    var font = cells[cellIndex].font;
    var wordWrapEnabled = cells[cellIndex].wordWrapEnabled;
    var columnWidth = columnWidths[cellIndex];

    if ((0, _type.isDefined)(cellText)) {
      var cellHeight = calculateTextHeight(doc, cellText, font, {
        wordWrapEnabled: wordWrapEnabled,
        columnWidth: columnWidth
      });

      if (rowHeight < cellHeight) {
        rowHeight = cellHeight;
      }
    }
  }

  return rowHeight;
}

function drawLine(doc, startX, startY, endX, endY) {
  doc.line(round(startX), round(startY), round(endX), round(endY));
}

function drawRect(doc, x, y, width, height, style) {
  if ((0, _type.isDefined)(style)) {
    doc.rect(round(x), round(y), round(width), round(height), style);
  } else {
    doc.rect(round(x), round(y), round(width), round(height));
  }
}

function drawTextInRect(doc, text, rect, wordWrapEnabled, jsPdfTextOptions) {
  var textArray = getTextLines(doc, text, doc.getFont(), {
    wordWrapEnabled: wordWrapEnabled,
    columnWidth: rect.w
  });
  var linesCount = textArray.length;
  var heightOfOneLine = calculateTextHeight(doc, textArray[0], doc.getFont(), {
    wordWrapEnabled: false
  }); // TODO: check lineHeightFactor - https://github.com/MrRio/jsPDF/issues/3234

  var y = rect.y + rect.h / 2 - heightOfOneLine * (linesCount - 1) / 2; // align by vertical 'middle', https://github.com/MrRio/jsPDF/issues/1573

  var textOptions = (0, _extend.extend)({
    baseline: 'middle'
  }, jsPdfTextOptions);
  doc.text(textArray.join('\n'), round(rect.x), round(y), textOptions);
}
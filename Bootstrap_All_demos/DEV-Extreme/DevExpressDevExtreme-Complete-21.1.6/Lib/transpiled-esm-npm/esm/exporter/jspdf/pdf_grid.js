import { isDefined } from '../../core/utils/type';
import { PdfPage } from './pdf_page';
import { PdfTable } from './pdf_table';
export class PdfGrid {
  constructor(splitByColumns, columnWidths) {
    this._splitByColumns = splitByColumns !== null && splitByColumns !== void 0 ? splitByColumns : [];
    this._columnWidths = columnWidths !== null && columnWidths !== void 0 ? columnWidths : [];
    this._pages = [new PdfPage()];
    this._currentHorizontalTables = null;
  }

  startNewTable(drawTableBorder, firstTableTopLeft, firstTableOnNewPage, splitByColumns, firstColumnWidth) {
    var _this$_splitByColumns, _this$_splitByColumns2;

    if (isDefined(splitByColumns)) {
      this._splitByColumns = splitByColumns;
    }

    var firstTableEndColumnIndex = (_this$_splitByColumns = (_this$_splitByColumns2 = this._splitByColumns[0]) === null || _this$_splitByColumns2 === void 0 ? void 0 : _this$_splitByColumns2.columnIndex) !== null && _this$_splitByColumns !== void 0 ? _this$_splitByColumns : this._columnWidths.length;

    var firstTableColumnWidths = this._columnWidths.slice(0, firstTableEndColumnIndex);

    if (isDefined(firstColumnWidth)) {
      firstTableColumnWidths[0] = firstColumnWidth;
    }

    var newTable = new PdfTable(drawTableBorder, firstTableTopLeft, firstTableColumnWidths);
    this._currentHorizontalTables = [newTable];

    if (firstTableOnNewPage) {
      this._pages.push(new PdfPage(newTable));
    } else {
      this._pages[this._pages.length - 1].addTable(newTable);
    }

    if (isDefined(this._splitByColumns)) {
      for (var i = 0; i < this._splitByColumns.length; i++) {
        var _this$_splitByColumns3, _this$_splitByColumns4;

        var beginColumnIndex = this._splitByColumns[i].columnIndex;
        var endColumnIndex = (_this$_splitByColumns3 = (_this$_splitByColumns4 = this._splitByColumns[i + 1]) === null || _this$_splitByColumns4 === void 0 ? void 0 : _this$_splitByColumns4.columnIndex) !== null && _this$_splitByColumns3 !== void 0 ? _this$_splitByColumns3 : this._columnWidths.length;
        var newSplitByColumnTable = new PdfTable(drawTableBorder, this._splitByColumns[i].tableTopLeft, this._columnWidths.slice(beginColumnIndex, endColumnIndex));

        this._currentHorizontalTables.push(newSplitByColumnTable);

        this._pages.push(new PdfPage(newSplitByColumnTable));
      }
    }
  }

  addRow(cells, rowHeight) {
    var _this = this;

    var currentTableIndex = 0;
    var currentTableCells = [];

    var _loop = function _loop(cellIndex) {
      var isNewTableColumn = _this._splitByColumns.filter(splitByColumn => splitByColumn.columnIndex === cellIndex)[0];

      if (isNewTableColumn) {
        _this._currentHorizontalTables[currentTableIndex].addRow(currentTableCells, rowHeight);

        _this._trySplitColSpanArea(cells, cellIndex);

        currentTableIndex++;
        currentTableCells = [];
      }

      currentTableCells.push(cells[cellIndex]);
    };

    for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
      _loop(cellIndex);
    }

    this._currentHorizontalTables[currentTableIndex].addRow(currentTableCells, rowHeight);
  }

  _trySplitColSpanArea(cells, splitIndex) {
    var colSpanArea = this._findColSpanArea(cells, splitIndex);

    if (isDefined(colSpanArea)) {
      var leftAreaColSpan = splitIndex - colSpanArea.startIndex - 1;
      var rightAreaColSpan = colSpanArea.endIndex - splitIndex;
      cells[splitIndex].text = cells[colSpanArea.startIndex].text;

      for (var index = colSpanArea.startIndex; index <= colSpanArea.endIndex; index++) {
        var colSpan = index < splitIndex ? leftAreaColSpan : rightAreaColSpan;

        if (colSpan > 0) {
          cells[index].colSpan = colSpan;
        } else {
          delete cells[index].colSpan;
        }
      }
    }
  }

  _findColSpanArea(cells, targetCellIndex) {
    for (var index = 0; index < cells.length; index++) {
      if (cells[index].colSpan > 0) {
        var colSpan = cells[index].colSpan;
        var startIndex = index;
        var endIndex = startIndex + colSpan;

        if (startIndex < targetCellIndex && targetCellIndex <= endIndex) {
          return {
            colSpan,
            startIndex,
            endIndex
          };
        } else {
          index = endIndex;
        }
      }
    }

    return null;
  }

  mergeCellsBySpanAttributes() {
    this._pages.forEach(page => {
      page._tables.forEach(table => {
        for (var rowIndex = 0; rowIndex < table.rows.length; rowIndex++) {
          for (var cellIndex = 0; cellIndex < table.rows[rowIndex].length; cellIndex++) {
            var cell = table.rows[rowIndex][cellIndex];

            if (!cell.skip) {
              if (isDefined(cell.rowSpan)) {
                for (var i = 1; i <= cell.rowSpan; i++) {
                  var mergedCell = table.rows[rowIndex + i][cellIndex];

                  if (isDefined(mergedCell)) {
                    cell._rect.h += mergedCell._rect.h;
                    mergedCell.skip = true;
                  }
                }
              }

              if (isDefined(cell.colSpan)) {
                for (var _i = 1; _i <= cell.colSpan; _i++) {
                  var _mergedCell = table.rows[rowIndex][cellIndex + _i];

                  if (isDefined(_mergedCell)) {
                    cell._rect.w += _mergedCell._rect.w;
                    _mergedCell.skip = true;
                  }
                }
              }
            }
          }
        }
      });
    });
  }

  drawTo(doc) {
    var styles = this._getDocumentStyles(doc);

    this._pages.forEach(page => {
      if (this._pages.indexOf(page) > 0) {
        doc.addPage();
      }

      page._tables.forEach(table => {
        table.drawTo(doc, styles, {
          allowDrawBorders: true,
          allowDrawCellContent: true,
          allowDrawCustomBorders: false
        });
      });

      page._tables.forEach(table => {
        table.drawTo(doc, styles, {
          allowDrawBorders: false,
          allowDrawCellContent: false,
          allowDrawCustomBorders: true
        });
      });
    });

    this._setDocumentStyles(doc, styles);
  }

  _getDocumentStyles(doc) {
    var docFont = doc.getFont();
    return {
      borderColor: doc.getDrawColor(),
      font: {
        name: docFont.fontName,
        style: docFont.fontStyle,
        size: doc.getFontSize()
      },
      textColor: doc.getTextColor()
    };
  }

  _setDocumentStyles(doc, styles) {
    var {
      borderColor,
      font,
      textColor
    } = styles;
    var docFont = doc.getFont();

    if (docFont.fontName !== font.name || docFont.fontStyle !== font.style) {
      doc.setFont(font.name, font.style, undefined);
    }

    var docFontSize = doc.getFontSize();

    if (docFontSize !== font.size) {
      doc.setFontSize(font.size);
    }

    if (doc.getDrawColor() !== borderColor) {
      doc.setDrawColor(borderColor);
    }

    if (doc.getTextColor() !== textColor) {
      doc.setTextColor(textColor);
    }
  }

}
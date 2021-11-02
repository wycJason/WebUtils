import { isDefined } from '../../core/utils/type';
import { extend } from '../../core/utils/extend';
import { PdfGrid } from './pdf_grid';
import { createRowInfo, createPdfCell } from './export_data_grid_row_info';
import { calculateRowHeight } from './pdf_utils';

function _getFullOptions(options) {
  var fullOptions = extend({}, options);

  if (!isDefined(fullOptions.topLeft)) {
    throw 'options.topLeft is required';
  }

  if (!isDefined(fullOptions.indent)) {
    fullOptions.indent = 10;
  }

  return fullOptions;
}

function exportDataGrid(doc, dataGrid, options) {
  options = extend({}, _getFullOptions(options));
  var dataProvider = dataGrid.getDataProvider();
  return new Promise(resolve => {
    dataProvider.ready().done(() => {
      var wordWrapEnabled = !!dataGrid.option('wordWrapEnabled');
      var pdfGrid = new PdfGrid(options.splitToTablesByColumns, options.columnWidths);
      pdfGrid.startNewTable(options.drawTableBorder, options.topLeft);
      var dataRowsCount = dataProvider.getRowsCount();
      var rowOptions = options.rowOptions || {};
      var currentRowInfo;
      var prevRowInfo;

      var _loop = function _loop(rowIndex) {
        prevRowInfo = currentRowInfo;
        currentRowInfo = createRowInfo({
          dataProvider,
          rowIndex,
          rowOptions,
          prevRowInfo
        });
        var currentRowPdfCells = [];
        currentRowInfo.cellsInfo.forEach(cellInfo => {
          var pdfCell = createPdfCell(cellInfo);
          pdfCell.wordWrapEnabled = wordWrapEnabled;

          if (options.customizeCell) {
            options.customizeCell({
              gridCell: cellInfo.gridCell,
              pdfCell
            });
          }

          currentRowPdfCells.push(pdfCell);
        });

        if (currentRowInfo.startNewTableWithIndent) {
          var indent = currentRowInfo.indentLevel * options.indent;
          var prevTable = pdfGrid._currentHorizontalTables[0];
          var firstColumnWidth = options.columnWidths[0] - indent;
          var tableTopLeft = {
            x: options.topLeft.x + indent,
            y: prevTable.rect.y + prevTable.rect.h
          }; // TODO: should it be controlled from onRowExporting ?

          pdfGrid.startNewTable(options.drawTableBorder, tableTopLeft, null, null, firstColumnWidth);
        }

        var rowHeight = isDefined(currentRowInfo.rowHeight) ? currentRowInfo.rowHeight : calculateRowHeight(doc, currentRowPdfCells, options.columnWidths);

        if (options.onRowExporting) {
          var args = {
            drawNewTableFromThisRow: {},
            rowCells: currentRowPdfCells
          };
          options.onRowExporting(args);
          var {
            startNewTable,
            addPage,
            tableTopLeft: _tableTopLeft,
            splitToTablesByColumns
          } = args.drawNewTableFromThisRow;

          if (startNewTable === true) {
            pdfGrid.startNewTable(options.drawTableBorder, _tableTopLeft, addPage === true, splitToTablesByColumns);
          }

          if (isDefined(args.rowHeight)) {
            rowHeight = args.rowHeight;
          }
        }

        pdfGrid.addRow(currentRowPdfCells, rowHeight);
      };

      for (var rowIndex = 0; rowIndex < dataRowsCount; rowIndex++) {
        _loop(rowIndex);
      }

      pdfGrid.mergeCellsBySpanAttributes();
      pdfGrid.drawTo(doc);
      resolve();
    });
  });
}

export { exportDataGrid };
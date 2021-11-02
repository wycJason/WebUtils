"use strict";

exports.exportDataGrid = exportDataGrid;

var _type = require("../../core/utils/type");

var _extend = require("../../core/utils/extend");

var _pdf_grid = require("./pdf_grid");

var _export_data_grid_row_info = require("./export_data_grid_row_info");

var _pdf_utils = require("./pdf_utils");

function _getFullOptions(options) {
  var fullOptions = (0, _extend.extend)({}, options);

  if (!(0, _type.isDefined)(fullOptions.topLeft)) {
    throw 'options.topLeft is required';
  }

  if (!(0, _type.isDefined)(fullOptions.indent)) {
    fullOptions.indent = 10;
  }

  return fullOptions;
}

function exportDataGrid(doc, dataGrid, options) {
  options = (0, _extend.extend)({}, _getFullOptions(options));
  var dataProvider = dataGrid.getDataProvider();
  return new Promise(function (resolve) {
    dataProvider.ready().done(function () {
      var wordWrapEnabled = !!dataGrid.option('wordWrapEnabled');
      var pdfGrid = new _pdf_grid.PdfGrid(options.splitToTablesByColumns, options.columnWidths);
      pdfGrid.startNewTable(options.drawTableBorder, options.topLeft);
      var dataRowsCount = dataProvider.getRowsCount();
      var rowOptions = options.rowOptions || {};
      var currentRowInfo;
      var prevRowInfo;

      var _loop = function _loop(rowIndex) {
        prevRowInfo = currentRowInfo;
        currentRowInfo = (0, _export_data_grid_row_info.createRowInfo)({
          dataProvider: dataProvider,
          rowIndex: rowIndex,
          rowOptions: rowOptions,
          prevRowInfo: prevRowInfo
        });
        var currentRowPdfCells = [];
        currentRowInfo.cellsInfo.forEach(function (cellInfo) {
          var pdfCell = (0, _export_data_grid_row_info.createPdfCell)(cellInfo);
          pdfCell.wordWrapEnabled = wordWrapEnabled;

          if (options.customizeCell) {
            options.customizeCell({
              gridCell: cellInfo.gridCell,
              pdfCell: pdfCell
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

        var rowHeight = (0, _type.isDefined)(currentRowInfo.rowHeight) ? currentRowInfo.rowHeight : (0, _pdf_utils.calculateRowHeight)(doc, currentRowPdfCells, options.columnWidths);

        if (options.onRowExporting) {
          var args = {
            drawNewTableFromThisRow: {},
            rowCells: currentRowPdfCells
          };
          options.onRowExporting(args);
          var _args$drawNewTableFro = args.drawNewTableFromThisRow,
              startNewTable = _args$drawNewTableFro.startNewTable,
              addPage = _args$drawNewTableFro.addPage,
              _tableTopLeft = _args$drawNewTableFro.tableTopLeft,
              splitToTablesByColumns = _args$drawNewTableFro.splitToTablesByColumns;

          if (startNewTable === true) {
            pdfGrid.startNewTable(options.drawTableBorder, _tableTopLeft, addPage === true, splitToTablesByColumns);
          }

          if ((0, _type.isDefined)(args.rowHeight)) {
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
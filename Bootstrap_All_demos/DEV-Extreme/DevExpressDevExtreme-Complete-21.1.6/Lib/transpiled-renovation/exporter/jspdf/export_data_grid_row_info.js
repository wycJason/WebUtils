"use strict";

exports.createRowInfo = createRowInfo;
exports.createPdfCell = createPdfCell;

var _type = require("../../core/utils/type");

function createRowInfo(_ref) {
  var dataProvider = _ref.dataProvider,
      rowIndex = _ref.rowIndex,
      rowOptions = _ref.rowOptions,
      prevRowInfo = _ref.prevRowInfo;
  var rowType = dataProvider.getCellData(rowIndex, 0, true).cellSourceData.rowType;
  var indentLevel = rowType !== 'header' ? dataProvider.getGroupLevel(rowIndex) : 0;

  if (rowType === 'groupFooter' && (prevRowInfo === null || prevRowInfo === void 0 ? void 0 : prevRowInfo.rowType) === 'groupFooter') {
    indentLevel = prevRowInfo.indentLevel - 1;
  }

  var startNewTableWithIndent = (prevRowInfo === null || prevRowInfo === void 0 ? void 0 : prevRowInfo.indentLevel) !== undefined && prevRowInfo.indentLevel !== indentLevel;
  var columns = dataProvider.getColumns();
  var rowInfo = {
    rowType: rowType,
    rowHeight: rowOptions.rowHeight,
    indentLevel: indentLevel,
    startNewTableWithIndent: startNewTableWithIndent,
    cellsInfo: [],
    rowIndex: rowIndex
  };

  _fillRowCellsInfo({
    rowInfo: rowInfo,
    rowOptions: rowOptions,
    dataProvider: dataProvider,
    columns: columns
  });

  return rowInfo;
}

function createPdfCell(cellInfo) {
  return {
    text: cellInfo.text,
    rowSpan: cellInfo.rowSpan,
    colSpan: cellInfo.colSpan,
    drawLeftBorder: cellInfo.drawLeftBorder,
    drawRightBorder: cellInfo.drawRightBorder,
    backgroundColor: cellInfo.backgroundColor
  };
}

function _createCellInfo(_ref2) {
  var rowInfo = _ref2.rowInfo,
      rowOptions = _ref2.rowOptions,
      dataProvider = _ref2.dataProvider,
      cellIndex = _ref2.cellIndex;
  var cellData = dataProvider.getCellData(rowInfo.rowIndex, cellIndex, true);
  var cellInfo = {
    gridCell: cellData.cellSourceData,
    text: cellData.value
  };

  if (rowInfo.rowType === 'header') {
    var _rowOptions$headerSty;

    var cellMerging = dataProvider.getCellMerging(rowInfo.rowIndex, cellIndex);

    if (cellMerging && cellMerging.rowspan > 0) {
      cellInfo.rowSpan = cellMerging.rowspan;
    }

    if (cellMerging && cellMerging.colspan > 0) {
      cellInfo.colSpan = cellMerging.colspan;
    }

    if ((0, _type.isDefined)((_rowOptions$headerSty = rowOptions.headerStyles) === null || _rowOptions$headerSty === void 0 ? void 0 : _rowOptions$headerSty.backgroundColor)) {
      cellInfo.backgroundColor = rowOptions.headerStyles.backgroundColor;
    }
  } else if (rowInfo.rowType === 'group') {
    var _rowOptions$groupStyl;

    cellInfo.drawLeftBorder = false;
    cellInfo.drawRightBorder = false;

    if (cellIndex > 0) {
      var isEmptyCellsExceptFirst = rowInfo.cellsInfo.slice(1).reduce(function (accumulate, pdfCell) {
        return accumulate && !(0, _type.isDefined)(pdfCell.text);
      }, true);

      if (!(0, _type.isDefined)(cellInfo.text) && isEmptyCellsExceptFirst) {
        for (var i = 0; i < rowInfo.cellsInfo.length; i++) {
          rowInfo.cellsInfo[i].colSpan = rowInfo.cellsInfo.length;
        }

        cellInfo.colSpan = rowInfo.cellsInfo.length;
      }
    }

    if ((0, _type.isDefined)((_rowOptions$groupStyl = rowOptions.groupStyles) === null || _rowOptions$groupStyl === void 0 ? void 0 : _rowOptions$groupStyl.backgroundColor)) {
      cellInfo.backgroundColor = rowOptions.groupStyles.backgroundColor;
    }
  } else if (rowInfo.rowType === 'groupFooter' || rowInfo.rowType === 'totalFooter') {
    var _rowOptions$totalStyl;

    if ((0, _type.isDefined)((_rowOptions$totalStyl = rowOptions.totalStyles) === null || _rowOptions$totalStyl === void 0 ? void 0 : _rowOptions$totalStyl.backgroundColor)) {
      cellInfo.backgroundColor = rowOptions.totalStyles.backgroundColor;
    }
  }

  return cellInfo;
}

function _fillRowCellsInfo(_ref3) {
  var rowInfo = _ref3.rowInfo,
      rowOptions = _ref3.rowOptions,
      dataProvider = _ref3.dataProvider,
      columns = _ref3.columns;

  for (var cellIndex = 0; cellIndex < columns.length; cellIndex++) {
    rowInfo.cellsInfo.push(_createCellInfo({
      rowInfo: rowInfo,
      rowOptions: rowOptions,
      dataProvider: dataProvider,
      cellIndex: cellIndex
    }));
  }

  if (rowInfo.rowType === 'group') {
    rowInfo.cellsInfo[0].drawLeftBorder = true;

    if (rowInfo.cellsInfo[0].colSpan === rowInfo.cellsInfo.length - 1) {
      rowInfo.cellsInfo[0].drawRightBorder = true;
    }

    var lastCell = rowInfo.cellsInfo[rowInfo.cellsInfo.length - 1];

    if (!(0, _type.isDefined)(lastCell.colSpan)) {
      lastCell.drawRightBorder = true;
    }
  }
}
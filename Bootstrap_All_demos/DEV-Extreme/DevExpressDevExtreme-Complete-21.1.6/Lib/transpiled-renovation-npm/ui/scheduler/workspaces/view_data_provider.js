"use strict";

exports.default = void 0;

var _date = _interopRequireDefault(require("../../../core/utils/date"));

var _constants = require("../constants");

var _excluded = ["startDate", "endDate", "isFirstGroupCell", "isLastGroupCell"],
    _excluded2 = ["allDay", "startDate", "endDate"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ViewDataGenerator = /*#__PURE__*/function () {
  function ViewDataGenerator(workspace) {
    this.workspace = workspace;
  }

  var _proto = ViewDataGenerator.prototype;

  _proto._getCompleteViewDataMap = function _getCompleteViewDataMap(options) {
    var _viewDataMap;

    var rowCountInGroup = options.rowCountInGroup,
        cellCountInGroupRow = options.cellCountInGroupRow,
        groupsList = options.groupsList,
        groupByDate = options.groupByDate,
        isHorizontalGrouping = options.isHorizontalGrouping,
        isVerticalGrouping = options.isVerticalGrouping,
        totalCellCount = options.totalCellCount,
        groupCount = options.groupCount;
    var viewDataMap = [];
    var step = groupByDate ? groupCount : 1;

    var allDayPanelData = this._generateAllDayPanelData(options, cellCountInGroupRow, step);

    var viewCellsData = this._generateViewCellsData(options, rowCountInGroup, step);

    allDayPanelData && viewDataMap.push(allDayPanelData);

    (_viewDataMap = viewDataMap).push.apply(_viewDataMap, _toConsumableArray(viewCellsData));

    if (isHorizontalGrouping && !groupByDate) {
      viewDataMap = this._transformViewDataMapForHorizontalGrouping(viewDataMap, groupsList);
    }

    if (isVerticalGrouping) {
      viewDataMap = this._transformViewDataMapForVerticalGrouping(viewDataMap, groupsList);
    }

    if (groupByDate) {
      viewDataMap = this._transformViewDataMapForGroupingByDate(viewDataMap, groupsList);
    }

    var completeViewDataMap = this._addKeysToCells(viewDataMap, totalCellCount);

    return completeViewDataMap;
  };

  _proto._transformViewDataMapForHorizontalGrouping = function _transformViewDataMapForHorizontalGrouping(viewDataMap, groupsList) {
    var result = viewDataMap.map(function (row) {
      return row.slice();
    });
    groupsList.slice(1).forEach(function (groups, index) {
      var groupIndex = index + 1;
      viewDataMap.forEach(function (row, rowIndex) {
        var _result$rowIndex;

        var nextGroupRow = row.map(function (cellData) {
          return _extends({}, cellData, {
            groups: groups,
            groupIndex: groupIndex
          });
        });

        (_result$rowIndex = result[rowIndex]).push.apply(_result$rowIndex, _toConsumableArray(nextGroupRow));
      });
    });
    return result;
  };

  _proto._transformViewDataMapForVerticalGrouping = function _transformViewDataMapForVerticalGrouping(viewDataMap, groupsList) {
    var result = viewDataMap.map(function (row) {
      return row.slice();
    });
    groupsList.slice(1).forEach(function (groups, index) {
      var groupIndex = index + 1;
      var nextGroupMap = viewDataMap.map(function (cellsRow) {
        var nextRow = cellsRow.map(function (cellData) {
          return _extends({}, cellData, {
            groupIndex: groupIndex,
            groups: groups
          });
        });
        return nextRow;
      });
      result.push.apply(result, _toConsumableArray(nextGroupMap));
    });
    return result;
  };

  _proto._transformViewDataMapForGroupingByDate = function _transformViewDataMapForGroupingByDate(viewDataMap, groupsList) {
    var correctedGroupList = groupsList.slice(1);
    var correctedGroupCount = correctedGroupList.length;
    var result = viewDataMap.map(function (cellsRow) {
      var groupedByDateCellsRow = cellsRow.reduce(function (currentRow, cell) {
        var rowWithCurrentCell = [].concat(_toConsumableArray(currentRow), [_extends({}, cell, {
          isFirstGroupCell: true,
          isLastGroupCell: correctedGroupCount === 0
        })], _toConsumableArray(correctedGroupList.map(function (groups, index) {
          return _extends({}, cell, {
            groups: groups,
            groupIndex: index + 1,
            isFirstGroupCell: false,
            isLastGroupCell: index === correctedGroupCount - 1
          });
        })));
        return rowWithCurrentCell;
      }, []);
      return groupedByDateCellsRow;
    });
    return result;
  };

  _proto._addKeysToCells = function _addKeysToCells(viewDataMap, totalColumnCount) {
    var _viewDataMap$reduce = viewDataMap.reduce(function (_ref, row, rowIndex) {
      var allDayPanelsCount = _ref.allDayPanelsCount,
          currentViewDataMap = _ref.currentViewDataMap;
      var isAllDay = row[0].allDay;
      var keyBase = (rowIndex - allDayPanelsCount) * totalColumnCount;
      var currentAllDayPanelsCount = isAllDay ? allDayPanelsCount + 1 : allDayPanelsCount;
      currentViewDataMap[rowIndex].forEach(function (cell, cellIndex) {
        cell.key = keyBase + cellIndex;
      });
      return {
        allDayPanelsCount: currentAllDayPanelsCount,
        currentViewDataMap: currentViewDataMap
      };
    }, {
      allDayPanelsCount: 0,
      currentViewDataMap: viewDataMap
    }),
        result = _viewDataMap$reduce.currentViewDataMap;

    return result;
  };

  _proto._getCompleteDateHeaderMap = function _getCompleteDateHeaderMap(options, completeViewDataMap) {
    var isGenerateWeekDaysHeaderData = options.isGenerateWeekDaysHeaderData;
    var result = [];

    if (isGenerateWeekDaysHeaderData) {
      var weekDaysRow = this._generateWeekDaysHeaderRowMap(options, completeViewDataMap);

      result.push(weekDaysRow);
    }

    var dateRow = this._generateHeaderDateRow(options, completeViewDataMap);

    result.push(dateRow);
    return result;
  };

  _proto._generateWeekDaysHeaderRowMap = function _generateWeekDaysHeaderRowMap(options, completeViewDataMap) {
    var groupByDate = options.groupByDate,
        horizontalGroupCount = options.horizontalGroupCount,
        cellCountInDay = options.cellCountInDay,
        getWeekDaysHeaderText = options.getWeekDaysHeaderText,
        daysInView = options.daysInView;
    var index = completeViewDataMap[0][0].allDay ? 1 : 0;
    var colSpan = groupByDate ? horizontalGroupCount * cellCountInDay : cellCountInDay;
    var weekDaysRow = [];

    for (var dayIndex = 0; dayIndex < daysInView; dayIndex += 1) {
      var cell = completeViewDataMap[index][dayIndex * colSpan];
      weekDaysRow.push(_extends({}, cell, {
        colSpan: colSpan,
        text: getWeekDaysHeaderText(cell.startDate),
        isFirstGroupCell: false,
        isLastGroupCell: false
      }));
    }

    return weekDaysRow;
  };

  _proto._generateHeaderDateRow = function _generateHeaderDateRow(options, completeViewDataMap) {
    var getDateHeaderText = options.getDateHeaderText,
        today = options.today,
        groupByDate = options.groupByDate,
        horizontalGroupCount = options.horizontalGroupCount,
        cellCountInGroupRow = options.cellCountInGroupRow,
        groupOrientation = options.groupOrientation,
        getDateHeaderDate = options.getDateHeaderDate;
    var dates = [];

    for (var dateIndex = 0; dateIndex < cellCountInGroupRow; dateIndex += 1) {
      dates.push(getDateHeaderDate(dateIndex));
    }

    var index = completeViewDataMap[0][0].allDay ? 1 : 0;
    var colSpan = groupByDate ? horizontalGroupCount : 1;
    var isVerticalGrouping = groupOrientation === 'vertical';
    var slicedByColumnsData = groupByDate ? completeViewDataMap[index].filter(function (_, columnIndex) {
      return columnIndex % horizontalGroupCount === 0;
    }) : completeViewDataMap[index];
    return slicedByColumnsData.map(function (_ref2, index) {
      var startDate = _ref2.startDate,
          endDate = _ref2.endDate,
          isFirstGroupCell = _ref2.isFirstGroupCell,
          isLastGroupCell = _ref2.isLastGroupCell,
          restProps = _objectWithoutProperties(_ref2, _excluded);

      return _extends({}, restProps, {
        startDate: dates[index % cellCountInGroupRow],
        text: getDateHeaderText(index % cellCountInGroupRow),
        today: _date.default.sameDate(startDate, today),
        colSpan: colSpan,
        isFirstGroupCell: groupByDate || isFirstGroupCell && !isVerticalGrouping,
        isLastGroupCell: groupByDate || isLastGroupCell && !isVerticalGrouping
      });
    });
  };

  _proto._getCompleteTimePanelMap = function _getCompleteTimePanelMap(options, completeViewDataMap) {
    var rowCountInGroup = options.rowCountInGroup,
        getTimeCellDate = options.getTimeCellDate;
    var times = [];

    for (var rowIndex = 0; rowIndex < rowCountInGroup; rowIndex += 1) {
      times.push(getTimeCellDate(rowIndex));
    }

    var allDayRowsCount = 0;
    return completeViewDataMap.map(function (row, index) {
      var _row$ = row[0],
          allDay = _row$.allDay,
          startDate = _row$.startDate,
          endDate = _row$.endDate,
          restCellProps = _objectWithoutProperties(_row$, _excluded2);

      if (allDay) {
        allDayRowsCount += 1;
      }

      var timeIndex = (index - allDayRowsCount) % rowCountInGroup;
      return _extends({}, restCellProps, {
        allDay: allDay,
        startDate: allDay ? startDate : times[timeIndex]
      });
    });
  };

  _proto._generateViewDataMap = function _generateViewDataMap(completeViewDataMap, options) {
    var rowCount = options.rowCount,
        startCellIndex = options.startCellIndex,
        cellCount = options.cellCount;
    var startRowIndex = options.startRowIndex;

    var sliceCells = function sliceCells(row, rowIndex, startIndex, count) {
      return row.slice(startIndex, startIndex + count).map(function (cellData, cellIndex) {
        return {
          cellData: cellData,
          position: {
            rowIndex: rowIndex,
            cellIndex: cellIndex
          }
        };
      });
    };

    var correctedStartRowIndex = startRowIndex;
    var allDayPanelMap = [];

    if (this.isStandaloneAllDayPanel) {
      correctedStartRowIndex++;
      allDayPanelMap = sliceCells(completeViewDataMap[0], 0, startCellIndex, cellCount);
    }

    var dateTableMap = completeViewDataMap.slice(correctedStartRowIndex, correctedStartRowIndex + rowCount).map(function (row, rowIndex) {
      return sliceCells(row, rowIndex, startCellIndex, cellCount);
    });
    return {
      allDayPanelMap: allDayPanelMap,
      dateTableMap: dateTableMap
    };
  };

  _proto._generateDateHeaderData = function _generateDateHeaderData(completeDateHeaderMap, options) {
    var isGenerateWeekDaysHeaderData = options.isGenerateWeekDaysHeaderData,
        cellCountInDay = options.cellCountInDay,
        cellWidth = options.cellWidth,
        isProvideVirtualCellsWidth = options.isProvideVirtualCellsWidth;
    var dataMap = [];
    var weekDayRowConfig = {};
    var validCellWidth = cellWidth || 0;

    if (isGenerateWeekDaysHeaderData) {
      weekDayRowConfig = this._generateDateHeaderDataRow(options, completeDateHeaderMap, cellCountInDay, 0, validCellWidth);
      dataMap.push(weekDayRowConfig.dateRow);
    }

    var datesRowConfig = this._generateDateHeaderDataRow(options, completeDateHeaderMap, 1, isGenerateWeekDaysHeaderData ? 1 : 0, validCellWidth);

    dataMap.push(datesRowConfig.dateRow);
    return {
      dataMap: dataMap,
      leftVirtualCellWidth: isProvideVirtualCellsWidth ? datesRowConfig.leftVirtualCellWidth : undefined,
      rightVirtualCellWidth: isProvideVirtualCellsWidth ? datesRowConfig.rightVirtualCellWidth : undefined,
      leftVirtualCellCount: datesRowConfig.leftVirtualCellCount,
      rightVirtualCellCount: datesRowConfig.rightVirtualCellCount,
      weekDayLeftVirtualCellWidth: weekDayRowConfig.leftVirtualCellWidth,
      weekDayRightVirtualCellWidth: weekDayRowConfig.rightVirtualCellWidth,
      weekDayLeftVirtualCellCount: weekDayRowConfig.leftVirtualCellCount,
      weekDayRightVirtualCellCount: weekDayRowConfig.rightVirtualCellCount
    };
  };

  _proto._generateDateHeaderDataRow = function _generateDateHeaderDataRow(options, completeDateHeaderMap, baseColSpan, rowIndex, cellWidth) {
    var groupByDate = options.groupByDate,
        horizontalGroupCount = options.horizontalGroupCount,
        startCellIndex = options.startCellIndex,
        cellCount = options.cellCount,
        totalCellCount = options.totalCellCount,
        isProvideVirtualCellsWidth = options.isProvideVirtualCellsWidth;
    var colSpan = groupByDate ? horizontalGroupCount * baseColSpan : baseColSpan;
    var leftVirtualCellCount = Math.floor(startCellIndex / colSpan);
    var actualCellCount = Math.ceil((startCellIndex + cellCount) / colSpan);
    var dateRow = completeDateHeaderMap[rowIndex].slice(leftVirtualCellCount, actualCellCount);
    var finalLeftVirtualCellCount = leftVirtualCellCount * colSpan;
    var finalLeftVirtualCellWidth = finalLeftVirtualCellCount * cellWidth;
    var finalRightVirtualCellCount = totalCellCount - actualCellCount * colSpan;
    var finalRightVirtualCellWidth = finalRightVirtualCellCount * cellWidth;
    return {
      dateRow: dateRow,
      leftVirtualCellCount: finalLeftVirtualCellCount,
      leftVirtualCellWidth: isProvideVirtualCellsWidth ? finalLeftVirtualCellWidth : undefined,
      rightVirtualCellCount: finalRightVirtualCellCount,
      rightVirtualCellWidth: isProvideVirtualCellsWidth ? finalRightVirtualCellWidth : undefined
    };
  };

  _proto._generateTimePanelData = function _generateTimePanelData(completeTimePanelMap, options) {
    var startRowIndex = options.startRowIndex,
        rowCount = options.rowCount,
        topVirtualRowHeight = options.topVirtualRowHeight,
        bottomVirtualRowHeight = options.bottomVirtualRowHeight,
        cellCountInGroupRow = options.cellCountInGroupRow;
    var isGroupedAllDayPanel = this.workspace.isGroupedAllDayPanel();
    var showAllDayPanel = this.workspace.isAllDayPanelVisible;
    var indexDifference = this.isVerticalGroupedWorkspace || !showAllDayPanel ? 0 : 1;
    var correctedStartRowIndex = startRowIndex + indexDifference;
    var timePanelMap = completeTimePanelMap.slice(correctedStartRowIndex, correctedStartRowIndex + rowCount);
    var timePanelData = {
      topVirtualRowHeight: topVirtualRowHeight,
      bottomVirtualRowHeight: bottomVirtualRowHeight,
      isGroupedAllDayPanel: isGroupedAllDayPanel,
      cellCountInGroupRow: cellCountInGroupRow
    };

    var _this$_generateTimePa = this._generateTimePanelDataFromMap(timePanelMap, isGroupedAllDayPanel),
        groupedData = _this$_generateTimePa.previousGroupedData;

    timePanelData.groupedData = groupedData;
    return timePanelData;
  };

  _proto._generateTimePanelDataFromMap = function _generateTimePanelDataFromMap(timePanelMap, isGroupedAllDayPanel) {
    return timePanelMap.reduce(function (_ref3, cellData) {
      var previousGroupIndex = _ref3.previousGroupIndex,
          previousGroupedData = _ref3.previousGroupedData;
      var currentGroupIndex = cellData.groupIndex;

      if (currentGroupIndex !== previousGroupIndex) {
        previousGroupedData.push({
          dateTable: [],
          isGroupedAllDayPanel: isGroupedAllDayPanel,
          groupIndex: currentGroupIndex
        });
      }

      if (cellData.allDay) {
        previousGroupedData[previousGroupedData.length - 1].allDayPanel = cellData;
      } else {
        previousGroupedData[previousGroupedData.length - 1].dateTable.push(cellData);
      }

      return {
        previousGroupIndex: currentGroupIndex,
        previousGroupedData: previousGroupedData
      };
    }, {
      previousGroupIndex: -1,
      previousGroupedData: []
    });
  };

  _proto._getViewDataFromMap = function _getViewDataFromMap(viewDataMap, options) {
    var topVirtualRowHeight = options.topVirtualRowHeight,
        bottomVirtualRowHeight = options.bottomVirtualRowHeight,
        leftVirtualCellWidth = options.leftVirtualCellWidth,
        rightVirtualCellWidth = options.rightVirtualCellWidth,
        cellCountInGroupRow = options.cellCountInGroupRow,
        totalCellCount = options.totalCellCount,
        totalRowCount = options.totalRowCount,
        cellCount = options.cellCount,
        rowCount = options.rowCount,
        startRowIndex = options.startRowIndex,
        startCellIndex = options.startCellIndex,
        isProvideVirtualCellsWidth = options.isProvideVirtualCellsWidth;
    var isGroupedAllDayPanel = this.workspace.isGroupedAllDayPanel();
    var allDayPanelMap = viewDataMap.allDayPanelMap,
        dateTableMap = viewDataMap.dateTableMap;

    var _dateTableMap$reduce = dateTableMap.reduce(function (_ref4, cellsRow) {
      var previousGroupIndex = _ref4.previousGroupIndex,
          previousGroupedData = _ref4.previousGroupedData;
      var cellDataRow = cellsRow.map(function (_ref5) {
        var cellData = _ref5.cellData;
        return cellData;
      });
      var firstCell = cellDataRow[0];
      var isAllDayRow = firstCell.allDay;
      var currentGroupIndex = firstCell.groupIndex;

      if (currentGroupIndex !== previousGroupIndex) {
        previousGroupedData.push({
          dateTable: [],
          isGroupedAllDayPanel: isGroupedAllDayPanel,
          groupIndex: currentGroupIndex
        });
      }

      if (isAllDayRow) {
        previousGroupedData[previousGroupedData.length - 1].allDayPanel = cellDataRow;
      } else {
        previousGroupedData[previousGroupedData.length - 1].dateTable.push(cellDataRow);
      }

      return {
        previousGroupedData: previousGroupedData,
        previousGroupIndex: currentGroupIndex
      };
    }, {
      previousGroupIndex: -1,
      previousGroupedData: []
    }),
        groupedData = _dateTableMap$reduce.previousGroupedData;

    if (this.isStandaloneAllDayPanel) {
      groupedData[0].allDayPanel = allDayPanelMap.map(function (_ref6) {
        var cellData = _ref6.cellData;
        return cellData;
      });
    }

    return {
      groupedData: groupedData,
      topVirtualRowHeight: topVirtualRowHeight,
      bottomVirtualRowHeight: bottomVirtualRowHeight,
      leftVirtualCellWidth: isProvideVirtualCellsWidth ? leftVirtualCellWidth : undefined,
      rightVirtualCellWidth: isProvideVirtualCellsWidth ? rightVirtualCellWidth : undefined,
      cellCountInGroupRow: cellCountInGroupRow,
      isGroupedAllDayPanel: isGroupedAllDayPanel,
      leftVirtualCellCount: startCellIndex,
      rightVirtualCellCount: totalCellCount - startCellIndex - cellCount,
      topVirtualRowCount: startRowIndex,
      bottomVirtualRowCount: totalRowCount - startRowIndex - rowCount
    };
  };

  _proto._generateViewCellsData = function _generateViewCellsData(options, rowsCount) {
    var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var cellCountInGroupRow = options.cellCountInGroupRow,
        cellDataGetters = options.cellDataGetters;
    var viewCellsData = [];

    for (var rowIndex = 0; rowIndex < rowsCount; rowIndex += 1) {
      viewCellsData.push(this._generateCellsRow(options, cellDataGetters, rowIndex, cellCountInGroupRow, step));
    }

    return viewCellsData;
  };

  _proto._generateAllDayPanelData = function _generateAllDayPanelData(options, cellCount) {
    var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var workSpace = this.workspace;

    if (!workSpace.isAllDayPanelVisible) {
      return null;
    }

    return this._generateCellsRow(options, [workSpace._getAllDayCellData.bind(workSpace)], 0, cellCount, step);
  };

  _proto._generateCellsRow = function _generateCellsRow(options, cellDataGetters, rowIndex, columnCount, step) {
    var _this = this;

    var cellsRow = [];

    var _loop = function _loop(columnIndex) {
      var correctedColumnIndex = step * columnIndex;
      var cellDataValue = cellDataGetters.reduce(function (data, getter) {
        return _extends({}, data, getter(undefined, rowIndex, correctedColumnIndex, 0, data.startDate).value);
      }, {});
      cellDataValue.index = rowIndex * columnCount + columnIndex;
      cellDataValue.isFirstGroupCell = _this._isFirstGroupCell(rowIndex, columnIndex, options);
      cellDataValue.isLastGroupCell = _this._isLastGroupCell(rowIndex, columnIndex, options);
      cellsRow.push(cellDataValue);
    };

    for (var columnIndex = 0; columnIndex < columnCount; ++columnIndex) {
      _loop(columnIndex);
    }

    return cellsRow;
  };

  _proto._calculateCellIndex = function _calculateCellIndex(horizontalGroupCount, groupOrientation, isGroupedByDate, rowIndex, columnIndex, columnsNumber) {
    var groupCount = horizontalGroupCount || 1;
    var index = rowIndex * columnsNumber + columnIndex;
    var columnsInGroup = columnsNumber / groupCount;

    if (groupOrientation === 'horizontal') {
      var columnIndexInCurrentGroup = columnIndex % columnsInGroup;

      if (isGroupedByDate) {
        columnIndexInCurrentGroup = Math.floor(columnIndex / groupCount);
      }

      index = rowIndex * columnsInGroup + columnIndexInCurrentGroup;
    }

    return index;
  };

  _proto.generateGroupedDataMap = function generateGroupedDataMap(viewDataMap) {
    var allDayPanelMap = viewDataMap.allDayPanelMap,
        dateTableMap = viewDataMap.dateTableMap;

    var _dateTableMap$reduce2 = dateTableMap.reduce(function (previousOptions, cellsRow) {
      var previousGroupedDataMap = previousOptions.previousGroupedDataMap,
          previousRowIndex = previousOptions.previousRowIndex,
          previousGroupIndex = previousOptions.previousGroupIndex;
      var currentGroupIndex = cellsRow[0].cellData.groupIndex;
      var currentRowIndex = currentGroupIndex === previousGroupIndex ? previousRowIndex + 1 : 0;
      cellsRow.forEach(function (cell) {
        var groupIndex = cell.cellData.groupIndex;

        if (!previousGroupedDataMap[groupIndex]) {
          previousGroupedDataMap[groupIndex] = [];
        }

        if (!previousGroupedDataMap[groupIndex][currentRowIndex]) {
          previousGroupedDataMap[groupIndex][currentRowIndex] = [];
        }

        previousGroupedDataMap[groupIndex][currentRowIndex].push(cell);
      });
      return {
        previousGroupedDataMap: previousGroupedDataMap,
        previousRowIndex: currentRowIndex,
        previousGroupIndex: currentGroupIndex
      };
    }, {
      previousGroupedDataMap: [],
      previousRowIndex: -1,
      previousGroupIndex: -1
    }),
        dateTableGroupedMap = _dateTableMap$reduce2.previousGroupedDataMap;

    var allDayPanelGroupedMap = [];
    allDayPanelMap === null || allDayPanelMap === void 0 ? void 0 : allDayPanelMap.forEach(function (cell) {
      var groupIndex = cell.cellData.groupIndex;

      if (!allDayPanelGroupedMap[groupIndex]) {
        allDayPanelGroupedMap[groupIndex] = [];
      }

      allDayPanelGroupedMap[groupIndex].push(cell);
    });
    return {
      allDayPanelGroupedMap: allDayPanelGroupedMap,
      dateTableGroupedMap: dateTableGroupedMap
    };
  };

  _proto._isFirstGroupCell = function _isFirstGroupCell(rowIndex, columnIndex, options) {
    var groupOrientation = options.groupOrientation,
        rowCountInGroup = options.rowCountInGroup,
        cellCountInGroupRow = options.cellCountInGroupRow,
        groupCount = options.groupCount;

    if (this.workspace.isGroupedByDate()) {
      return columnIndex % groupCount === 0;
    }

    if (groupOrientation === _constants.HORIZONTAL_GROUP_ORIENTATION) {
      return columnIndex % cellCountInGroupRow === 0;
    }

    return rowIndex % rowCountInGroup === 0;
  };

  _proto._isLastGroupCell = function _isLastGroupCell(rowIndex, columnIndex, options) {
    var groupOrientation = options.groupOrientation,
        rowCountInGroup = options.rowCountInGroup,
        cellCountInGroupRow = options.cellCountInGroupRow,
        groupCount = options.groupCount;

    if (this.workspace.isGroupedByDate()) {
      return (columnIndex + 1) % groupCount === 0;
    }

    if (groupOrientation === _constants.HORIZONTAL_GROUP_ORIENTATION) {
      return (columnIndex + 1) % cellCountInGroupRow === 0;
    }

    return (rowIndex + 1) % rowCountInGroup === 0;
  };

  _createClass(ViewDataGenerator, [{
    key: "workspace",
    get: function get() {
      return this._workspace;
    },
    set: function set(value) {
      this._workspace = value;
    }
  }, {
    key: "isVerticalGroupedWorkspace",
    get: function get() {
      return this.workspace._isVerticalGroupedWorkSpace();
    }
  }, {
    key: "isStandaloneAllDayPanel",
    get: function get() {
      return !this.isVerticalGroupedWorkspace && this.workspace.isAllDayPanelVisible;
    }
  }]);

  return ViewDataGenerator;
}();

var GroupedDataMapProvider = /*#__PURE__*/function () {
  function GroupedDataMapProvider(viewDataGenerator, viewDataMap, completeViewDataMap, workspace) {
    this.groupedDataMap = viewDataGenerator.generateGroupedDataMap(viewDataMap);
    this.completeViewDataMap = completeViewDataMap;
    this._workspace = workspace;
  }

  var _proto2 = GroupedDataMapProvider.prototype;

  _proto2.getGroupStartDate = function getGroupStartDate(groupIndex) {
    var firstRow = this.getFirstGroupRow(groupIndex);

    if (firstRow) {
      var startDate = firstRow[0].cellData.startDate;
      return startDate;
    }
  };

  _proto2.getGroupEndDate = function getGroupEndDate(groupIndex) {
    var lastRow = this.getLastGroupRow(groupIndex);

    if (lastRow) {
      var lastCellIndex = lastRow.length - 1;
      var cellData = lastRow[lastCellIndex].cellData;
      var endDate = cellData.endDate;
      return endDate;
    }
  };

  _proto2.findGroupCellStartDate = function findGroupCellStartDate(groupIndex, startDate, endDate, isAllDay) {
    if (isAllDay) {
      return this.findAllDayGroupCellStartDate(groupIndex, startDate);
    }

    var groupData = this.getGroupFromDateTableGroupMap(groupIndex);

    var checkCellStartDate = function checkCellStartDate(rowIndex, cellIndex) {
      var cellData = groupData[rowIndex][cellIndex].cellData;
      var secondMin = cellData.startDate,
          secondMax = cellData.endDate;

      if (_date.default.intervalsOverlap({
        firstMin: startDate,
        firstMax: endDate,
        secondMin: secondMin,
        secondMax: secondMax
      })) {
        return secondMin;
      }
    };

    var searchVertical = function searchVertical() {
      var cellCount = groupData[0].length;

      for (var cellIndex = 0; cellIndex < cellCount; ++cellIndex) {
        for (var rowIndex = 0; rowIndex < groupData.length; ++rowIndex) {
          var result = checkCellStartDate(rowIndex, cellIndex);
          if (result) return result;
        }
      }
    };

    var searchHorizontal = function searchHorizontal() {
      for (var rowIndex = 0; rowIndex < groupData.length; ++rowIndex) {
        var row = groupData[rowIndex];

        for (var cellIndex = 0; cellIndex < row.length; ++cellIndex) {
          var result = checkCellStartDate(rowIndex, cellIndex);
          if (result) return result;
        }
      }
    };

    var startDateVerticalSearch = searchVertical();
    var startDateHorizontalSearch = searchHorizontal();
    return startDateVerticalSearch > startDateHorizontalSearch ? startDateHorizontalSearch : startDateVerticalSearch;
  };

  _proto2.findAllDayGroupCellStartDate = function findAllDayGroupCellStartDate(groupIndex, startDate) {
    var groupStartDate = this.getGroupStartDate(groupIndex);
    return groupStartDate > startDate ? groupStartDate : startDate;
  };

  _proto2.findCellPositionInMap = function findCellPositionInMap(cellInfo) {
    var _this2 = this;

    var groupIndex = cellInfo.groupIndex,
        startDate = cellInfo.startDate,
        isAllDay = cellInfo.isAllDay,
        index = cellInfo.index;
    var startTime = isAllDay ? _date.default.trimTime(startDate).getTime() : startDate.getTime();

    var isStartDateInCell = function isStartDateInCell(cellData) {
      if (!_this2._workspace.isDateAndTimeView) {
        return _date.default.sameDate(startDate, cellData.startDate);
      }

      var cellStartTime = cellData.startDate.getTime();
      var cellEndTime = cellData.endDate.getTime();
      return isAllDay ? cellData.allDay && startTime >= cellStartTime && startTime <= cellEndTime : startTime >= cellStartTime && startTime < cellEndTime;
    };

    var _this$groupedDataMap = this.groupedDataMap,
        allDayPanelGroupedMap = _this$groupedDataMap.allDayPanelGroupedMap,
        dateTableGroupedMap = _this$groupedDataMap.dateTableGroupedMap;
    var rows = isAllDay && !this._workspace._isVerticalGroupedWorkSpace() ? [allDayPanelGroupedMap[groupIndex]] || [] : dateTableGroupedMap[groupIndex] || [];

    for (var rowIndex = 0; rowIndex < rows.length; ++rowIndex) {
      var row = rows[rowIndex];

      for (var cellIndex = 0; cellIndex < row.length; ++cellIndex) {
        var cell = row[cellIndex];
        var cellData = cell.cellData;

        if (this._isSameGroupIndexAndIndex(cellData, groupIndex, index)) {
          if (isStartDateInCell(cellData)) {
            return cell.position;
          }
        }
      }
    }

    return undefined;
  };

  _proto2._isSameGroupIndexAndIndex = function _isSameGroupIndexAndIndex(cellData, groupIndex, index) {
    return cellData.groupIndex === groupIndex && (index === undefined || cellData.index === index);
  };

  _proto2.getCellsGroup = function getCellsGroup(groupIndex) {
    var dateTableGroupedMap = this.groupedDataMap.dateTableGroupedMap;
    var groupData = dateTableGroupedMap[groupIndex];

    if (groupData) {
      var cellData = groupData[0][0].cellData;
      return cellData.groups;
    }
  };

  _proto2.getCompletedGroupsInfo = function getCompletedGroupsInfo() {
    var _this3 = this;

    var dateTableGroupedMap = this.groupedDataMap.dateTableGroupedMap;
    return dateTableGroupedMap.map(function (groupData) {
      var firstCell = groupData[0][0];
      var _firstCell$cellData = firstCell.cellData,
          allDay = _firstCell$cellData.allDay,
          groupIndex = _firstCell$cellData.groupIndex;
      return {
        allDay: allDay,
        groupIndex: groupIndex,
        startDate: _this3.getGroupStartDate(groupIndex),
        endDate: _this3.getGroupEndDate(groupIndex)
      };
    }).filter(function (_ref7) {
      var startDate = _ref7.startDate;
      return !!startDate;
    });
  };

  _proto2.getGroupIndices = function getGroupIndices() {
    return this.getCompletedGroupsInfo().map(function (_ref8) {
      var groupIndex = _ref8.groupIndex;
      return groupIndex;
    });
  };

  _proto2.getGroupFromDateTableGroupMap = function getGroupFromDateTableGroupMap(groupIndex) {
    var dateTableGroupedMap = this.groupedDataMap.dateTableGroupedMap;
    return dateTableGroupedMap[groupIndex];
  };

  _proto2.getFirstGroupRow = function getFirstGroupRow(groupIndex) {
    var groupedData = this.getGroupFromDateTableGroupMap(groupIndex);

    if (groupedData) {
      var cellData = groupedData[0][0].cellData;
      return !cellData.allDay ? groupedData[0] : groupedData[1];
    }
  };

  _proto2.getLastGroupRow = function getLastGroupRow(groupIndex) {
    var dateTableGroupedMap = this.groupedDataMap.dateTableGroupedMap;
    var groupedData = dateTableGroupedMap[groupIndex];

    if (groupedData) {
      var lastRowIndex = groupedData.length - 1;
      return groupedData[lastRowIndex];
    }
  };

  _proto2.getLastGroupCell = function getLastGroupCell(groupIndex) {
    var dateTableGroupedMap = this.groupedDataMap.dateTableGroupedMap;
    var groupedRows = dateTableGroupedMap[groupIndex];
    var lastRow = groupedRows[groupedRows.length - 1];
    var result;

    if (lastRow) {
      var cellCount = lastRow.length;
      result = lastRow[cellCount - 1];
    }

    return result;
  };

  _proto2.getLastGroupCellPosition = function getLastGroupCellPosition(groupIndex) {
    var _groupCell;

    var groupCell;

    if (this.isVerticalGroupedWorkspace) {
      var groupRow = this.getLastGroupRow(groupIndex);
      groupCell = groupRow[groupRow.length - 1];
    } else {
      groupCell = this.getLastGroupCell(groupIndex);
    }

    return (_groupCell = groupCell) === null || _groupCell === void 0 ? void 0 : _groupCell.position;
  };

  _proto2.getRowCountInGroup = function getRowCountInGroup(groupIndex) {
    var groupRow = this.getLastGroupRow(groupIndex);
    var cellAmount = groupRow.length;
    var lastCellData = groupRow[cellAmount - 1].cellData;
    var lastCellIndex = lastCellData.index;
    return (lastCellIndex + 1) / groupRow.length;
  };

  _createClass(GroupedDataMapProvider, [{
    key: "isVerticalGroupedWorkspace",
    get: function get() {
      return this._workspace._isVerticalGroupedWorkSpace();
    }
  }]);

  return GroupedDataMapProvider;
}();

var ViewDataProvider = /*#__PURE__*/function () {
  function ViewDataProvider(workspace) {
    this._viewDataGenerator = null;
    this._viewData = [];
    this._completeViewDataMap = [];
    this._completeDateHeaderMap = [];
    this._viewDataMap = [];
    this._groupedDataMapProvider = null;
    this._workspace = workspace;
  }

  var _proto3 = ViewDataProvider.prototype;

  _proto3.update = function update(isGenerateNewViewData) {
    var viewDataGenerator = this.viewDataGenerator,
        _workspace = this._workspace;

    var renderOptions = _workspace.generateRenderOptions();

    if (isGenerateNewViewData) {
      this.completeViewDataMap = viewDataGenerator._getCompleteViewDataMap(renderOptions);
      this.completeDateHeaderMap = viewDataGenerator._getCompleteDateHeaderMap(renderOptions, this.completeViewDataMap);
      this.completeTimePanelMap = viewDataGenerator._getCompleteTimePanelMap(renderOptions, this.completeViewDataMap);
    }

    this.viewDataMap = viewDataGenerator._generateViewDataMap(this.completeViewDataMap, renderOptions);
    this.viewData = viewDataGenerator._getViewDataFromMap(this.viewDataMap, renderOptions);
    this._groupedDataMapProvider = new GroupedDataMapProvider(this.viewDataGenerator, this.viewDataMap, this.completeViewDataMap, this._workspace);
    this.dateHeaderData = viewDataGenerator._generateDateHeaderData(this.completeDateHeaderMap, renderOptions);
    this.timePanelData = viewDataGenerator._generateTimePanelData(this.completeTimePanelMap, renderOptions);
  };

  _proto3.getStartDate = function getStartDate() {
    var groupedData = this.viewData.groupedData;
    var dateTable = groupedData[0].dateTable;
    return dateTable[0][0].startDate;
  };

  _proto3.getGroupStartDate = function getGroupStartDate(groupIndex) {
    return this._groupedDataMapProvider.getGroupStartDate(groupIndex);
  };

  _proto3.getGroupEndDate = function getGroupEndDate(groupIndex) {
    return this._groupedDataMapProvider.getGroupEndDate(groupIndex);
  };

  _proto3.findGroupCellStartDate = function findGroupCellStartDate(groupIndex, startDate, endDate, isAllDay) {
    return this._groupedDataMapProvider.findGroupCellStartDate(groupIndex, startDate, endDate, isAllDay);
  };

  _proto3.findAllDayGroupCellStartDate = function findAllDayGroupCellStartDate(groupIndex, startDate) {
    return this._groupedDataMapProvider.findAllDayGroupCellStartDate(groupIndex, startDate);
  };

  _proto3.findCellPositionInMap = function findCellPositionInMap(cellInfo) {
    return this._groupedDataMapProvider.findCellPositionInMap(cellInfo);
  };

  _proto3.getCellsGroup = function getCellsGroup(groupIndex) {
    return this._groupedDataMapProvider.getCellsGroup(groupIndex);
  };

  _proto3.getCompletedGroupsInfo = function getCompletedGroupsInfo() {
    return this._groupedDataMapProvider.getCompletedGroupsInfo();
  };

  _proto3.getGroupIndices = function getGroupIndices() {
    return this._groupedDataMapProvider.getGroupIndices();
  };

  _proto3.getLastGroupCellPosition = function getLastGroupCellPosition(groupIndex) {
    return this._groupedDataMapProvider.getLastGroupCellPosition(groupIndex);
  };

  _proto3.getRowCountInGroup = function getRowCountInGroup(groupIndex) {
    return this._groupedDataMapProvider.getRowCountInGroup(groupIndex);
  };

  _proto3.getCellData = function getCellData(rowIndex, cellIndex, isAllDay) {
    if (isAllDay && !this.isVerticalGroupedWorkspace) {
      return this._viewData.groupedData[0].allDayPanel[cellIndex];
    }

    var dateTableMap = this.viewDataMap.dateTableMap;
    var cellData = dateTableMap[rowIndex][cellIndex].cellData;
    return cellData;
  };

  _proto3.getCellsByGroupIndexAndAllDay = function getCellsByGroupIndexAndAllDay(groupIndex, allDay) {
    var workspace = this._workspace;

    var rowsPerGroup = workspace._getRowCountWithAllDayRows();

    var isShowAllDayPanel = workspace.isAllDayPanelVisible;
    var firstRowInGroup = this.isVerticalGroupedWorkspace ? groupIndex * rowsPerGroup : 0;
    var lastRowInGroup = this.isVerticalGroupedWorkspace ? (groupIndex + 1) * rowsPerGroup - 1 : rowsPerGroup;
    var correctedFirstRow = isShowAllDayPanel && !allDay ? firstRowInGroup + 1 : firstRowInGroup;
    var correctedLastRow = allDay ? correctedFirstRow : lastRowInGroup;
    return this.completeViewDataMap.slice(correctedFirstRow, correctedLastRow + 1).map(function (row) {
      return row.filter(function (_ref9) {
        var currentGroupIndex = _ref9.groupIndex;
        return groupIndex === currentGroupIndex;
      });
    });
  };

  _proto3.getGroupData = function getGroupData(groupIndex) {
    var groupedData = this.viewData.groupedData;

    if (this.isVerticalGroupedWorkspace) {
      return groupedData.filter(function (item) {
        return item.groupIndex === groupIndex;
      })[0];
    }

    var filterCells = function filterCells(row) {
      return row === null || row === void 0 ? void 0 : row.filter(function (cell) {
        return cell.groupIndex === groupIndex;
      });
    };

    var _groupedData$ = groupedData[0],
        allDayPanel = _groupedData$.allDayPanel,
        dateTable = _groupedData$.dateTable;
    var filteredDateTable = [];
    dateTable.forEach(function (row) {
      filteredDateTable.push(filterCells(row));
    });
    return {
      allDayPanel: filterCells(allDayPanel),
      dateTable: filteredDateTable
    };
  };

  _proto3.getCellCountWithGroup = function getCellCountWithGroup(groupIndex) {
    var rowIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var dateTableGroupedMap = this.groupedDataMap.dateTableGroupedMap;
    return dateTableGroupedMap.filter(function (_, index) {
      return index <= groupIndex;
    }).reduce(function (previous, row) {
      return previous + row[rowIndex].length;
    }, 0);
  };

  _proto3.getAllDayPanel = function getAllDayPanel(groupIndex) {
    var groupData = this.getGroupData(groupIndex);
    return groupData === null || groupData === void 0 ? void 0 : groupData.allDayPanel;
  };

  _proto3.isGroupIntersectDateInterval = function isGroupIntersectDateInterval(groupIndex, startDate, endDate) {
    var groupStartDate = this.getGroupStartDate(groupIndex);
    var groupEndDate = this.getGroupEndDate(groupIndex);
    return startDate < groupEndDate && endDate > groupStartDate;
  };

  _proto3.findGlobalCellPosition = function findGlobalCellPosition(date) {
    var groupIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var allDay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var completeViewDataMap = this.completeViewDataMap,
        workspace = this._workspace;
    var showAllDayPanel = workspace.isAllDayPanelVisible;

    for (var rowIndex = 0; rowIndex < completeViewDataMap.length; rowIndex += 1) {
      var currentRow = completeViewDataMap[rowIndex];

      for (var columnIndex = 0; columnIndex < currentRow.length; columnIndex += 1) {
        var cellData = currentRow[columnIndex];
        var currentStartDate = cellData.startDate,
            currentEndDate = cellData.endDate,
            currentGroupIndex = cellData.groupIndex,
            currentAllDay = cellData.allDay;

        if (groupIndex === currentGroupIndex && allDay === !!currentAllDay && this._compareDatesAndAllDay(date, currentStartDate, currentEndDate, allDay)) {
          return {
            position: {
              columnIndex: columnIndex,
              rowIndex: showAllDayPanel && !this.isVerticalGroupedWorkspace ? rowIndex - 1 : rowIndex
            },
            cellData: cellData
          };
        }
      }
    }
  };

  _proto3._compareDatesAndAllDay = function _compareDatesAndAllDay(date, cellStartDate, cellEndDate, allDay) {
    var time = date.getTime();

    var trimmedTime = _date.default.trimTime(date).getTime();

    var cellStartTime = cellStartDate.getTime();
    var cellEndTime = cellEndDate.getTime();
    return !allDay && time >= cellStartTime && time < cellEndTime || allDay && trimmedTime === cellStartTime;
  };

  _proto3.getSkippedDaysCount = function getSkippedDaysCount(groupIndex, startDate, endDate, daysCount) {
    var dateTableGroupedMap = this._groupedDataMapProvider.groupedDataMap.dateTableGroupedMap;
    var groupedData = dateTableGroupedMap[groupIndex];
    var includedDays = 0;

    for (var rowIndex = 0; rowIndex < groupedData.length; rowIndex += 1) {
      for (var columnIndex = 0; columnIndex < groupedData[rowIndex].length; columnIndex += 1) {
        var cell = groupedData[rowIndex][columnIndex].cellData;

        if (startDate.getTime() < cell.endDate.getTime() && endDate.getTime() > cell.startDate.getTime()) {
          includedDays += 1;
        }
      }
    }

    var lastCell = groupedData[groupedData.length - 1][groupedData[0].length - 1].cellData;

    var lastCellStart = _date.default.trimTime(lastCell.startDate);

    var daysAfterView = Math.floor((endDate.getTime() - lastCellStart.getTime()) / _date.default.dateToMilliseconds('day'));
    var deltaDays = daysAfterView > 0 ? daysAfterView : 0;
    return daysCount - includedDays - deltaDays;
  };

  _createClass(ViewDataProvider, [{
    key: "viewDataGenerator",
    get: function get() {
      if (!this._viewDataGenerator) {
        this._viewDataGenerator = new ViewDataGenerator(this._workspace);
      }

      return this._viewDataGenerator;
    }
  }, {
    key: "completeViewDataMap",
    get: function get() {
      return this._completeViewDataMap;
    },
    set: function set(value) {
      this._completeViewDataMap = value;
    }
  }, {
    key: "completeDateHeaderMap",
    get: function get() {
      return this._completeDateHeaderMap;
    },
    set: function set(value) {
      this._completeDateHeaderMap = value;
    }
  }, {
    key: "completeTimePanelMap",
    get: function get() {
      return this._completeTimePanelMap;
    },
    set: function set(value) {
      this._completeTimePanelMap = value;
    }
  }, {
    key: "viewData",
    get: function get() {
      return this._viewData;
    },
    set: function set(value) {
      this._viewData = value;
    }
  }, {
    key: "viewDataMap",
    get: function get() {
      return this._viewDataMap;
    },
    set: function set(value) {
      this._viewDataMap = value;
    }
  }, {
    key: "dateHeaderData",
    get: function get() {
      return this._dateHeaderData;
    },
    set: function set(value) {
      this._dateHeaderData = value;
    }
  }, {
    key: "timePanelData",
    get: function get() {
      return this._timePanelData;
    },
    set: function set(value) {
      this._timePanelData = value;
    }
  }, {
    key: "groupedDataMap",
    get: function get() {
      return this._groupedDataMapProvider.groupedDataMap;
    }
  }, {
    key: "isVerticalGroupedWorkspace",
    get: function get() {
      return this._workspace._isVerticalGroupedWorkSpace();
    }
  }]);

  return ViewDataProvider;
}();

exports.default = ViewDataProvider;
module.exports = exports.default;
module.exports.default = exports.default;
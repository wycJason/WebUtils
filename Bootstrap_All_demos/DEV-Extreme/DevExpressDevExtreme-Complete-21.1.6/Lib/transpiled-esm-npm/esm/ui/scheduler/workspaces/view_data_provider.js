import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["startDate", "endDate", "isFirstGroupCell", "isLastGroupCell"],
    _excluded2 = ["allDay", "startDate", "endDate"];
import dateUtils from '../../../core/utils/date';
import { HORIZONTAL_GROUP_ORIENTATION } from '../constants';

class ViewDataGenerator {
  constructor(workspace) {
    this.workspace = workspace;
  }

  get workspace() {
    return this._workspace;
  }

  set workspace(value) {
    this._workspace = value;
  }

  get isVerticalGroupedWorkspace() {
    return this.workspace._isVerticalGroupedWorkSpace();
  }

  get isStandaloneAllDayPanel() {
    return !this.isVerticalGroupedWorkspace && this.workspace.isAllDayPanelVisible;
  }

  _getCompleteViewDataMap(options) {
    var {
      rowCountInGroup,
      cellCountInGroupRow,
      groupsList,
      groupByDate,
      isHorizontalGrouping,
      isVerticalGrouping,
      totalCellCount,
      groupCount
    } = options;
    var viewDataMap = [];
    var step = groupByDate ? groupCount : 1;

    var allDayPanelData = this._generateAllDayPanelData(options, cellCountInGroupRow, step);

    var viewCellsData = this._generateViewCellsData(options, rowCountInGroup, step);

    allDayPanelData && viewDataMap.push(allDayPanelData);
    viewDataMap.push(...viewCellsData);

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
  }

  _transformViewDataMapForHorizontalGrouping(viewDataMap, groupsList) {
    var result = viewDataMap.map(row => row.slice());
    groupsList.slice(1).forEach((groups, index) => {
      var groupIndex = index + 1;
      viewDataMap.forEach((row, rowIndex) => {
        var nextGroupRow = row.map(cellData => {
          return _extends({}, cellData, {
            groups,
            groupIndex
          });
        });
        result[rowIndex].push(...nextGroupRow);
      });
    });
    return result;
  }

  _transformViewDataMapForVerticalGrouping(viewDataMap, groupsList) {
    var result = viewDataMap.map(row => row.slice());
    groupsList.slice(1).forEach((groups, index) => {
      var groupIndex = index + 1;
      var nextGroupMap = viewDataMap.map(cellsRow => {
        var nextRow = cellsRow.map(cellData => {
          return _extends({}, cellData, {
            groupIndex,
            groups
          });
        });
        return nextRow;
      });
      result.push(...nextGroupMap);
    });
    return result;
  }

  _transformViewDataMapForGroupingByDate(viewDataMap, groupsList) {
    var correctedGroupList = groupsList.slice(1);
    var correctedGroupCount = correctedGroupList.length;
    var result = viewDataMap.map(cellsRow => {
      var groupedByDateCellsRow = cellsRow.reduce((currentRow, cell) => {
        var rowWithCurrentCell = [...currentRow, _extends({}, cell, {
          isFirstGroupCell: true,
          isLastGroupCell: correctedGroupCount === 0
        }), ...correctedGroupList.map((groups, index) => _extends({}, cell, {
          groups,
          groupIndex: index + 1,
          isFirstGroupCell: false,
          isLastGroupCell: index === correctedGroupCount - 1
        }))];
        return rowWithCurrentCell;
      }, []);
      return groupedByDateCellsRow;
    });
    return result;
  }

  _addKeysToCells(viewDataMap, totalColumnCount) {
    var {
      currentViewDataMap: result
    } = viewDataMap.reduce((_ref, row, rowIndex) => {
      var {
        allDayPanelsCount,
        currentViewDataMap
      } = _ref;
      var isAllDay = row[0].allDay;
      var keyBase = (rowIndex - allDayPanelsCount) * totalColumnCount;
      var currentAllDayPanelsCount = isAllDay ? allDayPanelsCount + 1 : allDayPanelsCount;
      currentViewDataMap[rowIndex].forEach((cell, cellIndex) => {
        cell.key = keyBase + cellIndex;
      });
      return {
        allDayPanelsCount: currentAllDayPanelsCount,
        currentViewDataMap
      };
    }, {
      allDayPanelsCount: 0,
      currentViewDataMap: viewDataMap
    });
    return result;
  }

  _getCompleteDateHeaderMap(options, completeViewDataMap) {
    var {
      isGenerateWeekDaysHeaderData
    } = options;
    var result = [];

    if (isGenerateWeekDaysHeaderData) {
      var weekDaysRow = this._generateWeekDaysHeaderRowMap(options, completeViewDataMap);

      result.push(weekDaysRow);
    }

    var dateRow = this._generateHeaderDateRow(options, completeViewDataMap);

    result.push(dateRow);
    return result;
  }

  _generateWeekDaysHeaderRowMap(options, completeViewDataMap) {
    var {
      groupByDate,
      horizontalGroupCount,
      cellCountInDay,
      getWeekDaysHeaderText,
      daysInView
    } = options;
    var index = completeViewDataMap[0][0].allDay ? 1 : 0;
    var colSpan = groupByDate ? horizontalGroupCount * cellCountInDay : cellCountInDay;
    var weekDaysRow = [];

    for (var dayIndex = 0; dayIndex < daysInView; dayIndex += 1) {
      var cell = completeViewDataMap[index][dayIndex * colSpan];
      weekDaysRow.push(_extends({}, cell, {
        colSpan,
        text: getWeekDaysHeaderText(cell.startDate),
        isFirstGroupCell: false,
        isLastGroupCell: false
      }));
    }

    return weekDaysRow;
  }

  _generateHeaderDateRow(options, completeViewDataMap) {
    var {
      getDateHeaderText,
      today,
      groupByDate,
      horizontalGroupCount,
      cellCountInGroupRow,
      groupOrientation,
      getDateHeaderDate
    } = options;
    var dates = [];

    for (var dateIndex = 0; dateIndex < cellCountInGroupRow; dateIndex += 1) {
      dates.push(getDateHeaderDate(dateIndex));
    }

    var index = completeViewDataMap[0][0].allDay ? 1 : 0;
    var colSpan = groupByDate ? horizontalGroupCount : 1;
    var isVerticalGrouping = groupOrientation === 'vertical';
    var slicedByColumnsData = groupByDate ? completeViewDataMap[index].filter((_, columnIndex) => columnIndex % horizontalGroupCount === 0) : completeViewDataMap[index];
    return slicedByColumnsData.map((_ref2, index) => {
      var {
        startDate,
        isFirstGroupCell,
        isLastGroupCell
      } = _ref2,
          restProps = _objectWithoutPropertiesLoose(_ref2, _excluded);

      return _extends({}, restProps, {
        startDate: dates[index % cellCountInGroupRow],
        text: getDateHeaderText(index % cellCountInGroupRow),
        today: dateUtils.sameDate(startDate, today),
        colSpan,
        isFirstGroupCell: groupByDate || isFirstGroupCell && !isVerticalGrouping,
        isLastGroupCell: groupByDate || isLastGroupCell && !isVerticalGrouping
      });
    });
  }

  _getCompleteTimePanelMap(options, completeViewDataMap) {
    var {
      rowCountInGroup,
      getTimeCellDate
    } = options;
    var times = [];

    for (var rowIndex = 0; rowIndex < rowCountInGroup; rowIndex += 1) {
      times.push(getTimeCellDate(rowIndex));
    }

    var allDayRowsCount = 0;
    return completeViewDataMap.map((row, index) => {
      var _row$ = row[0],
          {
        allDay,
        startDate
      } = _row$,
          restCellProps = _objectWithoutPropertiesLoose(_row$, _excluded2);

      if (allDay) {
        allDayRowsCount += 1;
      }

      var timeIndex = (index - allDayRowsCount) % rowCountInGroup;
      return _extends({}, restCellProps, {
        allDay,
        startDate: allDay ? startDate : times[timeIndex]
      });
    });
  }

  _generateViewDataMap(completeViewDataMap, options) {
    var {
      rowCount,
      startCellIndex,
      cellCount
    } = options;
    var {
      startRowIndex
    } = options;

    var sliceCells = (row, rowIndex, startIndex, count) => {
      return row.slice(startIndex, startIndex + count).map((cellData, cellIndex) => ({
        cellData,
        position: {
          rowIndex,
          cellIndex
        }
      }));
    };

    var correctedStartRowIndex = startRowIndex;
    var allDayPanelMap = [];

    if (this.isStandaloneAllDayPanel) {
      correctedStartRowIndex++;
      allDayPanelMap = sliceCells(completeViewDataMap[0], 0, startCellIndex, cellCount);
    }

    var dateTableMap = completeViewDataMap.slice(correctedStartRowIndex, correctedStartRowIndex + rowCount).map((row, rowIndex) => sliceCells(row, rowIndex, startCellIndex, cellCount));
    return {
      allDayPanelMap,
      dateTableMap
    };
  }

  _generateDateHeaderData(completeDateHeaderMap, options) {
    var {
      isGenerateWeekDaysHeaderData,
      cellCountInDay,
      cellWidth,
      isProvideVirtualCellsWidth
    } = options;
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
      dataMap,
      leftVirtualCellWidth: isProvideVirtualCellsWidth ? datesRowConfig.leftVirtualCellWidth : undefined,
      rightVirtualCellWidth: isProvideVirtualCellsWidth ? datesRowConfig.rightVirtualCellWidth : undefined,
      leftVirtualCellCount: datesRowConfig.leftVirtualCellCount,
      rightVirtualCellCount: datesRowConfig.rightVirtualCellCount,
      weekDayLeftVirtualCellWidth: weekDayRowConfig.leftVirtualCellWidth,
      weekDayRightVirtualCellWidth: weekDayRowConfig.rightVirtualCellWidth,
      weekDayLeftVirtualCellCount: weekDayRowConfig.leftVirtualCellCount,
      weekDayRightVirtualCellCount: weekDayRowConfig.rightVirtualCellCount
    };
  }

  _generateDateHeaderDataRow(options, completeDateHeaderMap, baseColSpan, rowIndex, cellWidth) {
    var {
      groupByDate,
      horizontalGroupCount,
      startCellIndex,
      cellCount,
      totalCellCount,
      isProvideVirtualCellsWidth
    } = options;
    var colSpan = groupByDate ? horizontalGroupCount * baseColSpan : baseColSpan;
    var leftVirtualCellCount = Math.floor(startCellIndex / colSpan);
    var actualCellCount = Math.ceil((startCellIndex + cellCount) / colSpan);
    var dateRow = completeDateHeaderMap[rowIndex].slice(leftVirtualCellCount, actualCellCount);
    var finalLeftVirtualCellCount = leftVirtualCellCount * colSpan;
    var finalLeftVirtualCellWidth = finalLeftVirtualCellCount * cellWidth;
    var finalRightVirtualCellCount = totalCellCount - actualCellCount * colSpan;
    var finalRightVirtualCellWidth = finalRightVirtualCellCount * cellWidth;
    return {
      dateRow,
      leftVirtualCellCount: finalLeftVirtualCellCount,
      leftVirtualCellWidth: isProvideVirtualCellsWidth ? finalLeftVirtualCellWidth : undefined,
      rightVirtualCellCount: finalRightVirtualCellCount,
      rightVirtualCellWidth: isProvideVirtualCellsWidth ? finalRightVirtualCellWidth : undefined
    };
  }

  _generateTimePanelData(completeTimePanelMap, options) {
    var {
      startRowIndex,
      rowCount,
      topVirtualRowHeight,
      bottomVirtualRowHeight,
      cellCountInGroupRow
    } = options;
    var isGroupedAllDayPanel = this.workspace.isGroupedAllDayPanel();
    var showAllDayPanel = this.workspace.isAllDayPanelVisible;
    var indexDifference = this.isVerticalGroupedWorkspace || !showAllDayPanel ? 0 : 1;
    var correctedStartRowIndex = startRowIndex + indexDifference;
    var timePanelMap = completeTimePanelMap.slice(correctedStartRowIndex, correctedStartRowIndex + rowCount);
    var timePanelData = {
      topVirtualRowHeight,
      bottomVirtualRowHeight,
      isGroupedAllDayPanel,
      cellCountInGroupRow
    };

    var {
      previousGroupedData: groupedData
    } = this._generateTimePanelDataFromMap(timePanelMap, isGroupedAllDayPanel);

    timePanelData.groupedData = groupedData;
    return timePanelData;
  }

  _generateTimePanelDataFromMap(timePanelMap, isGroupedAllDayPanel) {
    return timePanelMap.reduce((_ref3, cellData) => {
      var {
        previousGroupIndex,
        previousGroupedData
      } = _ref3;
      var currentGroupIndex = cellData.groupIndex;

      if (currentGroupIndex !== previousGroupIndex) {
        previousGroupedData.push({
          dateTable: [],
          isGroupedAllDayPanel,
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
        previousGroupedData
      };
    }, {
      previousGroupIndex: -1,
      previousGroupedData: []
    });
  }

  _getViewDataFromMap(viewDataMap, options) {
    var {
      topVirtualRowHeight,
      bottomVirtualRowHeight,
      leftVirtualCellWidth,
      rightVirtualCellWidth,
      cellCountInGroupRow,
      totalCellCount,
      totalRowCount,
      cellCount,
      rowCount,
      startRowIndex,
      startCellIndex,
      isProvideVirtualCellsWidth
    } = options;
    var isGroupedAllDayPanel = this.workspace.isGroupedAllDayPanel();
    var {
      allDayPanelMap,
      dateTableMap
    } = viewDataMap;
    var {
      previousGroupedData: groupedData
    } = dateTableMap.reduce((_ref4, cellsRow) => {
      var {
        previousGroupIndex,
        previousGroupedData
      } = _ref4;
      var cellDataRow = cellsRow.map(_ref5 => {
        var {
          cellData
        } = _ref5;
        return cellData;
      });
      var firstCell = cellDataRow[0];
      var isAllDayRow = firstCell.allDay;
      var currentGroupIndex = firstCell.groupIndex;

      if (currentGroupIndex !== previousGroupIndex) {
        previousGroupedData.push({
          dateTable: [],
          isGroupedAllDayPanel,
          groupIndex: currentGroupIndex
        });
      }

      if (isAllDayRow) {
        previousGroupedData[previousGroupedData.length - 1].allDayPanel = cellDataRow;
      } else {
        previousGroupedData[previousGroupedData.length - 1].dateTable.push(cellDataRow);
      }

      return {
        previousGroupedData,
        previousGroupIndex: currentGroupIndex
      };
    }, {
      previousGroupIndex: -1,
      previousGroupedData: []
    });

    if (this.isStandaloneAllDayPanel) {
      groupedData[0].allDayPanel = allDayPanelMap.map(_ref6 => {
        var {
          cellData
        } = _ref6;
        return cellData;
      });
    }

    return {
      groupedData,
      topVirtualRowHeight,
      bottomVirtualRowHeight,
      leftVirtualCellWidth: isProvideVirtualCellsWidth ? leftVirtualCellWidth : undefined,
      rightVirtualCellWidth: isProvideVirtualCellsWidth ? rightVirtualCellWidth : undefined,
      cellCountInGroupRow,
      isGroupedAllDayPanel,
      leftVirtualCellCount: startCellIndex,
      rightVirtualCellCount: totalCellCount - startCellIndex - cellCount,
      topVirtualRowCount: startRowIndex,
      bottomVirtualRowCount: totalRowCount - startRowIndex - rowCount
    };
  }

  _generateViewCellsData(options, rowsCount) {
    var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var {
      cellCountInGroupRow,
      cellDataGetters
    } = options;
    var viewCellsData = [];

    for (var rowIndex = 0; rowIndex < rowsCount; rowIndex += 1) {
      viewCellsData.push(this._generateCellsRow(options, cellDataGetters, rowIndex, cellCountInGroupRow, step));
    }

    return viewCellsData;
  }

  _generateAllDayPanelData(options, cellCount) {
    var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var workSpace = this.workspace;

    if (!workSpace.isAllDayPanelVisible) {
      return null;
    }

    return this._generateCellsRow(options, [workSpace._getAllDayCellData.bind(workSpace)], 0, cellCount, step);
  }

  _generateCellsRow(options, cellDataGetters, rowIndex, columnCount, step) {
    var _this = this;

    var cellsRow = [];

    var _loop = function _loop(columnIndex) {
      var correctedColumnIndex = step * columnIndex;
      var cellDataValue = cellDataGetters.reduce((data, getter) => _extends({}, data, getter(undefined, rowIndex, correctedColumnIndex, 0, data.startDate).value), {});
      cellDataValue.index = rowIndex * columnCount + columnIndex;
      cellDataValue.isFirstGroupCell = _this._isFirstGroupCell(rowIndex, columnIndex, options);
      cellDataValue.isLastGroupCell = _this._isLastGroupCell(rowIndex, columnIndex, options);
      cellsRow.push(cellDataValue);
    };

    for (var columnIndex = 0; columnIndex < columnCount; ++columnIndex) {
      _loop(columnIndex);
    }

    return cellsRow;
  }

  _calculateCellIndex(horizontalGroupCount, groupOrientation, isGroupedByDate, rowIndex, columnIndex, columnsNumber) {
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
  }

  generateGroupedDataMap(viewDataMap) {
    var {
      allDayPanelMap,
      dateTableMap
    } = viewDataMap;
    var {
      previousGroupedDataMap: dateTableGroupedMap
    } = dateTableMap.reduce((previousOptions, cellsRow) => {
      var {
        previousGroupedDataMap,
        previousRowIndex,
        previousGroupIndex
      } = previousOptions;
      var {
        groupIndex: currentGroupIndex
      } = cellsRow[0].cellData;
      var currentRowIndex = currentGroupIndex === previousGroupIndex ? previousRowIndex + 1 : 0;
      cellsRow.forEach(cell => {
        var {
          groupIndex
        } = cell.cellData;

        if (!previousGroupedDataMap[groupIndex]) {
          previousGroupedDataMap[groupIndex] = [];
        }

        if (!previousGroupedDataMap[groupIndex][currentRowIndex]) {
          previousGroupedDataMap[groupIndex][currentRowIndex] = [];
        }

        previousGroupedDataMap[groupIndex][currentRowIndex].push(cell);
      });
      return {
        previousGroupedDataMap,
        previousRowIndex: currentRowIndex,
        previousGroupIndex: currentGroupIndex
      };
    }, {
      previousGroupedDataMap: [],
      previousRowIndex: -1,
      previousGroupIndex: -1
    });
    var allDayPanelGroupedMap = [];
    allDayPanelMap === null || allDayPanelMap === void 0 ? void 0 : allDayPanelMap.forEach(cell => {
      var {
        groupIndex
      } = cell.cellData;

      if (!allDayPanelGroupedMap[groupIndex]) {
        allDayPanelGroupedMap[groupIndex] = [];
      }

      allDayPanelGroupedMap[groupIndex].push(cell);
    });
    return {
      allDayPanelGroupedMap,
      dateTableGroupedMap
    };
  }

  _isFirstGroupCell(rowIndex, columnIndex, options) {
    var {
      groupOrientation,
      rowCountInGroup,
      cellCountInGroupRow,
      groupCount
    } = options;

    if (this.workspace.isGroupedByDate()) {
      return columnIndex % groupCount === 0;
    }

    if (groupOrientation === HORIZONTAL_GROUP_ORIENTATION) {
      return columnIndex % cellCountInGroupRow === 0;
    }

    return rowIndex % rowCountInGroup === 0;
  }

  _isLastGroupCell(rowIndex, columnIndex, options) {
    var {
      groupOrientation,
      rowCountInGroup,
      cellCountInGroupRow,
      groupCount
    } = options;

    if (this.workspace.isGroupedByDate()) {
      return (columnIndex + 1) % groupCount === 0;
    }

    if (groupOrientation === HORIZONTAL_GROUP_ORIENTATION) {
      return (columnIndex + 1) % cellCountInGroupRow === 0;
    }

    return (rowIndex + 1) % rowCountInGroup === 0;
  }

}

class GroupedDataMapProvider {
  constructor(viewDataGenerator, viewDataMap, completeViewDataMap, workspace) {
    this.groupedDataMap = viewDataGenerator.generateGroupedDataMap(viewDataMap);
    this.completeViewDataMap = completeViewDataMap;
    this._workspace = workspace;
  }

  get isVerticalGroupedWorkspace() {
    return this._workspace._isVerticalGroupedWorkSpace();
  }

  getGroupStartDate(groupIndex) {
    var firstRow = this.getFirstGroupRow(groupIndex);

    if (firstRow) {
      var {
        startDate
      } = firstRow[0].cellData;
      return startDate;
    }
  }

  getGroupEndDate(groupIndex) {
    var lastRow = this.getLastGroupRow(groupIndex);

    if (lastRow) {
      var lastCellIndex = lastRow.length - 1;
      var {
        cellData
      } = lastRow[lastCellIndex];
      var {
        endDate
      } = cellData;
      return endDate;
    }
  }

  findGroupCellStartDate(groupIndex, startDate, endDate, isAllDay) {
    if (isAllDay) {
      return this.findAllDayGroupCellStartDate(groupIndex, startDate);
    }

    var groupData = this.getGroupFromDateTableGroupMap(groupIndex);

    var checkCellStartDate = (rowIndex, cellIndex) => {
      var {
        cellData
      } = groupData[rowIndex][cellIndex];
      var {
        startDate: secondMin,
        endDate: secondMax
      } = cellData;

      if (dateUtils.intervalsOverlap({
        firstMin: startDate,
        firstMax: endDate,
        secondMin,
        secondMax
      })) {
        return secondMin;
      }
    };

    var searchVertical = () => {
      var cellCount = groupData[0].length;

      for (var cellIndex = 0; cellIndex < cellCount; ++cellIndex) {
        for (var rowIndex = 0; rowIndex < groupData.length; ++rowIndex) {
          var result = checkCellStartDate(rowIndex, cellIndex);
          if (result) return result;
        }
      }
    };

    var searchHorizontal = () => {
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
  }

  findAllDayGroupCellStartDate(groupIndex, startDate) {
    var groupStartDate = this.getGroupStartDate(groupIndex);
    return groupStartDate > startDate ? groupStartDate : startDate;
  }

  findCellPositionInMap(cellInfo) {
    var {
      groupIndex,
      startDate,
      isAllDay,
      index
    } = cellInfo;
    var startTime = isAllDay ? dateUtils.trimTime(startDate).getTime() : startDate.getTime();

    var isStartDateInCell = cellData => {
      if (!this._workspace.isDateAndTimeView) {
        return dateUtils.sameDate(startDate, cellData.startDate);
      }

      var cellStartTime = cellData.startDate.getTime();
      var cellEndTime = cellData.endDate.getTime();
      return isAllDay ? cellData.allDay && startTime >= cellStartTime && startTime <= cellEndTime : startTime >= cellStartTime && startTime < cellEndTime;
    };

    var {
      allDayPanelGroupedMap,
      dateTableGroupedMap
    } = this.groupedDataMap;
    var rows = isAllDay && !this._workspace._isVerticalGroupedWorkSpace() ? [allDayPanelGroupedMap[groupIndex]] || [] : dateTableGroupedMap[groupIndex] || [];

    for (var rowIndex = 0; rowIndex < rows.length; ++rowIndex) {
      var row = rows[rowIndex];

      for (var cellIndex = 0; cellIndex < row.length; ++cellIndex) {
        var cell = row[cellIndex];
        var {
          cellData
        } = cell;

        if (this._isSameGroupIndexAndIndex(cellData, groupIndex, index)) {
          if (isStartDateInCell(cellData)) {
            return cell.position;
          }
        }
      }
    }

    return undefined;
  }

  _isSameGroupIndexAndIndex(cellData, groupIndex, index) {
    return cellData.groupIndex === groupIndex && (index === undefined || cellData.index === index);
  }

  getCellsGroup(groupIndex) {
    var {
      dateTableGroupedMap
    } = this.groupedDataMap;
    var groupData = dateTableGroupedMap[groupIndex];

    if (groupData) {
      var {
        cellData
      } = groupData[0][0];
      return cellData.groups;
    }
  }

  getCompletedGroupsInfo() {
    var {
      dateTableGroupedMap
    } = this.groupedDataMap;
    return dateTableGroupedMap.map(groupData => {
      var firstCell = groupData[0][0];
      var {
        allDay,
        groupIndex
      } = firstCell.cellData;
      return {
        allDay,
        groupIndex,
        startDate: this.getGroupStartDate(groupIndex),
        endDate: this.getGroupEndDate(groupIndex)
      };
    }).filter(_ref7 => {
      var {
        startDate
      } = _ref7;
      return !!startDate;
    });
  }

  getGroupIndices() {
    return this.getCompletedGroupsInfo().map(_ref8 => {
      var {
        groupIndex
      } = _ref8;
      return groupIndex;
    });
  }

  getGroupFromDateTableGroupMap(groupIndex) {
    var {
      dateTableGroupedMap
    } = this.groupedDataMap;
    return dateTableGroupedMap[groupIndex];
  }

  getFirstGroupRow(groupIndex) {
    var groupedData = this.getGroupFromDateTableGroupMap(groupIndex);

    if (groupedData) {
      var {
        cellData
      } = groupedData[0][0];
      return !cellData.allDay ? groupedData[0] : groupedData[1];
    }
  }

  getLastGroupRow(groupIndex) {
    var {
      dateTableGroupedMap
    } = this.groupedDataMap;
    var groupedData = dateTableGroupedMap[groupIndex];

    if (groupedData) {
      var lastRowIndex = groupedData.length - 1;
      return groupedData[lastRowIndex];
    }
  }

  getLastGroupCell(groupIndex) {
    var {
      dateTableGroupedMap
    } = this.groupedDataMap;
    var groupedRows = dateTableGroupedMap[groupIndex];
    var lastRow = groupedRows[groupedRows.length - 1];
    var result;

    if (lastRow) {
      var cellCount = lastRow.length;
      result = lastRow[cellCount - 1];
    }

    return result;
  }

  getLastGroupCellPosition(groupIndex) {
    var _groupCell;

    var groupCell;

    if (this.isVerticalGroupedWorkspace) {
      var groupRow = this.getLastGroupRow(groupIndex);
      groupCell = groupRow[groupRow.length - 1];
    } else {
      groupCell = this.getLastGroupCell(groupIndex);
    }

    return (_groupCell = groupCell) === null || _groupCell === void 0 ? void 0 : _groupCell.position;
  }

  getRowCountInGroup(groupIndex) {
    var groupRow = this.getLastGroupRow(groupIndex);
    var cellAmount = groupRow.length;
    var lastCellData = groupRow[cellAmount - 1].cellData;
    var lastCellIndex = lastCellData.index;
    return (lastCellIndex + 1) / groupRow.length;
  }

}

export default class ViewDataProvider {
  constructor(workspace) {
    this._viewDataGenerator = null;
    this._viewData = [];
    this._completeViewDataMap = [];
    this._completeDateHeaderMap = [];
    this._viewDataMap = [];
    this._groupedDataMapProvider = null;
    this._workspace = workspace;
  }

  get viewDataGenerator() {
    if (!this._viewDataGenerator) {
      this._viewDataGenerator = new ViewDataGenerator(this._workspace);
    }

    return this._viewDataGenerator;
  }

  get completeViewDataMap() {
    return this._completeViewDataMap;
  }

  set completeViewDataMap(value) {
    this._completeViewDataMap = value;
  }

  get completeDateHeaderMap() {
    return this._completeDateHeaderMap;
  }

  set completeDateHeaderMap(value) {
    this._completeDateHeaderMap = value;
  }

  get completeTimePanelMap() {
    return this._completeTimePanelMap;
  }

  set completeTimePanelMap(value) {
    this._completeTimePanelMap = value;
  }

  get viewData() {
    return this._viewData;
  }

  set viewData(value) {
    this._viewData = value;
  }

  get viewDataMap() {
    return this._viewDataMap;
  }

  set viewDataMap(value) {
    this._viewDataMap = value;
  }

  get dateHeaderData() {
    return this._dateHeaderData;
  }

  set dateHeaderData(value) {
    this._dateHeaderData = value;
  }

  get timePanelData() {
    return this._timePanelData;
  }

  set timePanelData(value) {
    this._timePanelData = value;
  }

  get groupedDataMap() {
    return this._groupedDataMapProvider.groupedDataMap;
  }

  get isVerticalGroupedWorkspace() {
    return this._workspace._isVerticalGroupedWorkSpace();
  }

  update(isGenerateNewViewData) {
    var {
      viewDataGenerator,
      _workspace
    } = this;

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
  }

  getStartDate() {
    var {
      groupedData
    } = this.viewData;
    var {
      dateTable
    } = groupedData[0];
    return dateTable[0][0].startDate;
  }

  getGroupStartDate(groupIndex) {
    return this._groupedDataMapProvider.getGroupStartDate(groupIndex);
  }

  getGroupEndDate(groupIndex) {
    return this._groupedDataMapProvider.getGroupEndDate(groupIndex);
  }

  findGroupCellStartDate(groupIndex, startDate, endDate, isAllDay) {
    return this._groupedDataMapProvider.findGroupCellStartDate(groupIndex, startDate, endDate, isAllDay);
  }

  findAllDayGroupCellStartDate(groupIndex, startDate) {
    return this._groupedDataMapProvider.findAllDayGroupCellStartDate(groupIndex, startDate);
  }

  findCellPositionInMap(cellInfo) {
    return this._groupedDataMapProvider.findCellPositionInMap(cellInfo);
  }

  getCellsGroup(groupIndex) {
    return this._groupedDataMapProvider.getCellsGroup(groupIndex);
  }

  getCompletedGroupsInfo() {
    return this._groupedDataMapProvider.getCompletedGroupsInfo();
  }

  getGroupIndices() {
    return this._groupedDataMapProvider.getGroupIndices();
  }

  getLastGroupCellPosition(groupIndex) {
    return this._groupedDataMapProvider.getLastGroupCellPosition(groupIndex);
  }

  getRowCountInGroup(groupIndex) {
    return this._groupedDataMapProvider.getRowCountInGroup(groupIndex);
  }

  getCellData(rowIndex, cellIndex, isAllDay) {
    if (isAllDay && !this.isVerticalGroupedWorkspace) {
      return this._viewData.groupedData[0].allDayPanel[cellIndex];
    }

    var {
      dateTableMap
    } = this.viewDataMap;
    var {
      cellData
    } = dateTableMap[rowIndex][cellIndex];
    return cellData;
  }

  getCellsByGroupIndexAndAllDay(groupIndex, allDay) {
    var workspace = this._workspace;

    var rowsPerGroup = workspace._getRowCountWithAllDayRows();

    var isShowAllDayPanel = workspace.isAllDayPanelVisible;
    var firstRowInGroup = this.isVerticalGroupedWorkspace ? groupIndex * rowsPerGroup : 0;
    var lastRowInGroup = this.isVerticalGroupedWorkspace ? (groupIndex + 1) * rowsPerGroup - 1 : rowsPerGroup;
    var correctedFirstRow = isShowAllDayPanel && !allDay ? firstRowInGroup + 1 : firstRowInGroup;
    var correctedLastRow = allDay ? correctedFirstRow : lastRowInGroup;
    return this.completeViewDataMap.slice(correctedFirstRow, correctedLastRow + 1).map(row => row.filter(_ref9 => {
      var {
        groupIndex: currentGroupIndex
      } = _ref9;
      return groupIndex === currentGroupIndex;
    }));
  }

  getGroupData(groupIndex) {
    var {
      groupedData
    } = this.viewData;

    if (this.isVerticalGroupedWorkspace) {
      return groupedData.filter(item => item.groupIndex === groupIndex)[0];
    }

    var filterCells = row => row === null || row === void 0 ? void 0 : row.filter(cell => cell.groupIndex === groupIndex);

    var {
      allDayPanel,
      dateTable
    } = groupedData[0];
    var filteredDateTable = [];
    dateTable.forEach(row => {
      filteredDateTable.push(filterCells(row));
    });
    return {
      allDayPanel: filterCells(allDayPanel),
      dateTable: filteredDateTable
    };
  }

  getCellCountWithGroup(groupIndex) {
    var rowIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var {
      dateTableGroupedMap
    } = this.groupedDataMap;
    return dateTableGroupedMap.filter((_, index) => index <= groupIndex).reduce((previous, row) => previous + row[rowIndex].length, 0);
  }

  getAllDayPanel(groupIndex) {
    var groupData = this.getGroupData(groupIndex);
    return groupData === null || groupData === void 0 ? void 0 : groupData.allDayPanel;
  }

  isGroupIntersectDateInterval(groupIndex, startDate, endDate) {
    var groupStartDate = this.getGroupStartDate(groupIndex);
    var groupEndDate = this.getGroupEndDate(groupIndex);
    return startDate < groupEndDate && endDate > groupStartDate;
  }

  findGlobalCellPosition(date) {
    var groupIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var allDay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var {
      completeViewDataMap,
      _workspace: workspace
    } = this;
    var showAllDayPanel = workspace.isAllDayPanelVisible;

    for (var rowIndex = 0; rowIndex < completeViewDataMap.length; rowIndex += 1) {
      var currentRow = completeViewDataMap[rowIndex];

      for (var columnIndex = 0; columnIndex < currentRow.length; columnIndex += 1) {
        var cellData = currentRow[columnIndex];
        var {
          startDate: currentStartDate,
          endDate: currentEndDate,
          groupIndex: currentGroupIndex,
          allDay: currentAllDay
        } = cellData;

        if (groupIndex === currentGroupIndex && allDay === !!currentAllDay && this._compareDatesAndAllDay(date, currentStartDate, currentEndDate, allDay)) {
          return {
            position: {
              columnIndex,
              rowIndex: showAllDayPanel && !this.isVerticalGroupedWorkspace ? rowIndex - 1 : rowIndex
            },
            cellData
          };
        }
      }
    }
  }

  _compareDatesAndAllDay(date, cellStartDate, cellEndDate, allDay) {
    var time = date.getTime();
    var trimmedTime = dateUtils.trimTime(date).getTime();
    var cellStartTime = cellStartDate.getTime();
    var cellEndTime = cellEndDate.getTime();
    return !allDay && time >= cellStartTime && time < cellEndTime || allDay && trimmedTime === cellStartTime;
  }

  getSkippedDaysCount(groupIndex, startDate, endDate, daysCount) {
    var {
      dateTableGroupedMap
    } = this._groupedDataMapProvider.groupedDataMap;
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
    var lastCellStart = dateUtils.trimTime(lastCell.startDate);
    var daysAfterView = Math.floor((endDate.getTime() - lastCellStart.getTime()) / dateUtils.dateToMilliseconds('day'));
    var deltaDays = daysAfterView > 0 ? daysAfterView : 0;
    return daysCount - includedDays - deltaDays;
  }

}
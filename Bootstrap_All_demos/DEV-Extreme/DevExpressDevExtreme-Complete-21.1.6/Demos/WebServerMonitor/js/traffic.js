"use strict";

(function () {
    var view = new window.WebServerMonitor.ViewModel("index");
    view.inherit(function () {
        var palette,
            fontColor,
            gridColor,
            bkgColor,
            app = window.WebServerMonitor.app,
            labelTextColor,
            labelColor;
        return {
            applyTheme: function (theme, animation) {
                if (theme == 'dark') {
                    palette = 'Dark Palette';
                    fontColor = '#a7acbc';
                    gridColor = '#515873';
                    bkgColor = '#363E5B';
                    labelTextColor = '#363e5b';
                    labelColor = 'white';
                } else {
                    palette = 'Light Palette';
                    fontColor = '#7f7f7f';
                    gridColor = '#e9e9e9';
                    bkgColor = '#ffffff';
                    labelTextColor = 'white';
                    labelColor = '#43474b';
                }
                this.pieChartOptions({
                    palette: palette,
                    size: {
                        height: 270
                    },
                    margin: {
                        top: 30
                    },
                    legend: {
                        visible: false
                    },
                    tooltip: {
                        enabled: true,
                        customizeText: function () {
                            return this.argumentText + '<br/>' + this.percentText;
                        }
                    },
                    animation: animation,
                    dataSource: app.arrayForBarChart,
                    series: {
                        border: {
                            color: bkgColor,
                            width: 2,
                            visible: true
                        },
                        hoverStyle: {
                            border: {
                                color: bkgColor,
                                width: 2,
                                visible: true
                            }
                        },
                        argumentField: 'country',
                        valueField: 'value'
                    }
                });
                this.barChartOptions({
                    commonAxisSettings: {
                        visible: false,
                        tick: {
                            visible: false
                        },
                        grid: {
                            color: gridColor,
                            opacity:1
                        },
                        label: {
                            font: {
                                color: fontColor
                            }
                        }
                    },
                    animation: animation,
                    margin: {
                        right: 177
                    },
                    commonSeriesSettings: {
                        type: 'bar'
                    },
                    valueAxis: {
                        visualRange: {
                            startValue: 0,
                            endValue: 1000
                        }
                    },
                    legend: { visible: false },
                    dataSource: app.arrayForBarChart,
                    series: [{
                        label: {
                            visible: true,
                            backgroundColor: labelColor,
                            font: {
                                color: labelTextColor,
                                size:11
                            }
                        },
                        argumentField: 'country',
                        valueField: 'value',
                        color: DevExpress.viz.getPalette(palette).simpleSet[2]
                    }]
                });
                this.stackedBarChartOptions({
                    palette: palette,
                    commonAxisSettings: {
                        visible: false,
                        tick: {
                            visible: false
                        },
                        grid: {
                            color: gridColor,
                            opacity: 1,
                        },
                        label: {
                            font: {
                                color: fontColor
                            }
                        },
                        opacity: 1
                    },
                    animation: animation,
                    commonSeriesSettings: {
                        argumentField: 'day',
                        type: 'stackedBar'
                    },
                    valueAxis: {
                        inverted: true,
                        label: {
                            customizeText: function () {
                                return 100 - this.value;
                            }
                        }
                    },
                    legend: {
                        margin: 30,
                        rowItemSpacing: 10,
                        markerSize: 20,
                        font: {
                            color:fontColor
                        }
                    },
                    margin: {
                        top: 16,
                        right: 41
                    },
                    dataSource: app.arrayForStackedBar,
                    series: [{
                        valueField: 'y1',
                        name: 'China'
                    }, {
                        valueField: 'y2',
                        name: 'USA'
                    }, {
                        valueField: 'y3',
                        name: 'Russia'
                    }, {
                        valueField: 'y4',
                        name: 'Canada'
                    }, {
                        valueField: 'y5',
                        name: 'Japan'
                    }, {
                        valueField: 'y6',
                        name: 'Others'
                    }]
                });
                this.lineChartOptions({
                    palette: palette,
                    commonAxisSettings: {
                        visible: false,
                        tick: {
                            visible: false
                        },
                        valueMarginsEnabled: false,
                        grid: {
                            color: gridColor,
                            visible: true,
                            opacity: 1
                        },
                        label: {
                            font: {
                                color: fontColor
                            }
                        },
                        opacity: 1
                    },
                    animation: animation,
                    size: {
                        width: 400
                    },
                    margin: {
                        top: 16
                    },
                    commonSeriesSettings: {
                        argumentField: 'hour',
                        type: 'spline',
                        point: { visible: false }
                    },
                    commonPaneSettings: {
                        border: {
                            visible: true,
                            color: gridColor,
                            opacity:1
                        }
                    },
                    argumentAxis: {
                        tickInterval: {
                            hours: 4
                        }
                    },
                    valueAxis: {
                        visualRange: {
                            startValue: 0,
                            endValue: 500
                        }
                    },
                    legend: { visible: false },
                    dataSource: app.arrayForLineChart,
                    series: [{
                        valueField: 'y1'
                    }, {
                        valueField: 'y2'
                    }, {
                        valueField: 'y3'
                    }, {
                        valueField: 'y4'
                    }, {
                        valueField: 'y5'
                    }, {
                        valueField: 'y6'
                    }]
                });
            },
            pieChartOptions: ko.observable({}),
            barChartOptions: ko.observable({}),
            stackedBarChartOptions: ko.observable({}),
            lineChartOptions: ko.observable({})
        };
    }());
    ko.applyBindings(view);
}());
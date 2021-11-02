"use strict";

SalesDashboard.mapModel = function () {
    var self = this,

        BUBBLES_COUNT = 7,
        BASE_BUBBLE_SIZE = 20,

        ZOOM_COMPENSATOR = 0.5,

        yearMaxSalesValue = 1,
        maxSalesValue = 1,
        yearChanged = true,
        mapChanged = true,
        currentYear = 0,

        mapStr = "",
        areaColor = "#fcd7cf",
        markerColor = "#f55f40",

        range,

        map = drawMap();

    self.startDate = Globalize.formatDate(SalesDashboard._currentDay, { raw: "yyyy-01-01" });
    self.endDate = Globalize.formatDate(SalesDashboard._currentDay, { raw: "yyyy-12-31" });

    var gridCustomOptions = {
        filterRow: {
            visible: false
        },
        columns: [
            {
                dataField: "Country",
                dataType: "string"
            },
            {
                dataField: "City",
                dataType: "string"
            },
           {
               dataField: "Amount",
               dataType: "number",
               sortOrder: "desc",
               alignment: "right",
               format: "currency"
           },
           {
               dataField: "Dynamics",
               dataType: "object",
               allowFiltering: false,
               allowSorting: false,
               width: 270,
               cellTemplate: function(container, options) {
                   var data = options.data,
                       resultOptions = {
                           dataSource: data.Dynamics,
                           argumentField: "SaleDate",
                           valueField: "Sales",
                           type: "bar",
                           barPositiveColor: "#f55f40",
                           tooltip: {
                               enabled: false
                           },
                           showMinMax: false,
                           showFirstLast: false,
                           size: {
                               height: 20
                           }
                       };

                   var div = $("<div/>");
                   container.append(div);
                   div.dxSparkline(resultOptions);
               }
           }
        ],
        showRowLines: false
    };

    function setBubbleMaxSize(zoom) {
        map.option("layers[1].maxSize",
            BASE_BUBBLE_SIZE * (maxSalesValue / yearMaxSalesValue) * (zoom || 1) / ZOOM_COMPENSATOR * 1.2);
    }
    
    function drawMap() {
        return $("#vectorMap").dxVectorMap({
            layers: [{
                dataSource: DevExpress.viz.map.sources.world,
                color: areaColor,
                borderColor: areaColor,
                hoveredBorderColor: areaColor
            }, {
                hoverEnabled: false,
                borderColor: markerColor,
                color: markerColor,
                elementType: "bubble",
                dataField: "value",
                minSize: 10
            }],
            bounds: [-180, 81.6, 180, -39.4],
            controlBar: {
                enabled: false
            },
            tooltip: {
                enabled: true,
                borderColor: "#d9d9d9",
                color: "#fff",
                font: {
                    color: "#b0324f",
                    opacity: 1,
                    size: 18
                },
                paddingTopBottom: 2,
                customizeTooltip: function (arg) {
                    if (arg.layer.type === "area") return;
                    else return {
                        text: "<span style='font-size: 14px; color: #737373;'>" + arg.attribute("name") + "</span><br />"
                            + "<span>$" + (this.attribute("sales") / 1000000).toFixed(2) + "M</span>"
                    };
                },
                shadow: {
                    opacity: 0.15,
                    blur: 0,
                    color: "#000000",
                    offsetX: 3,
                    offsetY: 3
                }
            },
            zoomFactorChanged: setBubbleMaxSize
        }).dxVectorMap("instance");
    }

    

    function processMap(data) {
        var features = [],
            countrySales = {},
            stateSales = {};
        maxSalesValue = 1;
        $.each(data, function (index, item) {
            countrySales[item.Country] = countrySales[item.Country] || 0;
            stateSales[item.State] = stateSales[item.State] || 0;
            countrySales[item.Country] += item.Sales;
            stateSales[item.State] += item.Sales;
            if (index >= BUBBLES_COUNT) return;
            if (maxSalesValue < item.Sales) maxSalesValue = item.Sales;
            features.push({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [item.Coordinates[1], item.Coordinates[0]]
                },
                properties: {
                    name: item.City,
                    sales: item.Sales,
                    value: item.Sales
                }
            });
        });
        if(yearChanged || mapChanged) yearMaxSalesValue = maxSalesValue;
        mapChanged = false;
        map.beginUpdate();
        map.option("layers[1].dataSource", {
            type: "FeatureCollection",
            features: features
        });
        setBubbleMaxSize(map.zoomFactor());
        map.endUpdate();
    }



    function loadMapData() {
        SalesDashboard.loadData({
            map: mapStr || "",
            startDate: self.startDate,
            endDate: self.endDate
        }, processMap, true, "cities");
    }

    function switchMap() {
        $(".today div").removeClass("active");
        $(this).addClass("active");
        mapStr = $(this).attr("data-map");
        var mapData,
            bounds;
        switch (mapStr) {
            case "world":
                mapData = DevExpress.viz.map.sources.world;
                bounds = [-180, 81.6, 180, -39.4];
                mapStr = "";
                break;
            case "usa":
                mapData = DevExpress.viz.map.sources.usa;
                bounds = [-167, 66, -55, 18];
                break;
            case "canada":
                mapData = DevExpress.viz.map.sources.canada;
                bounds = [-167, 80, -55, 42];
                break;
            case "europe":
                mapData = DevExpress.viz.map.sources.europe;
                bounds = [-20, 63, 40, 36];
                break;
            case "eurasia":
                mapData = DevExpress.viz.map.sources.eurasia;
                bounds = [0, 67, 150, -20];
                break;
            case "africa":
                mapData = DevExpress.viz.map.sources.africa;
                bounds = [-30, 40, 60, -40];
                break;
        }

        mapChanged = true;

        range.load(0).done(loadMapData);
        
        map.beginUpdate();
        map.option("layers[0].dataSource", mapData);
        map.option("layers[1].dataSource", {});
        map.option("bounds", bounds);
        map.endUpdate();
    }


    self.init = function() {
        var grid,
            category = "cities",
            
            getLoadOptions = function(startDate, endDate) {
                return {
                    dynamicsGroupBy: "hour",
                    startDate: startDate,
                    endDate: endDate
                };
            };

        range = SalesDashboard.initRangeSelector();
        range.onSelectionChanged.add(function (e) {
            var newYear = e.value[0].getFullYear();
            yearChanged = currentYear != newYear;
            currentYear = newYear;
            self.startDate = Globalize.formatDate(e.value[0], { raw: "yyyy-MM-dd" });
            self.endDate = Globalize.formatDate(e.value[1], { raw: "yyyy-MM-dd" });
            loadMapData();
            grid.load(getLoadOptions(self.startDate, self.endDate), category);
        });
        range.load(0);

        grid = SalesDashboard.initGrid(gridCustomOptions);
        $(".today div").click(switchMap);
        $("#worldMap").addClass("active");
    };
};

SalesDashboard.currentModel = new SalesDashboard.mapModel();
SalesDashboard.currentModel.init();

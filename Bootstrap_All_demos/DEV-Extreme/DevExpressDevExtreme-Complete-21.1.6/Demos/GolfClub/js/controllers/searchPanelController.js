"use strict";

angular.module("GolfClub").controller("SearchPanelCtrl", ["$scope", "$location", function ($scope, $location) {
    var MAX_NUMBER_OF_DAYS = 60,
        MAX_NUMBER_OF_DAYS_FOR_BOOKING = 7,
        DEFAULT_COUNT_HOLES = 18,
        DEFAULT_COUNT_PLAYERS = 2;
    $scope.searchPanel = {
        selectBoxData: GolfClub.stores.cities,
        changeSearchVisible: false,
        numberOfPlayers: [2, 3, 4],
        numberOfHoles: [9, 18],
        maxStartDate: GolfClub.addDays(new Date(), MAX_NUMBER_OF_DAYS),
        minStartDate: new Date(),
        maxEndDate: null,
        minEndDate: new Date(),
        searchData: {
            holes: null,
            players: null,
            startDate: null,
            endDate: null,
            location: null
        }
    };

    function init() {
        var params = $location.search();

        if (!$.isEmptyObject(params)) {
            $scope.searchPanel.searchData = {
                holes: parseInt(params.holes),
                players: parseInt(params.players),
                startDate: new Date(params.startDate),
                endDate: new Date(params.endDate),
                location: parseInt(params.cityId)
            };
        }
    }

    $scope.$watch("searchPanel.searchData.startDate", function (newValue) {
        if (newValue) {
            $scope.searchPanel.minEndDate = newValue;
            $scope.searchPanel.maxEndDate = GolfClub.addDays(newValue, MAX_NUMBER_OF_DAYS_FOR_BOOKING);
            if ((!$scope.searchPanel.searchData.endDate) || ($scope.searchPanel.searchData.endDate <= $scope.searchPanel.searchData.startDate) || ($scope.searchPanel.searchData.endDate > GolfClub.addDays(newValue, MAX_NUMBER_OF_DAYS_FOR_BOOKING))) {
                var numberOfDays = parseInt(($scope.searchPanel.maxStartDate - newValue) / 1000 / 60 / 60 / 24 + 1);
                $scope.searchPanel.searchData.endDate = (numberOfDays >= MAX_NUMBER_OF_DAYS_FOR_BOOKING) ? GolfClub.addDays(newValue, MAX_NUMBER_OF_DAYS_FOR_BOOKING) : GolfClub.addDays(newValue, numberOfDays);
                $scope.searchPanel.maxEndDate = $scope.searchPanel.searchData.endDate;
            }
            if (!$scope.searchPanel.searchData.holes) {
                $scope.searchPanel.searchData.holes = DEFAULT_COUNT_HOLES;
            }
            if (!$scope.searchPanel.players) {
                $scope.searchPanel.searchData.players = DEFAULT_COUNT_PLAYERS;
            }
        }
    });

    $scope.showChangeSearch = function () {
        $scope.searchPanel.changeSearchVisible = !$scope.searchPanel.changeSearchVisible;
    };

    $scope.goToSearch = function (params) {
        var result = $(".search-form").dxForm("instance").validate();

        if (result.isValid) {
            $scope.showChangeSearch();
            $location.path("/search").search({
                cityId: $scope.searchPanel.searchData.location,
                startDate: GolfClub.getDate($scope.searchPanel.searchData.startDate),
                endDate: GolfClub.getDate($scope.searchPanel.searchData.endDate),
                players: $scope.searchPanel.searchData.players,
                holes: $scope.searchPanel.searchData.holes
            });
        }
    };

    init();
}]);
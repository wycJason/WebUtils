"use strict";

angular.module("GolfClub").controller("SearchCtrl", ["$scope", "$http", "$location", function ($scope, $http, $location) {
    var params = $location.search();
    $scope.lt.page = $location.path();
    $scope.reservationData = [];
    $scope.resourcesData = [];
    $scope.groups = [];
    $scope.search = {
        clubs: null,
        params: params,
        loadingData: true,
        currentDate: new Date(params.startDate),
        date: GolfClub.getDateForView(params)
    };

    GolfClub.stores.clubs.load({
        filter: ["CityId", "=", parseInt($scope.search.params.cityId)],
        expand: ["City", "Reservations"]
    }).done(function (data) {
        $scope.search.loadingData = false;
        $.each(data, function (index, value) {
            value.Price = Globalize.formatCurrency(parseInt(value.Price), "USD", { maximumFractionDigits: 0 });
        });
        GolfClub.getDataForScheduler($scope, data, params.startDate);
        $scope.$apply(function () {
            $scope.search.clubs = data;
        });
        $(".responsive-search").dxResponsiveBox("instance").repaint();
    });

    $scope.goToInfo = function (clubId) {
        GolfClub.goToInfo($location, clubId, $scope.search.params);
    };
}]);
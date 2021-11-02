"use strict";

angular.module("GolfClub").controller("HomeCtrl", ["$scope", "$http", "$location", function ($scope, $http, $location) {
    var COUNT_DAYS = 1, ENTER_CODE = 13;
    $scope.lt.page = $location.path();
    $scope.home = {
        clubs: null,
        offer: null,
        loadingData: true
    };
    function init() {
        GolfClub.stores.offerOfTheDay.load().done(function (data) {
            data.Price = Globalize.formatCurrency(parseInt(data.Price), "USD", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            $scope.home.offer = data;
            $scope.$apply();
        });

        GolfClub.stores.clubs.load({
            sort: [{ getter: "Rating", desc: true }],
            expand: ["City"],
            take: 5
        }).done(function (data) {
            $.each(data, function (index, value) {
                value.Price = Globalize.formatCurrency(parseInt(value.Price), "USD", { maximumFractionDigits: 0 });
            });
            $scope.home.clubs = data;
            $scope.home.loadingData = false;
            
            setTimeout(function() {
                $scope.$apply();
                $(".responsive-home").dxResponsiveBox("instance").repaint();
            }, 0);
        });
    }
    $scope.moreInfo = function () {
        $scope.goToInfo($scope.home.offer);
    };

    $scope.keyPressOnClub = function (keyEvent, club) {
        if (keyEvent.which === ENTER_CODE) {
            $scope.goToInfo(club);
        }
    };

    $scope.goToInfo = function (club) {
        var params = {
            cityId: club.CityId,
            startDate: GolfClub.getDate(new Date()),
            endDate: GolfClub.getDate(GolfClub.addDays(new Date(), COUNT_DAYS)),
            players: 2
        };
        GolfClub.goToInfo($location, club.Id, params);
    };
    init();
}]);
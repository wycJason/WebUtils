"use strict";

angular.module("GolfClub").controller("InfoCtrl", ["$scope", "$location", function ($scope, $location) {
    var params = $location.search();
    $scope.lt.page = $location.path();
    $scope.reservationData = [];
    $scope.resourcesData = [];
    $scope.info = {
        loadingData: true,
        currentDate: new Date(params.startDate),
        date: GolfClub.getDateForView(params)
    };
    $scope.club = null;
    $scope.position = { at: 'bottom', offset: '-116 175', of: '.green-button' };

    GolfClub.stores.clubs
        .byKey(parseInt(params.clubId), { expand: ["City", "Reservations"] })
        .done(function (data) {
            data.Price = Globalize.formatCurrency(parseInt(data.Price), "USD", { maximumFractionDigits: 0 });
            $scope.club = data;
            GolfClub.getDataForScheduler($scope, [data], params.startDate);
            $scope.info.loadingData = false;
            $(".responsive-info").dxResponsiveBox("instance").repaint();
            $scope.$apply();
        });
}]);

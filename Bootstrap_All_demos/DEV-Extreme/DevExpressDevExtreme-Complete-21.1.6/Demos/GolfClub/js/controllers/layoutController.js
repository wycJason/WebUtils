"use strict";

angular.module("GolfClub").controller("LayoutCtrl", ["$scope", "$location", function ($scope, $location) {
    var USER_NAME_KEY = "golfClubUser", ENTER_CODE = 13;

    $scope.currentDate = new Date();

    $scope.lt = {
        page: "",
        loginVisible: false,
        userName: "",
        loginValue: "",
        passwordValue: "",
        loginTitle: "",
        loginTemplate: ""
    };

    $scope.showLogin = function () {
        $scope.lt.loginVisible = !$scope.lt.loginVisible;
    };

    $scope.homePage = function () {
        $location.path("/home").search("");
    };

    $scope.showWelcome = function (params) {
        var result = $("#login-form").dxForm("instance").validate();
        if (result.isValid) {
            $scope.lt.userName = $scope.lt.loginValue;
            $scope.showLogin();
        }
    };

    $scope.logOut = function () {
        $scope.lt.userName = "";
        $scope.lt.loginValue = "";
        $scope.lt.passwordValue = "";
        window.deleteCookie(USER_NAME_KEY);
    };

    $scope.keyPressOnLogin = function (keyEvent) {
        if (keyEvent.which === ENTER_CODE) {
            $scope.showLogin();
        }
    };

    $scope.keyPressOnLogOut = function (keyEvent) {
        if (keyEvent.which === ENTER_CODE) {
            $scope.logOut();
        }
    };

    $scope.getScreen = function () {
        var width = window.innerWidth;

        if (width < 768)
            return "xs";
        else
            return "lg";
    };

    $scope.setResponsivenessOptions = function (e) {
        DevExpress.viewPort("body");
        DevExpress.devices.current({ platform: "generic" });
        if (DevExpress.devices.real().generic)
            $scope.pickerType = "calendar";
        else
            $scope.pickerType = "rollers";

        if (typeof e.value == "string")
            $scope.responsivenessOptions = GolfClub.setOptions(e.value);
    };

    var init = function () {
        var userName = GolfClub.getCookie(USER_NAME_KEY);
        if (userName)
            $scope.lt.userName = userName;
    };

    $scope.$watch("lt.userName", function (newValue) {
        if (newValue) {
            $scope.lt.loginTitle = "Authorized User";
            $scope.lt.loginTemplate = "logoutTemplate";
        } else {
            $scope.lt.loginTitle = "Login Form";
            $scope.lt.loginTemplate = "loginTemplate";
        }
        GolfClub.setCookie(USER_NAME_KEY, newValue);
        $scope.lt.loginVisible = false;
    });

    init();
}]);
"use strict";

angular.module("GolfClub", [
        "ngRoute",
        "GolfClub",
	    "dx"
])
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "partials/home.html",
                controller: "HomeCtrl"
            })
            .when("/search", {
                templateUrl: "partials/search.html",
                controller: "SearchCtrl"
            })
            .when("/info", {
                templateUrl: "partials/info.html",
                controller: "InfoCtrl"
            })
            .otherwise({ redirectTo: "/home" });
    }])
    .run(["$route", function ($route) {
        $route.reload();
    }]);
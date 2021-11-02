"use strict";

window.GolfClub = window.GolfClub || {};

GolfClub.getDate = function (date) {
    return Globalize.formatDate(new Date(date), { skeleton: "yMd" });
};

GolfClub.addDays = function (date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

GolfClub.getDateForView = function (date) {
    return Globalize.formatDate(new Date(date.startDate), { raw: "E dd" }) + " - " + Globalize.formatDate(new Date(date.endDate), { raw: "E dd, MMMM yyyy" });
};

GolfClub.getDataForScheduler = function (scope, data, currentDate) {
    var groups = [], reservations = [], resources = [], color = ["#bacb35", "#4aca94", "#49baca"], i = 0;
    data.forEach(function (club) {
        groups.push({
            text: club.Name,
            id: club.Id,
            color: color[i++]
        });
        club.Reservations.forEach(function (item) {
            var date = new Date(currentDate);
            reservations.push({
                clubId: item.ClubId,
                clubName: club.Name,
                startDate: new Date(date.setHours(item.Start, 0)),
                endDate: new Date(date.setHours(date.getHours() + item.Range, 0))
            });
        });
    });
    resources = [
        {
            field: "clubId",
            label: "Club",
            allowMultiple: false,
            dataSource: groups
        }
    ];
    scope.reservationData = reservations;
    scope.resourcesData = resources;
};

GolfClub.setOptions = function (value) {
    if (value == "xs") {
        return {
            largeScreen: false,
            showTitle: false,
            searchLabelLocation: "left",
            views: ["agenda"],
            currentView: "agenda",
            offset: "0 0",
            of: ""
        };
    } else {
        return {
            largeScreen: true,
            showTitle: true,
            searchLabelLocation: "top",
            views: ["day", "week", "workWeek"],
            currentView: "week",
            offset: "-116 195",
            of: ".green-button"
        };
    }
};

GolfClub.goToInfo = function ($location, clubId, params) {
    $location.path("/info").search({
        cityId: params.cityId,
        clubId: clubId,
        startDate: params.startDate,
        endDate: params.endDate,
        players: params.players
    });
};

GolfClub.setCookie = function (name, value) {
    var cookieValue = name + "=" + encodeURIComponent(value) + ";",
        cookiesFinishDate = new Date();
    cookiesFinishDate.setMonth(cookiesFinishDate.getMonth() + 1);
    cookieValue += "expires=" + cookiesFinishDate.toUTCString() + ";";
    cookieValue += "path=/";

    document.cookie = cookieValue;
};

GolfClub.getCookie = function (name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
    ));

    return matches ? decodeURIComponent(matches[1]) : undefined;
};

window.deleteCookie = function (name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
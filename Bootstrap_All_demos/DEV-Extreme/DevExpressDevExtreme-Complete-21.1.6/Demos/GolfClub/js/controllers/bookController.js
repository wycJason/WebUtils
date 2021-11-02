"use strict";

angular.module("GolfClub").controller("BookCtrl", ["$scope", "$http", "$location", function ($scope, $http, $location) {
    var params = $location.search(),
        oldAppointment = {},
        buttonClick = false,
        edit = false,
        MAX_NUMBER_OF_DAYS = 60,
        MAX_TIME_GAME = 2,
        MAX_START_TIME = 22,
        MIN_START_TIME = 6;

    $scope.appointmentData = {};
    $scope.minDate = setTime(new Date(), MIN_START_TIME);
    $scope.maxDate = GolfClub.addDays(new Date(), MAX_NUMBER_OF_DAYS);
    $scope.minTime = null;
    $scope.maxTime = null;

    $scope.book = {
        bookVisible: false
    };

    function validateBook() {
        return !$scope.$parent.reservationData.some(function (item) {
            if (item.clubId == $scope.appointmentData.clubId) {
                return (((item.startDate <= $scope.appointmentData.startDate) && ($scope.appointmentData.startDate < item.endDate))
                    || (($scope.appointmentData.endDate > item.startDate) && ($scope.appointmentData.endDate <= item.endDate)));
            } else {
                return false;
            }
        });
    }

    $scope.timeValidation = function (data) {
        if (buttonClick) {
            if ($scope.minTime > $scope.appointmentData.startDate || $scope.maxTime < $scope.appointmentData.startDate) {
                data.rule.message = "This time is unavailable. Opening hours 06:00 AM - 10:00 PM";
                return false;
            }else {
                var result = validateBook();
                data.rule.message = "This time is booked";
                return result;
            }
        } else {
            return true;
        }
    };

    $scope.$watch("appointmentData.startDate", function (newValue) {
        var date = new Date(newValue);
        $scope.minTime = setTime(date, MIN_START_TIME);
        $scope.maxTime = setTime(date, MAX_START_TIME);
        $scope.appointmentData.endDate = addTime($scope.appointmentData.startDate);
    });

    $scope.$watch("book.bookVisible", function (newValue) {
        if (!newValue) {
            $scope.appointmentData.startDate = null;
            $scope.appointmentData.endDate = null;
            edit = false;
        }
    });

    function setTime(date, time) {
        return new Date(date.setHours(time, 0, 0, 0));
    }

    function addTime(newValue) {
        var date = new Date(newValue);
        return new Date(date.setHours(date.getHours() + MAX_TIME_GAME));
    }

    function addAppointment(appointment) {
        $(".scheduler").dxScheduler("instance").addAppointment(appointment);
    }

    $scope.booking = function (params) {
        var form = $("#book-form").dxForm("instance");
        buttonClick = true;
        if (edit) {
            $scope.$parent.reservationData.splice($scope.$parent.reservationData.indexOf(oldAppointment), 1);
            if (form.validate().isValid) {
                addAppointment($scope.appointmentData);
                $scope.showBook();
            } else {
                addAppointment(oldAppointment);
            }
        }else {
            if (form.validate().isValid) {
                $scope.appointmentData.isNew = true;
                addAppointment($scope.appointmentData);
                $scope.showBook();
            }
        }
        buttonClick = false;
    };

    $scope.showBook = function (params) {
        $scope.book.bookVisible = !$scope.book.bookVisible;
    };

    $scope.popupBook = function () {
        var that = this;
        if (that.club) {
            var date = new Date(params.startDate);
            $scope.appointmentData.clubName = that.club.Name;
            $scope.appointmentData.clubId = that.club.Id;
            $scope.appointmentData.startDate = new Date(date.setHours(MIN_START_TIME, 0, 0, 0));
            $scope.appointmentData.players = parseInt(params.players);
            $scope.appointmentData.notes = "";
        }
        $scope.showBook();
    };

    $scope.editAppointment = function (e) {
        e.cancel = true;
        if (e.appointmentData.isNew) {
            var appointment = e.appointmentData;
            edit = true;
            oldAppointment = appointment;
            $scope.appointmentData.clubId = appointment.clubId;
            $scope.appointmentData.clubName = appointment.clubName;
            $scope.appointmentData.startDate = appointment.startDate;
            $scope.appointmentData.players = appointment.players;
            $scope.appointmentData.notes = appointment.notes;
            $scope.showBook();
        }
    };
}]);
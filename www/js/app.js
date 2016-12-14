var app = angular.module('app', ['ionic', 'app.services', 'ngStorage', 'angular.filter']);

var Format_FullDateWithTime = "MMM d, yyyy h:mm a";
var Format_FullDate = "MMM d, yyyy";
var Format_ShortDateWithTime = "MMM d h:mm a";
var Format_ShortDate = "MMM d";
var Format_Weekday = "EEEE";
var Format_WeekdayWithTime = "EEEE h:mm a";
var Format_Time = "h:mm a";
var Format_TimeWithPrefix = "'at' h:mm a";
var Format_SQLDate = "YYYY-MM-DD";
var Format_SQLTime = "HH:mm:ss";
var Format_SQLDateWithTime = "YYYY-MM-DD HH:mm:ss";

var no_internet_title = "No Internet Connection";
var no_internet_content = "Sorry, no Internet connectivity detected. Please reconnect and try again.";

app.run(function ($ionicPlatform, config, $state, $rootScope, $ionicPopup, Utils) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    //Add listener to network ONLINE/OFFLINE state
    document.addEventListener("online", deviceOnline, false);
    document.addEventListener("offline", deviceOffline, false);

    function deviceOnline() {// ONLINE;
        $rootScope.deviceStatus = navigator.connection.type;
        Utils.showPopup($rootScope.deviceStatus,"Network Status");
    }

    function deviceOffline() {// OFFLINE;
        $rootScope.deviceStatus = navigator.connection.type;
        Utils.showPopup(no_internet_content,no_internet_title);
    }

});
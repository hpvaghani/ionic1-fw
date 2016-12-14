app.factory('Utils', function ($localStorage, $ionicPopup) {
    var utils = {
        //Shows dialog with content and title
        showPopup: function (content, title) {
            title = typeof title !== 'undefined' ? title : 'Error';

            var alert = $ionicPopup.alert({
                title: title,
                template: content
            });

            return alert;
        },
        //initializes localstorage
        initStorage: function (name, a) {
            a = typeof a !== 'undefined' ? a : [];

            if (!$localStorage.hasOwnProperty(name)) {
                $localStorage[name] = a;
            }
        },
        //Shows error dialog with content and title
        errorPopup: function (msg, title) {
            msg = msg != 'null' ? msg : no_internet_title;

            if (utils.popupShown && utils.popupMessage == msg) {
                return;
            }

            utils.popupMessage = msg;
            utils.popupShown = true;

            return utils.showPopup(msg, title).then(function (res) {
                utils.popupShown = false;
            }).finally(function () {
                alert = undefined;
            });
        },
        //Shows no internet connection dialog
        showNoConnection: function () {
            this.errorPopup(no_internet_title);
        },
        //converts date into native format
        convertToNativeDate: function (date) {
            var dateL = date.split("-");
            return dateL[2] + "/" + dateL[1] + "/" + dateL[0];
        },
        //parse string into date format
        parseDateObject: function (datField) {
            var sepInd = datField.indexOf("T");
            var date = datField.substring(0, sepInd);
            var year = date[0];

            date = utils.convertToNativeDate(date);

            var short_date = date.substr(0, date.length - 4) + date.substr(date.length - 2, 2);

            var ob = {};
            var time = datField.substring(sepInd + 1, datField.length - 1);
            ob.date = date;
            ob.short_date = short_date;
            ob.time = time;
            ob.datetime = datField;

            return ob;
        }
    };
    utils.popupMessage = "";
    utils.popupShown = false;

    return utils;
});

// Loading spinner
app.factory('MultiLoading', function($ionicLoading) {
    //Loading indicator
    var loading = {
        opened: 0,
        show: function() {
            if (loading.opened > 0)
                return;
            $ionicLoading.show({
              noBackdrop :false,
              template: '<ion-spinner class="light"></ion-spinner>',
              duration :20000
          });
            loading.opened+=1;
        },
        hide: function() { 
            loading.opened = 0;
            $ionicLoading.hide();
        }
    };
    return loading;
});
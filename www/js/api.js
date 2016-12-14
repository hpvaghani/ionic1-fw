app.factory('Api', function ($http, $localStorage, $q, config, Utils, MultiLoading, $ionicHistory, $state, $rootScope, $timeout) {
    //Sends raw requests to the backend
    //Does some low level error handling
    var apiService = {
        loading: {},
        reloadData: false,
        reco: null,
        send: function (params, success, promise) {

            var url = params.url;

            var deferred = null;
            if (typeof (promise) != 'undefined' && promise != null)
                deferred = promise;
            else
                deferred = $q.defer();

            var type = null;
            if (params.hasOwnProperty('type')) {
                type = params['type'];
                if (apiService.loading.hasOwnProperty(type) && apiService.loading[type] == true) {
                    console.log('blocked, in progress ' + type);
                    deferred.reject('Please wait');
                    return deferred.promise;
                }
                apiService.loading[type] = true;
            }

            var post = params.hasOwnProperty('post') && params.post;
            var silent = params.hasOwnProperty('silent') && params.silent;

            var data = {};
            if (typeof (params.data) != 'undefined') {
                data = params.data;
            }

            //REQ TYPE
            var method = "GET";

            if (post) {
                method = "POST";
            }

            if (post == 'delete') {
                method = "DELETE";
                data = null;
            }

            if (!silent)
                MultiLoading.show();

            $http({
                method: method,
                url: config.backend_url + url,
                data: data,
                dataType: 'json',
                headers: {
                    "Content-Type": "application/json"
                }
            }).success(function (data) {//Success handling

                if (data.status != "success") {
                    // Utils.errorPopup(data.data);
                }

                if (type != null) apiService.loading[type] = false;

                if (typeof (success) != 'undefined') {
                    var result = success(data);
                    if (typeof result != 'undefined')
                        data = result;
                }

                deferred.resolve(data);

                if (!silent)
                    MultiLoading.hide();

            }).error(function (data, status) {//Error handling
                if (type != null) apiService.loading[type] = false;
                deferred.reject(data);
                if (!silent)
                    MultiLoading.hide();
                if (status == 401) {
                    MultiLoading.hide();
                    return;
                }

                // Utils.errorPopup(data);
            });

            return deferred.promise;
        }
    };
    return apiService;
});
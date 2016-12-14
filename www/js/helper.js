angular.module('app.services', [])

// JSON Parsing Methods -> toArray, toJSON
.factory('JSON_Parse',['$rootScope', '$http', '$q', 'config', function($rootScope, $http, $q, config){
    return{
        toArray: function(response){
            if(response && Object === response.constructor){
                console.log("Object");
                var arr = [];
                for(var x in response){
                    arr.push(response[x]);
                }
                return arr;
            }else{
                console.log("Other");
                return response;
            }
        },
        toJSON: function(response){
            if(response && Array === response.constructor){
                console.log("Array");
                return JSON.parse(JSON.stringify(response));
            }else{
                console.log("Other");
                return response;
            }
        }
    }
}]);

// ionichistory goback with number of views
app.service('goBackMany',function($ionicHistory){
    return function(depth){
        // get the right history stack based on the current view
        var historyId = $ionicHistory.currentHistoryId();
        var history = $ionicHistory.viewHistory().histories[historyId];
        // set the view 'depth' back in the stack as the back view
        var targetViewIndex = history.stack.length - 1 - depth;
        $ionicHistory.backView(history.stack[targetViewIndex]);
        // navigate to it
        $ionicHistory.goBack();
    }
});

// splits string with given character
app.filter('split', function() {
    return function(input, splitChar, splitIndex) {
        // do some bounds checking here to ensure it has that index
        return input.split(splitChar)[splitIndex];
    }
});

// joins string from given character
app.filter('join', function () {
    return function join(array, separator, prop) {
        if (!Array.isArray(array)) {
            return array; // if not array return original - can also throw error
        }

        return (!!prop ? array.map(function (item) {
            return item[prop];
        }) : array).join(separator);
    };
});

// Capitalizes first letter of given string
app.filter('capitalize', function() {
    return function(input) {
        if (Array.isArray(input)){
            return input.map(function(res){
                return res.charAt(0).toUpperCase() + res.substr(1).toLowerCase();
            })
        };
        if (!input)
            return '';
        var res = input.trim();    
        return res.charAt(0).toUpperCase() + res.substr(1).toLowerCase();
    }
});
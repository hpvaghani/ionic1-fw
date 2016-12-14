app.controller('homeCtrl', function ($rootScope, $state, $scope, MultiLoading, Utils, $localStorage, Api, $interval, JSON_Parse) {

    var data = {
        'review': 'hello this is very good shop.',
        'user_id': '1',
        'shop_id': '1'
    };

    var now = moment().add(1, 'day');

    // var onSuccess = function(e){
    //     $scope.img_url = e;  
    // };

    // var onError = function(e){
    //     console.log(e);
    // };

    // convertImgToBase64URL("https://www.google.co.in/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",onSuccess,onError);

    // $interval(function () {
    //     $scope.dateNow = createDateAsUTC(moment());
    // }, 1000);

    console.log(generateRandomString(5));

    // Api.send({post:true, url:'PutReviewsForShop', silent:false, data:data},function(response){//POST
    //     // console.log(response);
    // });            

    Api.send({ url: 'getAllCities', silent: false }, function (response) {//GET
        $scope.cities = response.data.city;
        console.log(JSON_Parse.toJSON(response.data.city));
    });

    $scope.consoleData = function (params) {
        Utils.showPopup(params.city_name, params.state_name);
        $state.go('demo');
    }

});
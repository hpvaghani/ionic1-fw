app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    /* PAGES & CONTROLLERS */
    $ionicConfigProvider.scrolling.jsScrolling(false);
    
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home/home.html',
            controller: 'homeCtrl'
        })

        .state('demo', {
            url: '/demo',
            templateUrl: 'templates/home/demo.html',
            controller: 'demoCtrl'
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');

});
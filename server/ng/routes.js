angular.module('app')
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');       // avoid  #%2F in location
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $routeProvider
           .when('/',
               {
                   controller: 'PostsCtrl',
                   templateUrl: 'posts.html'
               })
           .when('/register',
               {
                   controller: 'RegisterCtrl',
                   templateUrl: 'register.html'
               })
           .when('/login',
               {
                   controller: 'LoginCtrl',
                   templateUrl: 'login.html'
               })
    });

// ng-route is asynchronously loading templates to render the page
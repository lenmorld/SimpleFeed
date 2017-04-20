angular.module('app', [
    'ngRoute'
]);              // here, angular.module is a SETTER
angular.module('app')
    .controller('ApplicationCtrl', ["$scope", function ($scope) {
        $scope.$on('login', function (event, user) {        // LoginCtrl emit 'login'
            console.log(user);
            $scope.currentUser = user;
        });

        $scope.logout = function () {
            if ($scope.currentUser){
                delete $scope.currentUser;

                // TODO: remove JWT from requests
            }
        };
    }]);
angular.module('app')
    .controller('LoginCtrl', ["$scope", "UserSvc", function ($scope, UserSvc) {
        $scope.login = function (username, password) {
            UserSvc.login(username, password)
                .then(function (user) {
                    console.log(user);
                    // $rootScope broadcast currentUser - dispatches downwards
                    // http://stackoverflow.com/questions/26752030/rootscope-broadcast-vs-scope-emit
                    $scope.$emit('login', user.data);       // to be caught by parent ApplicationCtrl - dispatches upwards
                });
        }
    }]);

angular.module('app')               // here angular.module is a GETTER
.controller('PostsCtrl', ["$scope", "PostsSvc", function($scope, PostsSvc) {
    $scope.addPost = function () {
        if ($scope.postBody) {
            PostsSvc.create(
                {
                    username: 'lenmorld',
                    body: $scope.postBody
                })
                .then(function (post) {
                    // $scope.posts.unshift(post);     // if successfully POSTed to server, add to posts
                        // -> added to $scope.$on('ws:new_post') instead
                    $scope.postBody = null;
                    // must reload UI by fetching all items again
                    $scope.fetchAll();
                });
        }
    }
    $scope.fetchAll = function () {
        // call service GET and then handle the promise
        PostsSvc.fetch().then(function (posts) {
            console.log(posts);
            $scope.posts = posts.data;
        });
    };

    $scope.$on('ws:new_post', function (_, post) {
       $scope.$apply(function () {          // update UI
            $scope.posts.unshift(post);
       });
    });

    $scope.fetchAll();
}]);
angular.module('app')                       // here angular.module is a GETTER
.service('PostsSvc', ['$http', function ($http) {       // one reason the array is its minifier-compatible
                                                        // but not needed if we use gulp-ng-annotate
    console.error("sample error!");

    this.fetch = function() {
        return $http.get('/api/posts');     // return $http promise for loading posts
    };

    this.create = function (post) {
        return $http.post('/api/posts', post);
    }
}]);
angular.module('app')
    .controller('RegisterCtrl', ["$scope", "UserSvc", function ($scope, UserSvc) {
        $scope.register = function (username, password) {
            UserSvc.register(username, password)
                .then(function (user) {
                    $scope.$emit('login', user.data);
                })
        }
    }])
angular.module('app')
    .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
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
    }]);

// ng-route is asynchronously loading templates to render the page
angular.module('app')
    .service('UserSvc', ["$http", function ($http) {
        var svc = this;
        svc.getUser = function () {
          // return $http.get('/api/users', {
          //   headers: { 'X-Auth': this.token }
          // });
            return $http.get('/api/users')
                .then(function (response) {
                    return response;
                });
        }

        svc.login = function(username, password) {
            return $http.post('/api/sessions', {
               username: username, password: password
            }).then(function (response) {
                // console.log("login data: ", response);
                svc.token = response.data;
                $http.defaults.headers.common['X-Auth'] = response.data;   // attach header to all requests
                return svc.getUser();
            });
        }
        
        svc.register = function (username, password) {
            return $http.post('/api/users', {
                username: username, password: password
            }).then(function () {
                return svc.login(username, password);       // login directly after register successfull
            });
        }
    }]);


/* login process: 2 step
    1. POST /api/sessions to get JWT
    2. GET /api/users to get logged-in user's info

    instead of having the server send data back in login callback,
    it's a good idea to keep API requests simple to make them reusable
*/

angular.module('app')
    .run(["$rootScope", function ($rootScope) {
        var url = 'ws://localhost:3000';
        var connection = new WebSocket(url);

        connection.onopen = function () {
            console.log('WebSocket connected');
        }

        connection.onmessage = function (e) {
            console.log(e);
            var payload = JSON.parse(e.data);
            $rootScope.$broadcast('ws:' + payload.topic, payload.data);     // broadcast to all $scope
            // e.g. ws:new_post, avoids conflict with existing event name matching a topic
        }
    }]);
angular.module('app')
    .controller('LoginCtrl', function ($scope, UserSvc) {
        $scope.login = function (username, password) {
            UserSvc.login(username, password)
                .then(function (user) {
                    console.log(user);
                    // $rootScope broadcast currentUser - dispatches downwards
                    // http://stackoverflow.com/questions/26752030/rootscope-broadcast-vs-scope-emit
                    $scope.$emit('login', user.data);       // to be caught by parent ApplicationCtrl - dispatches upwards
                });
        }
    });

angular.module('app')
    .controller('ApplicationCtrl', function ($scope) {
        $scope.$on('login', function (event, user) {        // LoginCtrl emit 'login'
            console.log(user);
            $scope.currentUser = user;
        });
    });
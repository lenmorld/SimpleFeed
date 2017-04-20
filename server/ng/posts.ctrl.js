angular.module('app')               // here angular.module is a GETTER
.controller('PostsCtrl', function($scope, PostsSvc) {
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
});
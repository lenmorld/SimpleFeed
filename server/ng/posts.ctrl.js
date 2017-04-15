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
                    $scope.posts.unshift(post);     // if successfully POSTed to server, add to posts
                    $scope.postBody = null;
                    // must reload UI by fetching all todo items again
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

    $scope.fetchAll();
});
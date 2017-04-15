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
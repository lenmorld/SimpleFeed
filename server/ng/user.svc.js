angular.module('app')
    .service('UserSvc', function ($http) {
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
    });


/* login process: 2 step
    1. POST /api/sessions to get JWT
    2. GET /api/users to get logged-in user's info

    instead of having the server send data back in login callback,
    it's a good idea to keep API requests simple to make them reusable
*/

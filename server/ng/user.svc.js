angular.module('app')
    .service('UserSvc', function ($http) {
        var svc = this;
        svc.getUser = function () {
          return $http.get('/api/users', {
            headers: { 'X-Auth': this.token }
          });
        }

        svc.login = function(username, password) {
            return $http.post('/api/sessions', {
               username: username, password: password
            }).then(function (val) {
                svc.token = val.data;
                return svc.getUser();
            });
        }
    });


/* login process: 2 step
    1. POST /api/sessions to get JWT
    2. GET /api/users to get logged-in user's info

    instead of having the server send data back in login callback,
    it's a good idea to keep API requests simple to make them reusable
*/
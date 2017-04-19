/*
 USAGE:

 create user:
 curl -X POST -d'{"username": "tammy", "password": "1234"}' -H "Content-Type: application/json" localhost:3000/api/users

 auth user:
 curl -X POST -d'{"username": "lenny", "password": "pass"}' -H "Content-Type: application/json" localhost:3000/api/sessions

 get user, given auth:

 curl -H "X-Auth: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imxlbm55In0.FQ2wO_VT3Hbi9oUZyVaU9p6vhaBcqg7CQ__ohufWOTc"
    localhost:3000/api/users

 */

var router = require('express').Router();
var jwt = require('jwt-simple');
// var _ = require('lodash');
var bcrypt = require('bcrypt');
var User = require('../../models/user');       // MongoDB User model
var config = require('../../config');

router.post('/sessions', function (req, res, next) {
    // validate user
    // MONGODB - more secure
    User.findOne({username: req.body.username})
        .select('password')                // select password so we don't send it back
        // .select('username')
        .exec(function (err, user) {          // mongodb callback
            if(err) {return next(err); }
            if(!user) {return res.sendStatus(401); }   // unauthorized
            bcrypt.compare(req.body.password, user.password, function (err, valid) {    // compare password with saved hash password
                if (err) {return next(err); }
                if (!valid) {return res.sendStatus(401); }  // unauth
                var token = jwt.encode({username: user.username}, config.secret);
                // res.json(token);
                res.send(token);        // send it plain
            });
        });
});

module.exports = router;
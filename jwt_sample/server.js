/*
USAGE:

create user:
 curl -X POST -d'{"username": "tammy", "password": "1234"}' -H "Content-Type: application/json" localhost:3000/user

auth user:
 curl -X POST -d'{"username": "lenny", "password": "pass"}' -H "Content-Type: application/json" localhost:3000/session


 */

var express = require('express');
var jwt = require('jwt-simple');
var _ = require('lodash');      // better replacement to Underscore
var app = express();
var bcrypt = require('bcrypt');
var User = require('./user');       // MongoDB User model

app.use(require('body-parser').json());
// no need to define users array here, since we have it in the DB
var secretKey = 'supersecretkey';

app.post('/session', function (req, res, next) {
    // validate user
    // MONGODB - more secure
    User.findOne({username: req.body.username})
        .select('password')                 // select password so we don't send it back
        .exec(function (err, user) {          // mongodb callback
            if(err) {return next(err); }
            if(!user) {return res.send(401); }   // unauthorized
            bcrypt.compare(req.body.password, user.password, function (err, valid) {    // compare password with saved hash password
                if (err) {return next(err); }
                if (!valid) {return res.send(401); }  // unauth
                var token = jwt.encode({username: user.username}, secretKey);
                res.json(token);
            });
        });
});

app.get('/user', function (req, res) {
   var token = req.headers['x-auth'];
    var user = jwt.decode(token, secretKey);
    // pull user info from DB
    User.findOne({username: user.username}, function (err, user) {
       res.json(user);
    });
});

app.post('/user', function (req, res, next) {
    var user = new User({
        username: req.body.username
    });
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        user.password = hash;
        user.save(function (err, user) {
            if (err) { throw next(err); }
            res.send(201);
        });
    });
});

app.listen(3000);
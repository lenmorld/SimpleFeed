/*
 USAGE:

 create user:
 curl -X POST -d'{"username": "tammy", "password": "1234"}' -H "Content-Type: application/json" localhost:3000/user

 auth user:
 curl -X POST -d'{"username": "lenny", "password": "pass"}' -H "Content-Type: application/json" localhost:3000/session

 get user, given auth:

 curl -H "X-Auth: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imxlbm55In0.FQ2wO_VT3Hbi9oUZyVaU9p6vhaBcqg7CQ__ohufWOTc" localhost:3000/user

 */

var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt    = require('jwt-simple');
var User   = require('../../models/user');
var config = require('../../config');


// GET existing user
router.get('/users', function (req, res) {
    var token = req.headers['x-auth'];
    if (!token) {
        return res.sendStatus(401);
    }
    var user = jwt.decode(token, config.secret);
    // pull user info from DB
    User.findOne({username: user.username}, function (err, user) {
        if (err) { return next(err); }
        res.json(user);
    });
});


// POST new user
router.post('/users', function (req, res, next) {
    var user = new User({
        username: req.body.username
    });
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {return next(err);}
        user.password = hash;
        user.save(function (err, user) {
            if (err) { return next(err); }
            res.sendStatus(201);
        });
    });
});


module.exports = router;

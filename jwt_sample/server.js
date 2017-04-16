var express = require('express');
var jwt = require('jwt-simple');
var _ = require('lodash');      // better replacement to Underscore
var app = express();
var bcrypt = require('bcrypt');

var User = require('./user');       // MongoDB User model

app.use(require('body-parser').json());

// var users = [{username: 'lenny', password: 'pass'}];        // PASSWORD in plaintext!!!
var users = [{username: 'lenny', password:
    '$2a$10$NUJObMMED3reL3TuRFNXZ.DzETC2wfyX44Z9kTMo2subazLZ2nrZ2' }];

var secretKey = 'supersecretkey';

function findByUsername(username) {
    return _.find(users, {username: username});
}

function validateUser(user, password, cb) {
    // return user.password === password;
    // return bcrypt.compareSync(password, user.password);     // SYNC BLOCKING version
    bcrypt.compare(password, user.password, cb);            // ASYNC version with callback
}

app.post('/session', function (req, res, next) {

    // var user = findByUsername(req.body.username);

    // validate password

    // SYNC BLOCKING WAY
    // if (!validateUser(user, req.body.password)) {
    //     return res.send(401);           // unauthorized
    // }

    // ASYNC version with callback
    // validateUser(user, req.body.password, function (err, valid) {
    //     if (err || !valid)
    //     { return res.send(401);}
    //     var token = jwt.encode(
    //         {username: user.username}, secretKey
    //     );
    //     res.json(token);
    // });

    // MONGODB ==============
    // User.findOne({username: req.body.username},
    //     function (err, user) {          // mongodb callback
    //         if(err) {return next(err); }
    //         if(!user) {return res.send(401); }   // unauthorized
    //         bcrypt.compare(req.body.password, user.password, function (err, valid) {    // compare password with saved hash password
    //             if (err) {return next(err); }
    //             if (!valid) {return res.send(401); }  // unauth
    //             var token = jwt.encode({username: user.username}, secretKey);
    //             res.json(token);
    //         });
    //     });

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
    //=======================
});

app.get('/user', function (req, res) {
   var token = req.headers['x-auth'];
    var user = jwt.decode(token, secretKey);
    // pull user info from DB
    User.findOne({username: user.username}, function (err, user) {
       res.json(user);
    });
    res.json(user);
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
var express = require('express');
var jwt = require('jwt-simple');
var _ = require('lodash');      // better replacement to Underscore
var app = express();
app.use(require('body-parser').json());

var users = [{username: 'lenny', password: 'pass'}];
var secretKey = 'supersecretkey';

function findByUsername(username) {
    return _.find(users, {username: username});
}

function validateUser(user, password) {
    return user.password === password;
}

app.post('/session', function (req, res) {
    // var username = req.body.username;
    // TODO: validate password
    var user = findByUsername(req.body.username);
    if (!validateUser(user, req.body.password)) {
        return res.send(401);           // unauthorized
    }

    var token = jwt.encode(
        {username: user.username}, secretKey
    );
    res.json(token);
});

app.get('/user', function (req, res) {
   var token = req.headers['x-auth'];
    var user = jwt.decode(token, secretKey);
    // TODO: pull user info from DB
    res.json(user);
});

app.listen(3000);
// middleware wttaches an auth object to requests that can be used to look up current user's info
// this prevents the client from sending username, and getting it from the JWT

var jwt = require('jwt-simple')
var config = require('./config')

module.exports = function (req, res, next) {
    if (req.headers['x-auth']) {
        req.auth = jwt.decode(req.headers['x-auth'], config.secret);
    }
    next();
}
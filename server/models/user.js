var db = require('../db');

var user = db.Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true, select: false}         // select: false -> prevent sending password hash to client
    }
);

module.exports = db.model('User', user);
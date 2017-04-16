var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/auth_demo');

var user = mongoose.Schema(
    {
        username: String,
        password: {type: String, select: false}     // prevent sending password hash
        // password: String
    }
);

module.exports = mongoose.model('User', user);
var express = require('express');
var router = express.Router();
// var path = require('path');

// use express.static to serve static files HTML, CSS, JS

router.use(express.static(__dirname + '/../assets'));               // with this, we can reference app.js_old directly in app.html.ejs
router.use(express.static(__dirname + '/../templates'));            // let Express serve templates/ folder
router.get('/', function (req, res) {
    // res.sendfile('./views/app.html.ejs');       // deprecated
    // res.sendFile(path.join(__dirname, '../views', 'app.html.ejs'));      // sendFile has security restrictions on relative paths
    res.render('app.html.ejs');
});

module.exports = router;
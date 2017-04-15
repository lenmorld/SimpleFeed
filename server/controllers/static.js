var express = require('express');
var router = express.Router();
// var path = require('path');

// use express.static to serve static files HTML, CSS< JS
router.use(express.static(__dirname + '/../assets'));               // with this, we can reference app.js_old directly in index.ejs

router.get('/', function (req, res) {
    // res.sendfile('./views/index.ejs');       // deprecated
    // res.sendFile(path.join(__dirname, '../views', 'index.ejs'));      // sendFile has security restrictions on relative paths
    res.render('index.ejs');
});

module.exports = router;
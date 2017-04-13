var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

/*
var Post = require('./models/post');

GET '/api/posts'
POST '/api/posts'
moved to controllers/api/posts.js
 */

// app.use(require('./controllers/api/posts'));
app.use(require('./controllers'));              // better to include whole folder

// this delivers the Angular app ===================
// app.get('/', function (req, res) {
//     // res.sendfile('./views/index.ejs');       // deprecated
//     res.sendFile(path.join(__dirname, './views', 'index.ejs'))
// });
// moved to controllers/static.js
// app.use(require('./controllers/static'))
//===================================================

app.listen(3000, function() {
    console.log('Server listening on: ', 3000);
});
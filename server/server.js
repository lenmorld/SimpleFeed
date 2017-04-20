var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.use(require('./auth'));     // middleware that attaches auth object, to be used by entire app

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
//     // res.sendfile('./views/app.html.ejs');       // deprecated
//     res.sendFile(path.join(__dirname, './views', 'app.html.ejs'))
// });
// moved to controllers/static.js
// app.use(require('./controllers/static'))
//===================================================

// more API routes
// app.use('/api/sessions', require('./controllers/api/sessions'));
// app.use('/api/users', require('./controller/api/users'));
// -> we don't need this since we exported the whole folder
//    as a result, sessions.js must use full route '/api/sessions'
//    i.e. if we use /api/sessions/ here, sessions.js will use '/'


app.listen(3000, function() {
    console.log('Server listening on: ', 3000);
});
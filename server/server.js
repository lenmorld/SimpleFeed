var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Post = require('./models/post');

var app = express();
app.use(bodyParser.json());


app.get('/', function (req, res) {
    // res.sendfile('./layouts/index.html');       // deprecated
    res.sendFile(path.join(__dirname, './layouts', 'index.html'));

});

app.get('/api/posts', function (req, res, next) {
    Post.find()
        .sort('-date')                      // chaining query with filter methods, here sort by date
        .exec(function (err, posts) {
            if(err) {return next(err); }
            res.json(posts);
        })
});

app.post('/api/posts', function (req, res, next) {
    var post = new Post({
        username: req.body.username,
        body: req.body.body
    });
    post.save(function (err, post) {
        if(err) {return next(err); }
        res.json(201, post);                // status 201: created
    });
});

app.listen(3000, function() {
    console.log('Server listening on: ', 3000);
});
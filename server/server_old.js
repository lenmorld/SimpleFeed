var express = require('express');
var bodyParser = require('body-parser');
var Post = require('./models/post');

var app = express();
app.use(bodyParser.json());

app.get('/api/posts', function (req, res, next) {
    Post.find(function (err, posts) {
        if(err) {return next(err); }
        res.json(posts);
    });

    // HARD-CODED
    // res.json([
    //     {
    //         username: 'lenmorld',
    //         body: 'I rock!'
    //     }
    // ]);
});



app.post('/api/posts', function (req, res, next) {
    // console.log('post received!');
    // console.log(req.body.username);
    // console.log(req.body.body);
    // res.send(201);

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
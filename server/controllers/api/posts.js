// after moving this code from server.js, we need reference to app object
// app.get(...) and app.post(...)
// solution: wrap whole code into function that expects an app argument
//          module.exports = function(app) {put get and post code here}
//          and call it from server.js: require('this file')(app)
// solution2: Express offers a clean silution through Router object
//          Router object acts like an app object, then use it like middleware
//          attach to app in server.js using app.use()
//          server.js:  app.use(require('./controllers/api/posts'))
//          advantages: use middleware on only the API, prevent indenting all code inside a function def

//          another possibility since the API path is common:
//          app.use('/api/posts', require..)
//          then:       router.get('/', function..), router.post('/', function..)

var router = require('express').Router();
var Post = require('../../models/post');


// router.get('/api/posts', function (req, res, next) {
    // since we are now inside api folder
router.get('/posts', function (req, res, next) {
    Post.find()
        .sort('-date')                      // chaining query with filter methods, here sort by date
        .exec(function (err, posts) {
            if(err) {return next(err); }
            res.json(posts);
        })
});

// router.post('/api/posts', function (req, res, next) {
router.post('/posts', function (req, res, next) {
    var post = new Post({
        username: req.body.username,
        body: req.body.body
    });
    post.save(function (err, post) {
        if(err) {return next(err); }
        res.json(201, post);                // status 201: created
    });
});

module.exports = router;
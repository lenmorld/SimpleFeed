var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('dev:server', function () {
    nodemon(
        {
            script: 'server.js',
            ext: 'js',
            ignore: ['ng*', 'gulp*', 'assets*']         // exclude Non-node files
        }
    )
});

//run gulp dev:server to boot app

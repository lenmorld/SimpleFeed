var gulp = require('gulp');
var fs = require('fs');

// moved to gulp\scripts.js

fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
   require('./gulp/' + task);
});
// no need to add a new require() every time creating a new Gulp file in gulp/
// gets all gulp tasks in gulp/*

// runs $ gulp js, $ gulp css
gulp.task('build', ['js', 'css']);      // $ gulp build

// runs watch on css and js changes
gulp.task('watch', ['watch:css', 'watch:js']);      // $ gulp watch

// gulp task that runs everything that needs to run while working on the application
gulp.task('dev', ['watch', 'dev:server']);          // $ gulp dev

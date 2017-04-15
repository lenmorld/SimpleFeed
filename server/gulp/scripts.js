var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

// gulp.task('js', function () {
//     gulp.src('ng/**/*.js')
//         .pipe(concat('app.js_old'))
//         .pipe(gulp.dest('assets'))
// });

gulp.task('js', function () {
    return gulp.src(['ng/module.js', 'ng/**/*.js'])          // make sure module SETTER is first
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets'))
});

// $ gulp js
//  --> after running /ng/app.js will copy to /assets/app.js


// rerun 'gulp js' everytime one of the Angular files changes
gulp.task('watch:js', ['js'], function () {     // adding 'js' as dependency runs it first time watch:js is called
    gulp.watch('ng/**/*.js', ['js']);           // filepath, array of tasks
});

// $ gulp watch:js 
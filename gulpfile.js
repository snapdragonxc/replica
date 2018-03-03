var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
//
gulp.task('app-js', function(){
   gulp.src('src/scripts/app/*.js')
   .pipe(concat('app.js'))
   .pipe(uglify())
   .pipe(gulp.dest('www/scripts/'));
});
//
gulp.task('pages-js', function(){
   gulp.src('src/scripts/pages/*.js')
   .pipe(concat('pages.js'))
   .pipe(uglify())
   .pipe(gulp.dest('www/scripts/'));
});
//
gulp.task('css', function(){
   gulp.src('src/styles/*.css')
   .pipe(concat('styles.css'))
   .pipe(minify())
   .pipe(gulp.dest('www/styles/'));
});
//
gulp.task('default',['app-js','pages-js','css'],function(){
});

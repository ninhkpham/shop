var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
gulp.task('sass', function(){
  return gulp.src('my_scss/**/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('my_css'))
});
gulp.task('uglify', function () {
    return gulp.src('my_js/*.js')
        .pipe(concat('myScript.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('myScript.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
gulp.task('watch',function(){
    gulp.watch('scss/**/*.scss',['sass']);
    gulp.watch('my_js/*.js', ['uglify']);
});



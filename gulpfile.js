var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function() {
  gulp.src('public/sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 version', 'safari 5', 'ie 10', 'opera 12.1', 'ios 8', 'android 4'],
        cascade: false
      }))
      .pipe(cleanCSS())
      .pipe(gulp.dest('public/css/'));
});

//Watch task
gulp.task('default',function() {
  gulp.watch('public/sass/**/*.scss',['styles']);
});
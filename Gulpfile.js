'use strict';

var gulp = require('gulp');

var ext = function(ext) { return gulp.src('./public/**/*.' + ext); };
var save = function() { return gulp.dest('./public'); };

gulp.task('default', function(cb) {
  var sequence = require('run-sequence');

  sequence('copy',
          ['html', 'js', 'css'],
          cb);
});

gulp.task('copy', function() {
  return gulp.src('./client/**/*')
    .pipe(save());
});

gulp.task('slm', function() {
  var slm = require('gulp-slm');

  return ext('slm')
    .pipe(slm())
    .pipe(save());
});

gulp.task('stylus', function() {
  var stylus = require('gulp-stylus');

  return ext('styl')
    .pipe(stylus())
    .pipe(save());
});

gulp.task('html', ['slm']);

gulp.task('js');

gulp.task('css', ['stylus'], function() {
  var prefix = require('gulp-autoprefixer');

  return ext('css')
    .pipe(prefix())
    .pipe(save());
});

gulp.task('clean', function() {
  var rm = require('gulp-rimraf');

  return gulp.src('./public', { read: false })
    .pipe(rm());
});

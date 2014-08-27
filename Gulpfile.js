'use strict';

var gulp = require('gulp');

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

gulp.task('html');

gulp.task('js');

gulp.task('css');

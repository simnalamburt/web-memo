'use strict';

var gulp = require('gulp');


//
// src.html()   : gulp.src('./client/**/*.html')
// src.js()     : gulp.src('./client/**/*.js')
// src.css()    : gulp.src('./client/**/*.css')
// src._()      : gulp.src(['./client/**/*.*', '!./client/**/*.html', ...])
// src.DIR()    : gulp.src('./client', { read: false })
//
// build.html() : gulp.src('./public/**/*.html')
// build.js()   : gulp.src('./public/**/*.js')
//    et cetera
//
// save()       : gulp.dest('./public')
//
var src = {}, build = {};
[ { obj: src,   path: './client' }
, { obj: build, path: './public' }
].forEach( function(i) {
  var used = [];
  [ 'html', 'slm', 'js', 'ls', 'css', 'styl'  // Actally used
  , 'txt', 'md', 'json'                       // Blacklist
  ].forEach( function(ext) {
    var url = i.path + '/**/*.' + ext;
    i.obj[ext] = function() { return gulp.src(url); };
    used.push('!' + url);
  });
  i.obj._ = function() { return gulp.src([i.path + '/**/*.*'].concat(used)); };
  i.obj.DIR = function() { return gulp.src(i.path, { read: false }); };
});

function save() { return gulp.dest('./public'); };


// 1. gulp
gulp.task('default', ['markup', 'script', 'stylesheet', 'etc']);

// HTML
gulp.task('html', function() {
  return src.html()
    .pipe(save());
});

gulp.task('slm', function() {
  var slm = require('gulp-slm');

  return src.slm()
    .pipe(slm())
    .pipe(save());
});

gulp.task('markup', ['html', 'slm']);

// Javascript
gulp.task('js', function() {
  return src.js()
    .pipe(save());
});

gulp.task('ls', function() {
  var ls = require('gulp-livescript');

  return src.ls()
    .pipe(ls())
    .pipe(save());
});

gulp.task('script', ['js', 'ls']);

// CSS
gulp.task('css', function() {
  var prefix = require('gulp-autoprefixer');

  return src.css()
    .pipe(prefix())
    .pipe(save());
});

gulp.task('styl', function() {
  var styl = require('gulp-stylus');
  var prefix = require('gulp-autoprefixer');

  return src.styl()
    .pipe(styl())
    .pipe(prefix())
    .pipe(save());
});

gulp.task('stylesheet', ['css', 'styl']);

// etc
gulp.task('etc', function() {
  return src._()
    .pipe(save());
});


// 2. gulp clean
gulp.task('clean', function() {
  var rm = require('gulp-rimraf');

  return build.DIR()
    .pipe(rm());
});

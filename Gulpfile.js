'use strict';

var gulp = require('gulp');


//
// path.html    : './client/**/*.html'
// path.slm     : './client/**/*.slm'
// path.js      : './client/**/*.js'
// path.ls      : './client/**/*.ls'
// path.css     : './client/**/*.css'
// path.styl    : './client/**/*.styl'
// path._       : ['./client/**/*.*', '!./client/**/*.html', ...]
// path.DIR     : './client'
//
// result.html  : './public/**/*.html'
// result.slm   : './public/**/*.slm'
//   et cetera
//
// src.html()   : gulp.src('./client/**/*.html')
// src.slm()    : gulp.src('./client/**/*.slm')
// src._()      : gulp.src(['./client/**/*.*', '!./client/**/*.html', ...])
// src.DIR()    : gulp.src('./client', { read: false })
//
// build.html() : gulp.src('./public/**/*.html')
// build.slm()  : gulp.src('./public/**/*.slm')
//   et cetera
//
// save()       : gulp.dest('./public')
//
var path = {}, result = {}, src = {}, build = {};
[ { dict: path,   helper: src,   path: './client' }
, { dict: result, helper: build, path: './public' }
].forEach( function(i) {
  function def(key, glob, options) {
    i.dict[key] = glob;
    i.helper[key] = function() { return gulp.src(glob, options); };
    return glob;
  }

  var used = [];
  [ 'html', 'slm', 'js', 'ls', 'css', 'styl'  // Actally used
  , 'txt', 'md', 'json'                       // Blacklist
  ].forEach( function(ext) {
    var url = i.path + '/**/*.' + ext
    def(ext, url);
    used.push('!' + url);
  });
  def('_', [i.path + '/**/*.*'].concat(used));
  def('DIR', i.path, { read: false });
});

function save() { return gulp.dest('./public'); };


// 1. gulp
// 2. gulp watch
var tasks = ['html', 'slm', 'js', 'ls', 'css', 'styl', '_'];
gulp.task('default', tasks);
gulp.task('watch', tasks, function(cb) {
  tasks.forEach( function(task) {
    gulp.watch(path[task], [task]);
  });
  cb();
});

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

// etc
gulp.task('_', function() {
  return src._()
    .pipe(save());
});


// 3. gulp clean
gulp.task('clean', function() {
  var rm = require('gulp-rimraf');

  return build.DIR()
    .pipe(rm());
});

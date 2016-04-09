'use strict';

var config = require('../config');
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('styles', function() {
  return gulp.src(config.APP_SRC_LESS_FILE)
        .pipe(less().on('error', function(err) {
          console.log(err);
        }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest(config.APP_DIST_CSS))
        .pipe(reload({stream: true}));
});

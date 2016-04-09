'use strict';

var config = require('../config');
var gulp   = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('copy-image', function() {
  return gulp.src([
      config.APP_SRC_IMG + '/**/*'
  ])
  .pipe(gulp.dest(config.APP_DIST_IMG))
  .pipe(reload({stream: true}));
});

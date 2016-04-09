'use strict';

var config      = require('../config');

var gulp        = require('gulp');
var path        = require('path');
var browserSync = require('browser-sync');
var watch       = require('gulp-watch');
var runSequence = require('run-sequence');

var css = path.join(config.APP_SRC_CSS,'**/*.less');
var templates = path.join(config.APP_SRC_TEMPLATES, '**/*.html');
var images = path.join(config.APP_SRC_IMG, '**/*');

gulp.task('browser-sync', function() {
  browserSync({
    server: path.join('./', config._DIST),
    port: config.DEV_PORT
  });

  gulp.watch(css, ['styles']);
  gulp.watch(templates, function() {
    runSequence(
      'nunjucks',
      'preprocess-dev'
    );
  });
  gulp.watch(images, ['copy-image']);
});

'use strict';

var config = require('../config');
var gulp = require('gulp');
var path = require('path');
var watch = require('gulp-watch');

gulp.task('watch-dev', function() {
  gulp.watch(config.APP_SRC_LESS + '**/*.less', ['styles', 'bs-reload']);
  gulp.watch(config.APP_SRC_TEMPLATES + '**/*.html', ['nunjucks', 'preprocess-dev', 'bs-reload']);
  gulp.watch(config.APP_SRC_IMG + '**/*', ['copy-image', 'bs-reload']);
});

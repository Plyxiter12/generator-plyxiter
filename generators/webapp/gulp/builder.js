'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function() {
  runSequence(
      'clean-dist',
      'copy-image',
      ['styles', 'nunjucks'],
      ['build-app', 'build-vendor'],
      'preprocess-dev',
      'browser-sync'
  );
});

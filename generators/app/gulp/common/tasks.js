'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', function(cb) {
  runSequence(
      'build',
      cb
  );
});

gulp.task('deploy', function(cb) {
  runSequence(
      cb
  );
});

gulp.task('prod', function(cb) {
  runSequence(
      'clean-prod',
      'min-all',
      'rev',
      'prod-server',
      cb
  );
});

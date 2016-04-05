'use strict';

var browserSync = require('browser-sync');
var config      = require('../config');
var gulp        = require('gulp');

gulp.task('browserSync', function() {
  return browserSync({
    open: false,
    port: config.DEV_PORT_START,
    // the proxy handles the static files in the APP_DIST
    // directory - they are bundled by gulp
    // also handles proxying REST data against apiary.io
    // proxying into the various environments for real data
    // could also handle serving locally but this is not
    // set up yet
    // proxy: config.DEV_HOST + ':' + config.DEV_EXPRESS_PORT
  });
});

// Reload all Browsers
gulp.task('bs-reload', function() {
  browserSync.reload();
});

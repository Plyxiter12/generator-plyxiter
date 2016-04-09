'use strict';

var compress = require('compression');
var config = require('../config');
var express = require('express');
var gulp = require('gulp');
var gutil = require('gulp-util');
var logger = require('morgan');
var openLink = require('open');

var settings = {

  staticOptions: {
    extensions: ['html'],
    maxAge: '31556926'
  }
};

gulp.task('prod-server', function() {
  var url = config.PROD_HOST + config.PROD_PORT;

  express()
    .use(compress())
    .use(logger('tiny'))
    .use('/', express.static(config.APP_CDN, settings.staticOptions))
    .listen(config.PROD_PORT);
  gutil.log(gutil.colors.green('***************************'));
  gutil.log(gutil.colors.green('Production Server: ' + url));
  gutil.log(gutil.colors.green('***************************'));

  openLink(url);
});

var compress = require('compression');
var config = require('../config');
var express = require('express');
var gulp = require('gulp');
var gutil = require('gulp-util');
var logger = require('morgan');
var open = require('open');
var path = require('path');

var settings = {
  devRoot: path.resolve(process.cwd(), config.APP_DIST),
  distRoot: path.resolve(process.cwd(), config.APP_PROD),

  staticOptions: {
    extensions: ['html'],
    maxAge: '31556926'
  }
};

gulp.task('dev-server', function() {
  var url = config.DEV_HOST + config.DEV_PORT;

  express()
    .use(compress())
    .use(logger('dev'))
    .use('/', express.static(settings.devRoot, settings.staticOptions))
    .listen(config.DEV_PORT);

  gutil.log('\n* * * * * * * * * * * * * * * * *');
  gutil.log(gutil.colors.green('Development Server: ' + url));
  gutil.log('* * * * * * * * * * * * * * * * *\n');

  open(url);
});

gulp.task('dist-server', function() {
  var url = config.DIST_HOST + config.DIST_PORT;

  express()
    .use(compress())
    .use(logger('tiny'))
    .use('/', express.static(settings.distRoot, settings.staticOptions))
    .listen(config.DIST_PORT);

  gutil.log('\n* * * * * * * * * * * * * * * * *');
  gutil.log(gutil.colors.green('Distribution Server: ' + url));
  gutil.log('* * * * * * * * * * * * * * * * *\n');

  open(url);
});

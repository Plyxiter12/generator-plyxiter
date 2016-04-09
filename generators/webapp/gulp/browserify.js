'use strict';

var config = require('../config');
var _ = require('lodash');
var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
// var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var nodeResolve = require('resolve');

var customOpts = {
  app: {
    entries: [config.APP_SRC_JS_FILE],
    debug: true
  }
};

var appOpts = assign({}, watchify.args, customOpts.app);
var b = watchify(browserify(appOpts));

function getNPMPackageIds() {
  // read package.json and get dependencies' package ids
  var packageManifest = {};
  try {
    packageManifest = require('./package.json');
  } catch (e) {
    // does not have a package.json manifest
  }
  return _.keys(packageManifest.dependencies) || [];

}

function bundleVendor() {

  var bv = browserify({});

  getNPMPackageIds().forEach(function(id) {
      bv.require(nodeResolve.sync(id), {expose: id});
    });

  var stream = bv
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(config.VENDOR_BUILT_FILE));

  // pipe additional tasks here (for eg: minifying / uglifying, etc)
  // remember to turn off name-mangling if needed when uglifying

  stream.pipe(gulp.dest(config.APP_DIST_JS));

  return stream;
}

function bundleApp() {

  // do the similar thing, but for npm-managed modules.
  // resolve path using 'resolve' module
  getNPMPackageIds().forEach(function(id) {
    b.external(id);
  });

  b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(config.JS_BUILT_FILE))
    // .pipe(sourcemaps.init()) // loads map from browserify file
    //    // Add transformation tasks to the pipeline here.
    // .pipe(sourcemaps.write('./')) // writes .map file
    // Add transformation tasks to the pipeline here.
    .pipe(gulp.dest(config.APP_DIST_JS));
}

//build vendor
gulp.task('build-vendor', bundleVendor);

//build app
b.on('update', bundleApp); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal
gulp.task('build-app', bundleApp);

gulp.task('browserify', ['build-app', 'build-vendor']);

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
var bowerResolve = require('bower-resolve');
var nodeResolve = require('resolve');

var customOpts = {
  vendor: {
    entries: [],
    debug: true
  },
  app: {
    entries: [config.APP_SRC_JS_FILE],
    debug: true
  }
};

var vendorOpts = assign({}, watchify.args, customOpts.vendor);
var bv = watchify(browserify(vendorOpts));

var appOpts = assign({}, watchify.args, customOpts.app);
var b = watchify(browserify(appOpts));


function getBowerPackageIds() {
  // read bower.json and get dependencies' package ids
  var bowerManifest = {};
  try {
    bowerManifest = require('./bower.json');
  } catch (e) {
    // does not have a bower.json manifest
  }
  return _.keys(bowerManifest.dependencies) || [];

}

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

  getBowerPackageIds().forEach(function(id) {

    var resolvedPath = bowerResolve.fastReadSync(id);

    bv.require(resolvedPath, {
      expose: id
    });
  });

  getNPMPackageIds().forEach(function(id) {
    bv.require(nodeResolve.sync(id), {
      expose: id
    });
  });

  bv.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(config.VENDOR_FILE))
    // .pipe(sourcemaps.init()) // loads map from browserify file
    //    // Add transformation tasks to the pipeline here.
    // .pipe(sourcemaps.write('./')) // writes .map file
    // Add transformation tasks to the pipeline here.
    .pipe(gulp.dest(config.APP_DIST_JS));
}

function bundleApp() {

  // mark vendor libraries defined in bower.json as an external library,
  // so that it does not get bundled with app.js.
  // instead, we will load vendor libraries from vendor.js bundle
  getBowerPackageIds().forEach(function(lib) {
    b.external(lib);
  });

  // do the similar thing, but for npm-managed modules.
  // resolve path using 'resolve' module
  getNPMPackageIds().forEach(function(id) {
    b.external(id);
  });

  b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(config.BUILT_JS_FILE))
    // .pipe(sourcemaps.init()) // loads map from browserify file
    //    // Add transformation tasks to the pipeline here.
    // .pipe(sourcemaps.write('./')) // writes .map file
    // Add transformation tasks to the pipeline here.
    .pipe(gulp.dest(config.APP_DIST_JS));
}


//build vendor
bv.on('update', bundleVendor); // on any dep update, runs the bundler
bv.on('log', gutil.log); // output build logs to terminal
gulp.task('build-vendor', bundleVendor);

//build app
b.on('update', bundleApp); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal
gulp.task('build-app', bundleApp);

gulp.task('browserify', ['build-app', 'build-vendor']);

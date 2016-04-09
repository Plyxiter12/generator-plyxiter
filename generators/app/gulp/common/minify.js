'use strict';

var config      = require('../config');
var gulp        = require('gulp');
var cssnano     = require('gulp-cssnano');
var htmlmin     = require('gulp-htmlmin');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var changed     = require('gulp-changed');
var imagemin    = require('gulp-imagemin');
var runSequence = require('run-sequence');

gulp.task('min-app', function() {
  return gulp.src(config.APP_DIST_JS_FILE)
    .pipe(uglify())
    .pipe(rename(config.JS_MIN_FILE))
    .pipe(gulp.dest(config.APP_PROD_JS));
});

gulp.task('min-vendor', function() {
  return gulp.src(config.APP_DIST_VENDOR_FILE)
    .pipe(uglify())
    .pipe(rename(config.VENDOR_MIN_FILE))
    .pipe(gulp.dest(config.APP_PROD_JS));
});

gulp.task('min-css', function() {
  return gulp.src(config.APP_DIST_CSS_FILE)
    .pipe(cssnano())
    .pipe(rename(config.CSS_MIN_FILE))
    .pipe(gulp.dest(config.APP_PROD_CSS));
});

gulp.task('min-html', ['preprocess-prod'], function() {
  return gulp.src(config.APP_PROD_INDEX_FILE)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(config.APP_PROD));
});

gulp.task('min-img', function() {
  return gulp.src(config.APP_DIST_IMG + '*')
      .pipe(changed(config.APP_DIST_IMG))
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
      }))
      .pipe(gulp.dest(config.APP_PROD_IMG));
});

gulp.task('min-js', ['min-app', 'min-vendor']);

gulp.task('min-all', function(cb) {
  runSequence(
    'min-css',
    'min-js',
    'min-img',
    'min-html',
    cb
  );
});

var config = require('../../config.js');
var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('rev-app', function() {
  return gulp.src(config.APP_DIST_JS_FILE)
    .pipe(rev())
    .pipe(uglify())
    .pipe(gulp.dest(config.APP_PROD_JS));
});

gulp.task('rev-vendor', function() {
  return gulp.src(config.APP_DIST_VENDOR_FILE)
    .pipe(uglify())
    .pipe(gulp.dest(config.APP_PROD_JS));
});

gulp.task('rev-js', ['rev-app', 'rev-vendor']);

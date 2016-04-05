var config = require('../../config.js');
var gulp = require('gulp');
var rev = require('gulp-rev');
var napkin = require('gulp-rev-napkin');
var htmlmin = require('gulp-htmlmin');

gulp.task('rev-html', function() {
  return gulp.src(config.APP_DIST_INDEX_FILE)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(config.APP_PROD));
});

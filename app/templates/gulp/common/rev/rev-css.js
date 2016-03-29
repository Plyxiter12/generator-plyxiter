var config    = require('../../config');
var gulp      = require('gulp');
var cssnano   = require('gulp-cssnano');
var path      = require('path');
var rev       = require('gulp-rev');
var revNapkin = require('gulp-rev-napkin');

// 4) Rev and compress CSS and JS files (this is done after assets, so that if a
//    referenced asset hash changes, the parent hash will change as well
gulp.task('rev-css', function(){
  return gulp.src(config.APP_DIST_CSS_FILE)
    .pipe(rev())
    .pipe(cssnano())
    .pipe(gulp.dest(config.APP_PROD_CSS))
    .pipe(revNapkin({verbose: false}))
    .pipe(rev.manifest(path.join(config.APP_PROD, 'css-rev-manifest.json'), {merge: true}))
    .pipe(gulp.dest(config.APP_PROD));
});

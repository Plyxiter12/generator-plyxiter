// Copy tasks

var config = require('../config');
var gulp   = require('gulp');

gulp.task('copy-image', function() {
    return gulp.src([
        config.APP_SRC_IMG + '/**/*'
    ]).pipe(gulp.dest(config.APP_DIST_IMG));
});

gulp.task('copy-prod', function() {
    return gulp.src([config.APP_DIST_INDEX_FILE])
        .pipe(gulp.dest(config.APP_PROD));
});

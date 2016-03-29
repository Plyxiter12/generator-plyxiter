var config = require('../config');
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');


gulp.task('copy-js', function() {
    return gulp.src([config.APP_SRC_JS_FILE])
        .pipe(gulp.dest(config.APP_DIST_JS));
});

gulp.task('build', function(cb) {
    gulpSequence(
        'clean-dist',
        'copy-image',
        ['styles', 'nunjucks'],
        'copy-js',
        'preprocess-dev',
        'dev-server',
        'watch-dev',
        cb
    );
});

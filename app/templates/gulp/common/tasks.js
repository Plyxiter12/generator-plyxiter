var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('default', function(cb) {
    gulpSequence(
        'build',
        cb
    );
});

gulp.task('servers', function(cb) {
    gulpSequence(
        'dev-server',
        'dist-server',
        cb
    );
});

gulp.task('deploy', function(cb) {
    gulpSequence(
        cb
    );
});

gulp.task('prod', function(cb) {
    gulpSequence(
        'clean-prod',
        'copy-prod',
        'image-min',
        'rev-css',
        'rev-js',
        'rev-html',
        'preprocess-prod',
        'prod-server',
        cb
    );
});

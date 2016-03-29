var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build', function(cb) {
    gulpSequence(
        'clean-dist',
        'copy-image',
        ['styles', 'nunjucks'],
        ['build-app', 'build-vendor'],
        'preprocess-dev',
        'dev-server',
        'watch-dev',
        cb
    );
});

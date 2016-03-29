var config = require('../config.js');
var gulp = require('gulp');
var del = require('del');


gulp.task('clean-dist', function() {
    del([config.APP_DIST + '**/*']);
});

gulp.task('clean-prod', function() {
    del([config.APP_PROD + '**/*']);
})

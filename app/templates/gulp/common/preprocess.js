var config     = require('../config');
var gulp       = require('gulp');
var preprocess = require('gulp-preprocess');

var context = {
    dev: {
        DEV: true
    },
    prod: {
        PROD: true
    }
};

var task = function(target, location) {
    return gulp.src(config.APP_SRC_INDEX_FILE)
               .pipe(preprocess({
                   context: context[target]
               }))
               .pipe(gulp.dest(location));
};

// the actual tasks
gulp.task('preprocess-dev', function() {
    return task('dev', config.APP_DIST);
});

gulp.task('preprocess-prod', function() {
    return task('prod', config.APP_PROD);
});

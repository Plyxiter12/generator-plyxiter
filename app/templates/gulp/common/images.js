var config = require('./config');

var browserSync = require('browser-sync');
var changed     = require('gulp-changed');
var gulp        = require('gulp');
var imagemin    = require('gulp-imagemin');


gulp.task('image-min', function() {
    return gulp.src(config.APP_DIST_IMG + '*')
        .pipe(changed(config.APP_DIST_IMG))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
        }))
        .pipe(gulp.dest(config.APP_PROD_IMG))
        .pipe(browserSync.stream());
});

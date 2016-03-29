
var config = require('../config');
var gulp = require('gulp');
// var browserSync = require('browser-sync');
var nunjRender = require('gulp-nunjucks-render');
// var data = require('gulp-data');

// function getDataForFile(file){
//     return {
//         example: 'data loaded for ' + file.relative
//     };
// }

gulp.task('nunjucks', function () {

    return gulp.src('src/templates/pages/*.html')
        .pipe(nunjRender({
            path: ['src/templates']
        }))
        .pipe(gulp.dest('src'));
});

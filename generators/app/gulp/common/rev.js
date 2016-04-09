'use strict';

var config    = require('../config.js');
var gulp      = require('gulp');
var path      = require('path');
var RevAll    = require('gulp-rev-all');

gulp.task('rev', function() {
  var revAll = new RevAll({dontRenameFile: ['.html']});
  return gulp.src(path.join(config.APP_PROD, '**/*'))
    .pipe(revAll.revision())
    .pipe(gulp.dest(config.APP_CDN))
    .pipe(revAll.manifestFile())
    .pipe(gulp.dest(config.APP_CDN));
});

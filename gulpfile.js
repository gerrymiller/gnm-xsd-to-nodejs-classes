'use strict';

const mocha = require('gulp-mocha'),
      gulp = require('gulp');

gulp.task('test', () => {
    return gulp.src(['src/tests/unit/*.js']).pipe(mocha());
});
var gulp = require('gulp');
var less = require('gulp-less');
var print = require('gulp-print');

var errorHandler = require('./errorHandler');

gulp.task('less', function () {
    return  gulp.src([
            'css/theme.less',
            'css/donate.less'
    ])
        .pipe(print())
        .pipe(less({
            dumpLineNumbers: 'false',
            compress: true,
            yuicompress: true,
            ieCompat: true,
            strictImports: true
        }))
        .on('error', errorHandler.onError)
        .pipe(gulp.dest('css/'));
});
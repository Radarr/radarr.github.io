var gulp = require('gulp');
var print = require('gulp-print');
var imagemin = require('gulp-imagemin');

gulp.task('imageMin', function () {
    return gulp.src('img/**')
        .pipe(imagemin({
            progressive: false,
            optimizationLevel :4,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(print())
        .pipe(gulp.dest('img/'));
});
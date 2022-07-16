var gulp = require('gulp');
var print = require('gulp-print');

const imagemin = (import('gulp-imagemin')).default;

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
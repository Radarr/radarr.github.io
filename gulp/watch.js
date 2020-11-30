var gulp = require('gulp');
var browserSync = require('browser-sync').create();


require('./less.js');
require('./marko.js');

gulp.task('build', gulp.parallel('less', 'marko'));

gulp.task('watch', gulp.series('build', (done) => {
    gulp.watch(['css/*.less'], gulp.series('less'));
    gulp.watch(['src/**/*.marko','*.marko'], gulp.series('marko'));
    
    done();
}));

gulp.task('serve', gulp.series('watch', (done) => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    gulp.watch([
        'js/*.js',
        '**/*.css',
        '**/*.html'
    ]).on('change', browserSync.reload);

    done();
}));

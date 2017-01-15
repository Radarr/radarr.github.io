var gulp = require('gulp');
//var livereload = require('gulp-livereload');


require('./less.js');


gulp.task('watch', ['less'], function () {
    gulp.watch(['css/*.less'],['less']);
});

gulp.task('liveReload', ['jshint', 'handlebars', 'less', 'copyJs'], function () {
    var server = livereload();
    gulp.watch([
        'app/**/*.js',
        'app/**/*.css',
        'app/index.html'
    ]).on('change', function (file) {
        server.changed(file.path);
    });
});

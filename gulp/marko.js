var gulp = require('gulp');
var prettyHtml = require('gulp-pretty-html');
var marko = require('marko');
var through2 = require('through2');
var errorHandler = require('./errorHandler');
var gutil = require('gulp-util');
var cachebust = require('gulp-cache-bust');
var PluginError = gutil.PluginError;

var markoCompilerOptions = {
    writeToDisk: false,
    preserveWhitespace: true
};

var cwd = process.cwd();

require('marko/node-require').install({compilerOptions: markoCompilerOptions});
        
var markoRender = function(options) {
    return through2.obj(function(file, enc, cb) {
        var _this = this;

		if (file.isNull()) {
			return cb(null, file);
		}

		if (file.isStream()) {
			return cb(new PluginError('marko', 'Streaming not supported'));
        }

        var template = marko.load(file.path, options);

		template.render(options.renderOptions, function (err, out) {
			if (err) {
				return _this.emit('error', new PluginError('marko', err));
			}
            
			file.contents = Buffer.from(out.toString());
			file.path = gutil.replaceExtension(file.path, ".html");

			_this.push(file);
			cb(err);
		});
    });
}

gulp.task('marko', function() {

    // Clear the cache
    Object.keys(require.cache).forEach(filename => {
        if (filename.endsWith(".marko") || filename.endsWith(".marko.js")) {
            delete require.cache[filename];
        }
    });

    return gulp.src('src/*.marko')
               .pipe(markoRender(markoCompilerOptions))
               .on('error', errorHandler.onError)
               .pipe(prettyHtml({
                preserve_newlines: true,
                max_preserve_newlines: 0,
                unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b']
               }))
               .pipe(cachebust({ basePath: cwd + '/' }))
               .pipe(gulp.dest('./'));
});

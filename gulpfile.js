/*
https://github.com/sogko/gulp-recipes/tree/master/browser-sync-nodemon-expressjs
https://gist.github.com/mrajcok/135da63e4cc3a808edab
 */
var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
reload = browserSync.reload;
var shelljs = require('shelljs')

gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["app_server/views/**", "public/**"],
        browser: "default",
        port: 7000,
        tunnel: false,
        online: true,
        open: "external",
        injectChanges: true,
	});
});

gulp.task('app', function() {
  server.run(['./bin/www']);
})

gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		script: './bin/www'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}

	})
	.on('restart', function() {
		setTimeout(function() {
			reload();
		}, 500)
	})
});

gulp.task('test', function() {

})

/*
https://github.com/sogko/gulp-recipes/tree/master/browser-sync-nodemon-expressjs
https://gist.github.com/mrajcok/135da63e4cc3a808edab
 */
var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
reload = browserSync.reload;
var shelljs = require('shelljs/global')
var webpack = require('gulp-webpack');
var rename = require("gulp-rename");

gulp.task('default', ['browser-sync'], function () {  //,'watch'
});


gulp.task('webpack', function() {
  return gulp.src('pruebas/webpack/entry.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('pruebas/webpack/'));
});

gulp.task('webpack-w', function() {
  gulp.watch('pruebas/webpack/entry.js',['webpack'])
})

gulp.task('browser-sync', function() {
	browserSync.init(null, {
		proxy: "http://localhost:4000",
        files: ["apps_angular/**"],  //, "app_sandbox/**"
        browser: "default",
        startPath: '/admin',
        port: 7000,
        tunnel: false,
        online: true,
        open: "local",
        injectChanges: true,
	});
});

gulp.task('app', function() {
  server.run(['./bin/www']);
})


gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		script: './bin/www',
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

/*
gulp.task('apiblueprint', function() {
  exec("aglio --theme-variables slate -i ./docs/apiblueprint/api.apib  -o ./public/documentacion/index.html")
})

gulp.task('watch', function() {
  gulp.watch('./docs/apiblueprint/api.apib',['apiblueprint'])
})*/

gulp.task('watch', function() {
   gulp.watch('app/views/*',['nodemon'])
})

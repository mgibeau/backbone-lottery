var gulp = require('gulp'),
	gutil = require('gulp-util'),
	rename = require('gulp-rename'),
	browserify = require('gulp-browserify'),
	hbsfy = require("hbsfy"),
	jshint = require('gulp-jshint');

hbsfy.configure({
	extensions: ['hbs']
});

gulp.task('lint', function() {
	return gulp.src('./src/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('browserify', ['lint'], function() {
	return gulp.src('src/index.js')
		.pipe(browserify({
			insertGlobals: true,
			transform: [hbsfy]
		}))
        .on('error', gutil.log)
		.pipe(rename('app.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch(['src/**/*.js', 'src/**/*.hbs'], ['browserify']);
});

gulp.task('build', function() {
	// do stuff with assets
});

gulp.task('default', ['build', 'watch']);
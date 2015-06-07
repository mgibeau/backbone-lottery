var gulp = require('gulp'),
	gutil = require('gulp-util'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	browserify = require('gulp-browserify'),
	uglify = require('gulp-uglify'),
	hbsfy = require("hbsfy"),
	jshint = require('gulp-jshint'),
	mochaPhantomjs = require('gulp-mocha-phantomjs');

hbsfy.configure({
	extensions: ['hbs']
});

gulp.task('sass', function () {
  gulp.src('src/styles/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('lint', function() {
	return gulp.src('./src/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('uglify', ['browserify'], function() {
  return gulp.src('dist/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('test', ['browserify-test'], function() {
  return gulp.src('test/index.html')
    .pipe(mochaPhantomjs());
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

gulp.task('browserify-test', function() {
	return gulp.src('test/index.js')
		.pipe(browserify({
			insertGlobals: true
		}))
        .on('error', gutil.log)
		.pipe(rename('test.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	// gulp.watch('test/**/*.js', ['test']);
	gulp.watch(['src/**/*.js', 'src/**/*.hbs', 'src/styles/**/*.scss'], ['build']);
});

gulp.task('build', ['sass', 'uglify']);

gulp.task('default', ['test', 'build', 'watch']);
var bg = require('gulp-bg');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var yargs = require('yargs');

var args = yargs
	.alias('p', 'production')
	.argv;

gulp.task('env', function() {
	var env = args.production ? 'production' : 'development';
	process.env.NODE_ENV = env;
});

gulp.task('jshint', function() {
	return gulp.src([
		'./*.js',
		'./**/*.js',
		'!./node_modules/**',
		'!./public/js/lib/**'
	])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task('server', bg('node', 'server.js'));

gulp.task('default', ['env', 'server']);

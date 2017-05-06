var gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('gulp-browserify'),
	concatCss = require('gulp-concat-css'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	gulpif = require('gulp-if');
var webserver = require('gulp-webserver')
var path = require('path'),
	swPrecache = require('sw-precache');


var src = './process',
	dest = './app'
var	environment = 'production';

//setup gulp task

gulp.task('js',function(){
	return gulp.src(src + '/js/app.js')
	.pipe(browserify())
	.pipe(gulpif(environment === 'production',uglify()))
	.on('error',function(err){
		console.error('error!',err.message);
	})
	.pipe(gulp.dest(dest + '/js'));
});

gulp.task('html',function(){});

gulp.task('css',function(){
	gulp.src(src + '/css/app.css')
	.pipe(concatCss('app.css',{rebaseUrls:false}))
	.pipe(gulpif(environment === 'production',cleanCSS()))
	.pipe(gulp.dest(dest + '/css'));
});

gulp.task('watch',function(){
	gulp.watch([src + '/js/**/*']);
	gulp.watch(src + '/css/*.css');
	gulp.watch(dest + '/*.html');
});

gulp.task('webserver',function(){
	gulp.src(dest)
	.pipe(webserver({
		livereload:true,
		open:true
	}));
});

gulp.task('default',['watch','webserver']);















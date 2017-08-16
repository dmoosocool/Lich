'use strict';
import path from 'path';
import gulp from 'gulp';
import gutil from 'gulp-util';
import {
	CONFIG
} from './_config/gulp_config';

/**
 * TODO: 根据 gutil.env的值来执行脚本.
 * 默认只移动文件.
 */
exports.buildHtml = function() {
	let stream = gulp.src(CONFIG.path.html, {
		base: CONFIG.path.src
	});
	stream.pipe(gulp.dest(CONFIG.path.publish));
	return stream;
};

exports.buildJs = function() {
	let stream = gulp.src(CONFIG.path.js, {
		base: CONFIG.path.src
	});
	stream.pipe(gulp.dest(CONFIG.path.publish));
	return stream;
};

exports.buildCss = function() {
	let stream = gulp.src(CONFIG.path.css, {
		base: CONFIG.path.src
	});
	stream.pipe(gulp.dest(CONFIG.path.publish));
	return stream;
};

exports.buildImage = function() {
	let stream = gulp.src(CONFIG.path.image, {
		base: CONFIG.path.src
	});
	stream.pipe(gulp.dest(CONFIG.path.publish));
	return stream;
};
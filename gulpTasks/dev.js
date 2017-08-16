'use strict';
import gulp from 'gulp';
import browserSync from 'browser-sync';

import {
	CONFIG
} from './_config/gulp_config';

import {
	buildHtml,
	buildJs,
	buildCss,
	buildImage
} from './build';

let server = browserSync.create();

exports.server = (done) => {
	server.init(CONFIG.browserSync);
	done();
};

exports.watch = (done) => {
	let watcherQueue = [
		gulp.watch(CONFIG.path.html, buildHtml),
		gulp.watch(CONFIG.path.js, buildJs),
		gulp.watch(CONFIG.path.css, buildCss),
		gulp.watch(CONFIG.path.image, buildImage)
	];

	let reload = (event) => {
		return gulp.src(event, {
				base: CONFIG.path.src
			})
			.pipe(gulp.dest(CONFIG.path.publish))
			.pipe(server.stream())
	};

	watcherQueue.forEach(function(item) {
		item.on('change', reload).on('add', reload);
	});

	done();
}
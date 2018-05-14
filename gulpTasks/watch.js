'use strict';
import { CONFIG } from './_config/gulp.config';
import gulp from 'gulp';
import minimist from 'minimist';
import template from 'gulp-nunjucks';
import rename from 'gulp-rename';
import nunjucks from 'nunjucks';
import include from 'gulp-lich-include';
import less from 'gulp-less';
import includeConfig from './_config/Lich.rules.config';
// import browserSync from 'browser-sync';

// let server = browserSync.create();
import { server } from './dev';
                    
let env = minimist(process.argv.slice(2));
let type = env.type ? env.type.toUpperCase() : 'DEV';
let channel = env.channel ? env.channel.toUpperCase() : 'ALIPAY';

exports.watchTemplate = function watchTemplate() {
    return gulp.src(CONFIG.path.swig, { base: CONFIG.path.src })
        .pipe(template.compile())
        .pipe(rename({
            extname: '.html'
        }))
        .pipe(include(includeConfig, { channel: channel.toLowerCase() }))
        .pipe(gulp.dest(CONFIG.path.publish))
        .pipe(server.stream());
};

exports.watchJs = function watchJs() {
    return gulp.src(CONFIG.path.js, { base: CONFIG.path.src })
        .pipe(gulp.dest(CONFIG.path.publish));
};

exports.watchLess = function watchLess() {
    return gulp.src(CONFIG.path.less, { base: CONFIG.path.src })
        .pipe(less(CONFIG.lessOpt))
        .pipe(gulp.dest(CONFIG.path.publish))
        .pipe(server.stream());
};

exports.watchImage = function watchImage() {
    return gulp.src(CONFIG.path.image, { base: CONFIG.path.src })
        .pipe(gulp.dest(CONFIG.path.publish))
        .pipe(server.stream());
};
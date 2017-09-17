'use strict';
import gulp from 'gulp';
import { CONFIG } from './_config/gulp.config';
import del from 'del';
import browserSync from 'browser-sync';
import {
    watchSwig,
    watchJs,
    watchLess,
    watchImage
} from './watch';

let server = browserSync.create();
exports.server = server;


exports.clean = function clean(done) {
    del.sync(CONFIG.path.publish);
    done();
};

exports.runLocalServer = function runLocalServer(done) {
    server.init(CONFIG.browserSync);
    done();
};

exports.watch = function watch(done) {
    gulp.watch(CONFIG.path.swig, watchSwig)
        .on('change', () => {
            server.stream();
        })
        .on('add', () => {
            server.stream();
        });

    gulp.watch(CONFIG.path.js, watchJs)
        .on('change', () => {
            server.stream();
        })
        .on('add', () => {
            server.stream();
        });

    gulp.watch(CONFIG.path.less, watchLess)

        .on('change', () => {
            server.stream();
        })
        .on('add', () => {
            server.stream();
        });

    gulp.watch(CONFIG.path.image, watchImage)

        .on('change', () => {
            server.stream();
        })
        .on('add', () => {
            server.stream();
        });

    done();
}
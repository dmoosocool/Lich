'use strict';
import path from 'path';
import gulp from 'gulp';
import gutil from 'gulp-util';
import swig from 'gulp-swig';
import htmlmin from 'gulp-htmlmin';
import include from 'gulp-lich-include';
import less from 'gulp-less';
import lessAutoprefix from 'less-plugin-autoprefix';
import lessFunction from 'less-plugin-functions';
import { CONFIG } from './_config/gulp_config';
import includeConfig from './_config/Lich.rules.config';
import through from 'through2';

/**
 * TODO: 根据 gutil.env的值来执行脚本.
 * 默认只移动文件.
 */
exports.buildSwig = function () {
    const swigOpt = {
        defaults: {
            cache: false, // 不启用缓存.
        }
    };

    let stream = gulp.src(CONFIG.path.swig, { base: CONFIG.path.src });
    stream.pipe(swig(swigOpt));
    stream.pipe(include(includeConfig, {}));
    stream.pipe(gulp.dest(CONFIG.path.publish));
    return stream;
};

exports.buildJs = function () {
    let stream = gulp.src(CONFIG.path.js, {
        base: CONFIG.path.src
    });
    stream.pipe(gulp.dest(CONFIG.path.publish));
    return stream;
};

exports.buildLess = function () {
    let stream = gulp.src(CONFIG.path.less, {
        base: CONFIG.path.src
    });

    let autoprefix = new lessAutoprefix({
        // 样式兼容ios5 android2.3及以上.
        browsers: [
            "ios >= 5",
            "android >= 2.3"
        ]
    });

    let lessOpt = {
        plugins: [autoprefix, new lessFunction()]
    };

    stream.pipe(less(lessOpt));
    stream.pipe(gulp.dest(CONFIG.path.publish));
    return stream;
};

exports.buildImage = function () {
    let stream = gulp.src(CONFIG.path.image, {
        base: CONFIG.path.src
    });
    stream.pipe(gulp.dest(CONFIG.path.publish));
    return stream;
};
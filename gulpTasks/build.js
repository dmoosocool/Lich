'use strict';
import path from 'path';
import gulp from 'gulp';
import gutil from 'gulp-util';
import swig from 'gulp-swig';
import htmlmin from 'gulp-htmlmin';
import include from 'gulp-include';
import less from 'gulp-less';
import lessAutoprefix from 'less-plugin-autoprefix';
import lessFunction from 'less-plugin-functions';

import {CONFIG} from './_config/gulp_config';

/**
 * TODO: 根据 gutil.env的值来执行脚本.
 * 默认只移动文件.
 */
exports.buildSwig = function () {
    const htmlminOpt = {
        removeComments: true,   //清除HTML注释
        collapseWhitespace: true,   //压缩HTML
        collapseBooleanAttributes: true,   //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,   //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,   //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,   //删除<style>和<link>的type="text/css"
        minifyJS: true,   //压缩页面JS
        minifyCSS: true,   //压缩页面CSS
    };

    const includeOpt = {
        extensions: "js",
        hardFail: true,
        includePaths: [
            CONFIG.path.publish
        ]
    };

    const swigOpt = {
        defaults: {
            cache: false, // 不启用缓存.
        }
    };

    let stream = gulp.src(CONFIG.path.swig, {base: CONFIG.path.src});
    stream.pipe(swig(swigOpt));
    stream.pipe(include(includeOpt));
    stream.pipe(gulp.dest(CONFIG.path.publish));
    return stream;
    // return gulp.src(CONFIG.path.swig, {base: CONFIG.path.src})
    // // 编译swig模板.
    //     .pipe(swig({
    //         defaults: {
    //             cache: false,
    //         },
    //         data: {
    //             // 注入模板的变量. Native环境,
    //             NativeEnv: 'server'
    //         }
    //     }))
    //     // 压缩HTML
    //     .pipe(htmlmin(opt))
    //     .pipe(gulp.dest(config.filePaths.build));
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
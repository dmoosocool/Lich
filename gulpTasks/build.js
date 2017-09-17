'use strict';
import path from 'path';
import gulp from 'gulp';
import gutil from 'gulp-util';
import swig from 'gulp-swig';
import htmlmin from 'gulp-htmlmin';
import include from 'gulp-lich-include';
import less from 'gulp-less';
import fs from 'fs';
import lessAutoprefix from 'less-plugin-autoprefix';
import lessFunction from 'less-plugin-functions';
import { CONFIG } from './_config/gulp.config';
import includeConfig from './_config/Lich.rules.config';
import { ALL_SERVER } from './_config/server.config';
import { INTERFACE } from './_config/interface.config';
import through from 'through2';

let env = gutil.env;
let type = env.type ? env.type.toUpperCase() : 'DEV';
let channel = env.channel ? env.channel.toUpperCase() : 'ALIPAY';

/**
 * TODO: 根据 gutil.env的值来执行脚本.
 * 默认只移动文件.
 */

// 编译swig.
exports.buildSwig = function buildSwig() {
    return gulp.src(CONFIG.path.swig, { base: CONFIG.path.src })
        .pipe(swig(CONFIG.swigOpt))
        // 注入渠道变量
        .pipe(include(includeConfig, { channel: channel.toLowerCase() }))
        .pipe(gulp.dest(CONFIG.path.publish));
};

// 编译js.
exports.buildJs = function buildJs() {
    return gulp.src(CONFIG.path.js, { base: CONFIG.path.src })
        .pipe(gulp.dest(CONFIG.path.publish));
};

// 编译less
exports.buildLess = function buildLess() {
    return gulp.src(CONFIG.path.less, { base: CONFIG.path.src })
        .pipe(less(CONFIG.lessOpt))
        .pipe(gulp.dest(CONFIG.path.publish));
};

// 编译image.
exports.buildImage = function buildImage() {
    return gulp.src(CONFIG.path.image, { base: CONFIG.path.src })
        .pipe(gulp.dest(CONFIG.path.publish));
};

// 编译服务器配置信息及接口信息.
exports.buildService = function buildService(done) {
    let server = {
        SERVICE: ALL_SERVER[type],
        INTERFACE: INTERFACE
    }

    if (!ALL_SERVER[type]) {
        return done(new gutil.PluginError('Load Service', new Error(`{${type}} 该环境不存在, 请检查.`), { showStack: true }));
    }

    let returnString = `
+(function(window, undefined){
    window.KH_SERVICE = ${JSON.stringify(server)};
}(window));
`;
    let returnPath = path.join(CONFIG.path.publish, 'core/kh_service.js');
    // 输出目录生成.
    fs.writeFileSync(returnPath, returnString);

    // src也目录生成一个. 为了合并.
    fs.writeFileSync(path.join(CONFIG.path.src, 'core/kh_service.js'), returnString);
    return done();
};
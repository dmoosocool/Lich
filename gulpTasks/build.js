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
import { CONFIG } from './_config/gulp_config';
import includeConfig from './_config/Lich.rules.config';
import { ALL_SERVER } from './_config/server.config';
import { INTERFACE } from './_config/interface.config';

let env = gutil.env;
let type = env.type ? env.type.toUpperCase() : 'DEV';
let channel = env.channel ? env.channel.toUpperCase() : 'ALIPAY';

/**
 * TODO: 根据 gutil.env的值来执行脚本.
 * 默认只移动文件.
 */

// 编译swig.
exports.buildSwig = () => {
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

// 编译js.
exports.buildJs = () => {
    let stream = gulp.src(CONFIG.path.js, {
        base: CONFIG.path.src
    });
    stream.pipe(gulp.dest(CONFIG.path.publish));
    return stream;
};


// 编译less
exports.buildLess = () => {
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

    console.log('build less ok.');
    return stream;
};

// 编译image.
exports.buildImage = () => {
    let stream = gulp.src(CONFIG.path.image, {
        base: CONFIG.path.src
    });
    stream.pipe(gulp.dest(CONFIG.path.publish));
    return stream;
};

// 编译服务器配置信息及接口信息.
exports.buildService = (done) => {
    let server = {
        SERVICE: ALL_SERVER[type],
        INTERFACE: INTERFACE
    }

    if (!ALL_SERVER[type]) {
        return done(new gutil.PluginError('Load Service', new Error(`{${type}} 该环境不存在, 请检查.`), { showStack: true }));
    }

    let returnString = `window.KH_SERVICE = ${JSON.stringify(server)}`;
    let returnPath = path.join(CONFIG.path.publish, 'core/kh_service.js');
    fs.writeFileSync(returnPath, returnString);
    return done();
};
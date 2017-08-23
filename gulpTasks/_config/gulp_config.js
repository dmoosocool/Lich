'use strict';
import path from 'path';

const PROJ_PATH = process.cwd();
const DEVELOPER_PATH = path.join(PROJ_PATH, 'src');
const PUBLISH_PATH = path.join(PROJ_PATH, 'dist');

exports.CONFIG = {
    // 浏览器同步的配置.
    browserSync: {
        server: {
            baseDir: PUBLISH_PATH,
            directory: true,
            // index: "index.html",
        },
        port: 12345,
        cors: true,
    },

    // tasks中用到的js.
    path: {
        // 开发目录
        src: DEVELOPER_PATH,
        html: path.join(DEVELOPER_PATH, '**/*.html'),
        css: path.join(DEVELOPER_PATH, '**/*.css'),
        js: path.join(DEVELOPER_PATH, '**/*.js'),
        image: path.join(DEVELOPER_PATH, '**/*.+(png|jpg|gif)'),

        publish: PUBLISH_PATH,
    }
};
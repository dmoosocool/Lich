'use strict';
import path from 'path';
import lessAutoprefix from 'less-plugin-autoprefix';
import lessFunction from 'less-plugin-functions';



const PROJ_PATH = process.cwd();
const DEVELOPER_PATH = path.join(PROJ_PATH, 'src');
const PUBLISH_PATH = path.join(PROJ_PATH, 'dist');


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
        open: false,
    },
    // less 配置.
    lessOpt: lessOpt,

    // 合并文件配置
    // <script src="../core/filter.js" type="text/javascript"></script>
    // <script src="../core/kh_service.js" type="text/javascript"></script>
    // <script src="../core/utils.js" type="text/javascript"></script>
    // <script src="../core/Lich.js" type="text/javascript"></script>
    mergeOpt: {
        // 合并内置js.
        '../core/core.js': [
            '../core/filter.js',
            '../core/kh_service.js',
            '../core/utils.js',
            '../core/Lich.js'
        ]
    },

    // 为了解决: 通过gulp-rev生成的manifest文件自动带上了模块路径,导致在html中使用相对路径标签不会替换的问题.
    // 配置所有的模块名.
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!  如果模块名没有配置进来gulp-rev将不会替换html中的资源  !!!!!!!!!!!!!!!!!!!!!!!!!!!!
    modules: [
        'examples'
    ],

    htmlminOpt: {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    },

    // tasks中用到的js.
    path: {
        // 开发目录
        src: DEVELOPER_PATH,
        swig: ['src/**/*.swig', '!src/devDependencies/**/*'],
        less: 'src/**/*.less',
        js: 'src/**/*.js',
        image: 'src/**/*.+(png|jpg|gif)',
        publish: PUBLISH_PATH,
        server: path.join(path.dirname(__filename), 'server.config.js'),
        interface: path.join(path.dirname(__filename), 'interface.config.js'),
        manifest: 'dist/rev/**/*.json',
        distHtml: 'dist/**/*.html',
        distJs: ['dist/**/*.js', '!dist/node_modules/**/*'],
        distCss: 'dist/**/*.css'
    }
};
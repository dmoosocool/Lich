/**
 * Created by guoxin on 2017/8/16.
 */
'use strict';
import gulp from 'gulp';
import {server, watch} from './gulpTasks/dev';

import {buildHtml, buildJs, buildCss, buildImage} from './gulpTasks/build';

// gulp.series 		串行
// gulp.parallel	并行
// ======================================================== 设置任务名称-暂时没找到别的方式代替.
server.displayName = 'server';
watch.displayName = 'watch';
buildHtml.displayName = 'buildHtml';
buildJs.displayName = 'buildJs';
buildCss.displayName = 'buildCss';
buildImage.displayName = 'buildImage';
// ========================================================

// 开发环境
const developer = gulp.series(server, watch);
const build = gulp.parallel(buildHtml, buildJs, buildCss, buildImage);

gulp.task('default', gulp.series(build, developer));
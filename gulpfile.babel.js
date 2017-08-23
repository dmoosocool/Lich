/**
 * Created by guoxin on 2017/8/16.
 */
'use strict';
import gulp from 'gulp';
import {server, watch} from './gulpTasks/dev';
import {buildSwig, buildJs, buildLess, buildImage} from './gulpTasks/build';

// gulp.series 		串行
// gulp.parallel	并行
// ======================================================== 设置任务名称-暂时没找到别的方式代替.
server.displayName = 'server';
watch.displayName = 'watch';
buildSwig.displayName = 'buildSwig';
buildJs.displayName = 'buildJs';
buildLess.displayName = 'buildLess';
buildImage.displayName = 'buildImage';
// ========================================================

// 开发环境
const developer = gulp.series(server, watch);
const build = gulp.series(gulp.parallel(buildJs, buildLess, buildImage), buildSwig);

gulp.task('default', gulp.series(build, developer));
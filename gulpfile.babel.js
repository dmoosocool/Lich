/**
 * Created by guoxin on 2017/8/16.
 */
'use strict';
import gulp from 'gulp';
import { runLocalServer, watch, clean } from './gulpTasks/dev';
import { buildTemplate, buildJs, buildLess, buildImage, buildService, buildMerge } from './gulpTasks/build';
import { uglifyJs, uglifyCss, uglifyHtml, replaceSource, replaceManifest } from './gulpTasks/optimize';

// gulp.series 		串行
// gulp.parallel	并行

// 开发环境
const developer = gulp.series(runLocalServer, watch);
const build = gulp.series(clean, gulp.parallel(buildJs, buildLess, buildImage), buildService, buildTemplate);
const optimize = gulp.series(gulp.parallel(uglifyJs, uglifyCss, uglifyHtml), replaceManifest, replaceSource);


gulp.task('default', gulp.series(build, developer));
gulp.task('developer', gulp.series(build, developer));

// 发布时才做代码压缩及优化.
gulp.task('publish', gulp.series(build, optimize));
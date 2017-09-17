'use strict';
import { CONFIG } from './_config/gulp.config';
import gulp from 'gulp';
import uglify from 'gulp-uglify';
import cleanCss from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import path from 'path';
import rev from 'gulp-rev';
import revCollector from 'gulp-rev-collector';
import replace from 'gulp-replace';
import through from 'through2';
import fs from 'fs';
import htmlmin from 'gulp-htmlmin';

// 压缩JS
exports.uglifyJs = function uglifyJs() {
    return gulp.src(CONFIG.path.distJs)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rev())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(CONFIG.path.publish))
        .pipe(rev.manifest('js-manifest.json'))
        .pipe(gulp.dest(path.join(CONFIG.path.publish, 'rev')));
};

// 压缩css
exports.uglifyCss = function uglifyCss() {
    return gulp.src(CONFIG.path.distCss)
        .pipe(sourcemaps.init())
        .pipe(cleanCss())
        .pipe(rev())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(CONFIG.path.publish))
        .pipe(rev.manifest('css-manifest.json'))
        .pipe(gulp.dest(path.join(CONFIG.path.publish, 'rev')));
};

// 压缩html
exports.uglifyHtml = function uglifyHtml() {
    return gulp.src(CONFIG.path.distHtml)
        .pipe(htmlmin(CONFIG.htmlminOpt))
        .pipe(gulp.dest(CONFIG.path.publish));
};

// 为了解决:通过gulp-rev生成的manifest文件自动带上了模块路径,导致在html中使用相对路径标签不会替换的问题.
exports.replaceManifest = function replaceManifest(done) {

    return gulp.src(CONFIG.path.manifest)
        .pipe(through.obj((file, enc, cb) => {
            let content = file.contents.toString();
            modules.forEach((item) => {
                let reg = new RegExp(`${item}\/`, 'g');
                content = content.replace(reg, '');
            });

            fs.writeFileSync(file.path, content);
            cb();
        }));
};

// 通过 gulp-rev生成的manifest文件替换html文件.
exports.replaceSource = function replaceSource(done) {
    return gulp.src([CONFIG.path.manifest, 'dist/**/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest(CONFIG.path.publish));
};


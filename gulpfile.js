var gulp = require('gulp');
var eslint = require('gulp-eslint');
var shell = require('gulp-shell');
var changed = require('gulp-changed');
var watch = require('gulp-watch');
var compass = require('gulp-compass');
var gulp_jspm = require('gulp-jspm');
var sourcemaps = require('gulp-sourcemaps');
var replace = require('gulp-replace');
var htmlhint = require("gulp-htmlhint");
var del = require('del');
var runSequence = require('run-sequence');
var fs = require("fs");

var config = {
    appSource: 'src/app/**/*.js',
    allSource: 'src/**/*',
    allAppHtml: 'src/app/**/*.html',
    buildPath: 'build',
    publishPath: 'build-publish',
    publishSrcPath: 'build-publish/src/',
    publishAppPath: 'build-publish/src/app/',
    packageJson: 'package.json',
    appCss: 'src/css/app.css',
    scssPath: 'src/scss',
    cssPath: 'src/css',
    scssFiles: 'src/scss/*.scss',
    rootModule: 'src/app/app.module.js',
    indexFile: 'src/index.html',
    devInsertTextFile: 'index-dev.txt',
    preCompileInsertTextFile: 'index-pre-compile.txt',
    publishedIndexFile: 'build-publish/src/index.html',
    replaceToken: 'INSERTTEXTHERE'
};

config.preCompilepublishSources = [config.packageJson, 'src/index.html', 'src/main.js', 'src/css/**', 'src/fonts/**', 'scr/img/**', 'src/app/**/*.html'];
config.devPublishSources = [config.allSource, config.packageJson, '!' + config.scssFiles];

const dev = 'dev';
const preCompileDevelop = 'preCompileDevelop';
const preCompileProduction = 'preCompileProduction';

config.buildMode = dev;  // options are:  dev, preCompileDevelop, preCompileProduction

gulp.task('app-html-hint', function () {
    return gulp.src(config.allAppHtml)
        .pipe(htmlhint('.htmlhintrc'))
        .pipe(htmlhint.reporter())
        .pipe(htmlhint.failReporter());
});

gulp.task('app-lint', function () {
    return gulp.src([config.appSource])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('app-lint-publish', function (done) {
    runSequence('app-lint', 'app-html-hint', 'app-publish', 'app-pre-compile', 'app-inject-insert-text', done);
});

gulp.task('app-compass', function (done) {
    gulp.src(config.scssFiles)
        .pipe(compass({
            config_file: 'config.rb',
            css: config.cssPath,
            sass: config.scssPath
        }))
        .pipe(gulp.dest(config.cssPath))
        .on('end', function () {
            done();
        });
});

gulp.task('app-compass-publish', function (done) {
    runSequence('app-compass', 'app-publish', done);
});

gulp.task('app-clean-all', function () {
    var files = [config.buildPath, config.publishPath, config.appCss];
    return del(files);
});

gulp.task('app-clean', function () {
    var files = [config.publishPath];
    return del(files);
});

gulp.task('app-publish', function () {
    if (config.buildMode === dev) {
        return gulp.src(config.devPublishSources, {base: '.'})
            .pipe(changed(config.publishPath))
            .pipe(gulp.dest(config.publishPath));

    } else {
        return gulp.src(config.preCompilepublishSources, {base: '.'})
            .pipe(changed(config.publishPath))
            .pipe(gulp.dest(config.publishPath));
    }
});

gulp.task('app-inject-insert-text', function () {
    if (config.buildMode === dev) {
        return gulp.src(config.publishedIndexFile)
            .pipe(replace(config.replaceToken, fs.readFileSync('./index-dev.txt', 'utf8')))
            .pipe(gulp.dest(config.publishSrcPath));
    } else {
        return gulp.src(config.publishedIndexFile)
            .pipe(replace(config.replaceToken, fs.readFileSync('./index-pre-compile.txt', 'utf8')))
            .pipe(gulp.dest(config.publishSrcPath));
    }
});

gulp.task('app-pre-compile', function () {
    if (config.buildMode === preCompileDevelop) {
        return gulp.src(config.rootModule)
            .pipe(sourcemaps.init())
            .pipe(gulp_jspm({selfExecutingBundle: true}))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(config.publishAppPath));
    } else if (config.buildMode === preCompileProduction) {
        return gulp.src(config.rootModule)
            .pipe(gulp_jspm({selfExecutingBundle: true, minify: true}))
            .pipe(gulp.dest(config.publishAppPath));
    } else {
        return true;
    }
});


gulp.task('watch', function () {
    gulp.watch(config.appSource, ['app-lint-publish']);
    gulp.watch(config.scssFiles, ['app-compass-publish']);
});

gulp.task('default', function () {
    runSequence('app-clean', 'app-lint', 'app-html-hint', 'app-compass', 'app-publish', 'app-pre-compile', 'app-inject-insert-text');
});

gulp.task('build-mac', shell.task(['npm run build-mac']));

gulp.task('build-linux', shell.task(['npm run build-linux']));

gulp.task('build-windows', shell.task(['npm run build-windows']));

gulp.task('run', shell.task(['npm run start']));

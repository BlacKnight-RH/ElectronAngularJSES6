var gulp = require('gulp');
var eslint = require('gulp-eslint');
var shell = require('gulp-shell');
var changed = require('gulp-changed');
var watch = require('gulp-watch');
var compass = require('gulp-compass');
var gulp_jspm = require('gulp-jspm');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var runSequence = require('run-sequence');

var config = {
    appSource: 'src/app/**/*.js',
    allSource: 'src/**/*',
    buildPath: 'build',
    publishProductionPath: 'build-publish-production',
    publishDevelopPath: 'build-publish-develop',
    publishProductionAppPath: 'build-publish-production/src/app/',
    publishDevelopAppPath: 'build-publish-develop/src/app',
    packageJson: 'package.json',
    appCss: 'src/css/app.css',
    scssPath: 'src/scss',
    cssPath: 'src/css',
    scssFiles: 'src/scss/*.scss',
    rootModule: 'src/app/app.module.js'
};

config.publishSources = [config.packageJson, 'src/index.html', 'src/main.js', 'src/css/**', 'src/fonts/**', 'scr/img/**', 'src/app/**/*.html'];

gulp.task('app-lint', function () {
    return gulp.src([config.appSource])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('app-lint-publish', function (done) {
    runSequence('app-lint', 'app-publish-develop', 'app-build-develop', done);
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
    runSequence('app-compass', 'app-publish-develop', done);
});

gulp.task('app-clean-all', function () {
    var files = [config.buildPath, config.publishProductionPath, config.publishDevelopPath, config.appCss];
    return del(files);
});

gulp.task('app-clean-production', function () {
    var files = [config.publishProductionPath];
    return del(files);
});

gulp.task('app-clean-develop', function () {
    var files = [config.publishDevelopPath];
    return del(files);
});

gulp.task('app-publish-production', function () {
    return gulp.src(config.publishSources, {base: '.'})
        .pipe(changed(config.publishProductionPath))
        .pipe(gulp.dest(config.publishProductionPath));
});

gulp.task('app-publish-develop', function () {
    return gulp.src(config.publishSources, {base: '.'})
        .pipe(changed(config.publishDevelopPath))
        .pipe(gulp.dest(config.publishDevelopPath));
});

gulp.task('app-build-production', function () {
    return gulp.src(config.rootModule)
        .pipe(gulp_jspm({selfExecutingBundle: true, minify: true}))
        .pipe(gulp.dest(config.publishProductionAppPath));
});

gulp.task('app-build-develop', function () {
    return gulp.src(config.rootModule)
        .pipe(sourcemaps.init())
        .pipe(gulp_jspm({selfExecutingBundle: true}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.publishDevelopAppPath));
});

gulp.task('watch', function () {
    gulp.watch(config.appSource, ['app-lint-publish']);
    gulp.watch(config.scssFiles, ['app-compass-publish']);
});

gulp.task('default', function () {
    runSequence('app-clean-develop', 'app-lint', 'app-compass', 'app-publish-develop', 'app-build-develop');
});

gulp.task('build-dev-mac', shell.task(['npm run build-dev-mac']));

gulp.task('build-dev-linux', shell.task(['npm run build-dev-linux']));

gulp.task('build-dev-windows', shell.task(['npm run build-dev-windows']));

gulp.task('build-prod-mac', shell.task(['npm run build-prod-mac']));

gulp.task('build-prod-linux', shell.task(['npm run build-prod-linux']));

gulp.task('build-prod-windows', shell.task(['npm run build-prod-windows']));

gulp.task('run-dev', shell.task(['npm run start-dev']));

gulp.task('run-prod', shell.task(['npm run start-prod']));
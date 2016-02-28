var gulp = require('gulp');
var eslint = require('gulp-eslint');
var shell = require('gulp-shell');
var changed = require('gulp-changed');
var watch = require('gulp-watch');
var compass = require('gulp-compass');
var del = require('del');
var runSequence = require('run-sequence');

var config = {
    appSource: 'src/app/**/*.js',
    allSource: 'src/**/*',
    buildPath: 'build',
    publishPath: 'publish',
    packageJson: 'package.json',
    appCss: 'src/css/app.css',
    scssPath: 'src/scss',
    cssPath: 'src/css',
    scssFiles: 'src/scss/*.scss'
};

gulp.task('app-lint', function () {
    return gulp.src([config.appSource])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('app-compass', function (done) {
    gulp.src(config.scssFiles)
        .pipe(compass({
            config_file: 'config.rb',
            css: config.cssPath,
            sass: config.scssPath
        }))
        .pipe(gulp.dest(config.cssPath))
        .on('end', function() {
            done();
        });
});

gulp.task('app-clean-all', function () {
    var files = [config.buildPath, config.publishPath, config.appCss];
    return del(files);
});

gulp.task('app-clean-publish', function () {
    var files = [config.publishPath, config.appCss];
    return del(files);
});

gulp.task('app-copy-to-publish', function () {
    return gulp.src([config.allSource, config.packageJson, '!' + config.scssFiles], {base: '.'})
        .pipe(changed(config.publishPath))
        .pipe(gulp.dest(config.publishPath));
});

gulp.task('app-lint-publish', function (done) {
    runSequence('app-lint', 'app-copy-to-publish', done);
});

gulp.task('app-compass-publish', function (done) {
    runSequence('app-compass', 'app-copy-to-publish', done);
});

gulp.task('watch', function () {
    gulp.watch(config.appSource, ['app-lint-publish']);
    gulp.watch(config.scssFiles, ['app-compass-publish']);
});

gulp.task('default', function () {
    runSequence('app-clean-publish', 'app-lint', 'app-compass', 'app-copy-to-publish');
});

gulp.task('build-mac', shell.task(['npm run build-mac']));

gulp.task('build-linux', shell.task(['npm run build-linux']));

gulp.task('build-windows', shell.task(['npm run build-windows']));

gulp.task('run', shell.task(['npm run start']));
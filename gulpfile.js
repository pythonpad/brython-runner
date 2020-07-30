const gulp = require('gulp');
const babel = require('gulp-babel');
const webpack = require('webpack');
const DevServer = require('webpack-dev-server');
const argv = require('yargs').argv;
const webpackConfig = require('./webpack.config');

const argHost = argv.host || 'localhost';
const argPort = argv.port || 4000;

gulp.task('build-webpack', callback => {
    webpack(webpackConfig('production'), (err, stats) => {
        if (err) {
            throw Error('build-webpack', err);
        }
        if (stats.hasErrors()) {
            throw Error('Compile errors have occurred.');
        }
        callback();
    });
});

gulp.task('compile-js-babel', () => {
    return gulp.src(['src/**/*', '!src/**/*.py', '!src/browser.js'])
        .pipe(babel())
        .pipe(gulp.dest('lib'));
});

gulp.task('copy-py', () => {
    return gulp.src(['src/**/*.py'])
        .pipe(gulp.dest('lib'));
});

gulp.task('build-babel', gulp.parallel('compile-js-babel', 'copy-py'));

gulp.task('dev-webpack', () => {
    const config = webpackConfig('development');
    DevServer.addDevServerEntrypoints(config, {
        ...config.devServer,
        host: argHost,
    });
    const compiler = webpack(config);
    const server = new DevServer(compiler, config.devServer);
    server.listen(argPort, argHost, err => {
        if (err) {
            throw err;
        }
        console.log('Dev server is running.');
    });
});

gulp.task('dev', gulp.series('dev-webpack'));
gulp.task('build', gulp.parallel('build-babel', 'build-webpack'));
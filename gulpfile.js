/**
 * @file gulp
 * @author fio(zhoufangxing@baidu.com)
 */
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const merge = require('merge-stream');

// set variable via $ gulp --type production
const environment = $.util.env.type || 'production';

const date = new Date();
const timestamp = '' + date.getFullYear()
  + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))
  + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
  + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
  + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

const dist = 'dist/';

gulp.task('copyfile', () => {
    return gulp.src('client/static/**/*')
    .pipe(gulp.dest(dist));
});

gulp.task('webpackDllConfig', cb => {
    const webpackDllConfig = require('./webpack.config.dll.js').getConfig(environment, timestamp);
    webpack(webpackDllConfig, err => {
        if (err) {
        // console.log('ERROR - ', err);
        } else {
            return cb();
        }
    });
});

gulp.task('webpackProdConfig', ['webpackDllConfig'], cb => {
    const webpackProdConfig = require('./webpack.config.prod.js').getConfig(environment, timestamp);
    webpack(webpackProdConfig, err => {
        if (err) {
            // console.log('ERROR - ', err);
        } else {
            return cb();
        }
    });
});


gulp.task('copyForDevelop', () => {
    const staticFile = gulp.src('client/static/**/*')
    .pipe(gulp.dest(dist));

    const debugHTML = gulp.src('client/views/debug.html')
    .pipe($.rename('index.html'))
    .pipe(gulp.dest(dist));
    const indexHTML = gulp.src('client/views/debug.html')
    .pipe(gulp.dest(dist));
    return merge(staticFile, debugHTML, indexHTML);
});


// mkdir dist; cp client/static/fastclick.js dist; cp client/views/debug.html dist/;
// NODE_ENV=development webpack-dev-server --content-base ./dist --inline --hot --config webpack.config.js --host 0.0.0.0
gulp.task('webpackDevServer', () => {
    process.env.NODE_ENV = 'development';
    const webpackDevConfig = require('./webpack.config');
    webpackDevConfig.entry.index.unshift('webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080');
    webpackDevConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin());
    const compiler = webpack(webpackDevConfig);
    new WebpackDevServer(compiler, {
        hot: true,
        contentBase: './dist',
        stats: {colors: true},
        proxy: {
            '/api/*': {
                debug: true,
                target: 'http://127.0.0.1:8103/',
                // target: 'http://nmg02-bce-test10.nmg02.baidu.com:8482/',
                secure: true,
                changeOrigin: true
            },
            '/helper': {
                debug: true,
                target: 'https://cloud.baidu.com/',
                secure: true,
                changeOrigin: true
            },
            '/js/common': {
                debug: true,
                target: 'https://cloud.baidu.com/',
                secure: true,
                changeOrigin: true
            }
        }
    }).listen(8080, '0.0.0.0', () => {

    });
});

gulp.task('develop', ['copyForDevelop', 'webpackDevServer']);

gulp.task('compiletask', ['webpackProdConfig', 'copyfile']);

gulp.task('default', ['compiletask']);

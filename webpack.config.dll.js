/**
 * @file 公共文件打包
 * @author fio(zhoufangxing@baidu.com)
 */

'use strict';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appDomain = require('./common/config').appDomain;

let includes = fs.readdirSync('./client/views/includes');
includes = includes.reduce((obj, el) => {
    obj[el] = fs.readFileSync('./client/views/includes/' + el, 'utf8');
    return obj;
}, {});

module.exports.getConfig = function (environment, timestamp) {
    const webpackconfig = {
        devtool: 'hidden-source-map',
        entry: {
            vendor: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'isomorphic-fetch']
        },
        output: {
            path: path.join(__dirname, `./dist/${timestamp}`),
            filename: '[name].[chunkhash:8].dll.js',
            // 直接给出占位符,剩下的让koa模板从etcd中获取
            publicPath: environment === 'production'
                        ? `${appDomain}/${timestamp}`
                        : `/${timestamp}/`,

            /**
             * output.library
             * 将会定义为 window.${output.library}
             * 在这次的例子中，将会定义为`window.vendor_library`
             */
            library: '[name]_library'
        },
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

            new webpack.DllPlugin({

                /**
                 * path
                 * 定义 manifest 文件生成的位置
                 * [name]的部分由entry的名字替换
                 */
                path: path.join(__dirname, `./dist/${timestamp}`, '[name]-manifest.json'),

                /**
                 * name
                 * dll bundle 输出到那个全局变量上
                 * 和 output.library 一样即可。
                 */
                name: '[name]_library'
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(environment)
                }
            }),
            new HtmlWebpackPlugin({
                client: 'mobile',
                filename: '../../views/index.mobile.tmp.ejs',
                template: 'client/views/index.ejs',
                includes
            }),
            new HtmlWebpackPlugin({
                client: 'pc',
                filename: '../../views/index.pc.tmp.ejs',
                template: 'client/views/index.ejs',
                includes
            })
        ]
    };
    if (environment === 'production') {
        webpackconfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }));
    }
    return webpackconfig;
};

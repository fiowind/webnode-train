/**
 * @file 产品发布
 * @author fio(zhoufangxing@baidu.com)
 */
'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const appDomain = require('./common/config').appDomain;

// const timestamp = Math.round(Date.now()/1000)

module.exports.getConfig = function (environment, timestamp) {
    const webpackconfig = {
        devtool: 'hidden-source-map',
        entry: {
            index: './common/pages/index.js' // entry point for the client app,
        },
        output: {
            path: path.join(__dirname, `./dist/${timestamp}`),
            filename: '[name].[chunkhash:8].js',
            publicPath: environment === 'production'
                        ? `${appDomain}/${timestamp}/`
                        : `/${timestamp}/`,
            chunkFilename: '[id].[chunkhash:8].js'
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require(`./dist/${timestamp}/vendor-manifest.json`)
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new ExtractTextPlugin('[name].[contenthash:8].css', {allChunks: true}),
            new webpack.DefinePlugin({
                __DEV__: 'false',
                'process.env': {
                    NODE_ENV: JSON.stringify(environment)
                }
            }),
            new WebpackMd5Hash(),
            new HtmlWebpackPlugin({
                client: 'mobile',
                filename: '../../views/index.mobile.ejs',
                template: './rawReplace?{}!views/index.mobile.tmp.ejs'
            }),
            new HtmlWebpackPlugin({
                client: 'pc',
                filename: '../../views/index.app.ejs',
                template: './rawReplace?{}!views/index.pc.tmp.ejs'
            })
        ],
        resolve: {
            alias: {},

            // require() file without adding .jsx and .js .suffix
            extensions: ['', '.js', '.jsx', 'es6', 'es']
        },

        // be sure to add 'stage-0' in .babelrc to support es7 syntax
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015', 'stage-0', 'react'],
                        plugins: ['add-module-exports']
                    }
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules|assets/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&camelCase&localIdentName=[name]__[local]-[hash:base64:5]!postcss')
                },
                {
                    test: /\.css$/,
                    include: /assets|node_modules/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
                },
                {
                    test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                    loader: 'url-loader?limit=500&name=/[name]-[hash].[ext]'
                },
                {
                    test: /\.json$/,
                    loader: 'json'
                }
            ]
        },
        postcss() {
            return [autoprefixer({browsers: ['last 3 versions', '> 3% in CN', 'iOS 7']})];
        }
    };
    webpackconfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compressor: {
            warnings: false
        }
    }));
    return webpackconfig;
};


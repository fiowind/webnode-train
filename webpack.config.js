/**
 * @file 测试环境
 * @author fio(zhoufangxing@baidu.com)
 */

'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const values = require('postcss-modules-values');

module.exports = {
    devtool: '#inline-source-map',

    entry: {
        index: ['./common/pages/index.js'] // entry point for the client app
        // vote: './client/vote.js' // entry point for vote
    },

    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].bundle.js',
        publicPath: '/',  // TODO : should update
        chunkFilename: '[name]-[id].chunk.js'
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            __DEV__: 'true',
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.development || 'development')
            }
        }),
        new HtmlWebpackPlugin({
            client: 'debug',
            filename: '../dist/debug.html',
            template: 'client/views/debug.html'
        })
    ],

    resolve: {
        alias: {},

        // require() file without adding .jsx and .js .suffix
        extensions: ['', '.js', '.jsx']
    },

    devServer: {
        proxy: {
            '/v1/*': {
                debug: true,
                target: 'http://api.serv003.dev.dr-social.cn',  // TODO : should update
                secure: false,
                changeOrigin: true,
                header: {
                    cookie: 'fp=ab4;uid=646'
                }
            }
        }
    },

    // be sure to add 'stage-0' in .babelrc to support es7 syntax
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'react-hot',
                exclude: /node_modules/
            },
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
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader?modules&camelCase&localIdentName=[name]__[local]-[hash:base64:5]&sourceMap=true!postcss'
            },
            {
                test: /\.css$/,
                exclude: /node_modules|assets/,
                loader: 'style-loader!css-loader?modules&camelCase&localIdentName=[name]__[local]-[hash:base64:5]&sourceMap=true!postcss'
            },
            {
                test: /\.css$/,
                include: /assets|node_modules/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    postcss() {
        return [autoprefixer, values];
    }
};

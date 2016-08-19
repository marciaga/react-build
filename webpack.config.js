'use strict';
const path = require('path');
const webpack = require('webpack');
const LIFECYCLE_EVENT = process.env.npm_lifecycle_event;
const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
  })
];

let common = {
    env: process.env.NODE_ENV,
    entry: {
        app: path.join(__dirname, 'app')
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'main.js',
    },
    module: {
        loaders: [
            {
                test:    /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel']
            }
        ]
    }
}

if (LIFECYCLE_EVENT === 'start' || !LIFECYCLE_EVENT) {
    common.plugins = plugins;
    common.devtool = 'cheap-eval-source-map';
    common.devServer = {
        contentBase: path.join(__dirname, 'build'),
        progress: true,
        hot: true,
        inline: true,
        host: '127.0.0.1',
        port: 8080
    };
}

module.exports = common;

//webpack.dev.js
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        // static: '../public',
        hot: true,
        // historyApiFallback: { index: 'index.html' },
        port: 8000,
    },
    optimization: {
        minimize: true,
    },
})

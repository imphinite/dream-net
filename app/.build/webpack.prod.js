//webpack.prod.js
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
// pwa
const WebpackPwaManifest = require('webpack-pwa-manifest')
const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        publicPath: '',
    },
    plugins: [
        new WebpackPwaManifest({
            name: 'DreamNet',
            short_name: 'DNet',
            description: 'Find your soulmate',
            background_color: '#ffffff',
            crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
            icons: [
                {
                    src: path.resolve('src/assets/favicon.png'),
                    sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
                },
                {
                    src: path.resolve('src/assets/icon.png'),
                    sizes: [192], // multiple sizes
                    ios: true,
                },
                {
                    src: path.resolve('src/assets/favicon.png'),
                    size: '1024x1024',
                    purpose: 'maskable',
                },
            ],
            theme_color: '#ffffff',
            fingerprints: true,
        }),
        new InjectManifest({
            swSrc: './src/service-worker.js',
            swDest: 'service-worker.js',
        }),
    ],
})

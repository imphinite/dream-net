//webpack.common.js
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: './src/main.js', //Import file
    output: {
        filename: '[name].[contenthash].js', // output file
        path: path.resolve(__dirname, '../dist'), // Storage address of output file
    },
    resolve: {
        extensions: ['.vue', '.ts', '.js', '.jsx', '.json'], //It means that the file suffix can not be written in the import file
        alias: {
            '@': path.join(__dirname, '../src'),
            '@ca': path.resolve(__dirname, '../src/components/atoms'),
            '@cm': path.resolve(__dirname, '../src/components/molecules'),
            '@co': path.resolve(__dirname, '../src/components/organisms'),
            '@ct': path.resolve(__dirname, '../src/components/templates'),
            '@style': path.resolve(__dirname, '../src/style'),
            '@store': path.resolve(__dirname, '../src/store'),
            '@stories': path.resolve(__dirname, '../src/stories'),
            '@sb': path.resolve(__dirname, '../.storybook'),
        },
    },
    plugins: [
        new VueLoaderPlugin(), //Plug in for parsing and converting. vue files
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            path: '[name].[contenthash].js',
            inject: true,
            // Compress HTML
            minify: {
                removeComments: true, // Remove comments from HTML
                collapseWhitespace: true, // Remove whitespace and newline
            },
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.vue$/,
                use: ['vue-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    // 'postcss-loader',.
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('tailwindcss'),
                                    require('autoprefixer'),
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: 'asset', //Automatically choose between exporting a data URI and sending a separate file
            },
        ],
    },
    // https://webpack.docschina.org/guides/caching/
    optimization: {
        // The deterministic option benefits long-term caching
        moduleIds: 'deterministic',
        // use optimization.runtimeChunk  Option to split the runtime code into a separate chunk
        runtimeChunk: 'single',
        splitChunks: {
            // Using the client's long-term caching mechanism, hit the cache to eliminate requests and reduce getting resources from the server,
            // At the same time, it can ensure that the client code and server code version are consistent. This can be done by
            // Use the cacheGroups option of the SplitChunksPlugin plug-in.
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        minimizer: [
            new CssMinimizerPlugin({
                parallel: true, // Using multi process concurrent execution to improve the construction speed
            }),
        ],
    },
}

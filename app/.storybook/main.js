const common = require('../.build/webpack.common.js')

module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-viewport',
    ],
    framework: '@storybook/vue3',
    webpackFinal: (config) => {
        // Add alias
        config.resolve.alias = {
            ...config.resolve.alias,
            ...common.resolve.alias,
        }

        // @vueuse/core
        config.module.rules.push({
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto',
        })

        // Return the altered config
        return config
    },
}

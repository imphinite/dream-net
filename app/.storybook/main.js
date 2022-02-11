const common = require('../.build/webpack.common.js')

module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    framework: '@storybook/vue3',
    webpackFinal: (config) => {
        // Add alias
        config.resolve.alias = {
            ...config.resolve.alias,
            ...common.resolve.alias,
        }

        // Return the altered config
        return config
    },
}

const path = require('path')

module.exports = {
    rootDir: path.resolve(__dirname, '../'),
    cacheDirectory: '.cache/jest',
    clearMocks: true,
    roots: ['<rootDir>/src/', '<rootDir>/tests/'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    coverageDirectory: '<rootDir>/tests/_reports/coverage',
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/**/main.js',
        '!src/**/index.js',
        '!src/**/service-worker.js',
        '!src/**/registerServiceWorker.js',
        '!src/**/*.(spec|test|stories).js',
        '!**/node_modules/**',
    ],
    testEnvironment: 'jest-environment-jsdom',
    testPathIgnorePatterns: ['/node_modules/'],
    transform: {
        // process js with `babel-jest`
        '^.+\\.(js|jsx)$': 'babel-jest',
        // process `*.vue` files with `@vue/vue3-jest`
        '^.+\\.vue$': '@vue/vue3-jest',
    },
    setupFiles: ['<rootDir>/tests/jest.setup.js'],
}

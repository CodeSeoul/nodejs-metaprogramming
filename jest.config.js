export default {
    testEnvironment: 'node',
    verbose: true,
    setupFilesAfterEnv: [
        'jest-extended'
    ],
    collectCoverageFrom: [
        '!**/node_modules/**',
        '!**/test/**'
    ],
    testPathIgnorePatterns: [
        '/node_modules'
    ],
    testMatch: [
        '<rootDit>/test/**/?(*.)+(spec|test).js?(x)'
    ]
};

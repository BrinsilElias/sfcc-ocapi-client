export default {
  verbose: true,
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/lib/core/$1',
    '^@utils/(.*)$': '<rootDir>/lib/utils/$1',
    '^@model/(.*)$': '<rootDir>/lib/model/$1',
    '^@constants/(.*)$': '<rootDir>/lib/constants/$1'
  },
  testMatch: ['**/tests/**/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  testTimeout: 30000
};

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'],
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'test-results/jest',
      outputName: 'junit.xml',
    }]
  ]
};
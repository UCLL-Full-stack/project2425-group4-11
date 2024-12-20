/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Maps @/ to the root directory
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mocks CSS imports
  },
  testEnvironment: 'jsdom',
  transform: {
  '\\.[jt]sx?$': 'esbuild-jest',
  },
  }
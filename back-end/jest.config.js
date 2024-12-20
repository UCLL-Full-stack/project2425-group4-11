/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  rootDir: ".",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};

/* eslint-disable no-undef */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  transform: { "\\.(js|jsx|ts|tsx)$": "@sucrase/jest-plugin" },
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  modulePaths: ["<rootDir>"], // yup this is necessary! it's not able to find modules otherwise
  setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
};

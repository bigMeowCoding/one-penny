import config from "./jest.config";
const ciConfig = Object.assign({}, config, {
  collectCoverage: true,
  reporters: ["jest-junit"],
  collectCoverageFrom: ["lib/**/*.{ts,tsx}", "!**/node_modules/**"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
});
export default ciConfig;

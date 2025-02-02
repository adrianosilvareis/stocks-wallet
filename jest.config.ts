import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  clearMocks: true,
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testMatch: ["**/__tests__/**/*.test.ts"],
  setupFiles: ["./__tests__/setup.ts"]
};

export default config;

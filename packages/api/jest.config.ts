import type { Config } from "jest";
import defaultConfig from "../../jest.config";

const config: Config = {
  ...defaultConfig,
  setupFiles: ["../../__tests__/setup.ts"],
  passWithNoTests: true
};

export default config;

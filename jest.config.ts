import { createDefaultPreset, type JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
    transform: {
        ...createDefaultPreset().transform
    },
    moduleNameMapper: {
        "^@/(.*)$": ["<rootDir>/src/$1"]
    }
};

export default jestConfig;

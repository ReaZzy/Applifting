import * as path from 'path';

export default {
  moduleDirectories: ['node_modules', __dirname],
  moduleNameMapper: {
    '^@src(.*)$': '<rootDir>/src$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  snapshotResolver: path.resolve('__snapshots__', 'snapshotResolver.ts'),
};

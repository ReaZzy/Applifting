import * as path from 'path';

export default {
  moduleDirectories: ['node_modules', __dirname],
  moduleNameMapper: {
    '^@src(.*)$': '<rootDir>/src$1',
    '^@public(.*)$': '<rootDir>/public$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/utils/tests/fileTransformer.js',
  },
  transformIgnorePatterns: [`node_modules`],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/src/utils/tests/setupTests.ts'],
  snapshotResolver: path.resolve('__snapshots__', 'snapshotResolver.ts'),
};

export default {
  resolveSnapshotPath: (testPath:string, snapshotExtension:string) => {
    return testPath.replace('src/', '__snapshots__/') + snapshotExtension
  },

  resolveTestPath: (snapshotFilePath:string, snapshotExtension:string) => {
    return snapshotFilePath
      .replace('__snapshots__/', 'src/')
      .slice(0, -snapshotExtension.length)},

  testPathForConsistencyCheck: 'src/components/some.test.js',
};

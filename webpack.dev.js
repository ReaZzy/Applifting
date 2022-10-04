const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common').commonConfig;

const devConfig = merge(commonConfig, {
  mode: 'development',
  devtool: "source-map",
  devServer: {
    port: 3000,
    hot: true,
    liveReload: false,
  },
  output: {
    filename: '[name].bundle.js',
  },
});

module.exports = devConfig;
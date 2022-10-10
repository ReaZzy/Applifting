const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common').commonConfig;

const devConfig = merge(commonConfig, {
  mode: 'development',
  devtool: "source-map",
  devServer: {
    port: process.env.PORT || 3001,
    hot: true,
    liveReload: false,
    historyApiFallback: true,
  },
  output: {
    filename: '[name].bundle.js',
  },
});

module.exports = devConfig;
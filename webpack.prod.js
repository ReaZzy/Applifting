const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common').commonConfig;
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin

const productionConfig = merge(commonConfig, {
  mode: 'production',
  optimization: {
    minimize: true,
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    filename: '[name]-[chunkhash].bundle.js',
  },
  plugins: [
    new BundleAnalyzerPlugin(),
  ]
});

module.exports = productionConfig;
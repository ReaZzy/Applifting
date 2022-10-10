const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common').commonConfig;
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

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
    new CopyPlugin({
      patterns: [
        { from: path.resolve('public', 'favicon'), to: 'favicon' },
        { from: path.resolve('public', 'site.webmanifest') },
      ]
    })
  ]
});

module.exports = productionConfig;
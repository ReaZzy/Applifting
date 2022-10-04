const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const aliases = {
  '@src': path.resolve(__dirname, 'src')
};

const commonConfig =  {
  entry: {
    app: path.resolve(__dirname, 'src', 'index.tsx'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: aliases,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new Dotenv()
  ],
};

module.exports = { commonConfig, aliases };
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const path = require('path');
const { getHTMLPlugins, getOutput, getCopyPlugins, getFirefoxCopyPlugins, getEntry } = require('./webpack.utils');
const config = require('./config.json');

const generalConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
        resolve: {
          extensions: ['.js', '.jsx'],
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['eslint-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
};

module.exports = {
  ...generalConfig,
  entry: {
    popup: path.resolve(__dirname, 'src/popup/popup.jsx'),
    options: path.resolve(__dirname, 'src/options/options.jsx'),
    content: path.resolve(__dirname, 'src/content/content.js'),
    background: path.resolve(__dirname, 'src/background/background.js'),
    hotreload: path.resolve(__dirname, 'src/utils/hot-reload.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: path.resolve(__dirname, 'dist/index.html'),
      template: 'src/index.html',
      chunks: ['entry'],
    }),
    new HtmlWebpackPlugin({
      title: 'Popup',
      filename: path.resolve(__dirname, 'dist/popup/index.html'),
      template: 'src/popup/index.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      title: 'Options',
      filename: path.resolve(__dirname, 'dist/options/index.html'),
      template: 'src/options/index.html',
      chunks: ['options'],
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets', to: path.resolve(__dirname, 'dist/assets') },
      { from: 'src/_locales', to: path.resolve(__dirname, 'dist/_locales') },
      { from: 'src/manifest.json', to: path.resolve(__dirname, 'dist/manifest.json') },
    ]),
  ],
}
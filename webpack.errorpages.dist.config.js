/* eslint-disable import/no-dynamic-require */
const path = require('path');
const ZipPlugin = require('zip-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackShellPlugin = require('./tools/webpack-shell-plugin')
const getAliases = require('./tools/get-aliases')
const getHtmlWebpackPlugins = require('./tools/get-html-webpack-plugins-errorpages');
const getRules = require('./tools/get-rules');
const getStats = require('./tools/get-stats.js');

module.exports = () => ({
  mode: 'production',
  entry: path.resolve(__dirname, 'src/scripts.js'),
  cache: false,
  stats: getStats(),
  performance: {
    assetFilter(assetFilename) {
      return !assetFilename.endsWith('.zip');
    }
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'preview/errorpages'),
    publicPath: '/waroot/'
  },

  resolve: {
    alias: getAliases(),
  },

  module: {
    rules: getRules()
  },

  plugins: [
    // for every static html page we have to instantiate a new plugin, loop over each key in data.js
    ...getHtmlWebpackPlugins('production'),

    // create zip file in dist folder
    // errorpages be named errorpages.zip
    new ZipPlugin({
      filename: 'errorpages.zip',
      path: path.resolve(__dirname, './dist'),
    }),

    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CleanWebpackPlugin(),
    new WebpackShellPlugin({
      onBuildStart: ['echo ""'],
      onBuildEnd: ['echo "\n---\nSuccessfully built zip to dist/errorpages.zip, \npreview folder contains production files now. \nTo preview pages, upload the zip to BM > Administration > custom error pages\nTo preview them locally, run watch:errorpages"']
    })
  ]
})

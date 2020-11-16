/* eslint-disable no-console */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const getHtmlWebpackPlugins = require('./tools/get-html-webpack-plugins-errorpages')
const getRules = require('./tools/get-rules.js');
const getStats = require('./tools/get-stats.js');

module.exports = () => {
  console.log("\nbuilding preview for development, pages in /preview can be previewed locally in a browser without running any local servers.")

  return {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/scripts.js'),
    cache: false,
    stats: getStats(),
    watchOptions: {
      ignored: /node_modules/
    },

    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'preview/errorpages'),
      publicPath: ''
    },

    plugins: [
      // for every static html page we have to instantiate a new plugin, loop over each key in data.js
      ...getHtmlWebpackPlugins(),

      // styles end up in js first, get them into separate file
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
      // clear preview dir on every build
      new CleanWebpackPlugin(),
    ],

    // because all the @font-face paths in _generic.font-face.scss start with '../fonts' we have to alias them.
    // otherwise css-loader will throw an error.
    resolve: {

    },

    module: {
      rules: getRules()
    },
  };
}

/* eslint-disable no-console */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const getRules = require('./tools/get-rules.js');
const getStats = require('./tools/get-stats.js');
const getHtmlWebpackPlugin = require('./tools/get-html-webpack-plugins-maintpages')
const getAliases = require('./tools/get-aliases')
const data = require('./src/data-maintpages')

const BuildAliasesPlugin = require('./tools/build-aliases-plugin');
const ZipFilesPlugin = require('./tools/zip-files-plugin')

module.exports = () => {
  console.log("\nbuilding maintenance pages preview for development, pages in /preview/maintenance can be previewed locally in a browser without running any local servers.")

  // return multiple config setup for different envs configured in data-maintpages.
  const configs = []

  Object.keys(data.aliases).forEach(environment => {
    const config = {
      mode: 'production',
      entry: path.resolve(__dirname, 'src/scripts.js'),
      cache: false,
      stats: getStats(),
      watchOptions: {
        ignored: /node_modules/
      },

      output: {
        filename: 'bundle.js',
        publicPath: `/${data.aliases[environment].primary}/`,
        path: path.resolve(__dirname, `preview/maintenance/${environment}/${data.aliases[environment].primary}`),
      },

      plugins: [
        new BuildAliasesPlugin(environment),

        new CleanWebpackPlugin({
          protectWebpackAssets: false,
        }),
        // for every static html page we have to instantiate a new plugin, loop over each key in data.js

        getHtmlWebpackPlugin('production', environment),
        // styles end up in js first, get them into separate file

        new MiniCssExtractPlugin({
          filename: 'style.css',
        }),

        new ZipFilesPlugin(environment),
      ],

      // because all the @font-face paths in _generic.font-face.scss start with '../fonts' we have to alias them.
      // otherwise css-loader will throw an error.
      resolve: {
        alias: getAliases()
      },

      module: {
        rules: getRules()
      },
    }
    configs.push(config)
  });

  return configs


}

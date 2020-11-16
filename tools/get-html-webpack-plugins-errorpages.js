/* eslint-disable import/no-dynamic-require */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const data = require('../src/data-errorpages');

// requirement. See readme. The slashes are important.
const SFCCPATH = '/waroot/'

// for every static html page we have to instantiate a new plugin
module.exports = (mode) => {

  const htmlWebpackPlugins = []
  Object.keys(data.pages).forEach(file => {

    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src/html/template.html'),

        // we need this for watch mode, since data file does not get recompiled automatically
        templateParameters(compilation) {
          const resolvedDataPath = path.resolve(__dirname, '../src/data-errorpages.js')

          // basename is different on production
          const basename = mode === 'production' ? SFCCPATH : ''
          // Add datafile path to watch and rebuild when data changes
          compilation.fileDependencies.add(resolvedDataPath);
          // Clear previous cached data from file if exist
          delete require.cache[require.resolve(resolvedDataPath)];
          // Return always fresh data
          return { ...data.pages[file], basename };
        },
        filename: file,
        inject: false,
        cache: false
      }))
  })
  return htmlWebpackPlugins
}



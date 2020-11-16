/* eslint-disable import/no-dynamic-require */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const data = require('../src/data-maintpages');


// for every static html page we have to instantiate a new plugin
module.exports = (mode, environment) => {
  return new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../src/html/template.html'),

    // we need this for watch mode, since data file does not get recompiled automatically
    templateParameters(compilation) {
      const resolvedDataPath = path.resolve(__dirname, '../src/data-maintpages.js')

      // basename is different on production, omit for local previewing purposes
      const basename = mode === 'production' ? `/${data.aliases[environment].primary}/` : ''
      // Add datafile path to watch and rebuild when data changes
      compilation.fileDependencies.add(resolvedDataPath);
      // Clear previous cached data from file if exist
      delete require.cache[require.resolve(resolvedDataPath)];
      // Return always fresh data
      return { ...data.page['index.html'], basename };
    },
    filename: 'index.html',
    inject: false,
    cache: false
  })

}


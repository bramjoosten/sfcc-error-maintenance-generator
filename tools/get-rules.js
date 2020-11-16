const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => [
  {
    test: /main.scss$/i,
    use: [

      // last loader, writes to file
      {
        loader: MiniCssExtractPlugin.loader,
      },

      // css loader will resolve @imports and css url calls, different behavior for fonts in resolve.alias options.
      {
        loader: 'css-loader',
        options: {
          // importLoaders: 2,
        },
      },

      // do transformations on parsed Sass
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              require('postcss-strip-zero-length-units'),
              require('autoprefixer'),
            ]
          }
        }
      },


      // first loader, parse sass into css. Does not resolve css @import and urls (e.g. fonts)
      {
        loader: 'sass-loader',
        options: {
          implementation: require('sass'),
        }
      },

    ],
  },
  {
    test: /\.(png|svg|jpg|gif)$/,
    use: [
      'file-loader',
    ],
  },
  {
    test: /\.(woff|woff2)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext][query]',
        },
      }

    ],
  },
]

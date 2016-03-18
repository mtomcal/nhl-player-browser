var path = require('path');
var webpack = require('webpack');

if (process.env.NODE_ENV === 'production') {
  module.exports = {
      devtool: 'source-map',
      entry: [
          './src/index'
      ],
      output: {
          path: path.join(process.cwd(), 'dist'),
          filename: 'bundle.js',
          publicPath: '/static/'
      },
      plugins: [
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.DefinePlugin({
              'process.env': {
                  'NODE_ENV': JSON.stringify('production')
              }
          }),
          new webpack.optimize.UglifyJsPlugin({
              compressor: {
                  warnings: false
              }
          })
      ],
      module: {
          loaders: [{
                  test: /\.js$/,
                  loaders: ['babel'],
                  include: path.join(process.cwd(), 'src')
              }, {
                  test: /\.js$/,
                  loaders: ['babel'],
                  include: path.join(process.cwd(), 'src')
              }, {
                  test: /\.css$/,
                  loaders: ['style', 'css?sourceMap']
              }, {
                  test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
                  loader: 'url-loader?limit=100000'
              }
          ]
      }
  };
} else {
  module.exports = {
      devtool: 'eval',
      entry: [
          'webpack-hot-middleware/client',
          './src/index'
      ],
      output: {
          path: path.join(process.cwd(), 'dist'),
          filename: 'bundle.js',
          publicPath: '/static/'
      },
      plugins: [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoErrorsPlugin()
      ],
      module: {
          loaders: [
              {
                  test: /\.js$/,
                  loaders: ['babel'],
                  include: path.join(process.cwd(), 'src')
              }, {
                  test: /\.css$/,
                  loaders: ['style', 'css?sourceMap']
              }, {
                  test: /\.(png|jpg|woff|otf|woff2|eot|ttf|svg)$/,
                  loader: 'url-loader?limit=100000'
              }

          ]
      }
  };
}

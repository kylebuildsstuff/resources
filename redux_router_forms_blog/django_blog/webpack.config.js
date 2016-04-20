var path = require('path');
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,
  entry: [
    // 'webpack-dev-server/client?http://localhost:3000',
    // 'webpack/hot/only-dev-server',
    './assets/js/index'
  ],

  output: {
    path: path.resolve('./assets/bundles/'),
    filename: '[name]-[hash].js',
    // publicPath: 'http://localhost:3000/assets/bundles/',
  },

  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),
    new BundleTracker({filename: './webpack-stats.json'}),
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      },
      {
        test: /\.scss/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.html/,
        loader: 'html'
      }
    ]
  },

  resolve: {
    moduleDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },
}

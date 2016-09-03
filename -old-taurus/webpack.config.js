var path = require('path');
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

// To serve the assets without hot reloading, use CLI command: webpack --watch
// To serve assets with hot reloading, uncomment the stuff below, and use CLI: node server.js
// ** Disabled hot reloading for now for better debugging experience.
module.exports = {
  context: __dirname,
  entry: [
    // 'webpack-dev-server/client?http://localhost:3000',
    // 'webpack/hot/only-dev-server',
    './assets/js/index',
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
        loaders: ['babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0'],
        // 'react-hot'   <-- put this back in the loader for webpack-hot-reloading
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

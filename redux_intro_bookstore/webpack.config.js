var path = require('path');


module.exports = {
  context: __dirname,
  entry: './assets/js/index.js',

  output: {
    path: path.resolve('./assets/bundles'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader?presets[]=react,presets[]=es2015'],
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
    extensions: ['', '.js', '.jsx'],
  },
}

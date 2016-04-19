var path = require('path');


module.exports = {
  context: __dirname,
  entry: './assets/js/index.js',

  output: {
    path: './assets/bundles',
    filename: 'bundle.js',
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
        loaders: ['style', 'css', 'sass'],
      },
    ]
  },

  resolve: {
    moduleDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx'],
  },

}

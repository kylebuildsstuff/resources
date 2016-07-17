var path = require('path');
var webpack = require('webpack')

module.exports = {
  context: __dirname,

  entry: [
    './emitter_app'
  ],

  output: {
    path: path.resolve('./'),
    filename: 'backend.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0']
      }
    ]
  },

  resolve: {
    moduleDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  }
}

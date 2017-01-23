var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [ // each string is the nane of the library to be included in the vendor bundle
  'faker', 'lodash', 'redux', 'react-redux', 'react-dom', 'react', 'react-input-range', 'redux-form', 'redux-thunk'
]

module.exports = {
  entry: {  // passing an object rather than a string allows for multiple entry points
    bundle: './src/index.js',
    vendor: VENDOR_LIBS  // tells webpack to produce a separate bundle called vendor
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js' // chunk hash is a hash of the contents of the file
    // every time the bundle or vendor is changed, webpack will automatically hash the contents of the file and store it in a variable called [chunkhash] which acts as a random string
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      },
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      // webpack doesn't know when we've made a change to vendor. so when we change bundle, webpack will mistakenly think we updated vendor too, so we can fix that with this config setting
      names: ['vendor', 'manifest'] // manifest gives the browser more information as to if the vendor file has actually changed
    }),
    // automatically injects bundles/chunks as script tags into html without updating index.html
    new HtmlWebpackPlugin({
      // reference to the html document
      template: 'src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
  ]
};

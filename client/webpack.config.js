'use strict';
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Always enabled plugins
let plugins = [
  // Extract CSS files to the 'bundle.css'.
  new ExtractTextPlugin('_.css'),
];

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '_.js',
    path: path.resolve(__dirname, '../server/public/dist')
  },
  module: {
    rules: [
      { test: /\.(?:png|(?:woff2?|ttf|eot|svg)(?:\?v=[0-9]\.[0-9]\.[0-9])?)$/, use: 'file-loader?name=static/[hash].[ext]' },
      { test: /\.css$/, use: ExtractTextPlugin.extract({ use: 'css-loader' }) }
    ]
  },
  plugins
};

'use strict';
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// TODO: postcss
// TODO: autoprefixer

let devtool = undefined;
if (process.env.NODE_ENV !== 'production') {
  // Development-mode only
  devtool = 'source-map';
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '_.js',
    path: path.resolve(__dirname, '../server/public/dist')
  },
  module: {
    rules: [
      {
        test: /\.(?:jpg|png|(?:woff2?|ttf|eot|svg)(?:\?v=[0-9]\.[0-9]\.[0-9])?)$/,
        use: 'file-loader?name=static/[hash].[ext]'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'stylus-loader']
        })
      },
    ]
  },
  plugins: [new ExtractTextPlugin('_.css')],
  devtool,
};

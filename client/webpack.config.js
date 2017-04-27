'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')

//
// Common configs
//
const commonConfigs = {
  entry: './src/index.ts',
  output: {
    filename: '_.js',
    path: path.resolve(__dirname, '../server/public/dist')
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'awesome-typescript-loader' },
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
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new ExtractTextPlugin('_.css'),
    new CheckerPlugin()
  ],
}

//
// Development-mode configs
//
const devConfigs = {
  devtool: 'source-map'
}

//
// Production-mode configs
//
const productionConfigs = {
  plugins: [
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') })
  ]
}

module.exports = env => env === 'production' ?
  merge(commonConfigs, productionConfigs) :
  merge(commonConfigs, devConfigs)

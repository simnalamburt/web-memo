'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const zopfli = require('@gfx/zopfli')
const sass = require('sass')

//
// Common configs
//
const commonConfigs = {
  entry: './src/index.ts',
  output: {
    filename: '[hash].js',
    path: path.resolve(__dirname, '../server/public')
  },
  module: {
    rules: [
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.(?:jpg|png|(?:woff2?|ttf|eot|svg)(?:\?v=[0-9]\.[0-9]\.[0-9])?)$/,
        use: 'file-loader?name=[hash].[ext]'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: sass
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[hash].css' }),
    new HtmlWebpackPlugin({ template: 'src/index.html' })
  ]
}

// Development-mode configs
const dev = {
  devtool: 'inline-source-map'
}

// Production-mode configs
const prod = {
  plugins: [
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CompressionPlugin({
      test: /\.(?:css|js|svg|eot|ttf|html)$/,
      algorithm: zopfli.gzip,
      minRatio: 1,
      compressionOptions: { numiterations: 15 }
    })
  ]
}

module.exports = (_, { mode }) =>
  merge(commonConfigs, mode === 'production' ? prod : dev)

'use strict';
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '_bundle.js',
    path: path.resolve(__dirname, '../server/public')
  }
};

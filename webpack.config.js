'use strict';

module.exports = {
  entry: './index.jsx',
  output: {
    path: __dirname,
    filename: 'bundle.index.js'
  },
  module: {
    rules: [
      {
        test: /.jsx?/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
};

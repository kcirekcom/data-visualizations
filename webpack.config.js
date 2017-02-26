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
      }
    ]
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  }
};

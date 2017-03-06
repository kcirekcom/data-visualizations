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
        test: /\.jsx?/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
};

// module.exports = [{
//   name: 'chartComponent',
//   entry: {
//     line: './index.jsx',
//   },
//   output: {
//     path: __dirname,
//     filename: 'bundle.index.js'
//   },
//   module: {
//     loaders: [
//       {
//         test: [/\.jsx$/],
//         loader: ['jsx-loader?insertPragma=React.DOM&harmony'],
//       },
//       {
//         test: /\.json$/,
//         loader: 'json-loader'
//       }
//     ],
//   }
// }];

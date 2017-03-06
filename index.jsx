'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
// var LineTooltip = require('react-d3-tooltip').LineTooltip;

var data = d3.json('./data/pitching-stats.json', (_data) => {
  console.log(_data[0]);
});

class Chart extends React.component {
  getInitialState() {
    return {
      dataset: 'pitchers'
    };
  }
  setDataset(e) {
    this.setState({
      dataset: e.target.value
    });
  }
}

// (function() {
//
//   var chartData = require('./data/pitching-stats.json');
//
//   var width = 900,
//     height = 300,
//     margins = {left: 100, right: 100, top: 50, bottom: 50},
//     title = 'Wins',
//     chartSeries = [
//       {
//         field: 'wins',
//         name: 'wins',
//         color: '#ff7f0e'
//       }
//     ],
//     x = function(d) {
//       return d.rank;
//     };
//
//   ReactDOM.render(
//     <LineTooltip
//       showXGrid={false}
//       showYGrid={false}
//       margins={margins}
//       title={title}
//       data={chartData}
//       width={width}
//       height={height}
//       chartSeries={chartSeries}
//       x={x}
//       xScale='ordinal'
//     />
//   , document.getElementById('line-user')
//   );
// })();

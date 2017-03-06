'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
// var LineTooltip = require('react-d3-tooltip').LineTooltip;

var pitchingData = require('./data/pitching-stats.json');

console.log('pitchingData', pitchingData);

class Chart extends React.Component {
  constructor() {
    super();
  }
  // getInitialState() {
  //   return {
  //     dataset: 'pitchers'
  //   };
  // }
  // setDataset(e) {
  //   this.setState({
  //     dataset: e.target.value
  //   });
  // }

  render() {
    var width = 800,
      height = 500;

    var x = d3.scaleBand()
      .range([0, width])
      .padding(0.25);

    var y = d3.scaleLinear()
      .range([height, 0]);

    // var bar = d3.layout.bar()
    //   .value(d => d[this.state.dataset])
    //   .sort(null);

    var xDomain = x.domain(pitchingData.map(function(d) {
      return d.rank;
    }));

    var yDomain = y.domain([0, d3.max(pitchingData, function(d) {
      return d.wins;
    })]);

    // var displayedData = bar(this.props.data);

    return (
      <div>
        <svg width={width} height={height}>
          <g transform={'translate(0, ' + height + ')'}>
              <path
                fill={style}
                x={xDomain}
                y={yDomain}/>
          </g>
        </svg>
      </div>
    );
  }

}

const style = {
  color: '#CCC'
};

ReactDOM.render(
  <Chart data={pitchingData} />,
  document.getElementById('first-set')
);

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

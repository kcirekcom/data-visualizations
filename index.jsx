'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';


// LINECHART COMPONENT

class LineChart extends React.Component {
  render() {
    var data = require('./data/pitching-stats.json');

    console.log('data', data);

    let { width, height, stroke, fill, strokeWidth } = this.props;


    var x = d3.scaleLinear()
      .domain(d3.extent(data, function (d) {
        return d.rank;
      }))
      .range([0, width]);

    var y = d3.scaleLinear()
      .domain([0,d3.max(data,function(d){
        return d.wins;
      })])
      .range([height, 0]);

    var line = d3.line()
      .x(function (d) {
        return x(d.rank);
      })
      .y(function (d) {
        return y(d.wins);
      });

    return (
      <div>
        <svg id={this.props.chartId} width={width} height={height}>
          <g>
            <path stroke={stroke} strokeWidth={strokeWidth} fill={fill} d={line(data)}/>
          </g>
        </svg>
      </div>
    );
  }
}

LineChart.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  chartId: React.PropTypes.string,
  stroke: React.PropTypes.string,
  fill: React.PropTypes.string,
  strokeWidth: React.PropTypes.number
};

LineChart.defaultProps = {
  width: 800,
  height: 500,
  chartId: 'react-chart',
  stroke: 'blue',
  fill: 'none',
  strokeWidth: 3
};

ReactDOM.render(
  <LineChart/>,
  document.getElementById('first-set')
);

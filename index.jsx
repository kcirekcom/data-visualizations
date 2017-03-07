'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

// DOT COMPONENT

class Dots extends React.Component {
  render() {
    var _self= this;

    var data = this.props.data.splice(1);
    data.pop();

    var circles = data.map(function(d, i) {
      return (
        <circle r='7' cx={_self.props.x(d.rank)} cy={_self.props.y(d.wins)} fill="#7dc7f4" stroke="#3f5175" strokeWidth="5px" key={i}></circle>
      );
    });

    return (
      <g>
        {circles}
      </g>
    );
  }
}

Dots.propTypes = {
  data: React.PropTypes.array,
  x: React.PropTypes.func,
  y: React.PropTypes.func
};

// LINECHART COMPONENT

class LineChart extends React.Component {
  render() {
    var data = require('./data/pitching-stats.json');

    console.log('data', data);

    let { stroke, fill, strokeWidth } = this.props;

    var margin = {top: 50, right: 50, bottom: 50, left: 50},
      width = this.props.width - (margin.left + margin.right),
      height = this.props.height - (margin.top + margin.bottom);

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
      .curve(d3.curveCardinal)
      .x(function (d) {
        return x(d.rank);
      })
      .y(function (d) {
        return y(d.wins);
      });

    var transform ='translate(' + margin.left + ',' + margin.top + ')';

    return (
      <div>
        <svg id={this.props.chartId} width={this.props.width} height={this.props.height}>
          <g transform={transform}>
            <path strokeLinecap='round' stroke={stroke} strokeWidth={strokeWidth} fill={fill} d={line(data)}/>
            <Dots data={data} x={x} y={y}/>
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

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

var pitchingData = require('./data/pitching-stats.json');

console.log('pitchingData', pitchingData);

// LINE COMPONENT

class Line extends React.Component {
  render() {
    let { path, stroke, fill, strokeWidth } = this.props;
    return (
      <path
        d={path}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        />
    );
  }
}

Line.propTypes = {
  path: React.PropTypes.string.isRequired,
  stroke: React.PropTypes.string,
  strokeWidth: React.PropTypes.number
};

Line.defaultProps = {
  stroke: 'blue',
  fill: 'none',
  strokeWidth: 3,
};

// DATASERIES COMPONENT

class DataSeries extends React.Component {
  render() {
    let { data, colors, xScale, yScale, interpolationType } = this.props;

    let line = d3.line()
      .x((d) => { console.log('XSCALE', xScale(d.rank)); return xScale(d.rank); })
      .y((d) => { console.log(d); return yScale(d.wins); });

    let lines = data.map((series, id) => {
      return (
        <Line
          path={line(series)}
          stroke={colors(id)}
          key={id}
          />
      );
    });

    return (
      <g>
        <g>{lines}</g>
      </g>
    );
  }
}

DataSeries.propTypes = {
  colors: React.PropTypes.func,
  data: React.PropTypes.array,
  interpolationType: React.PropTypes.string,
};

DataSeries.defaultProps = {
  data: [],
  interpolationType: 'cardinal',
  colors: d3.scaleOrdinal(d3.schemeCategory10),
  xScale: React.PropTypes.func,
  yScale: React.PropTypes.func
};

// LINECHART COMPONENT

class LineChart extends React.Component {
  render() {
    let { width, height, data } = this.props;

    let xScale = d3.scaleOrdinal()
                   .domain(d3.range(data.length))
                   .range([0, width]);

    let yScale = d3.scaleLinear()
                   .range([0, height])
                   .domain([0, d3.max(data)]);

    return (
      <svg width={width} height={height}>
          <DataSeries
            xScale={xScale}
            yScale={yScale}
            data={pitchingData}
            width={width}
            height={height}
            />
      </svg>
    );
  }
}

LineChart.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  data: React.PropTypes.array.isRequired
};

LineChart.defaultProps = {
  width: 800,
  height: 500
};

ReactDOM.render(
  <LineChart
    data={pitchingData}
    width={800}
    height={500}
    />,
  document.getElementById('first-set')
);

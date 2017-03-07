'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

var pitchingData = require('./data/pitching-stats.json');

console.log('pitchingData', pitchingData);

// RECT COMPONENT

class Rect extends React.Component {
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

Rect.propTypes = {
  path: React.PropTypes.string.isRequired,
  stroke: React.PropTypes.string,
  fill: React.PropTypes.string,
  strokeWidth: React.PropTypes.number
};

Rect.defaultProps = {
  stroke: 'blue',
  fill: 'blue',
  strokeWidth: 3,
};

// DATASERIES COMPONENT

class DataSeries extends React.Component {
  render() {
    let { data, colors, xScale, yScale, interpolationType } = this.props;

    let rect = d3.line()
      .x((d) => { return xScale(d.rank); })
      .y((d) => { return yScale(d.wins); });

    let rects = data.map((series, id) => {
      return (
        <Rect
          path={rect(series)}
          fill={colors(id)}
          key={id}
          />
      );
    });

    return (
      <g>
        <g>{rects}</g>
      </g>
    );
  }
}

DataSeries.propTypes = {
  colors: React.PropTypes.func,
  data: React.PropTypes.array,
  interpolationType: React.PropTypes.string,
  xScale: React.PropTypes.func,
  yScale: React.PropTypes.func
};

DataSeries.defaultProps = {
  data: [],
  interpolationType: 'cardinal',
  colors: d3.scaleOrdinal(d3.schemeCategory10)
};

// BARCHART COMPONENT

class BarChart extends React.Component {
  render() {
    let { width, height, data } = this.props;

    let xScale = d3.scaleBand()
                   .domain(d3.range(data.length))
                   .range([0, width]);

    let yScale = d3.scaleLinear()
                   .range([height, 0])
                   .domain([0, d3.max(data, (d) => d.wins)]);

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

BarChart.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  data: React.PropTypes.array.isRequired
};

BarChart.defaultProps = {
  width:  800,
  height: 500
};

ReactDOM.render(
  <BarChart
    data={pitchingData}
    width={800}
    height={500}
    />,
  document.getElementById('first-set')
);

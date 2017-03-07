'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
// var LineTooltip = require('react-d3-tooltip').LineTooltip;

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
  stroke:       'blue',
  fill:         'blue',
  strokeWidth:  3
};

// DATASERIES COMPONENT

class DataSeries extends React.Component {
  render() {
    let { pitchingData, colors, xScale, yScale, interpolationType } = this.props;

    let rect = d3.svg.rect()
      .interpolate(interpolationType)
      .x((d) => { return xScale(d.rank); })
      .y((d) => { return yScale(d.wins); });

    let rects = pitchingData.map((series, id) => {
      return (
        <Line
          path={rect(series)}
          stroke={colors(id)}
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
  pitchingData: React.PropTypes.array,
  interpolationType: React.PropTypes.string,
  xScale: React.PropTypes.func,
  yScale: React.PropTypes.func
};

DataSeries.defaultProps = {
  pitchingData: [],
  interpolationType: 'cardinal',
  colors: d3.scaleOrdinal(d3.schemeCategory10)
};

// BARCHART COMPONENT

class BarChart extends React.Component {
  render() {
    let { width, height, pitchingData } = this.props;

    let xScale = d3.scaleBand()
                   .domain(d3.range(pitchingData.length))
                   .range([0, width]);

    let yScale = d3.scaleLinear()
                   .range([height, 0])
                   .domain([0, d3.max(pitchingData, (d) => d.wins)]);

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
  pitchingData: React.PropTypes.array.isRequired
};

BarChart.defaultProps = {
  width:  800,
  height: 500
};

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
// var LineTooltip = require('react-d3-tooltip').LineTooltip;

var pitchingData = require('./data/pitching-stats.json');

console.log('pitchingData', pitchingData);

// RECT COMPONENT

class Rect extends React.Component {
  constructor() {
    super();
  }

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
  data: React.PropTypes.object,
  interpolationType: React.PropTypes.string,
  xScale: React.PropTypes.func,
  yScale: React.PropTypes.func
};

DataSeries.defaultProps = {
  data: [],
  interpolationType: 'cardinal',
  colors: d3.scaleOrdinal(d3.schemeCategory10)
};

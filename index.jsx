'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
// var LineTooltip = require('react-d3-tooltip').LineTooltip;

var pitchingData = require('./data/pitching-stats.json');

console.log('pitchingData', pitchingData);

// BAR COMPONENT

class Bar extends React.Component {
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

Bar.propTypes = {
  path: React.PropTypes.string.isRequired,
  stroke: React.PropTypes.string,
  fill: React.PropTypes.string,
  strokeWidth: React.PropTypes.number
};

Bar.defaultProps = {
  stroke:       'blue',
  fill:         'blue',
  strokeWidth:  3
};

// DATASERIES COMPONENT

class DataSeries extends React.Component {

}

DataSeries.propTypes = {

};

DataSeries.defaultProps = {

};

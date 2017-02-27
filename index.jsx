'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var LineChart = require('react-d3-basic').LineChart;

(function() {

  var chartData = require('./data/pitching-stats.json');

  var width = 700,
    height = 300,
    margins = {left: 100, right: 100, top: 50, bottom: 50},
    title = 'User sample',
    chartSeries = [
      {
        field: 'BMI',
        name: 'BMI',
        color: '#ff7f0e'
      }
    ],
    x = function(d) {
      return d.index;
    };

  ReactDOM.render(
    <LineChart
      showXGrid={false}
      showYGrid={false}
      margins={margins}
      title={title}
      data={chartData}
      width={width}
      height={height}
      chartSeries={chartSeries}
      x={x}
    />
  , document.getElementById('line-user')
  );
})();

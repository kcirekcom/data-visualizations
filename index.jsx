'use strict';

// importing libraries
import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

// DOTS COMPONENT
class Dots extends React.Component {
  render() {

    var dots = this;

    // passing data in through props
    // setting up other props
    let { data, r, stroke, fill, strokeWidth } = this.props;

    // creating dots here after filtering data and extracting points
    var circles = data.map(function(d, i) {
      return (
        <circle
          r={r}
          cx={dots.props.x(d.rank)} cy={dots.props.y(d.ERA)}
          fill={fill}
          stroke={stroke} strokeWidth={strokeWidth}
          key={i}
          onMouseOver={dots.props.showToolTip} onMouseOut={dots.props.hideToolTip}
          data-key={d.name} data-value={d.ERA}></circle>
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
  y: React.PropTypes.func,
  r: React.PropTypes.number,
  stroke: React.PropTypes.string,
  fill: React.PropTypes.string,
  strokeWidth: React.PropTypes.number
};

Dots.defaultProps = {
  r: 5,
  stroke: '#3f5175',
  fill: '#7dc7f4',
  strokeWidth: 3
};

// AXIS COMPONENT
class Axis extends React.Component {
  componentDidUpdate() {
    this.renderAxis();
  }
  componentDidMount() {
    this.renderAxis();
  }

  renderAxis() {
    var node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.props.axis);
  }

  render() {
    var translate = 'translate(0,'+(this.props.height)+')';

    return (
      <g transform={this.props.axisType=='x'?translate:''}>
      </g>
    );
  }
}

Axis.propTypes = {
  height: React.PropTypes.number,
  axis: React.PropTypes.func,
  axisType: React.PropTypes.oneOf(['x', 'y'])
};

// GRID COMPONENT

class Grid extends React.Component {
  componentDidUpdate() {
    this.renderGrid();
  }
  componentDidMount() {
    this.renderGrid();
  }

  renderGrid() {
    var node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.props.grid);
  }

  render() {
    var translate = 'translate(0,'+(this.props.height)+')';

    return (
      <g transform={this.props.gridType=='x'?translate:''}>
      </g>
    );
  }
}

Grid.propTypes = {
  height: React.PropTypes.number,
  grid: React.PropTypes.func,
  gridType: React.PropTypes.oneOf(['x', 'y'])
};

// LINECHART COMPONENT
class LineChart extends React.Component {
  render() {

    // loading in data here
    var data = require('./data/pitching-stats.json');
    console.log('data', data);

    // setting up props
    let { stroke, fill, strokeWidth } = this.props;

    // setting margins, width and height of svg
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
        return d.ERA;
      })])
      .range([height, 0]);

    // drawing line here
    var line = d3.line()
      .curve(d3.curveCardinal)
      .x(function (d) {
        return x(d.rank);
      })
      .y(function (d) {
        return y(d.ERA);
      });

    // Axes and grid
    var yAxis = d3.axisLeft()
      .scale(y)
      .ticks(10);

    var xAxis = d3.axisBottom()
      .scale(x)
      .tickValues(data.map(function(d,i){
        if(i > 0)
          return d.rank;
      }).splice(1))
      .ticks(4);

    var yGrid = d3.axisLeft()
      .scale(y)
      .ticks(10)
      .tickSize(-width, 0, 0)
      .tickFormat('');

    var transform ='translate(' + margin.left + ',' + margin.top + ')';

    return (
      <div>
        <svg id={this.props.chartId} width={this.props.width} height={this.props.height}>
          <g transform={transform}>
            <Grid height={height} grid={yGrid} gridType="y"/>
            <path
              strokeLinecap='round' stroke={stroke} strokeWidth={strokeWidth} fill={fill}
              d={line(data)}/>
            <Dots
              data={data}
              x={x} y={y}
              showToolTip={this.showToolTip} hideToolTip={this.hideToolTip}/>
            <Axis height={height} axis={yAxis} axisType="y" />
            <Axis height={height} axis={xAxis} axisType="x"/>
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
  stroke: 'orange',
  fill: 'none',
  strokeWidth: 3
};

ReactDOM.render(
  <LineChart/>,
  document.getElementById('first-set')
);

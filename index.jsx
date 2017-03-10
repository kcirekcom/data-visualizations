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

// TOOLTIP COMPONENT
class ToolTip extends React.Component {
  render () {
    var visibility ='hidden';
    var transform ='';
    var x = 0;
    var y = 0;
    var width = 150, height = 70;
    var transformText='translate('+width/2+','+(height/2-5)+')';
    var transformArrow='';

    if(this.props.tooltip.display==true){
      var position = this.props.tooltip.pos;

      x = position.x;
      y = position.y;
      visibility ='visible';

      if (y > height){
        transform ='translate(' + (x-width/2) + ',' + (y-height-20) + ')';
        transformArrow ='translate('+(width/2-20)+','+(height-2)+')';
      } else if (y < height){
        transform ='translate(' + (x-width/2) + ',' + (Math.round(y)+20) + ')';
        transformArrow ='translate('+(width/2-20)+','+0+') rotate(180,20,0)';
      }

    } else {
      visibility ='hidden';
    }

    return (
        <g transform={transform}>
            <rect is width={width} height={height} rx="5" ry="5" visibility={visibility} fill="#6391da" opacity=".9"/>
            <polygon is points="10,0  30,0  20,10" transform={transformArrow}
                     fill="#6391da" opacity=".9" visibility={visibility}/>
            <text is visibility={visibility} transform={transformText}>
                <tspan is x="0" text-anchor="middle" font-size="15px" fill="#ffffff">{this.props.tooltip.data.key}</tspan>
                <tspan is x="0" text-anchor="middle" dy="25" font-size="20px" fill="#a9f3ff">{this.props.tooltip.data.value+' ERA'}</tspan>
            </text>
        </g>
    );
  }
}

ToolTip.propTypes = {
  tooltip: React.PropTypes.object
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

  constructor(props) {
    super(props);
    this.state = {
      tooltip:{ display:false,data:{key:'',value:''}},
      width:this.props.width
    };
  }

  showToolTip(e) {
    e.target.setAttribute('fill', '#FFFFFF');
    this.setState({tooltip:{
      display:true,
      data: {
        key:e.target.getAttribute('data-key'),
        value:e.target.getAttribute('data-value')
      },
      pos:{
        x:e.target.getAttribute('cx'),
        y:e.target.getAttribute('cy')
      }
    }});
  }

  hideToolTip(e) {
    e.target.setAttribute('fill', '#7dc7f4');
    this.setState({tooltip:{ display:false,data:{key:'',value:''}}});
  }

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

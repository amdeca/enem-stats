import React, {Component} from 'react';
import {Radar} from 'react-chartjs-2';

// Default chart parameters
const options = {
  
  legend: {
    display: true,
    position: 'top'
  },
  scale: {
    reverse: false,
    ticks: {
      beginAtZero: true,
      min: 400,
      max: 850,
      stepSize: 150
    },
    legend:{
      display: true,
      position:'left'
    },
  },
  maintainAspectRatio: false
}

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData: props.chartData,
    }
  }

  render(){
    return (
      <div className="radar-chart">
      <Radar data={this.state.chartData} options={options} height={400} width={150}></Radar>
      </div>
    )
  }
}

export default Chart;
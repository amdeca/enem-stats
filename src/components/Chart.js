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
      min: 450,
      max: 800,
      stepSize: 40
    },
    legend:{
      display: true,
      position:'left'
    },
    maintainAspectRatio: false
  }
}

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData: props.chartData,
    }
  }

  // static defaultProps = {
  //   displayTitle:true,
  //   displayLegend: true,
  //   legendPosition:'right',
  //   // location:'City'
  // }

  render(){
    return (
      <div>
      <Radar data={this.state.chartData} options={options} height={150} width={350}></Radar>
      <div className="container">
        <div className="row">
          {/* <Bar data={this.state.humanHistogram} height={50} width={200}></Bar> */}
          {/* <Bar data={this.state.chartData} height={50} width={200}></Bar>
          <Bar data={this.state.chartData} height={50} width={200}></Bar>
          <Bar data={this.state.chartData} height={50} width={200}></Bar>
          <Bar data={this.state.chartData} height={50} width={200}></Bar> */}

        </div>
      </div>
      </div>
    )
  }
}

export default Chart;
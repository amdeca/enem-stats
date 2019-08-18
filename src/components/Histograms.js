import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

// Default chart parameters
const options = {
  scales: {
    yAxes: [{
      barPercentage: 0.2,
      gridLines: {
        display: false
      },
      ticks: {
        min: 300,
        max: 900,
        stepSize: 300
      },
      // scaleLabel: {
      //   display: true,
      //   labelString: "Nota"
      // }
    }],
    xAxes: [{
      gridLines: {
        zeroLineColor: "black",
        zeroLineWidth: 2
      },
    }]
  },
  elements: {
    rectangle: {
      borderSkipped: 'left',
    }
  },
  mantainAspectRatio: false,
  chartArea: {
    backgroundColor: 'rgba(0, 85, 85, 0.4)'
  }
}

class Histograms extends Component{
  constructor(props){
    super(props);
    this.state = {
      school: props.school,
      apisLoaded: false
    }
  }
 
  componentDidMount(){
    this.getHistogram();
  }

  async getHistogram(){
    if(!this.state.apisLoaded){
      const histogramUrl = `https://enemstats-api.herokuapp.com/api/schools/year?name=${this.state.school.school_name}&state=${this.state.school.state}&city=${this.state.school.city}`
      const response = await fetch(histogramUrl);
      const histogramData = await response.json();

      const stateUrl = `https://enemstats-api.herokuapp.com/api/states?state=${this.state.school.state}`;
      const secondResponse = await fetch(stateUrl);
      const secondData = await secondResponse.json();
      
      var years = [], avgChs = [], avgNat = [], avgLang = [], avgMath = [], avgEssay = [];
      var avgChsState = [], avgNatState = [], avgLangState = [], avgMathState = [], avgEssayState = [];

      histogramData.results.forEach(element => {
        years.push(element.year);
        avgChs.push(element.avg_ch);
        avgNat.push(element.avg_cn);
        avgLang.push(element.avg_lc);
        avgMath.push(element.avg_math);
        avgEssay.push(element.avg_essay);
      });

      secondData.results.forEach(element => {
        avgChsState.push(element.avg_ch);
        avgNatState.push(element.avg_cn);
        avgLangState.push(element.avg_lc);
        avgMathState.push(element.avg_math);
        avgEssayState.push(element.avg_essay);
      });

      this.setState({
        humHistogram:{
          labels: years,
          datasets:[
            {
              label: 'Ciencias Humanas',
              backgroundColor: "rgb(51,166,204)",
              borderColor: "rgb(51,166,204)",
              data: avgChs
            },
            {
              label: 'Média Estadual',
              backgroundColor: "rgb(51,90,204)",
              borderColor: "rgb(51,90,204)",
              data: avgChsState
            }
          ]
        },

        natHistogram:{
          labels: years,
          datasets:[
            {
              label: 'Ciencias Naturais',
              backgroundColor: "rgb(204,51,90)",
              borderColor: "rgb(204,51,90)",
              data: avgNat
            },
            {
              label: 'Média Estadual',
              backgroundColor: "rgb(204,51,166)",
              borderColor: "rgb(204,51,166)",
              data: avgNatState
            }
          ]
        },

        langHistogram:{
          labels: years,
          datasets:[
            {
              label: 'Linguagens',
              backgroundColor: "rgb(51,204,127)",
              borderColor: "rgb(51,204,127)",
              data: avgLang
            },
            {
              label: 'Média Estadual',
              backgroundColor: "rgb(112,219,192)",
              borderColor: "rgb(112,219,192)",
              data: avgLangState
            }
          ]
        },

        mathHistogram:{
          labels: years,
          datasets:[
            {
              label: 'Matematica',
              backgroundColor: "rgb(235,174,67)",
              borderColor: "rgb(235,174,67)",
              data: avgMath
            },
            {
              label: 'Média Estadual',
              backgroundColor: "rgb(235,230,67)",
              borderColor: "rgb(235,230,67)",
              data: avgMathState
            }
          ]
        },

        essayHistogram:{
          labels: years,
          datasets:[
            {
              label: 'Redacao',
              backgroundColor: "rgb(132,67,235)",
              borderColor: "rgb(132,67,235)",
              data: avgEssay
            },
            {
              label: 'Média Estadual',
              backgroundColor: "rgb(216,67,235)",
              borderColor: "rgb(216,67,235)",
              data: avgEssayState
            }
          ]
        },
        
        apisLoaded: true
      });
    }
  }
  
  render(){
    if (!this.state.apisLoaded){
      return <div>Carregando...</div>
    }

    return (
      <div className="histograms">
        <div className="histogram">
          <Bar data={this.state.humHistogram} height={80} width={200} options={options}></Bar>
        </div>
        
        <div className="histogram">
          <Bar data={this.state.natHistogram} height={80} width={200} options={options}></Bar>
        </div>

        <div className="histogram">
          <Bar data={this.state.langHistogram} height={80} width={200} options={options}></Bar>
        </div>

        <div className="histogram">
          <Bar data={this.state.mathHistogram} height={80} width={200} options={options}></Bar>
        </div>

        <div className="histogram">
          <Bar data={this.state.essayHistogram} height={80} width={200} options={options}></Bar>
        </div>
      </div>
    )
  }
}

export default Histograms;
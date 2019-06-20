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
        max: 850,
        stepSize: 50
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
  mantainAspectRatio: false
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
              backgroundColor: "rgba(51,204,51,0.2)",
              borderColor: "rgba(51,204,51,0.2)",
              data: avgChs
            },
            {
              label: 'Média Estadual',
              backgroundColor: "rgba(204,0,51,0.2)",
              borderColor: "rgba(204,0,51,0.2)",
              data: avgChsState
            }
          ]
        },

        natHistogram:{
          labels: years,
          datasets:[
            {
              label: 'Ciencias Naturais',
              backgroundColor: "rgba(51,153,102,0.2)",
              borderColor: "rgba(51,153,102,0.2)",
              data: avgNat
            },
            {
              label: 'Média Estadual',
              backgroundColor: "rgba(204,0,51,0.2)",
              borderColor: "rgba(204,0,51,0.2)",
              data: avgNatState
            }
          ]
        },

        langHistogram:{
          labels: years,
          datasets:[
            {
              label: 'Linguagens',
              backgroundColor: "rgba(51,102,153,0.2)",
              borderColor: "rgba(51,102,153,0.2)",
              data: avgLang
            },
            {
              label: 'Média Estadual',
              backgroundColor: "rgba(204,0,51,0.2)",
              borderColor: "rgba(204,0,51,0.2)",
              data: avgLangState
            }
          ]
        },

        mathHistogram:{
          labels: years,
          datasets:[
            {
              label: 'Matematica',
              backgroundColor: "rgba(51,51,204,0.5)",
              borderColor: "rgba(51,51,204,0.5)",
              data: avgMath
            },
            {
              label: 'Média Estadual',
              backgroundColor: "rgba(204,0,51,0.2)",
              borderColor: "rgba(204,0,51,0.2)",
              data: avgMathState
            }
          ]
        },

        essayHistogram:{
          labels: years,
          datasets:[
            {
              label: 'Redacao',
              backgroundColor: "rgba(102,0,204,0.4)",
              borderColor: "rgba(102,0,204,0.4)",
              data: avgEssay
            },
            {
              label: 'Média Estadual',
              backgroundColor: "rgba(204,0,51,0.2)",
              borderColor: "rgba(204,0,51,0.2)",
              data: avgEssayState
            }
          ]
        },
        
        apisLoaded: true
      });

      // console.log("histograma")
      // console.log(this.state.mathHistogram)
    }
  }
  
  render(){
    if (!this.state.apisLoaded){
      return <div>Carregando...</div>
    }

    return (
      <div className="row">
        <Bar data={this.state.humHistogram} height={50} width={200} options={options}></Bar>
        <Bar data={this.state.natHistogram} height={50} width={200} options={options}></Bar>
        <Bar data={this.state.langHistogram} height={50} width={200} options={options}></Bar>
        <Bar data={this.state.mathHistogram} height={50} width={200} options={options}></Bar>
        <Bar data={this.state.essayHistogram} height={50} width={200} options={options}></Bar>
      </div>
    )
  }
}

export default Histograms;
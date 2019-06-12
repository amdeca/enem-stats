import React, {Component} from 'react';
import Chart from '../components/Chart';
import Histograms from '../components/Histograms';

export default class Schoolstats extends Component{
    constructor(){
        super();
        this.state = {
          loading: true,
          school: null,
          chartData:{},
        }
    }
    componentWillMount(){
      this.getChartData();
    }

    // componentDidMount(){
    //   this.getHistogram();
    //   // console.log(this.state.humHistogram);
    //   // this.getState();
    // }

    // WORK IN PROGRESS
    // async getState(){
    //   if(!this.state.loading){
    //     const stateUrl = `https://enemstats-api.herokuapp.com/api/states?state=${this.state.school.state}&year=${this.state.school.year}`;
    //     const response = await fetch(stateUrl);
    //     const stateData = await response.json();
    //     // console.log(stateData);
    //   }
    // }

    async getChartData(){
      // Ajax calls here
      const schoolId = window.location.pathname;
      const url = `https://enemstats-api.herokuapp.com/api${schoolId}`;
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ 
        school: data.results[0], 
        loading: false,
        chartData:{
          labels: [
            'Ciências Humanas', 
            'Ciências Naturais', 
            'Linguagens', 
            'Matemática', 
            'Redação'
          ],
          datasets:[
            {
              label:'Médias',
              backgroundColor: "rgba(200,100,0,0.6)",
              borderColor: "rgba(200,0,0,0.6)",
              // fill: true,
              radius: 4,
              pointBorderWidth: 2,
              data:[
                data.results[0].avg_ch,
                data.results[0].avg_cn,
                data.results[0].avg_lc,
                data.results[0].avg_mt,
                data.results[0].avg_essay
              ]
            }
          ]
        }
      });
    }

    render(){
      if (this.state.loading){
        return <div>Carregando...</div>
      }

      if(!this.state.chartData){
          return <div>Escola nao encontrada</div>
      }

      return(
        <div>
          <div className="school-info">
              <h3>{this.state.school.school_name}</h3>
              <h4>{this.state.school.city} - {this.state.school.state}</h4>
              <p>{this.state.school.type}</p>
              <h3>Estatisticas para o ano {this.state.school.year}</h3>

          </div>
          <Chart chartData={this.state.chartData}/>
          <Histograms school={this.state.school}/>
        </div>
      );    
    }
}
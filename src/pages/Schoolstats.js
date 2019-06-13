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

    async getChartData(){
      // Ajax calls here
      const schoolId = window.location.pathname;
      const url = `https://enemstats-api.herokuapp.com/api${schoolId}`;
      const response = await fetch(url);
      const data = await response.json();

      const school = data.results[0]
      const stateUrl = `https://enemstats-api.herokuapp.com/api/states?state=${school.state}&year=${school.year}`;
      const secondResponse = await fetch(stateUrl);
      const secondData = await secondResponse.json();

      const natUrl = `https://enemstats-api.herokuapp.com/api/national?year=${school.year}`;
      const thirdResponse = await fetch(natUrl);
      const thirdData = await thirdResponse.json();

      // console.log(school)
      // console.log("segunda requisicao")
      // console.log(stateUrl)
      // console.log("resposta")
      console.log(secondData)

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
              backgroundColor: "rgba(204,0,51,0.2)",
              borderColor: "rgba(204,0,51,0.2)",
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
            },

            {
              label:'Média Estadual',
              backgroundColor: "rgba(51,0,204,0.4)",
              borderColor: "rgba(51,0,204,0.4)",
              // fill: true,
              radius: 4,
              pointBorderWidth: 2,
              data:[
                secondData.results[0].avg_ch,
                secondData.results[0].avg_cn,
                secondData.results[0].avg_lc,
                secondData.results[0].avg_math,
                secondData.results[0].avg_essay
              ]
            },

            {
              label:'Média Nacional',
              backgroundColor: "rgba(204,0,51,0.4)",
              borderColor: "rgba(204,0,51,0.4)",
              // fill: true,
              radius: 4,
              pointBorderWidth: 2,
              data:[
                thirdData.results[0].avg_ch,
                thirdData.results[0].avg_cn,
                thirdData.results[0].avg_lc,
                thirdData.results[0].avg_math,
                thirdData.results[0].avg_essay
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
        <div className="container">
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
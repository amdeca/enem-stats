import React, {Component} from 'react';
import Chart from '../components/Chart';

export default class Schoolstats extends Component{
    constructor(){
        super();
        this.state = {
          loading: true,
          school: null,
          chartData:{}
        }
    }

    componentDidMount(){
        this.getChartData();
    }

    async getChartData(){
        // Ajax calls here
        const schoolId = window.location.pathname;
        const url = `https://enemstats-api.herokuapp.com/api${schoolId}`;
        const response = await fetch(url);
        const data = await response.json();
        //console.log(data.results[0].avg_cn)
        this.setState({ school: data.results[0], loading: false,
          chartData:{
            labels: ['Ciências Humanas', 'Ciências Naturais', 'Linguagens', 'Matemática', 'Redação'],
            datasets:[
              {
                label:'Nota',
                data:[
                  data.results[0].avg_ch,
                  data.results[0].avg_cn,
                  data.results[0].avg_lc,
                  data.results[0].avg_mt,
                  data.results[0].avg_essay,
                ],
                backgroundColor:[
                  'rgba(135, 178, 242, 1)',
                  'rgba(120, 159, 217, 1)',
                  'rgba(107, 142, 194, 1)',
                  'rgba(107, 142, 194, 1)',
                  'rgba(96, 127, 175, 1)'
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
                </div>
                <div className="year-grades">
                    <h3>Estatisticas para o ano {this.state.school.year}</h3>
                    <Chart chartData={this.state.chartData}/>
                </div>
            </div>
        );       
    }
}
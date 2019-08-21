import React, {Component} from 'react';
import Chart from '../components/Chart';
import Histograms from '../components/Histograms';
// import Navigation from '../components/Navigation';
import './styles/Schoolstats.css';
//Material UI
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
//Localize
import t from '../languages/locale';

//Styles
const style = {
  Paper: {padding: 20, marginTop: 10, marginBottom: 10 }
}

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

      this.setState({ 
        school: data.results[0],
        loading: false,
        chartData:{
          labels: [
            t('humanSciences'), 
            t('natSciences'), 
            t('languages'), 
            t('math'), 
            t('essay')
          ],
          datasets:[
            {
              label:t('averages'),
              backgroundColor: "rgba(179, 204, 255,0.3)",
              borderColor: "rgba(179, 204, 255,0.9)",
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
              label: t('stateAverages'),
              backgroundColor: "rgba(51, 119, 255, 0.3)",
              borderColor: "rgba(51, 119, 255, 0.9)",
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
              label:t('nationalAverages'),
              backgroundColor: "rgba(0, 43, 128, 0.4)",
              borderColor: "rgba(0, 43, 128, 0.9)",
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
        <div className="wrapper">
          <Grid container direction="column" justify="space-evenly" alignItems="stretch">
            <Grid item xs={8} sm={10} md={10} lg={12}>
              <Paper style={style.Paper}>

                <h3>{this.state.school.school_name}</h3>
                <h4>{this.state.school.city}, {this.state.school.state}</h4>                
                <h5>{ t(String(this.state.school.type))}</h5>
                <h5>{t('year') + " " + this.state.school.year}</h5>

              </Paper>
              <Chart chartData={this.state.chartData}/>
              <Histograms school={this.state.school}/>
            </Grid>
          </Grid>
        </div>
      );    
    }
}
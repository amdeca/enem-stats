import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    
    async componentDidMount(){
        const schoolId = window.location.pathname;
        const url = `https://enemstats-api.herokuapp.com/api${schoolId}`;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ 
            loading: false,
            data: {
                labels: ["Media CN","Media MT","Media Redacao"],
                datasets: [
                    {
                        data: [
                            data.results[0].avg_cn,
                            data.results[0].avg_mt,
                            data.results[0].avg_essay
                        ]
                    }
                ]
            } 
        });
    }
    
    render(){
        return (
            <Bar data= {this.state.data}/>
        )
    }
}

export default Chart;

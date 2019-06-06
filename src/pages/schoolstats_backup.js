import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

export default class Schoolstats extends Component{
    state = {
        loading: true,
        school: null
    };

    async componentDidMount(){
        const schoolId = window.location.pathname;
        const url = `https://enemstats-api.herokuapp.com/api${schoolId}`;
        //const url = "http://enemstats-api.herokuapp.com/api/schools/5ce6eae87e06c8d09d014ee8"
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ school: data.results[0], loading: false });
    }

    render(){
        if (this.state.loading){
            return <div>Carregando...</div>
        }

        if(!this.state.school){
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
                    
                </div>
            </div>
        );       
    }
}

// <div key={this.props.school.id}>
//                 <h4>{this.props.school.name}, {this.props.school.state}</h4>
//                 <p>{this.props.school.type}</p>
//             </div>
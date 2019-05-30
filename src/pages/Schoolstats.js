import React, {Component} from 'react';
//import api from '../../api/api';

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
        //console.log(data.result[0])
    }

    render(){
        return (
            <div>
                {this.state.loading || !this.state.school ? ( <div>Carregando</div>) : 
                (
                    <div>
                        <h3>{this.state.school.school_name}</h3>
                        <h4>{this.state.school.city} - {this.state.school.state}</h4>
                        <p>{this.state.school.type}</p>
                        <p>{this.state.school.avg_ch}</p>
                        <p>{this.state.school.avg_cn}</p>
                        <p>{this.state.school.avg_lc}</p>
                        <p>{this.state.school.avg_mt}</p>
                        <p>{this.state.school.avg_essay}</p>
                    </div>
                )}
            </div>
        );
    }
}

// <div key={this.props.school.id}>
//                 <h4>{this.props.school.name}, {this.props.school.state}</h4>
//                 <p>{this.props.school.type}</p>
//             </div>
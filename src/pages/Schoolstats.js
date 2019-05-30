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
        this.setState({ school: data.result[0], loading: false });
        //console.log(data.result[0])
    }

    render(){
        return (
            <div>
                {this.state.loading || !this.state.school ? ( <div>Carregando</div>) : 
                (
                    <div>
                        <div>{this.state.school.ESCOLA}</div>
                        <div>{this.state.school.TIPOESCOLA}</div>
                        <div>{this.state.school.REGIAO}</div>
                        <div>{this.state.school.NU_ANO}</div>
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
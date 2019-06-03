import React, {Component} from 'react';
//import api from '../../api/api';
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
        return (
            <div>
                {this.state.loading || !this.state.school ? ( <div>Carregando</div>) : 
                (
                    <div>
                        <h1>{this.state.school.year}</h1>
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

//OBJETIVOS:
// 1. GRAFICO COM MEDIAS DO ANO SELECIONADO
// 2. GRAFICO COM HISTORICO DE MEDIAS
// 3. INCLUIR MEDIA MUNICIPAL, ESTADUAL E NACIONAL
// 4. SECAO DE DADOS SOCIAIS: % DE RACA E GENERO DA ESCOLA

// PERGUNTAS A SEREM RESPONDIDAS:
//1. DIFERENCA DE MEDIA ENTRE OS ANOS
//2. QUAIS SAO OS ESTADOS QUE TEM OS MELHORES ALUNOS E OS PIORES
//3. HA DIFERENCAS ENTRE MEDIA DE RACAS OU GENEROS?
//4. MEDIA NACIONAL E DO ESTADO COMPARADO COM A ESCOLA
//5. MEDIA ESCOLA PUBLICA VERSUS ESCOLA PRIVADA

// <div key={this.props.school.id}>
//                 <h4>{this.props.school.name}, {this.props.school.state}</h4>
//                 <p>{this.props.school.type}</p>
//             </div>
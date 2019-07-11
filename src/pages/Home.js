import React, { Component } from 'react';
import './styles/Home.css';
import SchoolRow from '../components/SchoolRow.js';
import $ from 'jquery';
import Jumbotron from 'react-bootstrap/Jumbotron';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear : 2017
    };
    this.searchSchool();
  }

  searchSchool(searchTerm, searchYear){
    var searchYear = this.state.currentYear;
    const urlString = `https://enemstats-api.herokuapp.com/api/schools?q=${searchTerm}&year=${searchYear}`;
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        const results = searchResults.results
      
        var schoolRows = [];
        results.forEach((school) => {
          const schoolRow = <SchoolRow key={school._id} school={school}/>;
          schoolRows.push(schoolRow);
        });

        this.setState({ rows: schoolRows});
      },
      error: (xhr, status, err) => {
        this.setState({ rows: err});
        console.error("Failed!!!!");
      }
    });
  }

  // Trying to make results reload after new year is selected, get Maximum update depth exceeded
  // componentWillUpdate(){
  //   this.yearFilterHandler();
  // }

  searchChangeHandler(event){
    const boundObject = this;
    const searchTerm = event.target.value;
    boundObject.searchSchool(searchTerm);
  }
 
  yearFilterHandler(){
    this.setState({ currentYear : this.refs.yearSelector.value });
    // console.log(this.refs.yearSelector.value);
  }

  render() {
    return (
      <div className="Home">
        <nav className="title-bar">
          <h3>Enemstats</h3>
          {/* <a href="/about">Sobre</a> */}
        </nav>


        <Jumbotron className="text-center" id="jumbo">
          <h1>Bem vindo ao Enemstats</h1>
          <p>
            Veja as notas de todas as escolas do Brasil
          </p>
        </Jumbotron>

        {/* Results listing */}
        <div id="results-body">
          <div className="search-bar">
            <input className="school-search" placeholder="Buscar Escola" onChange={this.searchChangeHandler.bind(this)}/>               
              <select ref="yearSelector" value={this.state.currentYear} onChange={ (e) => { this.yearFilterHandler(); } }>
                <option value={2017}>2017</option>
                <option value={2016}>2016</option>            
                <option value={2015}>2015</option>
                <option value={2014}>2014</option>
                <option value={2013}>2013</option>
                <option value={2012}>2012</option>
                <option value={2011}>2011</option>
                <option value={2010}>2010</option>
                <option value={2009}>2009</option>
              </select>
          </div>
          
          <div id="result-div" className="text-center">
            {this.state.rows}
          </div>
        </div>
        
      </div>
    );
  }
}

export default Home;

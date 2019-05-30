import React, { Component } from 'react';
import './styles/Home.css';
import SchoolRow from '../components/SchoolRow.js';
import $ from 'jquery';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.searchSchool();
  }

  searchSchool(searchTerm, searchYear){
    
    //How to change year values?
    var searchYear = 2015;
    const urlString = `https://enemstats-api.herokuapp.com/api/schools?q=${searchTerm}&year=${searchYear}`
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        const results = searchResults.result
      
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

  searchChangeHandler(event){
    const boundObject = this;
    const searchTerm = event.target.value;
    boundObject.searchSchool(searchTerm);
  }

  yearFilterHandler(event){
    //const boundObject = this;
    const searchYear = event.target.value;
    //this.state.year = setState(searchYear);
  }

  stateFilterHandler(event){
    
  }

  render() {
    return (
      <div className="Home">
        <table className="title-bar">
          <tbody>
            <tr>
              <td>
                Logo
              </td>
              <td>
                <h3>Enemviz</h3>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="search-bar">
          <tr>
            <td>
              <input className="school-search" placeholder="Buscar Escola" onChange={this.searchChangeHandler.bind(this)}/>
            </td>
            <td>
              <DropdownButton id="dropdown-basic-button" title="Ano" onChange={this.yearFilterHandler.bind(this)}>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
            </td>
            {/* <td>
              <DropdownButton id="dropdown-basic-button" title="Estado">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
            </td> */}
          </tr>
        </div>

        {/* exibiçao dos resultados */}
        <div id="result-div">
          {this.state.rows}
        </div>
      </div>
    );
  }
}

export default Home;

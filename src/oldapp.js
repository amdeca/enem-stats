import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SchoolRow from './SchoolRow.js';
import $ from 'jquery';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.searchSchool();
  }

  searchSchool(searchTerm){
    console.log("searching for schools");
    const urlString = "https://enemstats-api.herokuapp.com/api/schools?q="+ searchTerm +"&year=2011";
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

  render() {
    return (
      <div className="App">
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

        <div>
          <tr>
            <td>
              <input className="school-search" placeholder="Buscar Escola" onChange={this.searchChangeHandler.bind(this)}/>
            </td>
            <td>
              <DropdownButton id="dropdown-basic-button" title="Ano">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
            </td>
            <td>
              <DropdownButton id="dropdown-basic-button" title="Estado">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
            </td>
          </tr>
        </div>

        <div id="result-div">
          {this.state.rows}
        </div>
      </div>
    );
  }
}

export default App;

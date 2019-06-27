import React, { Component } from 'react';
import './styles/Home.css';
import SchoolRow from '../components/SchoolRow.js';
import $ from 'jquery';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear : 2017
    };
    this.searchSchool();
  }

  searchSchool(searchTerm, searchYear){
    // DEBUG
    // var searchYear = 2017;
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
        <table className="title-bar">
          <tbody>
            <tr>
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
              {/* <DropdownButton id="dropdown-basic-button" title="Ano" onChange={ (e) => {this.yearFilterHandler();}}>
                <Dropdown.Item>2012</Dropdown.Item>
                <Dropdown.Item>2013</Dropdown.Item>
                <Dropdown.Item>2014</Dropdown.Item>
              </DropdownButton> */}
              
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
            </td>
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

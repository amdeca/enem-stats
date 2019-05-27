import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SchoolRow from './SchoolRow.js';
import $ from 'jquery';


class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {}
    //Dummy data while API is not in place
    // const schools = [
    //   {id: 0, name: "CEI DOS PLAY", uf: "RN", owner: "Privada"},
    //   {id: 1, name: "IF DOS BICHAO", uf: "RN", owner: "Federal"},
    //   {id: 2, name: "MARISTA DAS ELITE", uf: "RN", owner: "Privada"},
    //   {id: 3, name: "FLOCA", uf: "RN", owner: "Publica"},
    //   {id: 4, name: "CHUCHU", uf: "RN", owner: "Publica"},
    //   {id: 5, name: "IMA", uf: "RN", owner: "Publica"}

    // ]
    
    // var schoolRows = []
    // schools.forEach( (school) => {
    //   const schoolRow = <SchoolRow school={school} />
    //   schoolRows.push(schoolRow);
    // })

    // this.state = {rows: schoolRows}
    this.searchSchool();
  }

  searchSchool(searchTerm){
    console.log("searching for schools");
    const urlString = "https://enemstats-api.herokuapp.com/api/schools?q="+ searchTerm +"&year=2011";
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("it worked!");
        //console.log(searchResults);
        const results = searchResults.result
        //console.log(results[0])
      
        var schoolRows = [];
        results.forEach((school) => {
          //console.log(school.ESCOLA);
          const schoolRow = <SchoolRow key={school._id} school={school}/>;
          schoolRows.push(schoolRow);
        });

        this.setState({ rows: schoolRows});
      },
      error: (xhr, status, err) => {
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

        <input className="school-search" placeholder="Buscar Escola" onChange={this.searchChangeHandler.bind(this)}>
        </input>
        <div id="result-div">
          {this.state.rows}
        </div>
      </div>
    );
  }
}

export default App;

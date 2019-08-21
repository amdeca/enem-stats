import React, { Component } from 'react';
import $ from 'jquery';
import SchoolRow from '../components/SchoolRow.js';
import t from '../languages/locale';

//Material UI
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const style = {
  Paper: {padding: 20, marginTop: 10, marginBottom: 10 }
}

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   margin: {
//     margin: theme.spacing(1),
//   },
//   textField: {
//     flexBasis: 200,
//   },
// }));

// const ranges = [
//   {
//     value: '0-20',
//     label: '0 to 20',
//   },
//   {
//     value: '21-50',
//     label: '21 to 50',
//   },
//   {
//     value: '51-100',
//     label: '51 to 100',
//   },
// ];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear : 2017
    };
    // this.searchSchool();
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
          const schoolRow = <SchoolRow key={school.id} school={school}/>;
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
 
  yearFilterHandler = (event) => {
    this.setState({ currentYear : event.target.value });
  }

  render() {
    return (
      <Grid container direction="column" justify="center" alignItems="stretch">
        <Grid item xs={6} sm={10} md={12} lg={12} justify="center">
          <Paper style={style.Paper} >
            <TextField
              id="standard-full-width"
              style={{ margin: 8 }}
              placeholder={t('searchbar')}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              className="school-search"
              onChange={this.searchChangeHandler.bind(this)}
              style={{width: 150, marginRight: 30}}
            />

            <FormControl>
              <InputLabel htmlFor="year">
                Year
              </InputLabel>
              <Select ref="yearSelector" value={this.state.currentYear} onChange={ this.yearFilterHandler } >
                <MenuItem value={2017}>2017</MenuItem>
                <MenuItem value={2016}>2016</MenuItem>
                <MenuItem value={2015}>2015</MenuItem>
                <MenuItem value={2014}>2014</MenuItem>
                <MenuItem value={2013}>2013</MenuItem>
                <MenuItem value={2012}>2012</MenuItem>
                <MenuItem value={2011}>2011</MenuItem>
                <MenuItem value={2010}>2010</MenuItem>
                <MenuItem value={2009}>2009</MenuItem>
              </Select>
            </FormControl>
            
            {/* <select ref="yearSelector" value={this.state.currentYear} onChange={ (e) => { this.yearFilterHandler(); } }>
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
             */}

          </Paper>

          {this.state.rows}
        </Grid>
      </Grid>   
    );
  }
}

export default Home;

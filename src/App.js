import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
//Pages
import Home from './pages/Home.js';
import Ranking from './pages/Ranking.js';
import Schoolstats from './pages/Schoolstats.js';
//Components
import Navbar from './components/Navbar';
//Material UI
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
	palette: {
		primary: {
		  	main: '#42a5f5',
			contrastText: '#fff'
		},
		secondary: {
		  	main: '#42a5f5',
			contrastText: '#fff'
		},
	},
});

class App extends Component {

	render () {
		return (
			<MuiThemeProvider theme={theme}>
				<Router>				
				<Navbar/>
					<div className="container">
						<Switch>
							<Route exact path="/" component={Home}/>
							<Route path="/ranking" component={Ranking}/>
							<Route path="/schools/:id" component={Schoolstats}/>						
						</Switch>
					</div>
				</Router>
			</MuiThemeProvider>			
		);
	}
}

export default App;
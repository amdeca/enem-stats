import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home.js'
import About from './pages/About.js'
import Schoolstats from './pages/Schoolstats.js'

class App extends Component {
	render () {
		return (
			<React.Fragment>
				<Router>
					<Switch>
						<Route exact path="/" component={Home}/>
						<Route path="/about" component={About}/>
						<Route path="/escolas/:id" component={Schoolstats}/>						
					</Switch>
				</Router>
			</React.Fragment>
		);
	}
}

export default App;
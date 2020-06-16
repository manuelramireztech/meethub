import React, { Component } from 'react'
import Video from './Video'
import Home from './Home'
import Registration from './registrationForm'
import Login from './loginForm'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<div>
				<Router>
					<Switch>
						<Route path="/" exact component={Login} />
						<Route path="/Registration" component={Registration} />
						<Route path="/Home" component={Home} />
						<Route path="/:url" component={Video} />
					</Switch>
				</Router>
			</div>
		)
	}
}

export default App;
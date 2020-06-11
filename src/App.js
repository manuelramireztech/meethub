import React, { Component } from 'react'
import Video from './Video'
import Home from './Home'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<div>
				<Router>
					{/* <Link to="/">home</Link>
					<Link to="/:url"></Link> */}
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/:url" component={Video} />
					</Switch>
				</Router>
			</div>
		)
	}
}

export default App;
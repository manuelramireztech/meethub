import React, { Component } from 'react';
import { Input, Button } from '@material-ui/core';
import "./Home.css"


class Home extends Component {
  	constructor (props) {
		super(props)
		this.state = {
			url: ''
		}
	}

	handleChange = (e) => {
		this.setState({
			url: e.target.value
		})
	}

	join = () => {
		if (this.state.url !== "") {
			if (this.state.url.includes(window.location.href) || this.state.url.includes(window.location.href.substring(8, window.location.href.length))) {
				window.location.href = this.state.url
			}
			window.location.href = `/${this.state.url}`
		} else {
			var url = Math.random().toString(36).substring(2, 7)
			window.location.href = `/${url}`
		}
	}

	render() {
		return (
			<div className="homecontainer">
				<div>
					<h1 style={{ fontSize: "45px", marginBottom: "20px" }}>meethub</h1>
					<p style={{ fontWeight: "200" }}>Video call application with react and node.</p>
				</div>

				<div style={{
					background: "#232323", color:"#fff", width: "30%", height: "auto", padding: "20px", minWidth: "400px",
					textAlign: "center", margin: "auto", marginTop: "100px"
				}}>
					<p style={{ marginBottom: "20px" , paddingRight: "50px" }}>Start or join a video call</p>
					<Input placeholder="Create a URL to meet" onChange={e => this.handleChange(e)} />
					<Button variant="contained" color="primary" onClick={this.join} style={{ margin: "20px" }}>Go</Button>
				</div>
			</div>
		)
	}
}


export default Home;
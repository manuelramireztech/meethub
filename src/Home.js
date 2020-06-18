import React, { Component } from 'react';
import { Input, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import "./Home.css"
import IconButton from '@material-ui/core/IconButton';
import Duo from '@material-ui/icons/Duo';


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
					<h1 style={{ fontSize: "45px", marginBottom: "20px" , marginTop: "20px" }}><IconButton style={{ color: "#ffffff",fontSize: "45px !important", backgroundColor: "#5867dd"}}>
					<Duo />
					</IconButton> meethub</h1>
					<p style={{ fontWeight: "200" }}>Peer to Peer Video call application.</p>
				</div>
				<p style={{ fontWeight: "200", marginTop: "50px" }}>Welcome to MeetHub!</p>

				<div style={{
					background: "#1d1d1d", color:"#fff", width: "30%", height: "auto", padding: "20px", minWidth: "200px",
					textAlign: "center", margin: "auto", marginTop: "40px"
				}}>
					<p style={{ marginBottom: "30px"}}>Start or join a video call</p>
      
					
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="filled"
                required
                fullWidth
                id="firstName"
                label="Create a URL to meet"
			    onChange={e => this.handleChange(e)}
                autoFocus
              />
			</Grid>
			<Button style={{
					 marginTop: "30px"
				}}
            type="submit"
            fullWidth
            variant="contained"
						color="primary"
						onClick={this.join}
          >
            Join now
          </Button>
		    </div>
			</div>
			
		)
	}
}


export default Home;
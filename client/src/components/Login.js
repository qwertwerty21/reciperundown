import React, {Component} from 'react';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class Login extends Component{

	constructor(props){
		super(props)
	}

	render(){

		return(
			
			<form>
				<Card>
					<h2>Login</h2>
					<CardText>
						<TextField floatingLabelText='Username'></TextField>
						<br/>
						<TextField floatingLabelText='Password' type='password'></TextField>

					</CardText>
					<RaisedButton primary={true} label='Login'></RaisedButton>
				</Card>
			</form>			



		)
	}
}


export default Login;
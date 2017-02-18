import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {registerUser} from '../actions/';

import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class Register extends Component{

	constructor(props){
		super(props)

		this.state = {
			name: '',
			password: '',
			err_name: null,
			err_password: null
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleTextChange = (inputElement, e)=>{
		let newState = Object.assign({}, this.state);
		newState[inputElement] = e.target.value;
		this.setState(newState);
	}

	handleSubmit = (e) =>{
		e.preventDefault();
		console.log('Submitted', this.state)
		this.props.registerUser({
			name: this.state.name,
			password: this.state.password
		});
	}

	render(){

		return(
			
			<form onSubmit={this.handleSubmit}>
				<Card>
					<h2>Register</h2>
					<CardText>
						<TextField
							errorText={this.state.err_name} 
							floatingLabelText='Username'
							value={this.state.name}
							onChange={this.handleTextChange.bind(this, 'name')}
						>
						</TextField>
						<br/>
						<TextField
							errorText={this.state.err_password}
							floatingLabelText='Password'
							value={this.state.password}
							type='password'
							onChange={this.handleTextChange.bind(this, 'password')}
						>
						</TextField>

					</CardText>
					<RaisedButton primary={true} label='Register' type='submit'></RaisedButton>
				</Card>
			</form>			



		)
	}
}

function mapStateToProps( state ){
	return {registered: state.users.registeredUser}
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators( {registerUser: registerUser}, dispatch );
}

export default connect(mapStateToProps, mapDispatchToProps )( Register );
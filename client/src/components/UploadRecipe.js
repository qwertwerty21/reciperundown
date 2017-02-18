import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//import { browserHistory } from 'react-router';

import { createRecipePost } from '../actions/';

import Dropzone from 'react-dropzone';

import LinearProgress from 'material-ui/LinearProgress';
import Dialog from 'material-ui/Dialog';

import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';


//fill SelectField for Cook/Prep Times
let timeItems = [];
timeItems.push(<MenuItem value={`None Needed`} key={`None Needed`} primaryText={`None Needed`}></MenuItem>);
for( let i = 5; i < 60; i+=5 ){
	timeItems.push(<MenuItem value={`${i} Minutes`} key={`${i} Minutes`} primaryText={`${i} Minutes`}></MenuItem>);
}
timeItems.push(<MenuItem value={`1 Hour`} key={`1 Hour`} primaryText={`1 Hour`}></MenuItem>);
for( let j = 2; j < 13; j++){
	timeItems.push(<MenuItem value={`${j} Hours`}  key={`${j} Hours`} primaryText={`${j} Hours`}></MenuItem>);
}
timeItems.push(<MenuItem value={`12+ Hours`} key={`12+ Hours`} primaryText={`12+ Hours`}></MenuItem>);
timeItems.push(<MenuItem value={`1 Day`} key={`1 Day`} primaryText={`1 Day`}></MenuItem>);
timeItems.push(<MenuItem value={`2 Days`} key={`2 Days`} primaryText={`2 Days`}></MenuItem>);
timeItems.push(<MenuItem value={`3 Days`} key={`3 Days`} primaryText={`3 Days`}></MenuItem>);
timeItems.push(<MenuItem value={`3+ Days`} key={`3+ Days`} primaryText={`3+ Days`}></MenuItem>);

//fill SelectField for Recipe Yield
let yieldItems = [];
for( let m = 1; m < 11; m++){
	yieldItems.push(<MenuItem value={`${m} Servings`} key={`${m} Servings`} primaryText={`${m} Servings`}></MenuItem>);
}
yieldItems.push(<MenuItem value={`>10 Servings`} key={`>10 Servings`} primaryText={`10+ Servings`}></MenuItem>);
yieldItems.push(<MenuItem value={`>20 Servings`} key={`>20 Servings`} primaryText={`20+ Servings`}></MenuItem>);

class UploadRecipe extends Component{
	
	constructor(props){
		super(props)

		this.state = {
			showDropzone: true,
			file: null,
			recipe_gif: '',
			prep_time: '',
			cook_time: '',
			recipe_yield: '',
			recipe_title: '',
			recipe_description: '',
			recipe_ingredients: '',
			recipe_instructions: '',
			err_recipe_gif: null,
			err_recipe_title: null, 
			err_recipe_description: null,
			err_recipe_ingredients: null,
			err_recipe_instructions: null

		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	dialogActions = [
		<RaisedButton
        label='Try Again'
        primary={true}
        onTouchTap={ ()=> {window.location.reload()} } //refresh page
     />
	];

	// converts blob to base64
	blobToBase64 = (blob, cb) => {
	  let reader = new FileReader();
	  //.onload event triggered each time the reading operation is done 
	  reader.onload = () => {
	    let dataUrl = reader.result;
	    //split to get base64 part only 
	    let base64 = dataUrl.split(',')[1];
	    //run callback on the base64 encoded string
	    cb(base64);
	  };
	  //readAsDataURl Starts reading the contents of the specified Blob, once finished, the result attribute contains a data: URL representing the file's data.
	  reader.readAsDataURL(blob);
	};
	

	onDrop = (file) => {
		
		this.blobToBase64(file[0], (base64) => {
			//make a copy of state
			let newState = Object.assign({}, this.state);
			//assign dropzone File object to newstate so the user can see the preview of the gif
			newState['file'] = file[0];
			//assign the encoded base64 string to newstate recipegif to be sent to backend and be decoded and saved
			newState['recipe_gif'] = base64;
			//hide dropzone
			newState['showDropzone'] = !this.state.showDropzone;
			console.log('newstate', newState);
			//set state 
			this.setState(newState);

		})

	}

	handleTextChange = (inputElement, e) => {

		let newState = Object.assign({}, this.state);
		
		//update Error text fields (remove errorText when user enters a value)
		let errTextField = `err_${inputElement}`;

		if(e.target.value && newState[errTextField] !== null){
			newState[errTextField] = null;
		}

		newState[inputElement] = e.target.value;
		this.setState(newState);
	}

	handleSelectChange = (inputElement, e, index , value) => {
		let newState = Object.assign({}, this.state);
		newState[inputElement] = value;
		this.setState(newState);
	}

	makeArrayFromString = ( string ) => {
		return string.split('\n')
	}

	checkIfEmpty = (reqFieldsObj) => {
		let errors = {};

		for(var keys in reqFieldsObj){
			if(!reqFieldsObj[keys]){
				errors[keys] = 'Required';
			}
		}

		return errors;
	}

	// showLoadingSpinner = ()=>{
	// 	let newState = Object.assign({}, this.state);
	// 	newState['loading'] = true;
	// 	this.setState(newState);
	// }
	
	handleSubmit = (e) => {
		e.preventDefault();
		const { file, recipe_gif, prep_time, cook_time, recipe_yield, recipe_title, recipe_description, recipe_ingredients, recipe_instructions  } = this.state;
		
		//validate

		let requiredFields = {
			recipe_gif: recipe_gif,
			recipe_title: recipe_title,
			recipe_description: recipe_description,
			recipe_ingredients: recipe_ingredients,
			recipe_instructions: recipe_instructions
		};

		let emptyFields = this.checkIfEmpty(requiredFields);

		if( Object.keys(emptyFields).length > 0){
			console.log('Error', emptyFields);
			const newState = Object.assign({}, this.state);

			for(let keys in emptyFields){
				
				//TO DO ADD ERROR TEXT
				var errField = `err_${keys}` 
				newState[errField] = 'This is a required field.'
				
			}
			this.setState(newState);
			return false;
		}


		let arr_recipe_ingredients = this.makeArrayFromString(recipe_ingredients);
		let arr_recipe_instructions = this.makeArrayFromString(recipe_instructions);
		
		// this.showLoadingSpinner();
		this.props.createRecipePost({
			
			recipe_gif: recipe_gif,
			prep_time: prep_time,
			cook_time: cook_time,
			recipe_yield: recipe_yield,
			recipe_title: recipe_title,
			recipe_description: recipe_description,
			recipe_ingredients: arr_recipe_ingredients,
			recipe_instructions: arr_recipe_instructions
		});
	} 

	render(){

		

		if(this.props.new.error){
			console.log('errors!', this.props.new)
			return(
				<Dialog
					title='Oops!'
					open={true}
					actions={this.dialogActions}
				>
					{this.props.new.error}
				</Dialog>
			)
		}

		else if(this.props.new.loading){
			console.log('this.props.new.loading', this.props.new.loading)
			return(
				<div className="spinner-holder">
        	<LinearProgress mode='indeterminate' />
        	<h2>Uploading Your Recipe Post...</h2>
      	</div>
			)
		}
		else{
			return(

				<form onSubmit={this.handleSubmit} encType='multipart/form-data'>
					<h2>Upload New Recipe</h2>
					<div className='row'>
						<div className='col-md-4'>
							<Card>
								<CardText>
									{this.state.showDropzone ? <Dropzone
										id='dropzone'
										multiple={false}
										accept='image/gif'
										onDrop={this.onDrop}
									>
										<div>Drop a GIF of your recipe here.</div>
										{this.state.err_recipe_gif ? <div>This is a required field.</div>:null}
									</Dropzone> : null}
									
									{this.state.file ? <div>
										<img style={{width: 70 + '%'}} src={this.state.file.preview} alt='recipe gif'/>
									</div> : null}
									

									
									<SelectField
										floatingLabelText='Prep Time'
										hintText='20 mins'
										maxHeight={200}
										value={this.state.prep_time}
										onChange={this.handleSelectChange.bind(this, 'prep_time')}
									>
										{timeItems}
									</SelectField>
									<br/>
									<SelectField
										floatingLabelText='Cook Time'
										hintText='20 mins'
										maxHeight={200}
										value={this.state.cook_time}
										onChange={this.handleSelectChange.bind(this, 'cook_time')}
									>
										{timeItems}
									</SelectField>
									<br/>
									<SelectField
										floatingLabelText='Recipe Yield (Serving Size)'
										hintText='4 Servings'
										maxHeight={200}
										value={this.state.recipe_yield}
										onChange={this.handleSelectChange.bind(this, 'recipe_yield')}
									>
										{yieldItems}
									</SelectField>
									
									

								</CardText>
							</Card>
						</div> 
						<div className='col-md-8'>
							<Card>
								<CardText>
									<TextField
										errorText={this.state.err_recipe_title}
										hintText='Tomato Spaghetti'
										floatingLabelText='Recipe Title'
										value={this.state.recipe_title}
										onChange={this.handleTextChange.bind(this, 'recipe_title')}
										></TextField>
									<br/>
									<TextField
										errorText={this.state.err_recipe_description}
							      hintText='The classic tomato spaghetti dish.'
							      floatingLabelText='Recipe Description'
							      multiLine={true}
							      rows={1}
							      value={this.state.recipe_description}
							      onChange={this.handleTextChange.bind(this, 'recipe_description')}
							    ></TextField>
									<br/>
									<TextField
										errorText={this.state.err_recipe_ingredients}
										fullWidth={true}
							      hintText='Write each ingredient on its own line.'
							      floatingLabelText='Ingredients'
							      floatingLabelFixed={true}
							      multiLine={true}
							      rows={1}
							      value={this.state.recipe_ingredients}
							      onChange={this.handleTextChange.bind(this, 'recipe_ingredients')}
							    ></TextField>
									<br/>
									<TextField
										errorText={this.state.err_recipe_instructions}
										fullWidth={true}
							      hintText='Write each instruction on its own line.'
							      floatingLabelText='Recipe Instructions'
							      floatingLabelFixed={true}
							      multiLine={true}
							      rows={1}
							      value={this.state.recipe_instructions}
							      onChange={this.handleTextChange.bind(this, 'recipe_instructions')}
							    ></TextField>
									<br/>

								</CardText>

								<RaisedButton primary={true} label='Upload Recipe' type='submit'></RaisedButton>
							</Card>

						</div>
					</div> 
					
					
				</form>	

			)//end return
		}

		
	} //end render


} //end class


function mapStateToProps( state ){
		console.log('map state to props', state)
		return { new: state.recipeposts.new}
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators( { createRecipePost: createRecipePost }, dispatch );
}


export default connect( mapStateToProps, mapDispatchToProps )( UploadRecipe );
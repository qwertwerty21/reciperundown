import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getRecipePosts} from '../actions/';

import LinearProgress from 'material-ui/LinearProgress';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

class View extends Component{
	constructor(props){
		super(props)
		this.state = {
			open: false
		};
	}

	componentWillMount(){
		console.log('Thisis the props in view  ', this.props)
		
		let currentUrl = window.location.href
		let recipePostId = currentUrl.split('/').pop(); 
		this.props.actions.getRecipePosts(recipePostId)
	}

	handleToggle = () => {
		let newState = Object.assign({}, this.state );
		newState['open'] = !this.state.open; 
		this.setState(newState);
	};

	dialogActions = [
    <RaisedButton
			label='Cancel'
			primary={false}
			onTouchTap={this.handleToggle}
    />,
		<RaisedButton
        label='Try Again'
        primary={true}
        onTouchTap={ ()=> {window.location.reload()} } //refresh page
     />
	];

	renderIngredients(){
		//.slice() to clone array 
		let ingredients = this.props.originalSingle.post.recipe_ingredients.slice();
		return ingredients.map((ingredient, index, array)=>{
			console.log('heres the ingredinte', ingredient)
			return(
				
				<div key={index}>
					<ListItem
						primaryText={ingredient}
					>	
						
					</ListItem>
					<Divider></Divider>

				</div>
			)
			
		});//end map
	}//end func renderIngredients

	renderInstructions(){
		//.slice() to clone array 
		let instructions = this.props.originalSingle.post.recipe_instructions.slice();
		return instructions.map((instruction, index, array)=>{
			console.log('heres the instruciton', instruction)
			return(
				
				<div key={index}>
					<ListItem
						primaryText={instruction}
					>	
						
					</ListItem>
					<Divider></Divider>

				</div>
			)
			
		});//end map
	}//end func renderIngredients

	render(){
		
		//if error
		if(this.props.originalSingle.error){
			console.log('errors!', this.props.originalSingle)
			return(
				<Dialog
					title='Oops!'
					open={!this.state.open}
					actions={this.dialogActions}
					onRequestClose={this.handleToggle}
				>
					<p>{this.props.originalSingle.error}</p>
				
				</Dialog>
			)
		}

		//if loading
		else if (!this.props.originalSingle || !this.props.originalSingle ||this.props.originalSingle.loading) {

    	console.log('Loading... curent state:',this.props)
      return (
        <div className="spinner-holder">
          <LinearProgress mode='indeterminate' />
        </div>
      )

    }

		
		//if success
		else{
			console.log('THIS ISS THE ROINGAL SINGEL JK HERES PROPS', this.props)
			let { recipe_gif, recipe_title, recipe_description, prep_time, cook_time, recipe_yield } = this.props.originalSingle.post;
			let { name } = this.props.originalSingle.post.user;

	    let imgpath = '/' + recipe_gif.split('/').slice(3).join('/');

    	
    
    	console.log('IMAGPATH', imgpath)
			console.log('this the new props in View', this.props)
			return(
				
				<Card style={{maxWidth:600}}>
					<Card >
						<CardMedia>
				      <img src={ imgpath } className='img-responsive'/>
				    </CardMedia>
					</Card>
					
					<Card>
						<CardHeader 
				    	title={recipe_title}
				    	subtitle={`Posted By ${name}`}
				    	showExpandableButton={true}
				    	actAsExpander={true}
				    >
				    	
				    </CardHeader>
				    <CardText
							expandable={true}
				    >
				    	<div style={{paddingBottom: 20, paddingLeft: 16, color: 'rgba(0, 0, 0, 0.541176)'}}>
								<div style={{ display:'inline-block', width: 33+'%'}}>{`Prep Time: ${prep_time ? prep_time : 'N/A'}`}</div>
								<div style={{ display:'inline-block', width: 33+'%'}}>{`Cook Time: ${cook_time ? cook_time: 'N/A'}`}</div>
								<div style={{ display:'inline-block', width: 33+'%'}}>{`Recipe Yield: ${recipe_yield ? recipe_yield : 'N/A'}`}</div>
							</div>
							<Divider></Divider>
				    	<div style={{
    						paddingLeft: 16,
						    paddingTop: 20,
						    color: 'rgba(0, 0, 0, 0.541176)'}}
						  >
				    		{`${recipe_description}`}
				    	</div>
				    	
							
							
				    </CardText>
					</Card>

					
			    
			    <Card>
			    	<CardTitle
							title='Ingredients'
							showExpandableButton={true}
							actAsExpander={true}
			    	>
			    		
			    	</CardTitle>
			    	<CardText
							expandable={true}
			    	>
			    		<List>
			    			{this.renderIngredients()}
			    		</List>
			    	</CardText>
			    </Card>

			    <Card>
			    	<CardTitle
							title='Instructions'
							showExpandableButton={true}
							actAsExpander={true}
			    	>
			    		
			    	</CardTitle>
			    	<CardText
							expandable={true}
			    	>
			    		<List>
			    			{this.renderInstructions()}
			    		</List>
			    	</CardText>
			    </Card>

					<Card> 
						<CardTitle
							title='Comments'
							showExpandableButton={true}
							actAsExpander={true}
							
							
						>
							
							
						</CardTitle>
						
						<CardText
						expandable={true}
						>
							<List>
								
							</List>
							
						</CardText>
					
					</Card>
			
				</Card>


			)//end return 
		}
		
		
	}//end render
}

function mapStateToProps(state){
	return{
		originalSingle: state.recipeposts.originalSingle
	}
}

function mapDispatchToProps(dispatch){
	return {
		actions: {
			getRecipePosts: bindActionCreators( getRecipePosts, dispatch)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(View);
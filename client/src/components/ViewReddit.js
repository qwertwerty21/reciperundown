import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getRedditPost} from '../actions/';

import LinearProgress from 'material-ui/LinearProgress';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

class ViewReddit extends Component{
	constructor(props){
		super(props)
		this.state = {
			open: false
		};
	}

	componentWillMount(){
		console.log('Thisis the props in view reddit ', this.props)
		
		let currentUrl = window.location.href
		let redditPostId = currentUrl.split('/').pop(); 
		this.props.actions.getRedditPost(redditPostId)
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

	renderRedditPostComments(){
		let comments = this.props.redditSingle.post[1].data.children;
		return comments.map((comment, index, array)=>{
			console.log('heres the cmmnet', comment.data.body)
			return(
				
				<div key={index}>
					<ListItem
						secondaryText={`u/${comment.data.author}`}
						primaryText={comment.data.body}
					>	
						
					</ListItem>
					<Divider></Divider>

				</div>
			)
			
		});//end map
	}//end func renderRedditPostComments

	render(){
		

    //if error
		if(this.props.redditSingle.error){
			console.log('errors!', this.props.redditSingle)
			return(
				<Dialog
					title='Oops!'
					open={!this.state.open}
					actions={this.dialogActions}
					onRequestClose={this.handleToggle}
				>
					<p>{this.props.redditSingle.error}</p>
				
				</Dialog>
			)
		}

		//if loading
		else if (!this.props.redditSingle || !this.props.redditSingle.post || this.props.redditSingle.loading) {

    	console.log('Loading... curent state:',this.props)
      return (
        <div className="spinner-holder">
          <LinearProgress mode='indeterminate' />
        </div>
      )

    }

		
		//if success
		else{
			let { url } = this.props.redditSingle.post[0].data.children[0].data.preview.images[0].variants.gif.source;
			let { title, author } = this.props.redditSingle.post[0].data.children[0].data;

			console.log('this the new props in viewReddit', this.props)
			return(
				
				<Card style={{maxWidth:600}}>
					<Card >
						<CardMedia>
				      <img src={ url } className='img-responsive'/>
				    </CardMedia>
					</Card>
					
					<Card>
						<CardHeader 
				    	title={title}
				    	subtitle={`Posted By u/${author}`}

				    >
				    
				    </CardHeader>
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
								{this.renderRedditPostComments()}
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
		redditSingle: state.recipeposts.redditSingle
	}
}

function mapDispatchToProps(dispatch){
	return {
		actions: {
			getRedditPost: bindActionCreators( getRedditPost, dispatch)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewReddit);
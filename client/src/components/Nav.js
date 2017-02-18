import React, {Component, PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import NavigationClose from 'material-ui/svg-icons/navigation/close';


class Nav extends Component{
	/*Need PropTypes to get context for router*/
	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props){
		super(props);
		this.state = {open: false};
	}
	
	goToHome = () => browserHistory.push('/');
	
	handleToggle = () => {
		let newState = Object.assign({}, this.state );
		newState['open'] = !this.state.open; 
		this.setState(newState);
	};

	render(){
		return(
			<div>
				<AppBar
					title={<span className='nav__logo'>Recipe Rundown</span>}
					onTitleTouchTap={this.goToHome}
					onLeftIconButtonTouchTap={this.handleToggle}
				/>
				
				<Drawer open={this.state.open}>
					<MenuItem onClick={this.handleToggle} className='text-right'>
						<IconButton>
							<NavigationClose></NavigationClose>
						</IconButton>
					</MenuItem>
					<Link to='/' onClick={this.handleToggle}>
						<MenuItem>
							Explore
						</MenuItem>
					</Link>
					<Link to='/upload' onClick={this.handleToggle}>
						<MenuItem>
							Upload
						</MenuItem>
					</Link>
					<Link to='/login' onClick={this.handleToggle}>
						<MenuItem>
							Login
						</MenuItem>
					</Link>
					
					<Link to='/register' onClick={this.handleToggle}>
						<MenuItem>
							Register
						</MenuItem>
					</Link>

				</Drawer>


			</div>

			
			

		)
	}//end render
}


export default Nav;
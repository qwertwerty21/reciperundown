import React, { Component } from 'react';
//import logo from '../../images/logo.svg';
import '../styles/App.scss';
import Nav from './Nav';
import axios from 'axios';


class App extends Component {
  constructor( props ){
    super(props);

    this.state = {
    };

    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(e){
    console.log('now change state of App to: ',e.target.value);
    this.setState({
      currentView: e.target.value
    });
  }
  
  fetchRecipePosts(){
    return axios.get('http://localhost:3000/recipepost');
  }
  
  componentWillMount(){
    
    




  }

  render() {
    return (
      <div className='app-container'>
 
            <Nav/>
            
        
            <div className='content-container container'>
              {this.props.children}
            </div>
        
      </div>
    );
  }
}

export default App;

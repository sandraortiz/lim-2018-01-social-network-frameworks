import React, { Component } from 'react';
import firebase from './firebase';

import './App.css';
import Home from './Home'
import Wall from './Wall'
class App extends Component {
  constructor () {
    super();
    this.state = {
      
      user: null,
      
         };
// LOGIN Y REGISTER
this.authListener = this.authListener.bind(this);
}

componentWillMount () {
  this.authListener();
      
    }
    authListener() {
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
        if (user) {
      
       this.setState({ user });

         firebase.database().ref('users/' + user.uid).set({
        username: this.state.user.displayName ,
        email: this.state.user.email 
        });
           
         } 
         else {
            this.setState({ user: null });
        }
      });
    }
   
    render() {
      return (
       <div>{this.state.user ?  ( <Wall/>) : (<Home />)}</div>
      )}
  }
  export default App;


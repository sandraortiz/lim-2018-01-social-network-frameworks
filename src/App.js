import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Fire from './config/Fire';
import Home from './home';
import Login from './login';

class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }
  componentDidMount() {
    this.authListener();
  }

  authListener() {
    Fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }
  render() {
    return (
     <div>{this.state.user ?  ( <Home/>) : (<Login />)}</div>
    )}
}


export default App;

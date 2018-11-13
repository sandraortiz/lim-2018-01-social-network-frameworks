import React, { Component } from 'react';

import './App.css';
class App extends Component {
    constructor(){
      super();
      this.state={
        user: false
      }
    }
  loginFunction=()=>{
    this.setState({user:true})
  } 
  
  logoutFunction=()=>{
    this.setState({user:false})
  }
  
  render() {
    if(this.state.user===false){
      return (
        <div>
          <button onClick={this.loginFunction}>Ingresa</button>
        <button>Registrate</button>
        </div>
        
           )
    }else if(this.state.user=== true){
      return (
        <div>
          <h1>Estas en homeeeee</h1>
          <button  onClick={this.logoutFunction}>Cierra sesión</button>
        </div>
        
           )
    }
  }


}

export default App;

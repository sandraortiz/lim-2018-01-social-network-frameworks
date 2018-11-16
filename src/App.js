import React, { Component } from 'react';
import firebase from 'firebase'

import './App.css';
class App extends Component {
    constructor(){
      super();
      this.state={
        user: false
      }
    }
  loginGoogle=()=>{
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => {
        console.log(`${result.user.email} ha iniciado sesión`);
        this.setState({user:true,
                      userEmail: `${result.user.email}` })

      })
      .catch(error=> console.log(`error ${error.code}: ${error.message }`));
      
  }  
  loginFacebook=()=>{
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => {
        console.log(`${result.user.email} ha iniciado sesión`);
        this.setState({user:true,
                      userEmail: `${result.user.email}` })

      })
      .catch(error=> console.log(`error ${error.code}: ${error.message }`));
  }
  loginFunction=()=>{
    const email= document.getElementById("email").value;
    const password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((result)=>{
      this.setState({user:true})
    })
    .catch((error)=> {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
    alert(email, password)
  } 

  loginRegister=()=>{
    const email= document.getElementById("email").value;
    const password = document.getElementById("password").value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    
    .catch((error)=> {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      
      // ...
    });
  }
  
  logoutFunction=()=>{
    this.setState({user:false})
  }
  
  render() {
    if(this.state.user===false){
      return (
        <div>
          <input type="email" placeholder="Email" id="email"/>
          <input type="password" placeholder="password" id="password"/>
          <button onClick={this.loginFunction}>Ingresa</button>
          <button onClick={this.loginGoogle}>Google</button>
          <button onClick={this.loginFacebook}>Facebook</button>
        <button onClick={this.loginRegister}>Registrate</button>
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

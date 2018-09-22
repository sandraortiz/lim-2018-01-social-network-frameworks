// asi exportarmos la estrucutura que queremos de lo contrario 
// tendria que React.componet
import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
    user : null
  }

  this.handleAuth  = this.handleAuth.bind(this);
  this.handleLogout = this.handleLogout.bind(this);
  this.renderLoginButton = this.renderLoginButton.bind(this);
  }
//CICLO DE VIDA SE DISPARA CUANDO EL COMPONENTE SE HA RENDERIZADO
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
    //MODIFICAR EL ESTADO 
        this.setState ({ user})
        // User is signed in.

    
    });
  }
handleAuth() {
const provider =  new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider)
.then(result =>console.log(`${result.user.email} inicio sesion`))
.catch(error => console.log(`ERROR ${error.code} : ${error.message}`));
}

handleLogout() {
  firebase.auth().signOut()
  .then(result =>console.log(`${result.user.email} cerro sesion`))
  .catch(error => console.log(`ERROR ${error.code} : ${error.message}`));
}

renderLoginButton () {
  // si esta logueado 
if(this.state.user){
return(
<div>
  <img src = {this.state.user.photoURL}  alt= {this.state.displayName} />
  <p> hola {this.state.user.displayName  } </p>
  <button onClick = {this.handleLogout} > salir </button>
</div>

)
}
else {
  return (
           <button onClick= {this.handleAuth} > google</button>
  )

}
}
render() {
    return (
      <div className="App">
        <header className="App-header">
           <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
  {this.renderLoginButton()}
        </p>
      </div>
    );
  }
}

export default App;

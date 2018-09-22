// asi exportarmos la estrucutura que queremos de lo contrario 
// tendria que React.componet
import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';

class App extends Component {
  constructor() {
    super();
  this.login = this.login.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.signup = this.signup.bind(this);
  this.state = {
    email: '',
    password: '',
    user : null
  };

  this.handleAuth  = this.handleAuth.bind(this);
  this.handleAuthf  = this.handleAuthf.bind(this);
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
handleAuthf() {
  var provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
        'display': 'popup'
    });
  firebase.auth().signInWithPopup(provider)
  .then(result =>console.log(`${result.user.email} inicio sesion`))
  .catch(error => console.log(`ERROR ${error.code} : ${error.message}`));
  }
handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
handleLogout() {
  firebase.auth().signOut()
  // .then(result =>console.log(`${result.user.email} cerro sesion`))
  // .catch(error => console.log(`ERROR ${error.code} : ${error.message}`));
}

login(e) {
  e.preventDefault();
  firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
  }).catch((error) => {
      console.log(error);
    });
}

signup(e) {
  e.preventDefault()
  firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
  }).then((u)=>{console.log(u)})
  .catch((error) => {
      console.log(error);
    })
}

renderLoginButton () {
  // si esta logueado 
  
if(this.state.user)

{
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
        <div>
             <div className="col-12">
       <form>
      <div class="form-group">
       <label for="exampleInputEmail1">Email address</label>
       <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
       <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
       <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
      </div>
      <button type="submit" onClick={this.login} class="btn btn-primary">Login</button>
      <button onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success">Signup</button>
     </form>
      </div>
          
           <button onClick= {this.handleAuth}  style={{marginLeft: '25px'}} className="btn btn-success"> google</button>
           <button onClick= {this.handleAuthf}style={{marginLeft: '25px'}} className="btn btn-success" > facebook</button>
         
         
          </div>
  )

}
}
render() {
    return (
      <div className="App">
    
       
      <p className="col-12 " style={{marginLeft: '25px'}}> {this.renderLoginButton()}</p>
      
      </div>
    );
  }
}

export default App;

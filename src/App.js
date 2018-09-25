import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import FileUpload from './FileUpload';


class App extends Component {
  constructor () {
    super();
    this.state = {
      email: '',
      password: '',
      user: null,
      };
// LOGIN Y REGISTER
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
//
    this.handleAuth = this.handleAuth.bind(this);
    this.postsFirebase = this.postsFirebase.bind(this);
   this.handleAuthf  = this.handleAuthf.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
  
  componentWillMount () {
        firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
     this.userUpload({user})
      
    });

   

  }

  handleAuth () {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
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
  handleLogout () {
    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }
  
  userUpload() {
    firebase.database().ref('users/' + this.state.user.uid).set({
      username: this.state.user.displayName ,
      email: this.state.user.email 
    
  });
  }
   
 postsFirebase() {
 firebase.database().ref('pictures').on("child_added", newPosts => {
    console.log(newPosts);
    
  });
 } 
  renderLoginButton () {
    if (!this.state.user) {
      return (
        <div>
       <form>
      <div class="form-group">
       <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
       </div>
       <div class="form-group">
       <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
      </div>
      <button type="submit" onClick={this.login} class="btn btn-primary">Login</button>
      <button onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success">Signup</button>
       </form>
        <button onClick={this.handleAuth} className="App-btn">
          Iniciar sesión con Google
        </button> 
           
        <button onClick={this.handleAuthf} className="App-btn">
          Iniciar sesión con facebook
        </button> 
        
        </div>
      );
    } else  {
      
      return (
        <div className="App-intro">
          <p className="App-intro">¡Hola, { this.state.user.displayName }!</p>
          <button onClick={this.handleLogout} className="App-btn">
            Salir
          </button>
           <FileUpload onUpload={this.postsFirebase}/>
          </div>

      );
    }
  }

  render() {
    return ( <div className="App"> { this.renderLoginButton() } </div>);
  }
}

export default App;

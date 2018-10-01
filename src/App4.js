import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';
class App extends Component {
  constructor () {
    super();
    this.state = {
      email: '',
      password: '',
      user: null,
      messages: [] 
         };
// LOGIN Y REGISTER
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
//
    this.handleAuth = this.handleAuth.bind(this);
    
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
  
  addMessage(e){
    e.preventDefault();
   
    const currentUser = firebase.auth().currentUser;
      const dbRef = firebase.database().ref().child('posts').push().key;
      const record = {
        image: currentUser.photoURL,
          author: currentUser.displayName,
          uid: currentUser.uid,
        text: this.postContent.value,
        keyposts : dbRef
      }
      const updates = {};
      updates['/posts/' + dbRef] = record;
      updates['/user-posts/' + currentUser.uid + '/' + dbRef] = record;
      return firebase.database().ref().update(updates);
   }
  componentWillMount () {
        firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
     this.userUpload({user})
      });
     firebase.database().ref('posts').orderByKey().on('child_added', snapshot => {
      let message = { text:snapshot.val().text , id: snapshot.keyposts , author:snapshot.val().author };
      this.setState({ messages: [message].concat(this.state.messages)
      });
     })
    
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
          <userUpload />
          <form onSubmit={this.addMessage.bind(this)}>
    <input type="text" ref={ post => this.postContent = post }/>
    <input type="submit"/>
    
     { 
       this.state.messages.map( message =>
        <div>
             <p key={message.id}>{message.author}</p>     
    <p key={message.id}>{message.text}</p>   
           </div>
        )
     }
  
   </form>

          </div>

      );
    }
  }

  render() {
    return ( <div className="App"> { this.renderLoginButton() } </div>);
  }
}

export default App;

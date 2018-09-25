import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';
import FileUpload from './FileUpload';

class App extends Component {
  constructor () {
    super();
    this.state = {
      email: '',
      password: '',
      user: null,
      pictures: [] ,
 
    };
// LOGIN Y REGISTER
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
//
    this.handleAuth = this.handleAuth.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
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
    // Cada vez que el método 'onAuthStateChanged' se dispara, recibe un objeto (user)
    // Lo que hacemos es actualizar el estado con el contenido de ese objeto.
    // Si el usuario se ha autenticado, el objeto tiene información.
    // Si no, el usuario es 'null'
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
     this.userUpload({user})
      
    });

    firebase.database().ref('pictures').on('child_added', snapshot => {
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      });
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
   
  handleUpload () {
  
     const dbRef = firebase.database().ref().child('pictures').push().key;
      const record = {
        photoURL: this.state.user.photoURL,
        displayName: this.state.user.displayName,
      body:this.state.posts ,
        id :  this.state.user.uid 
      }
      const updates = {};
      updates['/pictures/' + dbRef] = record;
      updates['/user-pictures/' + this.state.user.uid + '/' + dbRef] = record;
      return firebase.database().ref().update(updates);
    
   
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
          <FileUpload onUpload={this.handleUpload}/>

          {
            this.state.pictures.map(picture => (
              <div className="App-card">
                <figure className="App-card-image">
                  <img className="App-card-avatar"  src= {picture.image} alt = { "figuresuser"} />
                
                    <img className="App-card-avatar" src={picture.photoURL} alt={`${picture.displayName}`} />
                    <span className="App-card-name">{picture.displayName}</span>

                </figure>
              </div>
            )).reverse()
          }

        </div>

      );
    }
  }

  render() {
    return (
      <div className="App">
       
        { this.renderLoginButton() }
      </div>
    );
  }
}

export default App;

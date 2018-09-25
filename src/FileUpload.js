import React, { Component } from 'react';
import firebase from './firebase'

class FileUpload extends Component {
  constructor () {
    super();
    this.state = {
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.posts = this.posts.bind(this);
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  posts(e) {
    e.preventDefault()
    const currentUser = firebase.auth().currentUser;
    const dbRef = firebase.database().ref().child('pictures').push().key;
    const record = {
      image: currentUser.photoURL,
        author: currentUser.displayName,
        uid: currentUser.uid,
      photoURL: this.state.email,
      
    }
    const updates = {};
    updates['/pictures/' + dbRef] = record;
    updates['/user-pictures/' + currentUser.uid + '/' + dbRef] = record;
    return firebase.database().ref().update(updates);
  }
 

  render () {
    return (
    <form>
      <div class = "form-group">
         

            <br/>
            <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <button type="submit" onClick={this.posts} class="btn btn-primary">Login</button>
          
              </div>
              </form>
    )
  }
}

export default FileUpload;

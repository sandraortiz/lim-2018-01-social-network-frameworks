import React, { Component } from 'react';
import firebase from './firebase';



class Wall extends Component {
  constructor(props) {
      super(props);
      this.logout = this.logout.bind(this);
this.state = {
  user: null,
  messages: [] 
}


  }
  componentWillMount () {
   
 firebase.database().ref('posts').orderByKey().on('child_added', snapshot => {
  let message = { text:snapshot.val().text , id: snapshot.keyposts , author:snapshot.val().author };
  this.setState({ messages: [message].concat(this.state.messages)
  });
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
  logout() {
      firebase.auth().signOut();
  }

  render() {
    return (
          <div>
              <h1>Welcome to Home</h1>
             <button onClick={this.logout}>Logout</button>
           
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

export default Wall;

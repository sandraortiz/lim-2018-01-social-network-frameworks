import React, { Component } from 'react';
import firebase from './firebase'
class App extends Component {
  constructor(props) {
   super(props);
   this.state = { messages: [] };
 }
 
 componentWillMount(){
  let messagesRef = fire.database().ref('posts').orderByKey();
  messagesRef.on('child_added', snapshot => {
  let message = { text:snapshot.val().text , id: snapshot.keyposts , author:snapshot.val().author };
  this.setState({ messages: [message].concat(this.state.messages)
  });
 })
 }
 
 addMessage(e){
   e.preventDefault();
  
   const currentUser = fire.auth().currentUser;
     const dbRef = fire.database().ref().child('posts').push().key;
     const record = {
       image: currentUser.photoURL,
         author: currentUser.displayName,
         uid: currentUser.uid,
       text: this.inputEl.value,
       keyposts : dbRef
     }
     const updates = {};
     updates['/posts/' + dbRef] = record;
     updates['/user-posts/' + currentUser.uid + '/' + dbRef] = record;
     return fire.database().ref().update(updates);
  }
  
  render() {
   return (
    <form onSubmit={this.addMessage.bind(this)}>
     <input type="text" ref={ el => this.inputEl = el }/>
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
  );}}
  
export default FileUpload;

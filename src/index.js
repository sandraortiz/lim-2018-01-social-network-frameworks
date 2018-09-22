import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

 firebase.initializeApp({
    apiKey: "AIzaSyD33a72Urx8vLxoSDdJu0woInLXFQ3yq3M",
    authDomain: "socialnetwork-165d4.firebaseapp.com",
    databaseURL: "https://socialnetwork-165d4.firebaseio.com",
    projectId: "socialnetwork-165d4",
    storageBucket: "socialnetwork-165d4.appspot.com",
    messagingSenderId: "544234037594"
  });
 

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

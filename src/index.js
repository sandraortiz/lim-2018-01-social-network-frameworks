import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

 firebase.initializeApp({
  apiKey: "AIzaSyChs4Q6g_1-huAa6p353HbixA9w-cXUnWk",
  authDomain: "social-network-reactjs.firebaseapp.com",
  databaseURL: "https://social-network-reactjs.firebaseio.com",
  projectId: "social-network-reactjs",
  storageBucket: "social-network-reactjs.appspot.com",
  messagingSenderId: "182192293906"
  });
 

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

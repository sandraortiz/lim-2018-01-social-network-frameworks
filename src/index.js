import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase'

import App from '../src/components/App';
 // Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyATtSJ8rOly0GPDBfUAF9zZCxWcttwWEBk",
    authDomain: "social-react-4c9d9.firebaseapp.com",
    databaseURL: "https://social-react-4c9d9.firebaseio.com",
    projectId: "social-react-4c9d9",
    storageBucket: "social-react-4c9d9.appspot.com",
    messagingSenderId: "1042389204283"
  });
ReactDOM.render(<App/>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

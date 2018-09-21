
 import firebase from 'firebase'
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyD33a72Urx8vLxoSDdJu0woInLXFQ3yq3M",
    authDomain: "socialnetwork-165d4.firebaseapp.com",
    databaseURL: "https://socialnetwork-165d4.firebaseio.com",
    projectId: "socialnetwork-165d4",
    storageBucket: "socialnetwork-165d4.appspot.com",
    messagingSenderId: "544234037594"
  };
  const fire = firebase.initializeApp(config);
export default fire;
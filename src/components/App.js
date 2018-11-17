import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Navigation from './Navigation';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import WallPage from './Wall';
import ProfilePage from './Profile';
import PasswordForgetPage from './PasswordForget';
 
import * as routes from '../constants/routes';
import {firebase} from '../firebase/config'
// import firebase from 'firebase';
// import './App.css';
 class App extends Component{
 constructor(props){
   super(props);
   this.state = {
     authUser:null,
   };
 }

 componentDidMount() {
  firebase.auth.onAuthStateChanged(authUser => {
    authUser
      ? this.setState({ authUser })
      : this.setState({ authUser: null });
  });
}
 render(){
   return (
    <Router>
    <div>
    <Navigation/>
    <hr/>

    <Route
       exact path={routes.SIGN_UP}
       component={SignUpPage}
     />
     <Route
       exact path={routes.SIGN_IN}
       component={SignInPage}
     />
     {/* <Route
       exact path={routes.PASSWORD_FORGET}
       component={PasswordForgetPage}
     /> */}
     <Route
       exact path={routes.WALL}
       component={WallPage}
     />
     <Route
       exact path={routes.PROFILE}
       component={ProfilePage}
     />
    </div>
    
  </Router>

   )
 }
    }
export default App;

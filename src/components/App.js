import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Navigation from './Navigation';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import WallPage from './Wall';
import ProfilePage from './Profile';
import SignOut from './SignOut';
 
import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';
// import firebase from 'firebase';
// import './App.css';
 class App extends Component{
 constructor(props){
   super(props);
   this.state = {
     authUser:null,
   };
 }


 render(){
   return (
    <Router>
    <div>
    <Navigation authUser={this.state.authUser}/>
    <hr/>

    <Route
       exact path={routes.SIGN_UP}
       component={SignUpPage}
     />
     <Route
       exact path={routes.SIGN_IN}
       component={SignInPage}
     />
   
     <Route
       exact path={routes.WALL}
       component={WallPage}
     />
     <Route
       exact path={routes.PROFILE}
       component={ProfilePage}
     />
     {/* <Route
       exact path={routes.SIGN_IN}
       component={SignOut}
     />
    */}
    </div>
    
  </Router>

   )
 }
    }
export default App;

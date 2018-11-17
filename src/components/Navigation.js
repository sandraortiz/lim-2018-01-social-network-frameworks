import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';
import SignOut from './SignOut';

const Navigation = ({authUser}) =>
  <div>
      {
          authUser
            ? <NavigationAuth/>
            : <NavigationNonAuth/>
      }
    
  </div>
const NavigationAuth=()=>
    <ul>
      <li><Link to={routes.WALL}>Wall</Link></li>
      <li><Link to={routes.PROFILE}>Profile</Link></li>
      <li><SignOut/></li>  
    </ul>


const NavigationNonAuth=()=>
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>


export default Navigation;
import React from 'react';
import { Link } from 'react-router-dom';
import AuthUserContext from './AuthUserContext';
import SignOut from './SignOut';

import * as routes from '../constants/routes';

const Navigation = ({authUser}) =>
    <AuthUserContext.Consumer>
        { authUser => authUser
                ? <NavigationAuth/>
                : <NavigationNonAuth />
        }
    </AuthUserContext.Consumer>
const NavigationAuth = () => {
    return (
        <ul>
            <li><Link to={routes.WALL}>Wall</Link></li>
            <li><Link to={routes.PROFILE}>Profile</Link></li>
            <li><SignOut /></li>
        </ul>
    )
}

const NavigationNonAuth = () => {
    return (
        <ul>
            <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
        </ul>
    )
}



export default Navigation;
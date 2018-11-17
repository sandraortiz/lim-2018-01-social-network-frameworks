import React, {Component} from 'react';
import { firebase } from '../firebase/config';

const withAuthentication = ()=>{
    class WithAuthentication extends Component{
        constructor(props){
            super(props);
            this.state ={
                authUser: null
            }
        }

        
        render(){
            
        }
    } 
}
export default withAuthentication;
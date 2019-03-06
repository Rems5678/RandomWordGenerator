import React, {Component} from 'react';

import Login from './Login';
class Auth extends Component {

	render() {
		return (<Login
		authenticated = {this.props.authenticated}
		currentUser = {this.props.currentUser}
        signedIn = {this.props.signedIn}
        postSignOut ={this.props.postSignOut} 
        toggleModal = {this.props.toggleModal} 
        signUpHandler = {this.props.signUpHandler} 
        signInHandler = {this.props.signInHandler}/>)
	}
}

export default Auth;
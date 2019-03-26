import React from 'react';
import Login from './Login';
import Btn from '../Btn';
import Auxiliary from '../Auxiliary/Auxiliary';

const Auth = (props) => {
		return (
		<Auxiliary>
			{props.authenticated ? <Btn onClick = {props.saveFields} className = "Save" content = "Save"/> : null}
			<Login
			authenticated = {props.authenticated}
			currentUser = {props.currentUser}
	        signedIn = {props.signedIn}
	        postSignOut ={props.postSignOut} 
	        toggleModal = {props.toggleModal} 
	        signUpHandler = {props.signUpHandler} 
	        signInHandler = {props.signInHandler}/>
		</Auxiliary>)
}

export default Auth;
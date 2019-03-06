import React, {Component} from 'react';


class Login extends Component {
	constructor(props) {
		super(props);
	}


	render() {

		let login = <div className="Login">
						<h2>New User?</h2>
						<h3 onClick = {this.props.signUpHandler} data-cursor= {true} >Sign up Here</h3>
						<p>Have an Account? <span ref = {this.signIn} onClick = {this.props.signInHandler} data-cursor= {true}>Sign In</span></p>

					</div>
		let logout = <div className="Login">
						<h2>Hello, {this.props.currentUser}</h2>
						<h3  data-cursor = {true} onClick = {this.props.postSignOut}>Logout</h3>
					</div>
		return(this.props.authenticated? logout : login)
	}
}

export default Login;
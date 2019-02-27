import React, {Component} from 'react';


class Login extends Component {
	constructor(props) {
		super(props);
		this.signUp = React.createRef();
		this.signIn = React.createRef();
	}


	render() {

		let login = <div className="Login">
						<h2>New User?</h2>
						<h3 ref = {this.signUp} onClick = {this.props.signUpHandler} data-cursor= {true} >Sign up Here</h3>
						<p>Have an Account? <span ref = {this.signIn} onClick = {this.props.signInHandler} data-cursor= {true}>Sign In</span></p>

					</div>
		
		return(login)
	}
}

export default Login;
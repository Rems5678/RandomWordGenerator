import React, {Component} from 'react';

class Modal extends Component {
	constructor(props) {
		super(props)
		this.inputEmail = React.createRef();
		this.inputPw = React.createRef();
		this.inputPwConfirm = React.createRef();
		this.modal= React.createRef();
	}

	validatePassword = () => {
		// get a better regex. doesn't necessitate a special character or number right now
		const pwRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
		if (!this.inputPw.current.value.match(pwRegex)) {
			alert("Password must be at least 8 characters, contain at least 1 lowercase letter, 1 uppercase letter, 1 numeric character, and 1 special character");
			return false;
		}
		if (this.inputPw.current.value !== this.inputPwConfirm.current.value) {
			alert('Passwords do not match')
			return false;
		}
		else {
			console.log('congrats everything works!')
			return true;
		}
	}

	newUserSubmitHandler = (e) => {
		e.preventDefault();
		if(!this.validatePassword()){
			return
		}
		this.props.postNewUser(this.inputEmail.current.value, this.inputPw.current.value);
	}
	signInSubmitHandler = (e) => {
		e.preventDefault();
		this.props.postReturningUser(this.inputEmail.current.value, this.inputPw.current.value)
	}
	handleOutsideClick = (e) => {
		if (!this.modal.current.contains(e.target)) {
			this.props.toggleModal();
		}
	}
	componentDidMount() {
		document.addEventListener('click', this.handleOutsideClick)
	}
	componentWillUnmount() {
		document.removeEventListener('click', this.handleOutsideClick);
	}
	render() {
		let cssVars = {show: 'SignUp', hide: 'Hide'}
		let content = 	<div ref = {this.modal} className = {cssVars.show }>
							<h1>New User Sign Up</h1>
							<form onSubmit = {this.newUserSubmitHandler} className = "SignUp_form">
								<label htmlFor="Email">Email</label>
								<input 
								ref = {this.inputEmail}
								required 
								name = "Email" 
								type="email"/>
								<label htmlFor="Password">Password</label>
								<input
								 required 
								 ref = {this.inputPw}
								 name = "Password" 
								 type="text"/>
								<label htmlFor="PasswordConfirm">Confirm Password</label>
								<input 
								required
								ref = {this.inputPwConfirm}
								name = "PasswordConfirm" 
								type="text"/>
								<input  type="submit"/>
							</form>
							<p>Have an account?</p>
							<p onClick = {this.props.hasAccountHandler} data-cursor = {true}>Sign In Here</p>
							</div>
					
			if (this.props.hasAccount) {
			content = <div ref = { this.modal}  className = {cssVars.show }>
						<h1>Sign In Here</h1>
						<form onSubmit = {this.signInSubmitHandler} className = "SignUp_form">
							<label htmlFor="Email">Email</label>
							<input 
							ref = {this.inputEmail}
							required 
							name = "Email" 
							type="email"/>
							<label htmlFor="Password">Password </label>
							<input
							 required 
							 ref = {this.inputPw}
							 name = "Password" 
							 type="text"/>
							<input  type="submit"/>
						</form>
						<p>Don't have an account?</p>
						<p onClick = {this.props.hasAccountHandler} data-cursor = {true}>Sign Up Here</p>
						</div>
			}
		return <div className="ModalOverlay">{content}</div>
	}
}

export default Modal;
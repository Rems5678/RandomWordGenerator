import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
	h4 : {
		marginTop: 15,
		[theme.breakpoints.down('lg')]: {
			fontSize: '1rem'
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '1rem'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem'
		}
	},
	modal: {
		[theme.breakpoints.up('sm')]: {
			width: '50%',
			left: '25%',
			height: 500
		},
		[theme.breakpoints.down('sm')]: {
			width: '75%',
			left: '15%',
			height: '300px'
		}
	},
	signUpForm: {
		[theme.breakpoints.down('xs')]: {
			width: '40%',
		}
	},
	TextField: {
		[theme.breakpoints.up('md')]: {
			width: '10rem',
			fontSize: '1rem'
		},
		[theme.breakpoints.down('sm')]: {
			width: '5rem',
			fontSize: '.7rem'
		}
	},
	label: {
		[theme.breakpoints.up('md')]: {
			fontSize: '1rem'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '.8rem'
		}
	},
	button: {
		margin: '15px 0',
		[theme.breakpoints.down('md')]: {
			fontSize: '1rem'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '.7rem'
		}
	}
})
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
    if (!this.inputPw.value.match(pwRegex)) {
      this.props.snackBarPropsHelper('error', "Password must be at least 8 characters, contain at least 1 lowercase letter, 1 uppercase letter, 1 numeric character, and 1 special character")
      return false;
    }
    if (this.inputPw.value !== this.inputPwConfirm.value) {
       this.props.snackBarPropsHelper('error', 'Passwords do not match')
      return false;
    }
    else {
      return true;
    }
  }

	
	ShowPwReset = () => {
		this.props.ShowPwReset()
	}
	newUserSubmitHandler = (e) => {
		e.preventDefault();
		if(!this.validatePassword()){
			return
		}
		this.props.postNewUser(this.inputEmail.value, this.inputPw.value);
	}
	signInSubmitHandler = (e) => {
		e.preventDefault();
		this.props.postReturningUser(this.inputEmail.value, this.inputPw.value)
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
		const {classes} = this.props;
		let cssVars = {show: 'SignUp', hide: 'Hide'}
		let content = 	<div ref = {this.modal} className = {cssVars.show + " " + classes.modal}>
							<Typography variant = "h4" className = {classes.h4}>New User Sign Up</Typography>
							<form onSubmit = {this.newUserSubmitHandler} className = {"signUpForm " + classes.signUpForm}>
								<TextField
								className = {classes.TextField}
								InputLabelProps = {{className: classes.label}}
								label = "Email"
								id = "emailInput"
								required 
								name = "Email" 
								type="email"
								inputRef = {el => this.inputEmail = el}/>
								<TextField
								className = {classes.TextField}
								InputLabelProps = {{className: classes.label}}
								label = "Password"
								 required 
								 id = "passwordInput"
								 inputRef = {el => this.inputPw = el}
								 name = "Password" 
								 type="password"/>
								<TextField
								className = {classes.TextField}
								InputLabelProps = {{className: classes.label}}
								label =  "Confirm Password"
								required
								id = "passwordConfirmInput"
								inputRef = {el => this.inputPwConfirm = el}
								name = "PasswordConfirm" 
								type="password"/>
								<Button
								type="submit"
								color = "secondary"
								variant = "contained"
								className = {classes.button}
								>Submit</Button>
							</form>
							<Typography variant = "body1">Have an account?</Typography>
							<Typography 
							variant = "body2"
							 onClick = {this.props.hasAccountHandler}
							  data-cursor = {true}
							  color = "textSecondary">Sign In Here</Typography>							
							</div>
					
			if (this.props.hasAccount) {
			content = <div ref = { this.modal}  className = {cssVars.show + " " + classes.modal}>

						<Typography variant = "h4" className = {classes.h4}>Sign In Here</Typography>
						<form onSubmit = {this.signInSubmitHandler} className = {"signUpForm " + classes.signUpForm}>
							<TextField
							className = {classes.TextField}
							label = "Email"
							id = "emailInput"
							inputRef = {el => this.inputEmail = el}
							required 
							name = "Email" 
							type="email"
							/>
							<TextField
							className = {classes.TextField}
							label = "Password"
							 required
							 id = "passwordInput"
							 inputRef = {el => this.inputPw = el}
							 name = "Password" 
							 type="password"/>
							<Button
								type="submit"
								color = "secondary"
								variant = "contained"
								className = {classes.button}
								>Submit</Button>
							
						</form>
						<Typography variant = "body1">Don't have an account?</Typography>
						<Typography 
							variant = "body2"
							 onClick = {this.props.hasAccountHandler}
							  data-cursor = {true}
							  color = "textSecondary">Sign Up Here</Typography>
						<Button onClick = {this.ShowPwReset}>Forgot Your Password?</Button>
						</div>
			}

					return <div className="ModalOverlay">{content}</div>
	}
}

export default withStyles(styles)(Modal);
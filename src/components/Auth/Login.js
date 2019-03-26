import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = theme => ({
	button: {
		margin: 10
	},
	toolbar: {
		justifyContent: "flex-end"
	}
})

const Login=(props)=> {
	const {classes} = props
		let login = <AppBar position = "static" className = "Login">
						<Toolbar className = {classes.toolbar}>
							<Button className = {classes.button} variant = "outlined" onClick = {props.signUpHandler} data-cursor= {true} >Sign Up</Button>
							<Typography variant = "subtitle2">Have an Account? <Button color = "secondary" onClick = {props.signInHandler} data-cursor= {true}>Sign In</Button></Typography>
						</Toolbar>	
					</AppBar>
		
		let logout = 
					<AppBar position = "static" className = "Login">
						<Toolbar className = {classes.toolbar}>
							<Typography variant = "h5" >Hello, {props.currentUser}</Typography>
							<Button color = "secondary" variant = "outlined" data-cursor = {true} onClick = {props.postSignOut}>Logout</Button>
						</Toolbar>
					</AppBar>
		return(props.authenticated? logout : login)

}

export default withStyles(styles)(Login);
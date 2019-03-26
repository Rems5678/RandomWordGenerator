import React, {Component} from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {withStyles} from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
	success: {
		backgroundColor: green[600]
	},
	error: {
		backgroundColor: theme.palette.error.dark
	}
})
class SignUpSnackbar extends Component  {

	render() {
		const {message, variant, iconType, open, classes, closeSnackbar} = this.props
		const iconTypes = {"error": <ErrorIcon></ErrorIcon>, "success": <CheckCircleIcon></CheckCircleIcon>}
		return (
			<div>
				<Snackbar
				anchorOrigin = {{
					vertical: 'bottom',
					horizontal: 'center'
				}}
					autoHideDuration = {6000}
					open = {open}
					onClose = {closeSnackbar}
					>
						 <SnackbarContent
						 className = {classes[variant]}
						 message = {<span>
						{iconTypes[iconType]}
						{message} 
						</span>}
						action = {<IconButton
							color= "inherit"
							onClick = {closeSnackbar} >
							<CloseIcon></CloseIcon>
							</IconButton>}></SnackbarContent>
						</Snackbar>
		
			</div>
			

	)

}
}

export default withStyles(styles)(SignUpSnackbar);
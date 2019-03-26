import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	button: {
		margin: '15px 0'
	},
	formControl: {
		display: 'block'
	}
})
class PwReset extends Component {
	constructor (props) {
		super(props)
		this.resetEmail = React.createRef()
	}
	resetPasswordHandler = () => {
		this.props.resetPasswordHandler(this.resetEmail.value)
	}
		render () {
			const {classes} = this.props;
			return (<div className = "PwReset" >
			<TextField
			className = { classes.formControl}
			label = "Email"
			id = "emailInput"
			inputRef = {el => this.resetEmail = el}
			required 
			name = "Email" 
			type="email"/>
			<Button 
			className = {classes.button}
			onClick = {this.resetPasswordHandler}>Submit Password Reset</Button> 
		</div>)
		}
} 
export default withStyles(styles)(PwReset);
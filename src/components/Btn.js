import React from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme =>({
	button: {
		margin: '15px 0',
		[theme.breakpoints.down('md')]: {
			fontSize: '1rem',
			gridArea: 'R'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '.7rem'
		}
	}
})
const Btn = (props) => {
		const {classes} = props;
		return <Button 
		variant = "contained"
		color = "secondary"
		onClick = {props.onClick} 
		className = {props.className + " " + classes.button} >{props.content}</Button>
}

export default withStyles(styles)(Btn);
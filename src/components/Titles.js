import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	h3: {
		marginTop: 25,
		marginBottom: 25,
		[theme.breakpoints.down('lg')]: {
			fontSize: '2rem'
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '1rem'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '.7rem'
		}
		
	}
})
const Titles = (props) => {
	const {classes} = props;
	return props.titleName.map((title, index) => {
		return  <Typography className = {classes.h3} variant = "h3" color= "textPrimary" key = {(Math.random() * index * 10000) + Math.random()  * 10000} >{title.toUpperCase()}</Typography>
		
	})
}

export default withStyles(styles)(Titles);
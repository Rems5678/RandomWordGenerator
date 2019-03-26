import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
const styles = theme=> ({
	h4: {
		margin: "30px auto",
		[theme.breakpoints.down('xl')]: {
			fontSize: '2rem'
		},
		[theme.breakpoints.down('lg')]: {
			fontSize: '1rem'
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '.8rem'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '.5rem'
		}
}
})
const Result= (props)=> {
	const {classes} = props
	return props.results.map((result, idx) => {
			return <Typography className = {classes.h4} variant = "h4" key = {(Math.random() * idx * 10000) + Math.random()  * 10000}>{result.toUpperCase()}</Typography>
					
			})
}

export default withStyles(styles)(Result);
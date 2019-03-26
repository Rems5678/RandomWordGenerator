import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
			root: {
						display: 'block',
						[theme.breakpoints.down('sm')]: {
						display: "inline-flex"
						}	
					},
				input: {
					marginLeft: theme.spacing.unit,
					marginRight: theme.spacing.unit,
					display: 'block',
					width: '15em',
					margin: '5px auto',
					[theme.breakpoints.up('md')]: {
						width: '10rem',
						fontSize: '1rem'
					},
					[theme.breakpoints.down('sm')]: {
						width: '3rem',
						fontSize: '.7rem'
					},
		
							}
						})
class FieldCol extends Component {
	
	onChangeHandler = (e) => {
		this.props.onInputChange(e, this.props.fieldCol)

		}
		
	render () {
		const {classes} = this.props
		let fieldKeys = Object.keys(this.props.fields);
			let fieldArr = [];

			fieldKeys.forEach((key) => {
				let fieldName = this.props.fields[key]
					fieldArr.push(<FormControl key = {key+'000'} className = {classes.root}>
						<Input className = {classes.input}  type="text" value={fieldName} name = {key} onChange = {this.onChangeHandler}/>
					</FormControl>) 
					
				})
		return(<div >
				{fieldArr.map((val) => {
					return val;
				})}
			</div>
			)
	}
}

export default withStyles(styles)(FieldCol);
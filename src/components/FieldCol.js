import React, {Component} from 'react';
import Field from './Field';

class FieldCol extends Component {
	
	onChangeHandler = (e) => {
		this.props.onInputChange(e, this.props.fieldCol)

		}

	render () {
		let fieldKeys = Object.keys(this.props.fields);
		let fieldArr = [];
		fieldKeys.forEach((key) => {
				let fieldName = this.props.fields[key]
					fieldArr.push(<input key = {(Math.random() * 10000) + Math.random()  * 10000} className = 'field_input'  type="text" placeholder = "something" value={fieldName} name = {key} onChange = { this.onChangeHandler}/>) 
					
				})
		return(<div >
				{fieldArr.map((val) => {
					return val;
				})}
			</div>
			)
	}
}

export default FieldCol;
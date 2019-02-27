import React, {Component} from 'react';
import FieldCol from './FieldCol';

class Fields extends Component {

	render() {
		let fieldVals = [];
		const fields = this.props.fields;
		for (let keys in fields) {
				const values = fields[keys];
				fieldVals.push(<div className={'Field' + keys}  key = {Math.random() + keys} >
									<FieldCol inputChange = {this.props.onInputChange} fieldCol = {values}></FieldCol>
								</div>)
						
				
			
			}
			return fieldVals.map((fieldVal) => {
				return fieldVal
			})
	}
}

export default Fields;
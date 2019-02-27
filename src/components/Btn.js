import React, {Component} from 'react';

class Btn extends Component {
	render() {
		return <input onClick = {this.props.onClick} className = "Btn" type="button" value = "Randomize"/>
	}
}

export default Btn;
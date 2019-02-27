import React, {Component} from 'react';

class Result extends Component {
	render() {
		return(this.props.results.map((result, idx) => {
			return (
						<h1 key = {(Math.random() * idx * 10000) + Math.random()  * 10000}>{result}</h1>
					)
			})
		)
	}
}

export default Result;
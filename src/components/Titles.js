import React from 'react';

const Titles = (props) => {
	return props.titleName.map((title, index) => {
		return  <h1 key = {(Math.random() * index * 10000) + Math.random()  * 10000} >{title}</h1>
		
	})
}

export default Titles;
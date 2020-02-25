import React, { Component } from "react";
import { scale } from "./components/Scale";
import Chart from './chart'

class Demo extends Component {
	constructor(props) {
		super(props);
	}

	scaleLinear = scale([0, 100], [0, 1000]);

	scaleBand = scale([1, 2, 3, 4], [0, 100], "band");

	render() {
		return (
			<div>
				{this.scaleLinear(10)}
				<br />
				{this.scaleBand(2)}
				<Chart padding={50} width={800} height={500}></Chart>
			</div>
		);
	}
}

export default Demo;

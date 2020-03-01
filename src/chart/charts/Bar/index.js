import React, { Component } from "react";
import { select } from "d3";
import {scale} from "../../components/Scale";
import Axis from "../../components/Axis/CategoryAxis";
import { random } from "../../mathUtils";

const mockData = {
	x: ["一", "二", "三", "四", "五"],
	y: [300, 500, 400, 900, 100],
};

let xScale = scale(mockData.x, [50, 750], 'band');
let yscale = scale([0, Math.max(mockData.y) * 1.2], [450, 50]);

class Bar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "bar" + random(5),
		};
	}

	componentWillMount() {
		
	}


	render() {
		const { id } = this.state;
		return <div id={id}></div>;
	}
}

export default Bar;

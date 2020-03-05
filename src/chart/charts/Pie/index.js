import React from "react";
import BaseShape from "../BaseShape";
import { pie, arc } from "d3";
import {color3} from "../../util/color";


class Pie extends BaseShape {
	createArcs = props => {
		let {
			data,
			outerRadius = 100,
			innerRadius = 0,
			cx = this.props.wrapperStyle.width / 2,
			cy = this.props.wrapperStyle.height / 2,
    } = props || this.props;

		let style = {
			transform: `translate(${cx}px,${cy}px)`,
		};

		let pieCreator = pie().value(d => d.range).sort((a, b)=>b);
		let pieData = pieCreator(data);
		let pieArc = arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius);

		return pieData.map((item, index) => {
			return (
				<g style={style} key={index}>
					<path fill={color3[index]} opacity={0.5} d={pieArc(item)}></path>
				</g>
			);
		});

		// return data.map((item, index) => {
		// 	return (

		// 	);
		// });
	};

	render() {
		return <g>{this.createArcs()}</g>;
	}
}

export default Pie;

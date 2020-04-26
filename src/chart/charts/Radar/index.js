import React from "react";
import BaseShape from "../BaseShape";
import { interpolateNumber } from "d3";
import { polarToCartesian } from "../../util/mathUtils";

class Radar extends BaseShape {
	constructor(props) {
		super(props);
		this.state = {
			preData: null,
			data: null,
			VisualMapObj: null,
		};
	}

	animation = (precent, props) => {
		let { data } = props;
		let { preData } = this.state;

		if (precent > 1) {
			precent = 1;
		}

		let nextData = data.map((item, index) => {
			const interpolatorAngle = interpolateNumber(preData ? preData[index].angle : 0, item.angle);
			const interpolatorRadius = interpolateNumber(
				preData ? preData[index].radius : 0,
				item.radius
			);
			return {
				...item,
				angle: interpolatorAngle(precent),
				radius: interpolatorRadius(precent),
			};
		});

		// console.log(this.props.option.key)

		this.setState({
			data: nextData,
		});
	};

	renderRadar = props => {
		let {
			colorScale,
			option,
			cx = this.props.wrapperStyle.width / 2,
			cy = this.props.wrapperStyle.height / 2,
		} = props || this.props;
		let points = "";

		let { data } = this.state;
		console.log(Math.cos(0))
		data && data.map(item => {
			let coordinate = polarToCartesian(cx, cy, item.radius, item.angle);
			points = points + coordinate.x + "," + coordinate.y + " ";
		});


		return (
			data && (
				<polygon
					points={points}
					stroke={colorScale(option.key)}
					fill="none"
				/>
			)
		);
	};

	render() {
		return <g>{this.renderRadar()}</g>;
	}
}

export default Radar;

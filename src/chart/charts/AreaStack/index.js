import React from "react";
import BaseShape from "../BaseShape";
import { color3 } from "../../util/color";
import { area, curveCardinal,interpolateArray, interpolateNumber } from "d3";

class AreaStack extends BaseShape {
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

		// console.log(data)

		let nextData = data.map((item, index) => {
			const interpolatorY = interpolateArray(
				preData
					? preData[index]
						? preData[index].y
						: preData[preData.length - 1].y
					: new Array(item.y.length).fill(0),
				item.y
			);
			const interpolatorX = interpolateNumber(
				preData ? (preData[index] ? preData[index].x : preData[preData.length - 1].x) : 0,
				item.x
			);
			return {
				x: interpolatorX(precent),
				y: interpolatorY(precent),
				// x:item.x,
				// y:item.y
			};
		});

		// console.log(this.props.option.key)

		this.setState({
			data: nextData,
		});
	};

	renderArea = () => {
		let { isActive, isUnActive, wrapperStyle } = this.props;
		let { data } = this.state;

		return (
			data &&
			data[0].y.map((item, index) => {
				let path = area()
					.x(item => {
						return item.x;
					})
					.y1(item => {
						return item.y[index];
					})
					.y0(item=>index === 0 ? wrapperStyle.height - wrapperStyle.padding.bottom : item.y[index - 1]);

				path.curve(curveCardinal);

				return (
					data && (
							<g key={index}>
								<path
									opacity={isActive ? 1 : 0.8}
									fill={
										isUnActive
											? "transparent"
											: color3[index]
									}
									d={path(data)}
									className="area"
								></path>
							</g>
					)
				);
			})
		);
	};

	render() {
		return <g>{this.renderArea()}</g>;
	}
}

export default AreaStack;

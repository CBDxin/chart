import React from "react";
import BaseShape from "../BaseShape";

const WIDTH = 0.2;

class Scatter extends BaseShape {
	constructor(props) {
		super(props);
		this.state = {
			preData: null,
			data: null,
			VisualMapObj: null,
		};
	}

	renderScatter = () => {
		let { xScale, option, colorScale, activeTickItem, isActive, isUnActive } = this.props;
		let { data, VisualMapObj } = this.state;
		let bandWidth = xScale.bandwidth();
		let defaultWidth = bandWidth * WIDTH;

		// console.log(VisualMapObj);

		return (
			data &&
			data.map((item, index) => {
				return (
					<circle
						key={index}
						cx={item.x}
						cy={item.y}
						r={
							VisualMapObj && VisualMapObj.mapRadiuss
								? VisualMapObj.mapRadiuss[index] * defaultWidth || 0
								: defaultWidth || 0
						}
						opacity={
							(activeTickItem && index === activeTickItem.activeIndex) || isActive ? 0.8 : 0.5
						}
						fill={
							isUnActive
								? "transparent"
								: VisualMapObj && VisualMapObj.mapColors
								? VisualMapObj.mapColors[index]
								: colorScale(option.key)
						}
					></circle>
				);
			})
		);
	};

	render() {
		return <g>{this.renderScatter()}</g>;
	}
}

export default Scatter;

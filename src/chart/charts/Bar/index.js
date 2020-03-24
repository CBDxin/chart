import React from "react";
import BaseShape from "../BaseShape";

const WIDTH = 0.3;

class Bar extends BaseShape {
	constructor(props) {
		super(props);
		this.state = {
			preData: null,
			data: null,
			VisualMapObj:null
		};
	}

	createRects = () => {
		let { xScale ,wrapperStyle, option, colorScale, activeTickItem, isActive } = this.props;

		let bandWidth = xScale.bandwidth();
		let width = bandWidth * WIDTH;
		let { data, VisualMapObj } = this.state;

		return data && data.map((item, index) => {
			return (
				<rect
					key={index}
					x={item.x - width / 2}
					y={item.y}
					height={wrapperStyle.height - wrapperStyle.padding.bottom - item.y}
					width={width}
					opacity={activeTickItem && (index === activeTickItem.activeIndex) || isActive ? 0.8 : 0.5}
					fill={VisualMapObj && VisualMapObj.mapColors ? VisualMapObj.mapColors[index] : colorScale(option.key)}
				></rect>
			);
		});
	};

	render() {
		return <g>{this.createRects()}</g>;
	}
}

export default Bar;

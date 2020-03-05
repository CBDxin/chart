import React from "react";
import BaseShape from "../BaseShape";
import Rectangle from "../../shape/Rectangle";

const WIDTH = 0.3;

class Bar extends BaseShape {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		d: "",
	// 	};

	// }

	// componentDidMount = () => {
	//   this.createPath()
	// };

	// UNSAFE_componentWillReceiveProps(nextProps){
	// 	this.createPath(nextProps);
	// }

	createRects = props => {
		let { data, xScale, yScale, wrapperStyle, option, colorScale, activeTickItem, isActive } = props || this.props;
		let bandWidth = xScale.bandwidth();
		let width = bandWidth * WIDTH;

		return data.map((item, index) => {
			return (
				<rect
					key={index}
					x={xScale(item.domain) - width / 2}
					y={yScale(item.range)}
					height={wrapperStyle.height - wrapperStyle.padding - yScale(item.range)}
					width={width}
					opacity={activeTickItem && (index === activeTickItem.activeIndex) || isActive ? 0.8 : 0.5}
					fill={colorScale(option.key)}
				></rect>
			);
		});
	};

	render() {
		return <g>{this.createRects()}</g>;
	}
}

export default Bar;

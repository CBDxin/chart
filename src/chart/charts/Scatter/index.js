import React from "react";
import BaseShape from "../BaseShape";

const WIDTH = 0.1;

class Scatter extends BaseShape {
	constructor(props) {
		super(props);
		this.state = {
			preData: null,
			data: null,
		};
	}

	renderScatter = () => {
    let {xScale, option,colorScale, activeTickItem, isActive } = this.props;
    let {data} = this.state;
		let bandWidth = xScale.bandwidth();
		let defaultWidth = bandWidth * WIDTH;

		return data && data.map((item, index) => {
			return (
				<circle
					key={index}
					cx={item.x}
					cy={item.y}
          r={defaultWidth}
          opacity={activeTickItem && (index === activeTickItem.activeIndex) || isActive ? 0.8 : 0.5}
          fill={colorScale(option.key)}
				></circle>
			);
		});
	};

	render() {
		return <g>{this.renderScatter()}</g>;
	}
}

export default Scatter;

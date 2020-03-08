import React from "react";
import BaseShape from "../BaseShape";

const WIDTH = 0.3;

class Bar extends BaseShape {
	constructor(props) {
		super(props);
		this.state = {
			preData: null,
			data: null
		};
	}

	componentWillMount(){
		this.renderWithAnimation()
	}

	UNSAFE_componentWillReceiveProps(nextProps){
		this.setState({
			preData:this.state.data
		}, this.renderWithAnimation(nextProps))
	}

	createRects = () => {
		let { xScale ,wrapperStyle, option, colorScale, activeTickItem, isActive } = this.props;

		let bandWidth = xScale.bandwidth();
		let width = bandWidth * WIDTH;
		let { data } = this.state;

		return data && data.map((item, index) => {
			return (
				<rect
					key={index}
					x={item.x - width / 2}
					y={item.y}
					height={wrapperStyle.height - wrapperStyle.padding - item.y}
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

import React from "react";
import BaseShape from "../BaseShape";
import {color3} from "../../util/color";
import { interpolateArray, interpolateNumber } from "d3";

const WIDTH = 0.4;

class BarStack extends BaseShape {
	constructor(props) {
		super(props);
		this.state = {
			preData: null,
			data: null,
			VisualMapObj: null,
		};
	}

	animation = (precent, props) => {
		let { data, wrapperStyle:{height, padding} } = props;
		let { preData } = this.state;

		if (precent > 1) {
			precent = 1;
		}

		// console.log(data)

		let nextData = data.map((item, index) => {
			const interpolatorY = interpolateArray(
				preData ? (preData[index] ? preData[index].y : preData[preData.length - 1].y) : new Array(item.y.length).fill(0),
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

	createRects = () => {
		let {
			xScale,
			wrapperStyle,
			activeTickItem,
			isActive,
			isUnActive,
		} = this.props;

		let bandWidth = xScale.bandwidth();
		let width = bandWidth * WIDTH;
		let { data } = this.state;

		return (
			data &&
			data.map((item, index) => {
				return item.y && item.y.map((rangeItem, rangeIndex) => (
					<rect
						key={index + "-" + rangeIndex}
						x={item.x - width / 2}
						y={rangeItem}
						height={
							rangeIndex === 0
								? wrapperStyle.height - wrapperStyle.padding.bottom - rangeItem 
								: item.y[rangeIndex - 1] - rangeItem
						}
						width={width}
						opacity={
							(activeTickItem && index === activeTickItem.activeIndex) || isActive ? 0.6 : 0.9
						}
						fill={isUnActive ? "transparent" : color3[rangeIndex]}
					></rect>
				));
			})
		);
	};

	render() {
		return <g>{this.createRects()}</g>;
	}
}

export default BarStack;

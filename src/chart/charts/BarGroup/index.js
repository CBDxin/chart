import React from "react";
import BaseShape from "../BaseShape";
import {color3} from "../../util/color";
import { interpolateArray, interpolateNumber } from "d3";

const WIDTH = 0.4;

class Bar extends BaseShape {
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
			data.map((d, i) => {
				return d.y.map((item, index)=>(
					<rect
						key={i + '-' + index}
						x={d.x - width / 2 + index * width / d.y.length}
						y={item}
						height={wrapperStyle.height - wrapperStyle.padding.bottom - item}
						width={width / d.y.length}
						opacity={
							(activeTickItem && index === activeTickItem.activeIndex) || isActive ? 0.6 : 0.9
						}
						fill={
							isUnActive
								? "transparent"
								: color3[index]
						}
					></rect>
				))
			})
		);
	};

	render() {
		return <g>{this.createRects()}</g>;
	}
}

export default Bar;

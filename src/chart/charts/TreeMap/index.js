import React from "react";
import BaseShape from "../BaseShape";
import { interpolateNumber } from "d3";
import { color3 } from "../../util/color";

class TreeMap extends BaseShape {
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
			const interpolatorX = interpolateNumber(
				preData ? preData[index].x0 : (item.x0 + item.x1) / 2,
				item.x0
			);
			const interpolatorY = interpolateNumber(
				preData ? preData[index].y0 : (item.y0 + item.y1) / 2,
				item.y0
			);
			const interpolatorWidth = interpolateNumber(
				preData ? preData[index].width : 0,
				item.x1 - item.x0
			);
			const interpolatorHeight = interpolateNumber(
				preData ? preData[index].height : 0,
				item.y1 - item.y0
			);
			return {
				...item,
				x: interpolatorX(precent),
				y: interpolatorY(precent),
				width: interpolatorWidth(precent),
				height: interpolatorHeight(precent),
			};
		});

		// console.log(this.props.option.key)

		this.setState({
			data: nextData,
		});
	};

	createArcs = props => {
		let { cx = this.props.wrapperStyle.width * 0.2, cy = this.props.wrapperStyle.height * 0.2 } =
			props || this.props;

		let { data } = this.state;

		// console.log('-----pieData', data)

		let style = {
			transform: `translate(${cx}px,${cy}px)`,
		};

		return (
			<g style={style}>
				{data &&
					data.map((item, index) => (
						<g key={index}>
							<rect
								x={item.x}
								y={item.y}
								width={item.width}
								height={item.height}
								fill={color3[index]}
							></rect>
							<text
								textAnchor="middle"
								x={item.x + item.width / 2}
								y={item.y + item.height / 2}
								fontSize="16"
							>
								{item.data.name}
							</text>
						</g>
					))}
			</g>
		);

		// return data.map((item, index) => {
		// 	return (

		// 	);
		// });
	};

	render() {
		return <g>{this.createArcs()}</g>;
	}
}

export default TreeMap;

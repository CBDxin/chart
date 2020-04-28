import React from "react";
import BaseShape from "../BaseShape";
import Line from "../../shape/Line";
import { interpolateNumber } from "d3";
import { polarToCartesian } from "../../util/mathUtils";

class PolarScatter extends BaseShape {
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
			const interpolatorAngle = interpolateNumber(
				preData && preData[index] ? preData[index].angle : item.angle,
				item.angle
			);
			const interpolatorRadius = interpolateNumber(
				preData && preData[index] ? preData[index].radius : 0,
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

	renderPolarAxis = props => {
		let {
			option: { maxRadius = 100 },
			cx = this.props.wrapperStyle.width / 2,
			cy = this.props.wrapperStyle.height / 2,
			radiusScale,
			angleScale,
		} = props || this.props;
		let { data } = this.state;
		let lines = [];
		let ticksRadius = radiusScale && radiusScale.ticksValue(),
			ticksAngle = angleScale && angleScale.ticksValue();

		ticksAngle &&
			ticksAngle.map(item => {
				let coordinate = polarToCartesian(cx, cy, maxRadius, item);
				lines.push([
					{ x: cx, y: cy },
					{ x: coordinate.x, y: coordinate.y },
				]);
			});

		return (
			data && (
				<g>
					{lines.map((item, index) => (
						<Line key={index} data={item} color={"grey"}></Line>
					))}
					{ticksRadius.map((item, index) => (
						<circle
							key={index}
							cx={cx}
							cy={cy}
							r={item}
							stroke={"grey"}
							fill={"none"}
						></circle>
					))}
				</g>
			)
		);
	};

	renderScatter = props => {
		let {
			colorScale,
			option,
			cx = this.props.wrapperStyle.width / 2,
			cy = this.props.wrapperStyle.height / 2,
			activeTickItem,
			isActive,
			isUnActive,
		} = props || this.props;
		let points = [];
		let { data, VisualMapObj } = this.state;
		let defaultWidth = 5;

		data &&
			data.map(item => {
				let coordinate = polarToCartesian(cx, cy, item.radius, item.angle);
				points.push({ x: coordinate.x, y: coordinate.y });
			});

		return (
			points &&
			points.map((item, index) => {
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
		return (
			<g>
				{this.renderPolarAxis()}
				{this.renderScatter()}
			</g>
		);
	}
}

export default PolarScatter;

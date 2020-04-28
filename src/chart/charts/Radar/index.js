import React from "react";
import BaseShape from "../BaseShape";
import Line from "../../shape/Line";
import { interpolateNumber } from "d3";
import { polarToCartesian } from "../../util/mathUtils";

class Radar extends BaseShape {
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
			const interpolatorAngle = interpolateNumber(preData && preData[index] ? preData[index].angle : item.angle, item.angle);
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

	renderPolarAxis = (props)=>{
		let {
			option:{maxRadius = 100},
			cx = this.props.wrapperStyle.width / 2,
			cy = this.props.wrapperStyle.height / 2,
		} = props || this.props;
		let { data } = this.state;
		let points = "", lines = [];	

		data && data.map(item => {
			let coordinate = polarToCartesian(cx, cy, maxRadius, item.angle);
			points = points + coordinate.x + "," + coordinate.y + " ";
			lines.push([{x:cx,y:cy},{x:coordinate.x, y:coordinate.y}]);
		});

		return data && <g>
			<polygon
					points={points}
					stroke={"grey"}
					fill="none"
				/>
			{lines.map((item, index)=>(
				<Line key={index} data={item} color={"grey"}></Line>	
			))}
		</g>
	}

	renderRadar = props => {
		let {
			colorScale,
			option,
			cx = this.props.wrapperStyle.width / 2,
			cy = this.props.wrapperStyle.height / 2,
		} = props || this.props;
		let points = "";
		let { data } = this.state;

		data && data.map(item => {
			let coordinate = polarToCartesian(cx, cy, item.radius, item.angle);
			points = points + coordinate.x + "," + coordinate.y + " ";
		});


		return (
			data && (
				<polygon
					points={points}
					stroke={colorScale(option.key)}
					fill={colorScale(option.key)}
					opacity={0.8}
				/>
			)
		);
	};

	render() {
		return <g>
			{this.renderPolarAxis()}
			{this.renderRadar()}
			</g>;
	}
}

export default Radar;

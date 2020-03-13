import React from "react";
import BaseShape from "../BaseShape";
import { area, curveCardinal } from "d3";

import LinearGradient from "../../components/LinearGradient";

class Area extends BaseShape {
	constructor(props) {
		super(props);
		this.state = {
			preData: null,
			data: null,
		};
	}

	componentDidMount = () => {
		this.renderWithAnimation();
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState(
			{
				preData: this.state.data,
			},
			this.renderWithAnimation(nextProps)
		);
	}

	renderArea = () => {
		let { wrapperStyle, colorScale, option, isActive } = this.props;
		let { data } = this.state;

		// console.log(data)

		let path = area()
			.x(item => {
				return item.x;
			})
			.y1(item => {
				return item.y;
			})
			.y0(wrapperStyle.height - wrapperStyle.padding.bottom);

		path.curve(curveCardinal);

		return (
			data && <g>
				<path
					opacity={isActive ? 0.5 : 0.3}
					fill={colorScale(option.key)}
					d={path(data)}
					className="area"
				></path>
			</g>
		);
	};

	render() {
		return (
			<React.Fragment>
				{/* <LinearGradient id="area" colors={color}></LinearGradient> */}
				{/* <g>{d && <path opacity={0.3}  fill={"url(#area)"} d={d} className="area"></path>}</g> */}
				{this.renderArea()}
				{this.renderDot()}
			</React.Fragment>
		);
	}
}

export default Area;

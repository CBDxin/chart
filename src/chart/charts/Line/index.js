import React from "react";
import BaseShape from "../BaseShape";
import { line, curveCardinal } from "d3";

class Line extends BaseShape {
	constructor(props) {
		super(props);
		this.state = {
			preData: null,
			data: null,
		};
	}

	renderLine = () => {
		let { option, colorScale, isActive } = this.props;
		let { data } = this.state;
		let path = line()
			.x(item => {
				return item.x;
			})
			.y(item => {
				return item.y;
			});

		// path.curve(curveCardinal);

		return (
			<g>
				{data && (
					<path
						d={path(data)}
						className="line"
						fill="none"
						stroke={colorScale(option.key)}
						strokeWidth={isActive ? "3px" : "2px"}
					></path>
				)}
			</g>
		);
	};

	render() {
		return (
			<React.Fragment>
				{this.renderLine()}
				{this.renderDot()}
			</React.Fragment>
		);
	}
}

export default Line;

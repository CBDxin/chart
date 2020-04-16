import React from "react";
import BaseShape from "../BaseShape";
import { line, curveCardinal } from "d3";

import LinearGradient from "../../components/LinearGradient";

class Line extends BaseShape {
	constructor(props) {
		super(props);
		this.state = {
			preData: null,
			data: null,
			VisualMapObj: null,
		};
	}

	renderLine = () => {
		let { option, colorScale, isActive, isUnActive } = this.props;
		let { data, VisualMapObj } = this.state;
		let colorCradient;
		let path = line()
			.x(item => {
				return item.x;
			})
			.y(item => {
				return item.y;
			});

		// path.curve(curveCardinal);
		if (VisualMapObj) {
			if (VisualMapObj.mapColors) {
				colorCradient = (
					<LinearGradient id="colorCradient" colors={VisualMapObj.mapColors}></LinearGradient>
				);
			}
		}

		return (
			<g>
				{colorCradient && colorCradient}
				{data && (
					<path
						d={path(data)}
						className="line"
						fill="none"
						stroke={
							isUnActive
								? "transparent"
								: colorCradient
								? "url(#colorCradient)"
								: colorScale(option.key)
						}
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
				{/* {this.renderDot()} */}
			</React.Fragment>
		);
	}
}

export default Line;

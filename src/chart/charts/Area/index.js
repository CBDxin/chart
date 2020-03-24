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
			mapScales:null,
			VisualMapObj:null
		};
	}

	renderArea = () => {
		let { wrapperStyle, colorScale, option, isActive } = this.props;
		let { data, VisualMapObj } = this.state;
		let colorCradient;

		// console.log(data)

		if(VisualMapObj){
			if(VisualMapObj.mapColors){
				colorCradient = <LinearGradient id="colorCradient" colors={VisualMapObj.mapColors}></LinearGradient>
			}
		}

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
			data && <React.Fragment>
					<g>
						{colorCradient}
						<path
							opacity={isActive ? 1 : 0.8}
							fill={colorCradient ? "url(#colorCradient)" : colorScale(option.key)}
							d={path(data)}
							className="area"
						></path>
					</g>
				</React.Fragment>
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

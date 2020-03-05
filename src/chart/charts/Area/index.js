import React from "react";
import BaseShape from "../BaseShape";
import { area, curveCardinal } from "d3";

import LinearGradient from "../../components/LinearGradient";

class Area extends BaseShape {
	constructor(props) {
		super(props);
		this.state = {
			d: "",
		};
	}

	componentDidMount = () => {
		this.createPath();
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.createPath(nextProps);
	}

	createPath = props => {
		let { data, xScale, yScale } = props || this.props;
		let path = area()
			.x(item => {
				return xScale(item.domain);
			})
			.y1(item => {
				return yScale(item.range);
			})
			.y0(450);

		path.curve(curveCardinal)

		this.setState({
			d: path(data),
		});
	};

	render() {
		const { d } = this.state;
		const { colorScale, option, isActive } = this.props;
		return(
			<React.Fragment>
				{/* <LinearGradient id="area" colors={color}></LinearGradient> */}
				{/* <g>{d && <path opacity={0.3}  fill={"url(#area)"} d={d} className="area"></path>}</g> */}
				<g>{d && <path opacity={isActive ? 0.5 : 0.3} fill={colorScale(option.key)} d={d} className="area"></path>}</g>
				{this.renderDot()}
			</React.Fragment>
		)
	}
}

export default Area;

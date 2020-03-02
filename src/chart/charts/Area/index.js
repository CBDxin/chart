import React from "react";
import BaseShape from "../BaseShape";
import { area } from "d3";

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

		this.setState({
			d: path(data),
		});
	};

	render() {
		const { d } = this.state;
		const { chartIndex, color } = this.props;
		return(
			<React.Fragment>
				<LinearGradient id="area" colors={color}></LinearGradient>
				<g>{d && <path opacity={0.3}  fill={"url(#area)"} d={d} className="area"></path>}</g>
				{/* <g>{d && <path opacity={0.3} fill={color[chartIndex]} d={d} className="area"></path>}</g> */}
			</React.Fragment>
		)
	}
}

export default Area;

import React from "react";
import BaseShape from "../BaseShape";
import { area } from "d3";

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

	createPath = (props) => {
		let { data, xScale, yScale } = props || this.props;
		let path = area()
			.x(item => {
				return xScale(item.x);
			})
			.y1(item => {
				return yScale(item.y);
			})
			.y0(450);

		this.setState({
			d: path(data),
		});
	};

	render() {
		const { d } = this.state;
		return <g>{d && <path d={d} className="area" fill="red" stroke="rea"></path>}</g>;
	}
}

export default Area;

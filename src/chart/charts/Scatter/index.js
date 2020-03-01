import React from "react";
import BaseShape from "../BaseShape";

const WIDTH = 0.1;

class Scatter extends BaseShape {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		d: "",
	// 	};

	// }

	// componentDidMount = () => {
	//   this.createPath()
	// };

	// UNSAFE_componentWillReceiveProps(nextProps){
	// 	this.createPath(nextProps);
	// }

	createCircles = props => {
		let { data, xScale, yScale, wrapperStyle } = props || this.props;
		let bandWidth = xScale.bandwidth();
		let defaultWidth = bandWidth * WIDTH;

		return data.map((item, index) => {
			return (
				<circle
					key={index}
					cx={xScale(item.domain)}
					cy={yScale(item.range)}
					r={defaultWidth}
				></circle>
			);
		});
	};

	render() {
		return <g>{this.createCircles()}</g>;
	}
}

export default Scatter;

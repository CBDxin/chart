import React from "react";
import BaseShape from "../BaseShape";
import Reactangle from "../../shape/Reactangle";

const WIDTH = 0.3;

class Bar extends BaseShape {
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

	createReacts = props => {
		let { data, xScale, yScale, wrapperStyle } = props || this.props;
		let bandWidth = xScale.bandwidth();
		let width = bandWidth * WIDTH;

		return data.map((item, index) => {
			return (
				<Reactangle
					key={index}
					x={xScale(item.domain) - width / 2}
					y={yScale(item.range)}
					height={wrapperStyle.height - wrapperStyle.padding - yScale(item.range)}
					width={width}
				></Reactangle>
			);
		});
	};

	render() {
		return <g>{this.createReacts()}</g>;
	}
}

export default Bar;

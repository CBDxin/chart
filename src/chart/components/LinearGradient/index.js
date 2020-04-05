import React, { Component } from "react";

class LinearGradient extends Component {
	render() {
		const { type = "horizon", colors, id } = this.props;
		let bandWidth = (1 / (colors.length - 1)) * 100;
		let linearGradientProps;

		if (type === "horizon") {
			linearGradientProps = {
				x1: "0%",
				y1: "0%",
				x2: "100%",
				y2: "0%",
			};
		} else if (type === "vertical") {
			linearGradientProps = {
				x1: "0%",
				y1: "0%",
				x2: "0%",
				y2: "100%",
			};
		}

		return (
			<defs>
				<linearGradient id={id} {...linearGradientProps}>
					{colors.map((item, index) => (
						<stop key={index} offset={`${index * bandWidth}%`} style={{stopColor:item}} />
					))}
				</linearGradient>
			</defs>
		);
	}
}

export default LinearGradient;

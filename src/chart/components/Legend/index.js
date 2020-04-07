import React, { Component } from "react";

import "./index.less";

class Legend extends Component {
	renderContent = () => {
		let { option, colorScale, setActiveCharts, setUnActiveCharts, unActiveCharts } = this.props;

		return (
			<React.Fragment>
				{option.dataItems &&
					option.dataItems.map((item, index) => {
						let isUnActive = unActiveCharts.indexOf(item) === 0
						return (
							<div
								onMouseLeave={() => setActiveCharts(item)}
								onMouseEnter={() => setActiveCharts(item)}
								onClick={() => setUnActiveCharts(item)}
								key={index}
								className="legend-item"
							>
								<span className="color-label" style={{ background: isUnActive ? "gray" : colorScale(item) }}></span>
								{item}
							</div>
						);
					})}
			</React.Fragment>
		);
	};

	render() {
		return <div className="legend-wrapper">{this.renderContent()}</div>;
	}
}

export default Legend;

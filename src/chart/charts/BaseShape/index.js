import React, { Component } from "react";
import {scale} from "../../components/Scale";

import { transition } from "../../util/mathUtils";
import { interpolateNumber } from "d3";


class BaseChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
	
    };
  }
  
  renderDot = (props)=>{
    let { data, xScale, yScale, option, colorScale, activeTickItem, isActive } = props || this.props;

		return data.map((item, index) => {
			return (
				<circle
					key={index}
					cx={xScale(item.domain)}
					cy={yScale(item.range)}
          r={activeTickItem && (index === activeTickItem.activeIndex) || isActive ? 5 : 3}
          stroke={colorScale(option.key)}
          fill={ "#fff" }
				></circle>
			);
		});
  }

  renderWithAnimation = props => {
		transition(precent => {
			this.animation(precent, props || this.props);
		}, 300);
	};

	animation = (precent, props) => {
		let { data } = props;
		let { preData } = this.state;

		let nextData = data.map((item, index) => {
			const interpolatorY = interpolateNumber(preData ? preData[index].y : 0, item.y);
			const interpolatorX = interpolateNumber(preData ? preData[index].x : 0, item.x);
			return {
				x: interpolatorX(precent),
				y: interpolatorY(precent),
			};
		});

		this.setState({
			data: nextData,
		});
	};
  
}

export default BaseChart;
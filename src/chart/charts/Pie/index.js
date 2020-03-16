import React from "react";
import BaseShape from "../BaseShape";
import { arc, interpolateNumber } from "d3";
import {color3} from "../../util/color";


class Pie extends BaseShape {
  constructor(props) {
		super(props);
		this.state = {
			preData: null,
			data: null,
		};
  }
  
  animation = (precent, props) => {
		let { data } = props;
    let { preData } = this.state;
    
    if(precent > 1){precent = 1}

		let nextData = data.map((item, index) => {
			const interpolatorStartAngle = interpolateNumber(preData ? preData[index].startAngle : 0, item.startAngle);
			const interpolatorEndAngle = interpolateNumber(preData ? preData[index].endAngle : 0, item.endAngle);
			return {
        ...item,
				startAngle: interpolatorStartAngle(precent),
				endAngle: interpolatorEndAngle(precent),
			};
    });
    
    // console.log(this.props.option.key)

		this.setState({
			data: nextData,
		});
	};

	createArcs = props => {
		let {
			outerRadius = 100,
			innerRadius = 0,
			cx = this.props.wrapperStyle.width / 2,
			cy = this.props.wrapperStyle.height / 2,
    } = props || this.props;

    let { data } = this.state;

		let style = {
			transform: `translate(${cx}px,${cy}px)`,
		};

		let pieArc = arc()
			.innerRadius(innerRadius)
      .outerRadius(outerRadius);

		return data && data.map((item, index) => {
			return (
				<g style={style} key={index}>
					<path fill={color3[index]} opacity={0.5} d={pieArc(item)}></path>
				</g>
			);
		});

		// return data.map((item, index) => {
		// 	return (

		// 	);
		// });
	};

	render() {
		return <g>{this.createArcs()}</g>;
	}
}

export default Pie;

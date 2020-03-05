import React from "react";
import BaseShape from "../BaseShape";
import { line, curveCardinal } from "d3";

class Line extends BaseShape {
	constructor(props) {
		super(props);
		this.state = {
			d: "",
		};

	}

	componentDidMount = () => {
    this.createPath()
  };

  UNSAFE_componentWillReceiveProps(nextProps){
		this.createPath(nextProps);
	}
  
  createPath = (props)=>{
    let { data, xScale, yScale } = props || this.props;
    let path = line()
			.x(item => {
				return xScale(item.domain);
			})
			.y(item => {
				return yScale(item.range);
			});
			
			// path.curve(curveCardinal);

		this.setState({
			d: path(data),
		});
  }

	render() {
		const { d } = this.state;
		const { option, colorScale, isActive } = this.props;
		return (
			<React.Fragment>
				<g>{d && <path d={d} className="line" fill="none" stroke = {colorScale(option.key)} strokeWidth={isActive ? "3px" : "2px"}></path>}</g>
				{this.renderDot()}
			</React.Fragment>
		)
		
	}
}

export default Line;

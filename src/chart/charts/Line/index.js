import React from "react";
import BaseShape from "../BaseShape";
import { line } from "d3";

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

		this.setState({
			d: path(data),
		});
  }

	render() {
		const { d } = this.state;
		const { chartIndex, color } = this.props;
		return <g>{d && <path d={d} className="line" fill="none" stroke = {color[chartIndex]} strokeWidth="2px"></path>}</g>;
	}
}

export default Line;

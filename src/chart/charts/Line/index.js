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
				return xScale(item.x);
			})
			.y(item => {
				return yScale(item.y);
			});

		this.setState({
			d: path(data),
		});
  }

	render() {
		const { d } = this.state;
		return <g>{d && <path d={d} className="line" fill="none" stroke = "#000" strokeWidth="2px"></path>}</g>;
	}
}

export default Line;

import React, {Component} from "react";

import { line } from "d3";

class Line extends Component {
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
		const { data } = props || this.props;
    let path = line()
			.x((item) => {
				return item.x
			})
			.y(item => {
				return item.y
			});

		this.setState({
			d: path(data),
		});
  }

	render() {
		const { d } = this.state;
		const { color } = this.props
		return <g>{d && <path d={d} className="line" fill="none" stroke = {color || "#000"} strokeWidth="1px"></path>}</g>;
	}
}

export default Line;

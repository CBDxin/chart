import React from "react";
import BaseShape from "../BaseShape";
import { linkHorizontal,interpolateNumber } from "d3";

class Tree extends BaseShape {
	constructor(props) {
		super(props);
		this.state = {
			preData: null,
			data: null,
			VisualMapObj: null,
		};
	}

	animation = (precent, props) => {
		let { data } = props;

		if (precent > 1) {
			precent = 1;
		}

		this.setState({
			data: data,
		});
	};

	createLinks = () => {
		let { data } = this.state;

		let linkCreator = linkHorizontal()
			.x(d => d.y)
			.y(d => d.x);
		let links = data ? data.links().map(item => linkCreator(item)) : undefined;

		return (
			<g>
				{links &&
					links.map((item, index) => (
						<g key={index}>
							<path fill="none" strokeWidth={1.5} stroke={"#555"} d={item}></path>
						</g>
					))}
			</g>
		);
	};

	createNodes = ()=>{
		let { data } = this.state;
		return <g>
			{
				data && data.descendants().map((item, index)=>(
					<circle
						fill="#fff"
						stroke="#000"
						cx={item.y}
						cy={item.x}
						r={5}
						key={index}
					></circle>
				))
			}
		</g>
	}

	createTexts = ()=>{
		let { data } = this.state;
		return <g>
			{
				data && data.descendants().map((item, index)=>(
					<text
						x={item.children ? item.y - 8 : item.y + 8}
						y={item.x}
						fontSize={12}
						key={index}
						textAnchor={item.children ? "end" : "start"}
						dominantBaseline="middle"
					>
						{item.data.name}
					</text>
				))
			}
		</g>
	}

	render() {
		let { cx = this.props.wrapperStyle.width * 0.2, cy = this.props.wrapperStyle.height * 0.5 } = this.props;

		let style = {
			transform: `translate(${cx}px,${cy}px)`,
		};
		return <g style={style}>
			{this.createLinks()}
			{this.createNodes()}
			{this.createTexts()}
		</g>;
	}
}

export default Tree;

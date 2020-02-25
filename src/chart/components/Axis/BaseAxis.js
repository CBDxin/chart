import React, { Component } from "react";
import Line from "../../shape/Line";

/*
state = {
  tickItems:[
    {
      tick:string||number,
      tickData:string||number
    },
  ],
  axislinePath:[
    {
      x:,
      y:,
    },
  ]
},
props:{
  scale:bandSCale,
  data:[],
}
*/

class BaseAxis extends Component {
	getAxisLinePath = (props) => {
    props = props || this.props;
		const { padding, width, height, position } = props.option;
		let x0 = position !== "right" ? padding : width - padding,
			y0 = position !== "bottom" ? padding : height - padding,
			x1 = position !== "left" ? width - padding : padding,
			y1 = position !== "top" ? height - padding : padding;

		this.setState({
			axisLinePath: [
				{
					x: x0,
					y: y0,
				},
				{
					x: x1,
					y: y1,
				},
			],
		});
	};

	renderTexts = () => {
    const { position, padding, width, height, fontSize = 12 } = this.props.option;
		return this.state.tickItems.map((item, index) => (
			<text
				fontSize={fontSize}
				x={
					position === "bottom" || position === "top"
						? item.tick
						: position === "left"
						? padding - fontSize
						: width - padding + fontSize
				}
				y={
					position === "left" || position === "right"
						? item.tick
						: position === "top"
						? padding - fontSize
						: height - padding + (fontSize * 3) / 2
				}
				className="categoryAxisText"
				textAnchor={position === "left" ? "end" : position === "right" ? "start" : "middle"}
				key={index}
			>
				{item.tickData}
			</text>
		));
	};

	renderTicks = () => {
    const { position, padding, width, height, fontSize = 12 } = this.props.option;
		return this.state.tickItems.map((item, index) => (
			<Line
				data={[
					{
						x:
							position === "bottom" || position === "top"
								? item.tick
								: position === "left"
								? padding
								: width - padding,
						y:
							position === "left" || position === "right"
								? item.tick
								: position === "top"
								? padding
								: height - padding,
					},
					{
						x:
							position === "bottom" || position === "top"
								? item.tick
								: position === "left"
								? padding - fontSize /2 
								: width - padding + fontSize / 2,
						y:
							position === "left" || position === "right"
								? item.tick
								: position === "top"
								? padding - fontSize / 2
								: height - padding + fontSize / 2,
					},
        ]}
        key={index}
			></Line>
		));
	};
}

export default BaseAxis;

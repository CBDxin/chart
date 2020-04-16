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
	componentWillMount() {
		this.getRenderIndex();
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.getRenderIndex(nextProps);
	}

	getRenderIndex = props => {
		const { data } = props || this.props;
		if (data.length > 10) {
			this.renderIndex = parseInt(data.length / 10);
		} else {
			this.renderIndex = null;
		}
	};

	getAxisLinePath = props => {
		props = props || this.props;
		const { padding, width, height } = this.props.wrapperStyle;
		let { position } = this.props;
		let x0, x1, y0, y1;
		switch (position) {
			case "top":
				x0 = padding.left;
				y0 = y1 = padding.top;
				x1 = width - padding.right;
				break;
			case "right":
				x0 = x1 = width - padding.right;
				y0 = padding.top;
				y1 = height - padding.bottom;
				break;
			case "bottom":
				y0 = y1 = height - padding.bottom;
				x0 = padding.left;
				x1 = width - padding.right;
				break;
			case "left":
				x0 = x1 = padding.left;
				y0 = padding.top;
				y1 = height - padding.bottom;
				break;
		}

		let axisLinePath = [
			{
				x: x0,
				y: y0
			},
			{
				x: x1,
				y: y1
			}
		];

		return <Line data={axisLinePath}></Line>;
	};

	renderTexts = () => {
		const { padding, width, height } = this.props.wrapperStyle;
		let { position, fontSize = 12 } = this.props;

		if (this.state.tickItems.length <= 1) {
			return null;
		}

		return this.state.tickItems.map((item, index) => {
			let text = (
				<text
					fontSize={fontSize}
					x={
						position === "bottom" || position === "top"
							? item.tick
							: position === "left"
							? padding.left - fontSize
							: width - padding.right + fontSize
					}
					y={
						position === "left" || position === "right"
							? item.tick
							: position === "top"
							? padding.top - fontSize
							: height - padding.bottom + (fontSize * 3) / 2
					}
					className="categoryAxisText"
					textAnchor={position === "left" ? "end" : position === "right" ? "start" : "middle"}
					key={index}
				>
					{item.tickData}
				</text>
			);
			return this.renderIndex ? (index % this.renderIndex === 0 ? text : null) : text;
		});
	};

	renderTicks = () => {
		const { padding, width, height } = this.props.wrapperStyle;
		let { position, fontSize = 12 } = this.props;

		if (this.state.tickItems.length <= 1) {
			return null;
		}

		return this.state.tickItems.map((item, index) => (
			<Line
				data={[
					{
						x:
							position === "bottom" || position === "top"
								? item.tick
								: position === "left"
								? padding.left
								: width - padding.right,
						y:
							position === "left" || position === "right"
								? item.tick
								: position === "top"
								? padding.top
								: height - padding.bottom
					},
					{
						x:
							position === "bottom" || position === "top"
								? item.tick
								: position === "left"
								? padding.left - fontSize / 2
								: width - padding.right + fontSize / 2,
						y:
							position === "left" || position === "right"
								? item.tick
								: position === "top"
								? padding.top - fontSize / 2
								: height - padding.bottom + fontSize / 2
					}
				]}
				key={index}
			></Line>
		));
	};
}

export default BaseAxis;

import React, { Component } from "react";

import { random } from "./mathUtils";

import { scale } from "./components/Scale";
import CategoryAxis from "./components/Axis/CategoryAxis";
import NumberAxis from "./components/Axis/NumberAxis";

import Line from "./charts/Line";
import Area from "./charts/Area";

/*
state= {
  data:{},
  charts:[
    {
      id:图表id,
      type:图表类型,
      date:数据,
    }
  ],
  components:[
    {
      type:组件类型,
      relateId?:对应的图表id
    }
  ],
  activeIndex:number,//处于聚焦的数据点index
  xScale:scale,
  yScale:scale,
  mouseInfo:{
    coordinate:{
      x:number,
      y:number
    },
    event
  }
},
props = {
	padding,
	width,
	height
}
*/

const mockData = {
	x: ["一", "二", "三", "四", "五"],
	y: [300, 500, 400, 900, 100],
	data: [
		{ x: "一", y: 300 },
		{ x: "二", y: 500 },
		{ x: "三", y: 400 },
		{ x: "四", y: 900 },
		{ x: "五", y: 100 },
	],
};

let option = {
	height: 500,
	width: 800,
	padding: 50,
};

export default class Chart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			charts: [],
			components: [],
			mockData: mockData,
			xScale: {},
			yScale: {},
		};
	}

	changeData = () => {
		mockData.y.map((item, index) => {
			let randomNum = random(3);
			mockData.y[index] = randomNum;
			mockData.data[index].y = mockData.y[index];
		});

		this.setState && this.setState(
			{
				mockData: mockData,
			},
			() => {
				this.createScale(this.props, this.state.mockData);
			}
		);
	};

	createScale = (props, data) => {
		const { padding, width, height } = props;
		const mockData = data;

		this.setState({
			xScale: scale(mockData.x, [padding, width - padding], "band"),
			yScale: scale([0, Math.max(...mockData.y) * 1.2], [height - padding, padding]),
		})

		console.log("createScale");
	};

	componentWillMount = () => {
		this.createScale(this.props, this.state.mockData);

		console.log("-----willmount", this.state.mockData);
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		console.log("------receiveprops");
	}

	getStateByOption = option => {};

	renderCharts = () => {};

	renderComponents = () => {};

	render() {
		const { width, height } = this.props;
		const { mockData, xScale, yScale } = this.state;

		return (
			<React.Fragment>
				<svg width={width} height={height}>
					<Line data={mockData.data} xScale={xScale} yScale={yScale}></Line>
					<Area data={mockData.data} xScale={xScale} yScale={yScale}></Area>
					<CategoryAxis
						option={{ ...option, position: "bottom" }}
						data={mockData.x}
						scale={xScale}
					></CategoryAxis>
					<CategoryAxis
						option={{ ...option, position: "top" }}
						data={mockData.x}
						scale={xScale}
					></CategoryAxis>
					<NumberAxis
						option={{ ...option, position: "left" }}
						data={mockData.y}
						scale={yScale}
					></NumberAxis>
					<NumberAxis
						option={{ ...option, position: "right" }}
						data={mockData.y}
						scale={yScale}
					></NumberAxis>
				</svg>
				<button onClick={this.changeData}>改变数据</button>
			</React.Fragment>
		);
	}
}

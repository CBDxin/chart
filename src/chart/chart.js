import React, { Component } from "react";

import { random, getActiveIndex } from "./mathUtils";

import { getMouseInfo } from "./EvenHandler";

import { scale } from "./components/Scale";
import CategoryAxis from "./components/Axis/CategoryAxis";
import NumberAxis from "./components/Axis/NumberAxis";
import Tooltip from "./components/Tooltip";

import Line from "./charts/Line";
import Area from "./charts/Area";

import "./index.less";

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

const chartData = {
	domain: ["一", "二", "三", "四", "五"],
	range: { y: [300, 500, 400, 900, 100] },
	data: [
		{ x: "一", y: 300 },
		{ x: "二", y: 500 },
		{ x: "三", y: 400 },
		{ x: "四", y: 900 },
		{ x: "五", y: 100 },
	],
};

let wrapperStyle = {
	height: 500,
	width: 800,
	padding: 50,
};

let getStateByOption = option => {};

export default class Chart extends Component {
	constructor(props) {
		super(props);

		this.container = React.createRef();

		this.state = {
			charts: [],
			components: [],
			chartData: chartData,
			xScale: null,
			yScale: null,
			mouseCoordinate: null,
			activeTickItem: null,
		};
	}

	changeData = () => {
		chartData.range.y.map((item, index) => {
			let randomNum = random(3);
			chartData.range.y[index] = randomNum;
			chartData.data[index].y = chartData.range.y[index];
		});

		this.setState &&
			this.setState(
				{
					chartData: chartData,
				},
				() => {
					this.createScale(this.props, this.state.chartData);
				}
			);
	};

	createScale = (props, data) => {
		const { padding, width, height } = props;
		const chartData = data;

		this.setState({
			xScale: scale(chartData.domain, [padding, width - padding], "band"),
			yScale: scale([0, Math.max(...chartData.range.y) * 1.2], [height - padding, padding]),
		});

		console.log("createScale");
	};

	componentWillMount = () => {
		this.createScale(this.props, this.state.chartData);

		console.log("-----willmount", this.state.chartData);
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		console.log("------receiveprops");
	}

	renderCharts = () => {};

	renderComponents = () => {};

	handleOnClick = event => {
		event.persist();
		let mouseCoordinate = getMouseInfo(event, this.container);
		this.setState(
			{
				mouseCoordinate,
			},
			() => {
				this.getActiveTickItem();
			}
		);
	};

	handleOnMouseMove = event => {
		event.persist();
		let mouseCoordinate = getMouseInfo(event, this.container);
		this.setState(
			{
				mouseCoordinate,
			},
			() => {
				this.getActiveTickItem();
			}
		);
	};

	handleOnMouseLeave = event => {
		event.persist();
		this.setState({
			activeTickItem: null,
		});
		console.log('----mouseout')
	};

	getActiveTickItem = () => {
		if (this.inRange()) {
			let { xScale, yScale, mouseCoordinate, chartData } = this.state;
			let activeIndex = getActiveIndex(mouseCoordinate.chartX, xScale.ticks());
			let activeTick = chartData.domain[activeIndex];

			let activeData = Object.keys(chartData.range).map(item => {
				return {
					key: item,
					value: chartData.range[item][activeIndex],
				};
			});

			let activeTickPostion = xScale(activeTick);
			this.setState({
				activeTickItem: {
					activeTick,
					activeData,
					activeTickPostion,
					activeIndex,
					mouseCoordinate,
				},
			});
		} else {
			this.setState({
				activeTickItem: null,
			});
			console.log('---outrange')
		}
	};

	inRange = () => {
		let { mouseCoordinate } = this.state;
		let { width = 800, height = 500, padding = 50 } = this.props;
		let x = mouseCoordinate.chartX;
		let y = mouseCoordinate.chartY;

		if (x && x < width - padding && x > padding && y && y < height - padding && y > padding) {
			return true;
		} else {
			return false;
		}
	};

	render() {
		const { width, height } = this.props;
		const { chartData, xScale, yScale, activeTickItem } = this.state;

		return (
			<div className="chart-wrapper" 
				onClick={this.handleOnClick} 
				onMouseLeave={this.handleOnMouseOut}
				onMouseMove={this.handleOnMouseMove}
				ref={this.container}
			>
				<Tooltip activeTickItem={activeTickItem} wrapperStyle={wrapperStyle}></Tooltip>
				<svg width={width} height={height}>
					<Line data={chartData.data} xScale={xScale} yScale={yScale}></Line>
					<Area data={chartData.data} xScale={xScale} yScale={yScale}></Area>
					<CategoryAxis
						wrapperStyle={wrapperStyle}
						position="bottom"
						data={chartData.domain}
						scale={xScale}
					></CategoryAxis>
					<CategoryAxis
						wrapperStyle={wrapperStyle}
						position="top"
						data={chartData.domain}
						scale={xScale}
					></CategoryAxis>
					<NumberAxis wrapperStyle={wrapperStyle} position="left" scale={yScale}></NumberAxis>
					<NumberAxis wrapperStyle={wrapperStyle} position="right" scale={yScale}></NumberAxis>
				</svg>
				{/* <button onClick={this.changeData}>改变数据</button> */}
			</div>
		);
	}
}

import React, { Component } from "react";

import { getActiveIndex } from "./mathUtils";

import { getMouseInfo } from "./EvenHandler";
import { getStateByOption, hasType } from "./optionManger";

import Charts from "./charts";
import Components from "./components";

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

export default class Chart extends Component {
	constructor(props) {
		super(props);

		this.container = React.createRef();

		this.state = {
			charts: null,
			components: null,
			chartData: null,
			xScale: null,
			yScale: null,
			mouseCoordinate: null,
			activeTickItem: null,
			wrapperStyle: {},
		};
	}

	componentWillMount = () => {
		const { option } = this.props;

		this.setState(
			{
				...this.state,
				...getStateByOption(option),
			},
			() => {}
		);

		console.log("-----willmount", getStateByOption(option));
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { option } = this.nextProps;

		this.setState({
			...this.state,
			...getStateByOption(option),
		});

		console.log("------receiveprops");
	}

	renderCharts = () => {
		let { charts, xScale, yScale, chartData, wrapperStyle } = this.state;

		if (!chartData) {
			return;
		}

		return charts.map((item, index) => {
			let Chart = Charts[item.type];
			return (
				<Chart
					key={index}
					data={chartData.data[item.data]}
					xScale={xScale}
					yScale={yScale}
					wrapperStyle={wrapperStyle}
				></Chart>
			);
		});
	};

	renderComponents = () => {
		let { components, wrapperStyle, xScale, yScale, chartData } = this.state;

		if (!components) {
			return null;
		}

		return components.map((item, index) => {
			switch (item.type) {
				case "xAxis":
					let CategoryAxis = Components.CategoryAxis;
					return (
						<CategoryAxis
							key={index}
							scale={xScale}
							data={chartData.domain}
							position={item.position}
							wrapperStyle={wrapperStyle}
						></CategoryAxis>
					);
				case "yAxis":
					let NumberAxis = Components.NumberAxis;
					return (
						<NumberAxis
							key={index}
							scale={yScale}
							position={item.position}
							wrapperStyle={wrapperStyle}
						></NumberAxis>
					);
				default:
					return null;
			}
		});
	};

	renderTooltip = () => {
		let { wrapperStyle, activeTickItem, components } = this.state;

		if (!hasType(components, "Tooltip")) {
			return null;
		}

		let Tooltip = Components.Tooltip;
		return <Tooltip wrapperStyle={wrapperStyle} activeTickItem={activeTickItem}></Tooltip>;
	};

	handleOnClick = event => {
		event.persist();
		let mouseCoordinate = getMouseInfo(event, this.container);
		this.setState({
			mouseCoordinate,
		});
	};

	handleOnMouseMove = event => {
		let { components } = this.state;
		if (!hasType(components, "Tooltip")) {
			return null;
		}

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
		let { components } = this.state;
		if (!hasType(components, "Tooltip")) {
			return null;
		}

		event.persist();
		this.setState({
			activeTickItem: null,
		});
		console.log("----mouseout");
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
			console.log("---outrange");
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
		const { width = 800, height = 500 } = this.props.option;

		return (
			<div
				className="chart-wrapper"
				onClick={this.handleOnClick}
				onMouseLeave={this.handleOnMouseOut}
				onMouseMove={this.handleOnMouseMove}
				ref={this.container}
			>
				{this.renderTooltip()}
				{/* <Tooltip activeTickItem={activeTickItem} wrapperStyle={wrapperStyle}></Tooltip> */}
				<svg width={width} height={height}>
					{this.renderCharts()}
					{this.renderComponents()}
				</svg>
			</div>
		);
	}
}

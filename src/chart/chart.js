import React, { Component } from "react";

import { getActiveIndex, getMouseInfo } from "./EvenHandler";
import { getStateByOption, hasType } from "./optionManger";

import Charts from "./container";
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
			colorScale: null,

			brushIndexs:null,

			mouseCoordinate: null,
			activeTickItem: null,
			activeCharts: [],
			wrapperStyle: {},
		};
	}

	componentWillMount = () => {
		const { option } = this.props;
		const {brushIndexs} = this.state;

		this.setState(
			{
				...this.state,
				...getStateByOption(option, brushIndexs),
			},
			() => {}
		);

		console.log("-----willmount", getStateByOption(option));
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { option } = nextProps;
		const {brushIndexs} = this.state;

		this.setState({
			...this.state,
			...getStateByOption(option, brushIndexs),
		});

		console.log("------receiveprops");
	}

	updateBrushIndex = (brushIndexs)=>{
		let {option} = this.props;
		this.setState({
			...this.state,
			...getStateByOption(option, brushIndexs),
			brushIndexs:brushIndexs
		});
	}

	renderCharts = () => {
		let {
			charts,
			xScale,
			yScale,
			chartData,
			wrapperStyle,
			colorScale,
			activeTickItem,
			activeCharts,
		} = this.state;

		if (!chartData || chartData.domain.length <= 1) {
			return;
		}

		console.log(chartData);

		return charts.map((item, index) => {
			let Chart = Charts[item.type];

			// console.log(chartData.data[item.key])

			return (
				Chart && (
					<Chart
						option={item}
						key={index}
						colorScale={colorScale}
						data={chartData.data[item.key]}
						xScale={xScale}
						yScale={yScale}
						wrapperStyle={wrapperStyle}
						activeTickItem={activeTickItem}
						isActive={activeCharts.indexOf(item.key) === -1 ? false : true}
					></Chart>
				)
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
				case "Grid":
					let Grid = Components.Grid;
					return (
						<Grid key={index} wrapperStyle={wrapperStyle} xScale={xScale} yScale={yScale}></Grid>
					);
				default:
					return null;
			}
		});
	};

	renderTooltip = () => {
		let { wrapperStyle, activeTickItem, components, colorScale } = this.state;

		if (!hasType(components, "Tooltip")) {
			return null;
		}

		let Tooltip = Components.Tooltip;
		return (
			<Tooltip
				wrapperStyle={wrapperStyle}
				activeTickItem={activeTickItem}
				colorScale={colorScale}
			></Tooltip>
		);
	};

	renderBrush = () => {
		let {wrapperStyle, components} = this.state;
		let {option} = this.props;
		if(!hasType(components, "Brush")){
			return null;
		}

		let Brush = Components.Brush;
		return (
			<Brush
				domain={option.dataSet.domain}
				wrapperStyle={wrapperStyle}
				updateBrushIndex={this.updateBrushIndex}
			></Brush>
		)
	}

	renderLegend = () => {
		let { components, colorScale, activeCharts } = this.state;

		let legendOption = hasType(components, "Legend");
		if (!legendOption) {
			return null;
		}

		let Legend = Components.Legend;
		return (
			<Legend
				activeCharts={activeCharts}
				setActiveCharts={this.setActiveCharts}
				option={legendOption}
				colorScale={colorScale}
			></Legend>
		);
	};

	setActiveCharts = chartKey => {
		let { activeCharts } = this.state;
		if (activeCharts.indexOf(chartKey) !== -1) {
			activeCharts.splice(activeCharts.indexOf(chartKey), 1);
		} else {
			activeCharts.push(chartKey);
		}

		this.setState({
			activeCharts,
		});
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
			let { xScale, yScale, mouseCoordinate, chartData, charts } = this.state;
			let activeIndex = getActiveIndex(mouseCoordinate.chartX, xScale.ticksValue());
			let activeTick = chartData.domain[activeIndex];

			let activeData = [];
			Object.keys(chartData.range).filter((item, index) => {
				if (charts[index]) {
					activeData[index] = {
						key: item,
						value: chartData.range[item][activeIndex],
						name: charts[index].name,
					};
				}
			});

			// console.log(activeData);

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
		let { mouseCoordinate, width, height, padding } = this.state;
		let x = mouseCoordinate.chartX;
		let y = mouseCoordinate.chartY;

		if (x && x < width - padding.right && x > padding.left && y && y < height - padding.bottom && y > padding.top) {
			return true;
		} else {
			return false;
		}
	};

	render() {
		const { width = 800, height = 500 } = this.props.option;

		return (
			<div className="view-box" width={width} height={height}>
				{this.renderLegend()}
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
						{this.renderComponents()}
						{this.renderCharts()}
						{this.renderBrush()}
					</svg>
				</div>
			</div>
		);
	}
}

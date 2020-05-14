import React, { Component } from "react";

import { debounce, throttle } from "lodash";

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
		this.box = React.createRef();

		this.state = {
			charts: null,
			components: null,
			chartData: null,
			xScale: null,
			yScale: null,
			colorScale: null,

			brushIndexs: null,
			brushing: false,

			mouseCoordinate: null,
			activeTickItem: null,
			activeCharts: [],
			unActiveCharts: [],
			wrapperStyle: {},
			animation: null,
		};
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.initViewBox(nextProps);
	}

	componentDidMount() {
		this.initViewBox();
		window.addEventListener("resize", throttle(this.initViewBox, 200));
	}

	initViewBox = props => {
		let { option } = props && props.option ? props : this.props;
		let { brushIndexs } = this.state;
		let height = this.box.current ? this.box.current.clientHeight : this.state.wrapperStyle.height;
		let width = this.box.current ? this.box.current.clientWidth : this.state.wrapperStyle.width;
		this.setState({
			...this.state,
			...getStateByOption({ ...option, height: height, width: width }, brushIndexs),
		});
	};

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
			unActiveCharts,
			brushIndexs,
			animation,
		} = this.state;

		if (!charts) {
			return;
		}

		// console.log(animation);

		return charts.map((item, index) => {
			let Chart = Charts[item.type];

			// console.log(item)
			// console.log('-----activeTickItem', activeTickItem)

			return (
				Chart &&
				(item.data || (chartData.data && chartData.data[item.key])) && (
					<Chart
						option={item}
						key={index}
						colorScale={colorScale}
						data={item.data || chartData.data[item.key]}
						xScale={xScale}
						yScale={yScale}
						wrapperStyle={wrapperStyle}
						animation={animation}
						activeTickItem={activeTickItem}
						brushIndexs={brushIndexs}
						isActive={activeCharts.indexOf(item.key) === -1 ? false : true}
						isUnActive={unActiveCharts.indexOf(item.key) === -1 ? false : true}
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

	updateBrushIndex = brushIndexs => {
		let { option } = this.props;
		let height = this.box.current ? this.box.current.clientHeight : this.state.wrapperStyle.height;
		let width = this.box.current ? this.box.current.clientWidth : this.state.wrapperStyle.width;
		this.setState({
			...this.state,
			...getStateByOption({ ...option, height: height, width: width }, brushIndexs),
			brushIndexs: brushIndexs,
		});
	};

	changeBrushState = brushing => {
		this.setState({
			brushing,
		});
	};

	renderBrush = () => {
		let { wrapperStyle, components } = this.state;
		let { option } = this.props;
		let brushOption = hasType(components, "Brush");
		if (!brushOption) {
			return null;
		}

		let Brush = Components.Brush;
		return (
			<Brush
				option={brushOption}
				domain={option.dataSet.domain}
				wrapperStyle={wrapperStyle}
				updateBrushIndex={this.updateBrushIndex}
				changeBrushState={this.changeBrushState}
			></Brush>
		);
	};

	renderLegend = () => {
		let { components, colorScale, activeCharts, unActiveCharts } = this.state;

		let legendOption = hasType(components, "Legend");
		if (!legendOption) {
			return null;
		}

		let Legend = Components.Legend;
		return (
			<Legend
				activeCharts={activeCharts}
				unActiveCharts={unActiveCharts}
				setActiveCharts={this.setActiveCharts}
				setUnActiveCharts={this.setUnActiveCharts}
				option={legendOption}
				colorScale={colorScale}
			></Legend>
		);
	};

	//提个公共部分

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

	setUnActiveCharts = chartKey => {
		let { unActiveCharts } = this.state;
		if (unActiveCharts.indexOf(chartKey) !== -1) {
			unActiveCharts.splice(unActiveCharts.indexOf(chartKey), 1);
		} else {
			unActiveCharts.push(chartKey);
		}

		this.setState({
			unActiveCharts,
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
		let { components, brushing } = this.state;
		if (!hasType(components, "Tooltip") || brushing) {
			return null;
		}

		// console.log('-------chartMouseMove')

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
		// console.log("----mouseout");
	};

	getActiveTickItem = debounce(() => {
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

			// console.log('------activeData',activeData);

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
			// console.log("---outrange");
		}
	}, 100);

	inRange = () => {
		let { mouseCoordinate, wrapperStyle } = this.state;
		let { width, height, padding } = wrapperStyle;
		let x = mouseCoordinate.chartX;
		let y = mouseCoordinate.chartY;

		if (
			x &&
			x < width - padding.right &&
			x > padding.left &&
			y &&
			y < height - padding.bottom &&
			y > padding.top
		) {
			return true;
		} else {
			return false;
		}
	};

	render() {
		const { width = 800, height = 500 } = this.props.option;
		// console.log("render");
		return (
			<div
				className="view-box"
				style={{
					width: width,
					height: height,
				}}
				ref={this.box}
			>
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
					<svg width="100%" height="100%">
						{this.renderComponents()}
						{this.renderCharts()}
						{this.renderBrush()}
					</svg>
				</div>
			</div>
		);
	}
}

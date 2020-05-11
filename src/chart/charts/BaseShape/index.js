import React, { Component } from "react";

import { interpolateNumber, timer } from "d3";
import { getMapScales } from "../../optionManger";
import { animationModel } from "../../util/mathUtils";

class BaseChart extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount = () => {
		this.renderWithAnimation();
		this.getMapScales();
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState(
			{
				preData: this.state.data,
			},
			() => {
				this.renderWithAnimation(nextProps);
				this.getMapScales(nextProps);
			}
		);
	}

	getMapScales = props => {
		let { option } = props || this.props;
		let VisualMap = option.VisualMap;
		if (!VisualMap || !VisualMap.mappers) {
			return;
		}

		let mapScales = getMapScales(VisualMap.mappers);

		this.setState(
			{
				mapScales,
			},
			() => {
				// console.log('-----mapScale', mapScales.colorScale(200))
				this.getVisualMapObj();
			}
		);
	};

	getVisualMapObj = () => {
		let { mappers } = this.props.option.VisualMap;
		let { mapScales } = this.state;
		let { brushIndexs } = this.props;
		let VisualMapObj = {};

		if (mapScales.colorScale) {
			let mapColors = mappers.color.data.map(item => mapScales.colorScale(item));
			VisualMapObj.mapColors = brushIndexs
				? mapColors.slice(brushIndexs.startIndex, brushIndexs.endIndex + 1)
				: mapColors;
		}

		if (mapScales.radiusScale) {
			let mapRadiuss = mappers.radius.data.map(item => mapScales.radiusScale(item));
			VisualMapObj.mapRadiuss = brushIndexs
				? mapRadiuss.slice(brushIndexs.startIndex, brushIndexs.endIndex + 1)
				: mapRadiuss;
		}

		// console.log(mapScales);
		this.setState({
			VisualMapObj,
		});
	};

	renderDot = props => {
		let { option, colorScale, activeTickItem, isActive, isUnActive } = props || this.props;
		let { data } = this.state;

		return (
			data &&
			data.map((item, index) => {
				return (
					<circle
						key={index}
						cx={item.x}
						cy={item.y}
						r={(activeTickItem && index === activeTickItem.activeIndex) || isActive ? 5 : 3}
						stroke={isUnActive ? "transparent" : colorScale(option.key)}
						fill={isUnActive ? "transparent" : "#fff"}
					></circle>
				);
			})
		);
	};

	transition = (animation, duration) => {
		let { animation:{model = "ease"} } = this.props;
		this.timeStamp && this.timeStamp.stop();
		this.timeStamp = timer(elapsed => {
			let precent = elapsed / duration;
			let animationPrecent = animationModel(precent, model);
			animation(animationPrecent);
			if (precent > 1) {
				this.timeStamp.stop();
				this.timeStamp = null;
			}
		});
	};

	renderWithAnimation = props => {
		let { animation:{time = 500} } = this.props;
		this.transition(precent => {
			this.animation(precent, props || this.props);
		}, time);
	};

	animation = (precent, props) => {
		let { data, wrapperStyle:{height, padding} } = props;
		let { preData } = this.state;

		if (precent > 1) {
			precent = 1;
		}

		// console.log(data)

		let nextData = data.map((item, index) => {
			const interpolatorY = interpolateNumber(
				preData ? (preData[index] ? preData[index].y : preData[preData.length - 1].y) : height - padding.bottom,
				item.y
			);
			const interpolatorX = interpolateNumber(
				preData ? (preData[index] ? preData[index].x : preData[preData.length - 1].x) : 0,
				item.x
			);
			return {
				x: interpolatorX(precent),
				y: interpolatorY(precent),
				// x:item.x,
				// y:item.y
			};
		});

		// console.log(this.props.option.key)

		this.setState({
			data: nextData,
		});
	};
}

export default BaseChart;

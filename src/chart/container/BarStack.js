import React, { Component } from "react";
import BarStack from "../charts/BarStack";
import { sumArr } from "../util/mathUtils";

class BarStackChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
		};
	}

	componentWillMount() {
		this.formatData();
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.formatData(nextProps);
	}

	formatData = props => {
		let { data, xScale, yScale } = props || this.props;
		let formatedData = data.map(item => {
			return {
				x: xScale(item.domain),
				y: item.range.map((d, i) => yScale(sumArr(item.range.slice(0, i + 1)))),
			};
		});

		// console.log(formatedData);

		this.setState({
			data: formatedData,
		});
	};

	render() {
		return <BarStack {...this.props} data={this.state.data}></BarStack>;
	}
}

export default BarStackChart;

import React, { Component } from "react";
import BarGroup from "../charts/BarGroup";

class BarGroupChart extends Component {
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
    
    // console.log(data)

		let formatedData = data.map(item => {
			return {
				x: xScale(item.domain),
				y: item.range.map((d) => yScale(d)),
			};
		});

		// console.log(formatedData);

		this.setState({
			data: formatedData,
		});
	};

	render() {
		return <BarGroup {...this.props} data={this.state.data}></BarGroup>;
	}
}

export default BarGroupChart;

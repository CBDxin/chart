import React, { Component } from "react";
import Chart from "../../chart/chart";
import { Select } from "antd";
import "./index.less";
import { countryList, getOption1, getOption2, getOption3, getOption4 } from "./data.js";

class COVIDDemo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			country: "美国",
			index: 0,
      reviewOption: undefined,
      date:undefined
		};
	}

	componentWillMount() {
		this.getReviewOption();
		setInterval(this.getReviewOption, 1000);
	}

	getReviewOption = () => {
		let { index } = this.state;
    let { nextIndex, reviewOption, date } = getOption4(index);
		this.setState({
			index: nextIndex,
      reviewOption,
      date
		});
	};

	onChangeCountry = key => {
		this.setState({
			country: key,
		});
	};

	render() {
		let { country, reviewOption, date } = this.state;
		return (
			<div className="covid">
				<div className="covid-title">新型肺炎疫情可视化分析</div>
				<div className="block">
					<div className="sub-title">全球各国累计确诊排行</div>
					<div className="chart-wrap">
						<Chart option={getOption1()}></Chart>
					</div>
				</div>
				<div className="block">
					<div className="sub-title">
						海外各国累计确诊趋势
						<div style={{ display: "inline-block", marginLeft: 20 }}>
							<span style={{ fontSize: 16, fontWeight: 500 }}>选择国家：</span>
							<Select value={country} onChange={this.onChangeCountry}>
								{countryList.map(item => (
									<Select.Option key={item} value={item}>
										{item}
									</Select.Option>
								))}
							</Select>
						</div>
					</div>
					<div className="chart-wrap">
						<Chart option={getOption2(country)}></Chart>
					</div>
				</div>
				<div className="block">
					<div className="sub-title">全球疫情数据多维可视化分析</div>
					<div className="chart-wrap">
						<Chart option={getOption3()}></Chart>
					</div>
				</div>
				<div className="block">
                <div className="sub-title">海外各国疫情趋势回顾 ———— {date}</div>
					{reviewOption ? (
						<div className="chart-wrap">
							<Chart option={reviewOption}></Chart>
						</div>
					) : (
						""
					)}
				</div>
			</div>
		);
	}
}

export default COVIDDemo;

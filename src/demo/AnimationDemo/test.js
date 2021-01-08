import React, { Component } from "react";
import Chart from "../../chart/chart";
import axios from "axios";

import { random } from "../../chart/util/mathUtils";

let huawei = [3000, 700, 600, 200, 900, 3000, 200, 200, 200, 200];
// huawei = [...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,]
// huawei = [...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,]

let option = {
	height: 300,
	width: 600,
	// padding:{
	// 	top:50,
	// 	bottom:10,
	// 	left:50,
	// 	right:10
	// },
	dataSet: {
		domain: [
			"一月",
			"二月",
			"三月",
			"四月",
			"五.月",
			"六月",
			"七月",
			"八月",
			"九月",
			"十月",
			"十一月",
			"十二月",
		],
		// domain: Array.from(Array(10000), (v, k) => k),
		range: {
			xiaoMi: [1300, 900, 3000, 600, 755, 200, 200, 200, 200, 200, 200, 200],
			huaWei: [...huawei],
			oppo: [100, 3000, 20, 300, 700, 3000, 200, 200, 200, 200, 200, 200],
			vivo: [700, 200, 900, 120, 1200, 300, 3000, 700, 200, 1200, 100, 550],
			iphone: [800, 600, 900, 130, 300, 700, 200, 700, 200, 900, 120, 1200],
		},
	},
	components: [
		{
			type: "xAxis",
			position: "bottom",
		},
		{
			type: "yAxis",
			position: "left",
		},
		// {
		// 	type: "Tooltip",
		// },
		{
			type: "Legend",
			option: {
				dataItems: ["xiaoMi", "huaWei", "oppo", "vivo", "iphone"],
			},
		},
		{
			type: "Grid",
		},
		{
			type: "Brush",
			option: {
				startIndex: 1,
				endIndex: 10,
			},
		},
	],
	charts: [
		{
			type: "Line",
			name: "苹果",
			key: "iphone",
			VisualMap: {
				orient: "vertical",
				text: ["高", "低"],
				mappers: {
					color: {
						range: ["#D7DA8B", "#E15457"],
						data: [800, 600, 900, 1300, 300, 700, 200, 700, 200, 900, 120, 1200],
					},
					radius: {
						range: [1, 5],
						data: [800, 600, 900, 1300, 300, 700, 200, 700, 200, 900, 120, 1200],
					},
				},
			},
		},
		{
			type: "Bar",
			name: "小米",
			key: "xiaoMi",
		},
		{
			type: "Line",
			name: "华为",
			key: "huaWei",
		},
		{
			type: "Area",
			name: "oppo",
			key: "oppo",
		},
		{
			type: "Area",
			name: "vivo",
			key: "vivo",
			// VisualMap: {
			// 	orient: "vertical",
			// 	text: ["高", "低"],
			// 	mappers: {
			// 		color: {
			// 			range: ["#D7DA8B", "#E15457"],
			// 			data: [700, 200, 900, 120, 1200, 300, 300, 700, 200, 1200, 100, 550],
			// 		},
			// 		radius: {
			// 			range: [1, 5],
			// 			data: [800, 600, 900, 1300, 300, 700, 200, 700, 200, 900, 120, 150],
			// 		},
			// 	},
			// },
		},
	],
};

class Demo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			option: option,
		};
	}

	changeData = () => {
		let { option } = this.state;
		Object.keys(option.dataSet.range).map(rangeitem => {
			option.dataSet.range[rangeitem].map((item, index) => {
				option.dataSet.range[rangeitem][index] = random(3);
			});
		});

		// axios.get('/test').then(res=>{
		// 	console.log(res)
		// })

		this.setState({
			option,
		});
	};

	componentDidMount() {
		// setInterval(this.changeData, 100)
	}

	render() {
		// console.log(this.state.option)
		return (
			<div>
				{/* <Chart option={option}></Chart> */}
				<div onClick={this.changeData}>changeData</div>
				<hr />
				<div style={{ display: "flex", flexWrap: "wrap", margin: "0 auto", width: 1300 }}>
					<div style={{ margin: 10 }}>
						<div style={{ fontSize: 16, fontWeight: "bold" }}>linear</div>
						<Chart
							option={{
								...this.state.option,
								animation: {
									model: "linear",
									time: "3000",
								},
							}}
						></Chart>
					</div>
					<div style={{ margin: 10 }}>
						<div style={{ fontSize: 16, fontWeight: "bold" }}>ease-in-out</div>
						<Chart
							option={{
								...this.state.option,
								animation: {
									model: "ease-in-out",
									time: "3000",
								},
							}}
						></Chart>
					</div>
					<div style={{ margin: 10 }}>
						<div style={{ fontSize: 16, fontWeight: "bold" }}>ease</div>
						<Chart
							option={{
								...this.state.option,
								animation: {
									model: "ease",
									time: "3000",
								},
							}}
						></Chart>
					</div>
					<div style={{ margin: 10 }}>
						<div style={{ fontSize: 16, fontWeight: "bold" }}>ease-in</div>
						<Chart
							option={{
								...this.state.option,
								animation: {
									model: "ease-in",
									time: "3000",
								},
							}}
						></Chart>
					</div>
					<div style={{ margin: 10 }}>
						<div style={{ fontSize: 16, fontWeight: "bold" }}>ease-out</div>
						<Chart
							option={{
								...this.state.option,
								animation: {
									model: "ease-out",
									time: "3000",
								},
							}}
						></Chart>
					</div>
				</div>
			</div>
		);
	}
}

export default Demo;

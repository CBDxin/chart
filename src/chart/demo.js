import React, { Component } from "react";
import Chart from "./chart";
import axios from 'axios';

import { random } from "./util/mathUtils";




let huawei = [500, 700, 600, 200, 900, 500, 200, 200, 200, 200]
huawei = [...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,]
huawei = [...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,]


let option = {
	height: 500,
	width: 800,
	// padding:{
	// 	top:50,
	// 	bottom:10,
	// 	left:50,
	// 	right:10
	// },
	dataSet: {
		// domain: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月","一月1", "二月1", "三月1", "四月1", "五月1", "六月1", "七月1", "八月1", "九月1", "十月1", "十一月1", "十二月1","一月2", "二月2", "三月2", "四月2", "五月2", "六月2", "七月2", "八月2", "九月2", "十月2", "十一月2", "十二月2","一月3", "二月3", "三月3", "四月3", "五月3", "六月3", "七月3", "八月3", "九月3", "十月3", "十一月3", "十二月3"],
		domain: Array.from(Array(10000), (v,k) =>k),
		range: {
			// xiaoMi: [300, 900, 500, 600, 755, 200, 200, 200, 200, 200, 200, 200],
			huaWei: [...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,...huawei,],
			// oppo: [100, 500, 20, 300, 700, 500, 200, 200, 200, 200, 200, 200],
			// vivo: [700, 200, 900, 120, 1200, 300, 500, 700, 200, 1200, 100, 550],
			// iphone: [800, 600, 900, 1500, 300, 700, 200, 700, 200, 900, 120, 1200, 300,500, 700, 600, 200, 900, 500, 200,300,500, 700, 600, 800, 600, 900, 1500, 300, 700, 200, 700, 200, 900, 120, 1200, 300,500, 700, 600, 200, 900, 500, 200,300,500, 700, 600, 800, 600, 900, 1500, 300, 700, 200, 700, 200, 900, 120, 1200, 300,500, 700, 600, 200, 900, 500, 200,300,500, 700, 600]
		},
	},
	components: [
		// {
		// 	type: "xAxis",
		// 	position: "bottom",
		// },
		// {
		// 	type: "yAxis",
		// 	position: "left",
		// },
		// {
		// 	type: "Tooltip",
		// },
		// {
		// 	type: "Legend",
		// 	option: {
		// 		dataItems: ["xiaoMi", "huaWei", "oppo", "vivo", "iphone"],
		// 	},
		// },
		// {
		// 	type: "Grid",
		// },
		// {
		// 	type:"Brush",
		// 	option:{
		// 		startIndex:1,
		// 		endIndex:8
		// 	}
		// },
	],
	charts: [
	// 	{
	// 		type: "Line",
	// 		name: "苹果",
	// 		key: "iphone",
			// VisualMap: {
			// 	orient: "vertical",
			// 	text: ["高", "低"],
			// 	mappers: {
			// 		color: {
			// 			range: ['#D7DA8B', '#E15457'],
			// 			data: [800, 600, 900, 1500, 300, 700, 200, 700, 200, 900, 120, 1200, 300,500, 700, 600, 200, 900, 500, 200,300,500, 700, 600, 800, 600, 900, 1500, 300, 700, 200, 700, 200, 900, 120, 1200, 300,500, 700, 600, 200, 900, 500, 200,300,500, 700, 600, 800, 600, 900, 1500, 300, 700, 200, 700, 200, 900, 120, 1200, 300,500, 700, 600, 200, 900, 500, 200,300,500, 700, 600],
			// 		},
			// 		radius: {
			// 			range: [1, 5],
			// 			data: [800, 600, 900, 1500, 300, 700, 200, 700, 200, 900, 120, 1200, 300,500, 700, 600, 200, 900, 500, 200,300,500, 700, 600, 800, 600, 900, 1500, 300, 700, 200, 700, 200, 900, 120, 1200, 300,500, 700, 600, 200, 900, 500, 200,300,500, 700, 600, 800, 600, 900, 1500, 300, 700, 200, 700, 200, 900, 120, 1200, 300,500, 700, 600, 200, 900, 500, 200,300,500, 700, 600],
			// 		}
			// 	},
			// },
	// 	},
		// {
		// 	type: "Pie",
		// 	name: "小米",
		// 	key: "xiaoMi",
		// },
		{
			type: "Line",
			name: "华为",
			key: "huaWei",
		},
		// {
		// 	type: "Area",
		// 	name: "oppo",
		// 	key: "oppo",
		// },
		// {
		// 	type: "Area",
		// 	name: "vivo",
		// 	key: "vivo",
		// 	VisualMap: {
		// 		orient: "vertical",
		// 		text: ["高", "低"],
		// 		mappers: {
		// 			color: {
		// 				range: ['#D7DA8B', '#E15457'],
		// 				data: [700, 200, 900, 120, 1200, 300, 500, 700, 200, 1200, 100, 550],
		// 			},
		// 			radius: {
		// 				range: [1, 5],
		// 				data: [800, 600, 900, 1500, 300, 700, 200, 700, 200, 900, 1200, 150],
		// 			}
		// 		},
		// 	},
		// },
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
		// setInterval(this.changeData, 500)
	}

	render() {
		// console.log(this.state.option)
		return (
			<div>
				{/* <Chart option={option}></Chart> */}
				<Chart option={this.state.option}></Chart>
				<div onClick={this.changeData}>changeData</div>
			</div>
		);
	}
}

export default Demo;

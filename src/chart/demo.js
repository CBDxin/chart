import React, { Component } from "react";
import Chart from "./chart";

let option = {
	height:500,
	width:800,
	dataSet: {
		domain: ["一月", "二月", "三月", "四月", "五月", "六月"],
		range:{
			xiaoMi: [300, 900, 500, 600, 755, 200],
			huaWei: [500, 700, 600, 200, 900, 500]
		},
	},
	components: [
		{
			type: "xAxis",
			position:"bottom"
		},
		{
			type: "yAxis",
			position:"left"
		},
		{
			type: "Tooltip",
		},
	],
	charts: [
		{
			type: "Line",
			name: "小米",
			data: "xiaoMi",
		},
		{
			type: "Scatter",
			name: "华为",
			data: "huaWei",
		},
	],
};
let option1 = {
	height:500,
	width:800,
	dataSet: {
		domain: ["一月", "二月", "三月", "四月", "五月", "六月"],
		range:{
			xiaoMi: [300, 900, 500, 600, 755, 200],
			huaWei: [500, 700, 600, 200, 900, 500]
		},
	},
	components: [
		{
			type: "xAxis",
			position:"bottom"
		},
		{
			type: "yAxis",
			position:"left"
		},
	],
	charts: [
		{
			type: "Pie",
			name: "小米",
			data: "xiaoMi",
		}
	],
};



class Demo extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Chart option={option}></Chart>
				<Chart option={option1}></Chart>
			</div>
		);
	}
}

export default Demo;

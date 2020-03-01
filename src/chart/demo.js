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
			option: {},
		},
		{
			type: "yAxis",
			option: {},
		},
		{
			type: "Tooltip",
			option: {},
		},
	],
	charts: [
		{
			type: "Area",
			name: "小米",
			data: "xiaoMi",
		},
		{
			type: "Line",
			name: "华为",
			data: "huaWei",
		},
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
			</div>
		);
	}
}

export default Demo;

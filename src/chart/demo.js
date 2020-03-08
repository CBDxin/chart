import React, { Component } from "react";
import Chart from "./chart";

import { random } from "./util/mathUtils";

let option = {
	height:500,
	width:800,
	dataSet: {
		domain: ["一月", "二月", "三月", "四月", "五月", "六月"],
		range:{
			xiaoMi: [300, 900, 500, 600, 755, 200],
			huaWei: [500, 700, 600, 200, 900, 500],
			oppo: [100, 500, 20, 300, 700, 500],
			vivo: [700, 200, 900, 120, 1200, 300],
			iphone: [800, 600, 900, 1500, 300, 700]
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
		{
			type:"Legend",
			option:{
				dataItems:["xiaoMi", "huaWei", "oppo", "vivo", "iphone"]
			}
		},
		{
			type:"Grid"
		}
	],
	charts: [
		{
			type: "Area",
			name: "小米",
			key: "xiaoMi",
		},
		{
			type: "Scatter",
			name: "华为",
			key: "huaWei",
		},
		{
			type: "Area",
			name: "oppo",
			key: "oppo",
		},
		{
			type: "Bar",
			name: "vivo",
			key: "vivo",
		},
		{
			type: "Line",
			name: "苹果",
			key: "iphone",
		},
	],
};




class Demo extends Component {
	constructor(props) {
		super(props);
		this.state={
			option:{
				height:500,
				width:800,
				dataSet: {
					domain: ["一月", "二月", "三月", "四月", "五月", "六月"],
					range:{
						xiaoMi: [300, 900, 500, 600, 755, 200],
						// huaWei: [500, 700, 600, 200, 900, 500]
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
						type:"Tooltip"
					}
				],
				charts: [
					{
						type: "Scatter",
						name: "小米",
						key: "xiaoMi",
					}
				],
			}
		}
	}

	changeData = ()=>{
		let {option} = this.state
		option.dataSet.range.xiaoMi.map((item, index)=>{
			option.dataSet.range.xiaoMi[index] = random(3)
		})
		
		this.setState({
			option
		})
	}

	render() {
		console.log(this.state.option)
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

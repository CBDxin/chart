import React, { useEffect, useState } from "react";
import Line from "./Line";
import Pie from "./Pie";
import Force from "./Force";
import * as d3 from "d3";
import useD3 from "./useD3";
import { random } from "lodash";

const _data = [
	{ date: "2007-04-23", value: 33.24 },
	{ date: "2007-04-24", value: 45.35 },
	{ date: "2007-04-25", value: 58.84 },
	{ date: "2007-04-26", value: 59.92 },
	{ date: "2007-04-29", value: 64.8 },
	{ date: "2007-05-01", value: 69.47 },
	{ date: "2007-05-02", value: 70.39 },
	{ date: "2007-05-03", value: 72.4 },
	{ date: "2007-05-04", value: 80.81 },
	{ date: "2007-05-07", value: 83.92 },
	{ date: "2007-05-08", value: 95.06 },
	{ date: "2007-05-09", value: 106.88 },
	{ date: "2007-05-09", value: 107.34 },
	{ date: "2007-05-10", value: 108.74 },
	{ date: "2007-05-13", value: 109.36 },
	{ date: "2007-05-14", value: 107.52 },
	{ date: "2007-05-15", value: 107.34 },
	{ date: "2007-05-16", value: 109.44 },
	{ date: "2007-05-17", value: 110.02 },
	{ date: "2007-05-20", value: 111.98 },
];

function List() {
	return (
		<ul id="list">
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
			<li>1</li>
		</ul>
	);
}

function Raw(props) {
	const [data, setData] = useState(_data);
	useEffect(() => {
		let dataset = ["javascript", "天下", "第一", "1"];
		d3.select("#list")
			.selectAll("li")
			.data(dataset)
			.text((d, i) => i + " : " + d)
			.exit()
			.remove();

		let func = function(elapsed) {
			// console.log(elapsed);
			if (elapsed > 500) {
				console.log("Timer stopped");
				timer.stop();
			}
		};
		var timer = d3.timer(func, 20000);
	}, []);

	const changeData = () => {
		setData(data =>
			data.map(item => {
				item.value = random(3);
				return item;
			})
		);
	};

	useD3();
	return (
		<div
			style={{
				width: "50%",
				margin: "0 auto",
			}}
			id="container"
		>
			<List></List>
			{/* <div onClick={changeData}>changedata</div> */}
			<Line data={data}></Line>
			<Pie data={data}></Pie>
      {/* <Force></Force> */}
		</div>
	);
}

export default Raw;

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const margin = { top: 20, right: 30, bottom: 30, left: 40 };
const width = 700,
	height = 500;

function Line({ data }) {
	const canvasRef = useRef(null);
	useEffect(() => {
		//x轴比例尺
		const xScale = d3
			.scaleBand()
			.domain(data.map(d => d.date))
			.range([margin.left, width - margin.right]);

		//y轴比例尺
		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(data, d => d.value)])
			.nice()
			.range([height - margin.bottom, margin.top]);

		//x坐标轴
		const xAxis = g =>
			g
				.attr("transform", `translate(0,${height - margin.bottom})`)
				.call(
					d3
						.axisBottom(xScale)
						.ticks(width / 80)
						.tickSizeOuter(0)
				)
				.call(g =>
					g.selectAll(".tick text").text((d, i) => {
						if (i % 2 === 0) {
							return d;
						} else {
							return "";
						}
					})
				);

		//y坐标轴
		const yAxis = g =>
			g
				.attr("transform", `translate(${margin.left},0)`)
				.call(d3.axisLeft(yScale))
				.call(g => g.select(".domain").remove())
				.call(g =>
					g
						.select(".tick:last-of-type text")
						.clone()
						.attr("x", 3)
						.attr("text-anchor", "start")
						.attr("font-weight", "bold")
						.text("$ Close")
				);

		//line布局
		const line = d3
			.line()
			.defined(d => !isNaN(d.value))
			.x(d => xScale(d.date))
			.y(d => yScale(d.value));

		//容器
		const svg = d3
			.select("#line")
			.append("svg")
			.attr("viewBox", [0, 0, width, height]);

		svg.append("g").call(xAxis);
		svg.append("g").call(yAxis);

		svg
			.append("path")
			.datum(data)
			.attr("fill", "none")
			.attr("stroke", "steelblue")
			.attr("stroke-width", 1.5)
			.attr("stroke-linejoin", "round")
			.attr("stroke-linecap", "round")
			.attr("d", line);

		console.log("line path data", line(data));

		const context = canvasRef.current.getContext("2d");
		context.lineWidth = 2;
		context.strokeStyle = "red";
		line.context(context)(data);
		context.stroke();
	}, [data]);

	return (
		<>
			<div id="line"></div>
			<canvas width={700} height={500} ref={canvasRef}></canvas>
		</>
	);
}

export default Line;

import React, { useEffect, useState } from "react";
import * as d3 from "d3";

const width = 700,
	height = 500;

function Line({data}) {
	useEffect(() => {
    //颜色比例尺
		const color = d3
			.scaleOrdinal()
			.domain(data.map(d => d.date))
			.range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

    //弧形布局
		const arc = d3
			.arc()
			.innerRadius(0)
			.outerRadius(Math.min(width, height) / 2);

		const arcLabel = () => {
			const radius = (Math.min(width, height) / 2) * 0.8;
			return d3
				.arc()
				.innerRadius(radius)
				.outerRadius(radius);
		};

    //饼图布局
		const pie = d3
			.pie()
			.sort(null)
			.value(d => d.value);

    //生成适用于弧形布局的数据
    const arcs = pie(data)

    //添加容器
		const svg = d3
			.select("#pie")
			.append("svg")
			.attr("viewBox", [-width / 2, -height / 2, width, height]);

    //添加容器路径数据
		svg
			.append("g")
			.attr("stroke", "white")
			.selectAll("path")
			.data(arcs)
			.join("path")
			.attr("fill", d => color(d.data.date))
			.attr("d", arc)
			.append("title")
			.text(d => `${d.data.date}: ${d.data.value.toLocaleString()}`);

		svg
			.append("g")
			.attr("font-family", "sans-serif")
			.attr("font-size", 12)
			.attr("text-anchor", "middle")
			.selectAll("text")
			.data(arcs)
			.join("text")
			.attr("transform", d => `translate(${arcLabel().centroid(d)})`)
			.call(text =>
				text
					.append("tspan")
					.attr("y", "-0.4em")
					.attr("font-weight", "bold")
					.text(d => d.data.date)
			)
			.call(text =>
				text
					.filter(d => d.endAngle - d.startAngle > 0.25)
					.append("tspan")
					.attr("x", 0)
					.attr("y", "0.7em")
					.attr("fill-opacity", 0.7)
					.text(d => d.data.value.toLocaleString())
      );
      
      const pathData = arcs.map(item=>arc(item))
      console.log('arcs--->', arcs)
      console.log('pie path data', pathData)
	}, [data]);

	return <div id="pie"></div>;
}

export default Line;

import * as d3 from "d3";

export default class Area {
	constructor(selector, config) {
		this.config = config;
		const { width, height } = this.config;
		this.svg = d3
			.select(selector)
			.select("svg")
			.attr("width", width)
			.attr("height", height);
	}
	draw(data) {
		const {
			width,
			height,
			padding: { bottom, top, left, right },
		} = this.config;
		let xData = [];
		let yData = [];
		for (let key in data) {
			xData.push(key);
			yData.push(data[key]);
		}
		this.xScale = d3
			.scaleBand()
			//.domain(d3.range(xData.length))//!!!
			//.rangeRound([left,width-right])
			//.domain(xData).range([left, width-right ])
			.domain(xData)
			.rangeRound([0, width - right - left]);

		let minY = d3.min(yData);
		let maxY = d3.max(yData);
		if (minY === 0 && maxY === 0) {
			minY = 0;
			maxY = 100;
		}

		this.yScale = d3
			.scaleLinear()
			.domain([0, maxY * 1.2])
			.range([0, height - bottom - top]); //!!
		let areaPath = d3
			.area()
			.x((d, i) => {
				return left + this.xScale(xData[i]);
			})
			.y0(height - bottom);
		areaPath.y1((d, i) => {
			return height - this.yScale(yData[i]) - bottom;
		});
		let area = this.svg.append("path").attr("class", "area-char");
		area
			.attr("d", areaPath(xData))
			.attr("stroke", "pink")
			.attr("fill", "pink")
			.attr("opacity", "0.6")
			.attr("transform", `translate(${this.xScale.bandwidth() / 2},0)`);

		let line = d3
			.line()
			.x((d, i) => {
				return left + this.xScale(xData[i]);
			})
			.y((d, i) => {
				return height - this.yScale(yData[i]) - bottom;
			});

		this.svg
			.append("path")
			.attr("stroke", "#19CAAD")
			.attr("stroke-width", "3px")
			.attr("fill", "none")
			.attr("class", "line")
			.attr("d", line(xData))
			.attr("transform", `translate(${this.xScale.bandwidth() / 2},0)`);

		this.svg
			.append("rect")
			.attr("x", left + this.xScale(xData[0]) + this.xScale.bandwidth() / 2 - 5)
			.attr("y", top)
			.attr("width", width - left - right + 10)
			.attr("height", height - top - bottom + 5)
			.attr("fill", "white")
			.transition()
			.duration(800)
			.attr("x", left + this.xScale(xData[xData.length - 1]) + this.xScale.bandwidth() / 2 + 10)
			.transition()
			.duration(1)
			.attr("width", 0)
			.attr("height", 0);

		//y轴
		this.yScale = d3
			.scaleLinear()
			.domain([0, maxY * 1.2])
			.range([height - bottom - top, 0]);
		const yAxis = d3.axisLeft(this.yScale).ticks(5);
		let yAxisG = this.svg.append("g").attr("class", "y-axis axis");
		yAxisG.attr("transform", `translate(${left},${top})`).call(yAxis);

		yAxisG.select(".domain").remove();
		yAxisG
			.selectAll(".tick:not(:first-of-type) line")
			.attr("stroke", "#777")
			.attr("stroke-dasharray", "2,2");
		yAxisG
			.selectAll(".tick text")
			.attr("x", 4)
			.attr("dy", -4);

		//x轴
		/*console.log(this.xScale(0))
    console.log(line(xData))
    console.log(this.xScale.bandwidth() / 2)*/
		const xAxis = d3.axisBottom(this.xScale);
		let xAxisG = this.svg.append("g").attr("class", "x-axis axis");
		xAxisG.attr("transform", `translate(${left},${height - bottom})`).call(xAxis);

		xAxisG
			.selectAll(".tick text")
			.data(xData)
			.text(d => {
				return d;
			});
		//xAxisG.selectAll(".tick line").attr("display", "none")
		xAxisG.select(".domain").remove();
	}
}

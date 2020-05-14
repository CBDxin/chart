import React, { Component } from "react";
import { geoMercator, geoPath } from "d3";
import { china } from "./geoData";
import { scale } from "../../components/Scale";;

class Geo extends Component {
	constructor(props) {
		super(props);
	}

	hasValue = (adcode)=>{
		let {data} = this.props;
		let value = false
		for (let item of data){
			if(item.adcode === adcode){
				value = item.value;
				break;
			}
		}
		
		return value;
	}

	renderMap = () => {
		let {
			cx = this.props.wrapperStyle.width / 2,
			cy = this.props.wrapperStyle.height / 2,
			wrapperStyle: { width },
			data,
		} = this.props;

		let scaleData = data.map(item => item.value);
		let colorScale = scale(
			[Math.min(...scaleData), Math.max(...scaleData)],
			['#f9fbe7', '#d50000']
		);

		let projection = geoMercator()
			.center([107, 31])
			.scale(width / 2)
			.translate([cx, cy]);

		let path = geoPath().projection(projection);

		return (
			<g>
				{china.features.map((item, index) => {
					let value = this.hasValue(item.properties.adcode)
					return (
						<g key={index}>
							<path d={path(item)} fill = {value ? colorScale(value) : "#f9fbe7"}></path>
						</g>
					);
				})}
			</g>
		);
	};

	render() {
		return <g>{this.renderMap()}</g>;
	}
}

export default Geo;

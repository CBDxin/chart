import React, { Component } from "react";
import { geoMercator, geoPath } from "d3";
import { china } from "./geoData";

class Geo extends Component {
	constructor(props) {
		super(props);
	}

	renderMap = () => {
		let {
			cx = this.props.wrapperStyle.width / 2,
      cy = this.props.wrapperStyle.height / 2,
      wrapperStyle:{
        width,
        height
      }
		} = this.props;

    console.log(cx, cy);
    
    let style = {
			transform: `translate(${cx}px,${cy}px)`,
		};

		let projection = geoMercator()
			.center([107,31])
			.scale(width / 2)
			.translate([cx, cy]);

		let path = geoPath().projection(projection);

		return <g>
      {china.features.map((item, index) => <path key={index} d={path(item)}></path>)}
    </g>
	};

	render() {
		return <g>{this.renderMap()}</g>;
	}
}

export default Geo;

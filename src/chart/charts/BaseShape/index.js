import { Component } from "react";
import { scale } from "../../components/Scale";

const mockData = {
	x: ["一", "二", "三", "四", "五"],
  y: [300, 500, 400, 900, 100],
  data:[{x:"一", y:300}, {x:"二", y:500}, {x:"三", y:400}, {x:"四", y:900}, {x:"五", y:100}]
};

// let xScale = scaleNumber(mockData.x, [50, 750], 'band');
// let yscale = scaleNumber([0, Math.max(mockData.y) * 1.2], [450, 50]);

class Bar extends Component {
	constructor(props) {
		super(props);
		this.state = {
	
    };
    this.mockData = mockData;
    this.scale = scale;
	}
}

export default Bar;
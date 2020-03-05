import React from "react";
import BaseAxis from "./BaseAxis";
import Line from "../../shape/Line";


/*
state = {
  tickItems:[
    {
      tick:string||number,
      tickData:string||number
    },
  ],
  axislinePath:[
    {
      x:,
      y:,
    },
  ]
},
props:{
  scale:bandSCale,
  data:[],
}
*/

class NumberAxis extends BaseAxis {
	constructor(props) {
		super(props);
		this.state = {
			tickItems: [],
			axisLinePath: {},
		};
	}

	componentWillMount = () => {
		this.getAxisLinePath();
    this.getTickItems();
  };
  
  UNSAFE_componentWillReceiveProps(nextProps){
		this.getAxisLinePath(nextProps);
		this.getTickItems(nextProps);
	}

	getTickItems = (props) => {
    const { scale } = props || this.props;
		let ticksData = scale.ticks();

		let tickItems = ticksData.map(tickData => {
			let tick = scale(tickData);
			return {
				tickData,
				tick,
			};
		});
		this.setState({
			tickItems,
		});
	};

	render() {
		const { axisLinePath } = this.state;
		return (
			<g>
				<Line data={axisLinePath}></Line>
				{this.renderTexts()}
        {this.renderTicks()}
			</g>
		);
	}
}

export default NumberAxis;

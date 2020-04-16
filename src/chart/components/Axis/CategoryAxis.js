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

class CategoryAxis extends BaseAxis {
	constructor(props) {
		super(props);
		this.state = {
			tickItems: [],
			axisLinePath: {},
		};
	}

	componentWillMount = () => {
		super.componentWillMount();
		this.getTickItems();
  };
  
  UNSAFE_componentWillReceiveProps(nextProps){
		super.UNSAFE_componentWillReceiveProps(nextProps)
		this.getTickItems(nextProps);
	}

	getTickItems = (props) => {
		const { data, scale } = props || this.props;
		let tickItems = data.map(tickData => {
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
		return (
			<g>
				{this.getAxisLinePath()}
				{this.renderTexts()}
        {this.renderTicks()}
			</g>
		);
	}
}

export default CategoryAxis;

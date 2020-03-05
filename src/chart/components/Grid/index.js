import React, { Component } from "react";
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

class BaseAxis extends Component {
	renderHorizonLinePath = props => {
		props = props || this.props;
		const { padding, width } = this.props.wrapperStyle;
		const { yScale } = props || this.props;

		let ticksValue = yScale.ticksValue();

		return ticksValue.map((item, index) => (
			<Line
        key={index}
        color={"gainsboro"}
				data={[
					{
						x: padding,
						y: item,
					},
					{
						x: width - padding,
						y: item,
					},
				]}
			></Line>
		));
  };
  
  renderVerticalLinePath = props => {
		props = props || this.props;
		const { padding, height } = this.props.wrapperStyle;
		const { xScale } = props || this.props;

		let ticksValue = xScale.ticksValue();

		return ticksValue.map((item, index) => (
			<Line
        key={index}
        color={"gainsboro"}
				data={[
					{
						x: item,
						y: padding,
					},
					{
						x: item,
						y: height - padding,
					},
				]}
			></Line>
		));
  };
  
  render(){
    return(
      <React.Fragment>
        {this.renderHorizonLinePath()}
        {this.renderVerticalLinePath()}
      </React.Fragment>
    )
  }
}

export default BaseAxis;

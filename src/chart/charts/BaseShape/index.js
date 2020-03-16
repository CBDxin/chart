import React, { Component } from "react";

import { interpolateNumber, timer } from "d3";


class BaseChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
	
    };
	}
	
	componentDidMount = () => {
		this.renderWithAnimation();
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState(
			{
				preData: this.state.data,
			},
			this.renderWithAnimation(nextProps)
		);
	}
  
  renderDot = (props)=>{
		let { option, colorScale, activeTickItem, isActive } = props || this.props;
		let {data} = this.state;

		return data && data.map((item, index) => {
			return (
				<circle
					key={index}
					cx={item.x}
					cy={item.y}
          r={activeTickItem && (index === activeTickItem.activeIndex) || isActive ? 5 : 3}
          stroke={colorScale(option.key)}
          fill={ "#fff" }
				></circle>
			);
		});
  }

  transition = (animation, duration)=>{
    this.timeStamp && this.timeStamp.stop();
    this.timeStamp = timer((elapsed)=>{
      let precent = elapsed / duration
      animation(precent)
      if(precent > 1){
        this.timeStamp.stop();
        this.timeStamp = null;
      }
    })
  }

  renderWithAnimation = props => {
		this.transition(precent => {
			this.animation(precent, props || this.props);
    }, 100);
	};

	animation = (precent, props) => {
		let { data } = props;
    let { preData } = this.state;
    
		if(precent > 1){precent = 1}
		
		// console.log(data)

		let nextData = data.map((item, index) => {
			const interpolatorY = interpolateNumber(preData ? preData[index] ? preData[index].y : preData[preData.length-1].y : 0, item.y);
			const interpolatorX = interpolateNumber(preData ? preData[index] ? preData[index].x : preData[preData.length-1].x : 0, item.x);
			return {
				x: interpolatorX(precent),
				y: interpolatorY(precent),
				// x:item.x,
				// y:item.y
			};
    });
    
    // console.log(this.props.option.key)

		this.setState({
			data: nextData,
		});
	};
  
}

export default BaseChart;
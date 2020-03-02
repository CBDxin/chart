import React from "react";
import BaseShape from "../BaseShape";
import { pie, arc } from "d3";
import {colorLight, colorHeavy} from "../../util/color";
import { scale } from "../../components/Scale";


class Pie extends BaseShape {
  constructor(props){
    super(props);
    this.state={
      colorScale:null
    }
  }

  componentWillMount(){
    this.getColorSCale()
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    this.getColorSCale(nextProps)
  }

  getColorSCale = (props)=>{
    const { chartIndex, data } = props || this.props;
    let colorScale = scale([0, data.length - 1], [colorLight[chartIndex], colorHeavy[chartIndex]])
    this.setState({
      colorScale
    })
  }

	createArcs = props => {
		let {
			data,
			outerRadius = 100,
			innerRadius = 0,
			cx = this.props.wrapperStyle.width / 2,
			cy = this.props.wrapperStyle.height / 2,
    } = props || this.props;
    
    const { colorScale } = this.state;

		let style = {
			transform: `translate(${cx}px,${cy}px)`,
		};

		let pieCreator = pie().value(d => d.range).sort((a, b)=>b);
		let pieData = pieCreator(data);
		let pieArc = arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius);

		return pieData.map((item, index) => {
			return (
				<g style={style} key={index}>
					<path fill={colorScale(index)} d={pieArc(item)}></path>
				</g>
			);
		});

		// return data.map((item, index) => {
		// 	return (

		// 	);
		// });
	};

	render() {
		return <g>{this.createArcs()}</g>;
	}
}

export default Pie;

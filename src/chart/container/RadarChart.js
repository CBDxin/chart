import React, { Component } from "react";
import Radar from "../charts/Radar";
import { scale } from "../components/Scale";

class RadarChart extends Component{
  constructor(props){
    super(props);
    this.state={
      data:null,
      radiusScale:null,
      angleScale:null
    }
  }

  componentWillMount(){
    this.formatData()
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    this.formatData(nextProps)
  }

  createScale = (props)=>{
    let { data, option:{maxRadius = 100} } = props || this.props;
    let range = data.map(d=>d.range)

    let radiusScale = scale([0, Math.max(...range)], [0, maxRadius]);
    let angleScale = scale(data.map(d=>d.domain), [0, 360], 'bandNormal');

    return {
      radiusScale,
      angleScale
    }
  }

  formatData = (props)=>{
    let { data } = props || this.props;
    let { radiusScale, angleScale } = this.createScale(props || this.props)

    let formatedData = data.map((item)=>({
      radius:radiusScale(item.range),
      angle:angleScale(item.domain)
    }))
    
    this.setState({
      data:formatedData,
      radiusScale,
      angleScale
    })
  }

  render(){
    let {radiusScale, angleScale} = this.state;
    return <Radar {...this.props} data={this.state.data} radiusScale={radiusScale} angleScale={angleScale}></Radar>
  }
}

export default RadarChart;
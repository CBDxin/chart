import React, { Component } from "react";
import Scatter from "../charts/Scatter";

class ScatterChart extends Component{
  constructor(props){
    super(props);
    this.state={
      data:null
    }
  }

  componentWillMount(){
    this.formatData()
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    this.formatData(nextProps)
  }

  formatData = (props)=>{
    let { data, xScale, yScale } = props || this.props;
    let formatedData = data.map(item=>({
      x:xScale(item.domain),
      y:yScale(item.range)
    }))
    
    this.setState({
      data:formatedData
    })
  }

  render(){
    return <Scatter {...this.props} data={this.state.data}></Scatter>
  }
}

export default ScatterChart;
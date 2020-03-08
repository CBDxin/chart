import React, { Component } from "react";
import Line from "../charts/Line";

class LineChart extends Component{
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
    return <Line {...this.props} data={this.state.data}></Line>
  }
}

export default LineChart;
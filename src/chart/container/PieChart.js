import React, { Component } from "react";
import Pie from "../charts/Pie";
import { pie } from "d3";

class PieChart extends Component{
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
    let { data } = props || this.props;

    let pieCreator = pie().value(d => d.range).sort((a, b)=>b);
    let formatedData = pieCreator(data);
    console.log(formatedData)
    
    this.setState({
      data:formatedData
    })
  }

  render(){
    return <Pie {...this.props} data={this.state.data}></Pie>
  }
}

export default PieChart;
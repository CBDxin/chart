import React, { Component } from "react";
import Geo from "../charts/Geo";

class GeoChart extends Component{
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
    let { data} = props || this.props;
  
    
    this.setState({
      data:data
    })
  }

  render(){
    return <Geo {...this.props} data={this.state.data}></Geo>
  }
}

export default GeoChart;
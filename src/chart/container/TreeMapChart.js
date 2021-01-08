import React, { Component } from "react";
import TreeMap from "../charts/TreeMap";
import {treemap,hierarchy} from 'd3'

class TreeMapChart extends Component{
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
    let { data, wrapperStyle:{width, height} } = props || this.props;

    console.log('---hierarchy',hierarchy(data))

    let treemapCreator = treemap().size([width*0.6,height*0.6])
    let root = hierarchy(data).sum(d =>d.value)
    let tree = treemapCreator(root)
    let leaves = tree.leaves()
    // console.log(leaves)
    
    this.setState({
      data:leaves
    })
  }

  render(){
    return <TreeMap {...this.props} data={this.state.data}></TreeMap>
  }
}

export default TreeMapChart;
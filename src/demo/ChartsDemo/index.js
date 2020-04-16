import React, { Component, createRef } from "react";
import { Menu, Button } from "antd";
import Code from "../Code";
import Chart from "../../chart/chart";

import "./index.less";

let option = `{
  "height": 700,
  "width": "100%",
  "charts":[
    {
      "type":"Area",
      "name":"Area",
      "key":"Area"
    }
  ],
  "components":[
    {
      "type":"xAxis",
      "position":"bottom"
    },
    {
      "type":"yAxis",
      "position":"left"
    }
  ],
  "dataSet":{
    "domain":[1,2,3,4,5,6],
    "range":{
      "Area":[300,500,400,20,600,900]
    }
  }
}`;

class ChartsDemo extends Component {
	constructor(props) {
    super(props);
    this.code = createRef()
		this.state = {
			current: "charts",
			option: option
		};
	}

	handleClickMenu = e => {
		this.setState({
			current: e.key
		});
  };
  
  handleClickRun = () =>{
    // console.log(this.code.current.editor.getValue())
    this.setState({
      option:this.code.current.editor.getValue()
    })
  }

	render() {
		let { option, current } = this.state;
		// console.log(JSON.parse(option));
		return (
			<div className="charts-demo">
				<div className="charts-menu">
					<Menu onClick={this.handleClickMenu} selectedKeys={[current]} >
						<Menu.Item key="charts">Area</Menu.Item>
					</Menu>
				</div>
				<div className="charts-body">
          <div className="title">
            <div className="chart-title">
              区域图示例
            </div>
            <div className="code-title">
              <Button onClick={this.handleClickRun}>运行</Button>
              <span className="text">配置代码</span>
            </div>
          </div>
					<div className="chart-wrap">
						<Chart option={JSON.parse(option)}></Chart>
					</div>
					<div className="code-wrap">
						<Code ref={this.code} content={option} />
					</div>
				</div>
			</div>
		);
	}
}

export default ChartsDemo;

import React, { Component, createRef } from "react";
import { Menu, Button } from "antd";
import Code from "../Code";
import Chart from "../../chart/chart";
import optionSet from "./optionSet";

import "./index.less";

class ChartsDemo extends Component {
	constructor(props) {
    super(props);
    this.code = createRef()
		this.state = {
			current: "Area",
			option: optionSet["Area"].option
		};
	}

	handleClickMenu = e => {
		this.setState({
      current: e.key,
      option: optionSet[e.key].option
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
            {
              Object.keys(optionSet).map(item=>(
                <Menu.Item key={item}>{item}</Menu.Item>
              ))
            }
					</Menu>
				</div>
				<div className="charts-body">
          <div className="title">
            <div className="chart-title">
              {optionSet[current].name}示例
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

import React, { Component } from "react";
import { HashRouter as Router, Link, Route } from "react-router-dom";
import { Menu } from "antd";

import "./index.less"

import ChartsDemo from './ChartsDemo';
import ComponentsDemo from "./ComponentsDemo";
import COVIDDemo from "./COVIDDemo";

const MIStyle = {
  padding:5,
  fontWeight:"bold"
} 

class Demo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: "charts"
		};
	}

	handleClickMenu = e => {
		this.setState({
			current: e.key
		});
	};

	render() {
		return (
			<Router>
				<div className="Demo">
					<Menu
						onClick={this.handleClickMenu}
						selectedKeys={[this.state.current]}
            mode="horizontal"
            style={{
              fontSize: 20,
              textAlign:"center",
              boxShadow:"0 0 4px rgba(0,0,0,.25)",
            }}
					>
						<Menu.Item style={MIStyle} key="charts">
							<Link className="link" to="/charts">可视化图形表格示例</Link>
						</Menu.Item>
						<Menu.Item style={MIStyle} key="components">
							<Link className="link" to="/components">交互组件示例</Link>
						</Menu.Item>
            <Menu.Item style={MIStyle} key="demo">
							<Link className="link" to="/demo">新冠疫情数据应用</Link>
						</Menu.Item>
					</Menu>
					<Route path="/charts" component={ChartsDemo}></Route>
					<Route path="/components" component={ComponentsDemo}></Route>
          <Route path="/demo" component={COVIDDemo}></Route>
				</div>
			</Router>
		);
	}
}

export default Demo;

import React, { Component } from "react";
import { HashRouter as Router, Link, Route } from "react-router-dom";
import { Menu } from "antd";

import "./index.less";

import ChartsDemo from "./ChartsDemo";
import COVIDDemo from "./COVIDDemo";
import Animation from "./AnimationDemo/test";
import RawDemo from "./RawDemo";
import Raw from "./RawDemo";

const MIStyle = {
	padding: 5,
	fontWeight: "bold",
};

class Demo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: "charts",
		};
	}

	handleClickMenu = e => {
		this.setState({
			current: e.key,
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
							textAlign: "center",
							boxShadow: "0 0 4px rgba(0,0,0,.25)",
						}}
					>
						<Menu.Item style={MIStyle} key="charts">
							<Link className="link" to="/">
								可视化图形表格示例
							</Link>
						</Menu.Item>
						<Menu.Item style={MIStyle} key="demo">
							<Link className="link" to="/demo">
								新冠疫情数据应用
							</Link>
						</Menu.Item>
						<Menu.Item style={MIStyle} key="animation">
							<Link className="link" to="/animation">
								animation
							</Link>
						</Menu.Item>
						<Menu.Item style={MIStyle} key="raw">
							<Link className="link" to="/raw">
								raw
							</Link>
						</Menu.Item>
					</Menu>
					<Route path="/" exact component={ChartsDemo}></Route>
					<Route path="/demo" component={COVIDDemo}></Route>
					<Route path="/animation" component={Animation}></Route>
					<Route path="/raw" component={RawDemo}></Route>
				</div>
			</Router>
		);
	}
}

export default Demo;

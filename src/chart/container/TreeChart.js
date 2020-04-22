import React, { Component } from "react";
import Tree from "../charts/Tree";
import { tree, hierarchy } from "d3";

class TreeChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
		};
	}

	componentWillMount() {
		this.formatData();
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.formatData(nextProps);
	}

	formatData = props => {
		let {
			data,
			wrapperStyle: { width, height },
		} = props || this.props;

		let root = hierarchy(data).sum(d => d.value);
		let treeCreator = tree().size([height * 0.6, width * 0.6]);
		let _tree = treeCreator(root);

		this.setState({
			data: _tree,
		});
	};

	render() {
		return <Tree {...this.props} data={this.state.data}></Tree>;
	}
}

export default TreeChart;

import React, { Component } from "react";

import "./index.less";

/*
prop:{
  style:{

  },
  activeTickItem:{},
  renderContent:{},
  allowEscapeViewBox: { x: false, y: false },
  wrapperStyle:{}
}
*/

class Tooltip extends Component {
	constructor(props) {
		super(props);

		this.box = React.createRef();
		this.state = {
			boxStyle: { visibility: "hidden" },
		};
	}

	componentDidMount() {
		this.getBoxStyle();
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.getBoxStyle(nextProps);
	}

	getTranslate = (x, boxLength, wrapperLength, padding = 20) => {
		if (x + boxLength + 2 * padding < wrapperLength) {
			return x + padding;
		} else {
			return x - boxLength - padding;
		}
	};

	getBoxStyle = props => {
		const { activeTickItem, wrapperStyle } = props || this.props;

		if (!activeTickItem) {
      console.log('---hide')
			this.setState({
				boxStyle: { 
          ...this.state.boxStyle,
          visibility: "hidden" 
        },
			});
			return;
		}

		let translateX, translateY;
		translateX = this.getTranslate(
			activeTickItem.activeTickPostion,
			this.box.current.clientWidth,
			wrapperStyle.width - wrapperStyle.padding 
    );
		translateY = this.getTranslate(
			activeTickItem.mouseCoordinate.chartY,
			this.box.current.clientHeight,
			wrapperStyle.height - wrapperStyle.padding
		);

		this.setState({
			boxStyle: {
				maxWidth: wrapperStyle.width / 2,
				maxHeight: wrapperStyle.height / 2,
				transform: `translate(${translateX}px, ${translateY}px)`,
			},
		});
	};

	renderContent = () => {
    let { activeTickItem, colorScale } = this.props;

		return (
			<React.Fragment>
				<div className="activeTick toptip-list">{activeTickItem.activeTick}</div>
				{activeTickItem.activeData.map((item, index) => (
					<div className="toptip-list" key={index}>
            <span className="color-label" style={{background:colorScale(item.key)}}></span>
						{item.name}:{item.value}
					</div>
				))}
			</React.Fragment>
		);
	};

	render() {
    let { boxStyle } = this.state;
    let { activeTickItem } = this.props;
		return (
			<div ref={this.box} style={boxStyle} className="tooltip-wrapper">
				{activeTickItem && this.renderContent()}
			</div>
		);
	}
}

export default Tooltip;

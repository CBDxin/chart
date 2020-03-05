import React, { Component } from "react";

import "./index.less";

class Legend extends Component {

	renderContent = () => {
    let { option, colorScale, setActiveCharts } = this.props;

		return (
			<React.Fragment>
				{
          option.dataItems && option.dataItems.map((item, index)=>{
            return(
              <div onMouseLeave={()=>setActiveCharts(item)} onMouseEnter={()=>setActiveCharts(item)} key = {index} className="legend-item">
                <span className="color-label" style={{background:colorScale(item)}}></span>
                {item}
              </div>
            )
          })
        }
			</React.Fragment>
		);
	};

	render() {
		return (
			<div className="legend-wrapper">
				{this.renderContent()}
			</div>
		);
	}
}

export default Legend;

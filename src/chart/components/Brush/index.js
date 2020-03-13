import React, { Component } from "react";
import {scaleQuantize} from "d3";

class Brush extends Component {
	constructor(props) {
		super(props);
		this.state = {
			x0OfSlider: props.wrapperStyle.padding.left,
      x1OfSlider: props.wrapperStyle.padding.left + 100,
      moveType:null,
      startMoveX: null,
      brushScale:null,
		};
  }

  componentWillMount(){
    this.getBrushScale();
  }

  componentDidMount(){
    this.updateBrushIndex()
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    this.getBrushScale(nextProps);
  }
  
  getBrushScale = (props)=>{
    let {domain, wrapperStyle} = props || this.props;
    let brushRange = Array.from({length:domain.length}, (v,k) => k);
    this.setState({
      brushScale:scaleQuantize([wrapperStyle.padding.left, wrapperStyle.width - wrapperStyle.padding.right], brushRange)
    })
  }

	renderSlider = () => {
		let { x0OfSlider, x1OfSlider } = this.state;
		let { wrapperStyle } = this.props;
		let x = Math.min(x0OfSlider, x1OfSlider);
		let width = Math.abs(x0OfSlider - x1OfSlider);

		return (
			<rect
				onMouseDown={(event)=>this.handleClickSlider(event, "Slider")}
				y={wrapperStyle.height - 30}
				x={x}
				width={width}
				height={30}
				fill={"#000"}
				opacity={0.1}
			></rect>
		);
	};

	renderSliderSide = () => {
		let { x0OfSlider, x1OfSlider } = this.state;
		let { wrapperStyle } = this.props;

		return (
			<g>
				<circle
          onMouseDown={(event)=>this.handleClickSlider(event, "x0")}
					cx={x0OfSlider}
					cy={wrapperStyle.height - 30 + 15}
					r={13}
					fill="#fff"
					stroke="darkgray"
				></circle>

				<circle
          onMouseDown={(event)=>this.handleClickSlider(event, "x1")}
					cx={x1OfSlider}
					cy={wrapperStyle.height - 30 + 15}
					r={13}
					fill="#fff"
					stroke="darkgray"
				></circle>
			</g>
		);
  };
  
  updateBrushIndex = ()=>{
    let {x0OfSlider, x1OfSlider, brushScale} = this.state;
    console.log({
      startIndex:Math.min(brushScale(x0OfSlider), brushScale(x1OfSlider)),
      endIndex:Math.max(brushScale(x0OfSlider), brushScale(x1OfSlider))
    })
    this.props.updateBrushIndex({
      startIndex:Math.min(brushScale(x0OfSlider), brushScale(x1OfSlider)),
      endIndex:Math.max(brushScale(x0OfSlider), brushScale(x1OfSlider))
    })
  }

	handleClickSlider = (event, type) => {
    event.persist();
    
    console.log(type)

		this.setState(
			{
        startMoveX: event.pageX,
        moveType:type
			},
			() => {
				window.addEventListener("mousemove", this.onMoseMove);
			}
		);
	};

	onMoseMove = event => {
		console.log("mousemove");
		let { x0OfSlider, x1OfSlider, startMoveX, moveType } = this.state;
    let distance = event.pageX - startMoveX;
    
    if(moveType === "Slider"){
      let xSets = this.getXSetInRange(x0OfSlider, x1OfSlider, distance);
      this.setState({
        x0OfSlider: xSets.minX,
        x1OfSlider: xSets.maxX,
        startMoveX: event.pageX,
      }, this.updateBrushIndex);
    }else if(moveType === "x0"){
      let x0 = this.getXInRange(x0OfSlider, distance)
      this.setState({
        x0OfSlider:x0,
        startMoveX: event.pageX,
      }, this.updateBrushIndex)
    }else if(moveType === "x1"){
      let x1 = this.getXInRange(x1OfSlider, distance)
      this.setState({
        x1OfSlider:x1,
        startMoveX: event.pageX,
      }, this.updateBrushIndex)
    }
	
		window.addEventListener("mouseup", this.onMoseUp);
  };
  
  getXInRange = (x, distance)=>{
    let { wrapperStyle } = this.props;
    let result = x + distance;
    if(result <  wrapperStyle.padding.left){
      result =  wrapperStyle.padding.left;
    }else if(result > wrapperStyle.width - wrapperStyle.padding.right){
      result = wrapperStyle.width - wrapperStyle.padding.right;
    }

    return result;
  }

	getXSetInRange = (x0OfSlider, x1OfSlider, distance) => {
		let { wrapperStyle } = this.props;
		let maxX = Math.max(x0OfSlider, x1OfSlider);
    let minX = Math.min(x0OfSlider, x1OfSlider);
    let result = {
			minX: minX + distance,
			maxX: maxX + distance,
		};
	
		if (result.minX < wrapperStyle.padding.left) {
      result.minX = wrapperStyle.padding.left;
      result.maxX = wrapperStyle.padding.left + maxX - minX;
      return result;
    } 
    if (result.maxX > wrapperStyle.width - wrapperStyle.padding.right) {
      result.maxX = wrapperStyle.width - wrapperStyle.padding.right;
      result.minX = wrapperStyle.width - wrapperStyle.padding.right - maxX + minX;
      return result;
    }

		return result;
	};

	onMoseUp = event => {
		console.log("onmouseup");

		window.removeEventListener("mousemove", this.onMoseMove);
		window.removeEventListener("mouseup", this.onMoseUp);
	};

	render() {
		let { wrapperStyle } = this.props;
		return (
			<g>
				<rect
					x={wrapperStyle.padding.left}
					y={wrapperStyle.height - 30}
					height={30}
					width={wrapperStyle.width - wrapperStyle.padding.left - wrapperStyle.padding.right}
					fill={"#fff"}
					stroke={"darkgray"}
					opacity={0.8}
				></rect>
				{this.renderSlider()}
				{this.renderSliderSide()}
			</g>
		);
	}
}

export default Brush;

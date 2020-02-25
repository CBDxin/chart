import * as d3 from 'd3'

export default class Bar{
  constructor(selector,config){
    this.config = config
    let {width,height} = this.config
    this.svg = d3.select(selector).select('svg')
      .attr('width',width)
      .attr('height',height)
  }
  draw(data){
    let {
      width,
      height,
      padding:{
        top,
        bottom,
        left,
        right
      }
    } = this.config

    let xData = []
    let yData = []
    for (let key in data){
      xData.push(key)
      yData.push(data[key])
    }
    let minY = d3.min(yData)
    let maxY = d3.max(yData)
    if (minY === 0 && maxY === 0){
      minY = 0
      maxY = 100
    }


    let xScale = d3.scaleBand().domain(xData).range([0,width - left - right])
    let yScale = d3.scaleLinear().domain([0,maxY*1.2]).range([0,height - top - bottom])

    let rects = this.svg.selectAll('.rect').data(xData)
      .enter().append('rect')
      .attr('class','.rect')
      .attr('x',(d,i)=>{
        return left + xScale(xData[i])+xScale.bandwidth()*0.15
      })
      .attr('y',(d,i )=>{
        return height - bottom
      })
      .attr('fill','#fff040')
      .attr('width',`${xScale.bandwidth()*0.7}`)
      .attr('height',0)
      .transition()
      .duration(800)
      .attr('height',(d,i)=>{
        return yScale(yData[i])
      })
      .attr('y',(d,i )=>{
        return height - bottom - yScale(yData[i])
      })


    yScale.range([height - top - bottom,0])
    let yAxis = d3.axisLeft(yScale).ticks(5)
    let yAxisG = this.svg.append('g').attr('class','y-axis axis')
    yAxisG.attr('transform',`translate(${left},${top})`).call(yAxis)

    let xAxis = d3.axisBottom(xScale)
    let xAxisG = this.svg.append('g').attr('class','x-axis axis')
    xAxisG.attr('transform',`translate(${left},${height - bottom})`).call(xAxis)
  }
}

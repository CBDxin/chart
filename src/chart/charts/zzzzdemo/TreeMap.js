import * as d3 from 'd3'

export default class TreeMap{
  constructor (selector,config) {
    this.config = config
    const {
      width,
      height
    } = this.config
    this.svg = d3.select(selector).select('svg')
      .attr('width',width)
      .attr('height',height)
  }
  draw(data){
    const {
      width,
      height,
      padding: {
        bottom,
        top,
        left,
        right
      } } = this.config

    let color = d3.scaleOrdinal(d3.schemeSet3)
    let treemap = d3.treemap().size([width*0.6,height*0.6])
    let root = d3.hierarchy(data).sum(d =>d.value)
    let tree = treemap(root)
    let leaves = tree.leaves()
    /*console.log(data)
    console.log(root)
    console.log(tree)
    console.log(leaves)*/

    let gs = this.svg.selectAll('.gs')
      .data(leaves)
      .enter()
      .append('g')
      .attr('transform',`translate(${width*0.2},${height*0.2})`)
      .attr('class', 'gs')

    gs.append('rect')
      .attr('x', (d) =>(d.x1 + d.x0)/2)
      .attr('y', (d) => (d.y1 + d.y0)/2)
      .attr('width', (d) => 0)
      .attr('height', (d) => 0)
      .style('fill', (d) => color(d.data.name))
      .style('stroke', '#cccccc')
      .transition()
      .duration(500)
      .attr('x', (d) => d.x0)
      .attr('y', (d) => d.y0)
      .attr('width', (d) => (d.x1 - d.x0))
      .attr('height', (d) => (d.y1 - d.y0))

    gs.append('text')
      .attr('x', (d) => (d.x0+d.x1)/2)
      .attr('y', (d) => (d.y0+d.y1)/2)
      .attr('text-anchor','middle')
      .attr('font-size','14px')
      .attr('fill','grey')
      .text(d =>d.data.name)

  }
}

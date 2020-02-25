import * as d3 from 'd3'

export default class Pie{
  constructor(selector,config){
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
    let length = data.length + 1
    let flag = length
    let totprice = 0
    const {
      width,
      height,
      padding: {
        bottom,
        top,
        left,
        right
      } } = this.config
    let contentData = []
    let numData = []
    for (let key in data){
      totprice =parseFloat(totprice) + parseFloat(data[key])
      totprice = parseFloat(totprice).toFixed(2)
      contentData.push(key)
      numData.push(data[key])
    }

    let colorScale = d3.scaleOrdinal()
      .domain(contentData)
      .range(d3.schemeSet3)

    let pie = d3.pie()
    let outerRadius = height / 2 * 0.75
    let innerRadius = outerRadius * 0.68
    let arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius)
    let biggerArc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius*1.2)
    let blankArc = d3.arc().innerRadius(innerRadius).outerRadius(innerRadius+1)
    let pieData = pie(numData)

    let contentGsData = contentData.filter((item, index)=>{
      if (index<8){
        return true
      }else {
        return false
      }
    })

    let contentGs = this.svg.selectAll('.contentGs').data(contentGsData).enter()
      .append('g').attr('class','.contentGs')
    contentGs.append('text').attr('transform',(d,i)=>{
      return `translate(+${width/5},${(top+16*(i+2))})`
    }).text((d)=>{
      return d
    }).attr('font-size','12px')


    contentGs.append('circle')
      .attr('transform',(d,i)=>{
        return `translate(+${width/5-10},${(top-4+16*(i+2))})`
      })
      .attr('r','6')
      .attr('fill',(d)=>{
        return colorScale(d)
      })


    this.svg.append('text').text('总支出')
      .attr('transform','translate('+width*11/16+','+(height/2-4)+')')
      .attr('text-anchor','middle')
      .attr('font-size','12px')
      .attr('fill','grey')
      .attr('class','price-text')
    this.svg.append('text').text(totprice)
      .attr('transform','translate('+width*11/16+','+(height/2+16)+')')
      .attr('text-anchor','middle')
      .attr('class','price-num')



    let gs = this.svg.selectAll('.arcG').data(pieData).enter()
      .append('g').attr('class','.arcG')
      .attr('transform','translate('+width*11/16+','+height/2+')')

    /*let pieD = []
    pieData.forEach((item,i)=>{
      pieD[i]= {}
      for(let x in item){
        pieD[i][x] = item[x]
      }
      pieD[i].endAngle =pieD[i].startAngle
    })
    console.log(pieD)*/
    let path = gs.append('path').attr("d",function(d,i){
      return blankArc(d);//往弧形生成器中出入数据
    })
      .attr("fill",function(d,i){
        return colorScale(contentData[i]);//设置颜色
      })
      .attr('class',(d, i)=>{
        return `path${i}`
      })
      .on('click',function (d,i) {
        d3.select(`.path${flag}`)
          .attr('d', function (d, i) { return biggerArc(d) })
          .transition()
          .duration(200)
          .ease(d3.easeBounceOut)
          .attr('d', function (d, i) { return arc(d) })
        if (flag == i){
          flag = length
          d3.select('.price-text').text('总价格')
          d3.select('.price-num').text(totprice)
        }else{
          d3.select('.price-text').text(contentData[i])
          d3.select('.price-num').text(numData[i])
          d3.select(this)
            .attr('d', function (d, i) { return arc(d) })
            .transition()
            .duration(200)
            .ease(d3.easeBounceOut)
            .attr('d', function (d, i) { return biggerArc(d) })
          flag = i
        }
      })
      .transition()
      .duration(1000)
      .attr('d', function (d, i) { return arc(d) })




  }
}

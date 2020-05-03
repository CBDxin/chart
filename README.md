基于D3.js + React 实现的数据可视化构建工具 在线预览地址http://47.107.66.252:8080/#/

启动
~~~
npm run start
~~~

声明式配置语法
`
{
  height: 700,
  width: "100%",
  charts:[
    {
      type:"Area",
      name:"区域图",
      key:"Area"
    }
  ],
  components:[
    {
      type:"xAxis",
      position:"bottom"
    },
    {
      type:"yAxis",
      position:"left"
    }
  ],
  dataSet:{
    domain:[1,2,3,4,5,6],
    range:{
      Area:[300,500,400,20,600,900]
    }
  }
}
`

可视化图表：
1. Area,
<img width="350" src="https://github.com/CBDxin/chart/blob/master/public/image/Area.png"/>
2. AreaStack,
<img width="350" src="https://github.com/CBDxin/chart/blob/master/public/image/AreaStack.png"/>
3. Bar,
<img width="350" src="https://github.com/CBDxin/chart/blob/master/public/image/Bar.png"/>
4. BarStack,
<img width="350" src="https://github.com/CBDxin/chart/blob/master/public/image/BarStack.png"/>
5. Line,
<img width="350" src="https://github.com/CBDxin/chart/blob/master/public/image/Line.png"/>
6. Scatter,
<img width="350" src="https://github.com/CBDxin/chart/blob/master/public/image/Scatter.png"/>
7. Pie,
<img width="350" src="https://github.com/CBDxin/chart/blob/master/public/image/Pie.png"/>
8. PolarScatter,
<img width="350" src="https://github.com/CBDxin/chart/blob/master/public/image/PolarScatter.png"/>
9. Radar,
<img width="350" src="https://github.com/CBDxin/chart/blob/master/public/image/Radar.png"/>
10. TreeMap,
<img width="350" src="https://github.com/CBDxin/chart/blob/master/public/image/TreeMap.png"/>
11. Tree,
<img width="350" src="https://github.com/CBDxin/chart/blob/master/public/image/Tree.png"/>
12. Geo
<img width="350" src="https://github.com/CBDxin/chart/blob/master/public/image/Geo.png"/>

可视化组件：
1. Scale
2. Axis
3. Tooltip
4. Brush
5. Grid
6. Legend
7. LinearGradient
8. VisualMap

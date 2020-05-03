export default {
	Area: {
		name: "区域图",
		option: `{
      "height": 700,
      "width": "100%",
      "charts":[
        {
          "type":"Area",
          "name":"区域图",
          "key":"Area"
        }
      ],
      "components":[
        {
          "type":"xAxis",
          "position":"bottom"
        },
        {
          "type":"yAxis",
          "position":"left"
        }
      ],
      "dataSet":{
        "domain":[1,2,3,4,5,6],
        "range":{
          "Area":[300,500,400,20,600,900]
        }
      }
    }`,
	},
	AreaStack: {
		name: "图",
		option: `{
      "height": 700,
      "width": "100%",
      "charts":[
        {
          "type":"AreaStack",
          "name":"图",
          "key":"AreaStack"
        }
      ],
      "components":[
        {
          "type":"xAxis",
          "position":"bottom"
        },
        {
          "type":"yAxis",
          "position":"left"
        }
      ],
      "dataSet":{
        "domain":[1,2,3,4,5,6],
        "range":{
          "AreaStack":{
            "a":[300,500,400,20,600,900],
            "b":[300,500,400,20,600,900],
            "c":[300,500,400,20,600,900],
            "d":[300,500,400,20,600,900]
          }
        }
      }
    }`,
	},
	Bar: {
		name: "柱状图",
		option: `{
      "height": 700,
      "width": "100%",
      "charts":[
        {
          "type":"Bar",
          "name":"柱状图",
          "key":"Bar"
        }
      ],
      "components":[
        {
          "type":"xAxis",
          "position":"bottom"
        },
        {
          "type":"yAxis",
          "position":"left"
        }
      ],
      "dataSet":{
        "domain":[1,2,3,4,5,6],
        "range":{
          "Bar":[300,500,400,20,600,900]
        }
      }
    }`,
	},
	BarStack: {
		name: "柱状图",
		option: `{
      "height": 700,
      "width": "100%",
      "charts":[
        {
          "type":"BarStack",
          "name":"柱状图",
          "key":"BarStack"
        }
      ],
      "components":[
        {
          "type":"xAxis",
          "position":"bottom"
        },
        {
          "type":"yAxis",
          "position":"left"
        }
      ],
      "dataSet":{
        "domain":[1,2,3,4,5,6],
        "range":{
          "BarStack":{
            "a":[300,500,400,20,600,900],
            "b":[300,500,400,20,600,900],
            "c":[300,500,400,20,600,900],
            "d":[300,500,400,20,600,900]
          }
        }
      }
    }`,
	},
	BarGroup: {
		name: "柱状图",
		option: `{
      "height": 700,
      "width": "100%",
      "charts":[
        {
          "type":"BarGroup",
          "name":"柱状图",
          "key":"BarGroup"
        }
      ],
      "components":[
        {
          "type":"xAxis",
          "position":"bottom"
        },
        {
          "type":"yAxis",
          "position":"left"
        }
      ],
      "dataSet":{
        "domain":[1,2,3,4,5,6],
        "range":{
          "BarGroup":[[150,800,500],[100,300,500],[500,70,400],[800,200,550],[1000,300,300],[200,800,200]]
        }
      }
    }`,
	},
	Line: {
		name: "折线图",
		option: `{
      "height": 700,
      "width": "100%",
      "charts":[
        {
          "type":"Line",
          "name":"折线图",
          "key":"Line"
        }
      ],
      "components":[
        {
          "type":"xAxis",
          "position":"bottom"
        },
        {
          "type":"yAxis",
          "position":"left"
        }
      ],
      "dataSet":{
        "domain":[1,2,3,4,5,6],
        "range":{
          "Line":[300,500,400,20,600,900]
        }
      }
    }`,
	},
	Scatter: {
		name: "散点图",
		option: `
    {
      "height": 700,
      "width": "100%",
      "charts":[
        {
          "type":"Scatter",
          "name":"散点图",
          "key":"Scatter"
        }
      ],
      "components":[
        {
          "type":"xAxis",
          "position":"bottom"
        },
        {
          "type":"yAxis",
          "position":"left"
        }
      ],
      "dataSet":{
        "domain":[1,2,3,4,5,6],
        "range":{
          "Scatter":[300,500,400,20,600,900]
        }
      }
    }`,
	},
	Pie: {
		name: "饼图",
		option: `{
      "height": 700,
      "width": "100%",
      "charts":[
        {
          "type":"Pie",
          "name":"饼图",
          "key":"Pie"
        }
      ],
      "dataSet":{
        "domain":[1,2,3,4,5,6],
        "range":{
          "Pie":[300,500,400,20,600,900]
        }
      }
    }`,
	},
	PolarScatter: {
		name: "雷达图",
		option: `{
      "height": 700,
      "width": "100%",
      "charts":[
        {
          "type":"PolarScatter",
          "name":"雷达图",
          "key":"PolarScatter"
        }
      ],
      "dataSet":{
        "domain":[1,2,3,4,5,6],
        "range":{
          "PolarScatter":[300,500,400,20,600,900]
        }
      }
    }`,
	},
	Radar: {
		name: "雷达图",
		option: `{
      "height": 700,
      "width": "100%",
      "charts":[
        {
          "type":"Radar",
          "name":"雷达图",
          "key":"Radar"
        }
      ],
      "dataSet":{
        "domain":[1,2,3,4,5,6],
        "range":{
          "Radar":[300,500,400,20,600,900]
        }
      }
    }`,
	},
	TreeMap: {
		name: "矩阵树图",
		option: `{
      "height": 700,
      "width": "100%",
      "charts":[
        {
          "type":"TreeMap",
          "name":"矩阵树图",
          "key":"TreeMap",
          "data":{
            "name":"all",
            "children":[
              {
                "name":"1",
                "children":[
                  {
                    "name":"1-1",
                    "value":2
                  },
                  {
                    "name":"1-2",
                    "value":3
                  }
                ]
              },
              {
                "name":"2",
                "value":3
              },
              {
                "name":"3",
                "value":5
              },
              {
                "name":"4",
                "value":8
              }
            ]
          }
        }
      ]
    }`,
	},
	Tree: {
		name: "树图",
    option: `
    {
      "height": 700,
      "width": "100%",
      "charts":[
        {
          "type":"Tree",
          "name":"树图",
          "key":"Tree",
          "data":{
            "name":"all",
            "children":[
              {
                "name":"1",
                "children":[
                  {
                    "name":"1-1",
                    "value":2
                  },
                  {
                    "name":"1-2",
                    "value":3
                  }
                ]
              },
              {
                "name":"2",
                "value":3
              },
              {
                "name":"3",
                "value":5
              },
              {
                "name":"4",
                "value":8
              }
            ]
          }
        }
      ]
    }`,
	},
	Geo: {
		name: "树图",
    option: `
    {
      "height": 700,
      "width": "100%",
      "charts":[
        {
          "type":"Geo",
          "name":"树图",
          "key":"Geo",
          "data":{
            "name":"all"
          }
        }
      ]
    }`,
	},
};

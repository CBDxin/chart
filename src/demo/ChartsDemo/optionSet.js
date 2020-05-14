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
    }`
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
    }`
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
    }`
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
    }`
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
    }`
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
    }`
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
    }`
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
    }`
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
    }`
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
    }`
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
    }`
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
    }`
	},
	Geo: {
		name: "地图",
    option: `
    {
      "height": 700,
      "width": "100%",
      "charts":[
        {
          "type":"Geo",
          "name":"树图",
          "key":"Geo",
          "data":[
            {
              "value": 1021,
              "adcode": "810000"
            },
            {
              "value": 892,
              "adcode": "230000"
            },
            {
              "value": 395,
              "adcode": "710000"
            },
            {
              "value": 6812,
              "adcode": "420000"
            },
            {
              "value": 628,
              "adcode": "310000"
            },
            {
              "value": 1579,
              "adcode": "440000"
            },
            {
              "value": 193,
              "adcode": 150000
            },
            {
              "value": 593,
              "adcode": "110000"
            },
            {
              "value": 197,
              "adcode": "140000"
            },
            {
              "value": 45,
              "adcode": "820000"
            },
            {
              "value": 1268,
              "adcode": "330000"
            },
            {
              "value": 355,
              "adcode": "350000"
            },
            {
              "value": 787,
              "adcode": "370000"
            },
            {
              "value": 189,
              "adcode": "120000"
            },
            {
              "value": 653,
              "adcode": "320000"
            },
            {
              "value": 328,
              "adcode": "130000"
            },
            {
              "value": 561,
              "adcode": "510000"
            },
            {
              "value": 184,
              "adcode": "530000"
            },
            {
              "value": 102,
              "adcode": "220000"
            },
            {
              "value": 579,
              "adcode": "500000"
            },
            {
              "value": 146,
              "adcode": "210000"
            },
            {
              "value": 256,
              "adcode": "610000"
            },
            {
              "value": 147,
              "adcode": "520000"
            },
            {
              "value": 991,
              "adcode": "340000"
            },
            {
              "value": 1019,
              "adcode": "430000"
            },
            {
              "value": 75,
              "adcode": "640000"
            },
            {
              "value": 1276,
              "adcode": "410000"
            },
            {
              "value": 168,
              "adcode": "460000"
            },
            {
              "value": 18,
              "adcode": "630000"
            },
            {
              "value": 254,
              "adcode": "450000"
            },
            {
              "value": 139,
              "adcode": "620000"
            },
            {
              "value": 76,
              "adcode": "650000"
            },
            {
              "value": 937,
              "adcode": "360000"
            },
            {
              "value": 1,
              "adcode": "540000"
            }
          ]
        }
      ]
    }`
	}
};

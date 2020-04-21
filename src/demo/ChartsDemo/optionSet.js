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
		option: `{
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
};

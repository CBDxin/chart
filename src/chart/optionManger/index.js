/*
  return {
    charts:[],//图表组件列表
    components:[],//工具组件列表
  }
*/
export let setOption = option => {
	let chartsOption = option.charts;
	let componentsOption = option.components;
	let model = {
		charts: [],
		components: [],
	};

	if (chartsOption) {
		chartsOption.map(chartOption => {
			model.charts.push(chartRegister(chartOption));
		});
	}

	if (componentsOption) {
		componentsOption.map(componentOption => {
			model.components.push(componentRegister(componentOption));
		});
  }
  
  return model;
};

let chartRegister = chartOption => {};

let componentRegister = componentOption => {};

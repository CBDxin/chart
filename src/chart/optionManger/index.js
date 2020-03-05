import Charts from "../charts";
import Components from "../components";
import { color3 } from "../util/color";


export let getStateByOption = option => {
	let chartData = formaDataSet(option.dataSet);
	let wrapperStyle = {
		height: option.height || 500,
		width: option.width || 800,
		padding: option.padding || 50,
	};
	let scaleMap = createScale(chartData, wrapperStyle);
	let colorScale = createColorScale(option.charts);

	return {
		chartData,
		wrapperStyle,
		charts:option.charts,
		components:option.components,
		colorScale,
		...scaleMap
	}
};

let formaDataSet = dataSet => {
	let data = {
		...dataSet,
		data: [],
	};

	Object.keys(dataSet.range).map(rangeItem => {
		data.data[rangeItem] = [] 
		data.domain.map((item, index) => {
			let t = {
				domain: dataSet.domain[index],
				range:dataSet.range[rangeItem][index]
			};
	
			data.data[rangeItem].push(t);
		});
	});

	return data;
};

let createScale = (chartData, wrapperStyle) => {
	const { padding = 50, width = 800, height = 500 } = wrapperStyle;

	let rangeData = [];
	Object.keys(chartData.range).map(rangeItem => {
		rangeData = [...rangeData, ...chartData.range[rangeItem]]
	});

	let xScale = Components.scale(chartData.domain, [padding, width - padding], "bandWithPadding");
	let yScale = Components.scale(
		[0, Math.max(...rangeData) * 1.2],
		[height - padding, padding]
	);

	return {
		xScale,
		yScale,
	};
};

let createColorScale = (charts)=>{
	let chartKeys = charts.map(item=>item.key)
	return Components.scale(chartKeys, color3, "ordinal")
}


export let hasType = (container, type)=>{
	let result = false;
	container.some(item=>{
		if(item.type === type){
			result = item.option || true;
			return true;
		}
	})

	return result;
}
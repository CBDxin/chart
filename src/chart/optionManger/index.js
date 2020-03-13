import Charts from "../charts";
import Components from "../components";
import { color3 } from "../util/color";


export let getStateByOption = (option, brushIndexs) => {
	let chartData = formaDataSet(option.dataSet, brushIndexs);
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

let formaDataSet =  (dataSet, brushIndexs) => {
	let data = {
		domain:[],
		range:[],
		data: [],
	};

	if(brushIndexs){
		data.domain = dataSet.domain.slice(brushIndexs.startIndex, brushIndexs.endIndex + 1);
		Object.keys(dataSet.range).map(item=>{
			data.range[item] = dataSet.range[item].slice(brushIndexs.startIndex, brushIndexs.endIndex + 1);
			console.log(dataSet)
		})
	}else{
		data.domain = dataSet.domain
		data.range = dataSet.range
	}

	Object.keys(data.range).map((rangeItem, index) => {
		data.data[rangeItem] = [] 
		data.domain.map((item, index) => {
			let t = {
				domain: data.domain[index],
				range:data.range[rangeItem][index]
			};
	
			data.data[rangeItem].push(t);
		});
	});

	console.log(data)

	return data;
};

let createScale = (chartData, wrapperStyle) => {
	const { padding = 50, width = 800, height = 500 } = wrapperStyle;

	let rangeData = [];
	Object.keys(chartData.range).map(rangeItem => {
		rangeData = [...rangeData, ...chartData.range[rangeItem]]
	});

	let xScale = Components.scale(chartData.domain, [padding, width - padding], "band");
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
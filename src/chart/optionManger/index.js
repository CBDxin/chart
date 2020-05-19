import Charts from "../charts";
import Components from "../components";
import { color3 } from "../util/color";
import { scale } from "../components/Scale";

let defaultPadding = {
	top: 40,
	bottom: 40,
	left: 40,
	right: 40,
};

export let getStateByOption = (option, brushIndexs) => {
	let chartData = formaDataSet(option.dataSet, hasType(option.components, "Brush") ? brushIndexs : undefined);
	let wrapperStyle = {
		height: option.height || 500,
		width: option.width || 800,
		padding: option.padding ? { ...defaultPadding, ...option.padding } : { ...defaultPadding },
	};
	let animation = option.animation || {
		model: "ease",
		time: 500,
	};

	if (hasType(option.components, "Brush")) {
		wrapperStyle.padding.bottom = wrapperStyle.padding.bottom + 40;
	}

	let hasBar =
		hasType(option.charts, "Bar") ||
		hasType(option.charts, "BarStack") ||
		hasType(option.charts, "BarGroup")
			? true
			: false;

	let scaleMap = createScale(chartData, wrapperStyle, hasBar);
	let colorScale = createColorScale(option.charts);

	return {
		chartData,
		wrapperStyle,
		animation,
		charts: option.charts,
		components: option.components,
		colorScale,
		brushIndexs,
		...scaleMap,
	};
};

let formaDataSet = (dataSet, brushIndexs) => {
	let data = {
		domain: [],
		range: [],
		data: [],
	};

	if (!dataSet || !dataSet.domain || !dataSet.range) {
		return {};
	}

	if (brushIndexs) {
		data.domain = dataSet.domain.slice(brushIndexs.startIndex, brushIndexs.endIndex + 1);
		Object.keys(dataSet.range).map(item => {
			data.range[item] = dataSet.range[item].slice(
				brushIndexs.startIndex,
				brushIndexs.endIndex + 1
			);
		});
	} else {
		data.domain = dataSet.domain;
		data.range = dataSet.range;
	}

	Object.keys(data.range).map(rangeItem => {
		if (Array.isArray(data.range[rangeItem])) {
			let length = dataSet.domain.length;
			if (data.range[rangeItem].length > length) {
				data.range[rangeItem] = data.range[rangeItem].splice(0, length);
			} else if (data.range[rangeItem].length < length) {
				let arr = new Array(length - data.range[rangeItem].length);
				arr.fill(0);
				data.range[rangeItem] = [...data.range[rangeItem], ...arr];
			}

			data.data[rangeItem] = [];
			data.domain.map((item, index) => {
				let t = {
					domain: data.domain[index],
					range: data.range[rangeItem][index],
				};

				data.data[rangeItem].push(t);
			});
		} else {
			//stack
			data.data[rangeItem] = [];
			data.domain.map((item, index) => {
				let t = {
					domain: data.domain[index],
					range: Object.keys(data.range[rangeItem]).map(item => data.range[rangeItem][item][index]),
				};

				data.data[rangeItem].push(t);
			});
		}
	});

	// console.log(data);

	return data;
};

let createScale = (chartData, wrapperStyle, hasBar) => {
	const { padding, width, height } = wrapperStyle;

	if (!chartData.range) {
		return {};
	}

	let rangeData = [];
	Object.keys(chartData.range).map(rangeItem => {
		if (Array.isArray(chartData.range[rangeItem])) {
			rangeData = [...rangeData, ...flat(chartData.range[rangeItem])];
		} else {
			//stack
			let sumArr = [];
			Object.keys(chartData.range[rangeItem]).map(item => {
				chartData.range[rangeItem][item].map((d, i) => {
					sumArr[i] = sumArr[i] ? sumArr[i] + d : d;
				});
			});
			rangeData = [...rangeData, ...sumArr];
		}
	});

	let xScale = Components.scale(
		chartData.domain,
		[padding.left, width - padding.right],
		hasBar ? "bandWithPadding" : "band"
	);
	let yScale = Components.scale(
		[0, Math.max(...rangeData) * 1.2],
		[height - padding.bottom, padding.top]
	);

	return {
		xScale,
		yScale,
	};
};

let createColorScale = (charts = []) => {
	let chartKeys = charts.map(item => item.key);
	return Components.scale(chartKeys, color3, "ordinal");
};

export let hasType = (container, type) => {
	let result = false;
	if (!container) {
		return result;
	}
	container.some(item => {
		if (item.type === type) {
			result = item.option || true;
			return true;
		}
	});

	return result;
};

export let getMapScales = mappers => {
	let mapperKeys = Object.keys(mappers);
	let mapScales = {};

	// console.log(mappers)

	mapperKeys.map(item => {
		mapScales[item + "Scale"] = scale(
			[Math.min(...mappers[item].data), Math.max(...mappers[item].data)],
			mappers[item].range,
			item
		);
	});

	return mapScales;
};

let flat = arr => {
	while (arr.some(item => Array.isArray(item))) {
		arr = [].concat(...arr);
	}
	return arr;
};

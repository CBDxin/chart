import { scaleLinear, scaleBand, scaleOrdinal } from "d3";

export let scale = (domain, range, type) => {
	let bandWidth,
		scale,
		invert = {};
	switch (type) {
		case "ordinal":
			scale = scaleOrdinal()
				.domain(domain)
				.range(range);
			break;
		case "bandNormal":
			scale = scaleBand()
				.domain(domain)
				.range(range);
			break;
		case "band":
			bandWidth = (range[1] - range[0]) / (domain.length - 1);
			range = [range[0], range[1] + bandWidth];
			scale = scaleBand()
				.domain(domain)
				.range(range);
			break;
		case "bandWithPadding":
			bandWidth = (range[1] - range[0]) / domain.length;
			range = [range[0] + bandWidth / 2, range[1] + bandWidth / 2];
			scale = scaleBand()
				.domain(domain)
				.range(range);
			break;
		case "color":
		case "opcity":
		case "width":
		case "radius":
		case "linear":
		default:
			scale = scaleLinear()
				.domain(domain)
				.range(range);

			scale.ticksValue = ()=>{
				return scale.ticks().map(item=>scale(item))
			}

			// console.log(scale.ticks())
	}

	scale.ticksValue = scale.ticksValue || function(){
		return domain.map(item => {
			invert[scale(item)] = item;
			return scale(item);
		});
	};

	scale.invert = scale.invert || function(x){ return invert[x]; }

	return scale;
};

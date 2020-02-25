import { scaleLinear, scaleBand } from "d3";

export let scale = (domain, range, type) => {
	let bandWidth;
	switch (type) {
		case "band":
			bandWidth = (range[1] - range[0]) / (domain.length - 1);
			range = [range[0], range[1] + bandWidth];
			return scaleBand()
				.domain(domain)
				.range(range);
		case "bandWithPadding":
			bandWidth = (range[1] - range[0]) / domain.length;
			range = [range[0] + bandWidth / 2, range[1] + bandWidth / 2];
			console.log(range)
			return scaleBand()
				.domain(domain)
				.range(range);
		case "linear":
		default:
			return scaleLinear()
				.domain(domain)
				.range(range);
	}
};

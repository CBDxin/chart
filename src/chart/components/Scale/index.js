import { scaleLinear, scaleBand } from "d3";

export let scale = (domain, range, type) => {
	let bandWidth, scale, invert = {};
	switch (type) {
		case "band":
			bandWidth = (range[1] - range[0]) / (domain.length - 1);
			range = [range[0], range[1] + bandWidth];
			scale = scaleBand()
				.domain(domain)
				.range(range);
			scale.ticks = () => {
				return domain.map(item => {
					invert[scale(item)] = item;
					return scale(item);
				});
			};
			scale.invert = x => invert[x];
			break;
		case "bandWithPadding":
			bandWidth = (range[1] - range[0]) / domain.length;
			range = [range[0] + bandWidth / 2, range[1] + bandWidth / 2];
			scale = scaleBand()
				.domain(domain)
				.range(range);
			scale.ticks = () => {
				return domain.map(item => {
					invert[scale(item)] = item;
					return scale(item);
				});
			};
			scale.invert = x => invert[x];
			break;
		case "linear":
		default:
			scale = scaleLinear()
				.domain(domain)
				.range(range);
	}
	return scale;
};

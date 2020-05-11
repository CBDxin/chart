import { timer } from "d3";
import BezierEasing from "bezier-easing";

export const RADIAN = Math.PI / 180;

export function random(n) {
	if (n > 21) return null;
	return parseInt(Math.random() * Math.pow(10, n));
}

/**
 * 三阶贝塞尔曲线ease-in-out
 * @param {number} k
 */
export function easeInOutCubic(k) {
	return (k *= 2) < 1 ? 0.5 * k * k * k : 0.5 * ((k -= 2) * k * k + 2);
}

export let animationModel = (precent, model) => {
	let easing;
	switch (model) {
		case "ease":
			easing = BezierEasing(0.25, 0.1, 0.25, 1);
			break;
		case "ease-in":
			easing = BezierEasing(0.42, 0, 1, 1);
			break;
		case "ease-out":
			easing = BezierEasing(0, 0, 0.58, 1);
			break;
		case "ease-in-out":
			easing = BezierEasing(0.42, 0, 0.58, 1);
			break;
		case "linear":
		default:
			easing = BezierEasing(0, 0, 1, 1);
	}

	return easing(precent);
};

let timeStamp;

export let transition = (animation, duration) => {
	timeStamp && timeStamp.stop();
	timeStamp = timer(elapsed => {
		let precent = elapsed / duration;
		if (precent > 1) {
			timeStamp.stop();
			timeStamp = null;
		} else {
			animation(precent);
		}
	});
};

export let sumArr = arr => {
	return arr.reduce(function(prev, cur) {
		return prev + cur;
	}, 0);
};

export const polarToCartesian = (cx, cy, radius, angle) => ({
	x: cx + Math.sin(RADIAN * angle) * radius,
	y: cy - Math.cos(RADIAN * angle) * radius,
});

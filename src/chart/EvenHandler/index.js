export let getMouseInfo = (event, container) => {
	if (!container) {
		return null;
	}
	let containerOffset = getOffset(container);
	let chartCoordinate = calculateChartCoordinate(event, containerOffset);

	return chartCoordinate;
};

function getOffsetTop(el) {
	return el.offsetParent ? el.offsetTop + getOffsetTop(el.offsetParent) : el.offsetTop;
}

function getOffsetLeft(el) {
	return el.offsetParent ? el.offsetLeft + getOffsetLeft(el.offsetParent) : el.offsetLeft;
}

let getOffset = el => {
	if (el) {
		return {
			left: getOffsetLeft(el.current),
			top: getOffsetTop(el.current),
		};
	}
	return null;
};

let calculateChartCoordinate = (event, offset) => ({
	chartX: Math.round(event.pageX - offset.left),
	chartY: Math.round(event.pageY - offset.top),
});

export function getActiveIndex(x, list) {
	let result;
	list.sort((a, b) => {
		return a - b;
	});
	list.some((item, index) => {
		if (index === 0) {
			result = index;
		} else {
			if (Math.abs(x - item) >= Math.abs(x - list[index - 1])) {
				result = index - 1;
				return true;
			} else {
				result = index;
				return false;
			}
		}
		return false;
	});
	return result;
}

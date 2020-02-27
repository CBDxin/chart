export let getMouseInfo = (event, container) => {
	if (!container) {
		return null;
	}
  let containerOffset = getOffset(container);
  let chartCoordinate = calculateChartCoordinate(event, containerOffset);
  console.log(chartCoordinate)

  return chartCoordinate;
};

let getOffset = el => {
	if (el) {
		return {
			left: el.current.offsetLeft,
			top: el.current.offsetTop,
		};
	}
	return null;
};

let calculateChartCoordinate = (event, offset) => (
  {
    chartX: Math.round(event.pageX - offset.left),
    chartY: Math.round(event.pageY - offset.top),
  }
);
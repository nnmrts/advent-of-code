/**
 *
 * @param {readonly [number, number]} point
 * @param {readonly [readonly [number, number], readonly [number, number]]} segment
 */
const pointOnSegment = (point, segment) => {
	const [x, y] = point;
	const [[x1, y1], [x2, y2]] = segment;

	if (x1 === x2) {
		return (
			(x === x1) &&
			(y >= Math.min(y1, y2)) &&
			(y <= Math.max(y1, y2))
		);
	}

	if (y1 === y2) {
		return (
			(y === y1) &&
			(x >= Math.min(x1, x2)) &&
			(x <= Math.max(x1, x2))
		);
	}

	return false;
};

export default pointOnSegment;

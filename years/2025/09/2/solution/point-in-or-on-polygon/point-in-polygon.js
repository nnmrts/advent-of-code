/**
 *
 * @param {readonly [number, number]} point
 * @param {readonly (readonly [readonly [number, number], readonly [number, number]])[]} edges
 */
const pointInPolygon = (point, edges) => {
	const [x, y] = point;

	const crossings = edges
		.reduce((count, [[x1, y1], [x2, y2]]) => {
			if (x1 !== x2) {
				return count;
			}

			const yMinimum = Math.min(y1, y2);
			const yMaximum = Math.max(y1, y2);

			const crossesY = (
				(y >= yMinimum) &&
				(y < yMaximum)
			);

			if (!crossesY) {
				return count;
			}

			return (x < x1) ? (count + 1) : count;
		}, 0);

	return (crossings % 2) === 1;
};

export default pointInPolygon;

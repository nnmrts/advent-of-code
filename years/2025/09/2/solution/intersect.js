import { isStrictlyBetween } from "./intersect/_exports.js";

/**
 *
 * @param {readonly [readonly [number, number], readonly [number, number]]} segmentA
 * @param {readonly [readonly [number, number], readonly [number, number]]} segmentB
 */
const intersect = (segmentA, segmentB) => {
	const [[ax1, ay1], [ax2, ay2]] = segmentA;
	const [[bx1, by1], [bx2, by2]] = segmentB;

	const isAVertical = (ax1 === ax2);
	const isAHorizontal = (ay1 === ay2);
	const isBVertical = (bx1 === bx2);
	const isBHorizontal = (by1 === by2);

	if ((isAVertical && isBVertical) || (isAHorizontal && isBHorizontal)) {
		return false;
	}

	if (isAHorizontal && isBVertical) {
		return intersect(segmentB, segmentA);
	}

	if (!(isAVertical && isBHorizontal)) {
		return false;
	}

	return (
		isStrictlyBetween(ax1, bx1, bx2) &&
		isStrictlyBetween(by1, ay1, ay2)
	);
};

export default intersect;

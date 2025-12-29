import sum from "../../../_common/sum.js";

/**
 * @import { Coordinates } from "../_types/_exports.js";
 */

/**
 *
 * @param {Coordinates} pointA
 * @param {Coordinates} pointB
 */
const getDistance = (pointA, pointB) => Math.sqrt(
	sum(pointA.map((valueA, valueIndex) => (valueA - pointB[valueIndex]) ** 2))
);

export default getDistance;

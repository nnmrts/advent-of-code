import sum from "../../../_common/sum.js";

/**
 * @import { Coordinates3D } from "../_types/_exports.js";
 */

/**
 *
 * @param {Coordinates3D} pointA
 * @param {Coordinates3D} pointB
 */
const getDistance = (pointA, pointB) => Math.sqrt(
	sum(pointA.map((valueA, valueIndex) => (valueA - pointB[valueIndex]) ** 2))
);

export default getDistance;

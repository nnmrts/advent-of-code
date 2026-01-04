import calculateSum from "../../../../_common/calculate-sum.js";

/**
 * @import { Coordinates3D } from "../_types/_exports.js";
 */

/**
 *
 * @param {Coordinates3D} pointA
 * @param {Coordinates3D} pointB
 */
const getDistance = (pointA, pointB) => Math.sqrt(
	calculateSum(pointA.map((valueA, valueIndex) => (valueA - pointB[valueIndex]) ** 2))
);

export default getDistance;

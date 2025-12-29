import { getDistance } from "./distances/_exports.js";
import junctionBoxes from "./junction-boxes.js";

/**
 *
 * @param {readonly [number, number, number]} distanceA
 * @param {readonly [number, number, number]} distanceB
 */
const compareDistances = (
	[indexAA, indexBA, valueA],
	[indexAB, indexBB, valueB]
) => valueA - valueB;

const distances = junctionBoxes
	.flatMap((junctionBoxA, junctionBoxAIndex) => junctionBoxes
		.slice(junctionBoxAIndex + 1)
		.map((junctionBoxB, junctionBoxBIndex) => /** @type {const} */ ([
			junctionBoxAIndex,
			junctionBoxBIndex + junctionBoxAIndex + 1,
			getDistance(
				junctionBoxA,
				junctionBoxB
			)
		])))
	.toSorted((distanceA, distanceB) => compareDistances(distanceA, distanceB));

export default distances;

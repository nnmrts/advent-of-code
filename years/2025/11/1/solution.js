import calculateSum from "../../../_common/calculate-sum.js";
import devices from "../_common/devices.js";

/**
 * @import { IterableElement } from "../_types/iterable-element.doc.js";
 */

/**
 *
 * @param {IterableElement<devices>[1]} outputs
 * @returns {number}
 */
const countPathsToOut = (outputs) => calculateSum(
	[
		outputs
			.filter((output) => output === "out").length,
		...outputs
			.filter((output) => output !== "out")
			.map((output) => {
				const innerOutputs = devices.get(output);

				return countPathsToOut(innerOutputs);
			})
	]
);

console.info(
	countPathsToOut(devices.get("you"))
);

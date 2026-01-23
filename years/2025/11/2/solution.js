import calculateSum from "../../../_common/calculate-sum.js";
import devices from "../_common/devices.js";

/**
 * @import { IterableElement } from "../_types/iterable-element.doc.js";
 */

const cache = new Map();

/**
 *
 * @param {IterableElement<typeof devices>[1]} outputs
 * @param {IterableElement<typeof devices>[1]} [requiredDevices]
 * @returns {number}
 */
const countPathsToOut = (
	outputs,
	requiredDevices = []
) => calculateSum(
	[
		requiredDevices.length === 0
			? outputs
				.filter((output) => output === "out").length
			: 0,
		...outputs
			.filter((output) => output !== "out")
			.map((output) => {
				const key = `${output}-${requiredDevices.join(",")}`;

				if (cache.has(key)) {
					return cache.get(key);
				}

				const innerOutputs = devices.get(output);

				const result = countPathsToOut(
					innerOutputs,
					requiredDevices.filter((requiredDevice) => requiredDevice !== output)
				);

				cache.set(key, result);

				return result;
			})
	]
);

console.info(
	countPathsToOut(devices.get("svr"), ["dac", "fft"])
);

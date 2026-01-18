import getInput from "../../../_common/get-input.js";
import ReadonlyMap from "../../../_common/readonly-map.js";

/**
 * @import { DeviceWithOutputs } from "./devices/_exports.js";
 */

const input = await getInput();

const devices = new ReadonlyMap(
	input
		.trim()
		.split("\n")
		.map((line) => {
			const [device, ...outputs] = line.split(/: | /v);

			return /** @type {DeviceWithOutputs} */ (
				/** @type {unknown} */ (
					[device, outputs]
				)
			);
		})
);

export default devices;

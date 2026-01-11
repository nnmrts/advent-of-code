import getInput from "../../../_common/get-input.js";
import ReadonlyMap from "../../../_common/readonly-map.js";

const input = await getInput();

/**
 * @typedef {"a"|"b"|"c"|"d"|"e"|"f"|"g"|"h"|"i"|"j"|"k"|"l"|"m"|"n"|"o"|"p"|"q"|"r"|"s"|"t"|"u"|"v"|"w"|"x"|"y"|"z"} LowerCaseLetter
 * @typedef {`${LowerCaseLetter}${LowerCaseLetter}${LowerCaseLetter}`} Device
 * @typedef {readonly [Exclude<Device, "out">, readonly Device[]]} DeviceWithOutputs
 */

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

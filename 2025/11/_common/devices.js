import getInput from "../../../_common/get-input.js";

import { ReadonlyMap } from "./devices/_exports.js";

const input = await getInput();

// const input = `
// 	svr: aaa bbb
// 	aaa: fft
// 	fft: ccc
// 	bbb: tty
// 	tty: ccc
// 	ccc: ddd eee
// 	ddd: hub
// 	hub: fff
// 	eee: dac
// 	dac: fff
// 	fff: ggg hhh
// 	ggg: out
// 	hhh: out
// `
// 	.trim()
// 	.split("\n")
// 	.map((line) => line.trim())
// 	.join("\n");

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

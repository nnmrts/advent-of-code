import getInput from "../../../_common/get-input.js";

/**
 * @import Join from "../../../../types/join.d.ts";
 * @import { Coordinates2D } from "../../../_types/coordinates-2-d.doc.js";
 */

const input = await getInput();

/**
 * @typedef {(
 * Join<
 * 	[
 * 		"toggle"|`turn ${"on"|"off"}`,
 * 		Join<Coordinates2D>,
 * 		"through",
 * 		Join<Coordinates2D>
 * 	],
 * 	" "
 * 	>
 * )} InputLine
 */

const inputLines = /** @type {readonly InputLine[]} */ (
	input
		.trim()
		.split("\n")
);

const instructions = inputLines
	.map((line) => {
		const [
			endCornerString,
			throughString,
			startCornerString,
			...actionStrings
		] = line
			.split(" ")
			.toReversed();

		return /** @type {const} */ ({
			action: actionStrings[0],
			corners: (/** @type {const} */ ([startCornerString, endCornerString]))
				.map((cornerString) => cornerString.split(",").map(Number))
				.toSorted(([xA], [xB]) => xA - xB)
		});
	});

export default instructions;

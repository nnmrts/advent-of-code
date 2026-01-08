import getInput from "../../../_common/get-input.js";

/**
 * @import Join from "../../../../types/join.d.ts";
 */

/**
 * @typedef {([
 * 	...(
 * 		[string|number]|
 * 		["NOT", string]|
 * 		[string|number, "AND", string]|
 * 		[string, "OR", string]|
 * 		[string, `${"L"|"R"}SHIFT`, number]
 * 	),
 * 	"->",
 * 	string
 * 	])} InputLineAfterSplit
 */

/**
 * @typedef {(
 * Join<InputLineAfterSplit>
 * )} InputLine
 */

const input = await getInput();

const inputLines = /** @type {readonly InputLine[]} */ (
	input
		.trim()
		.split("\n")
);

const instructions = inputLines
	.map((line) => {
		const [receivingWire, arrow, ...reversedCalculation] = /** @type {InputLineAfterSplit} */ (
			line
				.split(" ")
				.map((value) => {
					const parsedValue = Number(value);

					return Number.isNaN(parsedValue)
						? value
						: parsedValue;
				})
		)
			.toReversed();

		const calculation = reversedCalculation.toReversed();

		return /** @type {const} */ ({
			calculation,
			receivingWire
		});
	});

export default instructions;

import getInput from "../../../_common/get-input.js";

/**
 * @typedef {`"${string}"`} InputLine
 */

const input = await getInput();

const lines = /** @type {readonly InputLine[]} */ (
	input
		.trim()
		.split("\n")
);

export default lines;

import getInput from "../../../_common/get-input.js";

/**
 * @import { Coordinates } from "./_types/_exports.js";
 */

const input = await getInput();

const junctionBoxes = /** @type {readonly Coordinates[]} */ (
	/** @type {unknown} */ (
		input.trim().split("\n").map((line) => line.split(",").map(Number))
	)
);

export default junctionBoxes;

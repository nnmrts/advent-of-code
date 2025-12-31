import getInput from "../../../_common/get-input.js";

/**
 * @import { Coordinates3D } from "./_types/_exports.js";
 */

const input = await getInput();

const junctionBoxes = /** @type {readonly Coordinates3D[]} */ (
	/** @type {unknown} */ (
		input.trim().split("\n").map((line) => line.split(",").map(Number))
	)
);

export default junctionBoxes;

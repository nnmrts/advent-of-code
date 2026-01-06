import getInput from "../../../_common/get-input.js";

/**
 * @import { Coordinates2D } from "../../../_types/coordinates-2-d.doc.js";
 */

const input = await getInput();

const tiles = /** @type {readonly Coordinates2D[]} */ (
	/** @type {unknown} */ (
		input.trim().split("\n").map((line) => line.split(",").map(Number))
	)
);

export default tiles;

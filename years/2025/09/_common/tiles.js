import getInput from "../../../_common/get-input.js";

const input = await getInput();

/**
 * @import { Coordinates2D } from "./coordinates-2-d.doc.js";
 */

const tiles = /** @type {readonly Coordinates2D[]} */ (
	/** @type {unknown} */ (
		input.trim().split("\n").map((line) => line.split(",").map(Number))
	)
);

export default tiles;

import getInput from "../../../_common/get-input.js";

/**
 * @import { Grid } from "../_types/grid.doc.js";
 */

const input = await getInput();

const grid = /** @type {Grid} */ (
	/** @type {unknown} */(
		input
			.trim()
			.split("\n")
			.map((line) => [...line].map((value) => Number(value === "#")))
	)
);

export default grid;

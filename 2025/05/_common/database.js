import getInput from "../../../_common/get-input.js";

const input = await getInput();

/**
 * @import { Range } from "../_types/range.doc.js";
 */

const [rawFreshIngredientRanges, rawAvailableIngredients] = input.trim().split("\n\n");

const freshIngredientRanges = /** @type {readonly Range[]} */ (
	/** @type {unknown} */ (
		rawFreshIngredientRanges.split("\n").map((range) => range.split("-").map(Number))
	)
);

const availableIngredients = rawAvailableIngredients.split("\n").map(Number);

const database = {
	availableIngredients,
	freshIngredientRanges
};

export default database;

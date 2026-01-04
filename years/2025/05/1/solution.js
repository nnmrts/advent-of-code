import database from "../_common/database.js";

const {
	availableIngredients,
	freshIngredientRanges
} = database;

console.info(
	availableIngredients
		.filter((availableIngredient) => freshIngredientRanges
			.some(([rangeStart, rangeEnd]) => (
				availableIngredient >= rangeStart &&
				availableIngredient <= rangeEnd
			)))
		.length
);

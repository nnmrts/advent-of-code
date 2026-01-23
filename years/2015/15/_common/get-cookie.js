import { mapEntries, mapValues } from "./get-cookie/_exports.js";
import ingredients from "./ingredients.js";
import pick from "./pick.js";
import scoreKeys from "./score-keys.js";

/**
 * @import TupleOf from "../../../../types/tuple-of.d.ts";
 */

/**
 * @param {number[]} permutation
 * @param {Readonly<TupleOf<4 | 5, Exclude<keyof (typeof ingredients)[number], "name">>>} [relevantKeys]
 */
const getCookie = (permutation, relevantKeys = scoreKeys) => {
	const multipliedIngredients = permutation.map((teaspoons, index) => {
		const { [index]: ingredient } = ingredients;

		return mapEntries(
			pick(ingredient, relevantKeys),
			(key, value) => [key, value * teaspoons]
		);
	});

	const initialValueEntries = relevantKeys.map((key) => /** @type {const} */ ([key, 0]));

	return mapValues(
		multipliedIngredients
			.reduce(
				(
					previousValue,
					currentValue
				) => ({
					...previousValue,
					...mapValues(
						pick(
							previousValue,
							relevantKeys
						),
						(value, key) => value + currentValue[key]
					)
				}),
				Object.fromEntries(initialValueEntries)
			),
		(value) => Math.max(0, value)
	);
};

export default getCookie;

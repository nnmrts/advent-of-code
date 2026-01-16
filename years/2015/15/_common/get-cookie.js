import {
	mapEntries, mapValues, omit
} from "./get-cookie/_exports.js";
import ingredients from "./ingredients.js";
import pick from "./pick.js";
import scoreKeys from "./score-keys.js";

/**
 * @param {number[]} permutation
 * @param {readonly Exclude<(keyof ingredients[number]), "name">[]} relevantKeys
 */
const getCookie = (permutation, relevantKeys = scoreKeys) => {
	const multipliedIngredients = permutation.map((teaspoons, index) => {
		const { [index]: ingredient } = ingredients;

		return {
			...mapEntries(
				pick(ingredient, relevantKeys),
				(key, value) => [key, value * teaspoons]
			),
			...omit(ingredient, relevantKeys)
		};
	});

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
				Object.fromEntries(relevantKeys.map((key) => [key, 0]))
			),
		(value) => Math.max(0, value)
	);
};

export default getCookie;

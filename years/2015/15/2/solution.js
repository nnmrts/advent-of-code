import calculateProduct from "../../../_common/calculate-product.js";
import pick from "../../_common/pick.js";
import getCookie from "../_common/get-cookie.js";
import getIntegerPartitionsOfSize from "../_common/get-integer-partitions-of-size.js";
import ingredients from "../_common/ingredients.js";
import permuteUnique from "../_common/permute-unique.js";
import scoreKeys from "../_common/score-keys.js";
import totalNumberOfTeaspoons from "../_common/total-number-of-teaspoons.js";

import { neededCalories, relevantKeys } from "./solution/_exports.js";

const [bestScore] = getIntegerPartitionsOfSize(
	totalNumberOfTeaspoons,
	ingredients.length
)
	.flatMap((partition) => permuteUnique(partition)
		.map((permutation) => {
			const cookie = getCookie(permutation, relevantKeys);

			const { calories } = cookie;

			return calories === neededCalories
				? calculateProduct(Object.values(pick(cookie, scoreKeys)))
				: 0;
		}))
	.toSorted((scoreA, scoreB) => scoreB - scoreA);

console.info(bestScore);

import calculateSum from "../../../_common/calculate-sum.js";
import object from "../_common/object.js";

/**
 * @import { JsonValue } from "../_types/_exports.js";
 */

/**
 *
 * @param {JsonValue} value
 * @returns {readonly number[]}
 */
const getNumbersFromObject = (value) => {
	if (Array.isArray(value)) {
		return value.flatMap(getNumbersFromObject);
	}

	if (typeof value === "object" && value !== null) {
		return Object.values(value).flatMap(getNumbersFromObject);
	}

	if (typeof value !== "number") {
		return [0];
	}

	return [value];
};

const numbers = getNumbersFromObject(object);

console.info(calculateSum(numbers));

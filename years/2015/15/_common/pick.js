import { isArray } from "./_common/_exports.js";
import { filterKey } from "./pick/_exports.js";

/**
 * @import { KeyFilter } from "./_types/_exports.js";
 * @import { FilteredKeys } from "./pick/_exports.js";
 */

/**
 * @template {object} ObjectTemplate
 * @template {KeyFilter<ObjectTemplate, keyof ObjectTemplate>} FilterTemplate
 * @param {ObjectTemplate} object
 * @param {FilterTemplate | null} [filter]
 * @returns {Pick<ObjectTemplate, FilteredKeys<ObjectTemplate, FilterTemplate>>}
 */
const pick = (
	object,
	filter
) => {
	/**
	 * @type {(keyof ObjectTemplate)[]}
	 */
	let keys = /** @type {any} */ (filter);

	let actualFilter = filter;

	if (isArray(filter)) {
		actualFilter = null;
	}
	else {
		keys = /** @type {(keyof ObjectTemplate)[]} */ (Reflect.ownKeys(object));
	}

	return keys.reduce(
		(accumulator, key) => {
			if (filterKey(object, key, actualFilter)) {
				accumulator[key] = object[key];
			}

			return accumulator;
		},
		/** @type {ObjectTemplate} */ ({})
	);
};

export default pick;

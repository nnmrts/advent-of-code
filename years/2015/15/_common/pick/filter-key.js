import isArray from "../_common/is-array.js";

/**
 * @import { KeyFilter } from "../_types/key-filter.doc.js";
 */

/**
 * @template {object} ObjectTemplate
 * @param {ObjectTemplate} object
 * @param {keyof ObjectTemplate} key
 * @param {KeyFilter<ObjectTemplate, keyof ObjectTemplate> | KeyFilter | null} [filter]
 */
const filterKey = (
	object,
	key,
	filter
) => (
	Object.hasOwn(object, key) &&
	(
		filter === undefined ||
		filter === null ||
		(
			isArray(filter)
				? filter.includes(key)
				: filter(object[key], key, object)
		)
	)
);

export default filterKey;

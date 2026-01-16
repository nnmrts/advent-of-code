import mapEntries from "./map-entries.js";

/**
 * @template {number | string | symbol} KeyTemplate
 * @template ValueTemplate
 * @template ChangedValueTemplate
 * @param {Record<KeyTemplate, ValueTemplate>} object
 * @param {(value: ValueTemplate, key: KeyTemplate) => ChangedValueTemplate} toValue
 */
const mapValues = (
	object,
	toValue
) => mapEntries(object, (key, value) => [
	key,
	toValue(
		/** @type {ValueTemplate} */ (value),
		/** @type {KeyTemplate} */ (key)
	)
]);

export default mapValues;

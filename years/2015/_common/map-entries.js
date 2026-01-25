/**
 * @template {number | string | symbol} KeyTemplate
 * @template ValueTemplate
 * @template {number | string | symbol} ChangedKeyTemplate
 * @template ChangedValueTemplate
 * @param {Record<KeyTemplate, ValueTemplate>} object
 * @param {(key: KeyTemplate, value: ValueTemplate) => readonly [ChangedKeyTemplate, ChangedValueTemplate]} toEntry
 */
const mapEntries = (
	object,
	toEntry
) => /** @type {Record<ChangedKeyTemplate, ChangedValueTemplate>} */ (
	Object.fromEntries(
		Object.entries(object)
			.map(([key, value]) => toEntry(
				/** @type {KeyTemplate} */ (key),
				/** @type {ValueTemplate} */ (value)
			))
	)
);

export default mapEntries;

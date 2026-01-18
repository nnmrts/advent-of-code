/**
 * @template ItemTemplate
 * @param {readonly ItemTemplate[]} comboOptions
 * @param {number} comboLength
 * @param {number} [startIndex]
 * @param {readonly ItemTemplate[]} [combination]
 * @returns {(readonly ItemTemplate[])[]}
 */
const combineWithRepetitions = (
	comboOptions,
	comboLength,
	startIndex = 0,
	combination = []
) => (
	combination.length === comboLength
		? [[...combination]]
		: [...comboOptions.entries()]
			.slice(startIndex)
			.flatMap(([index, comboOption]) => combineWithRepetitions(
				comboOptions,
				comboLength,
				index,
				[...combination, comboOption]
			))
);

export default combineWithRepetitions;

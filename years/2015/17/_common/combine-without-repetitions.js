/**
 * @template {unknown} ItemTemplate
 * @param {readonly ItemTemplate[]} comboOptions
 * @param {number} comboLength
 * @returns {(readonly ItemTemplate[])[]}
 */
const combineWithoutRepetitions = (comboOptions, comboLength) => (
	comboLength === 1
		? comboOptions.map((comboOption) => /** @type {const} */ ([comboOption]))
		: [...comboOptions.entries()]
			.flatMap(([optionIndex, currentOption]) => (
				combineWithoutRepetitions(
					comboOptions.slice(optionIndex + 1),
					comboLength - 1
				)
					.map((smallerCombo) => [currentOption, ...smallerCombo])
			))
);

export default combineWithoutRepetitions;

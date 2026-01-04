/**
 * @template ItemTemplate
 * @param {object} options
 * @param {readonly ItemTemplate[]} options.array
 * @param {number} options.size
 * @param {number} [options.startIndex]
 * @param {readonly ItemTemplate[]} [options.combination]
 * @returns {readonly (readonly ItemTemplate[])[]}
 */
const getCombinations = function ({
	array,
	combination = [],
	size,
	startIndex = 0
}) {
	if (combination.length === size) {
		return [[...combination]];
	}

	const results = [];

	for (let index = startIndex; index < array.length; index++) {
		results.push(
			...getCombinations({
				array,
				combination: [...combination, array[index]],
				size,
				startIndex: index
			})
		);
	}

	return results;
};

export default getCombinations;

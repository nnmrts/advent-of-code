/**
 * @param {readonly number[]} values
 * @param {number} maximum
 */
const getLongestSumLength = (values, maximum) => {
	const sortedValues = values
		.toSorted((valueA, valueB) => valueA - valueB);

	let currentValue = 0;

	for (const [index, value] of sortedValues.entries()) {
		currentValue += value;

		if (currentValue >= maximum) {
			return index;
		}
	}

	return Infinity;
};

export default getLongestSumLength;

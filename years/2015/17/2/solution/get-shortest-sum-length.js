/**
 * @param {readonly number[]} values
 * @param {number} maximum
 */
const getShortestSumLength = (values, maximum) => {
	const sortedValues = values
		.toSorted((valueA, valueB) => valueB - valueA);

	let currentValue = 0;

	for (const [index, value] of sortedValues.entries()) {
		currentValue += value;

		if (currentValue >= maximum) {
			return index + 1;
		}
	}

	return Infinity;
};

export default getShortestSumLength;

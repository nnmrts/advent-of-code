/**
 *
 * @param {number} number
 * @param {number} size
 * @param {number} minimum
 * @returns {readonly (readonly number[])[]}
 */
const getIntegerPartitionsOfSize = (number, size, minimum = 0) => {
	if (size === 1) {
		return number >= minimum ? [[number]] : [];
	}

	const results = [];
	const max = Math.floor(number / size);

	for (let part = minimum; part <= max; part += 1) {
		for (const rest of getIntegerPartitionsOfSize(number - part, size - 1, part)) {
			results.push([part, ...rest]);
		}
	}

	return results;
};

export default getIntegerPartitionsOfSize;

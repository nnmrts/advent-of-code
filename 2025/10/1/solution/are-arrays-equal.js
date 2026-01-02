/**
 *
 * @param {readonly unknown[]} arrayA
 * @param {readonly unknown[]} arrayB
 */
const areArraysEqual = (arrayA, arrayB) => {
	if (arrayA !== arrayB) {
		if (arrayA.length !== arrayB.length) {
			return false;
		}
		for (const [index, element] of arrayA.entries()) {
			if (!Object.is(element, arrayB[index])) {
				return false;
			}
		}
	}

	return true;
};

export default areArraysEqual;

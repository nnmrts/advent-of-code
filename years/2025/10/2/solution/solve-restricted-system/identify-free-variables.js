/**
 * Identifies free variables (non-pivot columns)
 *
 * @param {number[]} pivotColumnIndices
 * @param {number} numberOfColumns
 */
const identifyFreeVariables = (pivotColumnIndices, numberOfColumns) => {
	const isPivot = new Set(pivotColumnIndices);
	/** @type {number[]} */
	const freeVariables = [];

	for (let index = 0; index < numberOfColumns; index++) {
		if (!isPivot.has(index)) {
			freeVariables.push(index);
		}
	}

	return freeVariables;
};

export default identifyFreeVariables;

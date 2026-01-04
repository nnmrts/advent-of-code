/**
 * Normalizes a pivot row by dividing by the pivot value
 *
 * @param {number[][]} matrix
 * @param {number[]} rhs
 * @param {number} pivotRow
 * @param {number} columnIndex
 * @param {number} numberOfColumns
 */
const normalizePivotRow = (matrix, rhs, pivotRow, columnIndex, numberOfColumns) => {
	const pivotValue = matrix[pivotRow][columnIndex];

	for (let index = columnIndex; index < numberOfColumns; index++) {
		matrix[pivotRow][index] /= pivotValue;
	}
	rhs[pivotRow] /= pivotValue;
};

export default normalizePivotRow;
